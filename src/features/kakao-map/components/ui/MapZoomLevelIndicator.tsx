import { useEffect } from 'react';

import { Minus, Plus, ZoomIn, ZoomOut } from 'lucide-react';

import {
  useMapStore,
  useSearchRadius,
  useZoomLevel,
} from '../../store/MapStore';

// 줌 레벨 → 검색 반경
export const getSearchRadiusByZoomLevel = (zoomLevel: number): number => {
  if (zoomLevel <= 4) return 1000;
  if (zoomLevel <= 5) return 2000;
  if (zoomLevel <= 6) return 4000;
  if (zoomLevel <= 7) return 8000;
  if (zoomLevel <= 8) return 20000;
  return 20000;
};

interface MapZoomLevelIndicatorProps {
  map: kakao.maps.Map | null;
}

/**
 * 인포 영역과 확대/축소 영역 분리 렌더링(인포 하단에 컨트롤 배치)
 * - 아이콘 크기 반응형으로 조절
 * - 컨테이너 최소 너비 확장
 */
export const MapZoomLevelIndicator = ({ map }: MapZoomLevelIndicatorProps) => {
  const zoomLevel = useZoomLevel();
  const searchRadius = useSearchRadius();
  const setZoomLevel = useMapStore(state => state.setZoomLevel);

  useEffect(() => {
    if (!map) return;
    const currentLevel = map.getLevel();
    if (currentLevel !== zoomLevel) setZoomLevel(currentLevel);

    const handleZoomChanged = () => setZoomLevel(map.getLevel());
    kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);
    return () => {
      kakao.maps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
    };
  });

  const handleZoomIn = () => {
    if (!map) return;
    const lv = map.getLevel();
    if (lv > 1) map.setLevel(lv - 1);
  };

  const handleZoomOut = () => {
    if (!map) return;
    const lv = map.getLevel();
    if (lv < 14) map.setLevel(lv + 1);
  };

  const ZoomIcon = zoomLevel <= 7 ? ZoomOut : ZoomIn;

  return (
    <div className="flex flex-col gap-2">
      {/* 인포 박스 */}
      <div
        className="
          bg-white/95 backdrop-blur-sm border border-light-gray
          rounded-xl shadow-sm px-3 py-2
        "
        aria-live="polite"
      >
        <div className="flex items-center gap-2">
          {/* 아이콘: 반응형 크기 */}
          <ZoomIcon className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-medium text-black">
              줌 레벨 {zoomLevel}
            </span>
            <span className="text-xs text-gray">
              {(searchRadius / 1000).toFixed(0)}km 반경 매장
            </span>
          </div>
        </div>
      </div>

      {/* 컨트롤 박스 (인포 하단) */}
      <div
        className="
          w-1/2
          bg-white/95 backdrop-blur-sm border border-light-gray
          rounded-xl shadow-sm overflow-hidden
        "
        role="group"
        aria-label="지도 확대/축소 컨트롤"
      >
        {/* 확대 */}
        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoomLevel <= 1}
          aria-label="지도 확대"
          className="
            w-full h-14 md:h-14
            flex items-center justify-center
            hover:bg-primary hover:text-white
            transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:bg-transparent disabled:hover:text-inherit
            rounded-t-xl
          "
        >
          {/* 버튼 아이콘: 반응형 크기 */}
          <Plus className="w-6 h-6 md:w-7 md:h-7" />
        </button>

        <div className="h-px bg-light-gray" />

        {/* 축소 */}
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoomLevel >= 14}
          aria-label="지도 축소"
          className="
            w-full h-12 md:h-12
            flex items-center justify-center
            hover:bg-primary hover:text-white
            transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:bg-transparent disabled:hover:text-inherit
            rounded-b-xl
          "
        >
          <Minus className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </div>
    </div>
  );
};
