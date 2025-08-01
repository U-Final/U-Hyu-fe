import { useState } from 'react';

import { useAdminBrandsQuery, useBrandDetailQuery } from '@admin/hooks';
import { useModalStore } from '@/shared/store';

import { AdminBrandForm } from './AdminBrandForm';

interface AdminBrandModalProps {
  brandId?: number;
}

export const AdminBrandModal = ({ brandId }: AdminBrandModalProps) => {
  const closeModal = useModalStore(state => state.closeModal);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: brands, isLoading: isLoadingBrands, error: brandsError } = useAdminBrandsQuery(true);
  const brandListItem = brands?.find(b => b.brandId === brandId);
  
  // 브랜드 상세 정보 별도 요청
  const { data: brandDetail, isLoading: isLoadingDetail, error: detailError } = useBrandDetailQuery(
    brandId ?? 0, 
    !!brandId
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (confirm('정말로 이 브랜드를 삭제하시겠습니까?')) {
      setIsDeleting(true);
    }
  };

  const handleClose = () => {
    closeModal();
  };

  // 브랜드 추가 모드
  if (!brandId) {
    return (
      <div className="space-y-4">
        <AdminBrandForm brand={null} onSuccess={handleClose} />
      </div>
    );
  }

  // 로딩 중
  if (isLoadingBrands || isLoadingDetail) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  // 에러
  if (brandsError || detailError || !brandListItem || !brandDetail) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-red-500">
        <p>브랜드 정보를 불러오는데 실패했습니다.</p>
        <button
          onClick={handleClose}
          className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
        >
          닫기
        </button>
      </div>
    );
  }

  // 편집 모드 - AdminBrandForm은 별도로 처리 필요
  if (isEditing) {
    return (
      <div className="space-y-4">
        <p className="text-gray-500">수정 기능은 별도 모달에서 처리됩니다.</p>
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
        >
          돌아가기
        </button>
      </div>
    );
  }

  // 상세보기 모드
  return (
    <div className="space-y-4">
      {/* 브랜드 기본 정보 */}
      <div className="flex items-center gap-4">
        <img
          src={brandListItem.logoImage}
          alt={brandListItem.brandName}
          className="w-16 h-16 object-cover rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/brands/default-brand-logo.png';
          }}
        />
        <div>
          <h3 className="text-lg font-bold text-black">{brandListItem.brandName}</h3>
        </div>
      </div>

      {/* 브랜드 상세 정보 */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700">브랜드 이미지 URL</label>
          <p className="text-sm text-gray-600 break-all">{brandListItem.logoImage}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">사용 제한</label>
          <p className="text-sm text-gray-600">{brandDetail.usageLimit}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">사용 방법</label>
          <p className="text-sm text-gray-600">{brandDetail.usageMethod}</p>
        </div>
      </div>

      {/* 혜택 목록 */}
      <div>
        <label className="text-sm font-medium text-gray-700">혜택 목록</label>
        <div className="mt-2 space-y-2">
          {brandDetail.benefitRes.map((benefit, index: number) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    {benefit.grade}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          onClick={handleEdit}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {isDeleting ? '삭제 중...' : '삭제'}
        </button>
        <button
          onClick={handleClose}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
}; 