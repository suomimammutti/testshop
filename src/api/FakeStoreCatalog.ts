import { useNonPersistentStore } from '../store/NonPersistentStore';
import { defaultCategory, ICategory, IProduct } from '../utils/Types';
import { Sleep } from '../utils/Utils';
import { queryAddCategory, queryAddProduct, queryCategories, queryDeleteCategory, queryDeleteProduct, queryProducts } from './Api';

// This file contains data and functions to create a list of products in case someone has cleared the online catalog
// These are only for development and testing purposes

export const resetCatalog = async () => {

	const resettingCatalog = useNonPersistentStore.getState().resettingCatalog;
	const setResettingCatalog = useNonPersistentStore.getState().setResettingCatalog;

	if (resettingCatalog) {
		return;
	}

	setResettingCatalog(true);
	console.log('Resetting catalog...');

	// The following functions will reset catalog without waiting for responses and just brute forces cleanup and hopes it goes well

	// Get all products and delete them so categories can be deleted
	const products = await queryProducts('', -1);
	for (let product of products) {
		queryDeleteProduct(product.id);
	}
	await Sleep(1000);

	// Get all categories and delete them so new categories can be created
	const remoteCategories = await queryCategories(10000);
	for (let category of remoteCategories) {
		if (category.id !== -1) {
			queryDeleteCategory(category.id);
		}
	}
	await Sleep(1000);

	// Create new default categories and get new category ids list to map from old to new
	const newCategoryIds: number[] = [];
	for (let category of catalogCategories) {
		if (category.id !== -1) {
			let res = await queryAddCategory(category);
			newCategoryIds.push(res ? res.id : -1);
		} else {
			newCategoryIds.push(-1);
		}
	}
	await Sleep(1000);

	// Create new products based on the catalog data and update their category ids to the new ones
	for (const product of catalogProducts) {
		let newProduct = product;
		newProduct.category.id = newCategoryIds[newProduct.category.id];
		queryAddProduct(product);
	}
	await Sleep(2000);

	setResettingCatalog(false);
	console.log('Catalog reset complete.');
};

export const catalogCategories: ICategory[] = [
	defaultCategory,
	{
		'id': 1,
		'name': 'Clothes',
		'slug': 'clothes',
		'image': 'https://i.imgur.com/QkIa5tT.jpeg',
		'creationAt': '2025-05-29T20:37:10.000Z',
		'updatedAt': '2025-05-29T20:37:10.000Z',
	},
	{
		'id': 2,
		'name': 'Electronics',
		'slug': 'electronics',
		'image': 'https://i.imgur.com/ZANVnHE.jpeg',
		'creationAt': '2025-05-29T20:37:10.000Z',
		'updatedAt': '2025-05-29T20:37:10.000Z',
	},
	{
		'id': 3,
		'name': 'Furniture',
		'slug': 'furniture',
		'image': 'https://i.imgur.com/Qphac99.jpeg',
		'creationAt': '2025-05-29T20:37:10.000Z',
		'updatedAt': '2025-05-29T20:37:10.000Z',
	},
	{
		'id': 4,
		'name': 'Shoes',
		'slug': 'shoes',
		'image': 'https://i.imgur.com/qNOjJje.jpeg',
		'creationAt': '2025-05-29T20:37:10.000Z',
		'updatedAt': '2025-05-29T20:37:10.000Z',
	},
	{
		'id': 5,
		'name': 'Miscellaneous',
		'slug': 'miscellaneous',
		'image': 'https://i.imgur.com/BG8J0Fj.jpg',
		'creationAt': '2025-05-29T20:37:10.000Z',
		'updatedAt': '2025-05-29T20:37:10.000Z',
	},
];

