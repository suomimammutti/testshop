import { FlashList } from '@shopify/flash-list';
import { useCallback, useRef } from 'react';
import { useNonPersistentStore } from '../store/NonPersistentStore';
import { IProduct } from '../utils/Types';
import { useProducts } from './UseProducts';

export const useProductList = () => {

	const flatListRef = useRef<FlashList<IProduct>>(null);
	const { products, refreshing, refresh } = useProducts();
	const appLoaded = useNonPersistentStore((state) => state.appLoaded);

	const onItemSelected = useCallback((item: IProduct) => {
		const index = products.findIndex(p => p.id === item.id);
		if (index !== -1) {
			setTimeout(() => {
				flatListRef.current?.scrollToIndex({ index: index, animated: true, viewOffset: -10, viewPosition: 0 });
			}, 200);
		}
	}, [products]);

	return {
		appLoaded,
		onItemSelected,
		flatListRef,
		refreshing,
		refresh,
		products,
	};
};
