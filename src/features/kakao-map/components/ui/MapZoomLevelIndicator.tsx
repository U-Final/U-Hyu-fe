import { useEffect, useState } from 'react';

import { ZoomIn, ZoomOut } from 'lucide-react';

// 줌 레벨에 따른 검색 반경 계산 (줌 레벨 4를 5km 기준으로 설정)
export const getSearchRadiusByZoomLevel = (zoomLevel: number): number => {
  if (zoomLevel <= 3) return 20000; // 20km - 매우 넓은 지역
  if (zoomLevel <= 5) return 10000; // 10km - 넓은 지역
  if (zoomLevel <= 4) return 1000; // 1km - 일반 지역
  if (zoomLevel <= 9) return 2000; // 2km - 상세 지역
  if (zoomLevel <= 11) return 1000; // 1km - 매우 상세
  return 500; // 500m - 최대 확대
};

interface MapZoomLevelIndicatorProps {
  map: kakao.maps.Map | null;
}

/**
 * 지도의 현재 줌 레벨을 표시하는 UI 컴포넌트
 *
 * @param map - 카카오 지도 인스턴스
 */
export const MapZoomLevelIndicator = ({ map }: MapZoomLevelIndicatorProps) => {
  const [zoomLevel, setZoomLevel] = useState<number>(4);

  useEffect(() => {
    if (!map) {
      setZoomLevel(4); // 기본값
      return;
    }

    // 초기 줌 레벨 설정
    const currentLevel = map.getLevel();
    setZoomLevel(currentLevel);

    // 줌 레벨 변경 이벤트 리스너
    const handleZoomChanged = () => {
      const newLevel = map.getLevel();
      setZoomLevel(newLevel);
    };

    // 이벤트 리스너 등록
    kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);

    // 클린업
    return () => {
      kakao.maps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
    };
  }, [map]);

  // 줌 레벨에 따른 아이콘 선택
  const ZoomIcon = zoomLevel <= 7 ? ZoomOut : ZoomIn;

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-light-gray rounded-lg px-3 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <ZoomIcon className="w-4 h-4 text-primary" />
        <div className="flex flex-col">
          <span className="text-xs font-medium text-black">
            줌 레벨 {zoomLevel}
          </span>
          <span className="text-xs text-gray">
            {getSearchRadiusByZoomLevel(zoomLevel) / 1000}km 반경 내 매장 검색
          </span>
        </div>
      </div>
    </div>
  );
};
