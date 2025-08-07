import React from 'react'
import { useForm } from 'react-hook-form';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const RegisterHandler = (user) => {
        console.log("Submitting User:", user);
        reset()
        navigate("/");

    };
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
                                    <input type="password" placeholder='Enter your password' {...register("password", { required: "Password is required" })} className='w-full px-4 py-2 rounded-4xl border-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2' />
                                    {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                                </div>
                                <input type="submit" value={`Register`} className='bg-blue-400 py-2 px-4 w-fit' />
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register