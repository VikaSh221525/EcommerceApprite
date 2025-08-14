import React from 'react'
import { useForm } from 'react-hook-form'
import { databases } from '../../lib/appwrite'
import { ID } from 'appwrite'
import { toast } from 'react-toastify'

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PRODUCTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;

const CreateProduct = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    const createproducthandler = async (product) => {
        try{
            const newProduct = await databases.createDocument(
                DB_ID,
                PRODUCTS_COLLECTION_ID,
                ID.unique(),
                {
                    image: product.image,
                    title: product.title,
                    description: product.description,
                    price: Number(product.price),
                    category: product.category,
                    discount: Number(product.discount || 0)
                }
            ) 
            console.log(newProduct);
            toast.success("Product Created Successfully!")
            reset();

        }catch (err){
            console.log("ProductCreateError:", err);
        }
    }
    return (
        <div className='w-full min-h-screen'>
            <h1 className='text-3xl font-semibold w-full bg-gray-100 px-20 py-5'>Create Products</h1>
            <div className='flex justify-center items-center w-full py-15'>
                <div className='w-[90vh] mx-auto flex flex-col gap-4 bg-gray-50 rounded-xl p-10 shadow-md'>
                    <div className='w-full text-center'>
                        <h1 className='text-4xl font-bold text-blue-500'>TechPulse</h1>
                        <h3>Create Product</h3>
                    </div>
                    <form onSubmit={handleSubmit(createproducthandler)} className='flex flex-col gap-5'>
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
                            <label className='text-gray-700 font-semibold'>Description</label>
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
                                <option value="SmartHome">SmartHome</option>
                            </select>
                        </div>
                        <div>
                            <label className='text-gray-700 font-semibold'>Discount</label>
                            <input type="number" placeholder='Enter Discount' {...register("discount")} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2' />
                        </div>
                        <input type='submit' value='Create Product' className='bg-blue-500 text-white px-12 py-2 rounded-4xl hover:bg-blue-600 transition duration-200 cursor-pointer shadow-md' />
                    </form>

                </div>

            </div>
        </div>
    )
}

export default CreateProduct