import React from 'react';
import { useLocationStore } from '../../store/LocationStore';
import { useMapControls } from '../../hooks/useMapContols';
import LocationButton from './LocationButton';

export const LocationControlContainer: React.FC = () => {
  const isLocationLoading = useLocationStore(state => state.isLoading);
  const { handleLocationClick } = useMapControls();

  return (
    <div className="absolute bottom-32 right-4 z-10">
      <LocationButton
        onClick={handleLocationClick}
        isLoading={isLocationLoading}
      />
    </div>
  );
};
