import React from 'react';
import { useMapContext } from '../context/MapContext';
import { useLocationStore } from '../store/LocationStore';
import { useStoreSelection } from '../hooks/useStoreSelection';
import MapWithMarkers from './marker/MapWithMarkers';

export const MapContainer: React.FC = () => {
  const { state, actions } = useMapContext();
  const currentLocation = useLocationStore(state => state.currentLocation);
  const { handleStoreClick } = useStoreSelection();

  // 지도 중심점 변경 핸들러
  const handleCenterChange = (newCenter: { lat: number; lng: number }) => {
    actions.setCenter(newCenter);
  };

  return (
    <MapWithMarkers
      center={state.center}
      stores={state.stores}
      currentLocation={currentLocation}
      onStoreClick={handleStoreClick}
      onCenterChange={handleCenterChange}
    />
  );
};
