import React from 'react';

import { FaFilter } from 'react-icons/fa';

import { MapDragBottomSheet } from './MapDragBottomSheet';

import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { useMapUI } from '../hooks/useMapUI';
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
  } = useMapUI();

  const handleCreateNewMap = () => {
    // 추후 새 지도 추가하는 곳으로 이동 구현하기
  };

  const handleSelectMap = (id: number) => {
    console.log(`지도 선택됨: ${id}`);
    // 선택된 지도 상세 보기 또는 이동 처리
  };

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
