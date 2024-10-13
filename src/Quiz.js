// Quiz.js

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from './axiosInstance';
import QuizHeader from './QuizHeader';
import QuizQuestion from './QuizQuestion';
import QuizNavigation from './QuizNavigation';

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // location.state에서 examData 가져오기
    const examData = location.state?.examData;

    // examData가 없으면 메인 페이지로 리디렉션
    useEffect(() => {
        if (!examData) {
            navigate('/');
        }
    }, [examData, navigate]);

    // examData.problems를 사용하여 questions 설정
    const questions = examData.problems.map((problem) => ({
        id: problem.id,
        questionText: problem.content,
        type: problem.type,
        // 기타 필요한 속성 추가
    }));

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(''));
    const [timeLeft, setTimeLeft] = useState(examData.limitSecond); // 초 단위

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleSubmit(); // 시간이 다 되면 자동 제출
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeLeft]);

    const handleAnswerChange = (answer) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answer;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            // memberId와 examId 가져오기
            const memberId = parseInt(localStorage.getItem('userId'), 10);
            const examId = examData.examId;

            // 답안 데이터 구성
            const answersData = {
                memberId: memberId,
                examId: examId,
                answers: questions.map((question, index) => ({
                    problemId: question.id,
                    content: answers[index],
                })),
            };

            // 답안 저장 요청
            await apiClient.post('/answer', answersData);

            // 채점 요청
            const gradeResponse = await apiClient.post('/answer/grade', {
                memberId: memberId,
                examId: examId,
            });

            const resultData = gradeResponse.data;

            // '/result' 페이지로 이동하면서 결과 데이터와 사용자 답변 전달
            navigate('/result', { state: { resultData, examData, userAnswers: answers } });
        } catch (error) {
            console.error('제출 과정에서 오류가 발생했습니다:', error);
            // 오류 처리 (예: 오류 메시지 표시)
        }
    };

    return (
        <div className='h-screen flex flex-col justify-between p-4 max-w-3xl mx-auto'>
            <QuizHeader
                title={examData.title || 'Quiz'}
                timeLimit={Math.floor(timeLeft / 60)} // 남은 시간 (분 단위)
                level={examData.grade || 'Level'}
                category={`문제 수: ${questions.length}`}
            />
            <QuizQuestion
                question={questions[currentQuestionIndex]}
                answer={answers[currentQuestionIndex]}
                onAnswerChange={handleAnswerChange}
            />
            <QuizNavigation
                currentIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onSubmit={handleSubmit}
            />
            <div className='text-lg text-gray-600 text-center mt-4'>
                남은 제출 시간: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
        </div>
    );
};

export default Quiz;
