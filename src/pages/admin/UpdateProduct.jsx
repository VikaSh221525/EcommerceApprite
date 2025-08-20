import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { asyncdeleteproduct, asyncloadproducts, asyncupdateproduct } from '../../store/actions/ProductAction';

const UpdateProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const products = useSelector((state) => state.product.products)
    const product = products.find(p => p.$id === id);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(asyncloadproducts());
        }
    }, [dispatch, products]);

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

    const updateproducthandler = (updatedProduct) => {
        if (!product) {
            console.warn('Cannot update: Product no longer exists.');
            return;
        }
        updatedProduct.price = parseInt(updatedProduct.price);
        dispatch(asyncupdateproduct(id, updatedProduct));
        console.log('product updated successfully');

    }
    const deleteproducthandler = () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(asyncdeleteproduct(product.$id));
            reset();
            navigate('/');
        }
        console.log('product deleted successfully');
    }

    return product ? (
        <>
            <div className='w-full min-h-screen bg-gray-50'>
                <div className='w-full bg-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 py-4 sm:py-5 shadow-sm'>
                    <h1 className='text-2xl sm:text-3xl font-semibold text-gray-800'>Update Product</h1>
                </div>

                <div className='w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10'>
                    <div className='max-w-7xl mx-auto'>
                        <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
                            <div className='flex flex-col lg:flex-row'>
                                {/* Product Preview Section */}
                                <div className='lg:w-1/2 p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100'>
                                    <div className='space-y-6'>
                                        <div className='aspect-square max-w-md mx-auto lg:max-w-none'>
                                            <img
                                                className='w-full h-full object-contain rounded-2xl bg-white shadow-sm border border-gray-200'
                                                src={product?.image}
                                                alt={product?.title}
                                            />
                                        </div>

                                        <div className='space-y-4'>
                                            <p className='text-sm text-gray-500 font-medium'>
                                                Home / {product?.category}
                                            </p>
                                            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight'>
                                                {product?.title}
                                            </h1>
                                            <p className='text-base sm:text-lg text-gray-600 leading-relaxed'>
                                                {product?.description}
                                            </p>
                                            <div className='flex flex-wrap items-center gap-4'>
                                                <span className='text-2xl sm:text-3xl font-bold text-green-600'>
                                                    Rs. {product?.price}
                                                </span>
                                                {product?.discount > 0 && (
                                                    <span className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold'>
                                                        {product?.discount}% OFF
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Section */}
                                <div className='lg:w-1/2 p-6 md:p-8'>
                                    <div className='max-w-md mx-auto lg:max-w-none'>
                                        <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-6'>
                                            Edit Product Details
                                        </h2>

                                        <form onSubmit={handleSubmit(updateproducthandler)} className='space-y-6'>
                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                                    Image URL
                                                </label>
                                                <input
                                                    type="url"
                                                    placeholder='Enter image URL'
                                                    {...register("image", { required: "Image URL is required" })}
                                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200'
                                                />
                                                {errors.image && <p className='text-red-500 text-sm mt-1'>{errors.image.message}</p>}
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                                    Product Title
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder='Enter product title'
                                                    {...register("title", { required: "Title is required" })}
                                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200'
                                                />
                                                {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>}
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                                    Price (Rs.)
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder='Enter price'
                                                    {...register("price", { required: "Price is required" })}
                                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200'
                                                />
                                                {errors.price && <p className='text-red-500 text-sm mt-1'>{errors.price.message}</p>}
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                                    Description
                                                </label>
                                                <textarea
                                                    rows="4"
                                                    placeholder='Enter product description'
                                                    {...register("description", { required: "Description is required" })}
                                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none'
                                                />
                                                {errors.description && <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>}
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                                    Category
                                                </label>
                                                <select
                                                    defaultValue=""
                                                    {...register("category", { required: "Select a Category" })}
                                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white'
                                                >
                                                    <option value="" disabled>Select Category</option>
                                                    <option value="Smartphone">Smartphones</option>
                                                    <option value="Laptop">Laptops</option>
                                                    <option value="Audio">Audio</option>
                                                    <option value="Tablet">Tablets</option>
                                                    <option value="Wearable">Wearables</option>
                                                    <option value="Accessories">Accessories</option>
                                                    <option value="Gaming">Gaming</option>
                                                </select>
                                                {errors.category && <p className='text-red-500 text-sm mt-1'>{errors.category.message}</p>}
                                            </div>

                                            <div>
                                                <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                                    Discount (%)
                                                </label>
                                                <input
                                                    type="number"
                                                    placeholder='Enter discount percentage'
                                                    {...register("discount")}
                                                    className='w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200'
                                                />
                                            </div>

                                            <div className='space-y-4 pt-4'>
                                                <button
                                                    type='submit'
                                                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                                >
                                                    <i className="ri-save-line mr-2"></i>
                                                    Update Product
                                                </button>
                                                <button
                                                    onClick={deleteproducthandler}
                                                    type='button'
                                                    className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                                >
                                                    <i className="ri-delete-bin-line mr-2"></i>
                                                    Delete Product
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <div className='w-full min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4'></div>
                <h1 className='text-2xl sm:text-3xl md:text-4xl text-gray-600 font-semibold'>Loading...</h1>
            </div>
        </div>
    )
}

export default UpdateProduct