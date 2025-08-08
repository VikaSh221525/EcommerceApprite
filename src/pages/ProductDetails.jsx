import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const products = useSelector((state) => state.product.products)
    const product = products.find(p => p.$id === id);
    const currentUser = useSelector((state) => state.user.currentUser)


    const [isInWishlist, setisInWishlist] = useState(false)

    const toggleWishlist = () => {
        setisInWishlist(!isInWishlist);
    }
    return (
        <>
            <div className='w-full min-h-screen px-20 py-20'>
                <div className='flex justify-between'>
                    <div className='w-[50%]'>
                        <img className='object-cover w-full h-full rounded-3xl' src={product?.image} alt={product?.title} />
                    </div>
                    <div className='w-[40%] flex flex-col gap-5'>
                        <p>Home/{product?.category} </p>
                        <h1 className='text-4xl font-semibold'>{product?.title}</h1>
                        <p className='text-lg text-gray-700'>{product?.description}</p>
                        <span className='text-2xl font-bold text-green-600'>Rs. {product?.price}</span>
                        {product?.discount > 0 && <span className='text-red-500 text-lg'>Discount: {product?.discount}%</span>}
                        <div className='flex items-center gap-3'>
                            <button type='button' onClick={() => handleAddToCart(product)} className='py-3 px-8 bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 w-fit rounded-4xl cursor-pointer outline'>Add to Cart</button>
                            <button className='py-3 px-8 bg-gray-200 text-black w-fit rounded-4xl cursor-pointer flex gap-2' onClick={toggleWishlist}>
                                {isInWishlist ? (
                                    <><i class="ri-check-line"></i> <span>Remove from Wishlist</span></>
                                ) : (
                                    <><i class="ri-add-line" ></i><span>Add to Wishlist</span></>
                                )}
                            </button>
                        </div>
                        <button className='py-3 px-8 bg-black text-white rounded-4xl cursor-pointer'>Buy Now</button>
                        {currentUser?.isAdmin && (<NavLink to={`/update-product/${product?.$id}`} className="py-3 px-8 bg-blue-500 text-white rounded-4xl cursor-pointer text-center">
                            Update Product
                        </NavLink>)}
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductDetails