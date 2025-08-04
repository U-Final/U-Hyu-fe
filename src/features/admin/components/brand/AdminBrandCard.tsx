import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from '@/shared/components/shadcn/ui/card';
import { Button } from '@/shared/components/shadcn/ui/button';
import type { AdminBrand } from '@admin/api/types';
import { ADMIN_CATEGORIES } from '@admin/constants/categories';
import { AdminBrandForm } from './AdminBrandForm';

interface AdminBrandCardProps {
  brand: AdminBrand;
  onEdit: (brand: AdminBrand) => void;
  onDelete: (brand: AdminBrand) => void;
  isEditing?: boolean;
  onCancelEdit?: () => void;
  onSuccessEdit?: () => void;
}

// 혜택 타입을 한글로 변환하는 함수
const getBenefitTypeLabel = (benefitType: string) => {
  switch (benefitType) {
    case 'DISCOUNT':
      return '할인';
    case 'GIFT':
      return '증정품';
    default:
      return benefitType;
  }
};

// 매장 타입을 한글로 변환하는 함수
const getStoreTypeLabel = (storeType: string) => {
  switch (storeType) {
    case 'ONLINE':
      return '온라인';
    case 'OFFLINE':
      return '오프라인';
    default:
      return storeType;
  }
};

// 매장 타입별 뱃지 스타일
const getStoreTypeBadgeStyle = (storeType: string) => {
  switch (storeType) {
    case 'ONLINE':
      return 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md animate-pulse';
    case 'OFFLINE':
      return 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-md animate-pulse';
    default:
      return 'bg-gray-600 text-white shadow-md animate-pulse';
  }
};

export function AdminBrandCard({ brand, onEdit, onDelete, isEditing, onCancelEdit, onSuccessEdit }: AdminBrandCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryName = (categoryId: number) => {
    const category = ADMIN_CATEGORIES.find(cat => cat.id === categoryId);
    return category?.name || '알 수 없음';
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* 기본 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
              <img 
                src={brand.brandImg} 
                alt={brand.brandName}
                className="w-full h-full object-contain border-2 border-gray-300 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/brands/default-brand-logo.png';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-5">
                <h3 className="font-semibold text-lg text-gray-900">{brand.brandName}</h3>
                <span 
                  className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${getStoreTypeBadgeStyle(brand.storeType)}`}
                >
                  {getStoreTypeLabel(brand.storeType)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{getCategoryName(brand.categoryId)}</p>
              <div className="flex items-center gap-4 mt-1">
                <span className="text-xs text-gray-500">사용 제한: {brand.usageLimit}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-8 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(brand)}
              className="text-blue-600 hover:text-blue-700"
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(brand)}
              className="text-red-600 hover:text-red-700"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="text-gray-600 hover:text-gray-700"
            >
              {isExpanded ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* 확장된 상세 정보 */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">사용 방법</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {brand.usageMethod}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">브랜드 정보</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>브랜드 ID:</span>
                    <span className="font-medium">{brand.brandId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>카테고리:</span>
                    <span className="font-medium">{getCategoryName(brand.categoryId)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>매장 타입:</span>
                    <span className="font-medium">{getStoreTypeLabel(brand.storeType)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 혜택 정보 */}
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-3">혜택 상세</h4>
              <div className="space-y-3">
                {brand.data.map((benefit, index) => (
                  <div key={index} className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-900">{benefit.grade}</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {getBenefitTypeLabel(benefit.benefitType)}
                      </span>
                    </div>
                    <p className="text-sm text-blue-800">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 수정 폼 */}
        {isEditing && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <AdminBrandForm
              editingBrand={brand}
              onCancel={onCancelEdit || (() => {})}
              onSuccess={onSuccessEdit || (() => {})}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
} 