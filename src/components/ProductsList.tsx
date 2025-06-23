import { FlashList } from '@shopify/flash-list';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useProductList } from '../hooks/UseProductList';
import { ActiveTheme } from '../theme/ActiveTheme';
import { IProduct } from '../utils/Types';
import { ProductCard } from './ProductCard';

export const ProductsList = () => {

	const { appLoaded, onItemSelected, flatListRef, products, refreshing, refresh } = useProductList();

	const emptyListView = () => {
		return (
			<View style={styles.noProductsContainer}>
				<Text style={styles.noProductsText}>{'No products found'}</Text>
			</View>
		);
	};

	const renderItem = ({ item }: { item: IProduct }) => (
		<ProductCard
			key={item.id.toString()}
			product={item}
			onSelect={() => onItemSelected(item)}
		/>
	);

	return appLoaded ? (
		<FlashList
			ref={flatListRef}
			keyboardDismissMode="on-drag"
			automaticallyAdjustKeyboardInsets={true}
			style={styles.container}
			data={products}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
			ListEmptyComponent={emptyListView}
			keyExtractor={(item) => item.id.toString()}
			renderItem={renderItem} />
	) : null;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	text: {
		textAlignVertical: 'center',
		includeFontPadding: false,
		fontSize: 16,
		color: ActiveTheme.primaryFontDark,
	},
	noProductsContainer: {
		flex: 1,
		backgroundColor: ActiveTheme.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noProductsText: {
		color: ActiveTheme.primaryFontLight,
		fontSize: 20,
		marginVertical: 50,
	},
});
