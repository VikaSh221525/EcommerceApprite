import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { account } from '../lib/appwrite';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [Message, setMessage] = useState('');
    const [Error, setError] = useState('')

    const handlePasswordResetRequest = async ({ email }) => {
        setError('');
        setMessage('');
        try {
            const resetURL = `${import.meta.env.VITE_APP_URL}/reset-password`;

            await account.createRecovery(email, resetURL);
            setMessage('Success! If an account with this email exists, a password reset link has been sent.')
        } catch (err) {
            console.log("ResetPassword Error: ", err);
            setError(err.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg text-center max-w-md w-full">
                <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
                <p className="text-gray-600 mb-6">Enter your email address and we'll send you a link to reset your password.</p>

                <form onSubmit={handleSubmit(handlePasswordResetRequest)} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Send Reset Link
                    </button>
                </form>

                {Message && <p className="mt-4 text-green-600">{Message}</p>}
                {Error && <p className="mt-4 text-red-500">{Error}</p>}

                <div className="mt-6">
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword