import { useState, useEffect } from 'react';

import {
  useCreateAdminBrandMutation,
  useUpdateAdminBrandMutation,
  useDeleteAdminBrandMutation,
} from '@admin/hooks';
import { useAdminCategoriesQuery } from '@admin/hooks/useAdminStatsQuery';
import type { AdminBrand, BrandBenefit } from '@admin/api/types';
import type { CreateBrandRequest, UpdateBrandRequest } from '@admin/api/adminApi';

interface AdminBrandFormProps {
  brand?: AdminBrand;
  onSuccess: () => void;
}

export const AdminBrandForm = ({ brand, onSuccess }: AdminBrandFormProps) => {
  const [formData, setFormData] = useState<CreateBrandRequest>({
    brandName: '',
    brandImg: '',
    data: [],
    categoryId: 1,
    usageLimit: '',
    usageMethod: '',
    storeType: 'OFFLINE',
  });

  const createMutation = useCreateAdminBrandMutation();
  const updateMutation = useUpdateAdminBrandMutation();
  const deleteMutation = useDeleteAdminBrandMutation();
  const { data: categories } = useAdminCategoriesQuery();
  const categoryList = categories || [];

  // 기존 브랜드 데이터로 폼 초기화
  useEffect(() => {
    if (brand) {
      setFormData({
        brandName: brand.brandName,
        brandImg: brand.brandImg,
        data: brand.data,
        categoryId: brand.categoryId,
        usageLimit: brand.usageLimit,
        usageMethod: brand.usageMethod,
        storeType: brand.storeType,
      });
    }
  }, [brand]);

  const handleInputChange = (field: keyof CreateBrandRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBenefitChange = (index: number, field: keyof BrandBenefit, value: string) => {
    setFormData(prev => ({
      ...prev,
      data: prev.data.map((benefit, i) =>
        i === index ? { ...benefit, [field]: value } : benefit
      ),
    }));
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      data: [
        ...prev.data,
        {
          grade: '',
          description: '',
          benefitType: 'DISCOUNT',
        },
      ],
    }));
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      data: prev.data.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.brandName.trim()) {
      alert('브랜드명을 입력해주세요.');
      return;
    }
    if (!formData.brandImg.trim()) {
      alert('브랜드 이미지 URL을 입력해주세요.');
      return;
    }
    if (formData.data.length === 0) {
      alert('최소 하나의 혜택을 추가해주세요.');
      return;
    }

    try {
      if (brand) {
        // 수정
        await updateMutation.mutateAsync({
          brandId: brand.brandId,
          data: formData as UpdateBrandRequest,
        });
      } else {
        // 생성
        await createMutation.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('브랜드 저장 실패:', error);
    }
  };

  const handleDelete = async () => {
    if (!brand) return;

    try {
      await deleteMutation.mutateAsync(brand.brandId);
      onSuccess();
    } catch (error) {
      console.error('브랜드 삭제 실패:', error);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 브랜드명 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          브랜드명 *
        </label>
        <input
          type="text"
          value={formData.brandName}
          onChange={(e) => handleInputChange('brandName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="브랜드명을 입력하세요"
          required
        />
      </div>

      {/* 브랜드 이미지 URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          브랜드 이미지 URL *
        </label>
        <input
          type="url"
          value={formData.brandImg}
          onChange={(e) => handleInputChange('brandImg', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="https://example.com/logo.png"
          required
        />
      </div>

      {/* 카테고리 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          카테고리 *
        </label>
        <select
          value={formData.categoryId}
          onChange={(e) => handleInputChange('categoryId', Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        >
                          {categoryList.map(category => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* 사용 제한 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          사용 제한 *
        </label>
        <input
          type="text"
          value={formData.usageLimit}
          onChange={(e) => handleInputChange('usageLimit', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="예: 월 2회, 일 1회"
          required
        />
      </div>

      {/* 사용 방법 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          사용 방법 *
        </label>
        <input
          type="text"
          value={formData.usageMethod}
          onChange={(e) => handleInputChange('usageMethod', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="예: 카드 제시, 앱 바코드"
          required
        />
      </div>

      {/* 매장 유형 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          매장 유형 *
        </label>
        <select
          value={formData.storeType}
          onChange={(e) => handleInputChange('storeType', e.target.value as 'ONLINE' | 'OFFLINE')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          required
        >
          <option value="OFFLINE">오프라인</option>
          <option value="ONLINE">온라인</option>
        </select>
      </div>

      {/* 혜택 목록 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            혜택 목록 *
          </label>
          <button
            type="button"
            onClick={addBenefit}
            className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
          >
            혜택 추가
          </button>
        </div>
        <div className="space-y-3">
          {formData.data.map((benefit, index) => (
            <div key={index} className="p-3 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-700">혜택 {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  삭제
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <input
                  type="text"
                  value={benefit.grade}
                  onChange={(e) => handleBenefitChange(index, 'grade', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="등급 (예: GOOD, VIP, VVIP)"
                  required
                />
                <input
                  type="text"
                  value={benefit.description}
                  onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="혜택 설명 (예: 10% 할인)"
                  required
                />
                <select
                  value={benefit.benefitType}
                  onChange={(e) => handleBenefitChange(index, 'benefitType', e.target.value as 'DISCOUNT' | 'GIFT')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="DISCOUNT">할인</option>
                  <option value="GIFT">기프트</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? '저장 중...' : (brand ? '수정' : '추가')}
        </button>
        {brand && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? '삭제 중...' : '삭제'}
          </button>
        )}
        <button
          type="button"
          onClick={onSuccess}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
        >
          취소
        </button>
      </div>
    </form>
  );
}; 