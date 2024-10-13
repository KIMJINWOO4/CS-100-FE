import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const QuizResult = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { resultData, examData, userAnswers } = location.state || {};

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!resultData || !examData || !userAnswers) {
            // 데이터를 로드하거나, 필요한 경우 리디렉션
            navigate('/');
        } else {
            setIsLoading(false);
        }
    }, [resultData, examData, userAnswers, navigate]);

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='text-center'>
                    <div className='loader mb-4'></div>
                    <p className='text-xl font-semibold text-gray-700'>결과를 불러오는 중입니다...</p>
                </div>
            </div>
        );
    }

    const handleFinish = () => {
        navigate('/user');
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4'>
            <div className='w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg'>
                <div className='flex justify-between items-center mb-6'>
                    <div className='text-2xl text-blue-700 font-bold'>{examData.title}</div>
                    <div className='text-sm text-gray-600'>
                        제한시간 {Math.floor(examData.limitSecond / 60)}분, 문제 수 {examData.problems.length}
                    </div>
                    <div className='flex items-center'>
                        <span className='bg-yellow-400 text-gray-800 font-semibold px-3 py-1 rounded-full'>
                            {examData.grade}
                        </span>
                    </div>
                </div>
                <div className='text-center mb-8'>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        {examData.title} 총 {resultData.questions.length}문제 중{' '}
                        <span className='text-green-600'>{resultData.correctCount || 0}</span>문제 맞추셨습니다.
                    </h2>
                </div>
                <div className='space-y-8'>
                    {resultData.questions.map((question, index) => (
                        <div key={index} className='mb-6'>
                            <h3 className='text-xl font-bold mb-4'>문제 {index + 1}</h3>
                            <p className='text-gray-800 mb-4'>{examData.problems[index].content}</p>

                            {/* 사용자 답변 섹션 */}
                            <div className='mb-4'>
                                <h4 className='text-lg font-semibold text-gray-800 mb-2'>사용자 답변</h4>
                                <p
                                    className={`p-3 rounded ${
                                        userAnswers[index]
                                            ? question.score > 0
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    {userAnswers[index] || '답변하지 않음'}
                                </p>
                            </div>

                            {/* 정답 섹션 */}
                            <div className='mb-4'>
                                <h4 className='text-lg font-semibold text-gray-800 mb-2'>정답</h4>
                                <p className='p-3 bg-blue-100 text-blue-700 rounded'>{question.answer}</p>
                            </div>

                            {/* AI 해설 섹션 */}
                            {question.feedback && (
                                <div className='p-4 bg-gray-100 border-l-4 border-blue-500 rounded'>
                                    <h5 className='text-md font-semibold text-gray-800 mb-2'>AI 피드백</h5>
                                    <p className='text-gray-700'>{question.feedback}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className='mt-8 text-right'>
                    <button
                        className='bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300'
                        onClick={handleFinish}
                    >
                        풀이 종료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizResult;
