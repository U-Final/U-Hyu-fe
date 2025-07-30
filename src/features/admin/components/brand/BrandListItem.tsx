import { useState } from 'react';
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { AdminBrand } from '@admin/api/types';
import { useModalStore } from '@/shared/store';
import { BrandForm } from './BrandForm';

interface BrandListItemProps {
  brand: AdminBrand;
  onEdit: (brand: AdminBrand) => void;
  onDelete: (brandId: number) => void;
}

export const BrandListItem = ({ brand, onEdit, onDelete }: BrandListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);

  const handleEdit = () => {
    setIsEditing(true);
    setIsExpanded(true);
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    setIsExpanded(false);
    onEdit(brand);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setIsExpanded(false);
  };

  const handleDelete = () => {
    openModal('base', {
      title: '브랜드 삭제',
      children: (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={brand.brandImg}
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
    if (!isEditing) {
      setIsExpanded(!isExpanded);
    }
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
                src={brand.brandImg}
                alt={brand.brandName}
                className="w-full h-full object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/brands/default-brand-logo.png';
                }}
              />
            </div>

            {/* 브랜드 정보 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {brand.brandName}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <p className="truncate">
                  <span className="font-medium">사용 제한:</span> {brand.usageLimit}
                </p>
                <p className="truncate">
                  <span className="font-medium">혜택:</span> {brand.data.length}개
                </p>
              </div>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="수정"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleDelete}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="삭제"
            >
              <TrashIcon className="w-5 h-5" />
            </button>

            <button
              onClick={toggleExpanded}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title={isExpanded ? '접기' : '자세히 보기'}
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

      {/* 확장 영역 - 애니메이션 */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-200">
          {isEditing ? (
            /* 수정 폼 */
            <div className="p-4">
              <BrandForm
                brand={brand}
                onSuccess={handleEditSuccess}
                onCancel={handleEditCancel}
              />
            </div>
          ) : (
            /* 상세 정보 */
            <div className="p-4 space-y-4">
              {/* 사용 방법 */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">사용 방법</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {brand.usageMethod}
                </p>
              </div>

              {/* 혜택 목록 */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  혜택 목록 ({brand.data.length}개)
                </h4>
                <div className="space-y-2">
                  {brand.data.map((benefit, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {benefit.grade}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full font-medium ${
                                benefit.benefitType === 'DISCOUNT'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-purple-100 text-purple-800'
                              }`}
                            >
                              {benefit.benefitType === 'DISCOUNT' ? '할인' : '기프트'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 