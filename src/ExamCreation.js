// ExamCreation.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './axiosInstance';
import Header from './Header';

const ExamCreation = () => {
    const navigate = useNavigate();

    // 로그인 여부 확인
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
        }
    }, [navigate]);

    // 시험 정보 상태 관리
    const [examTitle, setExamTitle] = useState('');
    const [examGrade, setExamGrade] = useState('');
    const [examDescription, setExamDescription] = useState('');
    const [limitSecond, setLimitSecond] = useState('');

    // 모든 문제를 저장하는 상태
    const [problems, setProblems] = useState([]);

    // 선택된 문제 ID를 저장하는 상태
    const [selectedProblemIds, setSelectedProblemIds] = useState([]);

    // 로딩 및 에러 상태 관리
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 문제 가져오기
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await apiClient.get('/problem', {
                    headers: {
                        'ngrok-skip-browser-warning': '69420',
                    },
                });
                console.log(response);
                // 응답이 배열인지 확인
                if (Array.isArray(response.data)) {
                    setProblems(response.data);
                } else {
                    console.error('API 응답이 배열이 아닙니다:', response.data);
                    setError('문제 데이터를 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('문제 조회 중 오류가 발생했습니다:', error);
                setError('문제 조회에 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    // 문제 선택 핸들러
    const handleCheckboxChange = (problemId) => {
        setSelectedProblemIds((prevSelected) => {
            if (prevSelected.includes(problemId)) {
                return prevSelected.filter((id) => id !== problemId);
            } else {
                return [...prevSelected, problemId];
            }
        });
    };

    // 시험 생성 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 필수 필드 유효성 검사
        if (!examTitle || !examGrade || !examDescription || !limitSecond) {
            alert('모든 필수 필드를 입력해주세요.');
            return;
        }

        if (selectedProblemIds.length === 0) {
            alert('최소 하나의 문제를 선택해주세요.');
            return;
        }

        const examData = {
            examTitle,
            examGrade,
            examDescription,
            limitSecond: parseInt(limitSecond, 10),
            problems: selectedProblemIds.map((id) => ({ problemId: id })),
        };

        try {
            await apiClient.post('/exam/problemList', examData);
            alert('문제집이 성공적으로 생성되었습니다.');
            navigate('/user');
        } catch (error) {
            console.error('문제집 생성 중 오류가 발생했습니다:', error);
            alert('문제집 생성에 실패했습니다.');
        }
    };

    return (
        <div>
            <Header />
            <div className='max-w-6xl mx-auto p-6'>
                <h2 className='text-4xl font-bold mb-8 text-center text-blue-600'>문제집 만들기</h2>
                <form onSubmit={handleSubmit}>
                    {/* 시험 정보 입력 */}
                    <div className='bg-white shadow-md rounded-lg p-8 mb-8'>
                        <h3 className='text-2xl font-semibold mb-6'>시험 정보</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <label className='block text-gray-700 font-medium mb-2'>
                                    시험 제목 <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    value={examTitle}
                                    onChange={(e) => setExamTitle(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700 font-medium mb-2'>
                                    시험 등급 <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='text'
                                    value={examGrade}
                                    onChange={(e) => setExamGrade(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                />
                            </div>
                            <div>
                                <label className='block text-gray-700 font-medium mb-2'>
                                    제한 시간 (초) <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type='number'
                                    value={limitSecond}
                                    onChange={(e) => setLimitSecond(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    required
                                    min='1'
                                />
                            </div>
                            <div className='md:col-span-2'>
                                <label className='block text-gray-700 font-medium mb-2'>
                                    시험 설명 <span className='text-red-500'>*</span>
                                </label>
                                <textarea
                                    value={examDescription}
                                    onChange={(e) => setExamDescription(e.target.value)}
                                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none'
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* 문제 선택 */}
                    <div className='bg-white shadow-md rounded-lg p-8 mb-8'>
                        <h3 className='text-2xl font-semibold mb-6'>문제 선택</h3>
                        {loading ? (
                            <p className='text-gray-600'>문제를 로드 중입니다...</p>
                        ) : error ? (
                            <p className='text-red-500'>{error}</p>
                        ) : problems.length === 0 ? (
                            <p className='text-gray-600'>문제가 없습니다. 먼저 문제를 생성해주세요.</p>
                        ) : (
                            <div className='overflow-x-auto'>
                                <table className='min-w-full bg-white'>
                                    <thead>
                                        <tr>
                                            <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider'>
                                                선택
                                            </th>
                                            <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider'>
                                                ID
                                            </th>
                                            <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider'>
                                                출처
                                            </th>
                                            <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider'>
                                                타입
                                            </th>
                                            <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider'>
                                                카테고리
                                            </th>
                                            <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider'>
                                                난이도
                                            </th>
                                            <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider'>
                                                작성자
                                            </th>
                                            <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-blue-500 tracking-wider'>
                                                생성일
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-sm font-normal text-gray-700'>
                                        {problems.map((problem) => (
                                            <tr key={problem.id}>
                                                <td className='px-6 py-4 border-b border-gray-200'>
                                                    <input
                                                        type='checkbox'
                                                        checked={selectedProblemIds.includes(problem.id)}
                                                        onChange={() => handleCheckboxChange(problem.id)}
                                                        className='form-checkbox h-5 w-5 text-blue-600'
                                                    />
                                                </td>
                                                <td className='px-6 py-4 border-b border-gray-200'>{problem.id}</td>
                                                <td className='px-6 py-4 border-b border-gray-200'>
                                                    {problem.reference}
                                                </td>
                                                <td className='px-6 py-4 border-b border-gray-200'>{problem.type}</td>
                                                <td className='px-6 py-4 border-b border-gray-200'>
                                                    {problem.category}
                                                </td>
                                                <td className='px-6 py-4 border-b border-gray-200'>
                                                    {problem.difficulty}
                                                </td>
                                                <td className='px-6 py-4 border-b border-gray-200'>
                                                    {problem.authorName}
                                                </td>
                                                <td className='px-6 py-4 border-b border-gray-200'>
                                                    {new Date(problem.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* 제출 버튼 */}
                    <div className='text-center'>
                        <button
                            type='submit'
                            className='bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300'
                        >
                            문제집 생성
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExamCreation;
