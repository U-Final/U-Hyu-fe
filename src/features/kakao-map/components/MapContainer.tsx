import React, { useCallback, useEffect, useMemo } from 'react';

import type { NormalizedPlace } from '../api/types';
import { getFilterCategoryForKakao } from '../config/categoryMapping';
import { useMapUIContext } from '../context/MapUIContext';
import { useMapData } from '../hooks/useMapData';
import { useMapInteraction } from '../hooks/useMapInteraction';
import { useMapUI } from '../hooks/useMapUI';
import type { Store } from '../types/store';
import MapWithMarkers from './marker/MapWithMarkers';

interface MapContainerProps {
  keywordResults?: NormalizedPlace[];
  selectedPlace?: NormalizedPlace | null;
  onPlaceClick?: (place: NormalizedPlace) => void;
  onPlaceInfoClose?: () => void;
  onMapCenterUpdate?: (
    setMapCenter: (center: { lat: number; lng: number }) => void
  ) => void;
  onMapCenterChange?: (center: { lat: number; lng: number }) => void;
  onMapCreate?: (map: kakao.maps.Map) => void;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  keywordResults = [],
  selectedPlace,
  onPlaceClick,
  onPlaceInfoClose,
  onMapCenterUpdate,
  onMapCenterChange,
  onMapCreate,
}) => {
  const { stores, mapCenter, userLocation, loading, setMapCenter } =
    useMapData();
  const { handleMapCenterChange, handleMapMarkerClick, selectedMarkerId } =
    useMapInteraction();
  const { bottomSheetRef } = useMapUIContext();
  const { activeCategoryFilter } = useMapUI();

  const [map, setMap] = React.useState<kakao.maps.Map | null>(null);
  const filteredKeywordResults = useMemo(() => {
    if (activeCategoryFilter === 'all') {
      return keywordResults;
    }

    return keywordResults.filter(place => {
      if (place.categoryGroupCode) {
        const filterCategory = getFilterCategoryForKakao(
          place.categoryGroupCode
        );
        return filterCategory === activeCategoryFilter;
      }

      const category = place.category.toLowerCase();
      switch (activeCategoryFilter) {
        case 'shopping':
          return (
            category.includes('마트') ||
            category.includes('편의점') ||
            category.includes('쇼핑')
          );
        case 'food':
          return (
            category.includes('음식점') ||
            category.includes('카페') ||
            category.includes('레스토랑')
          );
        case 'life':
          return (
            category.includes('은행') ||
            category.includes('편의') ||
            category.includes('공공기관')
          );
        case 'culture':
          return (
            category.includes('문화') ||
            category.includes('관광') ||
            category.includes('공연')
          );
        case 'beauty':
          return (
            category.includes('병원') ||
            category.includes('약국') ||
            category.includes('의료')
          );
        case 'activity':
          return category.includes('주차') || category.includes('스포츠');
        case 'education':
          return (
            category.includes('학교') ||
            category.includes('학원') ||
            category.includes('교육')
          );
        case 'travel':
          return (
            category.includes('숙박') ||
            category.includes('호텔') ||
            category.includes('교통')
          );
        default:
          return true;
      }
    });
  }, [keywordResults, activeCategoryFilter]);

  useEffect(() => {
    if (onMapCenterUpdate) {
      onMapCenterUpdate(setMapCenter);
    }
  }, [onMapCenterUpdate, setMapCenter]);

  useEffect(() => {
    if (onMapCenterChange) {
      onMapCenterChange(mapCenter);
    }
  }, [mapCenter, onMapCenterChange]);

  const handleMarkerClickWithBottomSheet = useCallback(
    (store: Store) => {
      if (bottomSheetRef && bottomSheetRef.current) {
        bottomSheetRef.current.setExplicitlyClosed(true);
        bottomSheetRef.current.close();
      }

      handleMapMarkerClick(store);
    },
    [bottomSheetRef, handleMapMarkerClick]
  );

  return (
    <MapWithMarkers
      center={mapCenter}
      stores={stores}
      keywordResults={filteredKeywordResults}
      selectedPlace={selectedPlace}
      currentLocation={userLocation}
      onStoreClick={handleMarkerClickWithBottomSheet}
      onPlaceClick={onPlaceClick}
      onPlaceInfoClose={onPlaceInfoClose}
      onCenterChange={handleMapCenterChange}
      isSearching={loading.stores}
      selectedStoreId={selectedMarkerId}
      onMapCreate={(mapInstance) => {
        setMap(mapInstance);
        onMapCreate?.(mapInstance);
      }}
      map={map}
    />
  );
};
