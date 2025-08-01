

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { Button } from '@/shared/components/shadcn/ui/button';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@admin/api/adminApi';
import type { AdminBrand } from '@admin/api/types';
import { AdminBrandModal } from './AdminBrandModal';
import { ADMIN_CATEGORIES } from '@admin/constants/categories';

export function AdminBrandList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null);
  const queryClient = useQueryClient();

  // 브랜드 목록 조회
  const { data: brandListResponse, isLoading, error } = useQuery({
    queryKey: ['adminBrandList'],
    queryFn: adminApi.getAdminBrandList,
    enabled: true, // 브랜드 관리 탭에서만 호출되므로 항상 활성화
    refetchOnMount: 'always',
    gcTime: 0,
  });

  // 브랜드 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteAdminBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBrandList'] });
    },
  });

  const handleAddBrand = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  const handleEditBrand = (brand: AdminBrand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const handleDeleteBrand = async (brand: AdminBrand) => {
    if (window.confirm(`"${brand.brandName}" 브랜드를 삭제하시겠습니까?`)) {
      try {
        await deleteMutation.mutateAsync(brand.brandId);
      } catch (error) {
        console.error('브랜드 삭제 실패:', error);
        alert('브랜드 삭제에 실패했습니다.');
      }
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = ADMIN_CATEGORIES.find(cat => cat.id === categoryId);
    return category?.name || '알 수 없음';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>브랜드 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">로딩 중...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>브랜드 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-red-500">
            브랜드 목록을 불러오는데 실패했습니다.
          </div>
        </CardContent>
      </Card>
    );
  }

  const brands = brandListResponse?.data || [];

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>브랜드 관리</CardTitle>
          <Button onClick={handleAddBrand} className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            브랜드 추가
          </Button>
        </CardHeader>
        <CardContent>
          {brands.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              등록된 브랜드가 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              {brands.map((brand, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img 
                        src={brand.brandImg} 
                        alt={brand.brandName}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/brands/default-brand-logo.png';
                        }}
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{brand.brandName}</h3>
                        <p className="text-sm text-gray-600">{getCategoryName(brand.categoryId)}</p>
                        <p className="text-xs text-gray-500">{brand.storeType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditBrand(brand)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBrand(brand)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AdminBrandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingBrand={editingBrand}
      />
    </>
  );
} 