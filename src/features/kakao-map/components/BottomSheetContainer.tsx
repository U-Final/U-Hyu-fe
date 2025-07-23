import React from 'react';

import { FaFilter } from 'react-icons/fa';

import { DragBottomSheet } from '@/shared/components/bottom_sheet/DragBottomSheet';

import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { useMapUI } from '../hooks/useMapUI';
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
  } = useMapUI();

  const getCurrentStepContent = () => {
    switch (currentBottomSheetStep) {
      case 'list':
        return (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">
                  주변 제휴 매장
                </h2>
                {(selectedCategory || selectedBrand) && (
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedCategory}
                    {selectedBrand ? ' > ' + selectedBrand : ''}
                  </p>
                )}
              </div>
              <button
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                onClick={showFilter}
                aria-label="필터 설정"
              >
                <FaFilter className="w-3.5 h-3.5" />
                <span>필터</span>
              </button>
            </div>
            <StoreListContent
              stores={stores}
              onFilterClick={showFilter}
              onStoreClick={handleStoreSelect}
            />
          </>
        );
      case 'category':
        return (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">필터</h2>
              </div>
              <button
                className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                onClick={backToList}
                aria-label="이전 화면으로 돌아가기"
              >
                뒤로
              </button>
            </div>
            <CategorySelectContent
              selectedCategory={selectedCategory}
              onCategorySelect={selectCategoryAndNavigate}
            />
          </>
        );
      case 'brand':
        return (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900">필터</h2>
              </div>
              <button
                className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                onClick={backToList}
                aria-label="이전 화면으로 돌아가기"
              >
                뒤로
              </button>
            </div>
            <BrandSelectContent
              categoryKey={selectedCategory}
              categoryDisplayName={selectedCategory}
              brands={[]} // TODO: 브랜드 데이터 구현 필요
              selectedBrand={selectedBrand}
              onBrandSelect={selectBrandAndReturn}
              onBack={backToList}
            />
          </>
        );
      default:
        return null;
    }
  };

  return <DragBottomSheet>{getCurrentStepContent()}</DragBottomSheet>;
};
