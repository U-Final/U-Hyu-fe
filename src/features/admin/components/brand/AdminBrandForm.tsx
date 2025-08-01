import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Input } from '@/shared/components/shadcn/ui/input';
import { Label } from '@/shared/components/shadcn/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/shadcn/ui/select';
import { Textarea } from '@/shared/components/shadcn/ui/textarea';
import { PlusIcon, TrashIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminApi } from '@admin/api/adminApi';
import type { AdminBrand, AdminBrandBenefit, AdminBrandUpdateRequest } from '@admin/api/types';
import { ADMIN_CATEGORIES } from '@admin/constants/categories';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';

interface AdminBrandFormProps {
  editingBrand: AdminBrand | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const INITIAL_BENEFIT: AdminBrandBenefit = {
  grade: 'GOOD',
  description: '',
  benefitType: 'DISCOUNT',
};

const GRADE_BADGES = [
  { value: 'VVIP', label: 'VVIP', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { value: 'VIP', label: 'VIP', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { value: 'GOOD', label: 'GOOD', color: 'bg-green-100 text-green-800 border-green-200' },
];

const BENEFIT_TYPE_OPTIONS = [
  { value: 'DISCOUNT', label: '할인' },
  { value: 'GIFT', label: '증정품' },
];

export function AdminBrandForm({ editingBrand, onCancel, onSuccess }: AdminBrandFormProps) {
  const [formData, setFormData] = useState({
    brandName: '',
    brandImg: '',
    categoryId: 1,
    usageLimit: '',
    usageMethod: '',
    storeType: 'OFFLINE' as 'ONLINE' | 'OFFLINE',
    data: [INITIAL_BENEFIT],
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const queryClient = useQueryClient();

  // 브랜드 생성/수정 mutation
  const createMutation = useMutation({
    mutationFn: adminApi.createAdminBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBrandList'] });
      onSuccess();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ brandId, data }: { brandId: number; data: AdminBrandUpdateRequest }) => adminApi.updateAdminBrand(brandId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBrandList'] });
      onSuccess();
    },
  });

  // 편집 모드일 때 폼 데이터 초기화
  useEffect(() => {
    if (editingBrand) {
      setFormData({
        brandName: editingBrand.brandName,
        brandImg: editingBrand.brandImg,
        categoryId: editingBrand.categoryId,
        usageLimit: editingBrand.usageLimit,
        usageMethod: editingBrand.usageMethod,
        storeType: editingBrand.storeType,
        data: editingBrand.data,
      });
      setPreviewUrl(editingBrand.brandImg);
    } else {
      setFormData({
        brandName: '',
        brandImg: '',
        categoryId: 1,
        usageLimit: '',
        usageMethod: '',
        storeType: 'OFFLINE',
        data: [INITIAL_BENEFIT],
      });
      setPreviewUrl('');
    }
  }, [editingBrand]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData(prev => ({ ...prev, brandImg: url }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 혜택 정보 검증
    const invalidBenefits = formData.data.filter(benefit => !benefit.description.trim());
    if (invalidBenefits.length > 0) {
      alert('모든 혜택의 설명을 입력해주세요.');
      return;
    }
    
    try {
      if (editingBrand) {
        await updateMutation.mutateAsync({ brandId: editingBrand.brandId, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(`브랜드 저장 실패: ${errorMessage}`);
    }
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      data: [...prev.data, { ...INITIAL_BENEFIT }],
    }));
  };

  const removeBenefit = (index: number) => {
    if (formData.data.length > 1) {
      setFormData(prev => ({
        ...prev,
        data: prev.data.filter((_, i) => i !== index),
      }));
    }
  };

  const updateBenefit = (index: number, field: keyof AdminBrandBenefit, value: string) => {
    setFormData(prev => ({
      ...prev,
      data: prev.data.map((benefit, i) => 
        i === index ? { ...benefit, [field]: value } : benefit
      ),
    }));
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{editingBrand ? '브랜드 수정' : '브랜드 추가'}</span>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <XMarkIcon className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="brandName">브랜드명 *</Label>
              <Input
                id="brandName"
                value={formData.brandName}
                onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                required
                placeholder="브랜드명을 입력하세요"
              />
            </div>
            
            <div>
              <Label htmlFor="categoryId">카테고리 *</Label>
              <Select
                value={formData.categoryId.toString()}
                onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {ADMIN_CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 이미지 업로드 */}
          <div>
            <Label>브랜드 이미지 *</Label>
            <div className="mt-2 space-y-3">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                {previewUrl && (
                  <img 
                    src={previewUrl} 
                    alt="미리보기" 
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                )}
              </div>
              <p className="text-xs text-gray-500">
                JPG, PNG, GIF 파일을 업로드할 수 있습니다. (최대 5MB)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="usageLimit">사용 제한 *</Label>
              <Input
                id="usageLimit"
                value={formData.usageLimit}
                onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: e.target.value }))}
                placeholder="예: 일 1회, 월 2회"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="storeType">매장 타입 *</Label>
              <Select
                value={formData.storeType}
                onValueChange={(value: 'ONLINE' | 'OFFLINE') => setFormData(prev => ({ ...prev, storeType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="매장 타입을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONLINE">온라인</SelectItem>
                  <SelectItem value="OFFLINE">오프라인</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="usageMethod">사용 방법 *</Label>
            <Textarea
              id="usageMethod"
              value={formData.usageMethod}
              onChange={(e) => setFormData(prev => ({ ...prev, usageMethod: e.target.value }))}
              placeholder="사용 방법을 입력하세요"
              required
              rows={3}
            />
          </div>

          {/* 혜택 정보 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-medium">혜택 정보 *</Label>
              <Button type="button" onClick={addBenefit} variant="outline" size="sm">
                <PlusIcon className="h-4 w-4 mr-1" />
                혜택 추가
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.data.map((benefit, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">혜택 {index + 1}</h4>
                    {formData.data.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeBenefit(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 등급 선택 (뱃지 형태) */}
                    <div>
                      <Label className="block mb-2">등급 *</Label>
                      <div className="flex gap-2">
                        {GRADE_BADGES.map((badge) => (
                          <button
                            key={badge.value}
                            type="button"
                            onClick={() => updateBenefit(index, 'grade', badge.value)}
                            className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors ${
                              benefit.grade === badge.value
                                ? badge.color
                                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {benefit.grade === badge.value && (
                              <CheckIcon className="h-3 w-3 inline mr-1" />
                            )}
                            {badge.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* 혜택 타입 */}
                    <div>
                      <Label>혜택 타입 *</Label>
                      <Select
                        value={benefit.benefitType}
                        onValueChange={(value: 'DISCOUNT' | 'GIFT') => updateBenefit(index, 'benefitType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="혜택 타입을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {BENEFIT_TYPE_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* 설명 */}
                    <div>
                      <Label>설명 *</Label>
                      <Input
                        value={benefit.description}
                        onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                        placeholder="혜택 설명"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '저장 중...' : (editingBrand ? '수정하기' : '추가하기')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 