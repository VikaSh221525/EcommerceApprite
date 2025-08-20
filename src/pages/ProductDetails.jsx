import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { asyncAddToWishlist, asyncRemoveFromWishlist } from '../store/actions/WishlistAction'
import { asyncaddtocart, asyncUpdateQuantity } from '../store/actions/CartAction'
import RecommendedProducts from '../components/RecommendedProducts'
import { random } from 'nanoid'

const ProductDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const products = useSelector((state) => state.product.products)
    const product = products.find(p => p.$id === id);
    const currentUser = useSelector((state) => state.user.currentUser)

    // RecommendedProduct Logic
    const recommendedProducts = useMemo(() => {
        if (!product || products.length === 0) return [];

        const shuffleArray = (array) => {
            let currentIndex = array.length, randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array
        }

        const filtered = products.filter(
            (p) => p.$id !== product.$id
        );
        const shuffled = shuffleArray(filtered);
        return shuffled.slice(0,4);
    }, [id, products, product])

    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
    const isInWishlist = wishlistItems.some((item) => item.$id === product?.$id)

    const toggleWishlist = () => {
        if (!currentUser) {
            alert("Please login to see Wishlist")
            return
        }
        if (isInWishlist) {
            dispatch(asyncRemoveFromWishlist(product.$id, currentUser.$id));
        } else {
            dispatch(asyncAddToWishlist(product, currentUser.$id))
        }
    }

    const cartItems = useSelector((state) => state.cart.cartItems);
    const existingCartItem = cartItems.find(item => item.productId === product?.$id);
    const isInCart = !!existingCartItem;

    const handleAddToCart = (product) => {
        // console.log('addto cart clicked');

        if (!currentUser) {
            alert("please login to add items to you cart");
            return;
        }
        dispatch(asyncaddtocart(product));
    }

    return (
        <>
            <div className='w-full min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-20'>
                <div className='flex flex-col lg:flex-row justify-between gap-10'>
                    <div className='w-full lg:w-1/2'>
                        <img className='object-cover w-full h-auto rounded-3xl' src={product?.image} alt={product?.title} />
                    </div>
                    <div className='w-full lg:w-[40%] flex flex-col gap-4 md:gap-5'>
                        <p className='text-sm text-gray-500'>Home/{product?.category} </p>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold'>{product?.title}</h1>
                        <p className='text-base md:text-lg text-gray-700'>{product?.description}</p>
                        <span className='text-xl md:text-2xl font-bold text-green-600'>Rs. {product?.price}</span>
                        {product?.discount > 0 && <span className='text-red-500 text-base md:text-lg'>Discount: {product?.discount}%</span>}
                        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
                            <button onClick={() => handleAddToCart(product)} className='py-3 px-6 sm:px-8 bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 w-full sm:w-fit rounded-4xl cursor-pointer outline'>
                                {isInCart ? `In Cart (${existingCartItem.quantity})` : "Add to Cart"}
                            </button>
                            <button className='py-3 px-6 sm:px-8 bg-gray-200 text-black w-full sm:w-fit rounded-4xl cursor-pointer flex items-center justify-center gap-2' onClick={toggleWishlist}>
                                {isInWishlist ? (
                                    <><i class="ri-check-line"></i> <span>Remove from Wishlist</span></>
                                ) : (
                                    <><i class="ri-add-line" ></i><span>Add to Wishlist</span></>
                                )}
                            </button>
                        </div>
                        <button className='py-3 px-6 sm:px-8 bg-black text-white rounded-4xl cursor-pointer w-full lg:w-auto'>Buy Now</button>
                        {currentUser?.isAdmin && (<NavLink to={`/update-product/${product?.$id}`} className="py-3 px-8 bg-blue-500 text-white rounded-4xl cursor-pointer text-center">
                            Update Product
                        </NavLink>)}
                    </div>
                </div>

            </div>

            {recommendedProducts.length > 0 && (
                <RecommendedProducts products={recommendedProducts} />
            )}
        </>
    )
}

export default ProductDetails