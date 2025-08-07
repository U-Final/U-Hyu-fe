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
  // Zustand store에서 개별 상태와 액션을 선택적으로 구독
  // 무한 리렌더링 방지를 위해 필요한 것만 구독
  const stores = useMapStore(state => state.stores);
  const selectedStore = useMapStore(state => state.selectedStore);
  const storeDetail = useMapStore(state => state.storeDetail);
  const mapCenter = useMapStore(state => state.mapCenter);
  const userLocation = useMapStore(state => state.userLocation);
  const loading = useMapStore(state => state.loading);
  const errors = useMapStore(state => state.errors);

  // 추천 매장 상태 추가
  const recommendedStores = useRecommendedStores();
  const showRecommendedStores = useShowRecommendedStores();

  // 줌 레벨 기반 동적 검색 반경
  const dynamicSearchRadius = useSearchRadius();

  // 액션 함수들을 개별적으로 구독
  const setStoresFromQuery = useMapStore(state => state.setStoresFromQuery);
  const setStoreDetail = useMapStore(state => state.setStoreDetail);
  const selectStore = useMapStore(state => state.selectStore);
  const getCurrentLocation = useMapStore(state => state.getCurrentLocation);
  const isBookmarkMode = useBookmarkMode();
  const toggleBookmarkMode = useMapStore(state => state.toggleBookmarkMode);
  const setMapCenter = useMapStore(state => state.setMapCenter);
  // 추천 매장 액션들 추가
  const fetchRecommendedStores = useMapStore(
    state => state.fetchRecommendedStores
  );
  const setShowRecommendedStores = useMapStore(
    state => state.setShowRecommendedStores
  );
  const toggleRecommendedStores = useMapStore(
    state => state.toggleRecommendedStores
  );

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

      // FilterTabs의 value를 백엔드 API의 category 값으로 매핑 (필터탭 label과 동일하게)
      // 새로운 14개 비즈니스 카테고리에 맞춤 (APP/기기는 지도에서 제외)
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
        // 기존 호환성을 위한 매핑 (구 카테고리가 있을 수 있음)
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

  // 검색 실행을 위한 별도 상태 (재검색 버튼 클릭시에만 업데이트)
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
    // HTTP 개발 환경에서는 위치 정보 요청 비활성화
    if (!window.isSecureContext && import.meta.env.MODE === 'development') {
      return;
    }

    const initializeLocation = async () => {
      const { userLocation, mapCenter, searchParams } = useMapStore.getState();

      // 초기 검색 파라미터가 없으면 설정
      if (!searchParams) {
        setSearchParams({
          lat: mapCenter.lat,
          lng: mapCenter.lng,
          radius: dynamicSearchRadius,
        });
      }

      // 이미 사용자 위치가 있으면 스킵
      if (userLocation) {
        return;
      }

      // 현재 지도 중심이 기본값(강남역)이면 현재 위치 시도
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
          // 위치를 가져온 후 검색 파라미터 업데이트
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

    // 컴포넌트 마운트시 한 번만 실행
    initializeLocation();
  }, [getCurrentLocation, setSearchParams, dynamicSearchRadius]); // 의존성 추가

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
      // '전체'가 아닌 특정 지역 선택 시 해당 지역 중심으로 이동
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
    // 상태 데이터 (백엔드에서 이미 필터링됨)
    stores, // 필터링된 매장 목록
    selectedStore,
    storeDetail,

    // 위치 관련 상태
    userLocation,
    mapCenter,
    // 추천 매장 상태 추가
    recommendedStores,
    showRecommendedStores,

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
    isBookmarkMode,
    toggleBookmarkMode,
    setMapCenter,
    toggleFavorite,
    // 추천 매장 액션들 추가
    fetchRecommendedStores,
    setShowRecommendedStores,
    toggleRecommendedStores,

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
