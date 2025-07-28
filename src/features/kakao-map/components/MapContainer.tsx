import React, { useCallback, useEffect } from 'react';

import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { useMapUIContext } from '../context/MapUIContext';
import type { NormalizedPlace } from '../api/types';
import type { Store } from '../types/store';
import MapWithMarkers from './marker/MapWithMarkers';

interface MapContainerProps {
  keywordResults?: NormalizedPlace[];
  selectedPlace?: NormalizedPlace | null;
  onPlaceClick?: (place: NormalizedPlace) => void;
  onPlaceInfoClose?: () => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  keywordResults = [],
  selectedPlace,
  onPlaceClick,
  onPlaceInfoClose,
}) => {
  const { stores, mapCenter, userLocation, loading } = useMapData();
  const { handleMapCenterChange, handleMapMarkerClick, selectedMarkerId } =
    useMapInteraction();
  const { bottomSheetRef } = useMapUIContext();

  // 키워드 검색 결과 디버깅
  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('🗺️ MapContainer - 검색 결과 수신:', {
        keywordResultsLength: keywordResults.length,
        keywordResults,
        selectedPlace
      });
    }
  }, [keywordResults, selectedPlace]);

  // 지도 마커 클릭시 ref를 통해 바텀시트 제어
  const handleMarkerClickWithBottomSheet = useCallback((store: Store) => {
    // 바텀시트 명시적 닫힘 플래그 설정 후 닫기
    if (bottomSheetRef && bottomSheetRef.current) {
      bottomSheetRef.current.setExplicitlyClosed(true);
      bottomSheetRef.current.close();
    }

    // 매장 선택 처리
    handleMapMarkerClick(store);
  }, [bottomSheetRef, handleMapMarkerClick]);


  return (
    <MapWithMarkers
      center={mapCenter}
      stores={stores}
      keywordResults={keywordResults}
      selectedPlace={selectedPlace}
      currentLocation={userLocation}
      onStoreClick={handleMarkerClickWithBottomSheet}
      onPlaceClick={onPlaceClick}
      onPlaceInfoClose={onPlaceInfoClose}
      onCenterChange={handleMapCenterChange}
      isSearching={loading.stores}
      selectedStoreId={selectedMarkerId}
    />
  );
};
