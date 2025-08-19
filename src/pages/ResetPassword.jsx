import { Accessibility } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { account, databases } from '../lib/appwrite';
import { toast } from 'react-toastify';
import { loginuser } from '../store/reducers/UserSlice';
import { Query } from 'appwrite';
import { useDispatch } from 'react-redux';

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [Error, setError] = useState('');

    const handlePasswordReset = async ({ newPassword, confirmPassword }) => {
        setError('');
        try {
            const userId = searchParams.get('userId');
            const secret = searchParams.get('secret');

            if (!userId || !secret) {
                throw new Error("Invalid password reset Link");
            }

            await account.updateRecovery(userId, secret, newPassword, confirmPassword);

            // const user = await account.get();
            // const response = await databases.listDocuments(
            //     import.meta.env.VITE_APPWRITE_DATABASE_ID,
            //     import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
            //     [Query.equal("userId", user.$id)]
            // );
            // const userDoc = response.documents[0];
            // const fulluser = { ...user, ...userDoc };
            // dispatch(loginuser(fulluser));

            toast.success("Password reset successfully! You can now log in with your new password.");
            navigate('/')
        } catch (err) {
            console.log("ResetPassword Error: ", err);
            setError(err.message)
        }
    }

    const [showPassword, setshowPassword] = useState(false);

    const togglepasswordvisibility = () => {
        setshowPassword(!showPassword)
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg text-center max-w-md w-full">
                <h1 className="text-3xl font-bold mb-4">Reset Your Password</h1>
                <p className="text-gray-600 mb-6">Enter your new password below.</p>

                <form onSubmit={handleSubmit(handlePasswordReset)} className="flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="New Password"
                        {...register("newPassword", { required: "New password is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}

                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            {...register("confirmPassword", { required: "Please confirm your password" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type='button' onClick={togglepasswordvisibility} className='absolute top-2 right-4 text-lg'>
                            {showPassword ? <i className="ri-eye-line"></i> : <i className="ri-eye-close-line"></i>}
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Reset Password
                    </button>
                </form>

                {Error && <p className="mt-4 text-red-500">{Error}</p>}
            </div>
        </div>
    )
}

export default ResetPassword