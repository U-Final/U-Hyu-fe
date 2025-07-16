// MapWithMarkers.tsx
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { type FC, useState } from 'react';
import type { Store } from '../../types/store';
import BrandMarker from './BrandMarker';

interface MapWithMarkersProps {
  center: { lat: number; lng: number };
  stores: Store[];
  currentLocation?: { lat: number; lng: number } | null;
  level?: number;
  className?: string;
  onStoreClick?: (store: Store) => void;
}

const MapWithMarkers: FC<MapWithMarkersProps> = ({
  center,
  stores,
  currentLocation,
  level = 4,
  className = 'w-full h-full',
  onStoreClick,
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

  const handleMarkerClick = (store: Store) => {
    setSelectedStoreId(store.storeId);
    onStoreClick?.(store);
  };

  return (
    <Map id="map" center={center} className={className} level={level}>
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
            <div className="absolute inset-0 w-12 h-12 border-2 border-blue-300 rounded-full opacity-30 animate-pulse transform -translate-x-1/2 -translate-y-1/2 translate-x-2 translate-y-2" />
          </div>
        </CustomOverlayMap>
      )}
    </Map>
  );
};

export default MapWithMarkers;
