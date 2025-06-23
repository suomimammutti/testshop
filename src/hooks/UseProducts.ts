import { useCallback, useEffect, useRef, useState } from 'react';
import { queryProducts } from '../api/Api';
import { useNonPersistentStore } from '../store/NonPersistentStore';

export const useProducts = () => {
	const [refreshing, setRefreshing] = useState(false);

	const products = useNonPersistentStore(state => state.products);
	const setProducts = useNonPersistentStore(state => state.setProducts);
	const selectedCategoryId = useNonPersistentStore(state => state.selectedCategoryId);
	const searchString = useNonPersistentStore(state => state.searchString);
	const resetCounter = useNonPersistentStore(state => state.resetCounter);

	const abortControllerRef = useRef<AbortController | null>(null);

	const fetchProducts = useCallback(async () => {
		try {
			setRefreshing(true);

			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();

			const fetchedProducts = await queryProducts(
				searchString,
				selectedCategoryId,
				abortControllerRef.current.signal
			);

			abortControllerRef.current = null;

			setProducts(fetchedProducts);
		} finally {
			setRefreshing(false);
			return () => {
				abortControllerRef.current?.abort();
			};
		}
	}, [searchString, selectedCategoryId, setProducts]);


	useEffect(() => {
		fetchProducts();
	}, [resetCounter, searchString, selectedCategoryId, fetchProducts]);

	return {
		products,
		refreshing,
		refresh: fetchProducts,
	};
};
