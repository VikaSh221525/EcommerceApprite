import React from 'react'

const Cart = () => {
    cartItems = [];


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
                    {cartItems.map(item => (
                        <div key={item.id} className='flex items-center justify-between border-b py-6 px-4'>
                            <div className='flex items-center w-[40%]'>
                                <img src='' alt='image' className='w-24 h-24 object-cover rounded mr-4' />
                                <span className='font-semibold'>title</span>
                            </div>
                            <div className='w-[20%] text-center font-medium'>
                                price
                            </div>
                            <div className='w-[20%] text-center flex items-center justify-center gap-2'>
                                <button className='px-2 py-1 border rounded'>-</button>
                                <span>quantity</span>
                                <button className='px-2 py-1 border rounded'>+</button>
                            </div>
                            <div className='w-[20%] text-center font-medium'>
                                totalPrice
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Cart