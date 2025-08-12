import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { account } from '../lib/appwrite';

const Verify = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('Verifying your account...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyAccount = async () => {
            const userId = searchParams.get('userId');
            const secret = searchParams.get('secret');

            if(!userId || !secret){
                setError("Verification is invalid or has expired!");
                return;
            }
            try{
                await account.updateVerification(userId, secret);
                setStatus("Account Verified Successfully! Redirecting to login...");
                setTimeout(() => navigate('/login'), 3000)
            }catch(err){
                setError(`Verification failed! : ${err.message}`)
            }
        }
        verifyAccount()
    }, [searchParams, navigate])

    return (
        <div className='h-screen w-full bg-gray-100 relative'>
            <div className='p-8 bg-white shadow-md rounded-lg text-center max-w-md absolutecenter'>
                <h1 className='text-3xl font-bold mb-4'>
                    Account Verification
                </h1>
                {error ? ( <p className='text-lg text-red-500'> {error} </p> ) : ( <p className='text-lg text-green-500'> {status} </p> )}
            </div>
        </div>
    )
}

export default Verify