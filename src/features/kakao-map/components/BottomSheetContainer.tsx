import { forwardRef, useCallback } from 'react';

import { MyMapList, MymapUuid } from '@mymap/components';
import { FaFilter } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { BackButton } from '@/shared/components';
import { useModalStore } from '@/shared/store';
import { useIsLoggedIn } from '@/shared/store/userStore';

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
} from './MapDragBottomSheet';
import StoreListContent from './layout/StoreListContent';
import BrandSelectContent from './layout/steps/BrandSelectContent';
import CategorySelectContent from './layout/steps/CategorySelectContent';

export const BottomSheetContainer = forwardRef<MapDragBottomSheetRef>(
  (_, ref) => {
    const { bottomSheetRef } = useMapUIContext();
    const isLoggedIn = useIsLoggedIn();
    const openModal = useModalStore(state => state.openModal);
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

    // 브랜드 단계일 때만 브랜드 데이터 조회 (성능 최적화)
    const { brands, isLoading: brandsLoading } = useBrandsByCategoryWhen(
      selectedCategory as StoreCategory,
      currentBottomSheetStep === 'brand' && !!selectedCategory
    );

    // 바텀시트 내 매장 클릭 시 바텀시트 닫고 인포윈도우 표시
    const handleStoreClick = useCallback(
      (store: Store) => {
        if (import.meta.env.MODE === 'development') {
          console.log('매장 리스트에서 매장 클릭:', store.storeName);
        }

        // 바텀시트 명시적 닫힘 플래그 설정 후 닫기
        if (bottomSheetRef && bottomSheetRef.current) {
          bottomSheetRef.current.setExplicitlyClosed(true);
          bottomSheetRef.current.close();
        }

        // 지도 마커 클릭과 동일한 효과 (바텀시트 닫고 인포윈도우 표시)
        handleMapMarkerClick(store);
      },
      [bottomSheetRef, handleMapMarkerClick]
    );

    // MyMap 버튼 클릭 핸들러 - 바텀시트 높이 유지
    const handleMyMapClick = (e: React.MouseEvent) => {
      e.stopPropagation();

      // 로그인 상태 확인 로직 수정 (paste.txt의 로직과 paste-2.txt의 로직 통합)
      if (!isLoggedIn) {
        openModal('login');
        return;
      }

      // 바텀시트 높이 유지하면서 step만 변경
      showMymap();
    };

    // 필터 버튼 클릭 핸들러 - 바텀시트 높이 유지
    const handleFilterClick = (e?: React.MouseEvent) => {
      if (import.meta.env.MODE === 'development') {
        console.log('🔥 브랜드 필터 버튼 클릭됨!');
      }
      if (e) {
        e.stopPropagation();
      }
      // 바텀시트 높이 유지하면서 step만 변경
      showFilter();
    };

    // 필터 버튼 클릭 핸들러 - 바텀시트 높이 유지 (컴포넌트용)
    const handleFilterClickSimple = () => {
      // 바텀시트 높이 유지하면서 step만 변경
      showFilter();
    };

    // 카테고리 선택 핸들러 - 바텀시트 높이 유지
    const handleCategorySelect = (category: string) => {
      // 바텀시트 높이 유지하면서 step 변경
      selectCategoryAndNavigate(category);
    };

    // 브랜드 선택 핸들러 - 바텀시트 높이 유지
    const handleBrandSelect = (brand: string) => {
      // 바텀시트 높이 유지하면서 step 변경
      selectBrandAndReturn(brand);
    };

    // 뒤로가기 핸들러 - 바텀시트 높이 유지 (버튼용)
    const handleBackToList = (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      // 바텀시트 높이 유지하면서 step 변경
      backToList();
    };

    // 뒤로가기 핸들러 - 바텀시트 높이 유지 (컴포넌트용)
    const handleBackToListSimple = () => {
      // 바텀시트 높이 유지하면서 step 변경
      backToList();
    };

    // 카테고리 키를 표시용 한국어 이름으로 변환
    const getCategoryDisplayName = (categoryKey: string): string => {
      if (!categoryKey || categoryKey === '') return '';
      const categoryConfig = CATEGORY_CONFIGS[categoryKey as StoreCategory];
      return categoryConfig?.name || categoryKey;
    };

    // 현재 바텀시트 단계에 따른 콘텐츠 렌더링
    const getCurrentStepContent = () => {
      if (import.meta.env.MODE === 'development') {
        console.log('🎯 현재 바텀시트 step:', currentBottomSheetStep);
      }

      switch (currentBottomSheetStep) {
        case 'list':
          return (
            <div onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900">
                    주변 제휴 매장
                  </h2>
                  {/* 컴팩트한 필터 표시 UI */}
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
                  {/* 기존 필터 표시 (브랜드가 없을 때) */}
                  {!selectedBrand && selectedCategory && (
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedCategory}
                      {selectedBrand ? ' > ' + selectedBrand : ''}
                    </p>
                  )}
                </div>
                <div className="flex flex-row gap-2">
                  {/* MyMap 버튼 */}
                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray hover:border-gray-300 cursor-pointer"
                      onClick={handleMyMapClick}
                      aria-label="MyMap으로 이동"
                    >
                      <span>My Map</span>
                    </button>
                  </div>
                  {/* 개선된 필터 버튼 */}
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
                  <h2 className="text-lg font-bold text-gray-900">My Map</h2>
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
