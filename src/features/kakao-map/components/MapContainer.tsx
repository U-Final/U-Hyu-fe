import React from 'react';

import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import MapWithMarkers from './marker/MapWithMarkers';

export const MapContainer: React.FC = () => {
  const { stores, mapCenter, userLocation, loading } = useMapData();
  const { handleMapCenterChange, handleMarkerClick, selectedMarkerId } = useMapInteraction();

  return (
    <MapWithMarkers
      center={mapCenter}
      stores={stores}
      currentLocation={userLocation}
      onStoreClick={handleMarkerClick}
      onCenterChange={handleMapCenterChange}
      isSearching={loading.stores}
      selectedStoreId={selectedMarkerId}
    />
  );
};
