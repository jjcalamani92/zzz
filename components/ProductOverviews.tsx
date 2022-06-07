import { FC,  } from "react";
import { IProduct } from "../src/interfaces";
import { SwiperDetail } from "./Swiper";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

interface Props {
	product: IProduct;
}

export const ProductOverviews05: FC<Props> = ({ product }) => {
	// const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
	// const { category, gender } = product;
	return (
		<>
			<section className="container mx-auto" >
				<div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 grid grid-cols-1 gap-4 lg:grid-cols-5">
					<div className="col-span-3" >
						{/* <SwiperComponent image={product.image} /> */}
						<SwiperDetail image={product.image} />
					</div>
					<div className="col-span-2" >
						<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
							<h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
								{product.name}
							</h1>
						</div>
						<div className="mt-4 lg:mt-0 lg:row-span-3">
							<h2 className="sr-only">Product information</h2>
							<p className="text-3xl text-gray-900">{product.price}.00 Bs </p>
							<form className="mt-10">
								<button
									type="submit"
									className="mt-10 w-full bg-yellow-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
								>
									Agregar al carrito
								</button>
							</form>
							<div className="py-2 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
								{/* Description and details */}
								{/* <div>
							<h3 className="sr-only">Description</h3>

							<div className="space-y-6">
								<p className="text-base text-gray-900">{product.description}</p>
							</div>
						</div> */}

								{/* <div className="mt-10">
							<h3 className="text-sm font-medium text-gray-900">Highlights</h3>

							<div className="mt-4">
								<ul role="list" className="pl-4 list-disc text-sm space-y-2">
									{product.highlights.map((highlight) => (
										<li key={highlight} className="text-gray-400">
											<span className="text-gray-600">{highlight}</span>
										</li>
									))}
								</ul>
							</div>
						</div> */}

								<div className="mt-2">
									<h2 className="text-sm font-medium text-gray-900">Detalles</h2>

									<div className="mt-4 space-y-6">
										<p className="text-sm text-gray-600">{product.description}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
