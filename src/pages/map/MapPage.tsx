import { useCallback, useEffect, useState } from 'react';

import { BottomSheetContainer } from '@kakao-map/components/BottomSheetContainer';
import { MapContainer } from '@kakao-map/components/MapContainer';
import { MapControlsContainer } from '@kakao-map/components/MapControlsContainer';
import { LocationControlContainer } from '@kakao-map/components/location/LocationControlContainer';
import { MapUIProvider } from '@kakao-map/context/MapUIContext';
import { useMapUIContext } from '@kakao-map/context/MapUIContext';
import type { NormalizedPlace } from '@kakao-map/api/types';
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
  const [persistentMarkers, setPersistentMarkers] = useState<NormalizedPlace[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<NormalizedPlace | null>(null);
  const [mapCenterSetter, setMapCenterSetter] = useState<((center: { lat: number; lng: number }) => void) | null>(null);

  // 키워드 검색 결과 장소 클릭 핸들러
  const handlePlaceClick = useCallback((place: NormalizedPlace) => {
    if (import.meta.env.MODE === 'development') {
      console.log('🎯 MapPage - handlePlaceClick 호출됨:', {
        placeName: place.name,
        placeId: place.id
      });
    }
    setSelectedPlace(place);
  }, []);

  // 키워드 검색 결과 인포윈도우 닫기 핸들러
  const handlePlaceInfoClose = useCallback(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('🎯 MapPage - handlePlaceInfoClose 호출됨');
    }
    setSelectedPlace(null);
  }, []);

  // MapControlsContainer에서 검색 결과를 받는 핸들러
  const handleKeywordSearchResults = useCallback((results: NormalizedPlace[]) => {
    setKeywordResults(results);
    // 새로운 검색 결과가 있을 때만 persistent markers 업데이트
    if (results.length > 0) {
      setPersistentMarkers(results);
      
      // 검색 완료 시 첫 번째 결과 위치로 지도 이동
      if (mapCenterSetter && results[0]) {
        const firstResult = results[0];
        mapCenterSetter({
          lat: firstResult.latitude,
          lng: firstResult.longitude
        });
        
        if (import.meta.env.MODE === 'development') {
          console.log('🎯 지도 이동 - 첫 번째 검색 결과:', {
            place: firstResult.name,
            coordinates: { lat: firstResult.latitude, lng: firstResult.longitude }
          });
        }
      }
    }
    setSelectedPlace(null); // 새 검색 시 선택 초기화
  }, [mapCenterSetter]);

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
  const handleMapCenterUpdate = useCallback((setMapCenter: (center: { lat: number; lng: number }) => void) => {
    setMapCenterSetter(() => setMapCenter);
  }, []);


  // selectedPlace 상태 변화 디버깅
  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      console.log('🎯 MapPage - selectedPlace 상태 변화:', {
        selectedPlace: selectedPlace ? {
          name: selectedPlace.name,
          id: selectedPlace.id
        } : null
      });
    }
  }, [selectedPlace]);

  // 바텀시트 초기화
  useEffect(() => {
    if (bottomSheetRef.current) {
      // 페이지 로드 시 바텀시트 초기화 및 중간 상태로 열기
      bottomSheetRef.current.initialize();

      // 약간의 지연 후 중간 상태로 열기
      setTimeout(() => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.open();
        }
      }, 300);
    }
  }, [bottomSheetRef]);

  return (
    <div className="h-screen relative">
      <div className="absolute inset-0">
        <MapContainer 
          keywordResults={persistentMarkers}
          selectedPlace={selectedPlace}
          onPlaceClick={handlePlaceClick}
          onPlaceInfoClose={handlePlaceInfoClose}
          onMapCenterUpdate={handleMapCenterUpdate}
        />
        <MapControlsContainer 
          onKeywordSearchResults={handleKeywordSearchResults}
          keywordResults={keywordResults}
          onClearMarkers={handleClearMarkers}
          onCloseSearchResults={handleCloseSearchResults}
          mapCenterSetter={mapCenterSetter}
          onPlaceClick={handlePlaceClick}
        />
        <LocationControlContainer />
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
