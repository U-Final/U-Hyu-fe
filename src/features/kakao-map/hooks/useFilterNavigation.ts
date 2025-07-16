import { useCallback } from 'react';
import { useMapContext } from '../context/MapContext';
import { CATEGORY_CONFIGS } from '../types/category';

export const useFilterNavigation = () => {
  const { state, actions } = useMapContext();

  const getCategoryDisplayName = useCallback((categoryKey: string): string => {
    const categoryConfig =
      CATEGORY_CONFIGS[categoryKey as keyof typeof CATEGORY_CONFIGS];
    return categoryConfig?.name || categoryKey;
  }, []);

  const getBrandsByCategory = useCallback(
    (category: string): string[] => {
      // 실제 매장 데이터에서 해당 카테고리의 브랜드 목록을 추출
      const stores = state.stores;
      const brands = new Set<string>();

      stores.forEach(store => {
        if (store.categoryName === category) {
          brands.add(store.brandName);
        }
      });

      return Array.from(brands).sort();
    },
    [state.stores]
  );

  const handleShowFilter = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 필터 설정 시작 - 카테고리 선택 화면으로 이동');
    }
    actions.setBottomSheetStep('category');
  }, [actions]);

  const handleCategorySelect = useCallback(
    (categoryKey: string) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📂 카테고리 선택:', categoryKey);
      }
      actions.setSelectedCategory(categoryKey);
      actions.setBottomSheetStep('brand');
    },
    [actions]
  );

  const handleBrandSelect = useCallback(
    (brandName: string) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🏢 브랜드 선택:', brandName);
      }
      actions.setSelectedBrand(brandName);
      actions.setBottomSheetStep('list');
      // TODO: 실제 필터링 로직 적용
    },
    [actions]
  );

  const handleBackToCategory = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('⬅️ 카테고리 선택 화면으로 돌아가기');
    }
    actions.setBottomSheetStep('category');
  }, [actions]);

  return {
    selectedCategory: state.selectedCategory,
    selectedBrand: state.selectedBrand,
    currentBottomSheetStep: state.currentBottomSheetStep,
    getCategoryDisplayName,
    getBrandsByCategory,
    handleShowFilter,
    handleCategorySelect,
    handleBrandSelect,
    handleBackToCategory,
    setBottomSheetStep: actions.setBottomSheetStep,
  };
};
