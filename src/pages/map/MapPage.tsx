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
// MapUIProvider 내부 컴포넌트
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

  // 키워드 검색 결과 장소 클릭 핸들러
  const handlePlaceClick = useCallback((place: NormalizedPlace) => {
    setSelectedPlace(place);
  }, []);

  // 키워드 검색 결과 인포윈도우 닫기 핸들러
  const handlePlaceInfoClose = useCallback(() => {
    setSelectedPlace(null);
  }, []);

  // MapControlsContainer에서 검색 결과를 받는 핸들러
  const handleKeywordSearchResults = useCallback(
    (results: NormalizedPlace[]) => {
      setKeywordResults(results);
      // 새로운 검색 결과가 있을 때만 persistent markers 업데이트
      if (results.length > 0) {
        setPersistentMarkers(results);
      }
      setSelectedPlace(null); // 새 검색 시 선택 초기화
    },
    []
  );

  // 마커를 완전히 지우는 핸들러 (새 검색 시)
  const handleClearMarkers = useCallback(() => {
    setPersistentMarkers([]);
    setSelectedPlace(null);
  }, []);

  // 검색 결과 리스트만 닫는 핸들러 (마커는 유지)
  const handleCloseSearchResults = useCallback(() => {
    setKeywordResults([]);
  }, []);

  // MapContainer에서 setMapCenter 함수를 받는 핸들러
  const handleMapCenterUpdate = useCallback(
    (setMapCenterFn: (center: { lat: number; lng: number }) => void) => {
      mapCenterSetterRef.current = setMapCenterFn;
    },
    []
  );

  // MapContainer에서 지도 인스턴스를 받는 핸들러
  const handleMapCreate = useCallback((mapInstance: kakao.maps.Map) => {
    setMap(mapInstance);
  }, []);

  // 지도 중심 좌표 변경 핸들러
  const handleMapCenterChange = useCallback(
    (center: { lat: number; lng: number }) => {
      setMapCenter(center);
    },
    []
  );

  // selectedPlace 상태 변화 디버깅
  useEffect(() => {}, [selectedPlace]);

  // 바텀시트 초기화 - 중간 열린 상태
  useEffect(() => {
    if (bottomSheetRef.current) {
      // 페이지 로드 시 바텀시트를 중간 열린 상태로 시작
      bottomSheetRef.current.openMiddle();
    }
  }, [bottomSheetRef]);

  // 스크롤 방지 적용 (세로 스크롤만 방지, 가로 스크롤 허용)
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
