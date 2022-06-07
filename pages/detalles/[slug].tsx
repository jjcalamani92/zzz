import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
	Layout,
	Spinner01,
	ProductOverviews05
} from "../../components";
import { useQuery } from "@apollo/client";
import { IProduct } from "../../src/interfaces";
import { PRODUCTS, PRODUCT_BY_SLUG } from "../../src/gql/query";
import { client } from "../../src/apollo";

interface Props {
	slug: string;
}

const SlugPage: NextPage<Props> = ({ slug }) => {
	const { loading, error, data } = useQuery(PRODUCT_BY_SLUG, {
		variables: { slug: `${slug}` }
	});
	if (loading) return <Spinner01 />;
	return (
		<Layout
			title={"Choco - Stores"}
			pageDescription={"Encuentra tu ropa favorita"}
		>
			<ProductOverviews05 product={data.paintBySlug} />

		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { data } = await client.query({
		query: PRODUCTS
	});
	const paths = data.paints.map((paint: IProduct) => ({
		params: { slug: paint.slug }
	}));
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
export default SlugPage;
