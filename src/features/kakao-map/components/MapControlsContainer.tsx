import React, { useEffect, useState } from 'react';

import { useMapUIContext } from '../context/MapUIContext';
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

  // 바텀시트 REF 가져오기
  const { bottomSheetRef } = useMapUIContext();
  
  // 바텀시트 열림/닫힘 상태 추적
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 바텀시트 상태를 주기적으로 확인 (실제 위치 기반)
  useEffect(() => {
    const checkBottomSheetState = () => {
      if (bottomSheetRef?.current) {
        const currentPosition = bottomSheetRef.current.getCurrentPosition();
        // 바텀시트가 중간 지점보다 위에 있으면 열린 상태로 간주
        const isOpen = currentPosition < 300; // 임계값 조정 가능
        setIsBottomSheetOpen(isOpen);
      }
    };

    const interval = setInterval(checkBottomSheetState, 100); // 100ms마다 체크
    return () => clearInterval(interval);
  }, [bottomSheetRef]);

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

  // 바텀시트 토글 처리
  const handleToggleBottomSheet = () => {
    if (import.meta.env.MODE === 'development') {
      console.log('바텀시트 토글 버튼 클릭 - 현재 상태:', isBottomSheetOpen ? '열림' : '닫힘');
    }

    if (bottomSheetRef && bottomSheetRef.current) {
      bottomSheetRef.current.toggle();
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
      onToggleBottomSheet={handleToggleBottomSheet}
      isBottomSheetOpen={isBottomSheetOpen}
    />
  );
};
