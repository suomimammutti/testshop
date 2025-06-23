import { useNonPersistentStore } from '../store/NonPersistentStore';
import { IProduct } from '../utils/Types';

export const useCartButton = (product: IProduct) => {
	const addToCart = useNonPersistentStore((state) => state.addToCart);
	const cartProducts = useNonPersistentStore((state) => state.cartProducts);
	const cartItem = cartProducts.find(p => p.product.id === product.id);

	return {
		cartItem,
		addToCart,
	};
};
