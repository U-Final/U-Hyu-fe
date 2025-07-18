import React from 'react';
import { useMapData } from '../../hooks/useMapData';
import LocationButton from './LocationButton';

export const LocationControlContainer: React.FC = () => {
  const { getCurrentLocation, loading } = useMapData();

  return (
    <div className="absolute bottom-32 right-4 z-10">
      <LocationButton
        onClick={getCurrentLocation}
        isLoading={loading.location}
      />
    </div>
  );
};
