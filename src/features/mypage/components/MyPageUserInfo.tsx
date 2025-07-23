import { useState } from 'react';

import { useUpdateUserInfo } from '@/features/user';
import type { UserInfo } from '@mypage/types/types';
import { AtSign, BadgeCheck, Calendar, Mail, Pencil, User } from 'lucide-react';

interface Props {
  user: UserInfo;
}

const MyPageUserInfo = ({ user }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nickname: user.nickName || '',
    age: user.age || 0,
    email: user.email,
  });

  const updateUserMutation = useUpdateUserInfo();

  const handleChange = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserMutation.mutateAsync(formData);
      setEditMode(false);
      // 성공 시 알림이나 추가 처리
    } catch (error) {
      console.error('사용자 정보 수정 실패:', error);
      alert('사용자 정보 수정에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    // 원래 값으로 되돌리기
    setFormData({
      nickname: user.nickName || '',
      age: user.age || 0,
      email: user.email,
    });
    setEditMode(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const fields: {
    key: keyof UserInfo;
    formKey?: keyof typeof formData;
    label: string;
    icon: React.ReactNode;
    editable: boolean;
    type?: string;
  }[] = [
    {
      key: 'userName',
      label: '이름',
      icon: <User className="w-4 h-4 text-[var(--text-gray)]" />,
      editable: false,
    },
    {
      key: 'nickName',
      formKey: 'nickname',
      label: '닉네임',
      icon: <BadgeCheck className="w-4 h-4 text-[var(--text-gray)]" />,
      editable: true,
      type: 'text',
    },
    {
      key: 'gender',
      label: '성별',
      icon: <AtSign className="w-4 h-4 text-[var(--text-gray)]" />,
      editable: false,
    },
    {
      key: 'age',
      formKey: 'age',
      label: '나이',
      icon: <Calendar className="w-4 h-4 text-[var(--text-gray)]" />,
      editable: true,
      type: 'number',
    },
    {
      key: 'email',
      formKey: 'email',
      label: '이메일',
      icon: <Mail className="w-4 h-4 text-[var(--text-gray)]" />,
      editable: true,
      type: 'email',
    },
  ];

  const displayValue = (
    key: keyof UserInfo,
    value: UserInfo[keyof UserInfo]
  ) => {
    switch (key) {
      case 'age':
        return value ? `${value}세` : '미설정';
      case 'gender':
        return value === 'MALE'
          ? '남성'
          : value === 'FEMALE'
            ? '여성'
            : '미설정';
      case 'nickName':
        return value || '미설정';
      default:
        return value || '미설정';
    }
  };

  return (
    <div className="space-y-[0.75rem]">
      <div className="flex items-center justify-between">
        <span className="font-bold text-[1rem] text-[var(--text-black)]">
          나의 정보
        </span>
        <div className="flex items-center gap-[0.5rem]">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                disabled={updateUserMutation.isPending}
                className="flex items-center gap-[0.25rem] px-[0.75rem] py-[0.25rem] text-[0.75rem] text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 rounded-[0.5rem] transition-colors"
              >
                {updateUserMutation.isPending ? '저장 중...' : '저장'}
              </button>
              <button
                onClick={handleCancel}
                disabled={updateUserMutation.isPending}
                className="flex items-center gap-[0.25rem] px-[0.75rem] py-[0.25rem] text-[0.75rem] text-[var(--text-gray)] border border-gray-300 rounded-[0.5rem] bg-white hover:bg-gray-50 disabled:bg-gray-100 transition-colors"
              >
                취소
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-[0.25rem] px-[0.75rem] py-[0.25rem] text-[0.75rem] text-[var(--text-gray)] border border-gray-300 rounded-[0.5rem] bg-[var(--bg-light-gray)] hover:bg-gray-100 transition-colors"
            >
              <Pencil className="w-[0.75rem] h-[0.75rem]" />
              개인정보 수정
            </button>
          )}
        </div>
      </div>

      <div className="rounded-[1rem] bg-white p-[1.25rem] text-[0.875rem] text-[var(--text-gray)] transition-all duration-300 border border-gray-200">
        <div className="flex flex-col gap-[0.75rem]">
          {fields.map(
            ({ key, formKey, label, icon, editable, type = 'text' }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-[0.5rem] text-[var(--text-gray)]">
                  {icon}
                  <span>{label}</span>
                </div>

                {editMode && editable && formKey ? (
                  <input
                    type={type}
                    value={formData[formKey]}
                    onChange={e => {
                      const value =
                        type === 'number'
                          ? Number(e.target.value)
                          : e.target.value;
                      handleChange(formKey, value);
                    }}
                    onKeyDown={handleKeyDown}
                    className="w-[10rem] rounded-[0.5rem] border border-gray-300 px-[0.5rem] py-[0.25rem] text-[0.875rem] text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={label}
                    min={type === 'number' ? 1 : undefined}
                    max={type === 'number' ? 150 : undefined}
                    required
                  />
                ) : (
                  <span className="min-h-[1.75rem] flex items-center justify-end">
                    {displayValue(key, user[key])}
                  </span>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPageUserInfo;
