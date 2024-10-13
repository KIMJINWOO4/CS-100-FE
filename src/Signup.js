import React, { useState } from 'react';
import apiClient from './axiosInstance';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSignup = async (event) => {
        event.preventDefault();

        const userData = {
            email,
            password,
            name,
        };

        try {
            // API 요청 보내기
            const response = await apiClient.post('member/signUp', userData);
            console.log('회원가입 성공:', response.data);
            navigate('/login');
            // 성공 시 처리 (예: 로그인 페이지로 이동)
        } catch (error) {
            console.error('회원가입 오류:', error);
            // 오류 처리 (예: 에러 메시지 표시)
        }
    };
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
            <div className='text-center'>
                {/* Logo */}
                <div className='mb-8'>
                    <img src='/logo.png' alt='Logo' className='w-64 h-48 mx-auto' />
                </div>

                {/* Title */}
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>회원가입</h1>

                <form onSubmit={handleSignup}>
                    {/* 이름 입력 */}
                    <div className='mb-4'>
                        <input
                            type='text'
                            placeholder='이름'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-80 px-4 py-2 border border-gray-300 rounded-full text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                    </div>

                    {/* 이메일 입력 */}
                    <div className='mb-4'>
                        <input
                            type='email'
                            placeholder='이메일'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-80 px-4 py-2 border border-gray-300 rounded-full text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                    </div>

                    {/* 비밀번호 입력 */}
                    <div className='mb-6'>
                        <input
                            type='password'
                            placeholder='비밀번호'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-80 px-4 py-2 border border-gray-300 rounded-full text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                    </div>

                    {/* 회원가입 버튼 */}
                    <button
                        type='submit'
                        className='bg-indigo-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
