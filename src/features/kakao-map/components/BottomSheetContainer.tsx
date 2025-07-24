import React from 'react';

import { MyMapList } from '@mymap/components/mymap-list';
import { FaFilter } from 'react-icons/fa';

import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { useMapUI } from '../hooks/useMapUI';
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
    showMymap,
    showFilter,
    selectCategoryAndNavigate,
    selectBrandAndReturn,
    backToList,
  } = useMapUI();

  const handleCreateNewMap = () => {
    // 추후 새 지도 추가하는 곳으로 이동 구현하기
  };

  const handleSelectMap = (id: number) => {
    console.log(`지도 선택됨: ${id}`);
    // 선택된 지도 상세 보기 또는 이동 처리
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
                {(selectedCategory || selectedBrand) && (
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedCategory}
                    {selectedBrand ? ' > ' + selectedBrand : ''}
                  </p>
                )}
              </div>
              <div className="flex flex-row gap-2">
                {/* mymap */}
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-light-gray shadow-sm hover:shadow-md"
                    onClick={e => {
                      e.stopPropagation();
                      showMymap();
                    }}
                    aria-label="MyMap으로 이동"
                  >
                    <span>My Map</span>
                  </button>
                </div>
                {/* filter */}
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-black hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-light-gray hover:border-blue-300 shadow-sm hover:shadow-md"
                    onClick={e => {
                      e.stopPropagation();
                      showFilter();
                    }}
                    aria-label="필터 설정"
                  >
                    <FaFilter className="w-3.5 h-3.5" />
                    <span>필터</span>
                  </button>
                </div>
              </div>
            </div>
            <StoreListContent
              stores={stores}
              onFilterClick={showFilter}
              onStoreClick={handleStoreSelect}
            />
          </div>
        );
      case 'mymap':
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
            <MyMapList
              onCreateNewMap={handleCreateNewMap}
              onSelectMap={handleSelectMap}
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
              categoryDisplayName={selectedCategory}
              brands={[]} // TODO: 브랜드 데이터 구현 필요
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
