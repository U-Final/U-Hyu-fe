import { useEffect, useState } from 'react';

import { Minus, Plus, ZoomIn, ZoomOut } from 'lucide-react';

// 줌 레벨에 따른 검색 반경 계산 (줌 레벨 4를 5km 기준으로 설정)
export const getSearchRadiusByZoomLevel = (zoomLevel: number): number => {
  if (zoomLevel <= 4) return 1000;
  if (zoomLevel <= 5) return 2000;
  if (zoomLevel <= 6) return 4000;
  if (zoomLevel <= 7) return 8000;
  if (zoomLevel <= 8) return 20000;
  return 20000; // 1000m - 최대 확대
};

interface MapZoomLevelIndicatorProps {
  map: kakao.maps.Map | null;
}

/**
 * 지도의 현재 줌 레벨을 표시하고 확대/축소 컨트롤을 제공하는 UI 컴포넌트
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

  // 줌 인 (확대) 핸들러
  const handleZoomIn = () => {
    if (!map) return;
    const currentLevel = map.getLevel();
    if (currentLevel > 1) {
      // 카카오맵 최대 확대 레벨은 1
      map.setLevel(currentLevel - 1);
    }
  };

  // 줌 아웃 (축소) 핸들러
  const handleZoomOut = () => {
    if (!map) return;
    const currentLevel = map.getLevel();
    if (currentLevel < 14) {
      // 카카오맵 최대 축소 레벨은 14
      map.setLevel(currentLevel + 1);
    }
  };

  // 줌 레벨에 따른 아이콘 선택
  const ZoomIcon = zoomLevel <= 7 ? ZoomOut : ZoomIn;

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-light-gray rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center">
        {/* 줌 레벨 정보 */}
        <div className="flex items-center gap-2 px-2.5 py-2">
          <ZoomIcon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-black leading-tight">
              줌 레벨 {zoomLevel}
            </span>
            <span className="text-xs text-gray leading-tight">
              {getSearchRadiusByZoomLevel(zoomLevel) / 1000}km 반경 매장
            </span>
          </div>
        </div>

        {/* 확대/축소 버튼 컨테이너 */}
        <div className="flex flex-col border-l border-light-gray">
          {/* 확대 버튼 */}
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel <= 1}
            className="flex items-center justify-center w-7 h-5 hover:bg-primary hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit border-b border-light-gray"
            aria-label="지도 확대"
          >
            <Plus className="w-3 h-3" />
          </button>

          {/* 축소 버튼 */}
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel >= 14}
            className="flex items-center justify-center w-7 h-5 hover:bg-primary hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit"
            aria-label="지도 축소"
          >
            <Minus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
