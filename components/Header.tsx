/*
	This example requires Tailwind CSS v2.0+ 
  
	This example requires some changes to your config:
  
	```
	// tailwind.config.js
	module.exports = {
		// ...
		plugins: [
			// ...
			require('@tailwindcss/aspect-ratio'),
		],
	}
	```
*/
import { Fragment, useContext, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarAlt, faCartShopping, faSearch, faBars, faX, faRightToBracket, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from "../src/context";

const navigation = {
	categories: [
		{
			id: "Tienda",
			name: "Tienda",
			featured: [
				{
					name: "de fabrica",
					href: "#",
					imageSrc:
						"https://res.cloudinary.com/dvcyhn0lj/image/upload/v1651761142/pinturas/productos/poliuretano/181103052847z4_7500_x6krkq.png",
					imageAlt:
						"Models sitting back to back, wearing Basic Tee in black and bone."
				},
				{
					name: "Productos en descuento",
					href: "#",
					imageSrc:
						"https://res.cloudinary.com/dvcyhn0lj/image/upload/v1651761866/pinturas/productos/poliuretano/200221035708ultra-up-640_r4epkd.jpg",
					imageAlt:
						"Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees."
				}
			],
			sections: [
				{
					id: "mujer",
					name: "Linea Automotiva",
					items: [
						{ name: "poliuretano", href: "/linea-automotiva/poliuretano" },
						{ name: "acrilico", href: "/linea-automotiva/acrilico" },
						{ name: "gloss", href: "/linea-automotiva/gloss" },
						{ name: "masilla", href: "/linea-automotiva/masilla" },
						{ name: "primer", href: "/linea-automotiva/primer" }
					]
				}
			]
		}
	],
	pages: [
		{ name: "Categorias", href: "categorias" },
		{ name: "Servicios", href: "servicios" },
		{ name: "Contacto", href: "contacto" }
	]
};

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export const Header = () => {
	const { user, isLoggedIn, logout } = useContext(AuthContext);
	const [open, setOpen] = useState(false);

	return (
		<div className="bg-white">
			{/* Mobile menu */}
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 flex z-40">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
								<div className="px-4 pt-5 pb-2 flex">
									<button
										type="button"
										className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
										onClick={() => setOpen(false)}
									>
										<span className="sr-only">Close menu</span>
										<FontAwesomeIcon
											className="h-6 w-6"
											icon={faX}
										/>
									</button>
								</div>

								{/* Links */}
								<Tab.Group as="div" className="mt-2">
									<div className="border-b border-gray-200">
										<Tab.List className="-mb-px flex px-4 space-x-8">
											{navigation.categories.map((category, i) => (
												<Tab
													key={i}
													className={({ selected }) =>
														classNames(
															selected
																? "text-yellow-600 border-yellow-600"
																: "text-gray-900 border-transparent",
															"flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium capitalize"
														)
													}
												>
													{category.name}
												</Tab>
											))}
										</Tab.List>
									</div>
									<Tab.Panels as={Fragment}>
										{navigation.categories.map((category, i) => (
											<Tab.Panel
												key={i}
												className="pt-10 pb-8 px-4 space-y-10"
											>
												<div className="grid grid-cols-2 gap-x-4">
													{category.featured.map((item, i) => (
														<div key={i} className="group relative text-sm">
															<div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
																<img
																	src={item.imageSrc}
																	alt={item.imageAlt}
																	className="object-center object-cover"
																/>
															</div>
															<Link href={item.href} passHref prefetch={false}>
															<a href="#" className="mt-6 block font-medium text-gray-900">
																	<span
																		className="absolute z-10 inset-0 capitalize"
																		aria-hidden="true"
																	/>
																	{item.name}
																</a>
															</Link>

															<p aria-hidden="true" className="mt-1">
																Shop now
															</p>
														</div>
													))}
												</div>
												{category.sections.map((section) => (
													<div key={section.name}>
														<p
															id={`${category.id}-${section.id}-heading-mobile`}
															className="font-medium text-gray-900"
														>
															{section.name}
														</p>
														<ul
															role="list"
															aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
															className="mt-6 flex flex-col space-y-6"
														>
															{section.items.map((item) => (
																<li key={item.name} className="flow-root">
																	<Link
																		href={item.href}
																		passHref
																		prefetch={false}
																	>
																		<a href="#" className="-m-2 p-2 block text-gray-500 capitalize">
																			{item.name}
																		</a>
																	</Link>
																</li>
															))}
														</ul>
													</div>
												))}
											</Tab.Panel>
										))}
									</Tab.Panels>
								</Tab.Group>

								<div className="border-t border-gray-200 py-6 px-4 space-y-6">
									{navigation.pages.map((page, i) => (
										<div key={i} className="flow-root">
											<Link href={`/${page.href}`} passHref prefetch={false}>
												<a className="-m-2 p-2 block font-medium text-gray-900">
													{page.name}
												</a>
											</Link>
										</div>
									))}
								</div>

								{
									isLoggedIn && (
										<>
											<div className="border-t border-gray-200 py-6 px-4 space-y-6">
												<div className="flow-root">
													<a href="#" className="-m-2 p-2 block font-medium text-gray-900">
														Mi Perfil
													</a>
												</div>
												<div className="flow-root">
													<a href="#" className="-m-2 p-2 block font-medium text-gray-900">
														Mis ordenes
													</a>
												</div>
											</div>
										</>
									)
								}
								{
									user?.role === 'ADMIN_ROL' && (

										<div className="border-t border-gray-200 py-6 px-4 space-y-6">
											<div className="flow-root">
												<Link href="/auth/login/">
													<a className="-m-2 p-2 block font-medium text-gray-900">
														Panel de Administración
													</a>
												</Link>
												
											</div>
										</div>
									)
								}

								<div className="border-t border-gray-200 py-6 px-4 space-y-6">


									<div className="flow-root">
										<Link href="/auth/register">
											<a className="-m-2 p-2 block font-medium text-gray-900">
												Register
											</a>
										</Link>
										
									</div>
									{
										isLoggedIn
											?
											<div className="flow-root" onClick={logout}>
												<a href="#" className="-m-2 p-2 block font-medium text-gray-900">
													Salir
												</a>
											</div>

											:
											<div className="flow-root">
												<Link href="/auth/login">
												<a className="m-2 p-2 block font-medium text-gray-900">
											
												Login
											</a>
										</Link>

											</div>

									}
								</div>

								<div className="border-t border-gray-200 py-6 px-4">
									<Link href="#" passHref prefetch={false}>
									<a href="#" className="-m-2 p-2 flex items-center">
											<img
												src="https://tailwindui.com/img/flags/flag-canada.svg"
												alt=""
												className="w-5 h-auto block flex-shrink-0"
											/>
											<span className="ml-3 block text-base font-medium text-gray-900">
												CAD
											</span>
											<span className="sr-only">, change currency</span>
										</a>
									</Link>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			<header className="relative bg-white">
				{/* <p className="bg-yellow-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
					Get free delivery on orders over $100
				</p> */}

				<nav
					aria-label="Top"
					className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
				>
					<div className="border-b border-gray-200">
						<div className="h-16 flex items-center">
							<button
								type="button"
								className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
								onClick={() => setOpen(true)}
							>
								<span className="sr-only">Open menu</span>
								<FontAwesomeIcon
									className="h-6 w-6"
									icon={faBars}
								/>
							</button>

							{/* Logo */}
							<div className="ml-4 flex lg:ml-0">
								<Link href="/">
								<a href="#" >
										<span className="sr-only">Workflow</span>
										<img
											className="h-8 w-auto"
											src="https://res.cloudinary.com/dvcyhn0lj/image/upload/v1649541738/pinturas/PUNTO_COLORS_EXPRESS_CHOCO_yoygoy.png"
											alt=""
										/>
									</a>
								</Link>

							</div>

							{/* Flyout menus */}
							<Popover.Group className="hidden z-40 lg:ml-8 lg:block lg:self-stretch">
								<div className="h-full flex space-x-8">
									{navigation.categories.map((category, i) => (
										<Popover key={i} className="flex">
											{({ open }) => (
												<>
													<div className="relative flex">
														<Popover.Button
															className={classNames(
																open
																	? "border-yellow-600 text-yellow-600"
																	: "border-transparent text-gray-700 hover:text-gray-800",
																"relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
															)}
														>
															{category.name}
														</Popover.Button>
													</div>

													<Transition
														as={Fragment}
														enter="transition ease-out duration-200"
														enterFrom="opacity-0"
														enterTo="opacity-100"
														leave="transition ease-in duration-150"
														leaveFrom="opacity-100"
														leaveTo="opacity-0"
													>
														<Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
															{/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
															<div
																className="absolute inset-0 top-1/2 bg-white shadow"
																aria-hidden="true"
															/>

															<div className="relative bg-white">
																<div className="max-w-7xl mx-auto px-8">
																	<div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
																		<div className="col-start-2 grid grid-cols-2 gap-x-8">
																			{category.featured.map((item, i) => (
																				<div
																					key={i}
																					className="group relative text-base sm:text-sm"
																				>
																					<div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
																						<img
																							src={item.imageSrc}
																							alt={item.imageAlt}
																							className="object-center object-cover"
																						/>
																					</div>
																					<Link href={item.href}>
																					<a href="#" className="mt-6 block font-medium text-gray-900">
																							<span
																								className="absolute z-10 inset-0"
																								aria-hidden="true"
																							/>
																							{item.name}
																						</a>
																					</Link>

																					<p
																						aria-hidden="true"
																						className="mt-1"
																					>
																						Shop now
																					</p>
																				</div>
																			))}
																		</div>
																		<div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
																			{category.sections.map((section, i) => (
																				<div key={i}>
																					<p
																						id={`${section.name}-heading`}
																						className="font-medium text-gray-900"
																					>
																						{section.name}
																					</p>
																					<ul
																						role="list"
																						aria-labelledby={`${section.name}-heading`}
																						className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
																					>
																						{section.items.map((item) => (
																							<li
																								key={item.name}
																								className="flex"
																							>
																								<Link href={`/${item.href}`}>
																								<a href="#" className="hover:text-gray-800 capitalize">
																										{item.name}
																									</a>
																								</Link>
																							</li>
																						))}
																					</ul>
																				</div>
																			))}
																		</div>
																	</div>
																</div>
															</div>
														</Popover.Panel>
													</Transition>
												</>
											)}
										</Popover>
									))}

									{navigation.pages.map((page, i) => (
										<Link href={`/${page.href}`} key={i}>
											<a href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
												{page.name}
											</a>
										</Link>
									))}
								</div>
							</Popover.Group>

							<div className="ml-auto flex items-center">
								{/* <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </a>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </a>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="text-gray-700 hover:text-gray-800 flex items-center">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="w-5 h-auto block flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}

								{/* Search */}
								{
									isLoggedIn
										?
										<div className="lg:ml-2 hidden lg:flex">
											<a href="#" className="p-2 text-gray-400 hover:text-gray-500 items-center flex">
												<span className="sr-only">Logout</span>
												<FontAwesomeIcon
													className="w-6 h-6"
													icon={faRightToBracket}
												/>
											</a>
										</div>

										:
										<div className="lg:ml-2 hidden lg:flex">
											<a href="#" className="p-2 text-gray-400 hover:text-gray-500 items-center flex">
												<span className="sr-only">Login</span>
												<FontAwesomeIcon
													className="w-6 h-6"
													icon={faArrowRightToBracket}
												/>
											</a>
										</div>

								}


								<div className="flex lg:ml-2">
									<a href="#" className="p-2 text-gray-400 hover:text-gray-500 items-center flex">
										<span className="sr-only">Search</span>
										<FontAwesomeIcon
											className="w-6 h-6"
											icon={faSearch}
										/>
									</a>
								</div>

								{/* Cart */}
								<div className="flow-root lg:ml-2">
									<a href="#" className="p-2 text-gray-400 hover:text-gray-500 items-center flex">
										<FontAwesomeIcon
											className="w-6 h-6"
											icon={faCartShopping}
										/>
										<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
											0
										</span>
										<span className="sr-only">items in cart, view bag</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	);
};
