import React from 'react';
import { useMapData } from '../../hooks/useMapData';
import LocationButton from './LocationButton';

export const LocationControlContainer: React.FC = () => {
  const { getCurrentLocation, loading } = useMapData();

  const handleLocationClick = () => {
    getCurrentLocation(true); // force: true로 강제 실행
  };

  return (
    <LocationButton
      onClick={handleLocationClick}
      isLoading={loading.location}
    />
  );
};
