// features/kakao-map/hooks/useZoomSearchTrigger.ts
import { useEffect, useRef, useState } from 'react';

import { useSearchRadius, useZoomLevel } from '../store/MapStore';

interface Options {
  /** 줌 레벨 차이가 이 값 이상일 때 버튼 표시 (기본 1) */
  levelDeltaThreshold?: number;
}

/**
 * 줌 레벨 변화에 따라 재검색 버튼을 보여줄지 판단하는 훅
 * - 마지막 "검색 시점" 줌 레벨을 기억하고, 현재 줌과 비교
 * - 버튼 클릭 시 markSearched()로 기준 갱신
 */
export function useZoomSearchTrigger(opts: Options = {}) {
  const { levelDeltaThreshold = 1 } = opts;

  const zoomLevel = useZoomLevel();
  const radius = useSearchRadius();
  const lastSearchZoomRef = useRef<number | null>(null);
  const [visibleByZoom, setVisibleByZoom] = useState(false);

  // 최초 기준값 세팅
  useEffect(() => {
    if (lastSearchZoomRef.current === null && typeof zoomLevel === 'number') {
      lastSearchZoomRef.current = zoomLevel;
    }
  }, [zoomLevel]);

  // 현재 줌과 마지막 검색 줌 비교
  useEffect(() => {
    if (lastSearchZoomRef.current === null) return;
    const diff = Math.abs(zoomLevel - lastSearchZoomRef.current);
    setVisibleByZoom(diff >= levelDeltaThreshold);
  }, [zoomLevel, levelDeltaThreshold]);

  // 검색 수행 후 기준 갱신 (버튼 숨김)
  const markSearched = () => {
    lastSearchZoomRef.current = zoomLevel;
    setVisibleByZoom(false);
  };

  return {
    visibleByZoom,
    currentZoomLevel: zoomLevel,
    currentRadius: radius,
    markSearched,
  };
}
