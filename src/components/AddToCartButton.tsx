import { Image, TouchableOpacity } from 'react-native';
import { useCartButton } from '../hooks/UseCartButton';
import { MainStyles } from '../theme/MainStyles';
import { IProduct } from '../utils/Types';

const cartIcon = require('../../img/cart.png');
interface IAddToCartButtonProps {
	product: IProduct;
}

export const AddToCartButton = ({ product }: IAddToCartButtonProps) => {

	const { cartItem, addToCart } = useCartButton(product);
	const buttonStyle = cartItem ? MainStyles.productInCart : MainStyles.productNotInCart;

	return (
		<TouchableOpacity onPress={() => addToCart(product)} style={[MainStyles.actionButton, buttonStyle]}>
			<Image source={cartIcon} style={MainStyles.actionIcon} />
		</TouchableOpacity>
	);
};
