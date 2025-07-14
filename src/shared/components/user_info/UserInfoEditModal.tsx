import { useState } from 'react';
import { useUserUpdateMutation } from '@user/hooks/useUserUpdateMutation';

interface Props {
  onClose: () => void;
  initialNickname: string;
  initialEmail: string;
  initialAge: number;
}

const UserInfoEditModal = ({ onClose, initialNickname, initialEmail, initialAge }: Props) => {
  const { mutate } = useUserUpdateMutation();
  const [nickname, setNickname] = useState(initialNickname);
  const [email, setEmail] = useState(initialEmail);
  const [age, setAge] = useState(initialAge);

  const handleSave = () => {
    mutate(
      { nickname, email, age },
      {
        onSuccess: () => {
          alert('개인정보가 수정되었습니다.');
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-[2rem] rounded-2xl w-[30rem]">
        <p className="font-bold text-[1.6rem] mb-[1.2rem]">개인정보 수정</p>

        <div className="space-y-[1rem] mb-[1.6rem]">
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border p-[0.8rem] w-full rounded"
          />
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-[0.8rem] w-full rounded"
          />
          <input
  type="number"
  placeholder="나이"
  value={age}
  onChange={(e) => setAge(Number(e.target.value))}
  className="border p-[0.8rem] w-full rounded"
/>

        </div>

        <div className="flex justify-end space-x-[0.8rem]">
          <button onClick={onClose} className="text-gray-600">취소</button>
          <button onClick={handleSave} className="bg-black text-white px-[1rem] py-[0.6rem] rounded">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoEditModal;
