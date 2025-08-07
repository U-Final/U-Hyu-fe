import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from 'react';

import type { MapDragBottomSheetRef } from '../components/controls/MapDragBottomSheet';

/**
 * 지도 관련 순수 UI 상태 인터페이스 (단 바텀 관련 상태는 ref로만 제어)
 * 비즈니스 로직과 분리된 UI 상태만 관리
 */
interface MapUIState {
  searchValue: string;
  isSearchFocused: boolean;
  currentBottomSheetStep: 'list' | 'category' | 'brand' | 'mymap';
  selectedCategory: string;
  selectedBrand: string;
  activeRegionFilter: string;
  activeCategoryFilter: string;
  selectedMarkerId: number | null;
  showLocationMarker: boolean;

  showFilterDropdown: boolean;
  isMapDragging: boolean;
}

/**
 * UI 상태 변경을 위한 액션 타입 정의
 */
type MapUIAction =
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'SET_SEARCH_FOCUSED'; payload: boolean }
  | { type: 'CLEAR_SEARCH' }
  | {
      type: 'SET_BOTTOM_SHEET_STEP';
      payload: 'list' | 'category' | 'brand' | 'mymap';
    }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_SELECTED_BRAND'; payload: string }
  | { type: 'SET_REGION_FILTER'; payload: string }
  | { type: 'SET_CATEGORY_FILTER'; payload: string }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_SELECTED_MARKER'; payload: number | null }
  | { type: 'TOGGLE_LOCATION_MARKER' }
  | { type: 'SET_MAP_DRAGGING'; payload: boolean }
  | { type: 'TOGGLE_FILTER_DROPDOWN' }
  | { type: 'RESET_ALL_UI' };

/**
 * UI 상태 리듀서
 * 각 액션에 따라 상태를 업데이트하는 순수 함수
 */
const mapUIReducer = (state: MapUIState, action: MapUIAction): MapUIState => {
  switch (action.type) {
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'SET_SEARCH_FOCUSED':
      return { ...state, isSearchFocused: action.payload };
    case 'CLEAR_SEARCH':
      return { ...state, searchValue: '', isSearchFocused: false };
    case 'SET_BOTTOM_SHEET_STEP':
      return { ...state, currentBottomSheetStep: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
        selectedBrand: '',
      };
    case 'SET_SELECTED_BRAND':
      return { ...state, selectedBrand: action.payload };
    case 'SET_REGION_FILTER':
      return { ...state, activeRegionFilter: action.payload };
    case 'SET_CATEGORY_FILTER':
      return { ...state, activeCategoryFilter: action.payload };
    case 'RESET_FILTERS':
      return {
        ...state,
        selectedCategory: '',
        selectedBrand: '',
        activeRegionFilter: 'all',
        activeCategoryFilter: 'all',
        searchValue: '',
      };
    case 'SET_SELECTED_MARKER':
      return { ...state, selectedMarkerId: action.payload };
    case 'TOGGLE_LOCATION_MARKER':
      return { ...state, showLocationMarker: !state.showLocationMarker };
    case 'SET_MAP_DRAGGING':
      return { ...state, isMapDragging: action.payload };
    case 'TOGGLE_FILTER_DROPDOWN':
      return { ...state, showFilterDropdown: !state.showFilterDropdown };
    case 'RESET_ALL_UI':
      return initialUIState;

    default:
      return state;
  }
};

/**
 * Context 값의 타입 정의
 * 상태와 액션 함수들을 포함
 */
interface MapUIContextValue {
  state: MapUIState;
  bottomSheetRef: React.RefObject<MapDragBottomSheetRef | null>;
  actions: {
    setSearchValue: (value: string) => void;
    setSearchFocused: (focused: boolean) => void;
    clearSearch: () => void;
    setBottomSheetStep: (step: 'list' | 'category' | 'brand' | 'mymap') => void;
    setSelectedCategory: (category: string) => void;
    setSelectedBrand: (brand: string) => void;
    setRegionFilter: (region: string) => void;
    setCategoryFilter: (category: string) => void;
    resetFilters: () => void;

    setSelectedMarker: (markerId: number | null) => void;
    toggleLocationMarker: () => void;
    setMapDragging: (dragging: boolean) => void;

    toggleFilterDropdown: () => void;
    resetAllUI: () => void;
  };
}

/**
 * 초기 UI 상태
 */
const initialUIState: MapUIState = {
  searchValue: '',
  isSearchFocused: false,
  currentBottomSheetStep: 'list',
  selectedCategory: '',
  selectedBrand: '',
  activeRegionFilter: 'all',
  activeCategoryFilter: 'all',
  selectedMarkerId: null,
  showLocationMarker: true,
  showFilterDropdown: false,
  isMapDragging: false,
};

/**
 * MapUI Context 생성
 */
const MapUIContext = createContext<MapUIContextValue | null>(null);

/**
 * MapUI Provider 컴포넌트
 * 지도 관련 UI 상태를 하위 컴포넌트에 제공
 */
export const MapUIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(mapUIReducer, initialUIState);
  const bottomSheetRef = useRef<MapDragBottomSheetRef>(null);

  const actions = {
    setSearchValue: useCallback((value: string) => {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: value });
    }, []),

    setSearchFocused: useCallback((focused: boolean) => {
      dispatch({ type: 'SET_SEARCH_FOCUSED', payload: focused });
    }, []),

    clearSearch: useCallback(() => {
      dispatch({ type: 'CLEAR_SEARCH' });
    }, []),

    setBottomSheetStep: useCallback(
      (step: 'list' | 'category' | 'brand' | 'mymap') => {
        dispatch({ type: 'SET_BOTTOM_SHEET_STEP', payload: step });
      },
      []
    ),

    setSelectedCategory: useCallback((category: string) => {
      dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
    }, []),

    setSelectedBrand: useCallback((brand: string) => {
      dispatch({ type: 'SET_SELECTED_BRAND', payload: brand });
    }, []),

    setRegionFilter: useCallback((region: string) => {
      dispatch({ type: 'SET_REGION_FILTER', payload: region });
    }, []),

    setCategoryFilter: useCallback((category: string) => {
      dispatch({ type: 'SET_CATEGORY_FILTER', payload: category });
    }, []),

    resetFilters: useCallback(() => {
      dispatch({ type: 'RESET_FILTERS' });
    }, []),

    setSelectedMarker: useCallback((markerId: number | null) => {
      dispatch({ type: 'SET_SELECTED_MARKER', payload: markerId });
    }, []),

    toggleLocationMarker: useCallback(() => {
      dispatch({ type: 'TOGGLE_LOCATION_MARKER' });
    }, []),

    setMapDragging: useCallback((dragging: boolean) => {
      dispatch({ type: 'SET_MAP_DRAGGING', payload: dragging });
    }, []),

    toggleFilterDropdown: useCallback(() => {
      dispatch({ type: 'TOGGLE_FILTER_DROPDOWN' });
    }, []),

    resetAllUI: useCallback(() => {
      dispatch({ type: 'RESET_ALL_UI' });
    }, []),
  };

  return (
    <MapUIContext.Provider value={{ state, actions, bottomSheetRef }}>
      {children}
    </MapUIContext.Provider>
  );
};

/**
 * MapUI Context 사용을 위한 커스텀 훅
 * Provider 외부에서 사용 시 에러 발생
 */
export const useMapUIContext = () => {
  const context = useContext(MapUIContext);
  if (!context) {
    throw new Error('useMapUIContext must be used within a MapUIProvider');
  }
  return context;
};
