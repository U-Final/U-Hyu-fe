import { useState } from 'react';
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { BrandListItem as BrandListItemType, AdminBrand } from '@admin/types';
import { useModalStore } from '@/shared/store';
import { useBrandDetailQuery } from '@admin/hooks';
import { BrandForm } from './BrandForm';
import { getBrandCategoryId } from '@admin/constants/brandCategoryMapping';
import { getBrandConfig } from '@admin/constants/brandConfigs';

interface BrandListItemProps {
  brand: BrandListItemType;
  onDelete: (brandId: number) => void;
}

export const BrandListItem = ({ brand, onDelete }: BrandListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);

  // 상세 정보는 확장 시에만 요청 (수정 시에도 필요)
  const { data: brandDetail, isLoading: isLoadingDetail, refetch } = useBrandDetailQuery(
    brand.brandId, 
    isExpanded || isEditing
  );

  const handleEdit = () => {
    // API 데이터 불일치 문제 경고
    const warningMessage = `⚠️ 주의: 현재 브랜드 수정 기능에 제한이 있습니다.

• GET 상세 조회 API에서 storeType과 benefitType 정보를 제공하지 않음
• 수정 시 brandConfigs의 기본 설정이 사용될 수 있음
• 실제 브랜드 설정과 다를 수 있습니다

계속 진행하시겠습니까?`;

    if (confirm(warningMessage)) {
      // 인라인 수정 모드로 전환
      setIsEditing(true);
      setIsExpanded(true); // 수정할 때는 항상 확장
    }
  };

  const handleEditSuccess = async () => {
    console.log('🔧 브랜드 수정 성공, UI 업데이트');
    setIsEditing(false);
    
    // 상세 정보 다시 로드
    if (refetch) {
      await refetch();
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
  };

  // BrandListItem과 BrandDetail을 조합해서 AdminBrand 생성
  const getAdminBrand = (): AdminBrand | null => {
    if (!brandDetail) return null;
    
    // 브랜드명으로 카테고리 ID 찾기
    const categoryId = getBrandCategoryId(brand.brandName);
    const brandConfig = getBrandConfig(brand.brandName);
    
    return {
      brandId: brand.brandId,
      brandName: brand.brandName,
      logoImage: brand.logoImage,
      description: brand.description,
      categoryId,
      usageLimit: brandDetail.usageLimit,
      usageMethod: brandDetail.usageMethod,
      storeType: brandConfig.storeType,
      data: brandDetail.benefitRes?.map(benefit => ({
        grade: benefit.grade as 'GOOD' | 'VIP' | 'VVIP',
        description: benefit.description,
        benefitType: brandConfig.benefitTypes[0] || 'DISCOUNT',
      })) || [],
    };
  };

  const handleDelete = () => {
    openModal('base', {
      title: '브랜드 삭제',
      children: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={brand.logoImage}
              alt={brand.brandName}
              className="w-12 h-12 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/brands/default-brand-logo.png';
              }}
            />
            <div>
              <h3 className="font-bold text-gray-900">{brand.brandName}</h3>
              <p className="text-sm text-gray-600">
                브랜드 ID: {brand.brandId}
              </p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">
              <strong>⚠️ 주의:</strong> 이 작업은 되돌릴 수 없습니다. 
              정말로 <strong>"{brand.brandName}"</strong> 브랜드를 삭제하시겠습니까?
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                onDelete(brand.brandId);
                closeModal();
              }}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              삭제하기
            </button>
            <button
              onClick={() => closeModal()}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      ),
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* 브랜드 기본 정보 */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* 브랜드 로고 */}
            <div className="w-14 h-14 flex-shrink-0">
              <img
                src={brand.logoImage}
                alt={brand.brandName}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/brands/default-brand-logo.png';
                }}
              />
            </div>

            {/* 브랜드 정보 */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {brand.brandName}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {brand.description}
              </p>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={handleEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="수정"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="삭제"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
            <button
              onClick={toggleExpanded}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              title={isExpanded ? "접기" : "상세보기"}
            >
              {isExpanded ? (
                <ChevronUpIcon className="w-5 h-5" />
              ) : (
                <ChevronDownIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 확장된 상세 정보 또는 수정 폼 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-200">
          {isEditing ? (
            // 수정 폼
            <div className="p-4 bg-blue-50">
              {isLoadingDetail ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">수정 정보를 불러오는 중...</p>
                </div>
              ) : (
                <BrandForm
                  brand={getAdminBrand()}
                  onSuccess={handleEditSuccess}
                  onCancel={handleEditCancel}
                />
              )}
            </div>
          ) : (
            // 상세 정보 보기
            <div className="p-4 bg-gray-50">
              {isLoadingDetail ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">상세 정보를 불러오는 중...</p>
                </div>
              ) : brandDetail ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">사용 제한</h4>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
                      {brandDetail.usageLimit}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">사용 방법</h4>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
                      {brandDetail.usageMethod}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">혜택 정보</h4>
                    <div className="space-y-2">
                      {brandDetail.benefitRes?.map((benefit, index) => (
                        <div key={index} className="text-sm text-gray-600 bg-white p-3 rounded-lg border">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-blue-600">{benefit.grade}</span>
                          </div>
                          <p className="mt-1">{benefit.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-red-500">상세 정보를 불러올 수 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 