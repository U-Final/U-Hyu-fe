import { useCallback } from 'react';
import { useMapUIContext } from '../context/MapUIContext';

export const useMapUI = () => {
  const { state, actions } = useMapUIContext();

  // 복합 액션들
  const showFilter = useCallback(() => {
    actions.setBottomSheetStep('category');
    actions.setBottomSheetExpanded(true);
  }, [actions]);

  const selectCategoryAndNavigate = useCallback(
    (category: string) => {
      actions.setSelectedCategory(category);
      actions.setBottomSheetStep('brand');
    },
    [actions]
  );

  const selectBrandAndReturn = useCallback(
    (brand: string) => {
      actions.setSelectedBrand(brand);
      actions.setBottomSheetStep('list');
    },
    [actions]
  );

  const backToList = useCallback(() => {
    actions.setBottomSheetStep('list');
  }, [actions]);

  return {
    // UI 상태
    searchValue: state.searchValue,
    isSearchFocused: state.isSearchFocused,
    currentBottomSheetStep: state.currentBottomSheetStep,
    isBottomSheetExpanded: state.isBottomSheetExpanded,
    selectedCategory: state.selectedCategory,
    selectedBrand: state.selectedBrand,
    selectedMarkerId: state.selectedMarkerId,

    // 기본 액션
    ...actions,

    // 복합 액션
    showFilter,
    selectCategoryAndNavigate,
    selectBrandAndReturn,
    backToList,
  };
};
