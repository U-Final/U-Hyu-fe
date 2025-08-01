import type { UserInfoData, UpdateUserRequest } from '@mypage/api/types';
import { BrandGrid } from '@/shared/components/brand_grid/BrandGrid';

interface Props {
  user: UserInfoData;
  editMode: boolean;
  pendingChanges: UpdateUserRequest;
  setPendingChanges: React.Dispatch<React.SetStateAction<UpdateUserRequest>>;
}

const MyPageBrand = ({ user, editMode, pendingChanges, setPendingChanges }: Props) => {
  const handleBrandToggle = (brandId: number) => {
    if (!editMode) return;

    // 현재 선택된 브랜드 ID 목록 (pendingChanges 우선, 없으면 user.interestedBrandList)
    const currentBrandIds = pendingChanges.updatedBrandIdList || user.interestedBrandList || [];
    const newBrandIds = currentBrandIds.includes(brandId)
      ? currentBrandIds.filter(id => id !== brandId)
      : [...currentBrandIds, brandId];

    // pendingChanges에 추가
    setPendingChanges(prev => ({
      ...prev,
      updatedBrandIdList: newBrandIds,
    }));
  };

  // 현재 선택된 브랜드 (pendingChanges 우선, 없으면 user.interestedBrandList)
  const currentBrandIds = pendingChanges.updatedBrandIdList || user.interestedBrandList || [];

  return (
    <div className="space-y-[1rem]">
      <h3 className="font-bold text-[1rem] text-black">
        관심 브랜드
      </h3>
      <div className="p-[1rem] bg-white rounded-[0.75rem] border border-gray">
        <BrandGrid
          selectedBrands={currentBrandIds}
          onBrandToggle={handleBrandToggle}
          title="관심있는 브랜드를 선택해주세요"
          disabled={!editMode}
        />
        {!editMode && (
          <p className="text-[0.75rem] text-gray text-center mt-[0.5rem]">
            수정 모드에서 브랜드를 선택할 수 있습니다
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPageBrand;
