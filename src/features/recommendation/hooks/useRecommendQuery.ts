import type { RecommendStore } from '@recommendation/api/recommendedStores.types';
import {
  type GetRecommendedStoresParams,
  getRecommendedStores,
} from '@recommendation/api/recommendedStoresApi';
import { useQuery } from '@tanstack/react-query';

export const useRecommendedStoresQuery = (
  params: GetRecommendedStoresParams
) => {
  return useQuery<RecommendStore[]>({
    queryKey: ['recommendStoresByLocation', params],
    queryFn: () => getRecommendedStores(params),
    enabled: !!params.lat && !!params.lon,
  });
};
