import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useZoomSearchTrigger } from '@kakao-map/hooks/useZoomSearchTrigger';
import {
  useMapStore,
  useRecommendedStores,
  useRefreshBookmarkStores,
  useShowRecommendedStores,
} from '@kakao-map/store/MapStore';
import { useSharedMapStore } from '@mymap/store/SharedMapStore';
import { RecommendStoreInfoWindow } from '@recommendation/components/RecommendStoreInfoWindow';
import {
  CustomOverlayMap,
  Map as KakaoMap,
  MarkerClusterer,
} from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';

import { useAuthCheckModal } from '@/shared/hooks/useAuthCheckModal';
import { trackMarkerClick } from '@/shared/utils/actionlogTracker';

import type { NormalizedPlace } from '../../api/types';
import { useDistanceBasedSearch } from '../../hooks/useManualSearch';
import { useToggleFavoriteMutation } from '../../hooks/useMapQueries';
import type { Store } from '../../types/store';
import { clusterStyles } from '../../utils/clusterStyles';
import ManualSearchButton from '../controls/ManualSearchButton';
import CurrentLocationMarker from '../location/CurrentLocationMarker';
import BrandMarker from './BrandMarker';
import FavoriteMarker from './FavoriteMarker';
import { KeywordInfoWindow } from './KeywordInfoWindow';
import { KeywordMarker } from './KeywordMarker';
import MyMapMarker from './MyMapMarker';
import StoreInfoWindow from './StoreInfoWindow';

interface MapWithMarkersProps {
  center: { lat: number; lng: number };
  stores: Store[];
  keywordResults?: NormalizedPlace[];
  selectedPlace?: NormalizedPlace | null;
  currentLocation?: { lat: number; lng: number } | null;
  level?: number;
  className?: string;
  onStoreClick?: (store: Store) => void;
  onPlaceClick?: (place: NormalizedPlace) => void;
  onPlaceInfoClose?: () => void;
  onCenterChange?: (center: { lat: number; lng: number }) => void;
  isSearching?: boolean;
  selectedStoreId?: number | null;
  /** 지도 생성 콜백 */
  onMapCreate?: (map: kakao.maps.Map) => void;
  /** 지도 인스턴스 */
  map?: kakao.maps.Map | null;
}

