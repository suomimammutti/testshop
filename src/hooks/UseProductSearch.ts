import { useNonPersistentStore } from '../store/NonPersistentStore';

export const useProductSearch = () => {
	const searchString = useNonPersistentStore((state) => state.searchString);
	const setSearchString = useNonPersistentStore((state) => state.setSearchString);

	const onSearchTextChanged = (e: string) => {
		setSearchString(e);
	};

	const handleClear = () => {
		setSearchString('');
	};
	return {
		searchString,
		onSearchTextChanged,
		handleClear,
	};
};
