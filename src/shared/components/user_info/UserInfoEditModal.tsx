import { useState, useEffect } from 'react';
import { useUserUpdateMutation } from '@shared/components/user_info/useUserUpdateMutation';

interface Props {
  onClose: () => void;
  initialNickname: string;
  initialEmail: string;
  initialAge: number;
}

const UserInfoEditModal = ({ onClose, initialNickname, initialEmail, initialAge }: Props) => {
  const { mutate, isPending } = useUserUpdateMutation();

  const [nickname, setNickname] = useState(initialNickname);
  const [email, setEmail] = useState(initialEmail);
  const [age, setAge] = useState(initialAge);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSave = () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    if (!email.includes('@')) {
      alert('올바른 이메일 주소를 입력해주세요.');
      return;
    }
    if (age < 1 || age > 150) {
      alert('올바른 나이를 입력해주세요.');
      return;
    }

    mutate(
      { nickname, email, age },
      {
        onSuccess: () => {
          alert('개인정보가 수정되었습니다.');
          onClose();
        },
        onError: (error) => {
          alert('수정 중 오류가 발생했습니다.');
          console.error('User update error:', error);
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-[2rem] rounded-2xl w-[30rem]">
        <p className="font-bold text-[1.6rem] mb-[1.2rem]">개인정보 수정</p>

        <div className="space-y-[1rem] mb-[1.6rem]">
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border p-[0.8rem] w-full rounded"
            disabled={isPending}
          />
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-[0.8rem] w-full rounded"
            disabled={isPending}
          />
          <input
            type="number"
            placeholder="나이"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="border p-[0.8rem] w-full rounded"
            disabled={isPending}
          />
        </div>

        <div className="flex justify-end space-x-[0.8rem]">
          <button onClick={onClose} disabled={isPending} className="text-gray-600">
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="bg-black text-white px-[1rem] py-[0.6rem] rounded disabled:opacity-50"
          >
            {isPending ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoEditModal;
