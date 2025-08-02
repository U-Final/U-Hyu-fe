import React, { useCallback, useEffect, useState } from 'react';

import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import type { NormalizedPlace } from '../../api/types';
import { useKeywordSearch } from '../../hooks/useKeywordSearch';
import { useMapBounds, useSearchMarkers } from '../../hooks/useSearchMarkers';
import { ResponsiveManualSearchButton } from '../ManualSearchButton';
import { KeywordInfoWindow } from '../marker/KeywordInfoWindow';
import { KeywordMarker } from '../marker/KeywordMarker';
import { MapSearchInput } from './MapSearchInput';
import { SearchResultList, SearchResultSummary } from './SearchResultList';

interface KeywordSearchContainerProps {
  /** 지도 객체 (react-kakao-maps-sdk의 Map ref) */
  map?: kakao.maps.Map;
  /** 현재 지도 중심 좌표 */
  center: { lat: number; lng: number };
  /** 검색 영역 반경 (미터) */
  searchRadius?: number;
  /** 지도 드래그 시 자동 재검색 여부 */
  autoSearchOnDrag?: boolean;
  /** 검색 결과 표시 방식 ('list' | 'markers' | 'both') */
  displayMode?: 'list' | 'markers' | 'both';
  /** 초기 검색어 */
  initialKeyword?: string;
  /** 검색 완료 콜백 */
  onSearchComplete?: (results: NormalizedPlace[]) => void;
  /** 장소 선택 콜백 */
  onPlaceSelect?: (place: NormalizedPlace) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 자동 실시간 검색 활성화 여부 */
  enableAutoSearch?: boolean;
  /** 디바운스 지연 시간 (밀리초) */
  debounceDelay?: number;
}

/**
 * 카카오 키워드 검색 전체 기능을 통합한 컨테이너 컴포넌트
 */
