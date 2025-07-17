import React from 'react';
import { useMapContext } from '../context/MapContext';
import { useLocationStore } from '../store/LocationStore';
import { useStoreSelection } from '../hooks/useStoreSelection';
import MapWithMarkers from './marker/MapWithMarkers';

export const MapContainer: React.FC = () => {
  const { state } = useMapContext();
  const currentLocation = useLocationStore(state => state.currentLocation);
  const { handleStoreClick } = useStoreSelection();

  return (
    <MapWithMarkers
      center={state.center}
      stores={state.stores}
      currentLocation={currentLocation}
      onStoreClick={handleStoreClick}
    />
  );
};
