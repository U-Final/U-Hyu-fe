import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mapApi } from '../api/mapApi';
import type { GetNearbyStoresParams } from '../api/types';

export const QUERY_KEYS = {
  STORES_LIST: 'stores-list',
  STORE_DETAIL: 'store-detail',
  FAVORITES: 'favorites',
} as const;

/**
 * 매장 목록 조회 훅
 *
 */
export const useStoreList = (params: GetNearbyStoresParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.STORES_LIST, params],
    queryFn: () => mapApi.getStoreList(params),

    // 지도 앱에 최적화된 기본 설정
    staleTime: 5 * 60 * 1000, // 5분
    enabled: params.lat !== 0 && params.lng !== 0, // 유효한 좌표일 때만 실행

    // 사용자 경험을 위한 최소한의 설정
    refetchOnWindowFocus: false,
    retry: 2, // 네트워크 오류 시 2번 재시도
  });
};

/**
 * 매장 상세 정보 조회 훅
 */
export const useStoreDetail = (storeId: number | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.STORE_DETAIL, storeId],
    queryFn: () => mapApi.getStoreDetail({ storeId: storeId! }),

    // storeId가 유효할 때만 실행
    enabled: !!storeId && storeId > 0,

    // 상세 정보는 자주 변경되지 않으므로 더 긴 캐시
    staleTime: 10 * 60 * 1000, // 10분
  });
};

/**
 * 즐겨찾기 토글 뮤테이션
 *
 * 추후 낙관적 업데이트 추가 예정
 */
export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mapApi.toggleFavorite,

    // 성공 시 관련 캐시 무효화
    onSuccess: (data, variables) => {
      // 해당 매장 상세 정보 갱신
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STORE_DETAIL, variables.storeId],
      });

      // 매장 목록도 갱신 (즐겨찾기 상태 반영을 위해)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.STORES_LIST],
      });

      console.log('즐겨찾기 업데이트 완료:', data);
    },

    // 에러 처리
    onError: error => {
      console.error('즐겨찾기 업데이트 실패:', error);
    },
  });
};
