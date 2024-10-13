// Home.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // localStorage에서 userId 확인
        const userId = localStorage.getItem('userId');
        if (userId) {
            // userId가 있으면 /user로 이동
            navigate('/user');
        }
    }, [navigate]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
            <div className='text-center'>
                {/* Logo */}
                <div className='mb-8'>
                    <img src='/logo.png' alt='Logo' className='w-64 h-48 mx-auto' />
                </div>

                {/* Subtitle */}
                <p className='text-gray-500 mb-4'>CS 지식을 한 번에!</p>

                {/* Title */}
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>CS 100</h1>

                {/* Login Button */}
                <button
                    onClick={() => {
                        navigate('/login');
                    }}
                    className='bg-indigo-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                    LOGIN
                </button>
                <button
                    onClick={() => {
                        navigate('/signup');
                    }}
                    className='bg-indigo-600 text-white px-6 ml-4 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                    SIGN UP
                </button>
            </div>
        </div>
    );
};

export default Home;
