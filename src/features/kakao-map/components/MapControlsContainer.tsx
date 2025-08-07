import React, { useEffect, useState } from 'react';

import { MapControlsContainer as MapButtonsContainer } from '@kakao-map/components/controls/MapControlsContainer';
import { useParams } from 'react-router-dom';

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
  /** 자동 실시간 검색 활성화 여부 */
  enableAutoSearch?: boolean;
  /** 디바운스 지연 시간 (밀리초) */
  debounceDelay?: number;
  /** 현재 지도 중심 좌표 */
  mapCenter?: { lat: number; lng: number };
  /** 검색 결과를 유지한 채로 아이템 선택 (검색창은 닫지 않음) */
  onSearchResultItemClick?: (place: NormalizedPlace) => void;
  /** 지도 인스턴스 (줌 레벨 표시용) */
  map?: kakao.maps.Map | null;
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
  enableAutoSearch = true,
  debounceDelay = Number(import.meta.env.VITE_SEARCH_DEBOUNCE_DELAY) || 500,
  mapCenter,
  onSearchResultItemClick,
  map,
}) => {
  const {
    searchValue,
    setSearchValue,
    setSearchFocused,
    activeRegionFilter,
    setRegionFilter,
    setCategoryFilter,
    activeCategoryFilter,
  } = useMapUI();
  const {
    keyword,
    results,
    loading,
    meta,
    hasSearched,
    selectedPlace,
    setKeyword,
    search,
    selectPlace,
    clearResults,
    clearError,
    hideSearchResults,
  } = useKeywordSearch({
    autoSearchEnabled: enableAutoSearch,
    debounceDelay,
    mapCenter,
    searchRadius: 5000,
  });

  const { bottomSheetRef } = useMapUIContext();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  useEffect(() => {
    if (searchValue !== keyword) {
      setKeyword(searchValue);
    }
  }, [searchValue, keyword, setKeyword]);
  useEffect(() => {
    if (onKeywordSearchResults) {
      onKeywordSearchResults(results);
    }
  }, [results, onKeywordSearchResults]);
  const BOTTOM_SHEET_THRESHOLD = 300;

  useEffect(() => {
    const checkBottomSheetState = () => {
      if (bottomSheetRef?.current) {
        const currentPosition = bottomSheetRef.current.getCurrentPosition();
        const isOpen = currentPosition < BOTTOM_SHEET_THRESHOLD;
        setIsBottomSheetOpen(isOpen);
      }
    };

    checkBottomSheetState();

    const observer = new MutationObserver(() => {
      setTimeout(checkBottomSheetState, 50);
    });

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

  const handleSearch = async (value: string) => {
    if (value.trim()) {
      try {
        await search(value.trim());
      } catch {
        // 에러는 상위 컴포넌트에서 처리됨
      }
    }
  };

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
    setKeyword(value);
  };

  const handleSearchCancel = () => {
    setSearchValue('');
    setKeyword('');
    setSearchFocused(false);
    clearResults();
    clearError();
    onClearMarkers?.();
  };

  const handleCloseSearchResults = () => {
    clearResults();
    clearError();
    onCloseSearchResults?.();
  };

  const handleCloseSearchResultsForItemClick = () => {
    onCloseSearchResults?.();
    hideSearchResults();
  };

  const handleRegionFilterChange = (region: string) => {
    setRegionFilter(region);
  };

  const handleCategoryFilterChange = (category: string) => {
    setCategoryFilter(category);
  };

  const handleToggleBottomSheet = () => {
    if (bottomSheetRef && bottomSheetRef.current) {
      bottomSheetRef.current.toggle();
    }
  };
  const handleSearchResultClick = (place: NormalizedPlace) => {
    if (onSearchResultItemClick) {
      onSearchResultItemClick(place);
    } else {
      handleCloseSearchResultsForItemClick();
      onPlaceClick?.(place);
    }

    selectPlace(place);

    if (mapCenterSetter) {
      const offset = 0.0017;
      const targetLat = place.latitude + offset;
      const targetLng = place.longitude;

      mapCenterSetter({
        lat: targetLat,
        lng: targetLng,
      });
    }

    clearError();
  };

  const { uuid } = useParams();
  const isShared = !!uuid;

  return isShared ? null : (
    <div>
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
        searchMeta={meta}
        hasSearched={hasSearched}
        map={map}
      />
      <MapButtonsContainer hideWhenSearching={keywordResults.length > 0} />
    </div>
  );
};
