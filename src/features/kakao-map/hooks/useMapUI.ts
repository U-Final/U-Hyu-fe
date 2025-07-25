import { useCallback } from 'react';

import { useMapUIContext } from '../context/MapUIContext';

/**
 * 지도 UI 상태 관리를 위한 메인 훅
 * MapUIContext의 상태와 액션을 편리하게 사용할 수 있도록 래핑
 * 복합 액션들도 포함하여 컴포넌트에서 쉽게 사용 가능
 */
export const useMapUI = () => {
  const { state, actions } = useMapUIContext();

  // 복합 액션들: 여러 UI 상태를 조합한 복잡한 동작들

  /**
   * mymap 화면으로 이동
   * 바텀시트 높이 유지하면서 step만 변경
   */
  const showMymap = useCallback(() => {
    actions.setExplicitClosed(false); // isExplicitlyClosed 플래그 리셋
    actions.setBottomSheetStep('mymap');
    // 기존의 setBottomSheetExpanded 제거 - 높이 유지
  }, [actions]);

  /**
   * 필터 선택 화면으로 이동
   * 바텀시트 높이 유지하면서 step만 변경
   */
  const showFilter = useCallback(() => {
    actions.setExplicitClosed(false); // isExplicitlyClosed 플래그 리셋
    actions.setBottomSheetStep('category');
    // 기존의 setBottomSheetExpanded 제거 - 높이 유지
  }, [actions]);

  /**
   * 카테고리 선택 후 브랜드 선택 단계로 이동
   * 바텀시트 높이 유지하면서 step만 변경
   * @param category - 선택된 카테고리
   */
  const selectCategoryAndNavigate = useCallback(
    (category: string) => {
      actions.setExplicitClosed(false); // isExplicitlyClosed 플래그 리셋
      actions.setSelectedCategory(category);
      actions.setSelectedBrand(''); // 이전 브랜드 선택 초기화
      actions.setBottomSheetStep('brand');
      // 높이 유지 - 추가 바텀시트 제어 없음
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
      actions.setExplicitClosed(false); // isExplicitlyClosed 플래그 리셋
      actions.setSelectedBrand(brand);
      actions.setBottomSheetStep('list');
      // 높이 유지 - 추가 바텀시트 제어 없음
    },
    [actions]
  );

  /**
   * 매장 목록 화면으로 돌아가기
   * 바텀시트 높이 유지하면서 step만 변경
   */
  const backToList = useCallback(() => {
    actions.setExplicitClosed(false); // isExplicitlyClosed 플래그 리셋
    actions.setBottomSheetStep('list');
    // 높이 유지 - 추가 바텀시트 제어 없음
  }, [actions]);

  /**
   * 필터 해제 (카테고리와 브랜드 선택 초기화)
   */
  const clearFilters = useCallback(() => {
    actions.setSelectedCategory('');
    actions.setSelectedBrand('');
  }, [actions]);

  // 바텀시트 통합 제어 함수들 (새로 추가)

  /**
   * 바텀시트를 지정된 레벨로 열기
   * 명시적으로 닫힌 상태에서는 expanded만 허용
   */
  const openBottomSheet = useCallback(
    (level: 'middle' | 'expanded', animate = true) => {
      // 명시적으로 닫힌 상태에서는 middle 열기 차단
      if (state.bottomSheet.isExplicitlyClosed && level !== 'expanded') {
        if (import.meta.env.MODE === 'development') {
          console.log('명시적으로 닫힌 상태 - middle 열기 무시');
        }
        return;
      }

      actions.openBottomSheet(level, animate);
    },
    [actions, state.bottomSheet.isExplicitlyClosed]
  );

  /**
   * 바텀시트 닫기
   */
  const closeBottomSheet = useCallback(
    (explicit = false, animate = true) => {
      actions.closeBottomSheet(explicit, animate);
    },
    [actions]
  );

  /**
   * 명시적 닫힘 상태 설정
   */
  const setExplicitClosed = useCallback(
    (closed: boolean) => {
      actions.setExplicitClosed(closed);
    },
    [actions]
  );

  // 편의 함수들
  const openMiddle = useCallback(
    () => openBottomSheet('middle'),
    [openBottomSheet]
  );
  const openExpanded = useCallback(
    () => openBottomSheet('expanded'),
    [openBottomSheet]
  );
  const closeExplicitly = useCallback(
    () => closeBottomSheet(true),
    [closeBottomSheet]
  );

  return {
    // UI 상태 노출
    searchValue: state.searchValue,
    isSearchFocused: state.isSearchFocused,
    currentBottomSheetStep: state.currentBottomSheetStep,
    isBottomSheetExpanded: state.isBottomSheetExpanded,
    selectedCategory: state.selectedCategory,
    selectedBrand: state.selectedBrand,
    selectedMarkerId: state.selectedMarkerId,

    // 바텀시트 통합 상태 노출
    bottomSheetState: state.bottomSheet.state,
    isExplicitlyClosed: state.bottomSheet.isExplicitlyClosed,
    isBottomSheetAnimating: state.bottomSheet.isAnimating,
    bottomSheetY: state.bottomSheet.y,

    // 필터 상태
    activeRegionFilter: state.activeRegionFilter,
    activeCategoryFilter: state.activeCategoryFilter,

    // 기본 액션들 (Context에서 가져온 것)
    setSearchValue: actions.setSearchValue,
    setSearchFocused: actions.setSearchFocused,
    clearSearch: actions.clearSearch,
    setBottomSheetStep: actions.setBottomSheetStep,
    setBottomSheetExpanded: actions.setBottomSheetExpanded,
    toggleBottomSheet: actions.toggleBottomSheet,
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

    // 바텀시트 통합 제어 액션들 (Context에서 가져온 것)
    setBottomSheetState: actions.setBottomSheetState,
    setBottomSheetY: actions.setBottomSheetY,
    setBottomSheetAnimating: actions.setBottomSheetAnimating,
    resetBottomSheet: actions.resetBottomSheet,

    // 바텀시트 통합 제어 편의 함수들 (이 훅에서 정의한 것)
    openBottomSheet,
    closeBottomSheet,
    setExplicitClosed,
    openMiddle,
    openExpanded,
    closeExplicitly,

    // 복합 액션들 (이 훅에서 정의한 것)
    showMymap,
    showFilter,
    selectCategoryAndNavigate,
    selectBrandAndReturn,
    backToList,
    clearFilters,
  };
};
