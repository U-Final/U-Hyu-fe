import type { Store } from '@kakao-map/types/store';
import type { RecommendedRanking } from '@recommendation/Recommendation.types';
import {
  type GetRecommendedStoresParams,
  getRecommendedRanking,
  getRecommendedStores,
} from '@recommendation/api/recommendedStoresApi';
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
