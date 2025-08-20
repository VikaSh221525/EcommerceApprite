import React from 'react'
import { motion } from "motion/react"
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className='bg-black px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-10 md:py-16 lg:py-20'>
                {/* email */}
                <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
                    <div>
                        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold">Subscribe our Newsletter and get<br />all of our update</h2>
                    </div>
                    <form className="w-full md:w-auto flex items-center bg-black p-2 border border-white rounded-full">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 text-white placeholder-gray-400 outline-none w-full md:w-64 bg-transparent"
                        />
                        <button
                            type="submit"
                            className="px-5 py-2 bg-gray-200 text-black font-medium rounded-full hover:bg-white transition-colors whitespace-nowrap"
                        >
                            Submit Now
                        </button>
                    </form>
                </div>

                <div className='w-full mt-10 mb-10 h-[1px] bg-gray-200/40'></div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-16'>
                    <div className='flex flex-col gap-3 sm:col-span-2 lg:col-span-1'>
                        <h1 className='text-3xl text-white font-bold'>TechPulse</h1>
                        <p className='text-gray-400 '>Your one-stop destination for all tech things.</p>
                        <div className='flex gap-3'>
                            <motion.span whileHover={{ y: -1, scale: 1.05, rotate: 5 }} whileTap={{ y: 0, scale: 1 }}>
                                <i class="ri-instagram-fill text-2xl text-gray-400 hover:text-white"></i>
                            </motion.span>
                            <motion.span whileHover={{ y: -1, scale: 1.05, color: 'white', rotate: 5 }} whileTap={{ y: 0, scale: 1 }}>
                                <i class="ri-facebook-box-fill text-2xl text-gray-400 hover:text-white"></i>
                            </motion.span>
                            <motion.span whileHover={{ y: -1, scale: 1.05, color: 'white', rotate: 5 }} whileTap={{ y: 0, scale: 1 }}>
                                <i class="ri-youtube-fill text-2xl text-gray-400 hover:text-white"></i>
                            </motion.span>
                            <motion.span whileHover={{ y: -1, scale: 1.05, color: 'white', rotate: 5 }} whileTap={{ y: 0, scale: 1 }}>
                                <i class="ri-twitter-x-line text-2xl text-gray-400 hover:text-white"></i>
                            </motion.span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-medium text-white text-xl'>Shop</h1>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>SmartPhones</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Laptops</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Tablets</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Audio</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Wearables</NavLink>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-medium text-white text-xl'>Support</h1>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Contact Us</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>FAQs</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Shipping Info</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>returns</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Order Status</NavLink>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-medium text-white text-xl'>company</h1>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>About Us</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Careers</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Blog</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Press</NavLink>
                        <NavLink className='text-gray-400 hover:text-white hover:underline '>Affiliates</NavLink>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-medium text-white text-xl'>Contact</h1>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Footer