import { useCallback, useEffect, useMemo } from 'react';
import { useMapStore } from '../store/MapStore';
import { useMapUIContext } from '../context/MapUIContext';
import {
  useStoreListQuery,
  useStoreDetailQuery,
  useToggleFavoriteMutation,
  useInvalidateStoreQueries,
} from './useMapQueries';
import type { GetNearbyStoresParams } from '../api/types';
import { getRegionInfo } from '../constants/regions';

/**
 * 기본 검색 반경 (미터 단위)
 */
const DEFAULT_RADIUS = 1000;

/**
 * 지도 관련 데이터 관리를 위한 메인 훅
 * MapStore의 상태와 React Query를 연결하여 백엔드 API 기반 필터링 제공
 */
export const useMapData = () => {
  // Zustand store에서 개별 상태와 액션을 선택적으로 구독
  // 무한 리렌더링 방지를 위해 필요한 것만 구독
  const stores = useMapStore(state => state.stores);
  const selectedStore = useMapStore(state => state.selectedStore);
  const storeDetail = useMapStore(state => state.storeDetail);
  const mapCenter = useMapStore(state => state.mapCenter);
  const userLocation = useMapStore(state => state.userLocation);
  const loading = useMapStore(state => state.loading);
  const errors = useMapStore(state => state.errors);

  // 액션 함수들을 개별적으로 구독
  const setStoresFromQuery = useMapStore(state => state.setStoresFromQuery);
  const setStoreDetail = useMapStore(state => state.setStoreDetail);
  const selectStore = useMapStore(state => state.selectStore);
  const getCurrentLocation = useMapStore(state => state.getCurrentLocation);
  const setMapCenter = useMapStore(state => state.setMapCenter);

  // UI 상태에서 필터 관련 상태 가져오기
  const { state: uiState } = useMapUIContext();

  /**
   * 프론트엔드 카테고리 값을 백엔드 API 카테고리 값으로 매핑
   * FilterTabs의 값과 백엔드 API 스펙 간의 차이를 조정
   */
  const mapCategoryToBackend = useCallback(
    (frontendCategory: string): string | undefined => {
      if (!frontendCategory || frontendCategory === 'all') {
        return undefined; // 전체 선택 시 필터 파라미터 제외
      }

      // FilterTabs의 value를 백엔드 API의 category 값으로 매핑
      const categoryMapping: Record<string, string> = {
        activity: 'activity',
        beauty: 'beauty',
        shopping: 'shopping',
        life: 'convenience', // 생활/편의 → convenience
        food: 'restaurant', // 푸드 → restaurant
        culture: 'culture',
        education: 'education',
        travel: 'travel',
      };

      return categoryMapping[frontendCategory];
    },
    []
  );

  /**
   * 백엔드 API 호출을 위한 쿼리 파라미터 생성
   * 지도 중심점, 필터 상태, 검색어를 종합하여 파라미터 구성
   */
  const storeListParams: GetNearbyStoresParams = useMemo(() => {
    const baseParams: GetNearbyStoresParams = {
      lat: mapCenter.lat,
      lng: mapCenter.lng,
      radius: DEFAULT_RADIUS,
    };

    // 카테고리 필터 파라미터 추가 (값이 있을 때만)
    const mappedCategory = mapCategoryToBackend(uiState.activeCategoryFilter);
    if (mappedCategory) {
      baseParams.category = mappedCategory;
    }

    // 브랜드 필터 파라미터 추가 (향후 구현)
    if (uiState.selectedBrand && uiState.selectedBrand !== '') {
      baseParams.brand = uiState.selectedBrand;
    }

    return baseParams;
  }, [
    mapCenter.lat,
    mapCenter.lng,
    uiState.activeCategoryFilter,
    uiState.selectedBrand,
    mapCategoryToBackend,
  ]);

  // React Query 훅들
  const storeListQuery = useStoreListQuery(storeListParams);
  const storeDetailQuery = useStoreDetailQuery(selectedStore?.storeId ?? null);
  const toggleFavoriteMutation = useToggleFavoriteMutation();

  /**
   * React Query 매장 목록 결과를 MapStore에 동기화
   * 의존성 배열에 함수만 포함하여 무한 리렌더링 방지
   */
  useEffect(() => {
    if (storeListQuery.data) {
      setStoresFromQuery(storeListQuery.data);
    }
  }, [storeListQuery.data, setStoresFromQuery]);

  /**
   * React Query 매장 상세 정보 결과를 MapStore에 동기화
   */
  useEffect(() => {
    if (storeDetailQuery.data && !storeDetailQuery.isLoading) {
      setStoreDetail(storeDetailQuery.data.data);
    }
  }, [storeDetailQuery.data, storeDetailQuery.isLoading, setStoreDetail]);

  /**
   * 지도 중심점 변경 시 주변 매장 새로고침
   * React Query가 자동으로 새로운 파라미터로 쿼리 재실행
   */
  const fetchNearbyStores = useCallback(
    async (newCenter?: { lat: number; lng: number }) => {
      if (newCenter) {
        setMapCenter(newCenter);
      }
      // storeListParams가 변경되면 React Query가 자동으로 재요청
    },
    [setMapCenter]
  );

  /**
   * 매장 즐겨찾기 상태 토글
   * Optimistic Update를 통해 즉시 UI 반영
   */
  const toggleFavorite = useCallback(
    async (storeId: number) => {
      try {
        await toggleFavoriteMutation.mutateAsync({ storeId });
      } catch (error) {
        console.error('즐겨찾기 토글 실패:', error);
        // 에러는 mutation에서 이미 처리됨 (롤백 포함)
      }
    },
    [toggleFavoriteMutation]
  );

  /**
   * 지역 필터 변경 시 지도 중심점 이동
   */
  useEffect(() => {
    const regionInfo = getRegionInfo(uiState.activeRegionFilter);

    if (regionInfo && regionInfo.key !== 'all') {
      // '전체'가 아닌 특정 지역 선택 시 해당 지역 중심으로 이동
      setMapCenter(regionInfo.center);

      if (import.meta.env.MODE === 'development') {
        console.log(`🗺️ 지역 변경: ${regionInfo.label}`, regionInfo.center);
      }
    }
  }, [uiState.activeRegionFilter, setMapCenter]);

  /**
   * 개발 모드에서 디버깅 정보 출력
   * 쿼리 파라미터와 결과 확인용
   */
  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('🔍 Store List Query Params:', storeListParams);
      console.log('📊 Stores Count:', stores.length);
      console.log('🎯 Active Filters:', {
        category: uiState.activeCategoryFilter,
        search: uiState.searchValue,
        brand: uiState.selectedBrand,
      });
    }
  }, [
    storeListParams,
    stores.length,
    uiState.activeCategoryFilter,
    uiState.searchValue,
    uiState.selectedBrand,
  ]);

  return {
    // 상태 데이터 (백엔드에서 이미 필터링됨)
    stores, // 필터링된 매장 목록
    selectedStore,
    storeDetail,

    // 위치 관련 상태
    userLocation,
    mapCenter,

    // 로딩 상태 (React Query + MapStore 조합)
    loading: {
      ...loading,
      stores: storeListQuery.isLoading,
      storeDetail: storeDetailQuery.isLoading,
      favorite: toggleFavoriteMutation.isPending,
    },

    // 에러 상태 (React Query + MapStore 조합)
    errors: {
      ...errors,
      stores: storeListQuery.error?.message ?? null,
      storeDetail: storeDetailQuery.error?.message ?? null,
      favorite: toggleFavoriteMutation.error?.message ?? null,
    },

    // 액션 함수들
    fetchNearbyStores,
    selectStore,
    getCurrentLocation,
    setMapCenter,
    toggleFavorite,

    // 디버깅 및 모니터링 정보
    queryStatus: {
      storeList: {
        isFetching: storeListQuery.isFetching,
        isStale: storeListQuery.isStale,
        dataUpdatedAt: storeListQuery.dataUpdatedAt,
        queryParams: storeListParams, // 현재 사용 중인 쿼리 파라미터
      },
      storeDetail: {
        isFetching: storeDetailQuery.isFetching,
        isStale: storeDetailQuery.isStale,
        dataUpdatedAt: storeDetailQuery.dataUpdatedAt,
      },
    },
  };
};

/**
 * 데이터 새로고침 전용 유틸리티 훅
 * 수동으로 데이터를 새로고침해야 할 때 사용
 */
export const useDataRefresh = () => {
  const { invalidateAllStores, invalidateStoreList } =
    useInvalidateStoreQueries();
  const clearAllErrors = useMapStore(state => state.clearAllErrors);

  const refreshStoreList = useCallback(() => {
    invalidateStoreList();
  }, [invalidateStoreList]);

  const refreshAllData = useCallback(() => {
    invalidateAllStores();
    clearAllErrors();
  }, [invalidateAllStores, clearAllErrors]);

  return {
    refreshStoreList,
    refreshAllData,
  };
};
