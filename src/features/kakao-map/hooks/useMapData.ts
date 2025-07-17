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

export const useMapData = () => {
  const mapStore = useMapStore();
  const { state: uiState } = useMapUIContext();
  const { invalidateStoreList } = useInvalidateStoreQueries();

  // 현재 지도 중심점 기반 매장 조회 파라미터
  const storeListParams: GetNearbyStoresParams = {
    lat: mapStore.mapCenter.lat,
    lng: mapStore.mapCenter.lng,
    radius: 1000,
  };

  // 매장 목록 쿼리 (React Query)
  const storeListQuery = useStoreListQuery(storeListParams);

  // 선택된 매장 상세 정보 쿼리
  const storeDetailQuery = useStoreDetailQuery(
    mapStore.selectedStore?.storeId ?? null
  );

  // 즐겨찾기 토글 뮤테이션
  const toggleFavoriteMutation = useToggleFavoriteMutation();

  // 필터링된 스토어 목록 (메모이제이션)
  const filteredStores = useMemo(() => {
    return mapStore.getFilteredStores();
  }, [
    mapStore.stores,
    uiState.selectedCategory,
    uiState.selectedBrand,
    uiState.activeRegionFilter,
    uiState.searchValue,
  ]);

  // React Query 결과를 MapStore에 동기화
  useEffect(() => {
    if (storeListQuery.data && !storeListQuery.isLoading) {
      mapStore.setStoresFromQuery(storeListQuery.data);
    }
  }, [storeListQuery.data, storeListQuery.isLoading]);

  // 매장 상세 정보 동기화
  useEffect(() => {
    if (storeDetailQuery.data && !storeDetailQuery.isLoading) {
      mapStore.setStoreDetail(storeDetailQuery.data.data);
    }
  }, [storeDetailQuery.data, storeDetailQuery.isLoading]);

  // UI 필터와 MapStore 동기화 (필요한 경우에만)
  useEffect(() => {
    const newFilters = {
      category: uiState.selectedCategory,
      brand: uiState.selectedBrand,
      region: uiState.activeRegionFilter,
      searchQuery: uiState.searchValue,
    };

    // 필터가 실제로 변경된 경우에만 적용
    const currentFilters = mapStore.currentFilters;
    if (
      currentFilters.category !== newFilters.category ||
      currentFilters.brand !== newFilters.brand ||
      currentFilters.region !== newFilters.region ||
      currentFilters.searchQuery !== newFilters.searchQuery
    ) {
      mapStore.applyFilters(newFilters);
    }
  }, [
    uiState.selectedCategory,
    uiState.selectedBrand,
    uiState.activeRegionFilter,
    uiState.searchValue,
  ]);

  // 매장 목록 새로고침 (지도 이동 시 호출)
  const fetchNearbyStores = useCallback(
    async (newCenter?: { lat: number; lng: number }) => {
      if (newCenter) {
        mapStore.setMapCenter(newCenter);
      }

      // React Query가 자동으로 새로운 파라미터로 쿼리를 다시 실행함
      invalidateStoreList();
    },
    [mapStore, invalidateStoreList]
  );

  // 즐겨찾기 토글
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

  return {
    // 상태 (React Query + MapStore 조합)
    stores: filteredStores, // 필터링된 결과 (메모이제이션됨)
    selectedStore: mapStore.selectedStore,
    storeDetail: mapStore.storeDetail,

    //
    userLocation: mapStore.userLocation,
    mapCenter: mapStore.mapCenter,

    // 로딩 상태 (React Query + MapStore 조합)
    loading: {
      ...mapStore.loading,
      stores: storeListQuery.isLoading,
      storeDetail: storeDetailQuery.isLoading,
      favorite: toggleFavoriteMutation.isPending,
    },

    // 에러 상태
    errors: {
      ...mapStore.errors,
      stores: storeListQuery.error?.message ?? null,
      storeDetail: storeDetailQuery.error?.message ?? null,
      favorite: toggleFavoriteMutation.error?.message ?? null,
    },

    // 액션
    fetchNearbyStores,
    selectStore: mapStore.selectStore,
    getCurrentLocation: mapStore.getCurrentLocation,
    setMapCenter: mapStore.setMapCenter,
    toggleFavorite,

    // 추가 정보 (디버깅용)
    queryStatus: {
      storeList: {
        isFetching: storeListQuery.isFetching,
        isStale: storeListQuery.isStale,
        dataUpdatedAt: storeListQuery.dataUpdatedAt,
      },
      storeDetail: {
        isFetching: storeDetailQuery.isFetching,
        isStale: storeDetailQuery.isStale,
        dataUpdatedAt: storeDetailQuery.dataUpdatedAt,
      },
    },
  };
};

// 데이터 새로고침 전용 훅
export const useDataRefresh = () => {
  const { invalidateAllStores, invalidateStoreList } =
    useInvalidateStoreQueries();
  const mapStore = useMapStore();

  const refreshStoreList = useCallback(() => {
    invalidateStoreList();
  }, [invalidateStoreList]);

  const refreshAllData = useCallback(() => {
    invalidateAllStores();
    mapStore.clearAllErrors();
  }, [invalidateAllStores, mapStore]);

  return {
    refreshStoreList,
    refreshAllData,
  };
};
