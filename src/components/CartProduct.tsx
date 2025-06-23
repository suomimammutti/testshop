import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import { FasterImageView } from '@candlefinance/faster-image';
import Animated, { FadeInDown, FadeOutUp, LinearTransition } from 'react-native-reanimated';
import { useNonPersistentStore } from '../store/NonPersistentStore';
import { MainStyles, MainTheme } from '../theme/Theme';
import { ICartProduct } from '../utils/Types';
import { formatPrice } from '../utils/Utils';

const cartIconRemove = require('../../img/minus.png');
const cartIconAdd = require('../../img/add.png');
export const CART_ELEMENT_HEIGHT = 90;

interface ICartElementProps {
	item: ICartProduct;
}

export const CartProduct = ({ item }: ICartElementProps) => {

	const addToCart = useNonPersistentStore((state) => state.addToCart);
	const removeFromCart = useNonPersistentStore((state) => state.removeFromCart);
	const productImage = item.product.images[0] ?? '';

	return (

		<Animated.View style={styles.container}
			layout={LinearTransition}
			entering={FadeInDown}
			exiting={FadeOutUp}>
			<View style={styles.contentContainer}>

				<View style={styles.imageContainer}>
					<FasterImageView source={{ url: productImage, cachePolicy: 'discWithCacheControl', borderRadius: MainTheme.cardBorderRadius }} style={styles.image} />
				</View>

				<View style={styles.infoContainer}>
					<Text style={styles.infoTitle} numberOfLines={2}>{item.product.title}</Text>
					<Text style={styles.infoPrice}>{formatPrice(item.product.price * item.count)}</Text>
				</View>

				<View style={styles.actionContainer}>
					<TouchableOpacity onPress={() => removeFromCart(item.product)} style={styles.actionButtonRemove}>
						<Image source={cartIconRemove} style={MainStyles.actionIcon} />
					</TouchableOpacity>
					<View style={styles.countContainer}>
						<Text style={styles.count}>{item.count}</Text>
					</View>
					<TouchableOpacity onPress={() => addToCart(item.product)} style={styles.actionButtonAdd}>
						<Image source={cartIconAdd} style={MainStyles.actionIcon} />
					</TouchableOpacity>
				</View>

			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		...MainStyles.cardStyle,
		height: CART_ELEMENT_HEIGHT,
	},
	contentContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'space-between',
		justifyContent: 'space-between',
	},
	imageContainer: {
		width: 80,
		height: 80,
		backgroundColor: MainTheme.white,
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: MainTheme.cardBorderRadius,
	},
	infoContainer: {
		flex: 1,
		flexDirection: 'column',
		alignContent: 'space-between',
		marginVertical: 5,
		marginHorizontal: 5,
	},
	infoTitle: {
		...MainStyles.fontPrimary,
		minHeight: 45,
	},
	infoPrice: {
		...MainStyles.fontSecondary,
		minHeight: 25,
	},
	actionContainer: {
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionButtonRemove: {
		...MainStyles.actionButton,
		backgroundColor: MainTheme.attentionColor,
	},
	actionButtonAdd: {
		...MainStyles.actionButton,
		backgroundColor: MainTheme.primary,
	},
	countContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		minWidth: 20,
		marginHorizontal: 4,
	},
	count: {
		...MainStyles.fontSecondary,
	},
});
