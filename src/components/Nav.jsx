import { Search, ChartColumnStacked } from 'lucide-react'
import { motion } from "motion/react"
import { NavLink } from 'react-router-dom'

const Nav = () => {
    const x = 0
    return (
        <>
            {/* top */}
            <div className='px-20 py-2 bg-white border-b border-gray-200'>
                <div className='flex justify-between'>
                    <div className='flex gap-5'>
                        <NavLink className='flex gap-2 items-center group'><i class="ri-map-pin-2-fill text-gray-400 group-hover:text-blue-500"></i> <p className='text-gray-400 group-hover:text-blue-500'>Store Locator</p></NavLink>
                        <NavLink className='flex gap-2 items-center group'><i class="ri-truck-fill text-gray-400 group-hover:text-blue-500"></i> <p className='text-gray-400 group-hover:text-blue-500'>Order Tracking</p> </NavLink>
                    </div>
                    <div className='flex gap-5'>
                        <NavLink className='flex gap-2 items-center group'><i class="ri-percent-fill text-gray-400 group-hover:text-blue-500"></i> <p className='text-gray-400 group-hover:text-blue-500'>Today's Deals</p> </NavLink>
                        <NavLink className='flex gap-2 items-center group'><i class="ri-customer-service-2-fill text-gray-400 group-hover:text-blue-500"></i> <p className='text-gray-400 group-hover:text-blue-500'>Support</p> </NavLink>
                        <div className='flex gap-2 items-center'>
                            <i class="ri-user-3-line text-gray-400 group-hover:text-blue-500"></i> <p className='text-gray-400 group-hover:text-blue-500'>Account</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* mid */}
            <div className='px-20 py-4 bg-white border-b border-gray-200'>
                <div className='flex justify-between items-center'>
                    <NavLink to='/' className='flex gap-2 items-center'><p className='font-bold text-4xl text-blue-600'>TechPulse</p></NavLink>
                    <div className='flex items-center rounded-full px-4 py-2 w-[500px] border border-gray-200 focus-within:border-blue-600'>
                        <Search className='text-gray-400 w-5 h-5 mr-2' />
                        <input type="text" placeholder='Search for products, brands, and more...' className='outline-none w-full text-gray-700 placeholder-gray-400' />
                    </div>
                    <div className='flex gap-5 items-center'>
                        <div className='relative'>
                            <i class="ri-heart-line text-2xl"></i>
                            <span className='bg-blue-500 absolute -top-2 -right-1 rounded-full px-1.5 text-sm text-white'>0</span>
                        </div>
                        <NavLink to='/cart' className='relative'>
                            <i class="ri-shopping-cart-2-fill text-2xl"></i>
                            <span className='bg-blue-500 absolute -top-2 -right-1 rounded-full px-1.5 text-sm text-white'> {x} </span>
                        </NavLink>
                        <NavLink to='/login' className='bg-gray-200 py-1 px-2 rounded'><span><i class="ri-user-3-line text-xl text-blue-500"></i> Login/SignUp</span></NavLink>
                    </div>
                </div>
            </div>

            <div className='px-20 py-4 bg-white border-b border-gray-200'>
                <div className='flex justify-between items-center'>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }}>
                        <NavLink to='/products'>
                            <span className='flex gap-2 items-center hover:text-blue-500'><ChartColumnStacked className='w-5 h-5' /> <p>All Categories</p> </span>
                        </NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }}>
                        <NavLink className='hover:text-blue-500'>SmartPhones</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }}>
                        <NavLink className='hover:text-blue-500'>Laptops</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }}>
                        <NavLink className='hover:text-blue-500'>Tablets</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }}>
                        <NavLink className='hover:text-blue-500'>Audio</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }}>
                        <NavLink className='hover:text-blue-500'>Weareables</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }}>
                        <NavLink className='hover:text-blue-500'>Accessories</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }}>
                        <NavLink className='hover:text-blue-500'>Smart Home</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }}>
                        <NavLink className='hover:text-blue-500'>Gaming</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }}>
                        <NavLink className='text-blue-500'><i class="ri-price-tag-3-fill"></i> Deals </NavLink>
                    </motion.span>
                </div>
            </div>
        </>
    )
}

export default Nav