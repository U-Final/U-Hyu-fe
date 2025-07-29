import React, { useEffect, useState } from 'react';

import { checkKakaoApiKeyStatus } from '../api/keywordSearchApi';
import { useMapUIContext } from '../context/MapUIContext';
import { useKeywordSearch } from '../hooks/useKeywordSearch';
import { useMapUI } from '../hooks/useMapUI';
import MapTopControls from './layout/MapTopControls';

import type { NormalizedPlace } from '../api/types';

interface MapControlsContainerProps {
  onKeywordSearchResults?: (results: NormalizedPlace[]) => void;
  keywordResults?: NormalizedPlace[];
  onClearMarkers?: () => void;
}

/**
 * 지도 상단 컨트롤 컨테이너 컴포넌트
 * 검색, 필터 등 지도 상단의 모든 UI 컨트롤을 관리
 */
export const MapControlsContainer: React.FC<MapControlsContainerProps> = ({
  onKeywordSearchResults,
  keywordResults = [],
  onClearMarkers,
}) => {
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

  // 키워드 검색 훅
  const {
    keyword,
    results,
    loading,
    selectedPlace,
    setKeyword,
    search,
    selectPlace,
    clearResults,
    clearError,
  } = useKeywordSearch();

  // 바텀시트 REF 가져오기
  const { bottomSheetRef } = useMapUIContext();
  
  // 바텀시트 열림/닫힘 상태 추적
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 카카오 API 키 상태 확인 (개발 모드에서만)
  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      const apiKeyStatus = checkKakaoApiKeyStatus();
      console.log('🔑 카카오 API 키 상태:', apiKeyStatus);
    }
  }, []);

  // searchValue와 keyword 동기화
  useEffect(() => {
    if (searchValue !== keyword) {
      setKeyword(searchValue);
    }
  }, [searchValue, keyword, setKeyword]);

  // 검색 결과를 상위 컴포넌트로 전달
  useEffect(() => {
    if (onKeywordSearchResults) {
      onKeywordSearchResults(results);
    }
  }, [results, onKeywordSearchResults]);

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
  const handleSearch = async (value: string) => {
    if (import.meta.env.MODE === 'development') {
      console.log('MapControlsContainer - handleSearch 호출됨, 검색어:', value);
    }
    
    if (value.trim()) {
      try {
        if (import.meta.env.MODE === 'development') {
          console.log('검색 시작:', value.trim());
        }
        await search(value.trim());
        if (import.meta.env.MODE === 'development') {
          console.log('검색 완료:', value);
        }
      } catch (error) {
        if (import.meta.env.MODE === 'development') {
          console.error('검색 실패:', error);
        }
      }
    } else {
      if (import.meta.env.MODE === 'development') {
        console.log('검색어가 비어있음');
      }
    }
  };

  // 검색어 변경 처리
  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
    setKeyword(value);
  };

  // 검색 취소 처리 (X 버튼 클릭 시)
  const handleSearchCancel = () => {
    setSearchValue('');
    setKeyword('');
    setSearchFocused(false);
    clearResults();
    clearError();
    onClearMarkers?.(); // 마커도 함께 지우기
  };

  // 검색 결과 닫기 처리 (외부 클릭 또는 ESC 키)
  const handleCloseSearchResults = () => {
    // 검색어는 유지하되 검색 결과만 숨김 (사용자가 다시 볼 수 있도록)
    clearResults();
    clearError();
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
      onSearchValueChange={handleSearchValueChange}
      onSearch={handleSearch}
      onSearchCancel={handleSearchCancel}
      activeRegionFilter={activeRegionFilter}
      onRegionFilterChange={handleRegionFilterChange}
      activeCategoryFilter={activeCategoryFilter}
      onCategoryFilterChange={handleCategoryFilterChange}
      onToggleBottomSheet={handleToggleBottomSheet}
      isBottomSheetOpen={isBottomSheetOpen}
      keywordResults={keywordResults}
      isSearching={loading}
      selectedPlace={selectedPlace}
      onSearchResultClick={selectPlace}
      onCloseSearchResults={handleCloseSearchResults}
    />
  );
};
