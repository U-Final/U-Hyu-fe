import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { mapApi } from '../api/mapApi';
import type {
  GetNearbyStoresParams,
  StoreDetailResponse,
  StoreListResponse,
} from '../api/types';
import type { Store } from '../types/store';

/**
 * React Query의 키 생성을 위한 중앙 집중식 키 팩토리
 * 타입 안전성과 캐시 무효화 관리를 위해 사용
 */
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

/**
 * 주변 매장 목록 조회 쿼리 훅
 * 백엔드 API의 필터 파라미터를 활용하여 서버 사이드 필터링 수행
 *
 * @param params - 위치 정보 및 필터 파라미터
 * @returns React Query 결과 객체
 */
export const useStoreListQuery = (params: GetNearbyStoresParams) => {
  return useQuery({
    // 파라미터가 변경될 때마다 새로운 쿼리 키 생성
    queryKey: MAP_QUERY_KEYS.stores.list(params),
    queryFn: () => mapApi.getStoreList(params),

    // 캐시 설정 (필터링으로 인해 더 짧은 캐시 시간 설정)
    staleTime: 2 * 60 * 1000, // 2분 (필터링 시 더 자주 업데이트)
    gcTime: 10 * 60 * 1000, // 10분 (가비지 컬렉션 시간)

    // 쿼리 실행 조건: 유효한 좌표값이 있을 때만 실행
    enabled:
      params.lat !== 0 &&
      params.lon !== 0 &&
      !isNaN(params.lat) &&
      !isNaN(params.lon),

    // UX 최적화 설정
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 비활성화
    refetchOnReconnect: true, // 네트워크 재연결 시 재요청

    // 재시도 로직: 4xx 에러는 재시도하지 않음
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status) {
        const status = error.response.status;
        if (status >= 400 && status < 500) {
          return false; // 클라이언트 에러는 재시도 안함
        }
      }
      return failureCount < 2; // 최대 2회 재시도
    },

    // 지수 백오프 재시도 지연
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * 매장 상세 정보 조회 쿼리 훅
 *
 * @param storeId - 매장 ID (null이면 쿼리 비활성화)
 * @returns React Query 결과 객체
 */
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

    // 조건부 실행: storeId가 유효할 때만 쿼리 실행
    enabled: !!storeId && storeId > 0,

    // 상세 정보는 더 긴 캐시 시간 (자주 변경되지 않음)
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분

    // UX 최적화
    refetchOnWindowFocus: false,
    retry: 1, // 상세 정보는 1회만 재시도
  });
};

/**
 * 즐겨찾기 토글 뮤테이션 훅
 * Optimistic Update를 통해 즉시 UI 반영 후 서버 동기화
 *
 * @returns 뮤테이션 객체
 */
export const useToggleFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mapApi.toggleFavorite,

    // Optimistic Update: 서버 응답 전에 UI 먼저 업데이트
    onMutate: async variables => {
      const { storeId } = variables;

      // 진행 중인 관련 쿼리들 취소하여 낙관적 업데이트 보호
      await queryClient.cancelQueries({
        queryKey: MAP_QUERY_KEYS.stores.detail(storeId),
      });
      await queryClient.cancelQueries({
        queryKey: MAP_QUERY_KEYS.stores.lists(),
      });

      // 롤백을 위한 이전 데이터 스냅샷 저장
      const previousStoreDetail = queryClient.getQueryData(
        MAP_QUERY_KEYS.stores.detail(storeId)
      );

      // 매장 상세 정보의 즐겨찾기 상태 즉시 토글
      queryClient.setQueryData(
        MAP_QUERY_KEYS.stores.detail(storeId),
        (old: StoreDetailResponse | undefined) => {
          if (!old?.data) return old;
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

    // 성공 시: 서버 데이터로 최종 동기화
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

    // 실패 시: 이전 상태로 롤백
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
  });
};

/**
 * 매장 관련 쿼리 무효화를 위한 유틸리티 훅
 * 데이터 새로고침이 필요할 때 사용
 */
export const useInvalidateStoreQueries = () => {
  const queryClient = useQueryClient();

  return {
    /**
     * 모든 매장 관련 쿼리 무효화
     */
    invalidateAllStores: () => {
      queryClient.invalidateQueries({
        queryKey: MAP_QUERY_KEYS.stores.all,
      });
    },

    /**
     * 매장 목록 쿼리 무효화
     * @param params - 특정 파라미터의 쿼리만 무효화 (선택사항)
     */
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

    /**
     * 특정 매장의 상세 정보 쿼리 무효화
     * @param storeId - 매장 ID
     */
    invalidateStoreDetail: (storeId: number) => {
      queryClient.invalidateQueries({
        queryKey: MAP_QUERY_KEYS.stores.detail(storeId),
      });
    },
  };
};

/**
 * 매장 관련 캐시 제거를 위한 유틸리티 훅
 * 메모리 정리가 필요할 때 사용
 */
export const useClearStoreCache = () => {
  const queryClient = useQueryClient();

  return {
    /**
     * 모든 매장 관련 캐시 제거
     */
    clearAllStoreCache: () => {
      queryClient.removeQueries({
        queryKey: MAP_QUERY_KEYS.stores.all,
      });
    },

    /**
     * 매장 목록 캐시만 제거
     */
    clearStoreListCache: () => {
      queryClient.removeQueries({
        queryKey: MAP_QUERY_KEYS.stores.lists(),
      });
    },
  };
};

/**
 * 개발 환경에서 쿼리 상태를 모니터링하기 위한 디버깅 훅
 * 프로덕션에서는 null 반환
 */
export const useQueryDebugInfo = () => {
  const queryClient = useQueryClient();

  if (import.meta.env.MODE !== 'development') {
    return null;
  }

  return {
    /**
     * 현재 활성화된 매장 쿼리 개수 반환
     */
    getStoreQueriesCount: () => {
      const queries = queryClient.getQueryCache().findAll({
        queryKey: MAP_QUERY_KEYS.stores.all,
      });
      return queries.length;
    },

    /**
     * 모든 활성 쿼리를 콘솔에 테이블 형태로 출력
     */
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
