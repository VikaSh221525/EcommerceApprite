import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Wishlist = () => {
    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
    // console.log(wishlistItems);

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-6 font-bold text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 shadow">
                Your Wishlist
            </div>
            <div className="w-full grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 p-4 sm:p-6 md:p-10">
                {wishlistItems.length > 0 ? (
                    wishlistItems.map((product) => (
                        <Link to={`/product/${product.$id}`} key={product.$id} className="cursor-pointer">
                            <div className="relative bg-white rounded-3xl flex flex-col items-center gap-4 w-full max-w-80 h-120 hover:shadow-md transition-shadow duration-300 group overflow-hidden shadow-sm mx-auto">
                                <div className="flex-shrink-0 relative">
                                    <img
                                        className="w-full object-contain rounded-t-2xl border border-gray-200 bg-gray-100 group-hover:scale-102 duration-200"
                                        src={product.image}
                                        alt='Image'
                                    />
                                    {product.discount > 0 && (
                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                            {product.discount}%
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col justify-between h-full w-full px-5 pb-5">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 line-clamp-2">{product.title}</h2>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xl sm:text-2xl font-bold text-green-600">Rs.{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-lg sm:text-xl">Your wishlist is empty.</p>
                )}
            </div>
        </div>
    )
}

export default Wishlist