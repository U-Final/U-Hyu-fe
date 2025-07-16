import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import { useStoreList } from '../hooks/useMapQueryies';
import { useLocationStore } from '../store/LocationStore';
import type { Store } from '../types/store';

// 상태 타입 정의
interface MapState {
  // 지도 상태
  center: { lat: number; lng: number };
  stores: Store[];
  selectedStore: Store | null;

  // 검색 및 필터 상태
  searchValue: string;
  activeFilter: string;
  selectedCategory: string;
  selectedBrand: string;

  // UI 상태
  currentBottomSheetStep: 'list' | 'category' | 'brand';
  isLoading: boolean;
}

// 액션 타입 정의
type MapAction =
  | { type: 'SET_CENTER'; payload: { lat: number; lng: number } }
  | { type: 'SET_STORES'; payload: Store[] }
  | { type: 'SELECT_STORE'; payload: Store | null }
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'SET_ACTIVE_FILTER'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_SELECTED_BRAND'; payload: string }
  | { type: 'SET_BOTTOM_SHEET_STEP'; payload: 'list' | 'category' | 'brand' }
  | { type: 'SET_LOADING'; payload: boolean };

// 리듀서 구현
const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case 'SET_CENTER':
      return { ...state, center: action.payload };
    case 'SET_STORES':
      return { ...state, stores: action.payload };
    case 'SELECT_STORE':
      return { ...state, selectedStore: action.payload };
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'SET_ACTIVE_FILTER':
      return { ...state, activeFilter: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SELECTED_BRAND':
      return { ...state, selectedBrand: action.payload };
    case 'SET_BOTTOM_SHEET_STEP':
      return { ...state, currentBottomSheetStep: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      // 개발 환경에서만 에러 발생
      if (import.meta.env.MODE === 'development') {
        throw new Error(`Unknown action type: ${(action as MapAction).type}`);
      }
      return state;
  }
};

// Context 인터페이스
interface MapContextValue {
  state: MapState;
  actions: {
    setCenter: (center: { lat: number; lng: number }) => void;
    setStores: (stores: Store[]) => void;
    selectStore: (store: Store | null) => void;
    setSearchValue: (value: string) => void;
    setActiveFilter: (filter: string) => void;
    setSelectedCategory: (category: string) => void;
    setSelectedBrand: (brand: string) => void;
    setBottomSheetStep: (step: 'list' | 'category' | 'brand') => void;
    setLoading: (loading: boolean) => void;
    fetchNearbyStores: (center: { lat: number; lng: number }) => void;
  };
}

const MapContext = createContext<MapContextValue | null>(null);

// Provider 컴포넌트
export const MapProvider: React.FC<{
  children: React.ReactNode;
  initialCenter?: { lat: number; lng: number };
}> = ({ children, initialCenter }) => {
  // 환경변수에서 초기 좌표 읽기
  const envLat = Number(import.meta.env.VITE_MAP_INITIAL_LAT);
  const envLng = Number(import.meta.env.VITE_MAP_INITIAL_LNG);

  // 초기 center 결정: 프롭스 > 환경변수 > 기본값
  const center = initialCenter
    ? initialCenter
    : !isNaN(envLat) && !isNaN(envLng)
      ? { lat: envLat, lng: envLng }
      : { lat: 37.54699, lng: 127.09598 };

  const initialState: MapState = {
    center,
    stores: [],
    selectedStore: null,
    searchValue: '',
    activeFilter: '',
    selectedCategory: '',
    selectedBrand: '',
    currentBottomSheetStep: 'list',
    isLoading: false,
  };

  const [state, dispatch] = useReducer(mapReducer, initialState);

  // LocationStore에서 콜백 설정
  const setMapContextCallback = useLocationStore(
    state => state.setMapContextCallback
  );

  // API 호출을 위한 파라미터
  const storeListParams = {
    lat: state.center.lat,
    lng: state.center.lng,
    radius: 1000, // 1km 반경
  };

  // React Query를 사용한 매장 목록 조회
  const { data: storeListData, isLoading: isStoreListLoading } =
    useStoreList(storeListParams);

  // API 응답 데이터를 상태에 반영
  useEffect(() => {
    if (storeListData?.data) {
      dispatch({ type: 'SET_STORES', payload: storeListData.data });
    }
  }, [storeListData]);

  // 로딩 상태 동기화
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: isStoreListLoading });
  }, [isStoreListLoading]);

  // LocationStore와 연동: 지도 중심점 변경 시 콜백 설정
  useEffect(() => {
    const handleLocationUpdate = (newCenter: { lat: number; lng: number }) => {
      dispatch({ type: 'SET_CENTER', payload: newCenter });
    };

    setMapContextCallback(handleLocationUpdate);

    // 컴포넌트 언마운트 시 콜백 제거
    return () => {
      setMapContextCallback(() => {});
    };
  }, [setMapContextCallback]);

  // 액션 생성자들
  const actions = {
    setCenter: useCallback((center: { lat: number; lng: number }) => {
      dispatch({ type: 'SET_CENTER', payload: center });
    }, []),

    setStores: useCallback((stores: Store[]) => {
      dispatch({ type: 'SET_STORES', payload: stores });
    }, []),

    selectStore: useCallback((store: Store | null) => {
      dispatch({ type: 'SELECT_STORE', payload: store });
    }, []),

    setSearchValue: useCallback((value: string) => {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: value });
    }, []),

    setActiveFilter: useCallback((filter: string) => {
      dispatch({ type: 'SET_ACTIVE_FILTER', payload: filter });
    }, []),

    setSelectedCategory: useCallback((category: string) => {
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
    }, []),

    setSelectedBrand: useCallback((brand: string) => {
      dispatch({ type: 'SET_SELECTED_BRAND', payload: brand });
    }, []),

    setBottomSheetStep: useCallback((step: 'list' | 'category' | 'brand') => {
      dispatch({ type: 'SET_BOTTOM_SHEET_STEP', payload: step });
    }, []),

    setLoading: useCallback((loading: boolean) => {
      dispatch({ type: 'SET_LOADING', payload: loading });
    }, []),

    fetchNearbyStores: useCallback((center: { lat: number; lng: number }) => {
      dispatch({ type: 'SET_CENTER', payload: center });
    }, []),
  };

  return (
    <MapContext.Provider value={{ state, actions }}>
      {children}
    </MapContext.Provider>
  );
};

// 커스텀 훅
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};
