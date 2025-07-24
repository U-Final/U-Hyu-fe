import React from 'react';

import { FaFilter } from 'react-icons/fa';

import { useBrandsByCategoryWhen } from '../hooks/useBrandsByCategory';
import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { useMapUI } from '../hooks/useMapUI';
import type { StoreCategory } from '../types/category';
import { CATEGORY_CONFIGS } from '../types/category';
import { MapDragBottomSheet } from './MapDragBottomSheet';
import StoreListContent from './layout/StoreListContent';
import BrandSelectContent from './layout/steps/BrandSelectContent';
import CategorySelectContent from './layout/steps/CategorySelectContent';

export const BottomSheetContainer: React.FC = () => {
  const { stores } = useMapData();
  const { handleStoreSelect } = useMapInteraction();
  const {
    selectedCategory,
    selectedBrand,
    currentBottomSheetStep,
    showFilter,
    selectCategoryAndNavigate,
    selectBrandAndReturn,
    backToList,
    clearFilters,
  } = useMapUI();

  // 브랜드 단계일 때만 브랜드 데이터 조회 (성능 최적화)
  const { brands, isLoading: brandsLoading } = useBrandsByCategoryWhen(
    selectedCategory as StoreCategory,
    currentBottomSheetStep === 'brand' && !!selectedCategory
  );

  // 카테고리 키를 한국어 이름으로 변환
  const getCategoryDisplayName = (categoryKey: string): string => {
    if (!categoryKey || categoryKey === '') return '';
    const categoryConfig = CATEGORY_CONFIGS[categoryKey as StoreCategory];
    return categoryConfig?.name || categoryKey;
  };

  const getCurrentStepContent = () => {
    switch (currentBottomSheetStep) {
      case 'list':
        return (
          <div onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">
                  주변 제휴 매장
                </h2>
                {selectedBrand && (
                  <div className="inline-flex items-center gap-2 mt-1 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-1 text-sm text-blue-700">
                      <span className="font-medium">
                        {getCategoryDisplayName(selectedCategory)}
                      </span>
                      <svg
                        className="w-3 h-3 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <span>{selectedBrand}</span>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        clearFilters();
                      }}
                      className="flex-shrink-0 p-0.5 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-all duration-200"
                      aria-label="필터 해제"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                onClick={e => {
                  e.stopPropagation();
                  showFilter();
                }}
                aria-label="필터 설정"
              >
                <FaFilter className="w-3.5 h-3.5" />
                <span>브랜드 필터</span>
              </button>
            </div>
            <StoreListContent
              stores={stores}
              onFilterClick={showFilter}
              onStoreClick={handleStoreSelect}
            />
          </div>
        );
      case 'category':
        return (
          <div onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">필터</h2>
              </div>
              <button
                className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                onClick={e => {
                  e.stopPropagation();
                  backToList();
                }}
                aria-label="이전 화면으로 돌아가기"
              >
                뒤로
              </button>
            </div>
            <CategorySelectContent
              selectedCategory={selectedCategory}
              onCategorySelect={selectCategoryAndNavigate}
            />
          </div>
        );
      case 'brand':
        return (
          <div onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">필터</h2>
              </div>
              <button
                className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                onClick={e => {
                  e.stopPropagation();
                  backToList();
                }}
                aria-label="이전 화면으로 돌아가기"
              >
                뒤로
              </button>
            </div>
            <BrandSelectContent
              categoryKey={selectedCategory}
              categoryDisplayName={getCategoryDisplayName(selectedCategory)}
              brands={brands}
              isLoading={brandsLoading}
              selectedBrand={selectedBrand}
              onBrandSelect={selectBrandAndReturn}
              onBack={backToList}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return <MapDragBottomSheet>{getCurrentStepContent()}</MapDragBottomSheet>;
};
