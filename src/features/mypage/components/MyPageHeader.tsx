import { useEffect, useRef, useState } from 'react';

import { convertGrade } from '@mypage/constants/gradeUtils';
import { MYPAGE_PATHS } from '@mypage/constants/paths';
import type { UserInfoData } from '@mypage/api/types';
import { ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface MyPageHeaderProps {
  user: UserInfoData;
}

const MyPageHeader = ({ user }: MyPageHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [profileImage, setProfileImage] = useState<string>(user.profileImage);

  useEffect(() => {
    setProfileImage(user.profileImage);
  }, [user.profileImage]);

  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const previousUrl = previousUrlRef.current;
    return () => {
      if (previousUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previousUrl);
      }
    };
  }, []);

  const isActivity = location.pathname === MYPAGE_PATHS.ACTIVITY;
  const nextPath = isActivity ? MYPAGE_PATHS.MAIN : MYPAGE_PATHS.ACTIVITY;

  const getGradeBadgeStyle = (grade: string) => {
    switch (grade) {
      case 'VVIP':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg';
      case 'VIP':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-lg';
      case 'GOOD':
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg';
      default:
        return 'bg-gray-300 text-gray-600';
    }
  };

  return (
    <div className="space-y-[1rem]">
      <h2 className="font-bold text-[1.125rem] text-black">
        나의 유휴
      </h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1rem]">
          <div className="relative">
            <img
              src={profileImage}
              alt="프로필 이미지"
              className="w-[4.5rem] h-[4.5rem] rounded-[0.75rem] bg-white object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-2 -mt-5">
            {user.grade && (
              <span className={`inline-flex items-center justify-center px-3 py-0.5 rounded-full text-[10px] font-bold w-fit max-w-[3rem] ${getGradeBadgeStyle(user.grade)}`}>
                {convertGrade(user.grade)}
              </span>
            )}
            <span className="font-bold text-[1rem] text-black leading-none">
              {user.nickName || user.userName}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(nextPath)}
          className="group flex items-center gap-1 sm:gap-2 lg:gap-2 px-2 sm:px-3 lg:px-4 py-2 text-xs sm:text-sm lg:text-base font-medium text-primary hover:bg-primary-hover hover:text-white rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
        >
          <span className="transition-colors duration-200">
            {isActivity ? '마이페이지' : '활동 내역'}
          </span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};

export default MyPageHeader;
