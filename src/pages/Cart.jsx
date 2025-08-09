import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncgetcart, asyncUpdateQuantity } from '../store/actions/CartAction';

const Cart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log(cartItems);
    

    useEffect(() => {
        dispatch(asyncgetcart());
    }, [dispatch])

    const handleIncrease = (item) => {
        dispatch(asyncUpdateQuantity(item.$id, item.quantity + 1));
    }

    const handleDecrease = (item) => {
        if(item.quantity > 1){
            dispatch(asyncUpdateQuantity(item.$id, item.quantity - 1))
        }
    }



    return (
        <>
            <div className='w-full py-5 px-10 text-4xl bg-gray-100 font-semibold'><h1>Home/Cart</h1></div>
            <div className='w-full min-h-screen px-20 py-10 flex justify-between'>
                <div className='w-[70%]'>
                    <h1 className='text-3xl font-semibold mb-5'>Your Cart</h1>
                    <div className='flex items-center bg-gray-200 justify-between px-4 py-2'>
                        <h2 className='text-lg font-semibold w-[40%]'>Product</h2>
                        <h2 className='text-lg font-semibold w-[20%] text-center'>Price</h2>
                        <h2 className='text-lg font-semibold w-[20%] text-center'>Quantity</h2>
                        <h2 className='text-lg font-semibold w-[20%] text-center'>Total</h2>
                    </div>
                    {cartItems.length === 0 ? (
                        <p className="mt-6 text-lg text-gray-500">Your cart is empty.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className='flex flex-col md:flex-row items-center justify-between border-b py-6 px-4'>
                                <div className='flex items-center flex-1 md:w-[40%] w-full mb-2 md:mb-0'>
                                    <img src={item.image} alt='image' className='w-24 h-24 object-cover rounded mr-4' />
                                    <span className='font-semibold'>{item.title}</span>
                                </div>
                                <div className='md:w-[20%] w-full text-center font-medium mb-2 md:mb-0'>
                                    ₹{item.price}
                                </div>
                                <div className='md:w-[20%] w-full text-center flex items-center justify-center gap-2 mb-2 md:mb-0'>
                                    <button onClick={() => handleDecrease(item)} className='px-2 py-1 border rounded'>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncrease(item)} className='px-2 py-1 border rounded'>+</button>
                                </div>
                                <div className='md:w-[20%] w-full text-center font-medium'>
                                    ₹{item.price * item.quantity}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default Cart