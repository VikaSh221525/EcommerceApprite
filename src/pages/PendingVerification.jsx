import React from 'react';
import { Link } from 'react-router-dom';

const PendingVerification = () => {
    return (
        <div className="w-full h-screen bg-gray-100 relative">
            <div className="p-8 bg-white shadow-lg rounded-lg text-center max-w-lg absolutecenter">
                <h1 className="text-3xl font-bold mb-4 text-green-600">Registration Successful!</h1>
                <p className="text-lg text-gray-700 mb-6">
                    We've sent a verification link to your email address. Please check your inbox (and spam folder) to complete your registration.
                </p>
                <Link to="/login" className="text-blue-500 hover:underline">
                    Go to Login Page
                </Link>
            </div>
        </div>
    );
};

export default PendingVerification;