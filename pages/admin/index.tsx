import { NextPage } from "next";
import { Layout } from "../../components";
import { Table02 } from "../../components/Table";
import { client } from "../../src/apollo";
import { PRODUCT_UPDATE, PRODUCTS } from '../../src/gql/query';
import { IProduct, Product } from "../../src/interfaces";
interface Props {
	wears: IProduct[];
}

const AdminPage: NextPage<Props> = ({ wears }) => {
	// console.log('wears')
	// console.log(wears)
	return (
		<Layout
			title={"Choco - Stores"}
			pageDescription={"Encuentra tu ropa favorita"}
		>
      {/* <Table01 products={wears} /> */}
      <Table02 products={wears} />

		</Layout>
	);
};

export async function getStaticProps() {
	const { data } = await client.query({
		query: PRODUCT_UPDATE
	});
	return {
		props: {
			wears: data.wears
		}
	};
}

export default AdminPage;
