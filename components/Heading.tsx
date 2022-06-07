import Link from "next/link";
import React, { FC } from "react";
import { slug } from "../src/utils/function";



interface Props03 {
	line: string | any;
	category: string | any;
}

export const Heading02: FC<Props03> = ({ line, category }) => {
	return (
			<nav aria-label="Breadcrumb" className=" py-2 md:py-6">
				<ol
					role="list"
					className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
				>
					<li>
						<div className="flex items-center">
							<Link href={`/${slug(line)}`} passHref prefetch={false}>
							<a href="#" className="mr-2 text-sm font-medium text-gray-900 capitalize">
									{line}
								</a>
							</Link>

							<svg
								width={16}
								height={20}
								viewBox="0 0 16 20"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								className="w-4 h-5 text-gray-300"
							>
								<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
							</svg>
						</div>
					</li>
					<li>
						<div className="flex items-center">
							<Link
								href={`/${slug(line)}/${slug(category)}`}
								passHref
								prefetch={false}
							>
								<a href="#" className="mr-2 text-sm font-medium text-gray-900 capitalize">
									{category}
								</a>
							</Link>
							<svg
								width={16}
								height={20}
								viewBox="0 0 16 20"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								className="w-4 h-5 text-gray-300"
							>
								<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
							</svg>
						</div>
					</li>
					
				</ol>
			</nav>
	);
};
interface Props04 {
	category: string | any;
}

export const Heading04: FC<Props04> = ({ category }) => {
	return (
			<nav aria-label="Breadcrumb" className=" py-2 md:py-6">
				<ol
					role="list"
					className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
				>
					<li>
						<div className="flex items-center">
							<Link href={`/${slug(category)}`} passHref prefetch={false}>
							<a href="#" className="mr-2 text-sm font-medium text-gray-900 capitalize">
									{category}
								</a>
							</Link>

							<svg
								width={16}
								height={20}
								viewBox="0 0 16 20"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								className="w-4 h-5 text-gray-300"
							>
								<path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
							</svg>
						</div>
					</li>
				</ol>
			</nav>
	);
};
