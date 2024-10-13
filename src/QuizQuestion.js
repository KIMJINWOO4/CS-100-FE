// QuizQuestion.js

import React from 'react';

function QuizQuestion({ question, answer, onAnswerChange }) {
    return (
        <div className='mb-4'>
            <h2 className='text-xl font-semibold'>{question.questionText}</h2>
            {/* 객관식과 주관식에 따라 다른 렌더링 */}
            {question.type === '객관식' ? (
                // 객관식인 경우 선택지 렌더링
                <div className='mt-4'>
                    {question.options && question.options.length > 0 ? (
                        question.options.map((option, index) => (
                            <div key={index} className='flex items-center mb-2'>
                                <input
                                    type='radio'
                                    id={`option-${index}`}
                                    name='answer'
                                    value={option}
                                    checked={answer === option}
                                    onChange={(e) => onAnswerChange(e.target.value)}
                                    className='mr-2'
                                />
                                <label htmlFor={`option-${index}`} className='text-lg'>
                                    {option}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>선택지가 제공되지 않았습니다.</p>
                    )}
                </div>
            ) : (
                // 주관식인 경우 텍스트 입력 필드
                <input
                    type='text'
                    className='w-full p-4 mt-10 text-lg border rounded'
                    value={answer}
                    onChange={(e) => onAnswerChange(e.target.value)}
                />
            )}
        </div>
    );
}

export default QuizQuestion;
