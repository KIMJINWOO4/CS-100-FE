// ProblemList.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './axiosInstance';

// 등급에 따른 색상 지정
const gradeColors = {
    Gold: 'text-yellow-600',
    Silver: 'text-gray-400',
    Platinum: 'text-blue-400',
    Diamond: 'text-indigo-600',
    Bronze: 'text-orange-600',
    Solved: 'text-green-500',
};

const ProblemList = ({ problems, title }) => {
    const navigate = useNavigate();

    const handleProblemClick = async (examId) => {
        try {
            const response = await apiClient.get(`/exam/${examId}`, {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            const examData = response.data;
            navigate('/quiz', { state: { examData } });
        } catch (error) {
            console.error('문제 데이터를 가져오는 데 실패했습니다:', error);
        }
    };

    return (
        <div className='bg-white shadow rounded-lg p-4 mb-6'>
            <h3 className='text-xl font-semibold mb-4'>{title}</h3>
            <ul className='space-y-3'>
                {problems.map((problem) => {
                    const gradeKey = Object.keys(gradeColors).find((key) => problem.grade.startsWith(key));
                    const gradeColor = gradeColors[gradeKey] || 'text-gray-500';

                    return (
                        <li
                            key={problem.examId}
                            className='flex justify-between items-center p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200'
                            onClick={() => handleProblemClick(problem.examId)}
                        >
                            <div className='flex items-center'>
                                <span className={`font-bold ${gradeColor} mr-2`}>{problem.grade}</span>
                                <span>{problem.title}</span>
                            </div>
                            <span className='text-sm text-gray-500'>{problem.limitTime}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ProblemList;
