import type { LocationParams } from '@barcode/api/barcode.type';
import { getNearbyStores } from '@barcode/api/getNearbyStores';
import type { StoreSummary } from '@kakao-map/api/types';
import { useQuery } from '@tanstack/react-query';

export const useNearbyStoreQuery = (params: LocationParams, enabled = true) => {
  return useQuery<StoreSummary | null>({
    queryKey: ['nearby-stores', params],
    queryFn: async () => {
      const stores = await getNearbyStores(params);
      return stores.length > 0 ? stores[0] : null;
    },
    enabled,
    staleTime: 5000 * 60,
  });
};
