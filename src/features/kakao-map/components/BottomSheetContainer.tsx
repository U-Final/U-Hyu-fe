import React from 'react';
import { useStoreSelection } from '../hooks/useStoreSelection';
import { useFilterNavigation } from '../hooks/useFilterNavigation';
import { PersistentBottomSheet } from './layout/PersistentBottomSheet';
import StoreListContent from './layout/StoreListContent';
import CategorySelectContent from './layout/steps/CategorySelectContent';
import BrandSelectContent from './layout/steps/BrandSelectContent';

export const BottomSheetContainer: React.FC = () => {
  const { stores, handleStoreClick } = useStoreSelection();
  const {
    selectedCategory,
    selectedBrand,
    currentBottomSheetStep,
    getCategoryDisplayName,
    getBrandsByCategory,
    handleShowFilter,
    handleCategorySelect,
    handleBrandSelect,
    handleBackToCategory,
    setBottomSheetStep,
  } = useFilterNavigation();

  const bottomSheetSteps = [
    {
      key: 'list',
      title: '주변 제휴 매장',
      subtitle:
        selectedCategory || selectedBrand
          ? `${getCategoryDisplayName(selectedCategory)}${selectedBrand ? ' > ' + selectedBrand : ''}`
          : undefined,
      showFilterButton: true,
      onFilterClick: handleShowFilter,
      content: (
        <StoreListContent
          stores={stores}
          onFilterClick={handleShowFilter}
          onStoreClick={handleStoreClick}
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
          onCategorySelect={handleCategorySelect}
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
          categoryDisplayName={getCategoryDisplayName(selectedCategory)}
          brands={getBrandsByCategory(selectedCategory)}
          selectedBrand={selectedBrand}
          onBrandSelect={handleBrandSelect}
          onBack={handleBackToCategory}
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
