import type { Store } from '@kakao-map/types/store';
import {
  type GetRecommendedStoresParams,
  getRecommendedRanking,
  getRecommendedStores,
} from '@recommendation/api/recommendedStoresApi';
import type { RecommendedRanking } from '@recommendation/recommended.types';
import { useQuery } from '@tanstack/react-query';

export const useRecommendedStoresQuery = (
  params: GetRecommendedStoresParams
) => {
  return useQuery<Store[]>({
    queryKey: ['recommendStoresByLocation', params],
    queryFn: () => getRecommendedStores(params),
    enabled: !!params.lat && !!params.lon,
  });
};

export const useRecommendedGuestQuery = () => {
  return useQuery<RecommendedRanking[]>({
    queryKey: ['recommendedRanking'],
    queryFn: getRecommendedRanking,
  });
};