const catalogProducts: IProduct[] = [
	{
		'id': 1,
		'title': 'Majestic Mountain Graphic T-Shirt',
		'slug': 'majestic-mountain-graphic-t-shirt',
		'price': 44,
		'description': 'Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/QkIa5tT.jpeg',
			'https://i.imgur.com/jb5Yu0h.jpeg',
			'https://i.imgur.com/UlxxXyG.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 2,
		'title': 'Classic Red Pullover Hoodie',
		'slug': 'classic-red-pullover-hoodie',
		'price': 10,
		'description': 'Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/1twoaDy.jpeg',
			'https://i.imgur.com/FDwQgLy.jpeg',
			'https://i.imgur.com/kg1ZhhH.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 3,
		'title': 'Classic Heather Gray Hoodie',
		'slug': 'classic-heather-gray-hoodie',
		'price': 69,
		'description': 'Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/cHddUCu.jpeg',
			'https://i.imgur.com/CFOjAgK.jpeg',
			'https://i.imgur.com/wbIMMme.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 4,
		'title': 'Classic Grey Hooded Sweatshirt',
		'slug': 'classic-grey-hooded-sweatshirt',
		'price': 90,
		'description': 'Elevate your casual wear with our Classic Grey Hooded Sweatshirt. Made from a soft cotton blend, this hoodie features a front kangaroo pocket, an adjustable drawstring hood, and ribbed cuffs for a snug fit. Perfect for those chilly evenings or lazy weekends, it pairs effortlessly with your favorite jeans or joggers.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/R2PN9Wq.jpeg',
			'https://i.imgur.com/IvxMPFr.jpeg',
			'https://i.imgur.com/7eW9nXP.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 5,
		'title': 'Classic Black Hooded Sweatshirt',
		'slug': 'classic-black-hooded-sweatshirt',
		'price': 79,
		'description': 'Elevate your casual wardrobe with our Classic Black Hooded Sweatshirt. Made from high-quality, soft fabric that ensures comfort and durability, this hoodie features a spacious kangaroo pocket and an adjustable drawstring hood. Its versatile design makes it perfect for a relaxed day at home or a casual outing.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/cSytoSD.jpeg',
			'https://i.imgur.com/WwKucXb.jpeg',
			'https://i.imgur.com/cE2Dxh9.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 6,
		'title': 'Classic Comfort Fit Joggers',
		'slug': 'classic-comfort-fit-joggers',
		'price': 25,
		'description': 'Discover the perfect blend of style and comfort with our Classic Comfort Fit Joggers. These versatile black joggers feature a soft elastic waistband with an adjustable drawstring, two side pockets, and ribbed ankle cuffs for a secure fit. Made from a lightweight and durable fabric, they are ideal for both active days and relaxed lounging.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/ZKGofuB.jpeg',
			'https://i.imgur.com/GJi73H0.jpeg',
			'https://i.imgur.com/633Fqrz.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 7,
		'title': 'Classic Comfort Drawstring Joggers',
		'slug': 'classic-comfort-drawstring-joggers',
		'price': 79,
		'description': 'Experience the perfect blend of comfort and style with our Classic Comfort Drawstring Joggers. Designed for a relaxed fit, these joggers feature a soft, stretchable fabric, convenient side pockets, and an adjustable drawstring waist with elegant gold-tipped detailing. Ideal for lounging or running errands, these pants will quickly become your go-to for effortless, casual wear.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/mp3rUty.jpeg',
			'https://i.imgur.com/JQRGIc2.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 8,
		'title': 'Classic Red Jogger Sweatpants',
		'slug': 'classic-red-jogger-sweatpants',
		'price': 98,
		'description': 'Experience ultimate comfort with our red jogger sweatpants, perfect for both workout sessions and lounging around the house. Made with soft, durable fabric, these joggers feature a snug waistband, adjustable drawstring, and practical side pockets for functionality. Their tapered design and elastic cuffs offer a modern fit that keeps you looking stylish on the go.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/9LFjwpI.jpeg',
			'https://i.imgur.com/vzrTgUR.jpeg',
			'https://i.imgur.com/p5NdI6n.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 9,
		'title': 'Classic Navy Blue Baseball Cap',
		'slug': 'classic-navy-blue-baseball-cap',
		'price': 61,
		'description': 'Step out in style with this sleek navy blue baseball cap. Crafted from durable material, it features a smooth, structured design and an adjustable strap for the perfect fit. Protect your eyes from the sun and complement your casual looks with this versatile and timeless accessory.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/R3iobJA.jpeg',
			'https://i.imgur.com/Wv2KTsf.jpeg',
			'https://i.imgur.com/76HAxcA.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 10,
		'title': 'Classic Blue Baseball Cap',
		'slug': 'classic-blue-baseball-cap',
		'price': 86,
		'description': 'Top off your casual look with our Classic Blue Baseball Cap, made from high-quality materials for lasting comfort. Featuring a timeless six-panel design with a pre-curved visor, this adjustable cap offers both style and practicality for everyday wear.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/wXuQ7bm.jpeg',
			'https://i.imgur.com/BZrIEmb.jpeg',
			'https://i.imgur.com/KcT6BE0.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 11,
		'title': 'Classic Red Baseball Cap',
		'slug': 'classic-red-baseball-cap',
		'price': 35,
		'description': 'Elevate your casual wardrobe with this timeless red baseball cap. Crafted from durable fabric, it features a comfortable fit with an adjustable strap at the back, ensuring one size fits all. Perfect for sunny days or adding a sporty touch to your outfit.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/cBuLvBi.jpeg',
			'https://i.imgur.com/N1GkCIR.jpeg',
			'https://i.imgur.com/kKc9A5p.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 12,
		'title': 'Classic Black Baseball Cap',
		'slug': 'classic-black-baseball-cap',
		'price': 58,
		'description': 'Elevate your casual wear with this timeless black baseball cap. Made with high-quality, breathable fabric, it features an adjustable strap for the perfect fit. Whether you’re out for a jog or just running errands, this cap adds a touch of style to any outfit.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/KeqG6r4.jpeg',
			'https://i.imgur.com/xGQOw3p.jpeg',
			'https://i.imgur.com/oO5OUjb.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 13,
		'title': 'Classic Olive Chino Shorts',
		'slug': 'classic-olive-chino-shorts',
		'price': 84,
		'description': 'Elevate your casual wardrobe with these classic olive chino shorts. Designed for comfort and versatility, they feature a smooth waistband, practical pockets, and a tailored fit that makes them perfect for both relaxed weekends and smart-casual occasions. The durable fabric ensures they hold up throughout your daily activities while maintaining a stylish look.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/UsFIvYs.jpeg',
			'https://i.imgur.com/YIq57b6.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 14,
		'title': 'Classic High-Waisted Athletic Shorts',
		'slug': 'classic-high-waisted-athletic-shorts',
		'price': 43,
		'description': 'Stay comfortable and stylish with our Classic High-Waisted Athletic Shorts. Designed for optimal movement and versatility, these shorts are a must-have for your workout wardrobe. Featuring a figure-flattering high waist, breathable fabric, and a secure fit that ensures they stay in place during any activity, these shorts are perfect for the gym, running, or even just casual wear.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/eGOUveI.jpeg',
			'https://i.imgur.com/UcsGO7E.jpeg',
			'https://i.imgur.com/NLn4e7S.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 15,
		'title': 'Classic White Crew Neck T-Shirt',
		'slug': 'classic-white-crew-neck-t-shirt',
		'price': 39,
		'description': 'Elevate your basics with this versatile white crew neck tee. Made from a soft, breathable cotton blend, it offers both comfort and durability. Its sleek, timeless design ensures it pairs well with virtually any outfit. Ideal for layering or wearing on its own, this t-shirt is a must-have staple for every wardrobe.',
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/axsyGpD.jpeg',
			'https://i.imgur.com/T8oq9X2.jpeg',
			'https://i.imgur.com/J6MinJn.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 16,
		'title': 'Classic White Tee - Timeless Style and Comfort',
		'slug': 'classic-white-tee-timeless-style-and-comfort',
		'price': 73,
		'description': "Elevate your everyday wardrobe with our Classic White Tee. Crafted from premium soft cotton material, this versatile t-shirt combines comfort with durability, perfect for daily wear. Featuring a relaxed, unisex fit that flatters every body type, it's a staple piece for any casual ensemble. Easy to care for and machine washable, this white tee retains its shape and softness wash after wash. Pair it with your favorite jeans or layer it under a jacket for a smart look.",
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/Y54Bt8J.jpeg',
			'https://i.imgur.com/SZPDSgy.jpeg',
			'https://i.imgur.com/sJv4Xx0.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 17,
		'title': 'Classic Black T-Shirt',
		'slug': 'classic-black-t-shirt',
		'price': 35,
		'description': "Elevate your everyday style with our Classic Black T-Shirt. This staple piece is crafted from soft, breathable cotton for all-day comfort. Its versatile design features a classic crew neck and short sleeves, making it perfect for layering or wearing on its own. Durable and easy to care for, it's sure to become a favorite in your wardrobe.",
		'category': {
			'id': 1,
			'name': 'Clothes',
			'slug': 'clothes',
			'image': 'https://i.imgur.com/QkIa5tT.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/9DqEOV5.jpeg',
			'https://i.imgur.com/ae0AEYn.jpeg',
			'https://i.imgur.com/mZ4rUjj.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 18,
		'title': 'Sleek White & Orange Wireless Gaming Controller',
		'slug': 'sleek-white-orange-wireless-gaming-controller',
		'price': 69,
		'description': 'Elevate your gaming experience with this state-of-the-art wireless controller, featuring a crisp white base with vibrant orange accents. Designed for precision play, the ergonomic shape and responsive buttons provide maximum comfort and control for endless hours of gameplay. Compatible with multiple gaming platforms, this controller is a must-have for any serious gamer looking to enhance their setup.',
		'category': {
			'id': 2,
			'name': 'Electronics',
			'slug': 'electronics',
			'image': 'https://api.escuelajs.co/api/v1/files/e775.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:49:33.000Z',
		},
		'images': [
			'https://i.imgur.com/ZANVnHE.jpeg',
			'https://i.imgur.com/Ro5z6Tn.jpeg',
			'https://i.imgur.com/woA93Li.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 19,
		'title': 'Sleek Wireless Headphone & Inked Earbud Set',
		'slug': 'sleek-wireless-headphone-inked-earbud-set',
		'price': 44,
		'description': 'Experience the fusion of style and sound with this sophisticated audio set featuring a pair of sleek, white wireless headphones offering crystal-clear sound quality and over-ear comfort. The set also includes a set of durable earbuds, perfect for an on-the-go lifestyle. Elevate your music enjoyment with this versatile duo, designed to cater to all your listening needs.',
		'category': {
			'id': 2,
			'name': 'Electronics',
			'slug': 'electronics',
			'image': 'https://api.escuelajs.co/api/v1/files/e775.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:49:33.000Z',
		},
		'images': [
			'https://i.imgur.com/yVeIeDa.jpeg',
			'https://i.imgur.com/jByJ4ih.jpeg',
			'https://i.imgur.com/KXj6Tpb.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 20,
		'title': 'Sleek Comfort-Fit Over-Ear Headphones',
		'slug': 'sleek-comfort-fit-over-ear-headphones',
		'price': 28,
		'description': "Experience superior sound quality with our Sleek Comfort-Fit Over-Ear Headphones, designed for prolonged use with cushioned ear cups and an adjustable, padded headband. Ideal for immersive listening, whether you're at home, in the office, or on the move. Their durable construction and timeless design provide both aesthetically pleasing looks and long-lasting performance.",
		'category': {
			'id': 2,
			'name': 'Electronics',
			'slug': 'electronics',
			'image': 'https://api.escuelajs.co/api/v1/files/e775.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:49:33.000Z',
		},
		'images': [
			'https://i.imgur.com/SolkFEB.jpeg',
			'https://i.imgur.com/KIGW49u.jpeg',
			'https://i.imgur.com/mWwek7p.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 21,
		'title': 'Efficient 2-Slice Toaster',
		'slug': 'efficient-2-slice-toaster',
		'price': 48,
		'description': 'Enhance your morning routine with our sleek 2-slice toaster, featuring adjustable browning controls and a removable crumb tray for easy cleaning. This compact and stylish appliance is perfect for any kitchen, ensuring your toast is always golden brown and delicious.',
		'category': {
			'id': 2,
			'name': 'Electronics',
			'slug': 'electronics',
			'image': 'https://api.escuelajs.co/api/v1/files/e775.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:49:33.000Z',
		},
		'images': [
			'https://i.imgur.com/keVCVIa.jpeg',
			'https://i.imgur.com/afHY7v2.jpeg',
			'https://i.imgur.com/yAOihUe.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 22,
		'title': 'Sleek Wireless Computer Mouse',
		'slug': 'sleek-wireless-computer-mouse',
		'price': 10,
		'description': 'Experience smooth and precise navigation with this modern wireless mouse, featuring a glossy finish and a comfortable ergonomic design. Its responsive tracking and easy-to-use interface make it the perfect accessory for any desktop or laptop setup. The stylish blue hue adds a splash of color to your workspace, while its compact size ensures it fits neatly in your bag for on-the-go productivity.',
		'category': {
			'id': 2,
			'name': 'Electronics',
			'slug': 'electronics',
			'image': 'https://api.escuelajs.co/api/v1/files/e775.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:49:33.000Z',
		},
		'images': [
			'https://i.imgur.com/w3Y8NwQ.jpeg',
			'https://i.imgur.com/WJFOGIC.jpeg',
			'https://i.imgur.com/dV4Nklf.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 23,
		'title': 'Sleek Modern Laptop with Ambient Lighting',
		'slug': 'sleek-modern-laptop-with-ambient-lighting',
		'price': 43,
		'description': 'Experience next-level computing with our ultra-slim laptop, featuring a stunning display illuminated by ambient lighting. This high-performance machine is perfect for both work and play, delivering powerful processing in a sleek, portable design. The vibrant colors add a touch of personality to your tech collection, making it as stylish as it is functional.',
		'category': {
			'id': 2,
			'name': 'Electronics',
			'slug': 'electronics',
			'image': 'https://api.escuelajs.co/api/v1/files/e775.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:49:33.000Z',
		},
		'images': [
			'https://i.imgur.com/OKn1KFI.jpeg',
			'https://i.imgur.com/G4f21Ai.jpeg',
			'https://i.imgur.com/Z9oKRVJ.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 24,
		'title': 'Sleek Modern Laptop for Professionals',
		'slug': 'sleek-modern-laptop-for-professionals',
		'price': 97,
		'description': 'Experience cutting-edge technology and elegant design with our latest laptop model. Perfect for professionals on-the-go, this high-performance laptop boasts a powerful processor, ample storage, and a long-lasting battery life, all encased in a lightweight, slim frame for ultimate portability. Shop now to elevate your work and play.',
		'category': {
			'id': 2,
			'name': 'Electronics',
			'slug': 'electronics',
			'image': 'https://api.escuelajs.co/api/v1/files/e775.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:49:33.000Z',
		},
		'images': [
			'https://i.imgur.com/ItHcq7o.jpeg',
			'https://i.imgur.com/55GM3XZ.jpeg',
			'https://i.imgur.com/tcNJxoW.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 25,
		'title': 'Stylish Red & Silver Over-Ear Headphones',
		'slug': 'stylish-red-silver-over-ear-headphones',
		'price': 39,
		'description': 'Immerse yourself in superior sound quality with these sleek red and silver over-ear headphones. Designed for comfort and style, the headphones feature cushioned ear cups, an adjustable padded headband, and a detachable red cable for easy storage and portability. Perfect for music lovers and audiophiles who value both appearance and audio fidelity.',
		'category': {
			'id': 2,
			'name': 'Electronics',
			'slug': 'electronics',
			'image': 'https://api.escuelajs.co/api/v1/files/e775.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:49:33.000Z',
		},
		'images': [
			'https://i.imgur.com/YaSqa06.jpeg',
			'https://i.imgur.com/isQAliJ.jpeg',
			'https://i.imgur.com/5B8UQfh.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 26,
		'title': 'Sleek Mirror Finish Phone Case',
		'slug': 'sleek-mirror-finish-phone-case',
		'price': 27,
		'description': "Enhance your smartphone's look with this ultra-sleek mirror finish phone case. Designed to offer style with protection, the case features a reflective surface that adds a touch of elegance while keeping your device safe from scratches and impacts. Perfect for those who love a minimalist and modern aesthetic.",
		'category': {
			'id': 2,
			'name': 'Electronics',
			'slug': 'electronics',
			'image': 'https://api.escuelajs.co/api/v1/files/e775.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:49:33.000Z',
		},
		'images': [
			'https://i.imgur.com/yb9UQKL.jpeg',
			'https://i.imgur.com/m2owtQG.jpeg',
			'https://i.imgur.com/bNiORct.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 27,
		'title': 'Sleek Smartwatch with Vibrant Display',
		'slug': 'sleek-smartwatch-with-vibrant-display',
		'price': 16,
		'description': 'Experience modern timekeeping with our high-tech smartwatch, featuring a vivid touch screen display, customizable watch faces, and a comfortable blue silicone strap. This smartwatch keeps you connected with notifications and fitness tracking while showcasing exceptional style and versatility.',
		'category': {
			'id': 2,
			'name': 'Electronics',
			'slug': 'electronics',
			'image': 'https://api.escuelajs.co/api/v1/files/e775.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:49:33.000Z',
		},
		'images': [
			'https://i.imgur.com/LGk9Jn2.jpeg',
			'https://i.imgur.com/1ttYWaI.jpeg',
			'https://i.imgur.com/sPRWnJH.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 28,
		'title': 'Sleek Modern Leather Sofa',
		'slug': 'sleek-modern-leather-sofa',
		'price': 53,
		'description': 'Enhance the elegance of your living space with our Sleek Modern Leather Sofa. Designed with a minimalist aesthetic, it features clean lines and a luxurious leather finish. The robust metal legs provide stability and support, while the plush cushions ensure comfort. Perfect for contemporary homes or office waiting areas, this sofa is a statement piece that combines style with practicality.',
		'category': {
			'id': 3,
			'name': 'Furniture',
			'slug': 'furniture',
			'image': 'https://i.imgur.com/Qphac99.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/Qphac99.jpeg',
			'https://i.imgur.com/dJjpEgG.jpeg',
			'https://i.imgur.com/MxJyADq.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 29,
		'title': 'Mid-Century Modern Wooden Dining Table',
		'slug': 'mid-century-modern-wooden-dining-table',
		'price': 24,
		'description': 'Elevate your dining room with this sleek Mid-Century Modern dining table, featuring an elegant walnut finish and tapered legs for a timeless aesthetic. Its sturdy wood construction and minimalist design make it a versatile piece that fits with a variety of decor styles. Perfect for intimate dinners or as a stylish spot for your morning coffee.',
		'category': {
			'id': 3,
			'name': 'Furniture',
			'slug': 'furniture',
			'image': 'https://i.imgur.com/Qphac99.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/DMQHGA0.jpeg',
			'https://i.imgur.com/qrs9QBg.jpeg',
			'https://i.imgur.com/XVp8T1I.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 30,
		'title': 'Elegant Golden-Base Stone Top Dining Table',
		'slug': 'elegant-golden-base-stone-top-dining-table',
		'price': 66,
		'description': 'Elevate your dining space with this luxurious table, featuring a sturdy golden metal base with an intricate rod design that provides both stability and chic elegance. The smooth stone top in a sleek round shape offers a robust surface for your dining pleasure. Perfect for both everyday meals and special occasions, this table easily complements any modern or glam decor.',
		'category': {
			'id': 3,
			'name': 'Furniture',
			'slug': 'furniture',
			'image': 'https://i.imgur.com/Qphac99.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/NWIJKUj.jpeg',
			'https://i.imgur.com/Jn1YSLk.jpeg',
			'https://i.imgur.com/VNZRvx5.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 31,
		'title': 'Modern Elegance Teal Armchair',
		'slug': 'modern-elegance-teal-armchair',
		'price': 25,
		'description': 'Elevate your living space with this beautifully crafted armchair, featuring a sleek wooden frame that complements its vibrant teal upholstery. Ideal for adding a pop of color and contemporary style to any room, this chair provides both superb comfort and sophisticated design. Perfect for reading, relaxing, or creating a cozy conversation nook.',
		'category': {
			'id': 3,
			'name': 'Furniture',
			'slug': 'furniture',
			'image': 'https://i.imgur.com/Qphac99.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/6wkyyIN.jpeg',
			'https://i.imgur.com/Ald3Rec.jpeg',
			'https://i.imgur.com/dIqo03c.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 32,
		'title': 'Elegant Solid Wood Dining Table',
		'slug': 'elegant-solid-wood-dining-table',
		'price': 67,
		'description': 'Enhance your dining space with this sleek, contemporary dining table, crafted from high-quality solid wood with a warm finish. Its sturdy construction and minimalist design make it a perfect addition for any home looking for a touch of elegance. Accommodates up to six guests comfortably and includes a striking fruit bowl centerpiece. The overhead lighting is not included.',
		'category': {
			'id': 3,
			'name': 'Furniture',
			'slug': 'furniture',
			'image': 'https://i.imgur.com/Qphac99.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/4lTaHfF.jpeg',
			'https://i.imgur.com/JktHE1C.jpeg',
			'https://i.imgur.com/cQeXQMi.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 33,
		'title': 'Modern Minimalist Workstation Setup',
		'slug': 'modern-minimalist-workstation-setup',
		'price': 49,
		'description': 'Elevate your home office with our Modern Minimalist Workstation Setup, featuring a sleek wooden desk topped with an elegant computer, stylish adjustable wooden desk lamp, and complimentary accessories for a clean, productive workspace. This setup is perfect for professionals seeking a contemporary look that combines functionality with design.',
		'category': {
			'id': 3,
			'name': 'Furniture',
			'slug': 'furniture',
			'image': 'https://i.imgur.com/Qphac99.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/3oXNBst.jpeg',
			'https://i.imgur.com/ErYYZnT.jpeg',
			'https://i.imgur.com/boBPwYW.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 34,
		'title': 'Modern Ergonomic Office Chair',
		'slug': 'modern-ergonomic-office-chair',
		'price': 71,
		'description': 'Elevate your office space with this sleek and comfortable Modern Ergonomic Office Chair. Designed to provide optimal support throughout the workday, it features an adjustable height mechanism, smooth-rolling casters for easy mobility, and a cushioned seat for extended comfort. The clean lines and minimalist white design make it a versatile addition to any contemporary workspace.',
		'category': {
			'id': 3,
			'name': 'Furniture',
			'slug': 'furniture',
			'image': 'https://i.imgur.com/Qphac99.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/3dU0m72.jpeg',
			'https://i.imgur.com/zPU3EVa.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 35,
		'title': 'Futuristic Holographic Soccer Cleats',
		'slug': 'futuristic-holographic-soccer-cleats',
		'price': 39,
		'description': "Step onto the field and stand out from the crowd with these eye-catching holographic soccer cleats. Designed for the modern player, these cleats feature a sleek silhouette, lightweight construction for maximum agility, and durable studs for optimal traction. The shimmering holographic finish reflects a rainbow of colors as you move, ensuring that you'll be noticed for both your skills and style. Perfect for the fashion-forward athlete who wants to make a statement.",
		'category': {
			'id': 4,
			'name': 'Shoes',
			'slug': 'shoes',
			'image': 'https://i.imgur.com/qNOjJje.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/qNOjJje.jpeg',
			'https://i.imgur.com/NjfCFnu.jpeg',
			'https://i.imgur.com/eYtvXS1.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 36,
		'title': 'Rainbow Glitter High Heels',
		'slug': 'rainbow-glitter-high-heels',
		'price': 39,
		'description': 'Step into the spotlight with these eye-catching rainbow glitter high heels. Designed to dazzle, each shoe boasts a kaleidoscope of shimmering colors that catch and reflect light with every step. Perfect for special occasions or a night out, these stunners are sure to turn heads and elevate any ensemble.',
		'category': {
			'id': 4,
			'name': 'Shoes',
			'slug': 'shoes',
			'image': 'https://i.imgur.com/qNOjJje.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/62gGzeF.jpeg',
			'https://i.imgur.com/5MoPuFM.jpeg',
			'https://i.imgur.com/sUVj7pK.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 37,
		'title': 'Chic Summer Denim Espadrille Sandals',
		'slug': 'chic-summer-denim-espadrille-sandals',
		'price': 33,
		'description': 'Step into summer with style in our denim espadrille sandals. Featuring a braided jute sole for a classic touch and adjustable denim straps for a snug fit, these sandals offer both comfort and a fashionable edge. The easy slip-on design ensures convenience for beach days or casual outings.',
		'category': {
			'id': 4,
			'name': 'Shoes',
			'slug': 'shoes',
			'image': 'https://i.imgur.com/qNOjJje.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/9qrmE1b.jpeg',
			'https://i.imgur.com/wqKxBVH.jpeg',
			'https://i.imgur.com/sWSV6DK.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 38,
		'title': 'Vibrant Runners: Bold Orange & Blue Sneakers',
		'slug': 'vibrant-runners-bold-orange-blue-sneakers',
		'price': 27,
		'description': "Step into style with these eye-catching sneakers featuring a striking combination of orange and blue hues. Designed for both comfort and fashion, these shoes come with flexible soles and cushioned insoles, perfect for active individuals who don't compromise on style. The reflective silver accents add a touch of modernity, making them a standout accessory for your workout or casual wear.",
		'category': {
			'id': 4,
			'name': 'Shoes',
			'slug': 'shoes',
			'image': 'https://i.imgur.com/qNOjJje.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/hKcMNJs.jpeg',
			'https://i.imgur.com/NYToymX.jpeg',
			'https://i.imgur.com/HiiapCt.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 39,
		'title': 'Vibrant Pink Classic Sneakers',
		'slug': 'vibrant-pink-classic-sneakers',
		'price': 84,
		'description': 'Step into style with our Vibrant Pink Classic Sneakers! These eye-catching shoes feature a bold pink hue with iconic white detailing, offering a sleek, timeless design. Constructed with durable materials and a comfortable fit, they are perfect for those seeking a pop of color in their everyday footwear. Grab a pair today and add some vibrancy to your step!',
		'category': {
			'id': 4,
			'name': 'Shoes',
			'slug': 'shoes',
			'image': 'https://i.imgur.com/qNOjJje.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/mcW42Gi.jpeg',
			'https://i.imgur.com/mhn7qsF.jpeg',
			'https://i.imgur.com/F8vhnFJ.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 40,
		'title': 'Futuristic Silver and Gold High-Top Sneaker',
		'slug': 'futuristic-silver-and-gold-high-top-sneaker',
		'price': 68,
		'description': 'Step into the future with this eye-catching high-top sneaker, designed for those who dare to stand out. The sneaker features a sleek silver body with striking gold accents, offering a modern twist on classic footwear. Its high-top design provides support and style, making it the perfect addition to any avant-garde fashion collection. Grab a pair today and elevate your shoe game!',
		'category': {
			'id': 4,
			'name': 'Shoes',
			'slug': 'shoes',
			'image': 'https://i.imgur.com/qNOjJje.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/npLfCGq.jpeg',
			'https://i.imgur.com/vYim3gj.jpeg',
			'https://i.imgur.com/HxuHwBO.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 41,
		'title': 'Futuristic Chic High-Heel Boots',
		'slug': 'futuristic-chic-high-heel-boots',
		'price': 36,
		'description': 'Elevate your style with our cutting-edge high-heel boots that blend bold design with avant-garde aesthetics. These boots feature a unique color-block heel, a sleek silhouette, and a versatile light grey finish that pairs easily with any cutting-edge outfit. Crafted for the fashion-forward individual, these boots are sure to make a statement.',
		'category': {
			'id': 4,
			'name': 'Shoes',
			'slug': 'shoes',
			'image': 'https://i.imgur.com/qNOjJje.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/HqYqLnW.jpeg',
			'https://i.imgur.com/RlDGnZw.jpeg',
			'https://i.imgur.com/qa0O6fg.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 42,
		'title': 'Elegant Patent Leather Peep-Toe Pumps with Gold-Tone Heel',
		'slug': 'elegant-patent-leather-peep-toe-pumps',
		'price': 53,
		'description': 'Step into sophistication with these chic peep-toe pumps, showcasing a lustrous patent leather finish and an eye-catching gold-tone block heel. The ornate buckle detail adds a touch of glamour, perfect for elevating your evening attire or complementing a polished daytime look.',
		'category': {
			'id': 4,
			'name': 'Shoes',
			'slug': 'shoes',
			'image': 'https://i.imgur.com/qNOjJje.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/AzAY4Ed.jpeg',
			'https://i.imgur.com/umfnS9P.jpeg',
			'https://i.imgur.com/uFyuvLg.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 43,
		'title': 'Elegant Purple Leather Loafers',
		'slug': 'elegant-purple-leather-loafers',
		'price': 17,
		'description': "Step into sophistication with our Elegant Purple Leather Loafers, perfect for making a bold statement. Crafted from high-quality leather with a vibrant purple finish, these shoes feature a classic loafer silhouette that's been updated with a contemporary twist. The comfortable slip-on design and durable soles ensure both style and functionality for the modern man.",
		'category': {
			'id': 4,
			'name': 'Shoes',
			'slug': 'shoes',
			'image': 'https://i.imgur.com/qNOjJje.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/Au8J9sX.jpeg',
			'https://i.imgur.com/gdr8BW2.jpeg',
			'https://i.imgur.com/KDCZxnJ.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 44,
		'title': 'Classic Blue Suede Casual Shoes',
		'slug': 'classic-blue-suede-casual-shoes',
		'price': 39,
		'description': 'Step into comfort with our Classic Blue Suede Casual Shoes, perfect for everyday wear. These shoes feature a stylish blue suede upper, durable rubber soles for superior traction, and classic lace-up fronts for a snug fit. The sleek design pairs well with both jeans and chinos, making them a versatile addition to any wardrobe.',
		'category': {
			'id': 4,
			'name': 'Shoes',
			'slug': 'shoes',
			'image': 'https://i.imgur.com/qNOjJje.jpeg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/sC0ztOB.jpeg',
			'https://i.imgur.com/Jf9DL9R.jpeg',
			'https://i.imgur.com/R1IN95T.jpeg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 45,
		'title': 'Sleek Futuristic Electric Bicycle',
		'slug': 'sleek-futuristic-electric-bicycle',
		'price': 22,
		'description': "This modern electric bicycle combines style and efficiency with its unique design and top-notch performance features. Equipped with a durable frame, enhanced battery life, and integrated tech capabilities, it's perfect for the eco-conscious commuter looking to navigate the city with ease.",
		'category': {
			'id': 5,
			'name': 'Miscellaneous',
			'slug': 'miscellaneous',
			'image': 'https://i.imgur.com/BG8J0Fj.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/BG8J0Fj.jpg',
			'https://i.imgur.com/ujHBpCX.jpg',
			'https://i.imgur.com/WHeVL9H.jpg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 46,
		'title': 'Sleek All-Terrain Go-Kart',
		'slug': 'sleek-all-terrain-go-kart',
		'price': 37,
		'description': 'Experience the thrill of outdoor adventures with our Sleek All-Terrain Go-Kart, featuring a durable frame, comfortable racing seat, and robust, large-tread tires perfect for handling a variety of terrains. Designed for fun-seekers of all ages, this go-kart is an ideal choice for backyard racing or exploring local trails.',
		'category': {
			'id': 5,
			'name': 'Miscellaneous',
			'slug': 'miscellaneous',
			'image': 'https://i.imgur.com/BG8J0Fj.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/Ex5x3IU.jpg',
			'https://i.imgur.com/z7wAQwe.jpg',
			'https://i.imgur.com/kc0Dj9S.jpg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 47,
		'title': 'Radiant Citrus Eau de Parfum',
		'slug': 'radiant-citrus-eau-de-parfum',
		'price': 73,
		'description': "Indulge in the essence of summer with this vibrant citrus-scented Eau de Parfum. Encased in a sleek glass bottle with a bold orange cap, this fragrance embodies freshness and elegance. Perfect for daily wear, it's an olfactory delight that leaves a lasting, zesty impression.",
		'category': {
			'id': 5,
			'name': 'Miscellaneous',
			'slug': 'miscellaneous',
			'image': 'https://i.imgur.com/BG8J0Fj.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/xPDwUb3.jpg',
			'https://i.imgur.com/3rfp691.jpg',
			'https://i.imgur.com/kG05a29.jpg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 48,
		'title': 'Sleek Olive Green Hardshell Carry-On Luggage',
		'slug': 'sleek-olive-green-hardshell-carry-on-luggage',
		'price': 48,
		'description': 'Travel in style with our durable hardshell carry-on, perfect for weekend getaways and business trips. This sleek olive green suitcase features smooth gliding wheels for easy airport navigation, a sturdy telescopic handle, and a secure zippered compartment to keep your belongings safe. Its compact size meets most airline overhead bin requirements, ensuring a hassle-free flying experience.',
		'category': {
			'id': 5,
			'name': 'Miscellaneous',
			'slug': 'miscellaneous',
			'image': 'https://i.imgur.com/BG8J0Fj.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/jVfoZnP.jpg',
			'https://i.imgur.com/Tnl15XK.jpg',
			'https://i.imgur.com/7OqTPO6.jpg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 49,
		'title': 'Chic Transparent Fashion Handbag',
		'slug': 'chic-transparent-fashion-handbag',
		'price': 61,
		'description': 'Elevate your style with our Chic Transparent Fashion Handbag, perfect for showcasing your essentials with a clear, modern edge. This trendy accessory features durable acrylic construction, luxe gold-tone hardware, and an elegant chain strap. Its compact size ensures you can carry your day-to-day items with ease and sophistication.',
		'category': {
			'id': 5,
			'name': 'Miscellaneous',
			'slug': 'miscellaneous',
			'image': 'https://i.imgur.com/BG8J0Fj.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/Lqaqz59.jpg',
			'https://i.imgur.com/uSqWK0m.jpg',
			'https://i.imgur.com/atWACf1.jpg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 50,
		'title': 'Trendy Pink-Tinted Sunglasses',
		'slug': 'trendy-pink-tinted-sunglasses',
		'price': 38,
		'description': 'Step up your style game with these fashionable black-framed, pink-tinted sunglasses. Perfect for making a statement while protecting your eyes from the glare. Their bold color and contemporary design make these shades a must-have accessory for any trendsetter looking to add a pop of color to their ensemble.',
		'category': {
			'id': 5,
			'name': 'Miscellaneous',
			'slug': 'miscellaneous',
			'image': 'https://i.imgur.com/BG8J0Fj.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/0qQBkxX.jpg',
			'https://i.imgur.com/I5g1DoE.jpg',
			'https://i.imgur.com/myfFQBW.jpg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
	{
		'id': 51,
		'title': 'Elegant Glass Tumbler Set',
		'slug': 'elegant-glass-tumbler-set',
		'price': 50,
		'description': 'Enhance your drinkware collection with our sophisticated set of glass tumblers, perfect for serving your favorite beverages. This versatile set includes both clear and subtly tinted glasses, lending a modern touch to any table setting. Crafted with quality materials, these durable tumblers are designed to withstand daily use while maintaining their elegant appeal.',
		'category': {
			'id': 5,
			'name': 'Miscellaneous',
			'slug': 'miscellaneous',
			'image': 'https://i.imgur.com/BG8J0Fj.jpg',
			'creationAt': '2025-05-30T20:45:50.000Z',
			'updatedAt': '2025-05-30T20:45:50.000Z',
		},
		'images': [
			'https://i.imgur.com/TF0pXdL.jpg',
			'https://i.imgur.com/BLDByXP.jpg',
			'https://i.imgur.com/b7trwCv.jpg',
		],
		'creationAt': '2025-05-30T20:45:50.000Z',
		'updatedAt': '2025-05-30T20:45:50.000Z',
	},
];


/*
export const catalogProducts: IProduct[] = [
	{
		"id": 1,
		"title": "Classic Denim Jacket",
		"category": {
			"id": 1
		},
		"price": 59.99,
		"description": "This classic denim jacket offers a timeless look with its medium wash and sturdy construction. Designed for both comfort and durability, it features a button-front closure, chest flap pockets, and side welt pockets. The jacket's versatile style makes it suitable for various occasions, whether you're dressing up or down. Its tailored fit ensures a flattering silhouette, while the high-quality denim fabric provides long-lasting wear. Pair it with your favorite jeans or a dress for a chic ensemble.",
		"images": [
			"https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg",
			"https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg"
		]
	},
	{
		"id": 2,
		"title": "Wireless Noise-Cancelling Headphones",
		"category": {
			"id": 2
		},
		"price": 199.99,
		"description": "Experience unparalleled sound quality with these wireless noise-cancelling headphones. Featuring advanced noise reduction technology, they allow you to immerse yourself in music without external distractions. The ergonomic design ensures a comfortable fit for extended listening sessions. With up to 30 hours of battery life and quick charging capabilities, they're perfect for travel and daily commutes. Integrated touch controls and voice assistant compatibility provide seamless operation.",
		"images": [
			"https://images.pexels.com/photos/374876/pexels-photo-374876.jpeg",
			"https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg"

		]
	},
	{
		"id": 3,
		"title": "Modern Wooden Coffee Table",
		"category": {
			"id": 3
		},
		"price": 149.99,
		"description": "Elevate your living space with this modern wooden coffee table. Crafted from high-quality oak, it boasts a minimalist design with clean lines and a smooth finish. The spacious tabletop provides ample room for beverages, books, and decorative items, while the lower shelf offers additional storage. Its sturdy construction ensures durability, making it a functional and stylish addition to any home decor.",
		"images": [
			"https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
			"https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg"
		]
	},
	{
		"id": 4,
		"title": "Men's Running Sneakers",
		"category": {
			"id": 4
		},
		"price": 89.99,
		"description": "Enhance your performance with these men's running sneakers. Designed with breathable mesh uppers and cushioned soles, they provide optimal comfort and support during workouts. The lightweight construction ensures agility, while the durable outsole offers excellent traction on various surfaces. Sleek and stylish, these sneakers are perfect for both athletic activities and casual wear.",
		"images": [
			"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
			"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
		]
	},
	{
		"id": 5,
		"title": "Stainless Steel Water Bottle",
		"category": {
			"id": 5
		},
		"price": 24.99,
		"description": "Stay hydrated with this stainless steel water bottle. Featuring double-wall insulation, it keeps beverages cold for up to 24 hours and hot for up to 12 hours. The leak-proof lid and durable construction make it ideal for on-the-go use, whether you're at the gym, office, or outdoors. Its sleek design fits most cup holders, and the BPA-free materials ensure safe drinking.",
		"images": [
			"https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg",
			"https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg"
		]
	},
	{
		"id": 6,
		"title": "Vintage Leather Messenger Bag",
		"category": {
			"id": 1
		},
		"price": 89.99,
		"description": "Crafted from premium full-grain leather, this vintage messenger bag offers both style and functionality. Featuring multiple compartments and an adjustable shoulder strap, it's perfect for daily commutes or weekend getaways.",
		"images": [
			"https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg"
		]
	},
	{
		"id": 7,
		"title": "Modern Minimalist Floor Lamp",
		"category": {
			"id": 3
		},
		"price": 129.99,
		"description": "Illuminate your space with this modern minimalist floor lamp. Featuring a sleek metal frame and adjustable head, it adds a touch of elegance to any room while providing ample lighting.",
		"images": [
			"https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg",
			"https://images.pexels.com/photos/112812/pexels-photo-112812.jpeg"
		]
	},
	{
		"id": 8,
		"title": "Women's Summer Maxi Dress",
		"category": {
			"id": 1
		},
		"price": 49.99,
		"description": "Stay cool and stylish with this women's summer maxi dress. Made from lightweight fabric, it features a flattering silhouette and vibrant patterns perfect for warm days.",
		"images": [
			"https://images.pexels.com/photos/234567/pexels-photo-234567.jpeg"
		]
	},
	{
		"id": 9,
		"title": "Wireless Charging Pad",
		"category": {
			"id": 2
		},
		"price": 29.99,
		"description": "Charge your devices effortlessly with this sleek wireless charging pad. Its compact design and fast-charging capabilities make it a must-have accessory for your tech collection.",
		"images": [
			"https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg",
			"https://images.pexels.com/photos/325154/pexels-photo-325154.jpeg"
		]
	},
	{
		"id": 10,
		"title": "Men's Casual Sneakers",
		"category": {
			"id": 4
		},
		"price": 59.99,
		"description": "Step out in style with these men's casual sneakers. Designed for comfort and durability, they're perfect for everyday wear and pair well with various outfits.",
		"images": [
			"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
			"https://images.pexels.com/photos/2529149/pexels-photo-2529149.jpeg"
		]
	},
	{
		"id": 11,
		"title": "Stainless Steel Water Bottle",
		"category": {
			"id": 5
		},
		"price": 19.99,
		"description": "Keep your beverages at the desired temperature with this stainless steel water bottle. Its double-wall insulation ensures drinks stay hot or cold for hours.",
		"images": [
			"https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg",
			"https://images.pexels.com/photos/416529/pexels-photo-416529.jpeg"
		]
	},
	{
		"id": 12,
		"title": "Modern Wooden Coffee Table",
		"category": {
			"id": 3
		},
		"price": 199.99,
		"description": "Add a touch of elegance to your living space with this modern wooden coffee table. Its sleek design and sturdy construction make it both functional and stylish.",
		"images": [
			"https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg",
			"https://images.pexels.com/photos/276529/pexels-photo-276529.jpeg"
		]
	},
	{
		"id": 13,
		"title": "Stylish shoes",
		"category": {
			"id": 4
		},
		"price": 199.99,
		"description": "Very stylish shoes with yellow highlights",
		"images": [
			"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			"https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
		]
	},
	{
		"id": 14,
		"title": "Large sofa",
		"category": {
			"id": 3
		},
		"price": 199.99,
		"description": "Clean and modern sofa for every home",
		"images": [
			"https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			"https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
		]
	},
	{
		"id": 15,
		"title": "Phone of the day",
		"category": {
			"id": 2
		},
		"price": 199.99,
		"description": "Fast and stylish phone for the influencer of today",
		"images": [
			"https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			"https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
		]
	},
	{
		"id": 16,
		"title": "Jean skirt",
		"category": {
			"id": 1
		},
		"price": 199.99,
		"description": "Fitting and stylish for the modern woman of today",
		"images": [
			"https://images.pexels.com/photos/1425248/pexels-photo-1425248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
			"https://images.pexels.com/photos/1425249/pexels-photo-1425249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
		]
	},
];*/
