import { useCallback, useState, useEffect } from 'react';

import type { NormalizedPlace } from '../api/types';

interface SearchMarkerState {
  /** 표시할 마커들 */
  markers: NormalizedPlace[];
  /** 선택된 마커 */
  selectedMarker: NormalizedPlace | null;
  /** 지도 범위 조정이 필요한지 여부 */
  shouldFitBounds: boolean;
  /** 마커 표시 여부 */
  visible: boolean;
}

interface SearchMarkerActions {
  /** 마커들 설정 */
  setMarkers: (places: NormalizedPlace[]) => void;
  /** 마커 선택 */
  selectMarker: (place: NormalizedPlace | null) => void;
  /** 지도 범위 조정 완료 처리 */
  boundsAdjusted: () => void;
  /** 마커 표시/숨김 토글 */
  toggleVisibility: () => void;
  /** 마커 초기화 */
  clearMarkers: () => void;
}

/**
 * 검색 결과 마커 관리를 위한 커스텀 훅
 */
export const useSearchMarkers = () => {
  const [state, setState] = useState<SearchMarkerState>({
    markers: [],
    selectedMarker: null,
    shouldFitBounds: false,
    visible: true,
  });

  const setMarkers = useCallback((places: NormalizedPlace[]) => {
    setState((prev) => ({
      ...prev,
      markers: places,
      selectedMarker: null,
      shouldFitBounds: places.length > 0,
    }));

    if (import.meta.env.MODE === 'development') {
      console.log('🗺️ 검색 마커 설정:', {
        count: places.length,
        places: places.map(p => ({ id: p.id, name: p.name })),
      });
    }
  }, []);

  const selectMarker = useCallback((place: NormalizedPlace | null) => {
    setState((prev) => ({
      ...prev,
      selectedMarker: place,
    }));

    if (import.meta.env.MODE === 'development') {
      console.log('🗺️ 마커 선택:', place ? place.name : 'none');
    }
  }, []);

  const boundsAdjusted = useCallback(() => {
    setState((prev) => ({
      ...prev,
      shouldFitBounds: false,
    }));
  }, []);

  const toggleVisibility = useCallback(() => {
    setState((prev) => ({
      ...prev,
      visible: !prev.visible,
    }));
  }, []);

  const clearMarkers = useCallback(() => {
    setState({
      markers: [],
      selectedMarker: null,
      shouldFitBounds: false,
      visible: true,
    });

    if (import.meta.env.MODE === 'development') {
      console.log('🗺️ 검색 마커 초기화');
    }
  }, []);

  const actions: SearchMarkerActions = {
    setMarkers,
    selectMarker,
    boundsAdjusted,
    toggleVisibility,
    clearMarkers,
  };

  return {
    ...state,
    ...actions,
  };
};

/**
 * 지도 범위 계산을 위한 유틸리티 훅
 */
export const useMapBounds = () => {
  const calculateBounds = useCallback((places: NormalizedPlace[]) => {
    if (places.length === 0) return null;

    if (places.length === 1) {
      const place = places[0];
      // 단일 장소인 경우 적당한 줌 레벨로 중심 맞춤
      return {
        center: { lat: place.latitude, lng: place.longitude },
        level: 3, // 카카오맵 줌 레벨 (1~14, 낮을수록 확대)
      };
    }

    // 여러 장소인 경우 모든 장소를 포함하는 범위 계산
    const latitudes = places.map(p => p.latitude);
    const longitudes = places.map(p => p.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    // 패딩을 위해 범위를 약간 확장
    const latPadding = (maxLat - minLat) * 0.1;
    const lngPadding = (maxLng - minLng) * 0.1;

    return {
      bounds: {
        sw: { lat: minLat - latPadding, lng: minLng - lngPadding },
        ne: { lat: maxLat + latPadding, lng: maxLng + lngPadding },
      },
    };
  }, []);

  return { calculateBounds };
};

/**
 * 마커 클러스터링을 위한 훅
 */
interface ClusterOptions {
  /** 클러스터링 시작 거리 (픽셀) */
  gridSize?: number;
  /** 최소 클러스터 크기 */
  minimumClusterSize?: number;
  /** 클러스터링 활성화 여부 */
  enabled?: boolean;
}

export const useMarkerClustering = (
  markers: NormalizedPlace[],
  options: ClusterOptions = {}
) => {
  const {
    gridSize = 60,
    minimumClusterSize = 2,
    enabled = true,
  } = options;

  const [clusters, setClusters] = useState<{
    individual: NormalizedPlace[];
    clustered: { places: NormalizedPlace[]; center: { lat: number; lng: number } }[];
  }>({ individual: [], clustered: [] });

  const calculateClusters = useCallback(() => {
    if (!enabled || markers.length === 0) {
      setClusters({ individual: markers, clustered: [] });
      return;
    }

    // 간단한 그리드 기반 클러스터링 알고리즘
    const processed = new Set<string>();
    const clustered: { places: NormalizedPlace[]; center: { lat: number; lng: number } }[] = [];
    const individual: NormalizedPlace[] = [];

    markers.forEach((marker) => {
      if (processed.has(marker.id)) return;

      const nearby: NormalizedPlace[] = [marker];
      processed.add(marker.id);

      // 근처의 다른 마커들 찾기
      markers.forEach((otherMarker) => {
        if (processed.has(otherMarker.id) || marker.id === otherMarker.id) return;

        const distance = calculateDistance(
          { lat: marker.latitude, lng: marker.longitude },
          { lat: otherMarker.latitude, lng: otherMarker.longitude }
        );

        // gridSize를 미터로 변환 (대략적인 계산)
        const gridSizeInMeters = gridSize * 50; // 픽셀당 약 50미터로 가정

        if (distance <= gridSizeInMeters) {
          nearby.push(otherMarker);
          processed.add(otherMarker.id);
        }
      });

      if (nearby.length >= minimumClusterSize) {
        // 클러스터 중심점 계산
        const center = {
          lat: nearby.reduce((sum, p) => sum + p.latitude, 0) / nearby.length,
          lng: nearby.reduce((sum, p) => sum + p.longitude, 0) / nearby.length,
        };
        clustered.push({ places: nearby, center });
      } else {
        individual.push(...nearby);
      }
    });

    setClusters({ individual, clustered });
  }, [markers, enabled, gridSize, minimumClusterSize]);

  useEffect(() => {
    calculateClusters();
  }, [calculateClusters]);

  return clusters;
};

/**
 * 두 좌표 간의 거리 계산 (미터)
 */
const calculateDistance = (
  pos1: { lat: number; lng: number },
  pos2: { lat: number; lng: number }
): number => {
  const R = 6371e3; // 지구 반지름 (미터)
  const φ1 = (pos1.lat * Math.PI) / 180;
  const φ2 = (pos2.lat * Math.PI) / 180;
  const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
  const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};