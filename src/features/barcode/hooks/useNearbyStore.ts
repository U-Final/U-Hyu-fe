import type { LocationParams } from '@barcode/api/barcode.type';
import { postNearbyStore } from '@barcode/api/nearbyStoreApi';
import { useQuery } from '@tanstack/react-query';

// 같은 위치에서 요청이 반복되는 경우를 위함.
export const useNearbyStoreQuery = (params: LocationParams, enabled = true) => {
  return useQuery({
    queryKey: ['barcode-open-nearby-store', params],
    queryFn: () => postNearbyStore(params),
    enabled, //좌표받아오기 전에 호출되지 않게 제어.
    staleTime: 5000 * 60,
  });
};
