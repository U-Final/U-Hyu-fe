import { type FC, useCallback, useEffect, useRef, useState } from 'react';

import { CustomOverlayMap, Map as KakaoMap } from 'react-kakao-maps-sdk';

import { useToggleFavoriteMutation } from '../../hooks/useMapQueries';
import type { Store } from '../../types/store';
import BrandMarker from './BrandMarker';
import StoreInfoWindow from './StoreInfoWindow';

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
  onCenterChange,
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [infoWindowStore, setInfoWindowStore] = useState<Store | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [isPanto, setIsPanto] = useState(false);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const pantoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // center prop 동기화 useEffect를 조건부로 변경
  useEffect(() => {
    // 인포윈도우가 열려있지 않을 때만 center prop 동기화
    if (!infoWindowStore) {
      setMapCenter(center);
    }
  }, [center, infoWindowStore]);

  // 컴포넌트 언마운트 시 setTimeout cleanup
  useEffect(() => {
    return () => {
      if (pantoTimeoutRef.current) {
        clearTimeout(pantoTimeoutRef.current);
      }
    };
  }, []);

  const lastApiCallPosition = useRef<{ lat: number; lng: number } | null>(null);

  const handleMarkerClick = useCallback((store: Store) => {
    setSelectedStoreId(store.storeId);
    setInfoWindowStore(store);

    // 인포 윈도우가 화면 중앙에 오도록 오프셋 적용
    const offset = 0.0017;
    const targetLat = store.latitude + offset;
    const targetLng = store.longitude;
    const targetCenter = { lat: targetLat, lng: targetLng };

    // KakaoMap의 isPanto를 사용한 부드러운 이동
    setIsPanto(true);
    setMapCenter(targetCenter);

    // 기존 timeout이 있다면 정리
    if (pantoTimeoutRef.current) {
      clearTimeout(pantoTimeoutRef.current);
    }

    // 애니메이션 완료 후 isPanto 리셋
    pantoTimeoutRef.current = setTimeout(() => {
      setIsPanto(false);
      pantoTimeoutRef.current = null;
    }, 500); // 애니메이션 시간을 500ms로 증가
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedStoreId(null);
    setInfoWindowStore(null);
  }, []);

  const toggleFavoriteMutation = useToggleFavoriteMutation();

  const handleToggleFavorite = useCallback(
    async (event?: React.MouseEvent) => {
      // 이벤트 전파 차단 (추가 보호)
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }

      if (!infoWindowStore) return;

      try {
        await toggleFavoriteMutation.mutateAsync({
          storeId: infoWindowStore.storeId,
        });
      } catch (error) {
        console.error('즐겨찾기 토글 실패:', error);
      }
    },
    [infoWindowStore, toggleFavoriteMutation]
  );

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
      center={mapCenter}
      className={className}
      level={level}
      isPanto={isPanto}
      onDragEnd={handleDragEnd}
      onClick={handleInfoWindowClose} // 지도 클릭 시 인포윈도우 닫기
      onCreate={map => {
        mapRef.current = map;
      }}
    >
      {/* 매장 마커들 */}
      {stores.map(store => (
        <CustomOverlayMap
          key={store.storeId}
          position={{ lat: store.latitude, lng: store.longitude }}
          yAnchor={1}
          xAnchor={0.5}
        >
          <BrandMarker
            store={store}
            isSelected={selectedStoreId === store.storeId}
            hasPromotion={store.benefit !== undefined}
            onClick={() => handleMarkerClick(store)}
          />
        </CustomOverlayMap>
      ))}

      {/* 스토어 상세 정보 인포윈도우 */}
      {infoWindowStore && (
        <StoreInfoWindow
          storeId={infoWindowStore.storeId}
          position={{
            lat: infoWindowStore.latitude,
            lng: infoWindowStore.longitude,
          }}
          handleToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* 사용자 위치 마커 */}
      {currentLocation && (
        <CustomOverlayMap
          position={currentLocation}
          yAnchor={0.5}
          xAnchor={0.5}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
            <div className="absolute inset-0 w-12 h-12 border-2 border-blue-300 rounded-full opacity-30 animate-pulse -translate-x-4 -translate-y-4" />
          </div>
        </CustomOverlayMap>
      )}
    </KakaoMap>
  );
};

export default MapWithMarkers;
