// Login.js

import React, { useState } from 'react';
import apiClient from './axiosInstance'; // axiosInstance 경로에 맞게 수정하세요
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트

const Login = () => {
    // 상태 관리
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // useNavigate 훅 사용

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        setLoading(true);
        setError(null);

        try {
            // API 요청 보내기
            const response = await apiClient.post('/member/signIn', {
                email,
                password,
            });

            // 요청 성공 시 처리
            console.log('Login successful:', response.data);

            // 서버로부터 userId 추출 (예: { id: 4 } 형태)
            const userId = response.data?.id;

            if (userId) {
                // userId를 로컬 스토리지에 저장
                localStorage.setItem('userId', userId);

                // '/user' 경로로 이동
                navigate('/user');
            } else {
                // userId가 응답에 없을 경우 오류 처리
                setError('서버 응답이 올바르지 않습니다.');
            }
        } catch (err) {
            // 오류 처리
            console.error('Login failed:', err);
            setError(err.response?.data?.message || '로그인에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
            <div className='text-center'>
                {/* 로고 */}
                <div className='mb-8'>
                    <img src='/logo.png' alt='Logo' className='w-64 h-48 mx-auto' />
                </div>

                {/* 제목 */}
                <h1 className='text-3xl font-bold text-gray-800 mb-8'>로그인</h1>

                {/* 폼 */}
                <form onSubmit={handleSubmit}>
                    {/* 이메일 입력 */}
                    <div className='mb-4'>
                        <input
                            type='email'
                            placeholder='이메일'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            required
                            className='w-80 px-4 py-2 border border-gray-300 rounded-full text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                    </div>

                    {/* 로그인 버튼 */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-indigo-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        {loading ? 'Logging In...' : 'LOGIN'}
                    </button>
                </form>

                {/* 오류 메시지 */}
                {error && <div className='mt-4 text-red-600'>{error}</div>}
            </div>
        </div>
    );
};

export default Login;
