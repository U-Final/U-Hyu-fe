import { useCallback, useRef, useState } from 'react';

/**
 * 거리 기반 재검색 기능을 위한 상태 관리 훅
 * 검색 위치에서 특정 거리 이상 이동 시 재검색 버튼 표시
 */

const SHOW_BUTTON_DISTANCE = import.meta.env.VITE_SEARCH_DISTANCE_THRESHOLD 
  ? parseInt(import.meta.env.VITE_SEARCH_DISTANCE_THRESHOLD) 
  : 5000;

export interface SearchState {
  /** 재검색 버튼 표시 여부 */
  showButton: boolean;
  /** 마지막 검색 위치 */
  lastSearchPosition: { lat: number; lng: number } | null;
  /** 현재 위치에서 마지막 검색 위치까지의 거리 (미터) */
  distanceFromLastSearch: number;
}

export interface SearchActions {
  /** 지도 이동 시 호출 - 거리 계산 및 버튼 표시 여부 결정 */
  handleMapMove: (newPosition: { lat: number; lng: number }) => void;
  /** 재검색 버튼 클릭 시 호출 */
  handleSearch: () => void;
  /** 검색 실행 시 호출 - 기준 위치 업데이트 */
  updateSearchPosition: (position: { lat: number; lng: number }) => void;
  /** 상태 초기화 */
  reset: () => void;
}

export const useDistanceBasedSearch = () => {
  const [state, setState] = useState<SearchState>({
    showButton: false,
    lastSearchPosition: null,
    distanceFromLastSearch: 0,
  });

  const lastSearchPositionRef = useRef<{ lat: number; lng: number } | null>(null);
  
  const lastCalculatedDistance = useRef<{
    from: { lat: number; lng: number };
    to: { lat: number; lng: number };
    distance: number;
  } | null>(null);

  /**
   * 두 좌표 간의 거리 계산 (Haversine formula)
   * 기존 MapWithMarkers의 로직과 동일하지만 캐싱 추가
   */
  const calculateDistance = useCallback(
    (pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }) => {
      if (
        lastCalculatedDistance.current &&
        lastCalculatedDistance.current.from.lat === pos1.lat &&
        lastCalculatedDistance.current.from.lng === pos1.lng &&
        lastCalculatedDistance.current.to.lat === pos2.lat &&
        lastCalculatedDistance.current.to.lng === pos2.lng
      ) {
        return lastCalculatedDistance.current.distance;
      }

      const R = 6371e3;
      const φ1 = (pos1.lat * Math.PI) / 180;
      const φ2 = (pos2.lat * Math.PI) / 180;
      const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
      const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      lastCalculatedDistance.current = {
        from: pos1,
        to: pos2,
        distance,
      };

      return distance;
    },
    []
  );

  /**
   * 지도 이동 시 거리 계산 및 버튼 표시 여부 결정
   */
  const handleMapMove = useCallback(
    (newPosition: { lat: number; lng: number }) => {
      if (!lastSearchPositionRef.current) {
        lastSearchPositionRef.current = newPosition;
        setState(prev => ({
          ...prev,
          lastSearchPosition: newPosition,
          distanceFromLastSearch: 0,
          showButton: false,
        }));
        return;
      }

      const distance = calculateDistance(lastSearchPositionRef.current, newPosition);

      setState(prev => ({
        ...prev,
        distanceFromLastSearch: distance,
        showButton: distance >= SHOW_BUTTON_DISTANCE,
      }));

    },
    [calculateDistance]
  );

  /**
   * 재검색 버튼 클릭 시 실행
   * 실제 검색은 호출하는 컴포넌트에서 처리
   */
  const handleSearch = useCallback(() => {
    setState(prev => ({
      ...prev,
      showButton: false,
      distanceFromLastSearch: 0,
    }));

  }, []);

  /**
   * 검색 실행 시 기준 위치 업데이트
   */
  const updateSearchPosition = useCallback((position: { lat: number; lng: number }) => {
    lastSearchPositionRef.current = position;
    setState(prev => ({
      ...prev,
      lastSearchPosition: position,
      showButton: false,
      distanceFromLastSearch: 0,
    }));

    lastCalculatedDistance.current = null;

  }, []);

  /**
   * 상태 완전 초기화
   */
  const reset = useCallback(() => {
    lastSearchPositionRef.current = null;
    setState({
      showButton: false,
      lastSearchPosition: null,
      distanceFromLastSearch: 0,
    });
    lastCalculatedDistance.current = null;

  }, []);

  const actions: SearchActions = {
    handleMapMove,
    handleSearch,
    updateSearchPosition,
    reset,
  };

  return {
    ...state,
    ...actions,
    
    constants: {
      SHOW_BUTTON_DISTANCE,
    },
  };
};