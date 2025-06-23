import { Image, TouchableOpacity } from 'react-native';
import { useCartButton } from '../hooks/UseCartButton';
import { MainStyles } from '../theme/Theme';
import { IProduct } from '../utils/Types';

const cartIcon = require('../../img/cart.png');
interface IAddToCartButtonProps {
	product: IProduct;
}

export const AddToCartButton = ({ product }: IAddToCartButtonProps) => {

	const { backgroundColor, addToCart } = useCartButton(product);

	return (
		<TouchableOpacity onPress={() => addToCart(product)} style={[MainStyles.actionButton, { backgroundColor: backgroundColor }]}>
			<Image source={cartIcon} style={MainStyles.actionIcon} />
		</TouchableOpacity>
	);
};
