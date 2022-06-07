export interface Product {
	_id: string;
	title: string;
	brand: string;
	image: string[];
	description: string;
	inStock: number;
	slug: string;
	gender: string;
	category: string;
	price: number;
	tags: string[];
}