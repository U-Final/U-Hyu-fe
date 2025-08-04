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
  // API에서 브랜드 목록 가져오기
  const { data: apiBrands } = useQuery({
    queryKey: ['interest-brands'],
    queryFn: getInterestBrands,
  });

  const handleBrandToggle = (brandId: number) => {
    if (!isEditMode) return;

    // 현재 선택된 브랜드 ID 목록 (pendingChanges 우선, 없으면 user.interestedBrandList)
    const currentBrandIds =
      pendingChanges.updatedBrandIdList || user.interestedBrandList || [];
    const newBrandIds = currentBrandIds.includes(brandId)
      ? currentBrandIds.filter(id => id !== brandId)
      : [...currentBrandIds, brandId];

    // pendingChanges에 추가
    setPendingChanges(prev => ({
      ...prev,
      updatedBrandIdList: newBrandIds,
    }));
  };

  // API 브랜드 ID로 매핑된 현재 선택된 브랜드 ID 목록
  const currentBrandIds = (() => {
    const userSelectedIds =
      pendingChanges.updatedBrandIdList || user.interestedBrandList || [];

    // API 브랜드가 로드되지 않았으면 원본 ID 사용
    if (!apiBrands) return userSelectedIds;

    // API 브랜드 ID와 매핑
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
