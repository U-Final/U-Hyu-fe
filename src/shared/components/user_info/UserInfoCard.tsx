import { useState } from 'react';
import { FaUser, FaSignature, FaTransgender, FaBirthdayCake, FaEnvelope } from 'react-icons/fa';
import UserInfoEditModal from './UserInfoEditModal';

interface Props {
  name: string;
  nickname: string;
  gender: string;
  age: number;
  email: string;
  onEdit: () => void;
}

const UserInfoCard = ({ name, nickname, gender, age, email }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl p-[1.6rem] relative">
      <p className="text-text-black text-base font-semibold mb-[1.2rem]">나의 정보</p>

      <button
  aria-label="개인정보 수정 모달 열기"  //스크린 리더용 설명
  type="button"                          //버튼 타입 명시
  onClick={() => setIsEditOpen(true)}
  className="absolute top-[1.6rem] right-[1.6rem] text-xs text-gray-500 underline"
>
  개인정보 수정
</button>


      <div className="space-y-[1.2rem] mt-[0.8rem]">
        <div className="flex items-center gap-[0.8rem] text-sm text-text-black">
          <FaUser />
          <span>이름 : {name}</span>
        </div>
        <div className="flex items-center gap-[0.8rem] text-sm text-text-black">
          <FaSignature />
          <span>닉네임 : {nickname}</span>
        </div>
        <div className="flex items-center gap-[0.8rem] text-sm text-text-black">
          <FaTransgender />
          <span>성별 : {gender}</span>
        </div>
        <div className="flex items-center gap-[0.8rem] text-sm text-text-black">
          <FaBirthdayCake />
          <span>나이 : {age}세</span>
        </div>
        <div className="flex items-center gap-[0.8rem] text-sm text-text-black">
          <FaEnvelope />
          <span>이메일 : {email}</span>
        </div>
      </div>

      {isEditOpen && (
        <UserInfoEditModal
          initialNickname={nickname}
          initialEmail={email}
          initialAge={age}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  );
};

export default UserInfoCard;
