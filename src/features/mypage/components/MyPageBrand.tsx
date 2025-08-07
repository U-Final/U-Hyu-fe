import type { UpdateUserRequest, UserInfoData } from '@mypage/api/types';
import { useQuery } from '@tanstack/react-query';

import { ApiBrandGrid } from '@/shared/components/brand_grid/ApiBrandGrid';
import { getInterestBrands } from '@/shared/components/brand_grid/api/brandApi';

interface Props {
  user: UserInfoData;
  isEditMode: boolean;
  pendingChanges: UpdateUserRequest;
  setPendingChanges: React.Dispatch<React.SetStateAction<UpdateUserRequest>>;
}

const MyPageBrand = ({
  user,
  isEditMode,
  pendingChanges,
  setPendingChanges,
}: Props) => {
  const { data: apiBrands } = useQuery({
    queryKey: ['interest-brands'],
    queryFn: getInterestBrands,
  });

  const handleBrandToggle = (brandId: number) => {
    if (!isEditMode) return;

    const currentBrandIds =
      pendingChanges.updatedBrandIdList || user.interestedBrandList || [];
    const newBrandIds = currentBrandIds.includes(brandId)
      ? currentBrandIds.filter(id => id !== brandId)
      : [...currentBrandIds, brandId];

    setPendingChanges(prev => ({
      ...prev,
      updatedBrandIdList: newBrandIds,
    }));
  };

  const currentBrandIds = (() => {
    const userSelectedIds =
      pendingChanges.updatedBrandIdList || user.interestedBrandList || [];

    if (!apiBrands) return userSelectedIds;

    return userSelectedIds.filter(id =>
      apiBrands.some(apiBrand => apiBrand.brandId === id)
    );
  })();

  return (
    <div className="space-y-[1rem]">
      <h3 className="font-bold text-[1rem] text-black">관심 브랜드</h3>
      <div className="p-[1rem] bg-white rounded-[0.75rem] border border-gray">
        <ApiBrandGrid
          selectedBrands={currentBrandIds}
          onBrandToggle={handleBrandToggle}
          title="관심있는 브랜드를 선택해주세요"
          disabled={!isEditMode}
        />
        {!isEditMode && (
          <p className="text-[0.75rem] text-gray text-center mt-[0.5rem]">
            수정 모드에서 브랜드를 선택할 수 있습니다
          </p>
        )}
      </div>
    </div>
  );
};

export default MyPageBrand;
