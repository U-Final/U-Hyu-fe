import React from 'react';

import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import MapWithMarkers from './marker/MapWithMarkers';
import type { MapDragBottomSheetRef } from './MapDragBottomSheet';

interface MapContainerProps {
  bottomSheetRef: React.RefObject<MapDragBottomSheetRef | null>;
}

export const MapContainer: React.FC<MapContainerProps> = ({ bottomSheetRef }) => {
  const { stores, mapCenter, userLocation, loading } = useMapData();
  const { handleMapCenterChange, handleMapMarkerClick, selectedMarkerId } = useMapInteraction(bottomSheetRef);

  return (
    <MapWithMarkers
      center={mapCenter}
      stores={stores}
      currentLocation={userLocation}
      onStoreClick={handleMapMarkerClick}
      onCenterChange={handleMapCenterChange}
      isSearching={loading.stores}
      selectedStoreId={selectedMarkerId}
    />
  );
};
