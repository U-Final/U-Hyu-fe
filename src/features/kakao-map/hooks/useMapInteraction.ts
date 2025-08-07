import { useCallback } from 'react';

import type { Store } from '../types/store';
import { useMapData } from './useMapData';
import { useMapUI } from './useMapUI';

export const useMapInteraction = (mapRef?: React.RefObject<kakao.maps.Map>) => {
  const { selectStore, setMapCenter } = useMapData();
  const { setSelectedMarker, selectedMarkerId } = useMapUI();

  const handleStoreSelect = useCallback(
    (store: Store) => {
      setSelectedMarker(store.storeId);
      selectStore(store);
      setMapCenter({ lat: store.latitude, lng: store.longitude });
      
      if (mapRef?.current) {
        mapRef.current.setLevel(4);
      }
    },
    [selectStore, setMapCenter, setSelectedMarker, mapRef]
  );

  const handleMapCenterChange = useCallback(
    (newCenter: { lat: number; lng: number }) => {
      setMapCenter(newCenter);
    },
    [setMapCenter]
  );

  const handleMapMarkerClick = useCallback(
    (store: Store) => {

      handleStoreSelect(store);
    },
    [handleStoreSelect]
  );

  const handleMarkerClick = useCallback(
    (store: Store) => {

      handleStoreSelect(store);
    },
    [handleStoreSelect]
  );

  return {
    selectedMarkerId,
    handleStoreSelect,
    handleMapCenterChange,
    handleMarkerClick,
    handleMapMarkerClick,
  };
};
