import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Login from '../pages/Login'
import CreateProduct from '../pages/admin/CreateProduct'
import Product from '../pages/Product'

const Mainroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register/>} />
            <Route path='login' element={<Login/>} />
            <Route path='create-product' element={<CreateProduct/>} />
            <Route path='products' element={<Product/>} />
        </Routes>
    )
}

export default Mainroutes