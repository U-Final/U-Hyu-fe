import React from 'react';
import { Crown, Star, User2 } from 'lucide-react';
import type { UserInfo, UserGrade } from '@mypage/api/types';
import { convertGrade } from '@mypage/constants/gradeUtils';
import { updateUserInfo } from  '@mypage/api/mypageApi';

interface Props {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
}

const MyPageMembership = ({ user, setUser }: Props) => {
  const handleSelect = async (grade: UserGrade) => {
    try {
      await updateUserInfo({ updatedGrade: grade });
      setUser((prev) => prev ? { ...prev, grade } : prev);
      console.log('등급 PATCH 요청 성공:', grade);
    } catch (err) {
      alert('등급 변경 실패');
      console.error(err);
    }
  };

  const gradeOptions: { grade: UserGrade; icon: React.ReactNode }[] = [
    { grade: 'VVIP', icon: <Crown className="w-[0.9rem] h-[0.9rem] text-[var(--text-gray)]" /> },
    { grade: 'VIP', icon: <Star className="w-[0.9rem] h-[0.9rem] text-[var(--text-gray)]" /> },
    { grade: 'GOOD', icon: <User2 className="w-[0.9rem] h-[0.9rem] text-[var(--text-gray)]" /> },
  ];

  const handleKeyDown = (grade: UserGrade, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleSelect(grade);
    }
  };

  return (
    <div className="space-y-[0.75rem]">
      <div className="font-bold text-[1rem] text-[var(--text-black)]">
        LG U+ 멤버십 등급
      </div>
      <div className="rounded-[1rem] bg-white p-[1.25rem] text-[0.875rem] text-[var(--text-gray)] border border-gray-200">
        <p className="mb-[1rem] text-[0.75rem] text-[var(--text-gray)] text-center">
          현재 보유하고 계신 멤버십 등급을 선택해주세요
        </p>
        <div
          className="flex items-center justify-center gap-[0.75rem]"
          role="radiogroup"
          aria-label="멤버십 등급 선택"
        >
          {gradeOptions.map(({ grade, icon }) => (
            <button
              key={grade}
              onClick={() => handleSelect(grade)}
              onKeyDown={(e) => handleKeyDown(grade, e)}
              role="radio"
              aria-checked={user.grade === grade}
              aria-label={`${convertGrade(grade)} 등급`}
              tabIndex={user.grade === grade ? 0 : -1}
              className={`flex items-center justify-center gap-[0.25rem] w-[10rem] py-[0.4rem] rounded-[0.5rem] border border-gray-300 text-[0.75rem] ${
                user.grade === grade ? 'bg-[var(--bg-light-gray)] font-bold' : ''
              }`}
            >
              {icon}
              {convertGrade(grade)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPageMembership;
