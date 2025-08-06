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
  level?: number; // 초기값으로만 사용하고, 비제어로 전환
  className?: string;
  onStoreClick?: (store: Store) => void;
  onPlaceClick?: (place: NormalizedPlace) => void;
  onPlaceInfoClose?: () => void;
  onCenterChange?: (center: { lat: number; lng: number }) => void;
  /** 검색 로딩 상태 (재검색 버튼 로딩 표시용) */
  isSearching?: boolean;
  /** 외부에서 제어하는 선택된 매장 ID */
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

  // 내부 상태 정의(mymap)
  const sharedStores = useSharedMapStore(state => state.stores);
  const { uuid } = useParams();
  const isShared = !!uuid;

  // 추천 매장 상태 가져오기
  const recommendedStores = useRecommendedStores();
  const showRecommendedStores = useShowRecommendedStores();
  // 전역상태에서 선택된 매장 ID 가져오기 (카드 클릭 시 사용)
  const globalSelectedStoreId = useMapStore(
    state => state.selectedStore?.storeId
  );

  const { bookmarkMode, bookmarkStores, selectStore } = useMapStore();

  // 마커에 사용할 store 배열 결정 (일반 매장 + 추천 매장)
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

  // 거리 기반 재검색 상태 관리
  const {
    showButton,
    distanceFromLastSearch,
    handleMapMove,
    handleSearch,
    updateSearchPosition,
  } = useDistanceBasedSearch();

  // 인증 확인 및 로그인 모달 관리
  const { checkAuthAndExecuteModal } = useAuthCheckModal();

  const setZoomLevel = useMapStore(state => state.setZoomLevel);

  const handleZoomChanged = useCallback(
    (map: kakao.maps.Map) => {
      const lv = map.getLevel();
      setZoomLevel(lv); // MapStore가 searchRadius도 함께 업데이트
    },
    [setZoomLevel]
  );

  // 줌 기반 버튼 표시 훅
  const { visibleByZoom, currentZoomLevel, currentRadius, markSearched } =
    useZoomSearchTrigger({ levelDeltaThreshold: 1 });

  // 검색 파라미터 업데이트 액션 가져오기
  const setSearchParams = useMapStore(state => state.setSearchParams);

  // 재검색 버튼 클릭 (거리 + 줌 기준 동시 갱신)
  const handleSearchClick = useCallback(() => {
    if (!onCenterChange || !mapRef.current) return;
    const c = mapRef.current.getCenter();
    if (!c) return;

    const pos = { lat: c.getLat(), lng: c.getLng() };

    // 검색 파라미터 업데이트 (API 호출 트리거)
    setSearchParams({
      lat: pos.lat,
      lng: pos.lng,
      radius: currentRadius,
    });

    // 거리 기반 기준 갱신
    handleSearch();
    updateSearchPosition(pos);
    onCenterChange(pos);

    // 줌 기준 갱신
    markSearched();
  }, [
    onCenterChange,
    handleSearch,
    updateSearchPosition,
    markSearched,
    setSearchParams,
    currentRadius,
  ]);

  // center prop 동기화 및 검색 기준 위치 설정 (인포윈도우 상태 변경 시 의존성 제외)
  useEffect(() => {
    if (!infoWindowStore && !recommendedInfoWindowStore) {
      setMapCenter(center);
      updateSearchPosition(center);
    }
  }, [center, updateSearchPosition]);

  // 전역 selectedStore 변경 시 해당 매장으로 포커스 (카드 클릭 시)
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

  // 외부에서 selectedStoreId가 변경될 때 인포윈도우 표시
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

  // 컴포넌트 언마운트 시 setTimeout cleanup
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
        } catch (error) {
          console.error('즐겨찾기 토글 실패:', error);
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

  // 최초 1회: onCreate 이후 현재 줌 레벨을 스토어와 동기화 (무한 루프 방지)
  useEffect(() => {
    if (!mapRef.current || didInitZoomSyncRef.current) return;
    didInitZoomSyncRef.current = true;
    setZoomLevel(mapRef.current.getLevel());
  }, [setZoomLevel]);

  // 즐겨찾기 모드일 때 일반 마커에서 즐겨찾기 매장은 제외
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
      {/* 거리/줌 기반 재검색 버튼 */}
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
          minLevel={CLUSTER_MIN_LEVEL} // 예: 6
          calculator={[10, 30]} // 0~9 / 10~29 / 30+
        >
          {/* 매장 마커들 */}
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

          {/* 즐겨찾기 마커 */}
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

          {/* 추천 매장 간단 정보 인포윈도우 */}
          {recommendedInfoWindowStore && (
            <RecommendStoreInfoWindow
              store={recommendedInfoWindowStore}
              position={{
                lat: recommendedInfoWindowStore.latitude,
                lng: recommendedInfoWindowStore.longitude,
              }}
            />
          )}

          {/* 키워드 검색 결과 마커들 */}
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

          {/* 선택된 키워드 검색 결과의 인포윈도우 */}
          {selectedPlace && (
            <KeywordInfoWindow
              place={selectedPlace}
              onClose={() => onPlaceInfoClose?.()}
            />
          )}

          {/* 사용자 위치 마커 */}
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
