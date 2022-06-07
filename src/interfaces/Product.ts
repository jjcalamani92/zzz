export interface IProduct {
	_id: string;
	name: string;
	brand: string;
	image: string[];
	description: string;
	inStock: number;
	slug: string;
	category: string;
	line: string;
	price: number;
	oldPrice: number;
	tags: string[];
	status: boolean;
	site: string;
}
