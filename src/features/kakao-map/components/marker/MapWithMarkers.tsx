import { type FC, useCallback, useState, useRef } from 'react';
import { CustomOverlayMap, Map as KakaoMap } from 'react-kakao-maps-sdk';
import type { Store } from '../../types/store';
import BrandMarker from './BrandMarker';

interface MapWithMarkersProps {
  center: { lat: number; lng: number };
  stores: Store[];
  currentLocation?: { lat: number; lng: number } | null;
  level?: number;
  className?: string;
  onStoreClick?: (store: Store) => void;
  onCenterChange?: (center: { lat: number; lng: number }) => void;
}

const MINIMUM_MOVE_DISTANCE = 300; // 미터 단위

const MapWithMarkers: FC<MapWithMarkersProps> = ({
  center,
  stores,
  currentLocation,
  level = 4,
  className = 'w-full h-full',
  onStoreClick,
  onCenterChange,
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const lastApiCallPosition = useRef<{ lat: number; lng: number } | null>(null);

  const handleMarkerClick = (store: Store) => {
    setSelectedStoreId(store.storeId);
    onStoreClick?.(store);
  };

  // 거리 계산 함수 (Haversine formula)
  const calculateDistance = useCallback(
    (
      pos1: { lat: number; lng: number },
      pos2: { lat: number; lng: number }
    ) => {
      const R = 6371e3; // 지구 반지름 (미터)
      const φ1 = (pos1.lat * Math.PI) / 180;
      const φ2 = (pos2.lat * Math.PI) / 180;
      const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
      const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // 미터 단위 거리
    },
    []
  );

  const handleDragEnd = useCallback(
    (map: kakao.maps.Map) => {
      const newCenter = map.getCenter();
      if (!newCenter || !onCenterChange) return;

      const currentPosition = {
        lat: newCenter.getLat(),
        lng: newCenter.getLng(),
      };

      if (lastApiCallPosition.current) {
        const distance = calculateDistance(
          lastApiCallPosition.current,
          currentPosition
        );

        // 최소 이동 거리를 충족하지 않으면 API 요청 스킵
        if (distance < MINIMUM_MOVE_DISTANCE) {
          if (import.meta.env.MODE === 'development') {
            console.log(
              `드래그 완료 - 거리 부족 (${Math.round(distance)}m < ${MINIMUM_MOVE_DISTANCE}m), API 요청 스킵`
            );
          }
          return;
        }

        if (import.meta.env.MODE === 'development') {
          console.log(`API 요청 실행 - 이동 거리: ${Math.round(distance)}m`);
        }
      }

      // API 요청 실행 및 위치 저장
      lastApiCallPosition.current = currentPosition;
      onCenterChange(currentPosition);
    },
    [onCenterChange, calculateDistance]
  );

  return (
    <KakaoMap
      id="map"
      center={center}
      className={className}
      level={level}
      onDragEnd={handleDragEnd}
    >
      {/* 매장 마커들 */}
      {stores.map(store => (
        <CustomOverlayMap
          key={store.storeId}
          position={{ lat: store.latitude, lng: store.longitude }}
          yAnchor={1} // 마커의 아래쪽 포인트가 좌표에 위치하도록
          xAnchor={0.5} // 마커의 중앙이 좌표에 위치하도록
        >
          <BrandMarker
            store={store}
            isSelected={selectedStoreId === store.storeId}
            hasPromotion={store.benefit !== undefined} // 혜택이 있으면 프로모션 배지 표시
            onClick={() => handleMarkerClick(store)}
          />
        </CustomOverlayMap>
      ))}

      {/* 사용자 위치 마커 */}
      {currentLocation && (
        <CustomOverlayMap
          position={currentLocation}
          yAnchor={0.5}
          xAnchor={0.5}
        >
          <div className="relative">
            {/* 사용자 위치 표시 */}
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />

            {/* 위치 정확도 표시 원 */}
            <div className="absolute left-2 top-2 w-12 h-12 border-2 border-blue-300 rounded-full opacity-30 animate-pulse -translate-x-1/2 -translate-y-1/2" />
          </div>
        </CustomOverlayMap>
      )}
    </KakaoMap>
  );
};

export default MapWithMarkers;
