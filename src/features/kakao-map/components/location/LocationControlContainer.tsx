import React from 'react';
import { useMapData } from '../../hooks/useMapData';
import LocationButton from './LocationButton';

export const LocationControlContainer: React.FC = () => {
  const { getCurrentLocation, loading } = useMapData();

  return (
    <LocationButton
      onClick={getCurrentLocation}
      isLoading={loading.location}
    />
  );
};
