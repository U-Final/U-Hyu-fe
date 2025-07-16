import { useCallback } from 'react';
import { useMapContext } from '../context/MapContext';
import { BRAND_MAPPING } from '../constants/brands';

export const useFilterNavigation = () => {
  const { state, actions } = useMapContext();

  const getCategoryDisplayName = useCallback((categoryKey: string): string => {
    const categoryNames: Record<string, string> = {
      activity: '액티비티',
      beauty: '뷰티/건강',
      shopping: '쇼핑',
      lifestyle: '생활/편의',
      food: '푸드',
      culture: '문화/여가',
      education: '교육',
      travel: '여행/교통',
    };
    return categoryNames[categoryKey] || categoryKey;
  }, []);

  const getBrandsByCategory = useCallback((category: string): string[] => {
    const brandMapping = BRAND_MAPPING;
    return brandMapping[category] || [];
  }, []);

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
