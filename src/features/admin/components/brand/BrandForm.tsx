import { useState, useRef } from 'react';
import { PlusIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import type { AdminBrand, BrandBenefit, CreateBrandRequest, UpdateBrandRequest } from '@admin/api/types';
import { useAdminBrandMutation } from '@admin/hooks';
import { ADMIN_CATEGORIES, GRADE_OPTIONS } from '@admin/constants/categories';

interface BrandFormProps {
  brand?: AdminBrand;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormData {
  brandName: string;
  brandImg: string;
  categoryId: number;
  usageLimit: string;
  usageMethod: string;
  data: BrandBenefit[];
}

export const BrandForm = ({ brand, onSuccess, onCancel }: BrandFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    brandName: brand?.brandName || '',
    brandImg: brand?.brandImg || '',
    categoryId: brand?.categoryId || 1,
    usageLimit: brand?.usageLimit || '',
    usageMethod: brand?.usageMethod || '',
    data: brand?.data || [],
  });

  const [newBenefit, setNewBenefit] = useState<BrandBenefit>({
    grade: 'GOOD',
    description: '',
    benefitType: 'DISCOUNT',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(brand?.brandImg || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { createMutation, updateMutation } = useAdminBrandMutation();

  // 파일 업로드 핸들러
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
        setFormData(prev => ({ ...prev, brandImg: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.data.length === 0) {
      alert('최소 하나의 혜택을 추가해주세요.');
      return;
    }

    try {
      if (brand) {
        // 수정
        const updateData: UpdateBrandRequest = formData;
        await updateMutation.mutateAsync({ brandId: brand.brandId, data: updateData });
      } else {
        // 생성
        const createData: CreateBrandRequest = formData;
        await createMutation.mutateAsync(createData);
      }
      onSuccess?.();
    } catch (error) {
      console.error('브랜드 저장 중 오류:', error);
      alert('브랜드 저장에 실패했습니다.');
    }
  };

  const addBenefit = () => {
    if (!newBenefit.description) {
      alert('혜택 설명을 입력해주세요.');
      return;
    }

    setFormData(prev => ({
      ...prev,
      data: [...prev.data, newBenefit],
    }));

    setNewBenefit({
      grade: 'GOOD',
      description: '',
      benefitType: 'DISCOUNT',
    });
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      data: prev.data.filter((_, i) => i !== index),
    }));
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {brand ? '브랜드 수정' : '새 브랜드 추가'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 브랜드명 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              브랜드명 *
            </label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
              placeholder="브랜드명을 입력하세요"
              required
              className="w-full px-3 py-2 text-base md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              카테고리 *
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData(prev => ({ ...prev, categoryId: Number(e.target.value) }))}
              required
              className="w-full px-3 py-2 text-base md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              {ADMIN_CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 브랜드 이미지 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            브랜드 이미지 *
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <PhotoIcon className="w-5 h-5 text-gray-500" />
              이미지 선택
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            {selectedFile && (
              <span className="text-sm text-gray-600">{selectedFile.name}</span>
            )}
          </div>
          {previewUrl && (
            <div className="mt-3">
              <img
                src={previewUrl}
                alt="미리보기"
                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 사용 제한 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사용 제한 *
            </label>
            <input
              type="text"
              value={formData.usageLimit}
              onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: e.target.value }))}
              placeholder="예: 월 2회"
              required
              className="w-full px-3 py-2 text-base md:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>

        </div>

        {/* 사용 방법 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            사용 방법 *
          </label>
          <textarea
            value={formData.usageMethod}
            onChange={(e) => setFormData(prev => ({ ...prev, usageMethod: e.target.value }))}
            placeholder="혜택 사용 방법을 입력하세요"
            rows={3}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
          />
        </div>

        {/* 혜택 목록 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            혜택 목록 *
          </label>
          
          {/* 기존 혜택 목록 */}
          <div className="space-y-2 mb-4">
            {formData.data.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{benefit.grade}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      benefit.benefitType === 'DISCOUNT' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {benefit.benefitType === 'DISCOUNT' ? '할인' : '기프트'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* 새 혜택 추가 */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            {/* 등급 선택 버튼들 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">등급 선택</label>
              <div className="flex gap-2">
                {GRADE_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                                         onClick={() => setNewBenefit(prev => ({ ...prev, grade: option.value as 'GOOD' | 'VIP' | 'VVIP' }))}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      newBenefit.grade === option.value
                        ? option.color + ' border-2 border-current'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <select
                value={newBenefit.benefitType}
                onChange={(e) => setNewBenefit(prev => ({ ...prev, benefitType: e.target.value as 'DISCOUNT' | 'GIFT' }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="DISCOUNT">할인</option>
                <option value="GIFT">기프트</option>
              </select>
              <button
                type="button"
                onClick={addBenefit}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
                추가
              </button>
            </div>
            <textarea
              value={newBenefit.description}
              onChange={(e) => setNewBenefit(prev => ({ ...prev, description: e.target.value }))}
              placeholder="혜택 설명을 입력하세요"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
            />
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '저장 중...' : (brand ? '수정하기' : '추가하기')}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              취소
            </button>
          )}
        </div>
      </form>
    </div>
  );
}; 