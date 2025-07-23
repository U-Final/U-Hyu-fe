import { useEffect, useState } from 'react';

import { userApi } from '@/features/user';
import type { UserInfo } from '@mypage/types/types';
import { AtSign, BadgeCheck, Calendar, Mail, Pencil, User } from 'lucide-react';

interface Props {
  user: UserInfo;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
}

const MyPageUserInfo = ({ user, setUser }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [localEdit, setLocalEdit] = useState(user);

  useEffect(() => {
    setLocalEdit(user);
  }, [user]);

  const handleChange = <K extends keyof UserInfo>(
    field: K,
    value: string | number
  ) => {
    setLocalEdit((prev: UserInfo) => ({
      ...prev,
      [field]: field === 'age' ? Number(value) : value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (editMode) handleSave();
    }
  };

  const handleSave = async () => {
    // 저장 전 검증
    const validationErrors: string[] = [];

    if (localEdit.nickName && !validateField('nickName', localEdit.nickName)) {
      validationErrors.push('닉네임을 입력해주세요.');
    }
    if (localEdit.email && !validateField('email', localEdit.email)) {
      validationErrors.push('올바른 이메일 형식을 입력해주세요.');
    }
    if (localEdit.age && !validateField('age', String(localEdit.age))) {
      validationErrors.push('나이는 1~149 사이의 숫자를 입력해주세요.');
    }

    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n'));
      return;
    }

    try {
      await userApi.updateUserInfo({
        nickname: localEdit.nickName || '',
        age: localEdit.age || 0,
        email: localEdit.email,
      });
      setUser(prev =>
        prev
          ? {
              ...prev,
              nickName: localEdit.nickName,
              age: localEdit.age,
              email: localEdit.email,
            }
          : prev
      );
      setEditMode(false);
      console.log('개인정보 PATCH 요청 성공');
    } catch (err) {
      alert('개인정보 수정 실패');
      console.error(err);
    }
  };

  type EditableUserFields =
    | 'userName'
    | 'nickName'
    | 'gender'
    | 'age'
    | 'email';

  // 실제로 수정 가능한 필드들 (성별은 disabled로 표시만)
  const editableFields: EditableUserFields[] = ['nickName', 'age', 'email'];

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
          onClick={() => {
            if (editMode) handleSave();
            else setEditMode(true);
          }}
          className="flex items-center gap-[0.25rem] px-[0.75rem] py-[0.25rem] text-[0.75rem] text-[var(--text-gray)] border border-gray-300 rounded-[0.5rem] bg-[var(--bg-light-gray)]"
        >
          <Pencil className="w-[0.75rem] h-[0.75rem]" />
          {editMode ? '저장' : '개인정보 수정'}
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
                        disabled
                      />
                      남성
                    </label>
                    <label className="flex items-center gap-[0.25rem] text-[0.875rem]">
                      <input
                        type="radio"
                        name="gender"
                        value="FEMALE"
                        checked={user.gender === 'FEMALE'}
                        disabled
                      />
                      여성
                    </label>
                  </div>
                ) : editableFields.includes(key) ? (
                  <input
                    type={key === 'age' ? 'number' : 'text'}
                    value={localEdit[key] || ''}
                    onChange={e => handleChange(key, e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-[10rem] rounded-[0.5rem] border border-gray-300 px-[0.5rem] py-[0.25rem] text-[0.875rem] text-right"
                  />
                ) : (
                  <span className="min-h-[1.75rem] flex items-center justify-end">
                    {key === 'userName' ? user.userName : user[key] || '미설정'}
                  </span>
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
