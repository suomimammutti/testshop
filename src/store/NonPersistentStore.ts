import { create } from 'zustand';
import { ICartProduct, ICategory, IProduct } from '../utils/Types';

export interface INonPersistentStoreState {
	appLoaded: boolean;

	categories: ICategory[];
	selectedCategoryId: number;
	categoriesLoaded: boolean;

	products: IProduct[];
	productsLoaded: boolean;

	searchString: string;

	cartProducts: ICartProduct[];
	cartPrice: number;
	cartCount: number;

	resettingCatalog: boolean;
	resetCounter: number;
}

const initialState: INonPersistentStoreState = {
	appLoaded: false,

	categories: [],
	selectedCategoryId: -1,
	categoriesLoaded: false,

	products: [],
	productsLoaded: false,

	searchString: '',

	cartProducts: [],
	cartPrice: 0,
	cartCount: 0,

	resettingCatalog: false,
	resetCounter: 0,
};

export interface INonPersistentStoreActions {
	resetStore: () => void;

	checkAppLoaded: () => void;

	setCategories: (categories: ICategory[]) => void;
	setSelectedCategoryId: (categoryId: number) => void;

	setProducts: (products: IProduct[]) => void;

	setSearchString: (searchString: string) => void;

	addToCart: (product: IProduct) => void;
	removeFromCart: (productd: IProduct) => void;
	updateCartTotals: () => void;
	clearCart: () => void;

	setResettingCatalog: (resetting: boolean) => void;
}

export const useNonPersistentStore = create<INonPersistentStoreState & INonPersistentStoreActions>()(
	(set, get) => ({
		...initialState,

		resetStore: () => set(initialState),

		checkAppLoaded: () => {
			if (!get().categoriesLoaded || !get().productsLoaded || get().appLoaded) { return; }
			set((state) => {
				return {
					appLoaded: state.categoriesLoaded && state.productsLoaded,
				};
			});
		},

		setCategories: (categories: ICategory[]) => {
			set((_state) => {
				return {
					categories: categories,
					categoriesLoaded: true,
				};
			});
			get().checkAppLoaded();
		},

		setSelectedCategoryId: (categoryId: number) => set({
			selectedCategoryId: categoryId,
		}),

		setProducts: (products: IProduct[]) => {
			set((_state) => {
				return {
					products: products,
					productsLoaded: true,
				};
			});
			get().checkAppLoaded();
		},

		setSearchString: (searchString: string) => set({
			searchString: searchString,
		}),

		updateCartTotals: () => set((state) => {
			return {
				cartPrice: state.cartProducts.reduce((total, item) => total + (item.product.price * item.count), 0),
				cartCount: state.cartProducts.reduce((total, item) => total + item.count, 0),
			};
		}),

		addToCart: (product: IProduct) => {
			set((state) => {
				const existing = state.cartProducts.find(p => p.product.id === product.id);
				let updatedCart: ICartProduct[];

				if (existing) {
					updatedCart = state.cartProducts.map(p =>
						p.product.id === product.id ? { ...p, count: p.count + 1 } : p
					);
				} else {
					updatedCart = [...state.cartProducts, { product, count: 1 }];
				}

				return { cartProducts: updatedCart };
			});

			get().updateCartTotals();
		},

		removeFromCart: (product: IProduct) => {
			set((state) => {
				const existing = state.cartProducts.find(p => p.product.id === product.id);
				if (!existing) { return {}; }

				let updatedCart: ICartProduct[];

				if (existing.count > 1) {
					updatedCart = state.cartProducts.map(p =>
						p.product.id === product.id
							? { ...p, count: p.count - 1 }
							: p
					);
				} else {
					updatedCart = state.cartProducts.filter(p => p.product.id !== product.id);
				}

				return { cartProducts: updatedCart };
			});

			get().updateCartTotals();
		},

		clearCart: () => set({
			cartProducts: [],
			cartCount: 0,
			cartPrice: 0,
		}),

		setResettingCatalog: (resetting: boolean) => set({
			resettingCatalog: resetting,
			resetCounter: resetting ? get().resetCounter : get().resetCounter + 1,
		}),
	}));

if (__DEV__) {
	useNonPersistentStore.subscribe(console.log);
}