export const KeywordSearchContainer: React.FC<KeywordSearchContainerProps> = ({
  map,
  center,
  searchRadius = 5000,
  autoSearchOnDrag = false,
  displayMode = 'both',
  initialKeyword = '',
  onSearchComplete,
  onPlaceSelect,
  className = '',
  enableAutoSearch = false,
  debounceDelay = Number(import.meta.env.VITE_SEARCH_DEBOUNCE_DELAY) || 500,
}) => {
  const {
    keyword,
    results,
    loading,
    error,
    hasSearched,
    meta,
    selectedPlace,
    setKeyword,
    searchByLocation,
    selectPlace,
    clearResults,
    clearError,
    setAutoSearch,
  } = useKeywordSearch({ 
    autoSearchEnabled: enableAutoSearch, 
    debounceDelay 
  });

  const {
    markers,
    selectedMarker,
    shouldFitBounds,
    visible: markersVisible,
    setMarkers,
    selectMarker,
    boundsAdjusted,
  } = useSearchMarkers();

  const { calculateBounds } = useMapBounds();

  // 지도 드래그 기반 재검색 관련 상태
  const [lastSearchCenter, setLastSearchCenter] = useState(center);
  const [showManualSearchButton, setShowManualSearchButton] = useState(false);
  const [manualSearchLoading, setManualSearchLoading] = useState(false);

  // 초기 검색어 설정
  useEffect(() => {
    if (initialKeyword && !keyword) {
      setKeyword(initialKeyword);
    }
  }, [initialKeyword, keyword, setKeyword]);

  // 자동 검색 설정 업데이트
  useEffect(() => {
    setAutoSearch(enableAutoSearch);
  }, [enableAutoSearch, setAutoSearch]);

  // 검색 결과를 마커로 설정
  useEffect(() => {
    if (
      results.length > 0 &&
      (displayMode === 'markers' || displayMode === 'both')
    ) {
      setMarkers(results);
    } else {
      setMarkers([]);
    }
  }, [results, setMarkers, displayMode]);

  // 검색 완료 콜백 호출
  useEffect(() => {
    if (hasSearched && onSearchComplete) {
      onSearchComplete(results);
    }
  }, [hasSearched, results, onSearchComplete]);

  // 지도 범위 자동 조정
  useEffect(() => {
    if (shouldFitBounds && map && markers.length > 0) {
      const bounds = calculateBounds(markers);
      if (bounds) {
        if ('bounds' in bounds && bounds.bounds) {
          // 여러 장소인 경우 범위 설정
          const kakaoSW = new kakao.maps.LatLng(
            bounds.bounds.sw.lat,
            bounds.bounds.sw.lng
          );
          const kakaoNE = new kakao.maps.LatLng(
            bounds.bounds.ne.lat,
            bounds.bounds.ne.lng
          );
          const kakaoBounds = new kakao.maps.LatLngBounds(kakaoSW, kakaoNE);
          map.setBounds(kakaoBounds);
        } else if ('center' in bounds && bounds.center) {
          // 단일 장소인 경우 중심과 줌 레벨 설정
          map.setCenter(
            new kakao.maps.LatLng(bounds.center.lat, bounds.center.lng)
          );
          if (bounds.level) {
            map.setLevel(bounds.level);
          }
        }
      }
      boundsAdjusted();
    }
  }, [shouldFitBounds, map, markers, calculateBounds, boundsAdjusted]);

  // 지도 중심 변경 감지 및 재검색 버튼 표시 여부 결정
  useEffect(() => {
    if (!autoSearchOnDrag && hasSearched) {
      const distance = calculateDistance(center, lastSearchCenter);
      const threshold = searchRadius * 0.3; // 검색 반경의 30% 이동 시 재검색 버튼 표시

      setShowManualSearchButton(distance > threshold);
    }
  }, [center, lastSearchCenter, autoSearchOnDrag, hasSearched, searchRadius]);

  // 자동 재검색 (지도 드래그 시)
  useEffect(() => {
    if (autoSearchOnDrag && hasSearched && keyword) {
      const distance = calculateDistance(center, lastSearchCenter);
      const threshold = searchRadius * 0.5; // 검색 반경의 50% 이동 시 자동 재검색

      if (distance > threshold) {
        searchByLocation(keyword, center, searchRadius)
          .then(() => {
            setLastSearchCenter(center);
          })
          .catch(error => {
            console.error('자동 재검색 실패:', error);
          });
      }
    }
  }, [
    center,
    autoSearchOnDrag,
    hasSearched,
    keyword,
    lastSearchCenter,
    searchRadius,
    searchByLocation,
  ]);

  const calculateDistance = (
    pos1: { lat: number; lng: number },
    pos2: { lat: number; lng: number }
  ) => {
    const R = 6371e3;
    const φ1 = (pos1.lat * Math.PI) / 180;
    const φ2 = (pos2.lat * Math.PI) / 180;
    const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
    const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleSearch = useCallback(
    async (searchKeyword: string) => {
      try {
        clearError();
        await searchByLocation(searchKeyword, center, searchRadius);
        setLastSearchCenter(center);
        setShowManualSearchButton(false);
      } catch (error) {
        console.error('키워드 검색 실패:', error);
      }
    },
    [searchByLocation, center, searchRadius, clearError]
  );

  const handleManualSearch = useCallback(() => {
    if (!keyword) return;

    setManualSearchLoading(true);
    searchByLocation(keyword, center, searchRadius)
      .then(() => {
        setLastSearchCenter(center);
        setShowManualSearchButton(false);
      })
      .catch(error => {
        console.error('위치 기반 재검색 실패:', error);
      })
      .finally(() => {
        setManualSearchLoading(false);
      });
  }, [keyword, searchByLocation, center, searchRadius]);

  const handlePlaceSelect = useCallback(
    (place: NormalizedPlace) => {
      selectPlace(place);
      selectMarker(place);
      onPlaceSelect?.(place);

      // 선택된 장소로 지도 중심 이동 (부드러운 애니메이션)
      if (map) {
        // 인포윈도우가 화면 중앙에 오도록 오프셋 적용
        const offset = 0.0017;
        const targetLat = place.latitude + offset;
        const targetLng = place.longitude;

        // 부드러운 이동을 위해 panTo 사용
        map.panTo(new kakao.maps.LatLng(targetLat, targetLng));
      }
    },
    [selectPlace, selectMarker, onPlaceSelect, map]
  );

  const handleMarkerClick = useCallback(
    (place: NormalizedPlace) => {
      selectPlace(place);
      selectMarker(place);
    },
    [selectPlace, selectMarker]
  );

  const handleInfoWindowClose = useCallback(() => {
    selectPlace(null);
    selectMarker(null);
  }, [selectPlace, selectMarker]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 검색 입력 */}
      {(displayMode === 'list' || displayMode === 'both') && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <MapSearchInput
            value={keyword}
            onChange={setKeyword}
            onSearch={handleSearch}
            onCancel={clearResults}
            placeholder="장소, 업체명을 검색하세요"
            variant="gray"
            className="w-full"
          />

          {error && (
            <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={clearError}
                className="text-xs text-red-500 hover:text-red-700 mt-1"
              >
                닫기
              </button>
            </div>
          )}
        </div>
      )}

      {/* 재검색 버튼 */}
      <ResponsiveManualSearchButton
        visible={showManualSearchButton && !autoSearchOnDrag}
        loading={manualSearchLoading}
        onClick={handleManualSearch}
        className="z-20"
      />

      {/* 검색 결과 리스트 */}
      {(displayMode === 'list' || displayMode === 'both') && hasSearched && (
        <div className="absolute bottom-0 left-0 right-0 z-10 max-h-96 bg-white rounded-t-lg shadow-lg overflow-hidden">
          {meta && (
            <SearchResultSummary
              totalCount={meta.total_count}
              currentCount={results.length}
              keyword={keyword}
              category="all"
            />
          )}
          <div className="overflow-y-auto max-h-80">
            <SearchResultList
              results={results}
              loading={loading}
              onItemClick={handlePlaceSelect}
              selectedPlaceId={selectedPlace?.id}
            />
          </div>
        </div>
      )}

      {/* 검색 결과 마커들 */}
      {(displayMode === 'markers' || displayMode === 'both') &&
        markersVisible && (
          <>
            {markers.map((place, index) => (
              <CustomOverlayMap
                key={place.id}
                position={{ lat: place.latitude, lng: place.longitude }}
                yAnchor={1}
                xAnchor={0.5}
              >
                <KeywordMarker
                  place={place}
                  onClick={handleMarkerClick}
                  isSelected={selectedMarker?.id === place.id}
                  index={index + 1}
                />
              </CustomOverlayMap>
            ))}
          </>
        )}

      {/* 선택된 장소의 인포윈도우 */}
      {selectedPlace && (
        <KeywordInfoWindow
          place={selectedPlace}
          onClose={handleInfoWindowClose}
        />
      )}
    </div>
  );
};

export default KeywordSearchContainer;
