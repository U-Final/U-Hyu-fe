import React from 'react';
import { useMapUI } from '../hooks/useMapUI';
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

  /**
   * 검색 실행 핸들러
   * 엔터키 입력 시 호출됨
   */
  const handleSearch = (value: string) => {
    setSearchValue(value);
    // 검색어가 변경되면 useMapData에서 자동으로 API 호출
  };

  /**
   * 검색 취소 핸들러
   * X 버튼 클릭 시 호출됨
   */
  const handleSearchCancel = () => {
    setSearchValue('');
    setSearchFocused(false);
  };

  /**
   * 지역 필터 변경 핸들러
   * RegionFilterDropdown에서 선택 시 호출됨
   */
  const handleRegionFilterChange = (region: string) => {
    setRegionFilter(region);
    // 지역 필터 변경 시 useMapData에서 자동으로 API 호출
  };

  /**
   * 카테고리 필터 변경 핸들러
   * FilterTabs에서 선택 시 호출됨
   */
  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter(category);
    // 카테고리 필터 변경 시 useMapData에서 자동으로 API 호출
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
    />
  );
};
