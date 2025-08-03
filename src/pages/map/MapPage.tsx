import { useCallback, useEffect, useRef, useState } from 'react';

import type { NormalizedPlace } from '@kakao-map/api/types';
import { BottomSheetContainer } from '@kakao-map/components/BottomSheetContainer';
import { MapContainer } from '@kakao-map/components/MapContainer';
import { MapControlsContainer } from '@kakao-map/components/MapControlsContainer';
import { MapControlsContainer as MapButtonsContainer } from '@kakao-map/components/controls/MapControlsContainer';
import { MapUIProvider } from '@kakao-map/context/MapUIContext';
import { useMapUIContext } from '@kakao-map/context/MapUIContext';
import useKakaoLoader from '@kakao-map/hooks/useKakaoLoader';

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
    lng: 126.977266
  });
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

        // 검색 완료 시 첫 번째 결과 위치로 지도 이동
        if (mapCenterSetterRef.current && results[0]) {
          const firstResult = results[0];
          mapCenterSetterRef.current({
            lat: firstResult.latitude,
            lng: firstResult.longitude,
          });

        }
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

  // 지도 중심 좌표 변경 핸들러
  const handleMapCenterChange = useCallback((center: { lat: number; lng: number }) => {
    setMapCenter(center);
  }, []);

  // selectedPlace 상태 변화 디버깅
  useEffect(() => {
  }, [selectedPlace]);

  // 바텀시트 초기화 - 닫힌 상태로 시작
  useEffect(() => {
    if (bottomSheetRef.current) {
      // 페이지 로드 시 바텀시트를 닫힌 상태로 초기화
      bottomSheetRef.current.close();
    }
  }, [bottomSheetRef]);

  // 모바일에서 전체 페이지 스크롤 방지
  useEffect(() => {
    // body 스크롤 방지
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    // 터치 이벤트 방지 (선택적)
    const preventTouchMove = (e: TouchEvent) => {
      // 바텀시트나 특정 스크롤 가능한 영역이 아닐 때만 방지
      const target = e.target as HTMLElement;
      const isScrollableArea = target.closest('[data-scrollable="true"]');
      
      if (!isScrollableArea) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventTouchMove, { passive: false });

    // 클린업
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.removeEventListener('touchmove', preventTouchMove);
    };
  }, []);

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
        />
        <MapControlsContainer
          onKeywordSearchResults={handleKeywordSearchResults}
          keywordResults={keywordResults}
          onClearMarkers={handleClearMarkers}
          onCloseSearchResults={handleCloseSearchResults}
          mapCenterSetter={mapCenterSetterRef.current}
          onPlaceClick={handlePlaceClick}
          mapCenter={mapCenter}
        />
        <MapButtonsContainer />
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
