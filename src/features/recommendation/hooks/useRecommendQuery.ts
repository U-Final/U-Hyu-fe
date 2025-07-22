import type { RecommendStore } from '@recommendation/api/recommendedStores.types';
import {
  type GetRecommendedStoresParams,
  getRecommededStores,
} from '@recommendation/api/recommendedStoresApi';
import { useQuery } from '@tanstack/react-query';

export const useRecommendedStoresQuery = (
  params: GetRecommendedStoresParams
) => {
  return useQuery<RecommendStore[]>({
    queryKey: ['recommendStoresByLocation', params],
    queryFn: () => getRecommededStores(params),
    enabled: !!params.lat && !!params.lon,
  });
};
