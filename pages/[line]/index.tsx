import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
	Heading04,
	Layout,
	LayoutProductlist,
	Spinner01
} from "../../components";
import { Site } from "../../src/interfaces";
import { SITEBYCATEGORY } from "../../src/gql/query";
import { clientSite } from "../../src/apollo";
import { Category, Section } from "../../src/interfaces/Site";
import { request } from "graphql-request";
import useSWR from "swr";
import { slug } from "../../src/utils/function";

const API_ENDPOINT = "http://localhost:8002/graphql";
// const API_ENDPOINT = "https://cristinadevelopments.herokuapp.com/graphql";

interface Props {
	line: string;
}

const LinePage: NextPage<Props> = ({ line }) => {
	const { isValidating, error, data } = useSWR(SITEBYCATEGORY, (query) =>
		request(API_ENDPOINT, query)
	);
	if (isValidating) return <Spinner01 />;
	const site = data.sites.find(findId);
	function findId(site: Site) {
		return site._id === "12024a6d-9b63-4b8e-b247-e04ace043097";
	}
	// console.log(site);
	const category = site.categories.find(findCategory);
	function findCategory(category: Category) {
		return category.href === `${line}`;
	}
	// console.log(category.name);

	const section = category.sections.find(findSection);
	function findSection(section: Section) {
		return section.href === "linea-automotiva";
	}
	// console.log(section.items);
	// const { loading, error, data } = useQuery(PRODUCTS_BY_GENDER, {
	// 	variables: { gender: `${gender}` }
	// });
	// console.log(data)
	console.log(section.items)

	return (
		<Layout
			title={"Choco - Stores"}
			pageDescription={"Encuentra tu ropa favorita"}
		>
			<Heading04 category={line} />
			{/* <HeadingSecondary category={category} /> */}
			<LayoutProductlist products={section.items} />
			{/* <HeadingSecondary category={category} /> */}
			{/* <LayoutProductlist products={data.wearByCategory} /> */}
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { data } = await clientSite.query({
		query: SITEBYCATEGORY
	});
	const site = data.sites.find(findId);
	function findId(site: Site) {
		return site._id === "12024a6d-9b63-4b8e-b247-e04ace043097";
	}
	// console.log(site);
	const paths = site.categories.map((data: Category) => ({
		params: { line: data.href }
	}));
	console.log(paths);
	return {
		paths,
		fallback: false
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { line = "" } = params as { line: string };
	return {
		props: {
			line
		},
		revalidate: 60 * 60 * 24
	};
};

export default LinePage;
