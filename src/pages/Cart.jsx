import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncgetcart, asyncremovefromcart, asyncUpdateQuantity } from '../store/actions/CartAction';

const Cart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.cartItems);
    // console.log(cartItems);


    useEffect(() => {
        dispatch(asyncgetcart());
    }, [dispatch])

    const handleIncrease = (item) => {
        dispatch(asyncUpdateQuantity(item.$id, item.quantity + 1));
    }

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            dispatch(asyncUpdateQuantity(item.$id, item.quantity - 1))
        }
    }

    const removeCartItem = (cartid) => {
        if (window.confirm("Want to remove the item from cart?")) {
            dispatch(asyncremovefromcart(cartid));
        }
    }

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <>
            <div className='w-full py-4 sm:py-5 px-4 sm:px-6 md:px-10 text-2xl sm:text-3xl md:text-4xl bg-gray-100 font-semibold'>
                <h1>Home/Cart</h1>
            </div>
            <div className='w-full min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-6 md:py-10'>
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Cart Items Section */}
                    <div className='flex-1 lg:w-[70%]'>
                        <h1 className='text-2xl sm:text-3xl font-semibold mb-5'>Your Cart</h1>

                        {/* Desktop Table Header */}
                        <div className='hidden md:flex items-center bg-gray-200 justify-between px-4 py-3 rounded-t-lg'>
                            <h2 className='text-lg font-semibold w-[40%]'>Product</h2>
                            <h2 className='text-lg font-semibold w-[20%] text-center'>Price</h2>
                            <h2 className='text-lg font-semibold w-[20%] text-center'>Quantity</h2>
                            <h2 className='text-lg font-semibold w-[20%] text-center'>Total</h2>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="mt-6 text-center py-12 bg-white rounded-lg shadow-sm">
                                <i className="ri-shopping-cart-line text-6xl text-gray-300 mb-4"></i>
                                <p className="text-lg text-gray-500">Your cart is empty.</p>
                                <p className="text-sm text-gray-400 mt-2">Add some products to get started!</p>
                            </div>
                        ) : (
                            <div className='bg-white rounded-b-lg md:rounded-t-none rounded-lg shadow-sm'>
                                {cartItems.map(item => (
                                    <div key={item.$id} className='border-b border-gray-200 last:border-b-0'>
                                        {/* Mobile Layout */}
                                        <div className='md:hidden p-4'>
                                            <div className='flex gap-4'>
                                                <img src={item.image} alt='image' className='w-20 h-20 object-contain rounded bg-gray-50 flex-shrink-0' />
                                                <div className='flex-1 min-w-0'>
                                                    <h3 className='font-semibold text-gray-800 mb-2 line-clamp-2'>{item.title}</h3>
                                                    <div className='flex items-center justify-between mb-3'>
                                                        <span className='text-lg font-bold text-green-600'>₹{item.price}</span>
                                                        <button
                                                            onClick={() => removeCartItem(item.$id)}
                                                            className='bg-red-500 hover:bg-red-600 px-1 rounded-full transition-colors'
                                                        >
                                                            <i className="ri-delete-bin-line text-white text-lg"></i>
                                                        </button>
                                                    </div>
                                                    <div className='flex items-center justify-between'>
                                                        <div className='flex items-center gap-3 bg-gray-100 rounded-lg p-1'>
                                                            <button
                                                                onClick={() => handleDecrease(item)}
                                                                className='w-8 h-8 flex items-center justify-center bg-white rounded border hover:bg-gray-50 transition-colors'
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                -
                                                            </button>
                                                            <span className='font-medium min-w-[2rem] text-center'>{item.quantity}</span>
                                                            <button
                                                                onClick={() => handleIncrease(item)}
                                                                className='w-8 h-8 flex items-center justify-center bg-white rounded border hover:bg-gray-50 transition-colors'
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span className='text-lg font-bold text-gray-800'>₹{item.price * item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop Layout */}
                                        <div className='hidden md:flex items-center justify-between py-6 px-4'>
                                            <div className='flex items-center w-[40%] gap-4'>
                                                <button
                                                    onClick={() => removeCartItem(item.$id)}
                                                    className='bg-red-500 hover:bg-red-600 px-1 rounded-full transition-colors flex-shrink-0'
                                                >
                                                    <i className="ri-close-line text-white text-lg"></i>
                                                </button>
                                                <img src={item.image} alt='image' className='w-16 h-16 object-contain rounded bg-gray-50 flex-shrink-0' />
                                                <span className='font-semibold text-gray-800 line-clamp-2'>{item.title}</span>
                                            </div>
                                            <div className='w-[20%] text-center font-medium text-green-600'>
                                                ₹{item.price}
                                            </div>
                                            <div className='w-[20%] flex items-center justify-center'>
                                                <div className='flex items-center gap-2 bg-gray-100 rounded-lg p-1'>
                                                    <button
                                                        onClick={() => handleDecrease(item)}
                                                        className='w-8 h-8 flex items-center justify-center bg-white rounded border hover:bg-gray-50 transition-colors'
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        -
                                                    </button>
                                                    <span className='font-medium min-w-[2rem] text-center'>{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleIncrease(item)}
                                                        className='w-8 h-8 flex items-center justify-center bg-white rounded border hover:bg-gray-50 transition-colors'
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='w-[20%] text-center font-bold text-gray-800'>
                                                ₹{item.price * item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Summary Section */}
                    {cartItems.length > 0 && (
                        <div className='lg:w-[30%] w-full'>
                            <div className='bg-white rounded-lg shadow-sm p-6 sticky top-6'>
                                <h2 className='text-xl font-semibold mb-4 text-gray-800'>Order Summary</h2>
                                <div className='space-y-3 mb-4'>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Items ({cartItems.length})</span>
                                        <span>₹{totalAmount}</span>
                                    </div>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Shipping</span>
                                        <span className='text-green-600'>Free</span>
                                    </div>
                                    <hr className='my-3' />
                                    <div className='flex justify-between text-lg font-bold text-gray-800'>
                                        <span>Total</span>
                                        <span>₹{totalAmount}</span>
                                    </div>
                                </div>
                                <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors'>
                                    Proceed to Checkout
                                </button>
                                <p className='text-xs text-gray-500 text-center mt-3'>
                                    Secure checkout with SSL encryption
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Cart