const MapWithMarkers: FC<MapWithMarkersProps> = ({
  center,
  stores,
  keywordResults = [],
  selectedPlace,
  currentLocation,
  className = 'w-full h-full',
  onStoreClick,
  onPlaceClick,
  onPlaceInfoClose,
  onCenterChange,
  isSearching = false,
  selectedStoreId: externalSelectedStoreId,
  onMapCreate,
}) => {
  const [internalSelectedStoreId, setInternalSelectedStoreId] = useState<
    number | null
  >(null);
  const selectedStoreId = externalSelectedStoreId ?? internalSelectedStoreId;
  const [infoWindowStore, setInfoWindowStore] = useState<Store | null>(null);
  const [recommendedInfoWindowStore, setRecommendedInfoWindowStore] =
    useState<Store | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [isPanto, setIsPanto] = useState(false);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const pantoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const didInitZoomSyncRef = useRef(false);
  const refreshBookmarkStores = useRefreshBookmarkStores();

  const CLUSTER_MIN_LEVEL = Number(import.meta.env.VITE_CLUSTER_MIN_LEVEL) || 5;

  const sharedStores = useSharedMapStore(state => state.stores);
  const { uuid } = useParams();
  const isShared = !!uuid;

  const recommendedStores = useRecommendedStores();
  const showRecommendedStores = useShowRecommendedStores();
  const globalSelectedStoreId = useMapStore(
    state => state.selectedStore?.storeId
  );

  const { bookmarkMode, bookmarkStores, selectStore } = useMapStore();

  const storesToRender = useMemo(() => {
    if (isShared) return sharedStores;

    const allStores = [...stores];
    if (showRecommendedStores && recommendedStores.length > 0) {
      recommendedStores.forEach(recommendedStore => {
        const exists = allStores.some(
          store => store.storeId === recommendedStore.storeId
        );
        if (!exists) allStores.push(recommendedStore);
      });
    }
    return allStores;
  }, [
    stores,
    recommendedStores,
    showRecommendedStores,
    isShared,
    sharedStores,
  ]);

  const {
    showButton,
    distanceFromLastSearch,
    handleMapMove,
    handleSearch,
    updateSearchPosition,
  } = useDistanceBasedSearch();

  const { checkAuthAndExecuteModal } = useAuthCheckModal();

  const setZoomLevel = useMapStore(state => state.setZoomLevel);

  const handleZoomChanged = useCallback(
    (map: kakao.maps.Map) => {
      const lv = map.getLevel();
      setZoomLevel(lv);
    },
    [setZoomLevel]
  );

  const { visibleByZoom, currentZoomLevel, currentRadius, markSearched } =
    useZoomSearchTrigger({ levelDeltaThreshold: 1 });

  const setSearchParams = useMapStore(state => state.setSearchParams);

  const handleSearchClick = useCallback(() => {
    if (!onCenterChange || !mapRef.current) return;
    const c = mapRef.current.getCenter();
    if (!c) return;

    const pos = { lat: c.getLat(), lng: c.getLng() };

    setSearchParams({
      lat: pos.lat,
      lng: pos.lng,
      radius: currentRadius,
    });

    handleSearch();
    updateSearchPosition(pos);
    onCenterChange(pos);

    markSearched();
  }, [
    onCenterChange,
    handleSearch,
    updateSearchPosition,
    markSearched,
    setSearchParams,
    currentRadius,
  ]);

  useEffect(() => {
    if (!infoWindowStore && !recommendedInfoWindowStore) {
      setMapCenter(center);
      updateSearchPosition(center);
    }
  }, [center, updateSearchPosition]);

  useEffect(() => {
    const globalSelectedStore = useMapStore.getState().selectedStore;
    if (globalSelectedStore && storesToRender.length > 0) {
      const targetStore = storesToRender.find(
        store => store.storeId === globalSelectedStore.storeId
      );
      if (targetStore) {
        setInfoWindowStore(null);
        setRecommendedInfoWindowStore(null);

        const isRecommended = recommendedStores.some(
          store => store.storeId === targetStore.storeId
        );
        if (isRecommended) setRecommendedInfoWindowStore(targetStore);
        else setInfoWindowStore(targetStore);

        const offset = 0.0017;
        const targetCenter = {
          lat: targetStore.latitude + offset,
          lng: targetStore.longitude,
        };

        setIsPanto(true);
        setMapCenter(targetCenter);

        if (pantoTimeoutRef.current) clearTimeout(pantoTimeoutRef.current);
        pantoTimeoutRef.current = setTimeout(() => {
          setIsPanto(false);
          pantoTimeoutRef.current = null;
        }, 500);
      }
    }
  }, [globalSelectedStoreId, storesToRender, recommendedStores]);

  useEffect(() => {
    if (externalSelectedStoreId && storesToRender.length > 0) {
      const selectedStore = storesToRender.find(
        store => store.storeId === externalSelectedStoreId
      );
      if (selectedStore) {
        const isRecommended = recommendedStores.some(
          store => store.storeId === selectedStore.storeId
        );

        setInfoWindowStore(null);
        setRecommendedInfoWindowStore(null);
        if (isRecommended) setRecommendedInfoWindowStore(selectedStore);
        else setInfoWindowStore(selectedStore);

        const offset = 0.0017;
        const targetCenter = {
          lat: selectedStore.latitude + offset,
          lng: selectedStore.longitude,
        };

        setIsPanto(true);
        setMapCenter(targetCenter);

        if (pantoTimeoutRef.current) clearTimeout(pantoTimeoutRef.current);
        pantoTimeoutRef.current = setTimeout(() => {
          setIsPanto(false);
          pantoTimeoutRef.current = null;
        }, 500);
      }
    }
  }, [externalSelectedStoreId, storesToRender, recommendedStores]);

  useEffect(() => {
    return () => {
      if (pantoTimeoutRef.current) clearTimeout(pantoTimeoutRef.current);
    };
  }, []);

  const handleMarkerClick = useCallback(
    (store: Store) => {
      checkAuthAndExecuteModal(() => {
        setInternalSelectedStoreId(store.storeId);
        setInfoWindowStore(store);

        const isRecommended = recommendedStores.some(
          s => s.storeId === store.storeId
        );
        if (isRecommended) setRecommendedInfoWindowStore(store);
        else setInfoWindowStore(store);

        trackMarkerClick(store.storeId);

        const offset = 0.0017;
        const targetCenter = {
          lat: store.latitude + offset,
          lng: store.longitude,
        };

        setIsPanto(true);
        setMapCenter(targetCenter);
        if (mapRef.current) {
          mapRef.current.setLevel(3);
        }

        if (pantoTimeoutRef.current) clearTimeout(pantoTimeoutRef.current);
        pantoTimeoutRef.current = setTimeout(() => {
          setIsPanto(false);
          pantoTimeoutRef.current = null;
        }, 500);

        onStoreClick?.(store);
      });
    },
    [onStoreClick, recommendedStores, checkAuthAndExecuteModal]
  );

  const isRecommendedStore = useCallback(
    (storeId: number) => {
      return recommendedStores.some(store => store.storeId === storeId);
    },
    [recommendedStores]
  );

  const handleInfoWindowClose = useCallback(() => {
    selectStore(null);
    setInternalSelectedStoreId(null);
    setInfoWindowStore(null);
    setRecommendedInfoWindowStore(null);
  }, [selectStore]);

  const toggleFavoriteMutation = useToggleFavoriteMutation();

  const handleToggleFavorite = useCallback(
    async (event?: React.MouseEvent) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      if (!infoWindowStore) return;

      checkAuthAndExecuteModal(async () => {
        try {
          await toggleFavoriteMutation.mutateAsync({
            storeId: infoWindowStore.storeId,
          });
          if (bookmarkMode) refreshBookmarkStores();
        } catch {
          // 에러는 mutation에서 자동으로 처리됨
        }
      });
    },
    [
      infoWindowStore,
      toggleFavoriteMutation,
      checkAuthAndExecuteModal,
      bookmarkMode,
      refreshBookmarkStores,
    ]
  );

  const handleDragEnd = useCallback(
    (map: kakao.maps.Map) => {
      const newCenter = map.getCenter();
      if (!newCenter) return;

      const currentPosition = {
        lat: newCenter.getLat(),
        lng: newCenter.getLng(),
      };
      handleMapMove(currentPosition);
    },
    [handleMapMove]
  );

  useEffect(() => {
    if (!mapRef.current || didInitZoomSyncRef.current) return;
    didInitZoomSyncRef.current = true;
    setZoomLevel(mapRef.current.getLevel());
  }, [setZoomLevel]);

  const filteredStoresToRender = useMemo(() => {
    if (bookmarkMode) {
      const bookmarkIds = new Set(bookmarkStores.map(s => s.storeId));
      return storesToRender.filter(store => !bookmarkIds.has(store.storeId));
    }
    return storesToRender;
  }, [storesToRender, bookmarkMode, bookmarkStores]);

  const showManualButton = showButton || visibleByZoom;

  return (
    <>
      <ManualSearchButton
        visible={showManualButton}
        loading={isSearching}
        onClick={handleSearchClick}
        distance={distanceFromLastSearch}
        zoomLevel={currentZoomLevel}
        radius={currentRadius}
      />

      <KakaoMap
        id="map"
        center={mapCenter}
        className={className}
        isPanto={isPanto}
        onDragEnd={handleDragEnd}
        onClick={handleInfoWindowClose}
        onZoomChanged={handleZoomChanged}
        onCreate={map => {
          mapRef.current = map;
          onMapCreate?.(map);
        }}
      >
        <MarkerClusterer
          averageCenter
          styles={clusterStyles}
          gridSize={80}
          minLevel={CLUSTER_MIN_LEVEL}
          calculator={[10, 30]}
        >
          {filteredStoresToRender.map(store => (
            <CustomOverlayMap
              key={store.storeId}
              position={{ lat: store.latitude, lng: store.longitude }}
              yAnchor={1.3}
              xAnchor={0.5}
            >
              {isShared ? (
                <MyMapMarker
                  isSelected={selectedStoreId === store.storeId}
                  onClick={() => handleMarkerClick(store)}
                />
              ) : (
                <BrandMarker
                  store={store}
                  isSelected={selectedStoreId === store.storeId}
                  isRecommended={isRecommendedStore(store.storeId)}
                  onClick={() => handleMarkerClick(store)}
                />
              )}
            </CustomOverlayMap>
          ))}

          {bookmarkMode &&
            bookmarkStores.map(store => (
              <CustomOverlayMap
                key={`bookmark-${store.storeId}`}
                position={{ lat: store.latitude, lng: store.longitude }}
                yAnchor={1.3}
                xAnchor={0.5}
              >
                <FavoriteMarker
                  isSelected={selectedStoreId === store.storeId}
                  onClick={() => handleMarkerClick(store)}
                />
              </CustomOverlayMap>
            ))}

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

          {recommendedInfoWindowStore && (
            <RecommendStoreInfoWindow
              store={recommendedInfoWindowStore}
              position={{
                lat: recommendedInfoWindowStore.latitude,
                lng: recommendedInfoWindowStore.longitude,
              }}
            />
          )}

          {keywordResults.length > 0 && (
            <>
              {keywordResults.map((place, index) => (
                <CustomOverlayMap
                  key={place.id}
                  position={{ lat: place.latitude, lng: place.longitude }}
                  yAnchor={1.3}
                  xAnchor={0.5}
                >
                  <KeywordMarker
                    place={place}
                    onClick={clickedPlace => {
                      if (mapRef.current) {
                        const offset = 0.0017;
                        const targetLat = clickedPlace.latitude + offset;
                        const targetLng = clickedPlace.longitude;
                        mapRef.current.panTo(
                          new kakao.maps.LatLng(targetLat, targetLng)
                        );
                      }
                      onPlaceClick?.(clickedPlace);
                    }}
                    isSelected={selectedPlace?.id === place.id}
                    index={index + 1}
                  />
                </CustomOverlayMap>
              ))}
            </>
          )}

          {selectedPlace && (
            <KeywordInfoWindow
              place={selectedPlace}
              onClose={() => onPlaceInfoClose?.()}
            />
          )}

          {currentLocation && (
            <CustomOverlayMap
              position={currentLocation}
              yAnchor={0.5}
              xAnchor={0.5}
            >
              <CurrentLocationMarker size="medium" animated={true} />
            </CustomOverlayMap>
          )}
        </MarkerClusterer>
      </KakaoMap>
    </>
  );
};

export default MapWithMarkers;
