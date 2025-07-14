import type { FC } from 'react';

interface Props {
  profileImage: string;
  nickname: string;
  updatedAt: string;
  grade: 'VVIP' | 'VIP' | '우수';
}

const UserProfileCard: FC<Props> = ({
  profileImage,
  nickname,
  updatedAt,
  grade,
}) => {
  return (
    <div className="w-full">
      {/* ✅ 카드 외부에 배치 */}
      <p className="text-[1.4rem] font-semibold text-black mb-[1.2rem]">
        나의 유휴
      </p>

      <div className="flex items-center justify-between px-[0rem] py-[0rem]">
        <div className="flex items-center gap-[1.2rem]">
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="w-[4.4rem] h-[4.4rem] rounded-full object-cover"
          />

          <div className="flex flex-col justify-center">
            <span className="text-[1.4rem] font-semibold text-black">{nickname}</span>
            <span className="text-[1.2rem] text-gray-500 mt-[0.2rem]">
              수정일: {updatedAt}
            </span>
          </div>
        </div>

        <div className="px-[1rem] py-[0.4rem] border border-gray-300 rounded-[0.5rem] text-[1.2rem] text-black">
          {grade}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
