import { Link, NavLink } from 'react-router-dom';

const RecommendedProducts = ({ products }) => {
    return (
        <>
            {/* products */}
            <div className="mt-20 bg-gray-50 py-10 px-20">
                <div className='w-full flex justify-between'>
                    <h1 className="text-5xl font-bold mb-8 text-gray-900">You Might Also Like</h1>
                    <NavLink to='/products' className='py-3 px-8 bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 h-fit w-fit cursor-pointer outline rounded-4xl text-xl'>View All</NavLink>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-10">
                    {
                        products.map((product) => (
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
                    }
                </div>
            </div>
        </>
    )
}

export default RecommendedProducts