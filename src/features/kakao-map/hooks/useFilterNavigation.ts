import { useCallback } from 'react';
import { useMapContext } from '../context/MapContext';

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
    const brandMapping: Record<string, string[]> = {
      lifestyle: ['GS25', '펫생각', '셀로', '다락'],
      food: ['스타벅스', '투썸플레이스', '이디야', '파리바게뜨'],
      beauty: ['올리브영', '아리따움', '롭스', '왓슨스'],
      shopping: ['이마트', '홈플러스', '롯데마트', '코스트코'],
      culture: ['CGV', '롯데시네마', '메가박스', '교보문고'],
      activity: ['피트니스클럽', '골프장', '볼링장', '당구장'],
      education: ['해커스', '시원스쿨', '에듀윌', '종로학원'],
      travel: ['하나투어', '모두투어', '노랑풍선', '온라인투어'],
    };
    return brandMapping[category] || [];
  }, []);

  const handleShowFilter = useCallback(() => {
    console.log('🔍 필터 설정 시작 - 카테고리 선택 화면으로 이동');
    actions.setBottomSheetStep('category');
  }, [actions]);

  const handleCategorySelect = useCallback(
    (categoryKey: string) => {
      console.log('📂 카테고리 선택:', categoryKey);
      actions.setSelectedCategory(categoryKey);
      actions.setBottomSheetStep('brand');
    },
    [actions]
  );

  const handleBrandSelect = useCallback(
    (brandName: string) => {
      console.log('🏢 브랜드 선택:', brandName);
      actions.setSelectedBrand(brandName);
      actions.setBottomSheetStep('list');
      // TODO: 실제 필터링 로직 적용
    },
    [actions]
  );

  const handleBackToCategory = useCallback(() => {
    console.log('⬅️ 카테고리 선택 화면으로 돌아가기');
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
