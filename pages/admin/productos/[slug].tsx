import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IProduct } from "../../../src/interfaces";
import { Form02, Layout, Spinner01 } from "../../../components";
import { useQuery } from "@apollo/client";
import { PRODUCT_BY_SLUG, PRODUCTS, PRODUCT_UPDATE } from '../../../src/gql/query';
import { client } from '../../../src/apollo';

interface Props {
	slug: string;
}

const SlugEditPage: NextPage<Props> = ({ slug }) => {
	const { loading, error, data } = useQuery(PRODUCT_BY_SLUG, {
		variables: { slug: `${slug}` }
	});
	if (loading) return <Spinner01 />;
	console.log(data)
	const product = data.wearBySlug
	console.log(product)
	return (
		<Layout
			title={`${product.title}`}
			pageDescription={`${product.description}`}
			imageFullUrl={`${product.image[1]}`}
		>
      <Form02 product={product}/>
			{/* <FormProductEdit product={product} /> */}
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	
	const { data } = await client.query({
		query: PRODUCTS
	});

	const paths = data.wears.map((wear: IProduct) => ({
		params: { slug: wear.slug }
	}));
	// console.log(paths)
	return {
		paths,
		fallback: false
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = "" } = params as { slug: string };
	return {
		props: {
			slug
		},
		revalidate: 60 * 60 * 24
	};
};
export default SlugEditPage;
