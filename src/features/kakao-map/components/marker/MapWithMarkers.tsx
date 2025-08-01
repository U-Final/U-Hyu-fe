import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  useMapStore,
  useRecommendedStores,
  useShowRecommendedStores,
} from '@kakao-map/store/MapStore';
import { useSharedMapStore } from '@mymap/store/SharedMapStore';
import { RecommendStoreInfoWindow } from '@recommendation/components/StoreInfoWindow';
import { CustomOverlayMap, Map as KakaoMap } from 'react-kakao-maps-sdk';
import { useParams } from 'react-router-dom';

import { useAuthCheckModal } from '@/shared/hooks/useAuthCheckModal';
import { trackMarkerClick } from '@/shared/utils/actionlogTracker';

import type { NormalizedPlace } from '../../api/types';
import { useDistanceBasedSearch } from '../../hooks/useManualSearch';
import { useToggleFavoriteMutation } from '../../hooks/useMapQueries';
import type { Store } from '../../types/store';
import ResponsiveManualSearchButton from '../ManualSearchButton';
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
  /** 검색 로딩 상태 (재검색 버튼 로딩 표시용) */
  isSearching?: boolean;
  /** 외부에서 제어하는 선택된 매장 ID */
  selectedStoreId?: number | null;
}

const MapWithMarkers: FC<MapWithMarkersProps> = ({
  center,
  stores,
  keywordResults = [],
  selectedPlace,
  currentLocation,
  level = 4,
  className = 'w-full h-full',
  onStoreClick,
  onPlaceClick,
  onPlaceInfoClose,
  onCenterChange,
  isSearching = false,
  selectedStoreId: externalSelectedStoreId,
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
  const setSelectedStore = useMapStore(state => state.selectStore);

  const { bookmarkMode, bookmarkStores } = useMapStore();

  // 마커에 사용할 store 배열 결정(mymap)
  // const storesToRender = isShared ? sharedStores : stores;
  // 마커에 사용할 store 배열 결정 (일반 매장 + 추천 매장)
  const storesToRender = useMemo(() => {
    if (isShared) return sharedStores;

    // 일반 매장과 추천 매장을 합치되, 중복 제거
    const allStores = [...stores];

    if (showRecommendedStores && recommendedStores.length > 0) {
      recommendedStores.forEach(recommendedStore => {
        const exists = allStores.some(
          store => store.storeId === recommendedStore.storeId
        );
        if (!exists) {
          allStores.push(recommendedStore);
        }
      });
    }

    if (import.meta.env.MODE === 'development') {
      console.log('🗺️ MapWithMarkers: Rendering stores', {
        storesCount: stores.length,
        recommendedCount: recommendedStores.length,
        totalRenderCount: allStores.length,
        stores: allStores,
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

  // center prop 동기화 및 검색 기준 위치 설정
  useEffect(() => {
    // 인포윈도우가 열려있지 않을 때만 center prop 동기화
    if (!infoWindowStore && !recommendedInfoWindowStore) {
      setMapCenter(center);
      // 새로운 center가 설정될 때 검색 기준 위치도 업데이트
      updateSearchPosition(center);
    }
  }, [
    center,
    infoWindowStore,
    recommendedInfoWindowStore,
    updateSearchPosition,
  ]);

  // 전역 selectedStore 변경 시 해당 매장으로 포커스 (카드 클릭 시)
  useEffect(() => {
    const globalSelectedStore = useMapStore.getState().selectedStore;
    if (globalSelectedStore && storesToRender.length > 0) {
      const targetStore = storesToRender.find(
        store => store.storeId === globalSelectedStore.storeId
      );

      if (targetStore) {
        // 기존 인포윈도우들 닫기
        setInfoWindowStore(null);
        setRecommendedInfoWindowStore(null);

        // 추천 매장인지 확인하여 적절한 인포윈도우 표시
        const isRecommended = recommendedStores.some(
          store => store.storeId === targetStore.storeId
        );

        if (isRecommended) {
          setRecommendedInfoWindowStore(targetStore);
        } else {
          setInfoWindowStore(targetStore);
        }

        // 지도 중심을 해당 매장으로 이동
        const offset = 0.0017;
        const targetLat = targetStore.latitude + offset;
        const targetLng = targetStore.longitude;
        const targetCenter = { lat: targetLat, lng: targetLng };

        setIsPanto(true);
        setMapCenter(targetCenter);

        if (pantoTimeoutRef.current) {
          clearTimeout(pantoTimeoutRef.current);
        }

        pantoTimeoutRef.current = setTimeout(() => {
          setIsPanto(false);
          pantoTimeoutRef.current = null;
        }, 500);

        if (import.meta.env.MODE === 'development') {
          console.log('🎯 카드 클릭으로 매장 포커스:', targetStore.storeName);
        }
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
        // 추천 매장인지 확인
        const isRecommended = recommendedStores.some(
          store => store.storeId === selectedStore.storeId
        );
        // 기존 인포윈도우들 닫기
        setInfoWindowStore(null);
        setRecommendedInfoWindowStore(null);

        // 해당 스토어 인포윈도우 표시
        if (isRecommended) {
          setRecommendedInfoWindowStore(selectedStore);
        } else {
          setInfoWindowStore(selectedStore);
        }

        // 지도 중심을 해당 매장으로 이동
        const offset = 0.0017;
        const targetLat = selectedStore.latitude + offset;
        const targetLng = selectedStore.longitude;
        const targetCenter = { lat: targetLat, lng: targetLng };

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
        }, 500);
      }
    }
  }, [externalSelectedStoreId, storesToRender, recommendedStores]);

  // 컴포넌트 언마운트 시 setTimeout cleanup
  useEffect(() => {
    return () => {
      if (pantoTimeoutRef.current) {
        clearTimeout(pantoTimeoutRef.current);
      }
    };
  }, []);

  const handleMarkerClick = useCallback(
    (store: Store) => {
      // 로그인 상태 확인 후 인포윈도우 표시
      checkAuthAndExecuteModal(() => {
        setInternalSelectedStoreId(store.storeId);
        setInfoWindowStore(store);

        // 추천 매장인지 확인
        const isRecommended = recommendedStores.some(
          s => s.storeId === store.storeId
        );
        if (isRecommended) {
          setRecommendedInfoWindowStore(store);
        } else {
          setInfoWindowStore(store);
        }

        trackMarkerClick(store.storeId);

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

        // 외부에서 전달받은 onStoreClick 콜백도 호출
        onStoreClick?.(store);
      });
    },
    [onStoreClick, checkAuthAndExecuteModal, recommendedStores]
  );

  // 추천 매장인지 확인하는 함수
  const isRecommendedStore = useCallback(
    (storeId: number) => {
      return recommendedStores.some(store => store.storeId === storeId);
    },
    [recommendedStores]
  );

  const handleInfoWindowClose = useCallback(() => {
    setInternalSelectedStoreId(null);
    setInfoWindowStore(null);
    setRecommendedInfoWindowStore(null); // 추가
    // 전역 상태도 초기화
    setSelectedStore(null);
  }, [setSelectedStore]);

  const toggleFavoriteMutation = useToggleFavoriteMutation();

  const handleToggleFavorite = useCallback(
    async (event?: React.MouseEvent) => {
      // 이벤트 전파 차단 (추가 보호)
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }

      if (!infoWindowStore) return;

      // 로그인 상태 확인 후 즐겨찾기 토글 실행
      checkAuthAndExecuteModal(async () => {
        try {
          await toggleFavoriteMutation.mutateAsync({
            storeId: infoWindowStore.storeId,
          });
        } catch (error) {
          console.error('즐겨찾기 토글 실패:', error);
        }
      });
    },
    [infoWindowStore, toggleFavoriteMutation, checkAuthAndExecuteModal]
  );

  const handleDragEnd = useCallback(
    (map: kakao.maps.Map) => {
      const newCenter = map.getCenter();
      if (!newCenter) return;

      const currentPosition = {
        lat: newCenter.getLat(),
        lng: newCenter.getLng(),
      };

      // 거리 기반 재검색 상태 업데이트만 실행 (자동 검색 로직 제거)
      handleMapMove(currentPosition);

      if (import.meta.env.MODE === 'development') {
        console.log(
          `지도 이동: ${currentPosition.lat}, ${currentPosition.lng}`
        );
      }
    },
    [handleMapMove]
  );

  /**
   * 재검색 버튼 클릭 핸들러
   */
  const handleSearchClick = useCallback(() => {
    if (!onCenterChange || !mapRef.current) return;

    const currentCenter = mapRef.current.getCenter();
    if (!currentCenter) return;

    const currentPosition = {
      lat: currentCenter.getLat(),
      lng: currentCenter.getLng(),
    };

    // 검색 상태 업데이트 (버튼 숨김 및 새로운 기준점 설정)
    handleSearch();
    updateSearchPosition(currentPosition);

    // API 요청 실행
    onCenterChange(currentPosition);

    if (import.meta.env.MODE === 'development') {
      console.log('재검색 실행:', currentPosition);
    }
  }, [onCenterChange, handleSearch, updateSearchPosition]);

  return (
    <>
      {/* 거리 기반 재검색 버튼 */}
      <ResponsiveManualSearchButton
        visible={showButton}
        loading={isSearching}
        onClick={handleSearchClick}
        distance={distanceFromLastSearch}
      />

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
        {storesToRender.map(store => (
          <CustomOverlayMap
            key={store.storeId}
            position={{ lat: store.latitude, lng: store.longitude }}
            yAnchor={1}
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
              yAnchor={1}
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
                yAnchor={1}
                xAnchor={0.5}
              >
                <KeywordMarker
                  place={place}
                  onClick={clickedPlace => {
                    // 마커 클릭 시 지도 이동 애니메이션 적용
                    if (mapRef.current) {
                      const offset = 0.0017;
                      const targetLat = clickedPlace.latitude + offset;
                      const targetLng = clickedPlace.longitude;

                      // 부드러운 이동을 위해 panTo 사용
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
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
              <div className="absolute inset-0 w-12 h-12 border-2 border-blue-300 rounded-full opacity-30 animate-pulse -translate-x-4 -translate-y-4" />
            </div>
          </CustomOverlayMap>
        )}
      </KakaoMap>
    </>
  );
};

export default MapWithMarkers;
