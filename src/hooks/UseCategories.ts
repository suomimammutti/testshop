import { useEffect } from 'react';
import { queryCategories } from '../api/Api';
import { useNonPersistentStore } from '../store/NonPersistentStore';

export const useCategories = () => {
	const categories = useNonPersistentStore((state) => state.categories);
	const setCategories = useNonPersistentStore((state) => state.setCategories);
	const resetCounter = useNonPersistentStore((state) => state.resetCounter);

	useEffect(() => {
		const getCategories = async () => {

			const fetchedCategories = await queryCategories(5);
			setCategories(fetchedCategories);
		};

		getCategories();

	}, [resetCounter, setCategories]);

	return categories;
};
