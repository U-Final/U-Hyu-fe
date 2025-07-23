import { useState } from 'react';

import type { UserInfo } from '@mypage/types/types';
import { AtSign, BadgeCheck, Calendar, Mail, Pencil, User } from 'lucide-react';

interface Props {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const MyPageUserInfo = ({ user, setUser }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const handleChange = <K extends keyof UserInfo>(field: K, value: string) => {
    setUser(prev => ({
      ...prev,
      [field]: field === 'age' ? Number(value) : value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false);
    }
  };

  type EditableUserFields =
    | 'userName'
    | 'nickName'
    | 'gender'
    | 'age'
    | 'email';

  const fields: {
    key: EditableUserFields;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: 'userName',
      label: '이름',
      icon: <User className="w-4 h-4 text-[var(--text-gray)]" />,
    },
    {
      key: 'nickName',
      label: '닉네임',
      icon: <BadgeCheck className="w-4 h-4 text-[var(--text-gray)]" />,
    },
    {
      key: 'gender',
      label: '성별',
      icon: <AtSign className="w-4 h-4 text-[var(--text-gray)]" />,
    },
    {
      key: 'age',
      label: '나이',
      icon: <Calendar className="w-4 h-4 text-[var(--text-gray)]" />,
    },
    {
      key: 'email',
      label: '이메일',
      icon: <Mail className="w-4 h-4 text-[var(--text-gray)]" />,
    },
  ];

  //검증 함수 (이메일 형식, 나이 제한)
  const validateField = (key: EditableUserFields, value: string): boolean => {
    switch (key) {
      case 'email': {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }
      case 'age': {
        const age = Number(value);
        return age > 0 && age < 150;
      }
      default: {
        return value.trim().length > 0;
      }
    }
  };

  return (
    <div className="space-y-[0.75rem]">
      <div className="flex items-center justify-between">
        <span className="font-bold text-[1rem] text-[var(--text-black)]">
          나의 정보
        </span>
        <button
          onClick={() => setEditMode(!editMode)}
          className="flex items-center gap-[0.25rem] px-[0.75rem] py-[0.25rem] text-[0.75rem] text-[var(--text-gray)] border border-gray-300 rounded-[0.5rem] bg-[var(--bg-light-gray)]"
        >
          <Pencil className="w-[0.75rem] h-[0.75rem]" />
          {editMode ? '수정 중' : '개인정보 수정'}
        </button>
      </div>

      <div className="rounded-[1rem] bg-white p-[1.25rem] text-[0.875rem] text-[var(--text-gray)] transition-all duration-300 border border-gray-200">
        <div className="flex flex-col gap-[0.75rem]">
          {fields.map(({ key, label, icon }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-[0.5rem] text-[var(--text-gray)]">
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
                    value={user[key] || (key === 'age' ? 0 : '')}
                    onChange={e => {
                      const value = e.target.value;
                      if (validateField(key, value)) {
                        handleChange(key, value); // 검증 통과한 값만 반영
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    className="w-[10rem] rounded-[0.5rem] border border-gray-300 px-[0.5rem] py-[0.25rem] text-[0.875rem] text-right"
                    required
                  />
                )
              ) : (
                <span className="min-h-[1.75rem] flex items-center justify-end">
                  {key === 'age'
                    ? `${user.age || 0}세`
                    : key === 'gender'
                      ? user.gender === 'MALE'
                        ? '남성'
                        : '여성'
                      : user[key] || '미설정'}
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
