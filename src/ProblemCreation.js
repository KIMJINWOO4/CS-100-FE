// ProblemCreation.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './axiosInstance';
import Header from './Header';

const ProblemCreation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 여부 확인
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
        }
    }, [navigate]);

    // 단일 문제 상태 관리
    const [problem, setProblem] = useState({
        title: '',
        content: '',
        type: '',
        category: '',
        reference: '',
        authorId: parseInt(localStorage.getItem('userId'), 10) || 0,
        difficulty: 1,
        correctAnswer: '',
    });

    // 문제 변경 핸들러
    const handleChange = (field, value) => {
        setProblem((prevProblem) => ({
            ...prevProblem,
            [field]: value,
        }));
    };

    // 문제 생성 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 필드 유효성 검사
        const { title, content, type, correctAnswer } = problem;
        if (!title || !content || !type || !correctAnswer) {
            alert('필수 필드를 모두 입력해주세요.');

            return;
        }

        try {
            await apiClient.post('/problem', problem);
            alert('문제가 성공적으로 생성되었습니다.');
            console.log(problem);
            navigate('/user');
        } catch (error) {
            console.error('문제 생성 중 오류가 발생했습니다:', error);
            alert('문제 생성에 실패했습니다.');
        }
    };

    return (
        <div>
            <Header />
            <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
                <div className='w-full max-w-2xl bg-white shadow-lg rounded-lg p-8'>
                    <h2 className='text-3xl font-bold mb-6 text-center text-blue-600'>문제 생성</h2>
                    <form onSubmit={handleSubmit}>
                        {/* 문제 정보 입력 */}
                        <div className='mb-6'>
                            <label className='block text-gray-700 font-medium mb-2'>
                                제목 <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                value={problem.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>

                        <div className='mb-6'>
                            <label className='block text-gray-700 font-medium mb-2'>
                                타입 <span className='text-red-500'>*</span>
                            </label>
                            <select
                                value={problem.type}
                                onChange={(e) => handleChange('type', e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            >
                                <option value=''>선택하세요</option>
                                <option value='객관식'>객관식</option>
                                <option value='주관식'>주관식</option>
                            </select>
                        </div>

                        <div className='mb-6'>
                            <label className='block text-gray-700 font-medium mb-2'>
                                내용 <span className='text-red-500'>*</span>
                            </label>
                            <textarea
                                value={problem.content}
                                onChange={(e) => handleChange('content', e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none'
                                required
                            />
                        </div>

                        <div className='mb-6'>
                            <label className='block text-gray-700 font-medium mb-2'>카테고리</label>
                            <input
                                type='text'
                                value={problem.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div className='mb-6'>
                            <label className='block text-gray-700 font-medium mb-2'>난이도 (1~5)</label>
                            <input
                                type='number'
                                min='1'
                                max='5'
                                value={problem.difficulty}
                                onChange={(e) => handleChange('difficulty', e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div className='mb-6'>
                            <label className='block text-gray-700 font-medium mb-2'>
                                정답 <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type='text'
                                value={problem.correctAnswer}
                                onChange={(e) => handleChange('correctAnswer', e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>

                        <div className='mb-6'>
                            <label className='block text-gray-700 font-medium mb-2'>출처</label>
                            <input
                                type='text'
                                value={problem.reference}
                                onChange={(e) => handleChange('reference', e.target.value)}
                                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        {/* 제출 버튼 */}
                        <div className='text-center'>
                            <button
                                type='submit'
                                className='bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300'
                            >
                                문제 생성
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProblemCreation;
