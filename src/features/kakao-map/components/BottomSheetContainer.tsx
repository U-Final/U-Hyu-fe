import React from 'react';
import { useMapData } from '../hooks/useMapData';
import { useMapUI } from '../hooks/useMapUI';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { PersistentBottomSheet } from './layout/PersistentBottomSheet';
import StoreListContent from './layout/StoreListContent';
import CategorySelectContent from './layout/steps/CategorySelectContent';
import BrandSelectContent from './layout/steps/BrandSelectContent';

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
      content: (
        <StoreListContent
          stores={stores}
          onFilterClick={showFilter}
          onStoreClick={handleStoreSelect}
        />
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
        setBottomSheetStep(step as 'list' | 'category' | 'brand')
      }
      minHeight={80}
      maxHeight={500}
      defaultExpanded={true}
      bottomNavHeight={30}
    />
  );
};
