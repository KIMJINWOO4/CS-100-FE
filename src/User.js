// User.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from './axiosInstance';
import Header from './Header';
import ProblemList from './ProblemList';
import UserProfile from './UserProfile';

const User = () => {
    const navigate = useNavigate();

    // 상태 관리
    const [allProblems, setAllProblems] = useState([]);
    const [availableProblems, setAvailableProblems] = useState([]);
    const [userProfile, setUserProfile] = useState({
        nickname: '',
        rank: '',
        score: '',
        email: '',
    });

    useEffect(() => {
        // 로그인 여부 확인
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }

        // 문제 데이터 가져오기
        fetchAllProblems();
        fetchAvailableProblems();
        fetchUserProfile(userId);
    }, [navigate]);
    const handleCreateExam = () => {
        navigate('/create-problem');
    };
    const fetchUserProfile = async (userId) => {
        try {
            const response = await apiClient.get(`/member/${userId}`, {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            const userData = response.data;
            setUserProfile({
                nickname: userData.memberName || '닉네임',
                email: userData.email || '이메일',
                rank: '랭크', // rank 정보가 없으므로 기본값 설정 또는 추가 API 호출 필요
                score: '점수', // score 정보가 없으므로 기본값 설정 또는 추가 API 호출 필요
            });
            console.log(userData);
        } catch (error) {
            console.error('사용자 프로필을 가져오는 데 실패했습니다:', error);
        }
    };
    const fetchAllProblems = async () => {
        try {
            const response = await apiClient.get('/exam', {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            const exams = response.data.exams || [];
            setAllProblems(
                exams.map((exam) => ({
                    examId: exam.id,
                    title: exam.title,
                    grade: exam.grade,
                    limitTime: `제한시간 ${exam.limit_second}초`,
                }))
            );
        } catch (error) {
            console.error('모든 문제 데이터를 가져오는 데 실패했습니다:', error);
        }
    };

    // 내가 풀 수 있는 문제 데이터 가져오기 함수
    const fetchAvailableProblems = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('User ID is not available in localStorage.');
            }

            const response = await apiClient.get('/exam/member', {
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                },
                params: {
                    memberId: userId,
                },
            });

            const exams = response.data.exams || [];
            setAvailableProblems(
                exams.map((exam) => ({
                    examId: exam.id,
                    title: exam.title,
                    grade: exam.grade,
                    limitTime: `제한시간 ${exam.limit_second}초`,
                }))
            );
        } catch (error) {
            console.error('내가 풀 수 있는 문제 데이터를 가져오는 데 실패했습니다:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className='container mx-auto p-4'>
                {/* 상단 유저 프로필 */}
                <UserProfile memberName={userProfile.nickname || '닉네임'} email={userProfile.email} />

                {/* 내가 풀 수 있는 문제 리스트 */}
                <ProblemList problems={availableProblems} title='내가 안 푼 문제' />

                {/* 모든 문제 리스트 */}
                <ProblemList problems={allProblems} title='모든 문제' />
            </div>
            <button
                onClick={handleCreateExam}
                className='fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
                문제 만들기 +
            </button>
        </div>
    );
};

export default User;
