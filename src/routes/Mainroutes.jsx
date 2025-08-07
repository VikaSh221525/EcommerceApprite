import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Home from '../pages/Home'

const Mainroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register/>} />
        </Routes>
    )
}

export default Mainroutes