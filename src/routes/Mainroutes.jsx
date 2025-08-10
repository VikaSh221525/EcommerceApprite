import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthWrapper from './AuthWrapper'
import ScrollToTop from '../components/ScrollToTop'

const Register = lazy(() => import('../pages/Register'))
const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const CreateProduct = lazy(() => import('../pages/admin/CreateProduct'))
const Product = lazy(() => import('../pages/Product'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))
const UpdateProduct = lazy(() => import('../pages/admin/UpdateProduct'))
const Wishlist = lazy(() => import('../pages/Wishlist'))
const Cart = lazy(() => import('../pages/Cart'))
const CategoryPage = lazy(() => import('../components/CategoryPage'))
const Deals = lazy(() => import('../components/Deals'))
const PageNotFound = lazy(() => import('../pages/PageNotFound'))


const Mainroutes = () => {
    return (
        <>
            <ScrollToTop />
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="register" element={<Register />} />
                    <Route path='login' element={<Login />} />
                    <Route path='create-product' element={<AuthWrapper> <CreateProduct /> </AuthWrapper>} />
                    <Route path='products' element={<Product />} />
                    <Route path='product/:id' element={<ProductDetails />} />
                    <Route path='update-product/:id' element={<AuthWrapper> <UpdateProduct /> </AuthWrapper>} />
                    <Route path='wishlist' element={<Wishlist />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='category/:categoryName' element={<CategoryPage />} />
                    <Route path='deals' element={<Deals />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </Suspense>
        </>
    )
}

export default Mainroutes