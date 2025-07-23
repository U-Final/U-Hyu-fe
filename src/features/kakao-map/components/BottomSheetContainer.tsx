import React from 'react';

import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { useMapUI } from '../hooks/useMapUI';
import { PersistentBottomSheet } from './layout/PersistentBottomSheet';
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
    setBottomSheetStep,
  } = useMapUI();

  const bottomSheetSteps = [
    {
      key: 'list',
      title: '주변 제휴 매장',
      subtitle:
        selectedCategory || selectedBrand
          ? `${selectedCategory}${selectedBrand ? ' > ' + selectedBrand : ''}`
          : undefined,
      showFilterButton: true,
      onFilterClick: showFilter,
      showMymapButton: true,
      onMymapClick: () => setBottomSheetStep('mymap'),
      content: (
        <StoreListContent
          stores={stores}
          onFilterClick={showFilter}
          onStoreClick={handleStoreSelect}
        />
      ),
    },
    {
      key: 'mymap',
      title: 'My Map',
      showBackButton: true,
      content: (
        <div>
          바텀시트 본문에 렌더링될 컴포넌트: 기본 mymap 화면을 구현하면된다
        </div>
      ),
    },
    {
      key: 'category',
      title: '필터',
      showBackButton: true,
      content: (
        <CategorySelectContent
          selectedCategory={selectedCategory}
          onCategorySelect={selectCategoryAndNavigate}
        />
      ),
    },
    {
      key: 'brand',
      title: '필터',
      showBackButton: true,
      content: (
        <BrandSelectContent
          categoryKey={selectedCategory}
          categoryDisplayName={selectedCategory}
          brands={[]} // TODO: 브랜드 데이터 구현 필요
          selectedBrand={selectedBrand}
          onBrandSelect={selectBrandAndReturn}
          onBack={backToList}
        />
      ),
    },
  ];

  return (
    <PersistentBottomSheet
      steps={bottomSheetSteps}
      currentStepKey={currentBottomSheetStep}
      onStepChange={step =>
        setBottomSheetStep(step as 'list' | 'category' | 'brand' | 'mymap')
      }
      minHeight={80}
      maxHeight={500}
      defaultExpanded={true}
      bottomNavHeight={30}
    />
  );
};
