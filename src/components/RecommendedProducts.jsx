import { Link, NavLink } from 'react-router-dom';

const RecommendedProducts = ({ products }) => {
    return (
        <>
            {/* products */}
            <div className="mt-10 md:mt-20 bg-gray-50 py-8 md:py-10 px-4 sm:px-6 md:px-10 lg:px-20">
                <div className='w-full flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">You Might Also Like</h1>
                    <NavLink to='/products' className='self-start sm:self-auto py-2 sm:py-3 px-6 sm:px-8 bg-white text-black hover:bg-black hover:text-white transition-colors duration-200 h-fit w-fit cursor-pointer outline rounded-4xl text-base sm:text-xl'>View All</NavLink>
                </div>
                <div className="w-full grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 p-4 sm:p-6 md:p-10">
                    {
                        products.map((product) => (
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
                    }
                </div>
            </div>
        </>
    )
}

export default RecommendedProducts