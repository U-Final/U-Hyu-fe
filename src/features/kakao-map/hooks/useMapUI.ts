import { useCallback } from 'react';

import { useMapUIContext } from '../context/MapUIContext';

/**
 * 지도 UI 상태 관리를 위한 메인 훅
 * MapUIContext의 상태와 액션을 편리하게 사용할 수 있도록 래핑
 * 바텀시트 제어는 ref를 통해서만 수행
 */
export const useMapUI = () => {
  const { state, actions } = useMapUIContext();

  // 복합 액션들: 여러 UI 상태를 조합한 복잡한 동작들

  /**
   * mymap 화면으로 이동
   * 바텀시트 높이 유지하면서 step만 변경
   */
  const showMymap = useCallback(() => {
    actions.setBottomSheetStep('mymap');
  }, [actions]);

  /**
   * 필터 선택 화면으로 이동
   * 바텀시트 높이 유지하면서 step만 변경
   */
  const showFilter = useCallback(() => {
    actions.setBottomSheetStep('category');
  }, [actions]);

  /**
   * 카테고리 선택 후 브랜드 선택 단계로 이동
   * 바텀시트 높이 유지하면서 step만 변경
   * @param category - 선택된 카테고리
   */
  const selectCategoryAndNavigate = useCallback(
    (category: string) => {
      actions.setSelectedCategory(category);
      actions.setSelectedBrand(''); // 이전 브랜드 선택 초기화
      actions.setBottomSheetStep('brand');
    },
    [actions]
  );

  /**
   * 브랜드 선택 후 매장 목록으로 돌아가기
   * 바텀시트 높이 유지하면서 step만 변경
   * @param brand - 선택된 브랜드
   */
  const selectBrandAndReturn = useCallback(
    (brand: string) => {
      actions.setSelectedBrand(brand);
      actions.setBottomSheetStep('list');
    },
    [actions]
  );

  /**
   * 매장 목록 화면으로 돌아가기
   * 바텀시트 높이 유지하면서 step만 변경
   */
  const backToList = useCallback(() => {
    actions.setBottomSheetStep('list');
  }, [actions]);

  /**
   * 필터 해제 (카테고리와 브랜드 선택 초기화)
   */
  const clearFilters = useCallback(() => {
    actions.setSelectedCategory('');
    actions.setSelectedBrand('');
  }, [actions]);

  return {
    // UI 상태 노출
    searchValue: state.searchValue,
    isSearchFocused: state.isSearchFocused,
    currentBottomSheetStep: state.currentBottomSheetStep,
    selectedCategory: state.selectedCategory,
    selectedBrand: state.selectedBrand,
    selectedMarkerId: state.selectedMarkerId,
    // 필터 상태
    activeRegionFilter: state.activeRegionFilter,
    activeCategoryFilter: state.activeCategoryFilter,

    // 기본 액션들 (Context에서 가져온 것)
    setSearchValue: actions.setSearchValue,
    setSearchFocused: actions.setSearchFocused,
    clearSearch: actions.clearSearch,
    setBottomSheetStep: actions.setBottomSheetStep,
    setSelectedCategory: actions.setSelectedCategory,
    setSelectedBrand: actions.setSelectedBrand,
    setRegionFilter: actions.setRegionFilter,
    setCategoryFilter: actions.setCategoryFilter,
    resetFilters: actions.resetFilters,
    setSelectedMarker: actions.setSelectedMarker,
    toggleLocationMarker: actions.toggleLocationMarker,
    setMapDragging: actions.setMapDragging,
    toggleFilterDropdown: actions.toggleFilterDropdown,
    resetAllUI: actions.resetAllUI,

    // 복합 액션들 (이 훅에서 정의한 것)
    showMymap,
    showFilter,
    selectCategoryAndNavigate,
    selectBrandAndReturn,
    backToList,
    clearFilters,
  };
};
