import { FC } from "react";
import { Item } from "../src/interfaces";
import Link from "next/link";
import { useRouter } from 'next/router';

interface Props {
	products: Item[];
}

export const LayoutProductlist: FC<Props> = ({ products }) => {
  const router = useRouter();
  const { query } = router
	return (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">


				<div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.map((product, i) => (
						
            <Link href={`/${query.line}/${product.href}`} key={i}>
              <a href="#" className="group">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                    <div className="capitalize">
                          {/* <span aria-hidden="true" className="inset-0 capitalize " /> */}
                          {product.name}
                        </div>
                    </h3>
                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                  </div>
                  {/* <p className="text-sm font-medium text-gray-900">
                    {product.price}.00 Bs
                  </p> */}
                </div>
              </a>
            </Link>
					))}
				</div>
			</div>
		</div>
	);
};
