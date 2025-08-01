import { useEffect, useRef, useState } from 'react';

import { convertGrade } from '@mypage/constants/gradeUtils';
import { MYPAGE_PATHS } from '@mypage/constants/paths';
import type { UserInfoData } from '@mypage/api/types';
import { ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatUpdatedAt } from '@mypage/utils/dateUtils';
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
          <div className="flex flex-col justify-center">
            <span className="font-bold text-[1rem] text-black leading-none">
              {user.nickName || user.userName}
            </span>
            <span className="text-[0.875rem] text-gray leading-none">
              {user.grade ? convertGrade(user.grade) : '등급 없음'}
            </span>
            <span className="text-[0.75rem] text-gray leading-none">
              {formatUpdatedAt(user.updatedAt)}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(nextPath)}
          className="flex items-center gap-[0.25rem] text-[0.875rem] text-gray"
        >
          {isActivity ? '마이페이지' : '활동 내역'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MyPageHeader;
