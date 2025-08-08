import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadproducts } from '../store/actions/ProductAction'

const Product = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.product.products)
    

    useEffect(() => {
        dispatch(asyncloadproducts())
    }, [dispatch])
    return (
        <div className="w-full min-h-screen bg-gray-50">
            <div className="px-15 py-6 font-bold text-4xl bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 shadow">
                Our Products
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10">
                {products.map((prod) => (
                    <div
                        key={prod.$id}
                        className="bg-white rounded-xl flex flex-col items-center transition-transform hover:scale-105 shadow-sm cursor-pointer"
                        style={{ minHeight: 350, maxWidth: 300, margin: "auto" }}
                    >
                        <img
                            src={prod.image}
                            alt={`image`}
                            className="w-full h-1/2 object-cover rounded-lg "
                        />
                        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2 w-full">
                            {prod.title}
                        </h3>
                        <p className="font-bold text-xl mb-2">
                            ₹{prod.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product