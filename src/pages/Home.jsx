import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { asyncloadproducts } from '../store/actions/ProductAction';
import { motion } from "motion/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Home = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(asyncloadproducts());
        }
    }, [dispatch, products.length]);

    const discountedProducts = products.filter(
        (product) => product.discount > 0
    );

    return (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-full h-[70vh] sm:h-[80vh] md:h-screen overflow-hidden">
                <SwiperSlide><img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D" alt="img" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D" alt="img" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1532285023254-17336184c0e5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" /></SwiperSlide>
            </Swiper>

            {/* Hot Deal Products */}
            <div className="mt-10 md:mt-20 bg-gray-50 py-8 md:py-10 px-4 sm:px-6 md:px-10 lg:px-20">
                <div className='w-full flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Today's Hot Deal</h1>
                    <NavLink to='/deals' className='self-start sm:self-auto py-2 sm:py-3 px-6 sm:px-8 bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 h-fit w-fit cursor-pointer outline rounded-4xl text-base sm:text-xl'>View All</NavLink>
                </div>
                <div className="w-full grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 p-4 sm:p-6 md:p-10">
                    {discountedProducts.length > 0 ? (
                        discountedProducts.slice(0, 4).map((product) => (
                            <Link to={`/product/${product.$id}`} key={product.$id} className="cursor-pointer">
                                <div className="relative bg-white rounded-3xl flex flex-col items-center gap-4 w-full max-w-80 h-120 hover:shadow-md transition-shadow duration-300 group overflow-hidden shadow-sm mx-auto">
                                    <div className="flex-shrink-0 relative ">
                                        <img
                                            className="w-full object-contain rounded-t-2xl border border-gray-200 bg-gray-100 group-hover:scale-102 duration-200"
                                            src={product.image}
                                            alt='Image'
                                        />
                                        {product.discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">{product.discount}%</span>}
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
                        <p className="col-span-full text-center text-gray-500 text-lg sm:text-xl">No deals available at the moment. Check back later!</p>
                    )}
                </div>
            </div>

            {/* product highlights */}
            <div className='grid grid-cols-1 md:grid-cols-2 py-8 md:py-10 px-4 sm:px-6 md:px-10 lg:px-20 gap-6 md:gap-10'>
                <div className='overflow-hidden rounded-2xl'><img className='w-full rounded-2xl hover:scale-105 transition-all duration-200' src="https://elexy-demo.myshopify.com/cdn/shop/files/demo-5-banner-4.png?v=1724315849&width=1100" alt="" /></div>
                <div className='overflow-hidden rounded-2xl'><img className='w-full rounded-2xl hover:scale-105 transition-all duration-200' src="https://elexy-demo.myshopify.com/cdn/shop/files/demo-5-banner-5.png?v=1724316077&width=1100" alt="" /></div>
            </div>


            {/* products */}
            <div className="mt-10 md:mt-20 bg-gray-50 py-8 md:py-10 px-4 sm:px-6 md:px-10 lg:px-20">
                <div className='w-full flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Our Product's</h1>
                    <NavLink to='/products' className='self-start sm:self-auto py-2 sm:py-3 px-6 sm:px-8 bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 h-fit w-fit cursor-pointer outline rounded-4xl text-base sm:text-xl'>View All</NavLink>
                </div>
                <div className="w-full grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 p-4 sm:p-6 md:p-10">
                    {products.length > 0 ? (
                        products.slice(0, 8).map((product) => (
                            <Link to={`/product/${product.$id}`} key={product.$id} className="cursor-pointer">
                                <div className="relative bg-white rounded-3xl flex flex-col items-center gap-4 w-full max-w-80 h-120 hover:shadow-md transition-shadow duration-300 group overflow-hidden shadow-sm mx-auto">
                                    <div className="flex-shrink-0 relative ">
                                        <img
                                            className="w-full object-contain rounded-t-2xl border border-gray-200 bg-gray-100 group-hover:scale-102 duration-200"
                                            src={product.image}
                                            alt='Image'
                                        />
                                        {product.discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">{product.discount}%</span>}
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
                        <p className="col-span-full text-center text-gray-500 text-lg sm:text-xl">No products available at the moment. Check back later!</p>
                    )}
                </div>
            </div>

            {/* what we offer */}
            <div className='w-full py-16 px-4 sm:px-6 md:px-10 lg:px-20'>
                <div className='flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16'>
                    <div className='flex flex-col items-center justify-center gap-3 text-center px-6 flex-1'>
                        <img srcSet="" sizes="(min-width: 990px) 100vw, 100vw" src="//elexy-demo.myshopify.com/cdn/shop/files/text-icon-1.svg?v=1720505997&amp;width=375" alt="" loading="lazy" width="78" height="64" />
                        <h1 className='text-base sm:text-lg font-semibold'>Free Shipping</h1>
                        <p className='text-gray-400 text-sm sm:text-base'>Buy product over $100 and get free home delivery offer</p>
                    </div>

                    <div className='hidden sm:block w-full h-[1px] sm:h-24 sm:w-[1px] bg-gray-300'></div>

                    <div className='flex flex-col items-center justify-center gap-3 text-center px-6 flex-1'>
                        <img srcSet="" sizes="(min-width: 990px) 100vw, 100vw" src="//elexy-demo.myshopify.com/cdn/shop/files/text-icon-2.svg?v=1720582346&amp;width=375" alt="" loading="lazy" width="78" height="66" />
                        <h1 className='text-base sm:text-lg font-semibold'>Easy Return Policy</h1>
                        <p className='text-gray-400 text-sm sm:text-base'>Provide 30 day easy Return policy for all of our customer</p>
                    </div>

                    <div className='hidden sm:block w-full h-[1px] sm:h-24 sm:w-[1px] bg-gray-300'></div>

                    <div className='flex flex-col items-center justify-center gap-3 text-center px-6 flex-1'>
                        <img srcSet="" sizes="(min-width: 990px) 100vw, 100vw" src="//elexy-demo.myshopify.com/cdn/shop/files/text-icon-3.svg?v=1720582346&amp;width=375" alt="" loading="lazy" width="78" height="66" />
                        <h1 className='text-base sm:text-lg font-semibold'>Secure Payment</h1>
                        <p className='text-gray-400 text-sm sm:text-base'>We conform you that payment system are totally secure</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home