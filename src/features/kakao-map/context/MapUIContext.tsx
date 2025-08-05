import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from 'react';

import type { MapDragBottomSheetRef } from '../components/controls/MapDragBottomSheet';

/**
 * 지도 관련 순수 UI 상태 인터페이스
 * 비즈니스 로직과 분리된 UI 상태만 관리
 */
interface MapUIState {
  // 검색 UI 상태
  searchValue: string;
  isSearchFocused: boolean;

  // 바텀시트 네비게이션 상태
  currentBottomSheetStep: 'list' | 'category' | 'brand' | 'mymap';

  // 바텀시트 상태 제거 - ref로만 제어

  // 필터 UI 상태
  selectedCategory: string;
  selectedBrand: string;
  activeRegionFilter: string;
  activeCategoryFilter: string; // FilterTabs에서 선택된 카테고리

  // 지도 UI 상태
  selectedMarkerId: number | null;
  showLocationMarker: boolean;

  // 인터랙션 상태
  showFilterDropdown: boolean;
  isMapDragging: boolean;
}

/**
 * UI 상태 변경을 위한 액션 타입 정의
 */
type MapUIAction =
  // 검색 관련 액션
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'SET_SEARCH_FOCUSED'; payload: boolean }
  | { type: 'CLEAR_SEARCH' }

  // 바텀시트 관련 액션
  | {
      type: 'SET_BOTTOM_SHEET_STEP';
      payload: 'list' | 'category' | 'brand' | 'mymap';
    }
  | { type: 'SET_BOTTOM_SHEET_EXPANDED'; payload: boolean }
  | { type: 'TOGGLE_BOTTOM_SHEET' }

  // 필터 관련 액션
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_SELECTED_BRAND'; payload: string }
  | { type: 'SET_REGION_FILTER'; payload: string }
  | { type: 'SET_CATEGORY_FILTER'; payload: string }
  | { type: 'RESET_FILTERS' }

  // 지도 UI 관련 액션
  | { type: 'SET_SELECTED_MARKER'; payload: number | null }
  | { type: 'TOGGLE_LOCATION_MARKER' }
  | { type: 'SET_MAP_DRAGGING'; payload: boolean }

  // 기타 UI 액션
  | { type: 'TOGGLE_FILTER_DROPDOWN' }
  | { type: 'RESET_ALL_UI' };

/**
 * UI 상태 리듀서
 * 각 액션에 따라 상태를 업데이트하는 순수 함수
 */
const mapUIReducer = (state: MapUIState, action: MapUIAction): MapUIState => {
  switch (action.type) {
    // 검색 관련 상태 변경
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'SET_SEARCH_FOCUSED':
      return { ...state, isSearchFocused: action.payload };
    case 'CLEAR_SEARCH':
      return { ...state, searchValue: '', isSearchFocused: false };

    // 바텀시트 관련 상태 변경
    case 'SET_BOTTOM_SHEET_STEP':
      return { ...state, currentBottomSheetStep: action.payload };

    // 필터 관련 상태 변경
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
        selectedBrand: '', // 카테고리 변경 시 브랜드 초기화
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

    // 지도 UI 관련 상태 변경
    case 'SET_SELECTED_MARKER':
      return { ...state, selectedMarkerId: action.payload };
    case 'TOGGLE_LOCATION_MARKER':
      return { ...state, showLocationMarker: !state.showLocationMarker };
    case 'SET_MAP_DRAGGING':
      return { ...state, isMapDragging: action.payload };

    // 기타 UI 상태 변경
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
    // 검색 관련 액션
    setSearchValue: (value: string) => void;
    setSearchFocused: (focused: boolean) => void;
    clearSearch: () => void;

    // 바텀시트 관련 액션 (네비게이션만)
    setBottomSheetStep: (step: 'list' | 'category' | 'brand' | 'mymap') => void;
    // setBottomSheetExpanded: (expanded: boolean) => void;
    // toggleBottomSheet: () => void;

    // 필터 관련 액션
    setSelectedCategory: (category: string) => void;
    setSelectedBrand: (brand: string) => void;
    setRegionFilter: (region: string) => void;
    setCategoryFilter: (category: string) => void;
    resetFilters: () => void;

    // 지도 UI 관련 액션
    setSelectedMarker: (markerId: number | null) => void;
    toggleLocationMarker: () => void;
    setMapDragging: (dragging: boolean) => void;

    // 기타 UI 액션
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

  // 메모이제이션된 액션 함수들
  const actions = {
    // 검색 관련 액션
    setSearchValue: useCallback((value: string) => {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: value });
    }, []),

    setSearchFocused: useCallback((focused: boolean) => {
      dispatch({ type: 'SET_SEARCH_FOCUSED', payload: focused });
    }, []),

    clearSearch: useCallback(() => {
      dispatch({ type: 'CLEAR_SEARCH' });
    }, []),

    // 바텀시트 관련 액션
    setBottomSheetStep: useCallback(
      (step: 'list' | 'category' | 'brand' | 'mymap') => {
        dispatch({ type: 'SET_BOTTOM_SHEET_STEP', payload: step });
      },
      []
    ),

    setBottomSheetExpanded: useCallback((expanded: boolean) => {
      dispatch({ type: 'SET_BOTTOM_SHEET_EXPANDED', payload: expanded });
    }, []),

    toggleBottomSheet: useCallback(() => {
      dispatch({ type: 'TOGGLE_BOTTOM_SHEET' });
    }, []),

    // 바텀시트 통합 제어 액션 제거 - ref로만 제어

    // 필터 관련 액션
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

    // 지도 UI 관련 액션
    setSelectedMarker: useCallback((markerId: number | null) => {
      dispatch({ type: 'SET_SELECTED_MARKER', payload: markerId });
    }, []),

    toggleLocationMarker: useCallback(() => {
      dispatch({ type: 'TOGGLE_LOCATION_MARKER' });
    }, []),

    setMapDragging: useCallback((dragging: boolean) => {
      dispatch({ type: 'SET_MAP_DRAGGING', payload: dragging });
    }, []),

    // 기타 UI 액션
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
