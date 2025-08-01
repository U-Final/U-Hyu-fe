import { useEffect, useState } from 'react';

import type { UserInfoData, UpdateUserRequest } from '@mypage/api/types';
import { BadgeCheck, Pencil } from 'lucide-react';

interface Props {
  user: UserInfoData;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setPendingChanges: React.Dispatch<React.SetStateAction<UpdateUserRequest>>;
  onSaveAll: () => Promise<void>;
}

const MyPageUserInfo = ({ 
  user, 
  editMode, 
  setEditMode, 
  setPendingChanges, 
  onSaveAll 
}: Props) => {
  const [localEdit, setLocalEdit] = useState(user);

  useEffect(() => {
    setLocalEdit(user);
  }, [user]);

  const handleChange = <K extends keyof UserInfoData>(
    field: K,
    value: string | number | null
  ) => {
    setLocalEdit((prev: UserInfoData) => ({
      ...prev,
      [field]: field === 'age' ? (value === '' ? null : Number(value)) : value,
    }));

    // pendingChanges에 추가
    if (field === 'nickName') {
      setPendingChanges(prev => ({
        ...prev,
        updatedNickName: value as string || '',
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (editMode) onSaveAll();
    }
  };

  const handleSave = async () => {
    // 저장 전 검증
    const validationErrors: string[] = [];

    if (localEdit.nickName && !validateField('nickName', localEdit.nickName)) {
      validationErrors.push('닉네임을 입력해주세요.');
    }

    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n'));
      return;
    }

    await onSaveAll();
  };

  type EditableUserFields = 'nickName';

  const fields: {
    key: keyof UserInfoData;
    label: string;
    icon: React.ReactNode;
    editable: boolean;
  }[] = [
    {
      key: 'nickName',
      label: '닉네임',
      icon: <BadgeCheck className="w-4 h-4 text-gray" />,
      editable: true,
    },
  ];

  const validateField = (key: EditableUserFields, value: string): boolean => {
    switch (key) {
      case 'nickName':
        return value.length >= 1;
      default:
        return true;
    }
  };

  return (
    <div className="space-y-[1rem]">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[1rem] text-black">
          개인정보
        </h3>
        <button
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
          className="flex items-center gap-[0.25rem] text-[0.875rem] text-primary"
        >
          <Pencil className="w-4 h-4" />
          {editMode ? '저장' : '수정'}
        </button>
      </div>

      <div className="space-y-[0.75rem]">
        {fields.map(({ key, label, icon, editable }) => {
          const isEditable = editMode && editable;
          const value = localEdit[key];

          return (
            <div
              key={key}
              className="flex items-center justify-between p-[1rem] bg-white rounded-[0.75rem] border border-gray"
            >
              <div className="flex items-center gap-[0.75rem]">
                {icon}
                <span className="text-[0.875rem] text-gray">
                  {label}
                </span>
              </div>
              <div className="flex items-center gap-[0.5rem]">
                {isEditable ? (
                  <input
                    type="text"
                    value={String(value || '')}
                    onChange={(e) => handleChange(key, e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="text-right text-[0.875rem] text-black bg-transparent border-none outline-none"
                    placeholder="닉네임을 입력하세요"
                  />
                ) : (
                  <span className="text-[0.875rem] text-black">
                    {key === 'gender'
                      ? value === 'MALE'
                        ? '남성'
                        : value === 'FEMALE'
                        ? '여성'
                        : '미설정'
                      : value || '미설정'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPageUserInfo;
