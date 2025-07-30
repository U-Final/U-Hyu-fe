import { useState } from 'react';

import { useAdminBrandsQuery } from '@admin/hooks';
import { useModalStore } from '@/shared/store';

import { AdminBrandForm } from './AdminBrandForm';
import type { BrandBenefit } from '@admin/api/types';

interface AdminBrandModalProps {
  brandId?: number;
}

export const AdminBrandModal = ({ brandId }: AdminBrandModalProps) => {
  const closeModal = useModalStore(state => state.closeModal);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: brands, isLoading, error } = useAdminBrandsQuery(true);
  const brand = brands?.find(b => b.brandId === brandId);

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
        <AdminBrandForm onSuccess={handleClose} />
      </div>
    );
  }

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  // 에러
  if (error || !brand) {
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

  // 편집 모드
  if (isEditing) {
    return (
      <div className="space-y-4">
        <AdminBrandForm brand={brand} onSuccess={handleClose} />
      </div>
    );
  }

  // 상세보기 모드
  return (
    <div className="space-y-4">
      {/* 브랜드 기본 정보 */}
      <div className="flex items-center gap-4">
        <img
          src={brand.brandImg}
          alt={brand.brandName}
          className="w-16 h-16 object-cover rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/brands/default-brand-logo.png';
          }}
        />
        <div>
          <h3 className="text-lg font-bold text-black">{brand.brandName}</h3>
        </div>
      </div>

      {/* 브랜드 상세 정보 */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700">브랜드 이미지 URL</label>
          <p className="text-sm text-gray-600 break-all">{brand.brandImg}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">사용 제한</label>
          <p className="text-sm text-gray-600">{brand.usageLimit}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">사용 방법</label>
          <p className="text-sm text-gray-600">{brand.usageMethod}</p>
        </div>

      </div>

      {/* 혜택 목록 */}
      <div>
        <label className="text-sm font-medium text-gray-700">혜택 목록</label>
        <div className="mt-2 space-y-2">
          {brand.data.map((benefit: BrandBenefit, index: number) => (
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
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    benefit.benefitType === 'DISCOUNT'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {benefit.benefitType === 'DISCOUNT' ? '할인' : '기프트'}
                </span>
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