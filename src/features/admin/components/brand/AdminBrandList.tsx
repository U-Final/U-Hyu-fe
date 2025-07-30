

import { useAdminBrandsQuery } from '@admin/hooks';
import { useModalStore } from '@/shared/store';
import { BrandListSkeleton } from '@admin/components/common';

import { AdminBrandCard } from './AdminBrandCard';
import { AdminBrandModal } from './AdminBrandModal';

export const AdminBrandList = () => {
  const { data: brands, isLoading, error } = useAdminBrandsQuery();
  const openModal = useModalStore(state => state.openModal);
  const brandList = brands || [];

  const handleBrandClick = (brandId: number) => {
    openModal('base', {
      title: '브랜드 상세정보',
      children: <AdminBrandModal brandId={brandId} />,
    });
  };

  const handleAddBrand = () => {
    openModal('base', {
      title: '브랜드 추가',
      children: <AdminBrandModal />,
    });
  };

  if (isLoading) {
    return <BrandListSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-red-500">브랜드 목록을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-black">브랜드 관리</h2>
        <button
          onClick={handleAddBrand}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          브랜드 추가
        </button>
      </div>

      {/* 브랜드 목록 */}
      <div className="space-y-3">
        {brandList?.map(brand => (
          <AdminBrandCard
            key={brand.brandId}
            brand={brand}
            onClick={() => handleBrandClick(brand.brandId)}
          />
        ))}
      </div>

      {/* 빈 상태 */}
      {brandList?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <p>등록된 브랜드가 없습니다.</p>
          <p className="text-sm">브랜드 추가 버튼을 클릭하여 새로운 브랜드를 등록해주세요.</p>
        </div>
      )}
    </div>
  );
}; 