import React from 'react';
import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import MapWithMarkers from './marker/MapWithMarkers';

interface MapContainerProps {
  // Props removed - distance-based search is now always enabled
}

export const MapContainer: React.FC<MapContainerProps> = () => {
  const { stores, mapCenter, userLocation, loading } = useMapData();
  const { handleMapCenterChange, handleMarkerClick } = useMapInteraction();

  return (
    <MapWithMarkers
      center={mapCenter}
      stores={stores}
      currentLocation={userLocation}
      onStoreClick={handleMarkerClick}
      onCenterChange={handleMapCenterChange}
      isSearching={loading.stores}
    />
  );
};
