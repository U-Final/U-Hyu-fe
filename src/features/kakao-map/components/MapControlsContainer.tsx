import React from 'react';

import { useMapUI } from '../hooks/useMapUI';
import { useMapUIContext } from '../context/MapUIContext';
import MapTopControls from './layout/MapTopControls';

/**
 * 지도 상단 컨트롤 컨테이너 컴포넌트
 * 검색, 필터 등 지도 상단의 모든 UI 컨트롤을 관리
 */
export const MapControlsContainer: React.FC = () => {
  // UI 상태와 액션들 가져오기
  const {
    searchValue,
    setSearchValue,
    setSearchFocused,
    activeRegionFilter,
    setRegionFilter,
    setCategoryFilter,
    activeCategoryFilter,
  } = useMapUI();
  
  // 바텀시트 REF 가져오기
  const { bottomSheetRef } = useMapUIContext();

  // 검색 실행 처리 (엔터키 입력 시)
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  // 검색 취소 처리 (X 버튼 클릭 시)
  const handleSearchCancel = () => {
    setSearchValue('');
    setSearchFocused(false);
  };

  // 지역 필터 변경 처리
  const handleRegionFilterChange = (region: string) => {
    if (import.meta.env.MODE === 'development') {
      console.log('지역 필터 변경:', region);
    }
    setRegionFilter(region);
  };

  // 카테고리 필터 변경 처리
  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter(category);
  };

  // 매장 목록 보기 버튼 클릭 시 바텀시트 열기
  const handleShowStoreList = () => {
    if (import.meta.env.MODE === 'development') {
      console.log('매장 목록 버튼 클릭 - 바텀시트 열기');
    }
    
    // REF를 통해 바텀시트 중간 위치로 열기
    if (bottomSheetRef && bottomSheetRef.current) {
      bottomSheetRef.current.openMiddle();
    }
  };

  return (
    <MapTopControls
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      onSearch={handleSearch}
      onSearchCancel={handleSearchCancel}
      activeRegionFilter={activeRegionFilter}
      onRegionFilterChange={handleRegionFilterChange}
      activeCategoryFilter={activeCategoryFilter}
      onCategoryFilterChange={handleCategoryFilterChange}
      onShowStoreList={handleShowStoreList}
    />
  );
};
