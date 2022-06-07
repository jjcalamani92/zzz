import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from "react-hook-form";

const validCategory = ['camisas', 'pantalones', 'chompas', 'sombreros', 'poleras', 'leggins', 'chamarras', 'cortos', '']
const validGender = ['hombre', 'mujer', 'niño', 'unisex']
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

interface FormData {
  _id:string;
  name: string;
  brand: string;
  image: string[];
  description: string;
  inStock: number;
  sizes: string[];
  category: string;
  gender: string;
  price: number;
  color: string;
  tags: string[];
}
interface Props {
  product: FormData
}
export const Form02: FC<Props> = ({ product }) => {
  const router = useRouter()
  const [newTagValue, setNewTagValue] = useState('')
  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
    defaultValues: product
  })
  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue('');
    const currentTags = getValues('tags');
    if (currentTags.includes(newTag)) {
      return;
    }
    currentTags.push(newTag);

  }
  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues('tags').filter(t => t !== tag);
    setValue('tags', updatedTags, { shouldValidate: true })
  }

  const onDeleteImage = (image: string) => {
    setValue('image', getValues('image').filter(img => img !== image), { shouldValidate: true })
  }

  const onSubmit = async (form: FormData) => {
    await axios.put(`https://cristinadevelopmentp.herokuapp.com/api/wear/${product._id}`, form)
    router.replace('/admin')
  }

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post('https://cristinadevelopmentp.herokuapp.com/api/upload', formData)
        setValue('image', [...getValues('image'), data.url], { shouldValidate: true })
        console.log(data.url)
      }
    } catch (error) {
      console.log({ error })
    }

  }

  return (
    <>
      <div className="max-w-2xl mx-auto pt-10 pb-16 px-1 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 ">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Nuevo Producto</h3>
              <p className="mt-1 text-sm text-gray-600">
                Esta información se mostrará publicamente, en la página de productos.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Nombre del Producto
                      </label>
                      <input
                        className="mt-2 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1"
                        type={"text"}
                        {...register('name', {
                          required: 'Este campo es requerido',
                          minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        })}
                      />
                      <div>
                        {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                        Marca
                      </label>
                      <input
                        className="mt-2 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1"
                        {...register('brand', {
                          required: 'Este campo es requerido',
                          minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        })}
                      />
                      <div>
                        {errors.brand && <span className="text-sm text-red-500">{errors.brand.message}</span>}
                      </div>
                    </div>



                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Categoría
                      </label>
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm capitalize"
                        {...register('gender', {
                          required: 'Este campo es requerido',
                        })}
                      >
                        <option value="">--Genero--</option>
                        {
                          validGender.map((data, i) => (
                            <option className="capitalize" key={i}>{data}</option>
                          ))
                        }
                      </select>
                      <div>
                        {errors.category && <span className="text-sm text-red-500">{errors.category.message}</span>}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Categoría
                      </label>
                      <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm capitalize"
                        {...register('category', {
                          required: 'Este campo es requerido',
                        })}
                      >
                        <option value="">--Categoría--</option>
                        {
                          validCategory.map((data, i) => (

                            <option key={i} className="capitalize">{data}</option>
                          ))
                        }
                      </select>
                      <div>
                        {errors.category && <span className="text-sm text-red-500">{errors.category.message}</span>}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Precio
                      </label>
                      <input
                        className="mt-2 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1"
                        type='number'
                        {...register('price', {
                          required: 'Este campo es requerido',
                          min: { value: 0, message: 'Mínimo de valor cero' }
                        })}
                      />
                      <div>
                        {errors.price && <span className="text-sm text-red-500">{errors.price.message}</span>}
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700">
                        Precio de descuento
                      </label>
                      <input
                        disabled
                        type='number'
                        className="mt-2 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1"
                      // {...register('oldPrice', {
                      //   required: 'Este campo es requerido',
                      //   min: { value: 0, message: 'Mínimo de valor cero' }
                      // })}
                      />
                    </div>

                  </div>



                  <div>
                    <label className="block text-sm font-medium text-gray-700">Imagenes del Producto</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                          >
                            <span>Cargar un archivo</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={onFileSelected} />
                          </label>
                          <p className="pl-1">o arrastrar y soltar</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-2 " >
                      {
                        getValues('image').map((data, i) => (
                          <div key={i} className="relative">
                            <Image
                              src={data}
                              alt="image"
                              height={100}
                              width={100}
                              className="object-center object-cover"
                            />
                            <FontAwesomeIcon
                              className="text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none absolute bottom-1 right-1"
                              onClick={() => onDeleteImage(data)}
                              icon={faCircleMinus}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Descripción del producto
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={6}
                        className="shadow-sm focus:ring-red-500 focus:border-red-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-1"
                        {...register('description', {
                          required: 'Este campo es requerido',
                          minLength: { value: 2, message: 'Mínimo 3 caracteres' }
                        })}
                      />
                    </div>
                    <div>
                      {errors.description && <span className="text-sm text-red-500">{errors.description.message}</span>}
                    </div>

                  </div>

                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6 sm:col-span-3">
                      <fieldset

                      >
                        <legend className="contents text-base font-medium text-gray-900">Tallas</legend>
                        <div className="grid grid-cols-2 gap-2 mt-4 ">
                          {
                            validSizes.map((data, i) => (
                              <div className="flex items-center" key={i}>
                                <input
                                  type="checkbox"
                                  value={data}
                                  className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300"
                                  {...register('sizes', {
                                    required: {
                                      value: true,
                                      message: 'size is required'
                                    },
                                  })}
                                />
                                <label htmlFor="sizes" className="ml-3 block text-sm font-medium text-gray-700">
                                  {data}
                                </label>
                              </div>
                            ))
                          }
                        </div>
                      </fieldset>
                      <div>
                        {errors.sizes?.length === 0 && <span className="text-sm text-red-500">seleccione al menos una talla</span>}
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Color
                      </label>
                      <input
                        className="mt-2 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1"
                        {...register('color', {
                          required: 'Este campo es requerido',
                          minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        })}
                      />
                      <div>
                        {errors.color && <span className="text-sm text-red-500">{errors.color.message}</span>}
                      </div>
                    </div>



                  </div>

                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags
                      </label>
                      <input
                        className="mt-2 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-1"
                        type={"text"}
                        value={newTagValue}
                        onChange={({ target }) => setNewTagValue(target.value)}
                        onKeyUp={({ code }) => code === 'Space' ? onNewTag() : undefined}

                      />
                      <p className="mt-2 text-sm text-gray-500">
                        Presiona [Spacio] para agregar.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2"  >
                    {
                      getValues('tags').map((data, i) => (
                        <>
                          <p key={i} className="flex items-center">{data}
                            <FontAwesomeIcon
                              className="text-sm leading-none mx-1 text-gray-600 hover:text-gray-900 rounded focus:outline-none "
                              onClick={() => onDeleteTag(data)}
                              icon={faCircleMinus}
                            />
                          </p>
                        </>
                      ))
                    }
                  </div>
                </div>

                <div className="px-4 py-3 bg-white text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Actualizar Producto
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
