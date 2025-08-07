import { forwardRef, useCallback } from 'react';

import { MyMapList, MymapUuid } from '@mymap/components';
import { useIsLoggedIn } from '@user/store/userStore';
import { FaFilter } from 'react-icons/fa';
import { MdStar } from 'react-icons/md';
import { useParams } from 'react-router-dom';

import { BackButton } from '@/shared/components';
import { useAuthCheckModal } from '@/shared/hooks/useAuthCheckModal';
import { useModalStore } from '@/shared/store';

import { useMapUIContext } from '../context/MapUIContext';
import { useBrandsByCategoryWhen } from '../hooks/useBrandsByCategory';
import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { useMapUI } from '../hooks/useMapUI';
import type { StoreCategory } from '../types/category';
import { CATEGORY_CONFIGS } from '../types/category';
import type { Store } from '../types/store';
import {
  MapDragBottomSheet,
  type MapDragBottomSheetRef,
} from './controls/MapDragBottomSheet';
import StoreListContent from './layout/StoreListContent';
import BrandSelectContent from './layout/steps/BrandSelectContent';
import CategorySelectContent from './layout/steps/CategorySelectContent';

export const BottomSheetContainer = forwardRef<MapDragBottomSheetRef>(
  (_, ref) => {
    const { bottomSheetRef } = useMapUIContext();
    const isLoggedIn = useIsLoggedIn();
    const openModal = useModalStore(state => state.openModal);
    const { checkAuthAndExecuteModal } = useAuthCheckModal();
    const { stores } = useMapData();
    const { handleMapMarkerClick } = useMapInteraction();
    const {
      selectedCategory,
      selectedBrand,
      currentBottomSheetStep,
      showMymap,
      showFilter,
      selectCategoryAndNavigate,
      selectBrandAndReturn,
      backToList,
      clearFilters,
    } = useMapUI();

    const { uuid } = useParams();

    const isShared = !!uuid;

    const { brands, isLoading: brandsLoading } = useBrandsByCategoryWhen(
      selectedCategory as StoreCategory,
      currentBottomSheetStep === 'brand' && !!selectedCategory
    );

    const handleStoreClick = useCallback(
      (store: Store) => {
        checkAuthAndExecuteModal(() => {
          if (bottomSheetRef && bottomSheetRef.current) {
            bottomSheetRef.current.setExplicitlyClosed(true);
            bottomSheetRef.current.close();
          }
          handleMapMarkerClick(store);
        });
      },
      [bottomSheetRef, handleMapMarkerClick, checkAuthAndExecuteModal]
    );
    const handleMyMapClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isLoggedIn) {
        openModal('login');
        return;
      }

      showMymap();
    };

    const handleFilterClick = (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      showFilter();
    };

    const handleFilterClickSimple = () => {
      showFilter();
    };

    const handleCategorySelect = (category: string) => {
      selectCategoryAndNavigate(category);
    };

    const handleBrandSelect = (brand: string) => {
      selectBrandAndReturn(brand);
    };

    const handleBackToList = (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      backToList();
    };

    const handleBackToListSimple = () => {
      backToList();
    };

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
                    <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-blue-50 border border-blue-200 rounded-md max-w-fit">
                      <div className="flex items-center gap-1 text-xs text-blue-700">
                        <span className="font-medium truncate max-w-12">
                          {getCategoryDisplayName(selectedCategory)}
                        </span>
                        <svg
                          className="w-2.5 h-2.5 text-blue-400 flex-shrink-0"
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
                        <span className="truncate max-w-20">
                          {selectedBrand}
                        </span>
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          clearFilters();
                        }}
                        className="flex-shrink-0 p-0.5 text-blue-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-all duration-200 ml-0.5"
                        aria-label="필터 해제"
                      >
                        <svg
                          className="w-2.5 h-2.5"
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
                  {!selectedBrand && selectedCategory && (
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedCategory}
                      {selectedBrand ? ' > ' + selectedBrand : ''}
                    </p>
                  )}
                </div>
                <div className="flex flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray hover:border-gray-300 cursor-pointer"
                      onClick={handleMyMapClick}
                      aria-label="MyMap으로 이동"
                    >
                      <MdStar className="w-5 h-5" />
                      <span>저장</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray hover:border-gray-300 cursor-pointer"
                      onClick={handleFilterClick}
                      aria-label="필터 설정"
                    >
                      <FaFilter className="w-3.5 h-3.5" />
                      <span>브랜드 필터</span>
                    </button>
                  </div>
                </div>
              </div>
              <StoreListContent
                stores={stores}
                onFilterClick={handleFilterClickSimple}
                onStoreClick={handleStoreClick}
              />
            </div>
          );

        case 'mymap':
          return (
            <div onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900">저장 폴더</h2>
                </div>
                <BackButton onClick={handleBackToList} />
              </div>
              <MyMapList />
            </div>
          );

        case 'category':
          return (
            <div onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900">필터</h2>
                </div>
                <BackButton onClick={handleBackToList} />
              </div>
              <CategorySelectContent
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
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
                <BackButton onClick={handleBackToList} />
              </div>
              <BrandSelectContent
                categoryKey={selectedCategory}
                categoryDisplayName={getCategoryDisplayName(selectedCategory)}
                brands={brands}
                isLoading={brandsLoading}
                selectedBrand={selectedBrand}
                onBrandSelect={handleBrandSelect}
                onBack={handleBackToListSimple}
              />
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <MapDragBottomSheet ref={ref}>
        {isShared ? (
          <MymapUuid uuid={uuid} onStoreClick={handleStoreClick} />
        ) : (
          getCurrentStepContent()
        )}
      </MapDragBottomSheet>
    );
  }
);
