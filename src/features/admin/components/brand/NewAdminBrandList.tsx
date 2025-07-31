import { useState } from 'react';

import { BrandListSkeleton } from '@admin/components/common';
import { ADMIN_CATEGORIES } from '@admin/constants/categories';
import type { CategoryId } from '@admin/constants/categories';
import { useAdminBrandsQuery } from '@admin/hooks';
import { useAdminBrandMutation } from '@admin/hooks/useAdminBrandMutation';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

import { FilterTabs } from '@/shared/components';

import { BrandForm } from './BrandForm';
import { BrandListItem } from './BrandListItem';

const ITEMS_PER_PAGE = 5;

export const NewAdminBrandList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: brands, isLoading, error, refetch } = useAdminBrandsQuery(true);
  const { deleteMutation } = useAdminBrandMutation();

  const brandList = brands || [];

  // 검색 및 카테고리 필터링
  const filteredBrands = brandList.filter(brand => {
    const matchesSearch = brand.brandName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || brand.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredBrands.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBrands = filteredBrands.slice(startIndex, endIndex);

  // 카테고리 탭 구성
  const categoryTabs = [
    { label: '전체', value: 'all' },
    ...ADMIN_CATEGORIES.map(cat => ({
      label: cat.name,
      value: cat.id.toString(),
    })),
  ];

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(
      value === 'all' ? 'all' : (Number(value) as CategoryId)
    );
    setCurrentPage(1); // 카테고리 변경시 첫 페이지로
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // 검색시 첫 페이지로
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    refetch();
  };

  const handleEdit = () => {
    refetch();
  };

  const handleDelete = async (brandId: number) => {
    try {
      await deleteMutation.mutateAsync(brandId);
      refetch();

      // 현재 페이지에 브랜드가 없으면 이전 페이지로
      if (currentBrands.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error('브랜드 삭제 실패:', error);
      alert('브랜드 삭제에 실패했습니다.');
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-red-500 space-y-2">
        <p>브랜드 목록을 불러오는데 실패했습니다.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">브랜드 관리</h2>
          <p className="text-sm text-gray-600 mt-1">
            총 {brandList.length}개의 브랜드가 등록되어 있습니다.
            {filteredBrands.length !== brandList.length && (
              <span className="text-primary ml-1">
                (필터링된 결과: {filteredBrands.length}개)
              </span>
            )}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          {showAddForm ? '추가 취소' : '브랜드 추가'}
        </button>
      </div>

      {/* 검색 */}
      <div className="relative">
        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={e => handleSearchChange(e.target.value)}
          placeholder="브랜드명으로 검색..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
        />
      </div>

      {/* 카테고리 필터 */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          카테고리별 필터
        </h3>
        <div className="overflow-x-auto px-0">
          <FilterTabs
            tabs={categoryTabs}
            onChange={handleCategoryChange}
            variant="gray"
          />
        </div>
      </div>

      {/* 브랜드 추가 폼 */}
      {showAddForm && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <BrandForm
            onSuccess={handleAddSuccess}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* 브랜드 목록 */}
      {isLoading ? (
        <BrandListSkeleton />
      ) : (
        <div className="space-y-4">
          {currentBrands.length > 0 ? (
            <>
              {currentBrands.map(brand => (
                <BrandListItem
                  key={brand.brandId}
                  brand={brand}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    이전
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-primary text-white'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    다음
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              {searchTerm ? (
                <>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    검색 결과가 없습니다
                  </h3>
                  <p className="text-gray-600 mb-4">
                    "{searchTerm}"에 대한 검색 결과를 찾을 수 없습니다.
                  </p>
                  <button
                    onClick={() => handleSearchChange('')}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    검색어 지우기
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <PlusIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    등록된 브랜드가 없습니다
                  </h3>
                  <p className="text-gray-600 mb-4">
                    첫 번째 브랜드를 추가해보세요.
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    브랜드 추가하기
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* 로딩 오버레이 */}
      {deleteMutation.isPending && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-center text-gray-600">브랜드를 삭제하는 중...</p>
          </div>
        </div>
      )}
    </div>
  );
};
