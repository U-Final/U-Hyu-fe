import { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { UserGrade, UserInfo } from '@mypage/types';

interface MyPageHeaderProps {
  user: UserInfo;
}

const MyPageHeader = ({ user }: MyPageHeaderProps) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string>(user.profileImage);

  const convertGrade = (grade: UserGrade): 'VIP' | 'VVIP' | '우수' => {
    return grade === 'GOOD' ? '우수' : grade;
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  return (
    <div className="space-y-[1rem] pt-[3.75rem]">
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
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-bold text-[1rem] text-black leading-none">
              {user.nickname}
            </span>
            <span className="text-[0.75rem] text-[#9CA3AF] mt-[0.25rem] leading-none">
              수정일 : {user.updatedAt}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-[0.25rem]">
          <span className="px-[0.625rem] py-[0.25rem] border border-gray-300 rounded-[0.5rem] text-[0.65rem] text-gray-700 bg-[#F9FAFB] font-medium">
            {convertGrade(user.grade)} 등급
          </span>
          <button
            onClick={() => navigate('/profile')}
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
