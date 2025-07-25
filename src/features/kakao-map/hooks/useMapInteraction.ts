import { useCallback } from 'react';
import { useMapData } from './useMapData';
import { useMapUI } from './useMapUI';
import type { Store } from '../types/store';

export const useMapInteraction = () => {
  const { selectStore, setMapCenter } = useMapData();
  const { 
    setSelectedMarker, 
    selectedMarkerId, 
    setBottomSheetExpanded,
  } = useMapUI();

  // 매장 선택 시 UI 상태 업데이트 및 지도 중심점 이동
  const handleStoreSelect = useCallback(
    (store: Store) => {
      setSelectedMarker(store.storeId);
      selectStore(store);
      setMapCenter({ lat: store.latitude, lng: store.longitude });
    },
    [selectStore, setMapCenter, setSelectedMarker]
  );

  // 지도 중심점 변경 처리
  const handleMapCenterChange = useCallback(
    (newCenter: { lat: number; lng: number }) => {
      setMapCenter(newCenter);
    },
    [setMapCenter]
  );

  // 지도 위 마커 클릭 시 바텀시트 닫고 인포윈도우 표시
  // 바텀시트 제어는 ref를 통해 외부에서 수행
  const handleMapMarkerClick = useCallback(
    (store: Store) => {
      if (import.meta.env.MODE === 'development') {
        console.log('지도 마커 클릭:', store.storeName);
      }
      
      // 매장 선택만 수행 (바텀시트 제어는 외부에서 ref로 처리)
      handleStoreSelect(store);
    },
    [handleStoreSelect]
  );

  // 바텀시트 내 매장 리스트 클릭 시 처리
  const handleMarkerClick = useCallback(
    (store: Store) => {
      if (import.meta.env.MODE === 'development') {
        console.log('바텀시트 매장 클릭:', store.storeName);
      }
      
      setBottomSheetExpanded(false);
      handleStoreSelect(store);
    },
    [handleStoreSelect, setBottomSheetExpanded]
  );

  return {
    selectedMarkerId,
    handleStoreSelect,
    handleMapCenterChange,
    handleMarkerClick,
    handleMapMarkerClick,
  };
};