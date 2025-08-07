import { useCallback, useEffect, useRef, useState } from 'react';

import type { NormalizedPlace } from '@kakao-map/api/types';
import { BottomSheetContainer } from '@kakao-map/components/BottomSheetContainer';
import { MapContainer } from '@kakao-map/components/MapContainer';
import { MapControlsContainer } from '@kakao-map/components/MapControlsContainer';
import { MapUIProvider } from '@kakao-map/context/MapUIContext';
import { useMapUIContext } from '@kakao-map/context/MapUIContext';
import useKakaoLoader from '@kakao-map/hooks/useKakaoLoader';

import { useScrollPrevention } from '@/shared/hooks/useScrollPrevention';

/**
 * 카카오 맵과 관련된 리소스를 로드하고, 지도 및 UI 컨트롤, 위치 제어, 하단 시트가 포함된 전체 지도 페이지를 렌더링합니다.
 *
 * 지도 UI 상태를 제공하는 컨텍스트로 하위 컴포넌트들을 감쌉니다.
 * 거리 기반 재검색 기능이 항상 활성화되어 있습니다.
 *
 * @returns 지도와 관련된 UI가 포함된 React 요소
 */

const MapContent = () => {
  const { bottomSheetRef } = useMapUIContext();
  const [keywordResults, setKeywordResults] = useState<NormalizedPlace[]>([]);
  const [persistentMarkers, setPersistentMarkers] = useState<NormalizedPlace[]>(
    []
  );
  const [selectedPlace, setSelectedPlace] = useState<NormalizedPlace | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.570028,
    lng: 126.977266,
  });
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const mapCenterSetterRef = useRef<
    ((center: { lat: number; lng: number }) => void) | null
  >(null);

  const handlePlaceClick = useCallback((place: NormalizedPlace) => {
    setSelectedPlace(place);
  }, []);

  const handlePlaceInfoClose = useCallback(() => {
    setSelectedPlace(null);
  }, []);

  const handleKeywordSearchResults = useCallback(
    (results: NormalizedPlace[]) => {
      setKeywordResults(results);
      if (results.length > 0) {
        setPersistentMarkers(results);
      }
      setSelectedPlace(null);
    },
    []
  );

  const handleClearMarkers = useCallback(() => {
    setPersistentMarkers([]);
    setSelectedPlace(null);
  }, []);

  const handleCloseSearchResults = useCallback(() => {
    setKeywordResults([]);
  }, []);

  const handleMapCenterUpdate = useCallback(
    (setMapCenterFn: (center: { lat: number; lng: number }) => void) => {
      mapCenterSetterRef.current = setMapCenterFn;
    },
    []
  );

  const handleMapCreate = useCallback((mapInstance: kakao.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const handleMapCenterChange = useCallback(
    (center: { lat: number; lng: number }) => {
      setMapCenter(center);
    },
    []
  );

  useEffect(() => {}, [selectedPlace]);

  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.openMiddle();
    }
  }, [bottomSheetRef]);

  useScrollPrevention({
    preventVerticalOnly: true,
    scrollableSelectors: [
      '[data-scrollable="true"]',
      '.overflow-x-auto',
      '.overflow-y-auto',
      '.overflow-auto',
      '.scrollbar-hide',
      '[class*="overflow-x"]',
      '[class*="overflow-y"]',
      '.bottom-sheet-content',
      '.modal-content',
      '.swiper-container',
      '.swiper-wrapper',
    ],
  });

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <MapContainer
          keywordResults={persistentMarkers}
          selectedPlace={selectedPlace}
          onPlaceClick={handlePlaceClick}
          onPlaceInfoClose={handlePlaceInfoClose}
          onMapCenterUpdate={handleMapCenterUpdate}
          onMapCenterChange={handleMapCenterChange}
          onMapCreate={handleMapCreate}
        />
        <MapControlsContainer
          onKeywordSearchResults={handleKeywordSearchResults}
          keywordResults={keywordResults}
          onClearMarkers={handleClearMarkers}
          onCloseSearchResults={handleCloseSearchResults}
          mapCenterSetter={mapCenterSetterRef.current}
          onPlaceClick={handlePlaceClick}
          mapCenter={mapCenter}
          map={map}
        />
      </div>

      <BottomSheetContainer ref={bottomSheetRef} />
    </div>
  );
};

function MapPage() {
  useKakaoLoader();

  return (
    <MapUIProvider>
      <MapContent />
    </MapUIProvider>
  );
}

export default MapPage;
