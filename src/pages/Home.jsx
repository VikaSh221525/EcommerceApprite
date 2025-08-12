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
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-full h-screen overflow-hidden">
                <SwiperSlide >
                    <div className='w-full h-full relative'>
                        <img className='object-cover' src="https://elexy-demo.myshopify.com/cdn/shop/files/bg-and-image-6.png?v=1724586047&width=2000" alt="" />
                        <div className='absolute top-40 left-20 flex flex-col gap-5 w-1/2'>
                            <h1 className=' text-4xl'>INTILECT PRO V25S</h1>
                            <p className='text-7xl leading-none font-semibold'>AI based CCTV Solutions for Home and Business</p>
                            <p>Closed-Circuit Television (CCTV) is a video surveillance system used to monitor and record activities in various environments for security, safety, and monitoring purposes.</p>
                            <motion.button whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }} transition={{ type: "easeInOut", duration: 0.3 }} className='py-3 px-8 bg-black text-white w-fit rounded-4xl cursor-pointer'>Shop Now</motion.button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex'>
                        <div className='flex flex-col w-[40%] h-full'>
                            <div className='w-full h-1/2'>
                                <img className='object-cover' src="https://elexy-demo.myshopify.com/cdn/shop/files/hero-banner-1.png?v=1719895760&width=1100" alt="" />
                            </div>
                            <div className='w-full h-1/2'>
                                <img className='object-cover' src="https://elexy-demo.myshopify.com/cdn/shop/files/hero-banner-1.png?v=1719895760&width=1100" alt="" />
                            </div>
                        </div>
                        <div className='w-[60%] h-full'>
                            <img className='object-cover' src="https://elexy-demo.myshopify.com/cdn/shop/files/hero-banner-3.png?v=1719895849&width=1100" alt="" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='bg-blue-300'><img className='w-full h-full object-cover' src="https://images.unsplash.com/photo-1532285023254-17336184c0e5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="img" /></SwiperSlide>
            </Swiper>

            {/* Hot Deal Products */}
            <div className="mt-20 bg-gray-50 py-10 px-20">
                <div className='w-full flex justify-between'>
                    <h1 className="text-5xl font-bold mb-8 text-gray-900">Today's Hot Deal</h1>
                    <NavLink to='/deals' className='py-3 px-8 bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 h-fit w-fit cursor-pointer outline rounded-4xl text-xl'>View All</NavLink>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10">
                    {discountedProducts.length > 0 ? (
                        discountedProducts.slice(0, 4).map((product) => (
                            <Link to={`/product/${product.$id}`} key={product.$id} className="cursor-pointer">
                                <div className="relative bg-white rounded-3xl flex flex-col items-center gap-4 w-72 h-120 hover:shadow-md transition-shadow duration-300 group overflow-hidden shadow-sm">
                                    <div className="flex-shrink-0 relative ">
                                        <img
                                            className="object-contain rounded-t-2xl border border-gray-200 bg-gray-100 group-hover:scale-102 duration-200"
                                            src={product.image}
                                            alt='Image'
                                        />
                                        {product.discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">{product.discount}%</span>}
                                    </div>
                                    <div className="flex flex-col justify-between h-full w-full px-5 pb-5">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.title}</h2>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-bold text-green-600">Rs.{product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 text-xl">No deals available at the moment. Check back later!</p>
                    )}
                </div>
            </div>

            {/* product highlights */}
            <div className='flex py-10 px-20 gap-10'>
                <div className='overflow-hidden rounded-2xl'><img className='rounded-2xl hover:scale-105 transition-all duration-200' src="https://elexy-demo.myshopify.com/cdn/shop/files/demo-5-banner-4.png?v=1724315849&width=1100" alt="" /></div>
                <div className='overflow-hidden rounded-2xl'><img className='rounded-2xl hover:scale-105 transition-all duration-200' src="https://elexy-demo.myshopify.com/cdn/shop/files/demo-5-banner-5.png?v=1724316077&width=1100" alt="" /></div>
            </div>


            {/* products */}
            <div className="mt-20 bg-gray-50 py-10 px-20">
                <div className='w-full flex justify-between'>
                    <h1 className="text-5xl font-bold mb-8 text-gray-900">Our Product's</h1>
                    <NavLink to='/products' className='py-3 px-8 bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 h-fit w-fit cursor-pointer outline rounded-4xl text-xl'>View All</NavLink>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10">
                    {products.length > 0 ? (
                        products.slice(0, 8).map((product) => (
                            <Link to={`/product/${product.$id}`} key={product.$id} className="cursor-pointer">
                                <div className="relative bg-white rounded-3xl flex flex-col items-center gap-4 w-72 h-120 hover:shadow-md transition-shadow duration-300 group overflow-hidden shadow-sm">
                                    <div className="flex-shrink-0 relative ">
                                        <img
                                            className="object-contain rounded-t-2xl border border-gray-200 bg-gray-100 group-hover:scale-102 duration-200"
                                            src={product.image}
                                            alt='Image'
                                        />
                                        {product.discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">{product.discount}%</span>}
                                    </div>
                                    <div className="flex flex-col justify-between h-full w-full px-5 pb-5">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.title}</h2>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-bold text-green-600">Rs.{product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 text-xl">No products available at the moment. Check back later!</p>
                    )}
                </div>
            </div>

            {/* what we offer */}
            <div className='w-full flex justify-between items-center py-30 px-20'>
                <div className='flex flex-col items-center justify-center gap-3 text-center'>
                    <img srcset="" sizes="(min-width: 990px) 100vw, 100vw" src="//elexy-demo.myshopify.com/cdn/shop/files/text-icon-1.svg?v=1720505997&amp;width=375" alt="" loading="lazy" width="78" height="64" />
                    <h1 className='text-lg font-semibold'>Free Shipping</h1>
                    <p className='text-gray-400'>Buy product over $100 and get free home delivery <br /> offer</p>
                </div>
                <div className='w-[1px] h-10 bg-black/40'></div>
                <div className='flex flex-col items-center justify-center gap-3 text-center'>
                    <img srcset="" sizes="(min-width: 990px) 100vw, 100vw" src="//elexy-demo.myshopify.com/cdn/shop/files/text-icon-2.svg?v=1720582346&amp;width=375" alt="" loading="lazy" width="78" height="66" />
                    <h1 className='text-lg font-semibold'>Easy Return Policy</h1>
                    <p className='text-gray-400'>Provide 30 day easy Return policy for all of our <br /> customer</p>
                </div>
                <div className='w-[1px] h-10 bg-black/40'></div>
                <div className='flex flex-col items-center justify-center gap-3 text-center'>
                    <img srcset="" sizes="(min-width: 990px) 100vw, 100vw" src="//elexy-demo.myshopify.com/cdn/shop/files/text-icon-3.svg?v=1720582346&amp;width=375" alt="" loading="lazy" width="78" height="66" />
                    <h1 className='text-lg font-semibold'>Secure Payment</h1>
                    <p className='text-gray-400'>We conform you that payment system are totally <br /> secure</p>
                </div>
            </div>


        </>
    )
}

export default Home