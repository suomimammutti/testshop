import { StyleSheet, View } from 'react-native';
import { CategorySelector } from '../components/CategorySelector';
import { ProductSearch } from '../components/ProductSearch';

export const ProductFilters = () => {
	return (
		<View style={styles.filterContainer}>
			<ProductSearch />
			<CategorySelector />
		</View>
	);
};

const styles = StyleSheet.create({
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
		gap: 5,
	},
});
