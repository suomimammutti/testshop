
import { ListRenderItem, StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNonPersistentStore } from '../store/NonPersistentStore';
import { ActiveTheme } from '../theme/ActiveTheme';
import { ICartProduct } from '../utils/Types';
import { CartProduct } from './CartProduct';

export const CartList = () => {
	const cartProducts = useNonPersistentStore((state) => state.cartProducts);
	const insets = useSafeAreaInsets();
	const emptyCartView = () => (
		<Animated.View style={styles.noProductsContainer}
			layout={LinearTransition}
			entering={FadeInDown.duration(300)}
			exiting={FadeOutUp.duration(300)}>
			<Text style={styles.noProductsText}>{'No products in cart'}</Text>
		</Animated.View>
	);

	const renderItem: ListRenderItem<ICartProduct> = ({ item }) => (
		<CartProduct item={item} />
	);

	return (
		<Animated.FlatList
			contentContainerStyle={[styles.contentContainer, { paddingRight: insets.right, paddingLeft: insets.left }]}
			itemLayoutAnimation={LinearTransition}
			style={styles.container}
			data={cartProducts}
			keyExtractor={(item: ICartProduct, _index: number) => item.product.id.toString()}
			ListEmptyComponent={emptyCartView}
			renderItem={renderItem} />
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	contentContainer: {
		marginTop: 5,
		paddingBottom: 20,

	},
	noProductsContainer: {
		flex: 1,
		backgroundColor: ActiveTheme.primary,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 50,
	},
	noProductsText: {
		color: ActiveTheme.primaryFontLight,
		fontSize: 20,
	},
});
