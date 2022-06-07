import { NextPage } from "next";
import { Layout } from "../../../components";
import { FormAdd } from "../../../components/form/FormAdd";

interface Props {
	slug: string;
}

const AddProduct: NextPage<Props> = ({ slug }) => {
	return (
		<Layout
			title="Nuevo Producto"
			pageDescription="{`${product.description}`}"
			imageFullUrl="{`${product.image[1]}`}"
		>
			{/* <FormikForm /> */}
			<FormAdd />
			{/* <FormProduct /> */}

		</Layout>
	);
};

export default AddProduct;
