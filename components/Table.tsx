import Image from "next/image";
import { useRouter } from 'next/router';
import Link from "next/link";
import React, { FC, useState } from "react";
import { IProduct } from "../src/interfaces";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleMinus, faEye } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from "../src/gql/mutation";

interface Props {
  products: IProduct[];
}


export const Table02: FC<Props> = ({ products }) => {
  const router = useRouter()
  const [deleteData] = useMutation(DELETE_PRODUCT, {
    onCompleted: (data) => {
      window.location.reload();
    },
    update(cache, result) { },

  })
  const [show, setShow] = useState(null);

  const onDeleteData = (_id: string) => {
    deleteData({ variables: { _id } })
    // console.log(`delete product with id is: ${_id}`)
    router.replace('/')
    // const updatedTags = getValues('tags').filter(t => t !== tag);
    // setValue('tags', updatedTags, { shouldValidate: true })
  }
  return (
    <>
      <div>
        <div className="sm:px-6 w-full">
          <div className="px-4 md:px-10 py-4 md:py-7">
            <div className="flex items-center justify-between">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                Panel de Administración
              </p>
              <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                <p>Sort By:</p>
                <select className="focus:outline-none bg-transparent ml-1">
                  <option className="text-sm text-indigo-800">Latest</option>
                  <option className="text-sm text-indigo-800">Oldest</option>
                  <option className="text-sm text-indigo-800">Latest</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div className="sm:flex items-center justify-between">
              <div className="flex items-center">
                <a href="#">
                  <div className="py-2 px-8 bg-lightPrimaryColor text-darkPrimaryColor rounded-full">
                    <p>Hombre</p>
                  </div>
                </a>
                <a href="#">
                  <div className="py-2 px-8 text-gray-600 hover:text-darkPrimaryColor hover:bg-lightPrimaryColor rounded-full ml-4 sm:ml-8">
                    <p>Mujer</p>
                  </div>
                </a>
                <a href="#">
                  <div className="py-2 px-8 text-gray-600 hover:text-darkPrimaryColor hover:bg-lightPrimaryColor rounded-full ml-4 sm:ml-8">
                    <p>Niño</p>
                  </div>
                </a>
              </div>
              <Link href={`/admin/add`} >
              <a href="#"
                  className="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-600 hover:bg-red-700 focus:outline-none rounded"
                >
                  <p className="text-sm font-medium leading-none text-white">
                    Agregar Producto
                  </p>
                </a>
              </Link>

            </div>
            <div className="mt-2 overflow-x-auto ">
              <table className="table-auto  whitespace-nowrap w-full">
                <thead>
                  <tr className="h-16 border border-gray-100 rounded">
                    <th className="w-3/10" >
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-900 mr-2">
                          Nombre del producto
                        </p>
                      </div>
                    </th>
                    <th className="w-3/10" >
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-900 mr-2">
                          Descripción
                        </p>
                      </div>
                    </th>
                    <th className="w-1/10" >
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-900 mr-2">
                          Categoría
                        </p>
                      </div>
                    </th>
                    <th className="w-1/10" >
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-900 mr-2">
                          Imagen
                        </p>
                      </div>
                    </th>
                    <th className="w-1/10" >
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-900 mr-2">
                          Cantidad
                        </p>
                      </div>
                    </th>
                    <th className="w-1/10" >
                      <div className="flex items-center pl-5">
                        <p className="text-base font-medium leading-none text-gray-900 mr-2">
                          Fecha de publicación
                        </p>
                      </div>
                    </th>
                    <th className="w-1/10" ></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, i) => (
                    <tr className="h-16  border border-gray-100 rounded" key={i}>
                      <td className="pl-15 mb-5">
                        <div className="flex items-center pl-5">
                          <p className="text-sm leading-none text-gray-600 mr-2">
                            {product.name}
                          </p>
                        </div>
                      </td>
                      <td className="pl-15 mb-5">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2 capitalize">
                            {product.category}
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            04/07
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <div className="aspect-w-1 h-30 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              height={100}
                              width={100}
                              className="object-center object-cover"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            23
                          </p>
                        </div>
                      </td>
                      <td className="pl-5">
                        <div className="flex items-center">
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            04/07
                          </p>
                        </div>
                      </td>
                      <td className="pl-4">
                        <Link href={`/admin/productos/${product.slug}`} >
                          <FontAwesomeIcon
                            className="text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none "
                            icon={faPenToSquare}
                          />
                        </Link>
                        <div onClick={() => onDeleteData(product._id)} >
                          <FontAwesomeIcon
                            className="text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none "
                            icon={faCircleMinus}
                          />
                        </div>
                        <Link href={"#"} >
                          <FontAwesomeIcon
                            className="text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none "
                            icon={faEye}
                          />
                        </Link>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <style>
          {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
        </style>
      </div>
    </>
  );
};
