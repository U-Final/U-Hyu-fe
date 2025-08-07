import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { mapApi } from '../api/mapApi';
import type {
  GetCategoryBrandsParams,
  GetNearbyStoresParams,
  StoreDetailResponse,
  ToggleFavoriteResponseType,
} from '../api/types';

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
  categories: {
    all: ['categories'] as const,
    brands: () => [...MAP_QUERY_KEYS.categories.all, 'brands'] as const,
    brand: (categoryId: number) =>
      [...MAP_QUERY_KEYS.categories.brands(), categoryId] as const,
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
    queryKey: MAP_QUERY_KEYS.stores.list(params),
    queryFn: () => mapApi.getStoreList(params),

    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,

    enabled:
      params.lat !== 0 &&
      params.lon !== 0 &&
      !isNaN(params.lat) &&
      !isNaN(params.lon),

    refetchOnWindowFocus: false,
    refetchOnReconnect: true,

    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status) {
        const status = error.response.status;
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 2;
    },

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

    enabled: !!storeId && storeId > 0,

    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,
    retry: 1,
  });
};

/**
 * 카테고리별 브랜드 목록 조회 쿼리 훅
 *
 * @param params - 카테고리 ID 파라미터
 * @returns React Query 결과 객체
 */
export const useCategoryBrandsQuery = (params: GetCategoryBrandsParams) => {
  return useQuery({
    queryKey: MAP_QUERY_KEYS.categories.brand(params.categoryId),
    queryFn: () => mapApi.getCategoryBrands(params),

    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,

    enabled: params.categoryId > 0,

    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: (failureCount, error) => {
      if (error instanceof AxiosError && error.response?.status) {
        const status = error.response.status;
        if (status >= 400 && status < 500) {
          return false;
        }
      }
      return failureCount < 2;
    },

    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
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

    onMutate: async variables => {
      const { storeId } = variables;

      const previousStoreDetail = queryClient.getQueryData(
        MAP_QUERY_KEYS.stores.detail(storeId)
      );

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

      return { previousStoreDetail };
    },

    onSuccess: (data: ToggleFavoriteResponseType, variables) => {
      const { storeId } = variables;

      if (!data.data) return;

      const { isBookmarked } = data.data;

      queryClient.setQueryData(
        MAP_QUERY_KEYS.stores.detail(storeId),
        (old: StoreDetailResponse | undefined) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: {
              ...old.data,
              isFavorite: isBookmarked,
            },
          };
        }
      );
    },

    onError: (_, variables, context) => {
      const { storeId } = variables;

      if (context?.previousStoreDetail) {
        queryClient.setQueryData(
          MAP_QUERY_KEYS.stores.detail(storeId),
          context.previousStoreDetail
        );
      }
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
      // 디버깅 로그는 제거
    },
  };
};
