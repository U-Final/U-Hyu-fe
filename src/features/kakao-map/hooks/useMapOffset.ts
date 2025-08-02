import { useCallback, useEffect, useMemo, useState } from 'react';

// ================================
// 타입 정의
// ================================

/**
 * 지도 오프셋 정보
 */
export interface MapOffset {
  /** Y축 오프셋 (위도) */
  latOffset: number;
  /** X축 오프셋 (경도) - 현재는 0, 필요시 확장 가능 */
  lngOffset: number;
}

/**
 * 화면 크기 정보
 */
interface ScreenDimensions {
  width: number;
  height: number;
}

// ================================
// 상수 및 기본값
// ================================

const DEFAULT_SCREEN_SIZE = {
  width: typeof window !== 'undefined' ? window.innerWidth : 1024,
  height: typeof window !== 'undefined' ? window.innerHeight : 768,
} as const;

const DEFAULT_VH_OFFSET = 25; // 25vh
const DEFAULT_ZOOM_LEVEL = 3;
const PIXEL_TO_LAT_RATIO = 0.000025; // 기본 픽셀-위도 변환 비율
const ZOOM_AWARE_PIXEL_TO_LAT_RATIO = 0.00001; // 줌 인식 픽셀-위도 변환 비율

// 개발 모드 체크
const isDevelopment = import.meta.env.MODE === 'development';

// ================================
// 화면 크기 관리 훅
// ================================

/**
 * 화면 크기 변경을 추적하는 공통 훅
 */
