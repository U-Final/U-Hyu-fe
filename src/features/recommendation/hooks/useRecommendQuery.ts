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
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    gcTime: 0,
  });
};

export const useRecommendedGuestQuery = () => {
  return useQuery<RecommendedRanking[]>({
    queryKey: ['recommendedRanking'],
    queryFn: getRecommendedRanking,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    gcTime: 0,
  });
};
