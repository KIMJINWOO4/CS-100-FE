// Header.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // localStorage에서 userId 제거
        localStorage.removeItem('userId');
        // '/' 페이지로 이동
        navigate('/');
    };

    return (
        <header className='w-full bg-white shadow-md'>
            <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
                {/* 로고 */}
                <a href='/'>
                    <img src='/logo.png' alt='Logo' className='h-8 w-auto' />
                </a>

                {/* 로그아웃 버튼 */}
                <button
                    onClick={handleLogout}
                    className='flex items-center text-gray-700 hover:text-gray-900 focus:outline-none'
                >
                    <span className='mr-2'>Logout</span>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1'
                        />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
