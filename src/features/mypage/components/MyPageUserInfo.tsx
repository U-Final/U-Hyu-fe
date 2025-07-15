import { useState } from 'react';
import {
  Pencil,
  User,
  AtSign,
  BadgeCheck,
  Calendar,
  Mail,
} from 'lucide-react';
import type { UserInfo } from '@mypage/types';

interface Props {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const MyPageUserInfo = ({ user, setUser }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const handleChange = (field: keyof UserInfo, value: string) => {
    setUser((prev) => ({
      ...prev,
      [field]: field === 'age' ? Number(value) : value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false);
    }
  };

  const fields: {
    key: keyof UserInfo;
    label: string;
    icon: React.ReactNode;
  }[] = [
    { key: 'name', label: '이름', icon: <User className="w-4 h-4 text-gray-500" /> },
    { key: 'nickname', label: '닉네임', icon: <BadgeCheck className="w-4 h-4 text-gray-500" /> },
    { key: 'gender', label: '성별', icon: <AtSign className="w-4 h-4 text-gray-500" /> },
    { key: 'age', label: '나이', icon: <Calendar className="w-4 h-4 text-gray-500" /> },
    { key: 'email', label: '이메일', icon: <Mail className="w-4 h-4 text-gray-500" /> },
  ];

  return (
    <div className="space-y-[0.75rem]">
      <div className="flex items-center justify-between">
        <span className="font-bold text-[1rem] text-black">나의 정보</span>
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-[0.25rem] px-[0.75rem] py-[0.25rem] text-[0.75rem] text-gray-500 border border-gray-300 rounded-[0.5rem] bg-[#F9FAFB]"
        >
          <Pencil className="w-[0.75rem] h-[0.75rem]" />
          {editMode ? '수정 중' : '개인정보 수정'}
        </button>
      </div>

      <div
        className={`rounded-[1rem] bg-white p-[1.25rem] text-[0.875rem] text-gray-700 transition-all duration-300 ${
          editMode ? 'border border-gray-300' : ''
        }`}
      >
        <div className="flex flex-col gap-[0.75rem]">
          {fields.map(({ key, label, icon }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-[0.5rem] text-gray-600">
                {icon}
                <span>{label}</span>
              </div>

              {editMode ? (
                key === 'gender' ? (
                  <div className="flex items-center gap-[0.5rem]">
                    <label className="flex items-center gap-[0.25rem] text-[0.875rem]">
                      <input
                        type="radio"
                        name="gender"
                        value="MALE"
                        checked={user.gender === 'MALE'}
                        onChange={() => handleChange('gender', 'MALE')}
                      />
                      남성
                    </label>
                    <label className="flex items-center gap-[0.25rem] text-[0.875rem]">
                      <input
                        type="radio"
                        name="gender"
                        value="FEMALE"
                        checked={user.gender === 'FEMALE'}
                        onChange={() => handleChange('gender', 'FEMALE')}
                      />
                      여성
                    </label>
                  </div>
                ) : (
                  <input
                    type={key === 'age' ? 'number' : 'text'}
                    value={user[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-[10rem] rounded-[0.5rem] border border-gray-300 px-[0.5rem] py-[0.25rem] text-[0.875rem] text-right"
                  />
                )
              ) : (
                <span className="min-h-[1.75rem] flex items-center justify-end">
                  {key === 'age'
                    ? `${user.age}세`
                    : key === 'gender'
                    ? user.gender === 'MALE'
                      ? '남성'
                      : '여성'
                    : user[key]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPageUserInfo;
