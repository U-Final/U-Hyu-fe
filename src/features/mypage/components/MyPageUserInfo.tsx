import { useState, useEffect } from 'react';
import {
  Pencil,
  User,
  AtSign,
  BadgeCheck,
  Calendar,
  Mail,
} from 'lucide-react';
import type { UserInfo } from '@features/mypage/api/types';
import { updateUserInfo } from '@features/mypage/api/mypageApi';

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
    value: string
  ) => {
    setLocalEdit((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (editMode) handleSave();
    }
  };

  const handleSave = async () => {
    try {
      await updateUserInfo({
        updatedNickName: localEdit.nickname,
        updatedAge: localEdit.age,
        //나중에 이메일까지는 추가할 예정
      });
      setUser((prev) => prev ? { ...prev, nickname: localEdit.nickname, age: localEdit.age } : prev);
      setEditMode(false);
      console.log('개인정보 PATCH 요청 성공:', localEdit.nickname, localEdit.age);
    } catch (err) {
      alert('개인정보 수정 실패');
      console.error(err);
    }
  };

type EditableUserFields = 'userName' | 'nickname' | 'gender' | 'age' | 'email';

const fields: {
  key: EditableUserFields;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: 'userName', label: '이름', icon: <User className="w-4 h-4 text-[var(--text-gray)]" /> },
  { key: 'nickname', label: '닉네임', icon: <BadgeCheck className="w-4 h-4 text-[var(--text-gray)]" /> },
  { key: 'gender', label: '성별', icon: <AtSign className="w-4 h-4 text-[var(--text-gray)]" /> },
  { key: 'age', label: '나이', icon: <Calendar className="w-4 h-4 text-[var(--text-gray)]" /> },
  { key: 'email', label: '이메일', icon: <Mail className="w-4 h-4 text-[var(--text-gray)]" /> },
];

const editableFields: EditableUserFields[] = ['nickname', 'age'];


  return (
    <div className="space-y-[0.75rem]">
      <div className="flex items-center justify-between">
        <span className="font-bold text-[1rem] text-[var(--text-black)]">나의 정보</span>
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

      <div
        className="rounded-[1rem] bg-white p-[1.25rem] text-[0.875rem] text-[var(--text-gray)] transition-all duration-300 border border-gray-200"
      >
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
                    value={localEdit[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-[10rem] rounded-[0.5rem] border border-gray-300 px-[0.5rem] py-[0.25rem] text-[0.875rem] text-right"
                  />
                ) : (
                  <input
                    type="text"
                    value={user[key]}
                    readOnly
                    disabled
                    className="w-[10rem] rounded-[0.5rem] border border-gray-200 px-[0.5rem] py-[0.25rem] text-[0.875rem] text-right bg-gray-100 cursor-not-allowed"
                  />
                )
              ) : (
                <span>{user[key]}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPageUserInfo;
