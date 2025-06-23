import { ColorValue } from 'react-native';

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

export interface ITheme {
	primary: ColorValue;
	primaryDark: ColorValue;
	attentionColor: ColorValue;

	defaultFontSize: number;

	primaryFontLight: ColorValue;
	primaryFontDark: ColorValue;
	secondaryFont: ColorValue;

	backgroundColor: ColorValue;
	cardColor: ColorValue;
	white: ColorValue;
	black: ColorValue;

	cardBorderRadius: number;
	cardBorderWidth: number;

	fieldHeight: number;
	fieldBorderRadius: number;
}
