import { mapApi } from '@kakao-map/api/mapApi';
import { getRecommendedStores } from '@recommendation/api/recommendedStoresApi';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

import type { StoreDetail, StoreListResponse } from '../api/types';
import type { Store } from '../types/store';
import { getSearchRadiusByZoomLevel } from '../utils/zoomUtils';
import type { MapStoreActions, MapStoreState, Position } from './types';

/**
 * 환경변수에서 좌표값을 안전하게 파싱하는 유틸리티 함수
 */
const parseCoordinate = (
  value: string | undefined,
  defaultValue: number
): number => {
  const parsed = Number(value);
  return !isNaN(parsed) ? parsed : defaultValue;
};

/**
 * MapStore 초기 상태
 */
const initialState: MapStoreState = {
  userLocation: null,
  mapCenter: {
    lat: parseCoordinate(import.meta.env.VITE_MAP_INITIAL_LAT, 37.54699),
    lng: parseCoordinate(import.meta.env.VITE_MAP_INITIAL_LNG, 127.09598),
  },

  zoomLevel: 4,
  searchRadius: getSearchRadiusByZoomLevel(4),

  searchParams: null,

  stores: [],
  selectedStore: null,
  storeDetail: null,

  recommendedStores: [],
  showRecommendedStores: true,

  loading: {
    location: false,
    stores: false,
    storeDetail: false,
    favorite: false,
    recommendedStores: false,
  },

  errors: {
    location: null,
    stores: null,
    storeDetail: null,
    favorite: null,
  },

  currentFilters: {},
  lastFetchParams: null,
  lastFetchTime: null,

  bookmarkMode: false,
  bookmarkStores: [],
};

/**
 * MapStore 생성
 * 지도 관련 비즈니스 로직과 데이터 상태를 관리
 */
