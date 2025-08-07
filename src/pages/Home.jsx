import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    
    return (
        <>
            <h1>Welcome to E-commerce</h1>
            <Link to="/register" className="text-blue-500 hover:underline">
                Go to Register Page
            </Link>
        </>
    )
}

export default Home