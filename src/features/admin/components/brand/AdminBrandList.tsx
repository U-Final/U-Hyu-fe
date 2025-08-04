import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { Button } from '@/shared/components/shadcn/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { adminApi } from '@admin/api/adminApi';
import type { AdminBrand } from '@admin/api/types';
import { useAdminQueryParams } from '@admin/hooks/useAdminQueryParams';
import { AdminBrandForm } from './AdminBrandForm';
import { AdminBrandCard } from './AdminBrandCard';
import { AdminBrandPagination } from './AdminBrandPagination';
import { AdminBrandDeleteModal } from './AdminBrandDeleteModal';
import { ADMIN_CATEGORIES } from '@admin/constants/categories';
import FilterTabs from '@/shared/components/filter_tabs/FilterTabs';
import SearchInput from '@/shared/components/search_input/SearchInput';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import React from 'react';

export function AdminBrandList() {
  const { params, setParam } = useAdminQueryParams();
  const [searchTerm, setSearchTerm] = useState(params.brand_name ?? '');
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<AdminBrand | null>(null);
  
  const queryClient = useQueryClient();

  React.useEffect(() => {
    setSearchTerm(params.brand_name ?? '');
  }, [params.brand_name]);

  // 브랜드 목록 조회
  const { data: brandListResponse, isLoading, error } = useQuery({
    queryKey: ['adminBrandList', params],
    queryFn: () => adminApi.getAdminBrandList(params),
    enabled: true,
    refetchOnMount: 'always',
    gcTime: 0,
  });

  // 브랜드 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteAdminBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminBrandList'] });
      setDeleteModalOpen(false);
      setBrandToDelete(null);
    },
  });

  // 카테고리 필터 탭 설정
  const categoryTabs = [
    { key: 'all', label: '전체', value: 'all' },
    ...ADMIN_CATEGORIES.map(cat => ({
      key: cat.id.toString(),
      label: cat.name,
      value: cat.id.toString()
    }))
  ];

  const handleAddBrand = () => {
    setEditingBrand(null);
    setShowForm(true);
  };

  const handleEditBrand = (brand: AdminBrand) => {
    setEditingBrand(brand);
    setShowForm(true);
  };

  const handleDeleteBrand = (brand: AdminBrand) => {
    setBrandToDelete(brand);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (brandToDelete) {
      try {
        await deleteMutation.mutateAsync(brandToDelete.brandId);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        toast.error(`브랜드 삭제 실패: ${errorMessage}`);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setParam('page', (page - 1).toString());
  };

  const handleFilterChange = (value: string) => {
    setParam('category', value);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingBrand(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingBrand(null);
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

  const brandList = brandListResponse?.brandList || [];
  const totalPages = brandListResponse?.totalPages || 0;
  const currentPage = brandListResponse?.currentPage || 0;
  const totalBrands = brandList.length;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>브랜드 관리</span>
            <Button onClick={handleAddBrand} variant="outline" className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white">
              <PlusIcon className="h-4 w-4" />
              브랜드 추가
            </Button>
          </CardTitle>
          <p className="text-sm text-gray-600">
            총 {totalBrands}개의 브랜드가 조회되었습니다.
            {searchTerm || params.category ? ` (필터링 적용)` : ''}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {showForm && !editingBrand && (
            <AdminBrandForm
              editingBrand={null}
              onCancel={handleFormCancel}
              onSuccess={handleFormSuccess}
            />
          )}

          <div className="flex flex-col gap-3">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              onSearch={value => setParam('brand_name', value)}
              placeholder="브랜드명으로 검색..."
            />
            <div className="overflow-x-auto px-0">
              <FilterTabs
                tabs={categoryTabs}
                value={params.category || 'all'}
                onChange={handleFilterChange}
                variant="gray"
              />
            </div>
          </div>

          {/* 브랜드 목록 */}
          <div className="space-y-4">
            {brandList.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  {searchTerm || params.category 
                    ? '검색 조건에 맞는 브랜드가 없습니다.' 
                    : '등록된 브랜드가 없습니다.'}
                </div>
                <p className="text-sm text-gray-500">
                  {searchTerm || params.category 
                    ? '검색어나 필터를 변경해보세요.' 
                    : '브랜드 추가 버튼을 클릭하여 첫 번째 브랜드를 등록하세요.'}
                </p>
              </div>
            ) : (
              brandList.map((brand) => (
                <AdminBrandCard
                  key={brand.brandId}
                  brand={brand}
                  onEdit={handleEditBrand}
                  onDelete={handleDeleteBrand}
                  isEditing={editingBrand?.brandId === brand.brandId}
                  onCancelEdit={handleFormCancel}
                  onSuccessEdit={handleFormSuccess}
                />
              ))
            )}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <AdminBrandPagination
              currentPage={currentPage + 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>

      {/* 삭제 확인 모달 */}
      <AdminBrandDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setBrandToDelete(null);
        }}
        brand={brandToDelete}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
} 