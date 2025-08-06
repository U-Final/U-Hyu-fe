import { useEffect, useRef, useState } from 'react';

import { convertGrade } from '@mypage/constants/gradeUtils';
import { MYPAGE_PATHS } from '@mypage/constants/paths';
import type { UserInfoData } from '@mypage/api/types';
import { ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { formatUpdatedAt } from '@mypage/utils/dateUtils';
// import { updateUserInfo, updateUserProfileImage } from '@mypage/api/mypageApi';

interface MyPageHeaderProps {
  user: UserInfoData;
}

const MyPageHeader = ({ user }: MyPageHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string>(user.profileImage);

  // user.profileImage가 바뀔 때마다 동기화
  useEffect(() => {
    setProfileImage(user.profileImage);
  }, [user.profileImage]);

  //blob URL 해제를 위한 ref
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const previousUrl = previousUrlRef.current;
    return () => {
      if (previousUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previousUrl);
      }
    };
  }, []);

  // 프로필 이미지 업로드 기능 제거됨
  /*
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    if (previousUrlRef.current?.startsWith('blob:')) {
      URL.revokeObjectURL(previousUrlRef.current);
    }
    try {
      // 실제 파일 업로드
      const uploadedUrl = await updateUserProfileImage(file);
      setProfileImage(uploadedUrl);
      if (onProfileImageChange) onProfileImageChange(uploadedUrl);
      // PATCH로 profileImage도 동기화
      await updateUserInfo({ updatedProfileImage: uploadedUrl });
      console.log('프로필 이미지 업로드 및 PATCH 성공:', uploadedUrl);
    } catch (err) {
      alert('프로필 이미지 변경 실패');
      console.error(err);
    }
  };
  */

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
              // onClick={handleImageClick}
              className="w-[4.5rem] h-[4.5rem] rounded-[0.75rem] bg-white object-cover"
            />
            {/* 프로필 이미지 업로드 기능 제거됨
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              aria-label="프로필 이미지 업로드"
            />
            */}
          </div>
          <div className="flex flex-col justify-center gap-1 -mt-5">
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
          className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary-hover hover:text-white rounded-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="transition-colors duration-200">
            {isActivity ? '마이페이지' : '활동 내역'}
          </span>
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};

export default MyPageHeader;
