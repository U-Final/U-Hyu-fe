import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { getKakaoApiKeyStatus } from '../api/keywordSearchApi';
import type { NormalizedPlace } from '../api/types';
import { useMapUIContext } from '../context/MapUIContext';
import { useKeywordSearch } from '../hooks/useKeywordSearch';
import { useMapUI } from '../hooks/useMapUI';
import MapTopControls from './layout/MapTopControls';

interface MapControlsContainerProps {
  onKeywordSearchResults?: (results: NormalizedPlace[]) => void;
  keywordResults?: NormalizedPlace[];
  onClearMarkers?: () => void;
  onCloseSearchResults?: () => void;
  mapCenterSetter?: ((center: { lat: number; lng: number }) => void) | null;
  onPlaceClick?: (place: NormalizedPlace) => void;
}

/**
 * 지도 상단 컨트롤 컨테이너 컴포넌트
 * 검색, 필터 등 지도 상단의 모든 UI 컨트롤을 관리
 */
export const MapControlsContainer: React.FC<MapControlsContainerProps> = ({
  onKeywordSearchResults,
  keywordResults = [],
  onClearMarkers,
  onCloseSearchResults,
  mapCenterSetter,
  onPlaceClick,
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
      const apiKeyStatus = getKakaoApiKeyStatus();
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

  // 바텀시트 상태 동기화 (MutationObserver 기반으로 개선)
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

    // MapPage의 keywordResults 상태도 초기화하여 검색 결과 리스트 닫기
    onCloseSearchResults?.();
  };

  // 검색 결과 아이템 클릭 전용 닫기 처리 (selectedPlace 유지)
  const handleCloseSearchResultsForItemClick = () => {
    // clearResults()를 호출하지 않고 MapPage의 keywordResults만 초기화
    // 이렇게 하면 useKeywordSearch의 selectedPlace가 유지됨
    onCloseSearchResults?.();
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

    if (import.meta.env.MODE === 'development') {
      console.log('🔍 카테고리 필터 변경:', {
        category,
        note: 'API 재요청 실행됨 - 새로운 매장 목록으로 마커 업데이트',
      });
    }
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

  // 검색 결과 아이템 클릭 처리 (마커 클릭과 동일한 효과)
  const handleSearchResultClick = (place: NormalizedPlace) => {
    // 검색 결과 리스트 먼저 닫기 (selectedPlace 유지)
    handleCloseSearchResultsForItemClick();

    // MapPage의 selectedPlace 상태 업데이트 (인포윈도우 표시용)
    onPlaceClick?.(place);

    // useKeywordSearch 훅의 selectedPlace 업데이트 (검색 결과 하이라이트용)
    selectPlace(place);

    // 지도 중심을 해당 위치로 이동 (인포윈도우가 화면 중앙에 오도록 오프셋 적용)
    if (mapCenterSetter) {
      const offset = 0.0017;
      const targetLat = place.latitude + offset;
      const targetLng = place.longitude;

      mapCenterSetter({
        lat: targetLat,
        lng: targetLng,
      });

      if (import.meta.env.MODE === 'development') {
        console.log('🎯 지도 이동 - 검색 결과 클릭:', {
          place: place.name,
          coordinates: { lat: targetLat, lng: targetLng },
        });
      }
    }

    if (import.meta.env.MODE === 'development') {
      console.log('🎯 검색 결과 아이템 클릭:', place.name);
    }
  };

  const { uuid } = useParams();
  const isShared = !!uuid;

  return isShared ? null : (
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
      onSearchResultClick={handleSearchResultClick}
      onCloseSearchResults={handleCloseSearchResults}
    />
  );
};
