import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const products = useSelector((state) => state.product.products)
    const product = products.find(p => p.$id === id);

    const { register, reset, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                image: product?.image,
                title: product?.title,
                price: product?.price,
                description: product?.description,
                category: product?.category,
                discount: product?.discount || 0
            }
        }
    )

    const updateproducthandler = (product) => {}
    const deleteproducthandler = () => {}

    return product ? (
        <>
            <div className='w-full min-h-screen'>
                <h1 className='text-3xl font-semibold w-full bg-gray-100 px-20 py-5'>Update Product</h1>
                <div className='flex justify-center items-center w-full py-15'>
                    <div className='w-[60rem] mx-auto flex flex-row bg-gray-100 rounded-2xl p-5'>
                        <div className='w-1/2 flex flex-col gap-5'>
                            <div className='w-full h-1/2'>
                                <img className='object-contain w-full h-full rounded-3xl' src={product?.image} alt={product?.title} />
                            </div>
                            <p className='text-gray-500'>Home/{product?.category} </p>
                            <h1 className='text-4xl font-semibold'>{product?.title}</h1>
                            <p className='text-lg text-gray-700'>{product?.description}</p>
                            <span className='text-2xl font-bold text-green-600'>Rs. {product?.price}</span>
                            {product?.discount > 0 && <span className='text-red-500 text-lg'>Discount: {product?.discount}%</span>}

                        </div>
                        <div className='w-1/2 px-10 pt-20 pb-15'>
                            <form onSubmit={handleSubmit(updateproducthandler)} className='flex flex-col gap-5'>
                                <div>
                                    <label className='text-gray-700 font-semibold'>Image Url</label>
                                    <input type="url" placeholder='Enter image url' {...register("image", { required: "Image URL is required" })} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2' />
                                    {errors.image && <p className='text-red-500 text-sm'>{errors.image.message}</p>}
                                </div>
                                <div>
                                    <label className='text-gray-700 font-semibold'>Title</label>
                                    <input type="text" placeholder='Enter Title' {...register("title", { required: "Title is required" })} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2' />
                                    {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
                                </div>
                                <div>
                                    <label className='text-gray-700 font-semibold'>Price</label>
                                    <input type="number" placeholder='Enter Price' {...register("price", { required: "Price is required" })} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2' />
                                    {errors.price && <p className='text-red-500 text-sm'>{errors.price.message}</p>}
                                </div>
                                <div>
                                    <label className='text-gray-700 font-semibold'>description</label>
                                    <textarea placeholder='Enter description' {...register("description", { required: "Description is required" })} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2' />
                                    {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
                                </div>
                                <div>
                                    <label className='text-gray-700 font-semibold'>Category</label>
                                    <select defaultValue="" {...register("category", { required: "Select a Category" })} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2'>
                                        <option value="" disabled>Select Category</option>
                                        <option value="Smartphone">Smartphones</option>
                                        <option value="Laptop">Laptops</option>
                                        <option value="Audio">Audio</option>
                                        <option value="Tablet">Tablets</option>
                                        <option value="Wearable">Wearables</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Gaming">Gaming</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='text-gray-700 font-semibold'>Discount</label>
                                    <input type="number" placeholder='Enter Discount' {...register("discount")} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2' />
                                </div>
                                <div className='flex flex-col gap-5 items-start'>
                                    <input type='submit' value={`Update Product`} className='bg-blue-500 text-white px-12 py-2 rounded-4xl hover:bg-blue-600 transition duration-200 cursor-pointer shadow-sm w-full' />
                                    <button onClick={deleteproducthandler} type='submit' className='bg-red-500 text-white px-12 py-2 rounded-4xl hover:bg-red-600 transition duration-200 cursor-pointer shadow-sm w-full'>Delete Product</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    ) : <h1 className='text-4xl text-red-500'>Loading...</h1>
}

export default UpdateProduct