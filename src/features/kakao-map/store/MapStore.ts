import { getRecommendedStores } from '@recommendation/api/recommendedStoresApi';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

import type { StoreDetail, StoreListResponse } from '../api/types';
import type { Store } from '../types/store';
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
  // 위치 관련 상태
  userLocation: null,
  mapCenter: {
    lat: parseCoordinate(import.meta.env.VITE_MAP_INITIAL_LAT, 37.54699),
    lng: parseCoordinate(import.meta.env.VITE_MAP_INITIAL_LNG, 127.09598),
  },

  // 매장 관련 상태
  stores: [],
  selectedStore: null,
  storeDetail: null,

  // 추천 매장 초기 상태
  recommendedStores: [],
  showRecommendedStores: true, // 기본적으로 마커 표시

  // 로딩 상태
  loading: {
    location: false,
    stores: false,
    storeDetail: false,
    favorite: false,
    recommendedStores: false,
  },

  // 에러 상태
  errors: {
    location: null,
    stores: null,
    storeDetail: null,
    favorite: null,
  },

  // 필터 관련 상태 (백엔드 필터링으로 변경되어 사용하지 않음)
  currentFilters: {},
  lastFetchParams: null,
  lastFetchTime: null,
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
      getCurrentLocation: async () => {
        const { loading } = get();
        if (loading.location) return; // 이미 로딩 중이면 중복 실행 방지

        // 로딩 상태 시작
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
                maximumAge: 300000, // 5분간 캐시된 위치 사용
              });
            }
          );

          const newLocation: Position = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // 위치 정보 업데이트 및 지도 중심점 이동
          set(state => ({
            userLocation: newLocation,
            mapCenter: newLocation,
            loading: { ...state.loading, location: false },
          }));
        } catch (error) {
          // 위치 접근 에러 처리
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
       * 지도 중심점 설정
       */
      setMapCenter: (center: Position) => {
        set({ mapCenter: center });
      },

      //추천 매장 관련 액션 추가
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
        const { mapCenter, userLocation } = get();
        const position = userLocation || mapCenter;

        // 로딩 시작
        set(state => ({
          loading: { ...state.loading, recommendedStores: true },
          errors: { ...state.errors, recommendedStores: null },
        }));

        try {
          const params = {
            lat: position.lat,
            lon: position.lng,
            radius: 5000, // 5km
          };

          // API 호출 (가정)
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
        if (!queryData?.data) return;

        const newStores = queryData.data.map(store => ({ ...store }));

        // 현재 스토어와 비교해서 실제로 변경된 경우에만 업데이트
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

        // 같은 스토어를 다시 선택하는 경우 중복 업데이트 방지
        if (currentSelected?.storeId === store?.storeId) return;

        set({ selectedStore: store });

        // 매장 선택 시 해당 위치로 지도 중심점 이동
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

        // 같은 상세 정보인 경우 중복 업데이트 방지
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

      // 🛠️ 유틸리티 액션들
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
    { name: 'map-store' } // Redux DevTools에서 표시될 이름
  )
);

// 특정 상태만 구독하여 불필요한 리렌더링 방지
export const useMapCenter = () => useMapStore(state => state.mapCenter);
export const useStores = () => useMapStore(state => state.stores);
export const useFilteredStores = () => useMapStore(state => state.stores);
export const useSelectedStore = () => useMapStore(state => state.selectedStore);
export const useUserLocation = () => useMapStore(state => state.userLocation);
export const useMapLoading = () => useMapStore(state => state.loading);
export const useMapErrors = () => useMapStore(state => state.errors);
export const useRecommendedStores = () =>
  useMapStore(state => state.recommendedStores);
export const useShowRecommendedStores = () =>
  useMapStore(state => state.showRecommendedStores);
