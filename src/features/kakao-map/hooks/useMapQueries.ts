import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { mapApi } from '../api/mapApi';
import type {
  GetNearbyStoresParams,
  StoreDetailResponse,
  StoreListResponse,
} from '../api/types';
import type { Store } from '../types/store';

// Query Keys 중앙 관리
export const MAP_QUERY_KEYS = {
  stores: {
    all: ['stores'] as const,
    lists: () => [...MAP_QUERY_KEYS.stores.all, 'list'] as const,
    list: (params: GetNearbyStoresParams) =>
      [...MAP_QUERY_KEYS.stores.lists(), params] as const,
    details: () => [...MAP_QUERY_KEYS.stores.all, 'detail'] as const,
    detail: (id: number) => [...MAP_QUERY_KEYS.stores.details(), id] as const,
  },
  favorites: {
    all: ['favorites'] as const,
  },
} as const;

// 매장 목록 조회 (MapStore 내부에서 사용)
export const useStoreListQuery = (params: GetNearbyStoresParams) => {
  return useQuery({
    queryKey: MAP_QUERY_KEYS.stores.list(params),
    queryFn: () => mapApi.getStoreList(params),

    // 지도 앱 최적화 설정
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분

    // 유효한 좌표일 때만 실행
    enabled:
      params.lat !== 0 &&
      params.lng !== 0 &&
      !isNaN(params.lat) &&
      !isNaN(params.lng),

    // UX 최적화
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: (failureCount, error) => {
      // 네트워크 오류는 재시도, 4xx 오류는 재시도 안함
      if (error instanceof AxiosError && error.response?.status) {
        const status = error.response.status;
        // 4xx 클라이언트 오류는 재시도하지 않음
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 2;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// 매장 상세 정보 조회
export const useStoreDetailQuery = (storeId: number | null) => {
  return useQuery({
    queryKey: storeId
      ? MAP_QUERY_KEYS.stores.detail(storeId)
      : ['stores', 'detail', 'null'],
    queryFn: () => {
      if (!storeId || storeId <= 0) {
        throw new Error('유효하지 않은 스토어 ID입니다.');
      }
      return mapApi.getStoreDetail({ storeId });
    },

    // 조건부 실행
    enabled: !!storeId && storeId > 0,

    // 상세 정보는 더 긴 캐시 (자주 변경되지 않음)
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분

    // UX 최적화
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// 즐겨찾기 토글 뮤테이션 (Optimistic Update 포함)
export const useToggleFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mapApi.toggleFavorite,

    // 낙관적 업데이트 (즉시 UI 반영)
    onMutate: async variables => {
      const { storeId } = variables;

      // 진행 중인 쿼리들 취소
      await queryClient.cancelQueries({
        queryKey: MAP_QUERY_KEYS.stores.detail(storeId),
      });
      await queryClient.cancelQueries({
        queryKey: MAP_QUERY_KEYS.stores.lists(),
      });

      // 이전 데이터 스냅샷 저장 (롤백용)
      const previousStoreDetail = queryClient.getQueryData(
        MAP_QUERY_KEYS.stores.detail(storeId)
      );

      // 즐겨찾기 상태 즉시 토글 (Optimistic Update)
      queryClient.setQueryData(
        MAP_QUERY_KEYS.stores.detail(storeId),
        (old: StoreDetailResponse | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              isFavorite: !old.data.isFavorite,
              favoriteCount: old.data.isFavorite
                ? old.data.favoriteCount - 1
                : old.data.favoriteCount + 1,
            },
          };
        }
      );

      // 매장 목록에서도 즐겨찾기 상태 업데이트
      queryClient.setQueriesData(
        { queryKey: MAP_QUERY_KEYS.stores.lists() },
        (old: StoreListResponse | undefined) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((store: Store) =>
              store.storeId === storeId
                ? { ...store, isFavorite: !store.isFavorite }
                : store
            ),
          };
        }
      );

      return { previousStoreDetail };
    },

    // 성공 시 서버 데이터로 최종 동기화
    onSuccess: (_, variables) => {
      const { storeId } = variables;

      // 관련 쿼리들 무효화하여 서버 데이터로 동기화
      queryClient.invalidateQueries({
        queryKey: MAP_QUERY_KEYS.stores.detail(storeId),
      });
      queryClient.invalidateQueries({
        queryKey: MAP_QUERY_KEYS.stores.lists(),
      });
    },

    // 실패 시 이전 상태로 롤백
    onError: (error, variables, context) => {
      const { storeId } = variables;

      // 이전 상태로 롤백
      if (context?.previousStoreDetail) {
        queryClient.setQueryData(
          MAP_QUERY_KEYS.stores.detail(storeId),
          context.previousStoreDetail
        );
      }

      // 매장 목록도 무효화하여 서버 상태로 복원
      queryClient.invalidateQueries({
        queryKey: MAP_QUERY_KEYS.stores.lists(),
      });

      console.error('즐겨찾기 업데이트 실패:', error);
    },

    // 완료 시 (성공/실패 무관하게 실행)
    onSettled: () => {
      // 필요시 추가 정리 작업
    },
  });
};

// 유틸리티 훅들

// 모든 매장 관련 쿼리 무효화
export const useInvalidateStoreQueries = () => {
  const queryClient = useQueryClient();

  return {
    invalidateAllStores: () => {
      queryClient.invalidateQueries({
        queryKey: MAP_QUERY_KEYS.stores.all,
      });
    },
    invalidateStoreList: (params?: GetNearbyStoresParams) => {
      if (params) {
        queryClient.invalidateQueries({
          queryKey: MAP_QUERY_KEYS.stores.list(params),
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: MAP_QUERY_KEYS.stores.lists(),
        });
      }
    },
    invalidateStoreDetail: (storeId: number) => {
      queryClient.invalidateQueries({
        queryKey: MAP_QUERY_KEYS.stores.detail(storeId),
      });
    },
  };
};
export const useClearStoreCache = () => {
  const queryClient = useQueryClient();

  return {
    clearAllStoreCache: () => {
      queryClient.removeQueries({
        queryKey: MAP_QUERY_KEYS.stores.all,
      });
    },
    clearStoreListCache: () => {
      queryClient.removeQueries({
        queryKey: MAP_QUERY_KEYS.stores.lists(),
      });
    },
  };
};

// 쿼리 상태 모니터링 (개발용)
export const useQueryDebugInfo = () => {
  const queryClient = useQueryClient();

  if (import.meta.env.MODE !== 'development') {
    return null;
  }

  return {
    getStoreQueriesCount: () => {
      const queries = queryClient.getQueryCache().findAll({
        queryKey: MAP_QUERY_KEYS.stores.all,
      });
      return queries.length;
    },
    logActiveQueries: () => {
      const queries = queryClient.getQueryCache().getAll();
      console.table(
        queries.map(q => ({
          key: q.queryKey.join(' > '),
          state: q.state.status,
          dataUpdatedAt: new Date(q.state.dataUpdatedAt).toLocaleTimeString(),
        }))
      );
    },
  };
};
