import { useCallback, useEffect, useState } from 'react';

interface MapOffsetConfig {
  /** 인포윈도우 높이 (픽셀) */
  infoWindowHeight?: number;
  /** 추가 여백 (픽셀) */
  additionalPadding?: number;
  /** 지도 줌 레벨 */
  mapLevel?: number;
}

interface MapOffset {
  /** Y축 오프셋 (위도) */
  latOffset: number;
  /** X축 오프셋 (경도) - 현재는 0, 필요시 확장 가능 */
  lngOffset: number;
}

/**
 * 반응형 지도 오프셋 계산 훅
 * 화면 크기, 인포윈도우 크기, 지도 줌 레벨을 고려하여 최적의 오프셋 계산
 */
export const useMapOffset = (config: MapOffsetConfig = {}): MapOffset => {
  const {
    infoWindowHeight = 120, // 기본 인포윈도우 높이
    additionalPadding = 20,  // 추가 여백
    mapLevel = 4,           // 기본 줌 레벨
  } = config;

  const [screenDimensions, setScreenDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  // 화면 크기 변경 감지
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

  // 오프셋 계산 함수
  const calculateOffset = useCallback((): MapOffset => {
    const { width, height } = screenDimensions;

    // 디바이스 타입 판별
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    // 화면 중심에서 인포윈도우가 보이도록 하기 위한 픽셀 단위 오프셋 계산
    const totalInfoWindowSpace = infoWindowHeight + additionalPadding;
    
    // 모바일에서는 인포윈도우가 하단에 위치하므로 더 많은 오프셋 필요
    let pixelOffset: number;
    
    if (isMobile) {
      // 모바일: 화면 높이의 1/4 + 인포윈도우 공간
      pixelOffset = height * 0.25 + totalInfoWindowSpace;
    } else if (isTablet) {
      // 태블릿: 화면 높이의 1/5 + 인포윈도우 공간
      pixelOffset = height * 0.2 + totalInfoWindowSpace;
    } else {
      // 데스크톱: 화면 높이의 1/6 + 인포윈도우 공간
      pixelOffset = height * 0.16 + totalInfoWindowSpace;
    }

    // 픽셀을 위도 단위로 변환
    // 카카오맵의 줌 레벨에 따른 변환 계산
    // 줌 레벨이 높을수록 (확대) 작은 위도 변화가 큰 픽셀 변화를 만듦
    const zoomFactor = Math.pow(2, mapLevel - 1);
    const baseLatPerPixel = 0.000003; // 기준 위도/픽셀 비율 (실험적 값)
    const latPerPixel = baseLatPerPixel / zoomFactor;
    
    const latOffset = pixelOffset * latPerPixel;

    return {
      latOffset,
      lngOffset: 0, // 현재는 수평 오프셋 불필요
    };
  }, [screenDimensions, infoWindowHeight, additionalPadding, mapLevel]);

  return calculateOffset();
};

/**
 * 간단한 오프셋 계산 (기존 방식과 호환)
 */
export const useSimpleMapOffset = (): MapOffset => {
  const [screenDimensions, setScreenDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

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

  const calculateSimpleOffset = useCallback((): MapOffset => {
    const { width } = screenDimensions;
    
    // 화면 크기별 기본 오프셋 값
    let latOffset: number;
    
    if (width < 768) {
      // 모바일: 더 큰 오프셋 (인포윈도우가 화면 하단에 위치)
      latOffset = 0.003;
    } else if (width < 1024) {
      // 태블릿: 중간 오프셋
      latOffset = 0.0025;
    } else {
      // 데스크톱: 기존 오프셋
      latOffset = 0.0017;
    }

    return {
      latOffset,
      lngOffset: 0,
    };
  }, [screenDimensions]);

  return calculateSimpleOffset();
};

/**
 * 지도 중심 이동을 위한 유틸리티 함수
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