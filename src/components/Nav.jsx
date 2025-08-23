import { Search, ChartColumnStacked } from 'lucide-react'
import { motion } from "motion/react"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { asyncLogoutUser } from '../store/actions/UserAction'
import { useEffect, useRef, useState } from 'react'

const Nav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser)
    const { products } = useSelector((state) => state.product);

    const [searchQuery, setsearchQuery] = useState("");
    const [searchResults, setsearchResults] = useState([]);
    const searchContainerRef = useRef();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            const filtered = products.filter(
                (product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5);
            setsearchResults(filtered);
        } else {
            setsearchResults([])
        }
    }, [searchQuery, products]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setsearchQuery("");
                setsearchResults([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleResultClick = () => {
        setsearchQuery("");
        setsearchResults([]);
    }

    const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
    let totalfavitems = wishlistItems.length;

    const cartItems = useSelector((state) => state.cart.cartItems)
    let TotalCartQuantity = cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)
    return (
        <>
            {/* top */}
            <div className='hidden md:block px-10 lg:px-20 py-2 bg-white border-b border-gray-200'>
                <div className='flex justify-between'>
                    <div className='flex gap-5'>
                        <NavLink className='flex gap-2 items-center group'><i class="ri-map-pin-2-fill text-gray-400 group-hover:text-blue-500"></i> <p className='text-gray-400 group-hover:text-blue-500'>Store Locator</p></NavLink>
                        <NavLink className='flex gap-2 items-center group'><i class="ri-truck-fill text-gray-400 group-hover:text-blue-500"></i> <p className='text-gray-400 group-hover:text-blue-500'>Order Tracking</p> </NavLink>
                    </div>
                    <div className='flex gap-5'>
                        <NavLink className='flex gap-2 items-center group'><i class="ri-percent-fill text-gray-400 group-hover:text-blue-500"></i> <p className='text-gray-400 group-hover:text-blue-500'>Today's Deals</p> </NavLink>
                        <NavLink className='flex gap-2 items-center group'><i class="ri-customer-service-2-fill text-gray-400 group-hover:text-blue-500"></i> <p className='text-gray-400 group-hover:text-blue-500'>Support</p> </NavLink>
                        <div className='relative group cursor-pointer'>
                            <div className='flex gap-2 items-center'>
                                <i class="ri-user-3-line text-gray-400 group-hover:text-blue-500"></i> <p className='text-gray-400 group-hover:text-blue-500'>Account</p>
                            </div>
                            {currentUser?.isAdmin ?
                                <div className='absolute top-full -right-14 bg-sky-50 shadow-lg rounded-md p-4 w-48 z-50 text-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200'>
                                    <NavLink to='/create-product' className='hover:text-blue-500'>Create Product</NavLink>
                                </div> : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* mid */}
            <div className='px-4 sm:px-6 md:px-10 lg:px-20 py-3 bg-white border-b border-gray-200'>
                <div className='flex justify-between items-center min-w-0'>
                    <div className='flex items-center gap-2 min-w-0'>
                        <button onClick={() => setIsMobileMenuOpen(true)} className='md:hidden p-2 rounded hover:bg-gray-100 flex-shrink-0'>
                            <i className="ri-menu-line text-2xl"></i>
                        </button>
                        <NavLink to='/' className='flex gap-2 items-center min-w-0'>
                            <p className='font-bold text-2xl sm:text-3xl md:text-4xl text-blue-600 truncate'>TechPulse</p>
                        </NavLink>
                    </div>

                    {/* search bar */}
                    <div className='relative hidden md:block md:w-[420px] lg:w-[500px] xl:w-[640px]' ref={searchContainerRef}>
                        <div className='flex items-center rounded-full px-4 py-2 border border-gray-200 focus-within:border-blue-600'>
                            <Search className='text-gray-400 w-5 h-5 mr-2' />
                            <input type="text"
                                placeholder='Search for products, brands, and more...'
                                className='outline-none w-full text-gray-700 placeholder-gray-400'
                                value={searchQuery}
                                onChange={(e) => setsearchQuery(e.target.value)}
                            />
                        </div>
                        {searchResults.length > 0 && (
                            <div className='absolute top-full bg-white mt-2 w-full rounded-lg shadow-sm z-50 max-h-80 overflow-y-auto '>
                                <ul>
                                    {searchResults.map((product) => (
                                        <li key={product.$id}>
                                            <NavLink
                                                to={`/product/${product.$id}`}
                                                className='flex items-center p-3 hover:bg-gray-100 transition-colors duration-150'
                                                onClick={handleResultClick}
                                            >
                                                <img src={product.image} alt="image" className='w-12 h-12 object-contain mr-4' />
                                                <span className='font-medium text-gray-700'>{product.title} </span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>


                    <div className='flex gap-2 sm:gap-3 md:gap-5 items-center flex-shrink-0'>
                        <button className='md:hidden p-2 rounded hover:bg-gray-100 flex-shrink-0' onClick={() => setIsMobileSearchOpen(true)}>
                            <Search className='w-5 h-5 text-gray-700' />
                        </button>
                        <NavLink to='/wishlist' className='relative flex-shrink-0'>
                            <i className="ri-heart-line text-xl sm:text-2xl"></i>
                            <span className='bg-blue-500 absolute -top-2 -right-1 rounded-full px-1.5 text-xs sm:text-sm text-white min-w-[20px] h-5 flex items-center justify-center'>{totalfavitems}</span>
                        </NavLink>
                        <NavLink to='/cart' className='relative flex-shrink-0'>
                            <i className="ri-shopping-cart-2-fill text-xl sm:text-2xl"></i>
                            <span className='bg-blue-500 absolute -top-2 -right-1 rounded-full px-1.5 text-xs sm:text-sm text-white min-w-[20px] h-5 flex items-center justify-center'>{TotalCartQuantity}</span>
                        </NavLink>
                        {currentUser ?
                            <>
                                <div className='relative cursor-pointer group flex-shrink-0 hidden md:block'>
                                    <span className='bg-gray-200 py-1 px-2 rounded flex items-center gap-2 max-w-[120px] lg:max-w-none'>
                                        <i className="ri-user-3-line text-lg sm:text-xl text-blue-500 flex-shrink-0"></i>
                                        <span className='truncate text-sm sm:text-base'>{currentUser.name}</span>
                                    </span>
                                    <div className='absolute top-full -right-14 bg-sky-50 shadow-lg rounded-md p-4 w-48 z-50 text-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200'>
                                        <button
                                            onClick={() => dispatch(asyncLogoutUser())}
                                            className="bg-red-500 text-white text-sm py-1 px-2 rounded hover:bg-red-600 transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                                <div className='md:hidden p-2 rounded hover:bg-gray-100 flex-shrink-0'>
                                    <i className="ri-user-3-line text-xl sm:text-2xl text-blue-500"></i>
                                </div>
                            </> :
                            (<NavLink to='/login' className='bg-gray-200 py-1 px-2 rounded hidden md:inline-block flex-shrink-0'><span><i className="ri-user-3-line text-xl text-blue-500"></i>Login/SignUp</span></NavLink>)}
                        {!currentUser && (
                            <NavLink to='/login' className='md:hidden p-2 rounded hover:bg-gray-100 flex-shrink-0'>
                                <i className="ri-user-3-line text-xl sm:text-2xl text-blue-500"></i>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>

            {/* bottom */}
            <div className='hidden md:block px-10 lg:px-20 py-4 bg-white border-b border-gray-200'>
                <div className='flex justify-between items-center flex-wrap gap-2 lg:gap-0'>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }} className='flex-shrink-0'>
                        <NavLink to='/products'>
                            <span className='flex gap-2 items-center hover:text-blue-500 text-sm lg:text-base'><ChartColumnStacked className='w-4 h-4 lg:w-5 lg:h-5' /> <p>All Categories</p> </span>
                        </NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }} className='flex-shrink-0'>
                        <NavLink to='/category/Smartphones' className='hover:text-blue-500 text-sm lg:text-base'>SmartPhones</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }} className='flex-shrink-0'>
                        <NavLink to='/category/Laptops' className='hover:text-blue-500 text-sm lg:text-base'>Laptops</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }} className='flex-shrink-0'>
                        <NavLink to='/category/Tablets' className='hover:text-blue-500 text-sm lg:text-base'>Tablets</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }} className='flex-shrink-0'>
                        <NavLink to='/category/Audio' className='hover:text-blue-500 text-sm lg:text-base'>Audio</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }} className='flex-shrink-0'>
                        <NavLink to='/category/Wearables' className='hover:text-blue-500 text-sm lg:text-base'>Wearables</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }} className='flex-shrink-0'>
                        <NavLink to='/category/Accessories' className='hover:text-blue-500 text-sm lg:text-base'>Accessories</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }} className='flex-shrink-0'>
                        <NavLink to='/category/SmartHome' className='hover:text-blue-500 text-sm lg:text-base'>Smart Home</NavLink>
                    </motion.span>
                    <motion.span whileHover={{ y: -1, scale: 1.05 }} whileTap={{ y: 0, scale: 1 }} className='flex-shrink-0'>
                        <NavLink to='/category/Gaming' className='hover:text-blue-500 text-sm lg:text-base'>Gaming</NavLink>
                    </motion.span>
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, ease: 'backInOut', duration: 1 }} className='flex-shrink-0'>
                        <NavLink to='/deals' className='text-blue-500 font-semibold animate-bounce text-sm lg:text-base'><i className="ri-price-tag-3-fill"></i> Deals </NavLink>
                    </motion.span>
                </div>
            </div>

            {/* Mobile search overlay */}
            <div className={`${isMobileSearchOpen ? 'fixed' : 'hidden'} inset-0 z-50 bg-white px-4 pt-4 sm:px-6`}>
                <div className='flex items-center gap-3'>
                    <button onClick={() => setIsMobileSearchOpen(false)} className='p-2 rounded hover:bg-gray-100'>
                        <i className="ri-arrow-left-line text-2xl"></i>
                    </button>
                    <div className='flex-1'>
                        <div className='flex items-center rounded-full px-4 py-2 border border-gray-200 focus-within:border-blue-600'>
                            <Search className='text-gray-400 w-5 h-5 mr-2' />
                            <input
                                autoFocus
                                type='text'
                                placeholder='Search for products, brands, and more...'
                                className='outline-none w-full text-gray-700 placeholder-gray-400'
                                value={searchQuery}
                                onChange={(e) => setsearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                {searchResults.length > 0 && (
                    <div className='mt-3 rounded-lg shadow-sm max-h-[60vh] overflow-y-auto border border-gray-100 z-100'>
                        <ul>
                            {searchResults.map((product) => (
                                <li key={product.$id}>
                                    <button
                                        type="button"
                                        className='flex items-center w-full text-left p-3 hover:bg-gray-100 transition-colors duration-150'
                                        onMouseDown={() => {
                                            handleResultClick();
                                            setIsMobileSearchOpen(false);
                                            navigate(`/product/${product.$id}`);
                                        }}
                                    >
                                        <img src={product.image} alt="image" className='w-12 h-12 object-contain mr-4' />
                                        <span className='font-medium text-gray-700'>{product.title}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile menu drawer */}
            {isMobileMenuOpen && (
                <div className='fixed inset-0 z-50 md:hidden'>
                    <div className='absolute inset-0 bg-black/40' onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className='absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl transform transition-transform duration-300 translate-x-0'>
                        <div className='flex items-center justify-between px-4 py-3 border-b'>
                            <p className='font-bold text-2xl text-blue-600'>TechPulse</p>
                            <button className='p-2 rounded hover:bg-gray-100' onClick={() => setIsMobileMenuOpen(false)}>
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>
                        <div className='p-4 space-y-4 overflow-y-auto h-full'>
                            {currentUser ? (
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-2 pb-2 border-b'>
                                        <i className="ri-user-3-line text-xl text-blue-500"></i>
                                        <span className='font-medium'>{currentUser.name}</span>
                                        {currentUser.isAdmin && <span className='text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded'>Admin</span>}
                                    </div>
                                    {currentUser.isAdmin && (
                                        <NavLink
                                            to='/create-product'
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className='bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600 transition w-full flex items-center justify-center gap-2'
                                        >
                                            <i className="ri-add-circle-line"></i>
                                            Create Product
                                        </NavLink>
                                    )}
                                    <button
                                        onClick={() => {
                                            dispatch(asyncLogoutUser());
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="bg-red-500 text-white text-sm py-2 px-4 rounded hover:bg-red-600 transition w-full"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <NavLink to='/login' onClick={() => setIsMobileMenuOpen(false)} className='flex items-center gap-2'>
                                    <i className="ri-user-3-line text-xl text-blue-500"></i>
                                    <span>Login/SignUp</span>
                                </NavLink>
                            )}

                            <div className='border-t pt-3'>
                                <p className='text-xs uppercase text-gray-400 mb-2'>Quick Links</p>
                                <div className='grid grid-cols-1 gap-2'>
                                    <NavLink onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500 flex items-center gap-2'><i className="ri-map-pin-2-fill text-gray-400"></i> Store Locator</NavLink>
                                    <NavLink onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500 flex items-center gap-2'><i className="ri-truck-fill text-gray-400"></i> Order Tracking</NavLink>
                                    <NavLink onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500 flex items-center gap-2'><i className="ri-percent-fill text-gray-400"></i> Today's Deals</NavLink>
                                    <NavLink onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500 flex items-center gap-2'><i className="ri-customer-service-2-fill text-gray-400"></i> Support</NavLink>
                                </div>
                            </div>

                            <div className='border-t pt-3'>
                                <p className='text-xs uppercase text-gray-400 mb-2'>Categories</p>
                                <div className='grid grid-cols-1 gap-2'>
                                    <NavLink to='/products' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500'>All Categories</NavLink>
                                    <NavLink to='/category/Smartphones' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500'>SmartPhones</NavLink>
                                    <NavLink to='/category/Laptops' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500'>Laptops</NavLink>
                                    <NavLink to='/category/Tablets' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500'>Tablets</NavLink>
                                    <NavLink to='/category/Audio' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500'>Audio</NavLink>
                                    <NavLink to='/category/Wearables' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500'>Weareables</NavLink>
                                    <NavLink to='/category/Accessories' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500'>Accessories</NavLink>
                                    <NavLink to='/category/SmartHome' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500'>Smart Home</NavLink>
                                    <NavLink to='/category/Gaming' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-blue-500'>Gaming</NavLink>
                                    <NavLink to='/deals' onClick={() => setIsMobileMenuOpen(false)} className='text-blue-500 font-semibold'><i className="ri-price-tag-3-fill"></i> Deals</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Nav