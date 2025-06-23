import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNonPersistentStore } from '../store/NonPersistentStore';
import { MainTheme } from '../theme/Theme';
import { ICartProduct } from '../utils/Types';
import { CartProduct } from './CartProduct';

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList<ICartProduct>);

export const CartList = () => {
	const cartProducts = useNonPersistentStore((state) => state.cartProducts);

	const emptyCartView = () => (
		<Animated.View
			layout={LinearTransition}
			entering={FadeInDown.duration(300)}
			exiting={FadeOutUp.duration(300)}
			style={styles.noProductsContainer}
		>
			<Text style={styles.noProductsText}>{'No products in cart'}</Text>
		</Animated.View>
	);

	const renderItem: ListRenderItem<ICartProduct> = ({ item }) => (
		<CartProduct item={item} key={item.product.id} />
	);

	const insets = useSafeAreaInsets();

	return (
		<AnimatedFlashList
			contentContainerStyle={[styles.contentContainer, { paddingRight: insets.right, paddingLeft: insets.left }]}
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
		backgroundColor: MainTheme.primary,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 50,
	},
	noProductsText: {
		color: MainTheme.primaryFontLight,
		fontSize: 20,
	},
});