export const useMapStore = create<MapStoreState & MapStoreActions>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      ...initialState,

      /**
       * 사용자의 현재 위치를 가져오는 비동기 함수
       * GPS 권한 요청 및 에러 처리 포함
       */
      getCurrentLocation: async (force = false) => {
        const { loading } = get();
        if (loading.location && !force) return;

        set(state => ({
          loading: { ...state.loading, location: true },
          errors: { ...state.errors, location: null },
        }));

        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
              });
            }
          );

          const newLocation: Position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          set(state => ({
            userLocation: newLocation,
            mapCenter: newLocation,
            loading: { ...state.loading, location: false },
          }));
        } catch (error) {
          let errorMessage = '위치를 가져올 수 없습니다.';
          if (error instanceof GeolocationPositionError) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = '위치 접근 권한이 거부되었습니다.';
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = '위치 정보를 사용할 수 없습니다.';
                break;
              case error.TIMEOUT:
                errorMessage = '위치 요청 시간이 초과되었습니다.';
                break;
            }
          }

          set(state => ({
            loading: { ...state.loading, location: false },
            errors: { ...state.errors, location: errorMessage },
          }));
        }
      },

      /**
       * 즐겨찾기
       * @param center
       */
      setBookmarkMode: (mode: boolean) => {
        set({ bookmarkMode: mode });
      },

      toggleBookmarkMode: () => {
        const next = !get().bookmarkMode;
        if (next) {
          get().fetchBookmarkStores();
        }
        set({ bookmarkMode: next });
      },

      fetchBookmarkStores: async () => {
        try {
          const stores = await mapApi.getBookmark();
          set({ bookmarkStores: stores });
        } catch {
          // 에러는 상위 컴포넌트에서 처리됨
        }
      },

      refreshBookmarkStores: async () => {
        try {
          const stores = await mapApi.getBookmark();
          set({ bookmarkStores: stores });
        } catch {
          // 에러는 상위 컴포넌트에서 처리됨
        }
      },

      /**
       * 지도 중심점 설정
       */
      setMapCenter: (center: Position) => {
        set({ mapCenter: center });
      },

      /**
       * 줌 레벨 설정 및 검색 반경 자동 업데이트
       */
      setZoomLevel: (level: number) => {
        const newRadius = getSearchRadiusByZoomLevel(level);
        set({
          zoomLevel: level,
          searchRadius: newRadius,
        });
      },

      /**
       * 현재 줌 레벨을 기반으로 검색 반경 업데이트
       */
      updateSearchRadius: () => {
        const { zoomLevel } = get();
        const newRadius = getSearchRadiusByZoomLevel(zoomLevel);
        set({ searchRadius: newRadius });
      },

      /**
       * 검색 실행 파라미터 설정 (재검색 버튼 클릭시에만 호출)
       */
      setSearchParams: (params) => {
        set({ searchParams: params });
      },

      setRecommendedStores: (stores: Store[]) => {
        set({ recommendedStores: stores });
      },

      setShowRecommendedStores: (show: boolean) => {
        set({ showRecommendedStores: show });
      },

      toggleRecommendedStores: () => {
        set(state => ({
          showRecommendedStores: !state.showRecommendedStores,
        }));
      },

      fetchRecommendedStores: async () => {
        const { mapCenter, userLocation, searchRadius } = get();
        const position = userLocation || mapCenter;

        set(state => ({
          loading: { ...state.loading, recommendedStores: true },
          errors: { ...state.errors, recommendedStores: null },
        }));

        try {
          const params = {
            lat: position.lat,
            lon: position.lng,
            radius: searchRadius,
          };

          const recommendedStores = await getRecommendedStores(params);

          set(state => ({
            recommendedStores,
            loading: { ...state.loading, recommendedStores: false },
          }));
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '추천 매장을 가져오는데 실패했습니다.';

          set(state => ({
            loading: { ...state.loading, recommendedStores: false },
            errors: { ...state.errors, recommendedStores: errorMessage },
          }));
        }
      },

      /**
       * 매장 목록 직접 설정
       */
      setStores: (stores: Store[]) => {
        set({ stores });
      },

      /**
       * React Query 응답 데이터를 매장 목록으로 변환하여 설정
       * 중복 업데이트 방지 로직 포함
       */
      setStoresFromQuery: (queryData: StoreListResponse | undefined) => {
        const newStores = queryData?.data?.map(store => ({ ...store })) ?? [];

        const currentStores = get().stores;
        const hasChanged =
          newStores.length !== currentStores.length ||
          newStores.some(
            (store, index) =>
              !currentStores[index] ||
              store.storeId !== currentStores[index].storeId
          );

        if (hasChanged) {
          set({ stores: newStores });
        }
      },

      /**
       * 매장 선택 및 지도 중심점 이동
       * 중복 선택 방지 로직 포함
       */
      selectStore: (store: Store | null) => {
        const currentSelected = get().selectedStore;

        if (currentSelected?.storeId === store?.storeId) return;

        set({ selectedStore: store });

        if (store) {
          set({ mapCenter: { lat: store.latitude, lng: store.longitude } });
        }
      },

      /**
       * 매장 상세 정보 설정
       * 중복 업데이트 방지 로직 포함
       */
      setStoreDetail: (detail: StoreDetail | null) => {
        const currentDetail = get().storeDetail;

        if (currentDetail === detail) return;

        set({ storeDetail: detail });
      },

      /**
       * 현재 적용된 필터 상태 저장
       * 실제 필터링은 백엔드 API에서 처리됨
       */
      applyFilters: filters => {
        set({ currentFilters: filters });
      },

      /**
       * 필터링된 매장 목록 반환
       * 백엔드에서 이미 필터링된 데이터를 그대로 반환
       */
      getFilteredStores: () => {
        const { stores } = get();
        return stores;
      },

      /**
       * 특정 타입의 로딩 상태 설정
       */
      setLoading: (type, loading) => {
        set(state => ({
          loading: { ...state.loading, [type]: loading },
        }));
      },

      /**
       * 특정 타입의 에러 상태 설정
       */
      setError: (type, error) => {
        set(state => ({
          errors: { ...state.errors, [type]: error },
        }));
      },

      /**
       * 특정 타입의 에러 상태 초기화
       */
      clearError: type => {
        set(state => ({
          errors: { ...state.errors, [type]: null },
        }));
      },

      /**
       * 모든 에러 상태 초기화
       */
      clearAllErrors: () => {
        set(() => ({
          errors: {
            location: null,
            stores: null,
            storeDetail: null,
            favorite: null,
            recommendedStores: null,
          },
        }));
      },

      /**
       * 전체 상태를 초기 상태로 리셋
       */
      reset: () => {
        set(initialState);
      },
    })),
    { name: 'map-store' }
  )
);

export const useMapCenter = () => useMapStore(state => state.mapCenter);
export const useStores = () => useMapStore(state => state.stores);
export const useFilteredStores = () => useMapStore(state => state.stores);
export const useSelectedStore = () => useMapStore(state => state.selectedStore);
export const useUserLocation = () => useMapStore(state => state.userLocation);
export const useMapLoading = () => useMapStore(state => state.loading);
export const useMapErrors = () => useMapStore(state => state.errors);

export const useZoomLevel = () => useMapStore(state => state.zoomLevel);
export const useSearchRadius = () => useMapStore(state => state.searchRadius);

export const useRecommendedStores = () =>
  useMapStore(state => state.recommendedStores);
export const useShowRecommendedStores = () =>
  useMapStore(state => state.showRecommendedStores);
export const useBookmarkMode = () => useMapStore(state => state.bookmarkMode);
export const useBookmarkStores = () =>
  useMapStore(state => state.bookmarkStores);
export const useFetchBookmarkStores = () =>
  useMapStore(state => state.fetchBookmarkStores);
export const useRefreshBookmarkStores = () =>
  useMapStore(state => state.refreshBookmarkStores);
