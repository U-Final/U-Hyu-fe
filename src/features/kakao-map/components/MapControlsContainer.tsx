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

  // 바텀시트 상태 동기화 (이벤트 기반으로 개선)
  const BOTTOM_SHEET_THRESHOLD = 300;

  useEffect(() => {
    const checkBottomSheetState = () => {
      if (bottomSheetRef?.current) {
        const currentPosition = bottomSheetRef.current.getCurrentPosition();
        const isOpen = currentPosition < BOTTOM_SHEET_THRESHOLD;
        setIsBottomSheetOpen(isOpen);
      }
    };

    // 초기 상태 확인
    checkBottomSheetState();

    // 바텀시트 상태 변경을 감지하기 위한 MutationObserver 설정
    const observer = new MutationObserver(() => {
      // DOM 변경 시 바텀시트 상태 재확인
      setTimeout(checkBottomSheetState, 50);
    });

    // 바텀시트 요소가 있을 때만 관찰 시작
    if (bottomSheetRef?.current) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    }

    return () => {
      observer.disconnect();
    };
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
      console.log(
        '바텀시트 토글 버튼 클릭 - 현재 상태:',
        isBottomSheetOpen ? '열림' : '닫힘'
      );
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
