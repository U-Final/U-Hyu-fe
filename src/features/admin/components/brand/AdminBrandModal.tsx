import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Input } from '@/shared/components/shadcn/ui/input';
import { Label } from '@/shared/components/shadcn/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/shadcn/ui/select';
import { Textarea } from '@/shared/components/shadcn/ui/textarea';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@admin/api/adminApi';
import type { AdminBrand, AdminBrandBenefit, AdminBrandUpdateRequest } from '@admin/api/types';
import { ADMIN_CATEGORIES } from '@admin/constants/categories';

interface AdminBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingBrand: AdminBrand | null;
}

const INITIAL_BENEFIT: AdminBrandBenefit = {
  grade: 'GOOD',
  description: '',
  benefitType: 'DISCOUNT',
};

export function AdminBrandModal({ isOpen, onClose, editingBrand }: AdminBrandModalProps) {
  const [formData, setFormData] = useState({
    brandName: '',
    brandImg: '',
    categoryId: 1,
    usageLimit: '',
    usageMethod: '',
    storeType: 'OFFLINE' as 'ONLINE' | 'OFFLINE',
    data: [INITIAL_BENEFIT],
  });

  const queryClient = useQueryClient();

  // 브랜드 생성/수정 mutation
  const createMutation = useMutation({
    mutationFn: adminApi.createAdminBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBrandList'] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ brandId, data }: { brandId: number; data: AdminBrandUpdateRequest }) => adminApi.updateAdminBrand(brandId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBrandList'] });
      onClose();
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
    }
  }, [editingBrand]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingBrand) {
        await updateMutation.mutateAsync({ brandId: editingBrand.brandId, data: formData });
      } else {
        // 생성 모드
        await createMutation.mutateAsync(formData);
      }
    } catch (error) {
      console.error('브랜드 저장 실패:', error);
      alert('브랜드 저장에 실패했습니다.');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{editingBrand ? '브랜드 수정' : '브랜드 추가'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brandName">브랜드명</Label>
                <Input
                  id="brandName"
                  value={formData.brandName}
                  onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="categoryId">카테고리</Label>
                <Select
                  value={formData.categoryId.toString()}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
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

            <div>
              <Label htmlFor="brandImg">브랜드 이미지 URL</Label>
              <Input
                id="brandImg"
                value={formData.brandImg}
                onChange={(e) => setFormData(prev => ({ ...prev, brandImg: e.target.value }))}
                placeholder="https://example.com/image.png"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="usageLimit">사용 제한</Label>
                <Input
                  id="usageLimit"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: e.target.value }))}
                  placeholder="예: 일 1회"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="storeType">매장 타입</Label>
                <Select
                  value={formData.storeType}
                  onValueChange={(value: 'ONLINE' | 'OFFLINE') => setFormData(prev => ({ ...prev, storeType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ONLINE">온라인</SelectItem>
                    <SelectItem value="OFFLINE">오프라인</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="usageMethod">사용 방법</Label>
              <Textarea
                id="usageMethod"
                value={formData.usageMethod}
                onChange={(e) => setFormData(prev => ({ ...prev, usageMethod: e.target.value }))}
                placeholder="사용 방법을 입력하세요"
                required
              />
            </div>

            {/* 혜택 정보 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>혜택 정보</Label>
                <Button type="button" onClick={addBenefit} variant="outline" size="sm">
                  <PlusIcon className="h-4 w-4 mr-1" />
                  혜택 추가
                </Button>
              </div>
              
              <div className="space-y-4">
                {formData.data.map((benefit, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">혜택 {index + 1}</h4>
                      {formData.data.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeBenefit(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>등급</Label>
                        <Select
                          value={benefit.grade}
                          onValueChange={(value: 'VVIP' | 'VIP' | 'GOOD') => updateBenefit(index, 'grade', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="VVIP">VVIP</SelectItem>
                            <SelectItem value="VIP">VIP</SelectItem>
                            <SelectItem value="GOOD">GOOD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>혜택 타입</Label>
                        <Select
                          value={benefit.benefitType}
                          onValueChange={(value: 'DISCOUNT' | 'POINT' | 'GIFT') => updateBenefit(index, 'benefitType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DISCOUNT">할인</SelectItem>
                            <SelectItem value="POINT">포인트</SelectItem>
                            <SelectItem value="GIFT">증정품</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>설명</Label>
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
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {createMutation.isPending || updateMutation.isPending ? '저장 중...' : '저장'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 