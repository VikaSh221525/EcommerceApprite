import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link, useNavigate } from 'react-router-dom';
import { account, databases } from '../lib/appwrite';
import { ID } from 'appwrite';

const DB_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const RegisterHandler = async (user) => {
        try {
            const newUser = await account.create(ID.unique(), user.email, user.password, user.username);

            await account.createEmailPasswordSession(user.email, user.password);
            const verificationURL = 'http://localhost:5173/verify';
            await account.createVerification(verificationURL); 

            await account.deleteSession('current');


            const adminEmails = ['vikassharma221525@gmail.com'];
            const isAdmin = adminEmails.includes(user.email);

            await databases.createDocument(
                DB_ID,
                USERS_COLLECTION_ID,
                ID.unique(),
                {
                    username: user.username,
                    email: user.email,
                    userId: newUser.$id,
                    isAdmin: isAdmin
                }
            )

            alert("Registeration successfull! Please check your email to verify your account before logging")
            navigate('/login');

        } catch (err) {
            console.log("Register error:", err);
            alert(`Registeration failed!: ${err.message}`)

        }
    };

    const [showPassword, setshowPassword] = useState(false);

    const togglepasswordvisibility = () => {
        setshowPassword(!showPassword)
    }
    return (
        <>
            <div className='w-full min-h-screen'>
                <h1 className='text-3xl font-semibold w-full bg-gray-100 px-20 py-5'>Login/Register</h1>
                <div className='flex justify-center items-center w-full py-15'>
                    <div className='w-[60rem] mx-auto flex flex-row bg-gray-100 rounded-2xl'>
                        <div className='w-1/2 bg-blue-500 rounded-2xl overflow-hidden relative'>
                            <DotLottieReact
                                src="/Loginplan.lottie"
                                loop
                                autoplay
                                muted
                                className='w-full h-full '
                            />
                            <h1 className='absolute text-3xl text-white top-5 left-5 font-bold'>TechPulse</h1>
                        </div>
                        <div className='w-1/2 px-10 pt-20 pb-15'>
                            <form onSubmit={handleSubmit(RegisterHandler)} className='flex flex-col gap-7'>
                                <div>
                                    <h1 className='text-[2rem] font-bold '>Welcome to TechPulse!</h1>
                                    <p className='text-gray-500'>Login your account</p>
                                </div>
                                <div>
                                    <label className='text-gray-700 font-semibold'>Username</label>
                                    <input type="text" placeholder='Enter your username' {...register("username", { required: "Username is required" })} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2' />
                                    {errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
                                </div>
                                <div>
                                    <label className='text-gray-700 font-semibold'>Email</label>
                                    <input type="email" placeholder='Enter your mail' {...register("email", { required: "Email is required" })} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2' />
                                    {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className='text-gray-700 font-semibold'>Password</label>
                                    <div className='relative'>
                                        <input type={showPassword ? "text" : "password"} placeholder='Enter your password' {...register("password", { required: "Password is required" })} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2' />
                                        <button type='button' onClick={togglepasswordvisibility} className='absolute top-4 right-4 text-lg'>
                                            {showPassword ? <i className="ri-eye-line"></i> : <i className="ri-eye-close-line"></i>}
                                        </button>
                                    </div>
                                    {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                                </div>
                                <input type="submit" value={`Register`} className='bg-blue-500 text-white px-12 py-2 rounded-4xl hover:bg-blue-600 transition duration-200 cursor-pointer shadow-md' />
                            </form>

                            <div className='mt-10'>
                                <p className='text-gray-500 flex items-center gap-3'>Create account with <span><img src="/facebook.png" alt="" /></span> <span><img src="/google.png" alt="" /></span> </p>
                            </div>
                            <div className='mt-5'>
                                <p className='text-gray-500'>Already have an account? <Link to='/login' className='text-blue-500 cursor-pointer hover:underline'>Login</Link></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register