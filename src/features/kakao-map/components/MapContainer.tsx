import React from 'react';
import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import MapWithMarkers from './marker/MapWithMarkers';

export const MapContainer: React.FC = () => {
  const { stores, mapCenter, userLocation } = useMapData();
  const { handleMapCenterChange, handleMarkerClick } = useMapInteraction();

  return (
    <MapWithMarkers
      center={mapCenter}
      stores={stores}
      currentLocation={userLocation}
      onStoreClick={handleMarkerClick}
      onCenterChange={handleMapCenterChange}
    />
  );
};
