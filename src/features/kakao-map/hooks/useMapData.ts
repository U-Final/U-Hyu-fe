import { useCallback, useEffect, useMemo } from 'react';

import type { GetNearbyStoresParams } from '../api/types';
import { getRegionInfo } from '../constants/regions';
import { useMapUIContext } from '../context/MapUIContext';
import {
  useBookmarkMode,
  useMapStore,
  useRecommendedStores,
  useSearchRadius,
  useShowRecommendedStores,
} from '../store/MapStore';
import {
  useInvalidateStoreQueries,
  useStoreDetailQuery,
  useStoreListQuery,
  useToggleFavoriteMutation,
} from './useMapQueries';

/**
 * 지도 관련 데이터 관리를 위한 메인 훅
 * MapStore의 상태와 React Query를 연결하여 백엔드 API 기반 필터링 제공
 */
export const useMapData = () => {
  const stores = useMapStore(state => state.stores);
  const selectedStore = useMapStore(state => state.selectedStore);
  const storeDetail = useMapStore(state => state.storeDetail);
  const mapCenter = useMapStore(state => state.mapCenter);
  const userLocation = useMapStore(state => state.userLocation);
  const loading = useMapStore(state => state.loading);
  const errors = useMapStore(state => state.errors);

  const recommendedStores = useRecommendedStores();
  const showRecommendedStores = useShowRecommendedStores();

  const dynamicSearchRadius = useSearchRadius();

  const setStoresFromQuery = useMapStore(state => state.setStoresFromQuery);
  const setStoreDetail = useMapStore(state => state.setStoreDetail);
  const selectStore = useMapStore(state => state.selectStore);
  const getCurrentLocation = useMapStore(state => state.getCurrentLocation);
  const isBookmarkMode = useBookmarkMode();
  const toggleBookmarkMode = useMapStore(state => state.toggleBookmarkMode);
  const setMapCenter = useMapStore(state => state.setMapCenter);
  const fetchRecommendedStores = useMapStore(
    state => state.fetchRecommendedStores
  );
  const setShowRecommendedStores = useMapStore(
    state => state.setShowRecommendedStores
  );
  const toggleRecommendedStores = useMapStore(
    state => state.toggleRecommendedStores
  );

  const { state: uiState } = useMapUIContext();

  /**
   * 프론트엔드 카테고리 값을 백엔드 API 카테고리 값으로 매핑
   * FilterTabs의 값과 백엔드 API 스펙 간의 차이를 조정
   */
  const mapCategoryToBackend = useCallback(
    (frontendCategory: string): string | undefined => {
      if (!frontendCategory || frontendCategory === 'all') {
        return undefined;
      }

      const categoryMapping: Record<string, string> = {
        테마파크: '테마파크',
        '워터파크/아쿠아리움': '워터파크/아쿠아리움',
        액티비티: '액티비티',
        뷰티: '뷰티',
        건강: '건강',
        쇼핑: '쇼핑',
        '생활/편의': '생활/편의',
        '베이커리/디저트': '베이커리/디저트',
        음식점: '음식점',
        '영화/미디어': '영화/미디어',
        '공연/전시': '공연/전시',
        교육: '교육',
        '여행/교통': '여행/교통',
        activity: '액티비티',
        beauty: '뷰티',
        shopping: '쇼핑',
        life: '생활/편의',
        food: '음식점',
        푸드: '음식점',
        culture: '영화/미디어',
        '문화/여가': '영화/미디어',
        education: '교육',
        travel: '여행/교통',
      };

      return categoryMapping[frontendCategory];
    },
    []
  );

  const searchParams = useMapStore(state => state.searchParams);
  const setSearchParams = useMapStore(state => state.setSearchParams);

  /**
   * 백엔드 API 호출을 위한 쿼리 파라미터 생성
   * 재검색 버튼 클릭시에만 업데이트되는 searchParams 사용
   */
  const storeListParams: GetNearbyStoresParams = useMemo(() => {
    const baseParams: GetNearbyStoresParams = {
      lat: searchParams?.lat ?? mapCenter.lat,
      lon: searchParams?.lng ?? mapCenter.lng,
      radius: searchParams?.radius ?? dynamicSearchRadius,
    };

    const mappedCategory = mapCategoryToBackend(uiState.activeCategoryFilter);
    if (mappedCategory) {
      baseParams.category = mappedCategory;
    }

    if (uiState.selectedBrand && uiState.selectedBrand !== '') {
      baseParams.brand = uiState.selectedBrand;
    }

    return baseParams;
  }, [
    searchParams?.lat,
    searchParams?.lng, 
    searchParams?.radius,
    mapCenter.lat,
    mapCenter.lng,
    dynamicSearchRadius,
    uiState.activeCategoryFilter,
    uiState.selectedBrand,
    mapCategoryToBackend,
  ]);

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
  }, [storeListQuery.data, setStoresFromQuery, storeListParams]);

  /**
   * React Query 매장 상세 정보 결과를 MapStore에 동기화
   */
  useEffect(() => {
    if (storeDetailQuery.data && !storeDetailQuery.isLoading) {
      setStoreDetail(storeDetailQuery.data.data ?? null);
    }
  }, [storeDetailQuery.data, storeDetailQuery.isLoading, setStoreDetail]);

  /**
   * 앱 최초 실행시 현재 위치 가져오기 및 초기 검색 파라미터 설정
   * 위치가 설정되면 React Query가 자동으로 추천 매장 로딩
   * HTTP 개발 환경에서는 위치 정보 요청 비활성화
   */
  useEffect(() => {
    if (!window.isSecureContext && import.meta.env.MODE === 'development') {
      return;
    }

    const initializeLocation = async () => {
      const { userLocation, mapCenter, searchParams } = useMapStore.getState();

      if (!searchParams) {
        setSearchParams({
          lat: mapCenter.lat,
          lng: mapCenter.lng,
          radius: dynamicSearchRadius,
        });
      }

      if (userLocation) {
        return;
      }

      const defaultLat = parseFloat(
        import.meta.env.VITE_MAP_INITIAL_LAT || '37.54699'
      );
      const defaultLng = parseFloat(
        import.meta.env.VITE_MAP_INITIAL_LNG || '127.09598'
      );

      const isDefaultLocation =
        Math.abs(mapCenter.lat - defaultLat) < 0.001 &&
        Math.abs(mapCenter.lng - defaultLng) < 0.001;

      if (isDefaultLocation) {
        try {
          await getCurrentLocation();
          const newState = useMapStore.getState();
          if (newState.userLocation) {
            setSearchParams({
              lat: newState.userLocation.lat,
              lng: newState.userLocation.lng,
              radius: dynamicSearchRadius,
            });
          }
        } catch {
          // 위치 권한 실패시에도 지도는 기본 위치로 정상 동작
        }
      }
    };

    initializeLocation();
  }, [getCurrentLocation, setSearchParams, dynamicSearchRadius]);

  /**
   * 지도 중심점 변경 시 주변 매장 새로고침
   * React Query가 자동으로 새로운 파라미터로 쿼리 재실행
   */
  const fetchNearbyStores = useCallback(
    async (newCenter?: { lat: number; lng: number }) => {
      if (newCenter) {
        setMapCenter(newCenter);
      }
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
      } catch {
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
      setMapCenter(regionInfo.center);
    }
  }, [uiState.activeRegionFilter, setMapCenter]);

  /**
   * 개발 모드에서 디버깅 정보 출력
   * 쿼리 파라미터와 결과 확인용
   */
  useEffect(() => {}, [
    storeListParams,
    stores.length,
    uiState.activeCategoryFilter,
    uiState.searchValue,
    uiState.selectedBrand,
  ]);

  return {
    stores,
    selectedStore,
    storeDetail,

    userLocation,
    mapCenter,
    recommendedStores,
    showRecommendedStores,

    loading: {
      ...loading,
      stores: storeListQuery.isLoading,
      storeDetail: storeDetailQuery.isLoading,
      favorite: toggleFavoriteMutation.isPending,
    },

    errors: {
      ...errors,
      stores: storeListQuery.error?.message ?? null,
      storeDetail: storeDetailQuery.error?.message ?? null,
      favorite: toggleFavoriteMutation.error?.message ?? null,
    },

    fetchNearbyStores,
    selectStore,
    getCurrentLocation,
    isBookmarkMode,
    toggleBookmarkMode,
    setMapCenter,
    toggleFavorite,
    fetchRecommendedStores,
    setShowRecommendedStores,
    toggleRecommendedStores,

    queryStatus: {
      storeList: {
        isFetching: storeListQuery.isFetching,
        isStale: storeListQuery.isStale,
        dataUpdatedAt: storeListQuery.dataUpdatedAt,
        queryParams: storeListParams,
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
