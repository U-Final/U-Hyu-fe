import type {
  UpdateUserRequest,
  UserGrade,
  UserInfoData,
} from '@mypage/api/types';
import { convertGrade } from '@mypage/constants/gradeUtils';
import { Crown, Star, User2 } from 'lucide-react';

interface Props {
  user: UserInfoData;
  isEditMode: boolean;
  pendingChanges: UpdateUserRequest;
  setPendingChanges: React.Dispatch<React.SetStateAction<UpdateUserRequest>>;
}

const MyPageMembership = ({
  user,
  isEditMode,
  pendingChanges,
  setPendingChanges,
}: Props) => {
  const handleGradeChange = (grade: UserGrade) => {
    if (!isEditMode) return;

    // pendingChanges에 추가
    setPendingChanges(prev => ({
      ...prev,
      updatedGrade: grade,
    }));
  };

  const gradeOptions: {
    grade: UserGrade;
    icon: React.ReactNode;
    label: string;
  }[] = [
    { grade: 'VVIP', icon: <Crown className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'VVIP' },
    { grade: 'VIP', icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />, label: 'VIP' },
    { grade: 'GOOD', icon: <User2 className="w-4 h-4 sm:w-5 sm:h-5" />, label: '우수' },
  ];

  // 현재 선택된 등급 (pendingChanges 우선, 없으면 user.grade)
  const currentGrade = pendingChanges.updatedGrade || user.grade;

  return (
    <div className="space-y-[1rem]">
      <h3 className="font-bold text-[1rem] text-black">멤버십 등급</h3>
      <div className="p-[1rem] bg-white rounded-[0.75rem] border border-gray">
        <div className="flex items-center justify-between mb-[1rem]">
          <span className="text-[0.875rem] text-gray">현재 등급</span>
          <span className="text-[0.875rem] font-bold text-black">
            {currentGrade ? convertGrade(currentGrade) : '등급 없음'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-[0.5rem]">
          {gradeOptions.map(({ grade, icon, label }) => (
            <button
              key={grade}
              onClick={() => handleGradeChange(grade)}
              disabled={!isEditMode || currentGrade === grade}
              className={`flex flex-col items-center justify-center gap-[0.25rem] p-[0.5rem] sm:p-[0.75rem] rounded-[0.5rem] text-[0.75rem] sm:text-[0.875rem] font-medium transition-all min-h-[3rem] sm:min-h-[4rem] ${
                currentGrade === grade
                  ? 'bg-primary text-white shadow-md'
                  : isEditMode
                    ? 'bg-light-gray text-gray hover:bg-gray-hover hover:scale-105'
                    : 'bg-light-gray text-gray opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex flex-col items-center gap-[0.25rem]">
                {icon}
                <span className="text-center whitespace-nowrap">{label}</span>
              </div>
            </button>
          ))}
        </div>
        {!isEditMode && (
          <p className="text-[0.75rem] text-gray text-center mt-[0.5rem]">
            수정 모드에서 등급을 변경할 수 있습니다
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPageMembership;
