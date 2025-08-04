import React, { useCallback, useEffect, useMemo } from 'react';

import type { NormalizedPlace } from '../api/types';
import { getFilterCategoryForKakao } from '../config/categoryMapping';
import { useMapUIContext } from '../context/MapUIContext';
import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { useMapUI } from '../hooks/useMapUI';
import type { Store } from '../types/store';
import MapWithMarkers from './marker/MapWithMarkers';

interface MapContainerProps {
  keywordResults?: NormalizedPlace[];
  selectedPlace?: NormalizedPlace | null;
  onPlaceClick?: (place: NormalizedPlace) => void;
  onPlaceInfoClose?: () => void;
  onMapCenterUpdate?: (
    setMapCenter: (center: { lat: number; lng: number }) => void
  ) => void;
  onMapCenterChange?: (center: { lat: number; lng: number }) => void;
  onMapCreate?: (map: kakao.maps.Map) => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  keywordResults = [],
  selectedPlace,
  onPlaceClick,
  onPlaceInfoClose,
  onMapCenterUpdate,
  onMapCenterChange,
  onMapCreate,
}) => {
  const { stores, mapCenter, userLocation, loading, setMapCenter } =
    useMapData();
  const { handleMapCenterChange, handleMapMarkerClick, selectedMarkerId } =
    useMapInteraction();
  const { bottomSheetRef } = useMapUIContext();
  const { activeCategoryFilter } = useMapUI();

  // 지도 인스턴스를 저장할 ref
  const [map, setMap] = React.useState<kakao.maps.Map | null>(null);

  // 매장 데이터는 이미 useMapData에서 백엔드 API를 통해 필터링됨
  // 추가 프론트엔드 필터링 불필요

  // 카테고리 필터가 적용된 키워드 검색 결과
  const filteredKeywordResults = useMemo(() => {
    if (activeCategoryFilter === 'all') {
      return keywordResults;
    }

    return keywordResults.filter(place => {
      // 카카오 카테고리 그룹 코드가 있는 경우
      if (place.categoryGroupCode) {
        const filterCategory = getFilterCategoryForKakao(
          place.categoryGroupCode
        );
        return filterCategory === activeCategoryFilter;
      }

      // 카테고리 그룹 코드가 없는 경우 category 문자열로 판단
      // 간단한 키워드 매칭으로 필터링
      const category = place.category.toLowerCase();
      switch (activeCategoryFilter) {
        case 'shopping':
          return (
            category.includes('마트') ||
            category.includes('편의점') ||
            category.includes('쇼핑')
          );
        case 'food':
          return (
            category.includes('음식점') ||
            category.includes('카페') ||
            category.includes('레스토랑')
          );
        case 'life':
          return (
            category.includes('은행') ||
            category.includes('편의') ||
            category.includes('공공기관')
          );
        case 'culture':
          return (
            category.includes('문화') ||
            category.includes('관광') ||
            category.includes('공연')
          );
        case 'beauty':
          return (
            category.includes('병원') ||
            category.includes('약국') ||
            category.includes('의료')
          );
        case 'activity':
          return category.includes('주차') || category.includes('스포츠');
        case 'education':
          return (
            category.includes('학교') ||
            category.includes('학원') ||
            category.includes('교육')
          );
        case 'travel':
          return (
            category.includes('숙박') ||
            category.includes('호텔') ||
            category.includes('교통')
          );
        default:
          return true;
      }
    });
  }, [keywordResults, activeCategoryFilter]);

  // setMapCenter 함수를 상위 컴포넌트로 전달
  useEffect(() => {
    if (onMapCenterUpdate) {
      onMapCenterUpdate(setMapCenter);
    }
  }, [onMapCenterUpdate, setMapCenter]);

  // 지도 중심 변경을 상위 컴포넌트에 알림
  useEffect(() => {
    if (onMapCenterChange) {
      onMapCenterChange(mapCenter);
    }
  }, [mapCenter, onMapCenterChange]);

  // 지도 마커 클릭시 ref를 통해 바텀시트 제어
  const handleMarkerClickWithBottomSheet = useCallback(
    (store: Store) => {
      // 바텀시트 명시적 닫힘 플래그 설정 후 닫기
      if (bottomSheetRef && bottomSheetRef.current) {
        bottomSheetRef.current.setExplicitlyClosed(true);
        bottomSheetRef.current.close();
      }

      // 매장 선택 처리
      handleMapMarkerClick(store);
    },
    [bottomSheetRef, handleMapMarkerClick]
  );

  return (
    <MapWithMarkers
      center={mapCenter}
      stores={stores}
      keywordResults={filteredKeywordResults}
      selectedPlace={selectedPlace}
      currentLocation={userLocation}
      onStoreClick={handleMarkerClickWithBottomSheet}
      onPlaceClick={onPlaceClick}
      onPlaceInfoClose={onPlaceInfoClose}
      onCenterChange={handleMapCenterChange}
      isSearching={loading.stores}
      selectedStoreId={selectedMarkerId}
      onMapCreate={(mapInstance) => {
        setMap(mapInstance);
        onMapCreate?.(mapInstance);
      }}
      map={map}
    />
  );
};
