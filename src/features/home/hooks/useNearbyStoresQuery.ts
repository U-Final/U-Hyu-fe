import type { NearbyStore } from '@home/api/home.types';
import { useQuery } from '@tanstack/react-query';
import { fetchNearbyStores } from '../api/homeApi';

export const useNearbyStoresQuery = () => {
  return useQuery<NearbyStore[]>({
    queryKey: ['nearbyStores'],
    queryFn: fetchNearbyStores,
  });
};
