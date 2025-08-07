import React from 'react';
import { useMapData } from '../../hooks/useMapData';
import LocationButton from './LocationButton';

export const LocationControlContainer: React.FC = () => {
  const { getCurrentLocation, loading } = useMapData();

  const handleLocationClick = () => {
    getCurrentLocation(true);
  };

  return (
    <LocationButton
      onClick={handleLocationClick}
      isLoading={loading.location}
    />
  );
};
