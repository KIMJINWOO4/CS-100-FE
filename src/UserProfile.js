// UserProfile.js

import React from 'react';

const UserProfile = ({ memberName, email }) => {
    return (
        <div className='flex items-center p-4 bg-white shadow rounded-lg mb-4'>
            <div className='flex items-center space-x-4'>
                {/* 유저 아바타 */}
                <img src='/abc.png' alt='유저 아바타' className='w-16 h-16 rounded-full object-cover' />

                <div>
                    {/* 유저 이메일 */}
                    <h2 className='text-xl font-bold'>{memberName}</h2>
                    <h2 className='text-l'>{email}</h2>
                </div>
            </div>
            {/* 점수 부분 제거 */}
        </div>
    );
};

export default UserProfile;
