import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Input } from '@/shared/components/shadcn/ui/input';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@admin/api/adminApi';
import type { AdminBrand } from '@admin/api/types';
import { AdminBrandForm } from './AdminBrandForm';
import { AdminBrandCard } from './AdminBrandCard';
import { AdminBrandPagination } from './AdminBrandPagination';
import { AdminBrandDeleteModal } from './AdminBrandDeleteModal';
import { ADMIN_CATEGORIES } from '@admin/constants/categories';
import FilterTabs from '@/shared/components/filter_tabs/FilterTabs';

const ITEMS_PER_PAGE = 5;

export function AdminBrandList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState<AdminBrand | null>(null);
  
  const queryClient = useQueryClient();

  // 브랜드 목록 조회
  const { data: brandListResponse, isLoading, error } = useQuery({
    queryKey: ['adminBrandList'],
    queryFn: adminApi.getAdminBrandList,
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

  // 필터링된 브랜드 목록
  const filteredBrands = useMemo(() => {
    if (!brandListResponse?.data) return [];
    
    let filtered = brandListResponse.data;
    
    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(brand => 
        brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 카테고리 필터
    if (selectedCategory !== 'all') {
      const categoryId = parseInt(selectedCategory);
      filtered = filtered.filter(brand => brand.categoryId === categoryId);
    }
    
    return filtered;
  }, [brandListResponse?.data, searchTerm, selectedCategory]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBrands = filteredBrands.slice(startIndex, endIndex);

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
        console.error('브랜드 삭제 실패:', error);
        alert('브랜드 삭제에 실패했습니다.');
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로
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

  const totalBrands = brandListResponse?.data?.length || 0;
  const filteredCount = filteredBrands.length;

  return (
    <>
      {/* 브랜드 추가/수정 폼 */}
      {showForm && (
        <AdminBrandForm
          editingBrand={editingBrand}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>브랜드 관리</span>
            <Button onClick={handleAddBrand} className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              브랜드 추가
            </Button>
          </CardTitle>
          <p className="text-sm text-gray-600">
            총 {totalBrands}개의 브랜드가 등록되어 있습니다.
            {searchTerm || selectedCategory !== 'all' ? ` (필터링: ${filteredCount}개)` : ''}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 검색 */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="브랜드명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 카테고리 필터 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">카테고리별 필터</h3>
            <div className="overflow-x-auto">
              <FilterTabs
                tabs={categoryTabs}
                onChange={handleCategoryChange}
                variant="gray"
              />
            </div>
          </div>

          {/* 브랜드 목록 */}
          <div className="space-y-4">
            {currentBrands.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  {searchTerm || selectedCategory !== 'all' 
                    ? '검색 조건에 맞는 브랜드가 없습니다.' 
                    : '등록된 브랜드가 없습니다.'}
                </div>
                <p className="text-sm text-gray-500">
                  {searchTerm || selectedCategory !== 'all' 
                    ? '검색어나 필터를 변경해보세요.' 
                    : '브랜드 추가 버튼을 클릭하여 첫 번째 브랜드를 등록하세요.'}
                </p>
              </div>
            ) : (
              currentBrands.map((brand) => (
                <AdminBrandCard
                  key={brand.brandId}
                  brand={brand}
                  onEdit={handleEditBrand}
                  onDelete={handleDeleteBrand}
                />
              ))
            )}
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <AdminBrandPagination
              currentPage={currentPage}
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