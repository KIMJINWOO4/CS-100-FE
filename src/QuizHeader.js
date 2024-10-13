import React from 'react';

function QuizHeader({ title, timeLimit, level, category }) {
    return (
        <div className='flex justify-between items-center mb-4'>
            <div>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <p className='text-sm text-gray-600'>
                    {category} {level}
                </p>
            </div>
            <div className='bg-yellow-500 text-white px-4 py-2 rounded-lg'>제한 시간: {timeLimit}분</div>
        </div>
    );
}

export default QuizHeader;