const useScreenDimensions = (): ScreenDimensions => {
  const [screenDimensions, setScreenDimensions] =
    useState<ScreenDimensions>(DEFAULT_SCREEN_SIZE);

  useEffect(() => {
    const handleResize = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenDimensions;
};

// ================================
// 오프셋 계산 함수들
// ================================

/**
 * VH를 픽셀로 변환
 */
const vhToPixels = (vh: number, screenHeight: number): number => {
  return (screenHeight * vh) / 100;
};

/**
 * 픽셀을 위도 단위로 변환 (줌 레벨 미고려)
 */
const pixelsToLatitude = (pixels: number): number => {
  return pixels * PIXEL_TO_LAT_RATIO;
};

/**
 * 픽셀을 위도 단위로 변환 (줌 레벨 고려)
 */
const pixelsToLatitudeWithZoom = (
  pixels: number,
  zoomLevel: number
): number => {
  const zoomFactor = Math.pow(2, zoomLevel - DEFAULT_ZOOM_LEVEL);
  const adjustedRatio = ZOOM_AWARE_PIXEL_TO_LAT_RATIO / zoomFactor;
  const result = pixels * adjustedRatio;

  // 개발 모드에서 오프셋 계산 로그
  if (isDevelopment) {
    console.log(
      `📐 [Offset Calc] pixels: ${pixels}, zoomLevel: ${zoomLevel}, zoomFactor: ${zoomFactor.toFixed(3)}, result: ${result.toFixed(6)}`
    );
  }

  return result;
};

// ================================
// 메인 훅들
// ================================

/**
 * 간단한 VH 기준 오프셋 계산
 * 줌 레벨을 고려하지 않는 기본 버전
 *
 * @param offsetVh - 오프셋으로 사용할 vh 값 (기본값: 25vh)
 * @returns 계산된 지도 오프셋
 */
export const useSimpleMapOffset = (
  offsetVh: number = DEFAULT_VH_OFFSET
): MapOffset => {
  const { height } = useScreenDimensions();

  const mapOffset = useMemo((): MapOffset => {
    const offsetPixels = vhToPixels(offsetVh, height);
    const latOffset = pixelsToLatitude(offsetPixels);

    return {
      latOffset,
      lngOffset: 0,
    };
  }, [height, offsetVh]);

  return mapOffset;
};

/**
 * 줌 레벨 추적 훅
 * onZoomChanged 이벤트와 함께 사용하여 현재 줌 레벨을 추적
 *
 * @param initialLevel - 초기 줌 레벨
 * @returns 줌 레벨과 변경 핸들러
 */
export const useMapZoomLevel = (initialLevel: number = DEFAULT_ZOOM_LEVEL) => {
  const [zoomLevel, setZoomLevel] = useState(initialLevel);

  const handleZoomChanged = useCallback((map: kakao.maps.Map) => {
    const level = map.getLevel();

    // 실제로 줌 레벨이 변경된 경우에만 상태 업데이트 (불필요한 리렌더링 방지)
    setZoomLevel(prevLevel => {
      if (prevLevel !== level) {
        // 개발 모드에서 줌 레벨 변경 로그
        if (isDevelopment) {
          console.log(`🔍 [Map Zoom] Level changed: ${prevLevel} → ${level}`);
        }
        return level;
      }
      return prevLevel;
    });
  }, []);

  // 개발 모드에서 초기 줌 레벨 로그
  useEffect(() => {
    if (isDevelopment) {
      console.log(`🗺️ [Map Zoom] Initial zoom level: ${initialLevel}`);
    }
  }, [initialLevel]);

  return {
    zoomLevel,
    handleZoomChanged,
  };
};

/**
 * 줌 레벨을 고려한 VH 기준 오프셋 계산
 * 지도 줌 레벨에 따라 정확한 오프셋을 계산하는 고급 버전
 *
 * @param offsetVh - 오프셋으로 사용할 vh 값 (기본값: 25vh)
 * @param zoomLevel - 현재 지도 줌 레벨 (1-14)
 * @returns 계산된 지도 오프셋
 */
export const useZoomAwareMapOffset = (
  offsetVh: number = DEFAULT_VH_OFFSET,
  zoomLevel: number = DEFAULT_ZOOM_LEVEL
): MapOffset => {
  const { height } = useScreenDimensions();

  const mapOffset = useMemo((): MapOffset => {
    const offsetPixels = vhToPixels(offsetVh, height);
    const latOffset = pixelsToLatitudeWithZoom(offsetPixels, zoomLevel);

    return {
      latOffset,
      lngOffset: 0,
    };
  }, [height, offsetVh, zoomLevel]);

  return mapOffset;
};

/**
 * 통합 지도 오프셋 훅
 * 줌 레벨 추적과 오프셋 계산을 통합한 편의 훅
 *
 * @param offsetVh - 오프셋으로 사용할 vh 값 (기본값: 25vh)
 * @param initialLevel - 초기 줌 레벨 (기본값: 3)
 * @returns 오프셋 정보와 줌 변경 핸들러
 */
export const useIntegratedMapOffset = (
  offsetVh: number = DEFAULT_VH_OFFSET,
  initialLevel: number = DEFAULT_ZOOM_LEVEL
) => {
  // initialLevel 변경으로 인한 재생성 방지
  const [stableInitialLevel] = useState(initialLevel);

  const { zoomLevel, handleZoomChanged } = useMapZoomLevel(stableInitialLevel);
  const mapOffset = useZoomAwareMapOffset(offsetVh, zoomLevel);

  return {
    mapOffset,
    zoomLevel,
    handleZoomChanged,
  };
};

// ================================
// 유틸리티 함수들
// ================================

/**
 * 원본 좌표에 오프셋을 적용하여 새로운 좌표 계산
 *
 * @param originalLat - 원본 위도
 * @param originalLng - 원본 경도
 * @param offset - 적용할 오프셋
 * @returns 오프셋이 적용된 새로운 좌표
 */
export const getOffsetPosition = (
  originalLat: number,
  originalLng: number,
  offset: MapOffset
): { lat: number; lng: number } => {
  return {
    lat: originalLat + offset.latOffset,
    lng: originalLng + offset.lngOffset,
  };
};

/**
 * 오프셋 정보를 디버깅용으로 문자열로 변환
 *
 * @param offset - 오프셋 정보
 * @param precision - 소수점 자릿수 (기본값: 6)
 * @returns 디버깅용 문자열
 */

export const offsetToString = (
  offset: MapOffset,
  precision: number = 6
): string => {
  return `lat: ${offset.latOffset.toFixed(precision)}, lng: ${offset.lngOffset.toFixed(precision)}`;
};
