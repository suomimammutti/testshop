import { defaultCategory, ICategory, IProduct } from '../utils/Types';
import { apiRequest } from './ApiRequest';

export const queryCategories = async (limit: number): Promise<ICategory[]> => {
	const data = await apiRequest<ICategory[]>('/categories', {
		params: { limit: limit },
	}, 'fetching categories');

	const sorted = data?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
	return [defaultCategory, ...sorted];
};

export const queryProducts = async (searchString: string, selectedCategoryId: number, abort?: AbortSignal): Promise<IProduct[]> => {
	const params: Record<string, string | number> = {};
	if (selectedCategoryId !== -1) { params.categoryId = selectedCategoryId; }
	if (searchString.trim()) { params.title = searchString.trim(); }

	const data = await apiRequest<IProduct[]>(
		'/products/',
		{ params, signal: abort },
		'fetching products'
	);

	return data?.sort((a, b) => a.title.localeCompare(b.title)) ?? [];
};

// Functions below are for testing purposes to force the catalog to default state

export const queryDeleteProduct = async (id: number): Promise<boolean> => {
	const result = await apiRequest<void>(
		`/products/${id}`,
		{ method: 'DELETE' },
		`deleting product with id(${id})`
	);
	return result !== null;
};

export const queryAddProduct = async (product: IProduct): Promise<boolean> => {
	const result = await apiRequest<void>(
		'/products',
		{
			method: 'POST',
			body: {
				title: product.title,
				price: product.price,
				description: product.description,
				categoryId: product.category.id,
				images: product.images,
			},
		},
		`creating product ${product.title}`
	);
	return result !== null;
};

export const queryDeleteCategory = async (categoryId: number): Promise<boolean> => {
	const result = await apiRequest<void>(
		`/categories/${categoryId}`,
		{
			method: 'DELETE',
		},
		`deleting category ${categoryId}`
	);
	return result !== null;
};

export const queryAddCategory = async (category: ICategory): Promise<ICategory | null> => {
	const data = await apiRequest<ICategory>(
		'/categories',
		{
			method: 'POST',
			body: {
				name: category.name,
				slug: category.slug,
				image: category.image,
			},
		},
		`creating category ${category.name}`
	);
	return data;
};

export const updateCategory = async (category: ICategory): Promise<boolean> => {
	const result = await apiRequest<void>(
		`/categories/${category.id}`,
		{
			method: 'PUT',
			body: {
				name: category.name,
				slug: category.slug,
				image: category.image,
			},
		},
		`updating category ${category.name}`
	);
	return result != null;
};

