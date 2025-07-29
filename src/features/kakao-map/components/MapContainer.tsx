import React, { useCallback } from 'react';

import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { useMapUIContext } from '../context/MapUIContext';
import type { Store } from '../types/store';
import MapWithMarkers from './marker/MapWithMarkers';

export const MapContainer: React.FC = () => {
  const { stores, mapCenter, userLocation, loading } = useMapData();
  const { handleMapCenterChange, handleMapMarkerClick, selectedMarkerId } =
    useMapInteraction();
  const { bottomSheetRef } = useMapUIContext();

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
      currentLocation={userLocation}
      onStoreClick={handleMarkerClickWithBottomSheet}
      onCenterChange={handleMapCenterChange}
      isSearching={loading.stores}
      selectedStoreId={selectedMarkerId}
    />
  );
};
