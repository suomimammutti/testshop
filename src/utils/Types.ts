interface ITimeStamped {
	creationAt: string;
	updatedAt: string;
}

export interface ICategory extends ITimeStamped {
	id: number;
	name: string;
	slug: string;
	image: string;
}

export interface IProduct extends ITimeStamped {
	id: number;
	title: string;
	slug: string;
	price: number;
	category: ICategory;
	description: string;
	images: string[];
}

export interface ICartProduct {
	product: IProduct;
	count: number;
}

export const defaultCategory: Readonly<ICategory> = {
	id: -1,
	name: 'All Categories',
	slug: 'all-categories',
	image: '',
	creationAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};
