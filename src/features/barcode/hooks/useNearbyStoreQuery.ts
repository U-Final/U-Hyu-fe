import type { LocationParams } from '@barcode/api/barcode.type';
import { getNearbyStores } from '@barcode/api/getNearbyStores';
import type { StoreSummary } from '@kakao-map/api/types';
import { useQuery } from '@tanstack/react-query';

// 같은 위치에서 요청이 반복되는 경우를 위함.
export const useNearbyStoreQuery = (params: LocationParams, enabled = true) => {
  return useQuery<StoreSummary | null>({
    queryKey: ['nearby-stores', params],
    queryFn: async () => {
      const stores = await getNearbyStores(params); // StoreSummary[]
      return stores.length > 0 ? stores[0] : null; // 첫 번째만 반환
    },
    enabled, //좌표받아오기 전에 호출되지 않게 제어.
    staleTime: 5000 * 60,
  });
};
