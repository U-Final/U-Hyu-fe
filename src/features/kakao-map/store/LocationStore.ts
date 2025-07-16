import { create } from 'zustand';

// 위치 타입
interface Position {
  lat: number;
  lng: number;
}

// LocationStore 상태
interface LocationState {
  // 현재 위치
  currentLocation: Position | null;

  // 로딩 상태
  isLoading: boolean;

  // 에러 상태
  error: string | null;

  // 마커 표시 여부
  showMarker: boolean;

  // MapContext 업데이트 콜백
  mapContextCallback: ((center: Position) => void) | null;
}

// LocationStore 액션
interface LocationActions {
  // 현재 위치 가져오기
  getCurrentLocation: () => Promise<void>;

  // 마커 표시/숨김 토글
  toggleMarker: () => void;

  // 에러 클리어
  clearError: () => void;

  // MapContext 업데이트 콜백 설정
  setMapContextCallback: (
    callback: ((center: Position) => void) | null
  ) => void;
}

export type { LocationState, LocationActions };

export const useLocationStore = create<LocationState & LocationActions>(
  (set, get) => ({
    currentLocation: null,
    isLoading: false,
    error: null,
    showMarker: true,
    mapContextCallback: null as ((center: Position) => void) | null,

    getCurrentLocation: async () => {
      // 이미 로딩 중이면 중복 실행 방지
      if (get().isLoading) return;

      set({ isLoading: true, error: null });

      if (!navigator.geolocation) {
        set({
          isLoading: false,
          error: '이 브라우저는 위치 서비스를 지원하지 않습니다.',
        });
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true, // 높은 정확도 요청
              timeout: 10000, // 10초 타임아웃
              maximumAge: 300000, // 5분간 캐시 허용
            });
          }
        );

        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // 위치 정보 저장
        set({
          currentLocation: newLocation,
          isLoading: false,
          error: null,
        });

        // MapContext 콜백이 설정되어 있으면 지도 중심점 업데이트
        const { mapContextCallback } = get();
        if (mapContextCallback) {
          mapContextCallback(newLocation);
        }
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

        set({
          isLoading: false,
          error: errorMessage,
        });
      }
    },

    toggleMarker: () => {
      set(state => ({
        showMarker: !state.showMarker,
      }));
    },

    clearError: () => {
      set({ error: null });
    },

    setMapContextCallback: (callback: ((center: Position) => void) | null) => {
      set({ mapContextCallback: callback });
    },
  })
);

// 선택적 Selectors (성능 최적화)
// 현재 위치만 구독
export const useCurrentLocation = () =>
  useLocationStore(state => state.currentLocation);

// 로딩 상태만 구독
export const useLocationLoading = () =>
  useLocationStore(state => state.isLoading);

// 에러 상태만 구독
export const useLocationError = () => useLocationStore(state => state.error);

// 마커 표시 상태만 구독
export const useShowLocationMarker = () =>
  useLocationStore(state => state.showMarker);
