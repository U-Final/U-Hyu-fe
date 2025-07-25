import React from 'react';

import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import MapWithMarkers from './marker/MapWithMarkers';

export const MapContainer: React.FC = () => {
  const { stores, mapCenter, userLocation, loading } = useMapData();
  const { handleMapCenterChange, handleMapMarkerClick, selectedMarkerId } =
    useMapInteraction();

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
