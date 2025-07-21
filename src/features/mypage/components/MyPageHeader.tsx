import { convertGrade } from '@mypage/constants/gradeUtils';
import { MYPAGE_PATHS } from '@mypage/constants/paths';
import type { UserInfo } from '@mypage/types/types';
import { ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface MyPageHeaderProps {
  user: UserInfo;
}

const MyPageHeader = ({ user }: MyPageHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string>(user.profileImage);

  //blob URL 해제를 위한 ref
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previousUrlRef.current?.startsWith('blob:')) {
        URL.revokeObjectURL(previousUrlRef.current);
      }
    };
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const imageUrl = URL.createObjectURL(file);
    previousUrlRef.current = imageUrl;
    setProfileImage(imageUrl);
  };

  const isActivity = location.pathname === MYPAGE_PATHS.ACTIVITY;
  const nextPath = isActivity ? MYPAGE_PATHS.MAIN : MYPAGE_PATHS.ACTIVITY;

  return (
    <div className="space-y-[1rem]">
      <h2 className="font-bold text-[1.125rem] text-black">나의 유휴</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1rem]">
          <div className="relative">
            <img
              src={profileImage}
              alt="프로필 이미지"
              onClick={handleImageClick}
              className="w-[4.5rem] h-[4.5rem] rounded-[0.75rem] bg-white object-cover cursor-pointer"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              aria-label="프로필 이미지 업로드"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold text-[1rem] text-black leading-none">
              {user.nickname}
            </span>
            <span className="text-[0.75rem] text-gray-400 mt-[0.25rem] leading-none">
              수정일 : {user.updatedAt}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[0.25rem]">
          <span className="px-[0.625rem] py-[0.25rem] border border-gray-300 rounded-[0.5rem] text-[0.65rem] text-gray-700 bg-light-gray font-medium">
            {convertGrade(user.grade)} 등급
          </span>
          <button
            onClick={() => navigate(nextPath)}
            className="p-[0.5rem] text-gray-400 hover:text-black"
          >
            <ChevronRight className="w-[1rem] h-[1rem]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageHeader;
