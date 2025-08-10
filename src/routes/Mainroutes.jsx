import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Login from '../pages/Login'
import CreateProduct from '../pages/admin/CreateProduct'
import Product from '../pages/Product'
import ProductDetails from '../pages/ProductDetails'
import UpdateProduct from '../pages/admin/UpdateProduct'
import Wishlist from '../pages/Wishlist'
import Cart from '../pages/Cart'
import CategoryPage from '../components/CategoryPage'
import Deals from '../components/Deals'

const Mainroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register/>} />
            <Route path='login' element={<Login/>} />
            <Route path='create-product' element={<CreateProduct/>} />
            <Route path='products' element={<Product/>} />
            <Route path='product/:id' element={<ProductDetails/>} />
            <Route path='update-product/:id' element={<UpdateProduct/>} />
            <Route path='wishlist' element={<Wishlist/>} />
            <Route path='cart' element={<Cart/>} />
            <Route path='category/:categoryName' element={<CategoryPage/>} />
            <Route path='deals' element={<Deals/>} />
        </Routes>
    )
}

export default Mainroutes