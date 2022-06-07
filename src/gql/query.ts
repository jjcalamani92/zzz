import { gql } from "@apollo/client";

export const SITE = gql`
	query Site($id: String!) {
		site(id: $id) {
			name
		}
	}
`;

export const SITES = gql`
	query Sites {
		sites {
			_id
			title
			categories {
				name
				href
				description
				imageSrc
				imageAlt
			}
		}
	}
`;

export const SITEBYCATEGORY = gql`
	query Sites {
		sites {
			_id
			categories {
				name
				sections {
					name
					items {
						name
						href
						description
						imageSrc
						imageAlt
					}
				}
			}
		}
	}
`;

export const PRODUCTS = gql`
	query Paints {
		paints {
			name
			image
			price
			description
			category
			line
			slug
		}
	}
`;

export const PRODUCT_UPDATE = gql`
	query Paints {
		paints {
			_id
			name
			brand
			description
			image
			inStock
			slug
			line
			category
			price
			tags
		}
	}
`;

export const PRODUCTS_BY_GENDER = gql`
	query wearByGender($gender: String!) {
		wearByGender(gender: $gender) {
			name
			image
			price
			description
			category
			gender
			slug
		}
	}
`;
export const PRODUCTS_BY_LINE_AND_BY_CATEGORY = gql`
	query PaintByLineAndCategory($line: String!, $category: String!) {
		paintByLineAndCategory(line: $line, category: $category) {
			name
			image
			price
			description
			category
			line
			slug
		}
	}
`;

export const PRODUCT_BY_SLUG = gql`
	query PaintBySlug($slug: String!) {
		paintBySlug(slug: $slug) {
			_id
			name
			brand
			description
			image
			inStock
			slug
			category
			line
			price
			oldPrice
			tags
		}
	}
`;
