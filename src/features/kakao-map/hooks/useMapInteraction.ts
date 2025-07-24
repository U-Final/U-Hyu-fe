import { useCallback } from 'react';
import { useMapData } from './useMapData';
import { useMapUI } from './useMapUI';
import type { Store } from '../types/store';

export const useMapInteraction = () => {
  const { selectStore, setMapCenter } = useMapData();
  const { setSelectedMarker, selectedMarkerId, setBottomSheetExpanded } = useMapUI();

  // 매장 선택 (UI + 비즈니스 로직 연결)
  const handleStoreSelect = useCallback(
    (store: Store) => {
      // UI 상태 업데이트
      setSelectedMarker(store.storeId);

      // 비즈니스 로직 실행
      selectStore(store);
      setMapCenter({ lat: store.latitude, lng: store.longitude });
    },
    [selectStore, setMapCenter, setSelectedMarker]
  );

  // 지도 중심점 변경 (UI 트리거)
  const handleMapCenterChange = useCallback(
    (newCenter: { lat: number; lng: number }) => {
      setMapCenter(newCenter);
    },
    [setMapCenter]
  );

  // 마커 클릭 (바탐시트 닫기만 담당)
  const handleMarkerClick = useCallback(
    (store: Store) => {
      if (import.meta.env.MODE === 'development') {
        console.log('🔍 handleMarkerClick 호출됨 (바탐시트 닫기):', store.storeName);
      }
      
      // 바탐 시트 닫기 (인포윈도우 표시를 위해)
      setBottomSheetExpanded(false);
      
      // 매장 선택 처리 (지도 중심점 이동 등)
      handleStoreSelect(store);
    },
    [handleStoreSelect, setBottomSheetExpanded]
  );

  return {
    // 상태
    selectedMarkerId,

    // 핸들러
    handleStoreSelect,
    handleMapCenterChange,
    handleMarkerClick,
  };
};
