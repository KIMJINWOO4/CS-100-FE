import React from 'react';

function QuizNavigation({ currentIndex, totalQuestions, onNext, onPrevious, onSubmit }) {
    return (
        <div className='flex justify-between mt-4'>
            <button
                onClick={onPrevious}
                disabled={currentIndex === 0}
                className='w-1/3 bg-blue-500 text-white text-xl px-4 py-3 rounded disabled:bg-gray-300'
            >
                이전 문제
            </button>
            {currentIndex === totalQuestions - 1 ? (
                <button onClick={onSubmit} className='w-1/3 bg-green-500 text-white text-xl px-4 py-3 rounded'>
                    제출
                </button>
            ) : (
                <button onClick={onNext} className='w-1/3 bg-blue-500 text-white text-xl px-4 py-3 rounded'>
                    다음 문제
                </button>
            )}
        </div>
    );
}

export default QuizNavigation;
