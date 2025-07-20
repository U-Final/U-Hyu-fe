// src/features/home/hooks/useNearbyStoresQuery.ts
import { useQuery } from '@tanstack/react-query';
import { fetchNearbyStores } from '../api/homeApi';

export const useNearbyStoresQuery = () => {
  return useQuery({
    queryKey: ['nearbyStores'],
    queryFn: fetchNearbyStores,
  });
};
