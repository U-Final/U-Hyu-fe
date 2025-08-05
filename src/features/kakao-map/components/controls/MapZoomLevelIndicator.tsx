import { useEffect, useState } from 'react';

import { Minus, Plus } from 'lucide-react';

import {
  useMapStore,
  useSearchRadius,
  useZoomLevel,
} from '../../store/MapStore';

interface MapZoomLevelIndicatorProps {
  map: kakao.maps.Map | null;
}

export const MapZoomLevelIndicator = ({ map }: MapZoomLevelIndicatorProps) => {
  const zoomLevel = useZoomLevel();
  const searchRadius = useSearchRadius();
  const setZoomLevel = useMapStore(state => state.setZoomLevel);
  const [showTooltip, setShowTooltip] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!map) return;
    const currentLevel = map.getLevel();
    if (currentLevel !== zoomLevel) setZoomLevel(currentLevel);

    const handleZoomChanged = () => setZoomLevel(map.getLevel());
    kakao.maps.event.addListener(map, 'zoom_changed', handleZoomChanged);
    return () => {
      kakao.maps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
    };
  }, [map, zoomLevel, setZoomLevel]);

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

  const handleRadiusClick = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setShowTooltip(true);
    const id = setTimeout(() => setShowTooltip(false), 2000);
    setTimeoutId(id);
  };
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div className="flex flex-col gap-2 pointer-events-none">
      {/* 컴팩트한 반경 인디케이터 */}
      <div className="relative">
        <button
          onClick={handleRadiusClick}
          className="
            w-12 h-12 
            bg-white/95 backdrop-blur-sm 
            border border-light-gray
            rounded-full 
            shadow-sm 
            flex items-center justify-center 
            hover:bg-gray-50 
            active:bg-gray-100 
            transition-all duration-200
            pointer-events-auto
          "
          aria-label={`${(searchRadius / 1000).toFixed(0)}km 반경 매장 검색`}
        >
          <span className="text-xs font-bold text-primary">
            {(searchRadius / 1000).toFixed(0)}km
          </span>
        </button>

        {/* 툴팁 */}
        {showTooltip && (
          <div
            className="
              absolute 
              bottom-full 
              left-0 
              mb-2
              px-3 
              py-1.5 
              bg-gray-900 
              text-white 
              text-xs 
              font-medium
              rounded-md 
              shadow-lg
              whitespace-nowrap
              z-50
            "
          >
            {(searchRadius / 1000).toFixed(0)}km 반경의 매장을 검색합니다
            <div
              className="
                absolute 
                top-full 
                left-4
                w-0 
                h-0 
                border-l-4 
                border-r-4 
                border-t-4 
                border-transparent 
                border-t-gray-900
              "
            />
          </div>
        )}
      </div>

      {/* 컴팩트한 줌 컨트롤 */}
      <div
        className="
          w-12
          bg-white/95 backdrop-blur-sm 
          border border-light-gray
          rounded-full 
          shadow-sm 
          overflow-hidden
          pointer-events-auto
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
            w-full h-10
            flex items-center justify-center
            disabled:opacity-50 disabled:cursor-not-allowed
            rounded-t-full
          "
        >
          <Plus className="w-4 h-4" />
        </button>

        <div className="h-px bg-light-gray" />

        {/* 축소 */}
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoomLevel >= 14}
          aria-label="지도 축소"
          className="
            w-full h-10
            flex items-center justify-center
            disabled:opacity-50 disabled:cursor-not-allowed
            rounded-b-full
          "
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
