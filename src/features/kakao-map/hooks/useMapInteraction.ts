import { useCallback } from 'react';
import { useMapData } from './useMapData';
import { useMapUI } from './useMapUI';
import type { Store } from '../types/store';
import type { MapDragBottomSheetRef } from '../components/MapDragBottomSheet';

export const useMapInteraction = (bottomSheetRef?: React.RefObject<MapDragBottomSheetRef>) => {
  const { selectStore, setMapCenter } = useMapData();
  const { setSelectedMarker, selectedMarkerId, setBottomSheetExpanded } = useMapUI();

  // 매장 선택 (UI + 비즈니스 로직 연결)
  const handleStoreSelect = useCallback(
    (store: Store, shouldCloseBottomSheet = false) => {
      // 지도 마커 클릭인 경우 즉시 플래그 설정 (가장 빠른 시점)
      if (shouldCloseBottomSheet && bottomSheetRef?.current) {
        console.log('⚡ 가장 빠른 시점에서 플래그 설정');
        bottomSheetRef.current.setExplicitlyClosed(true);
      }

      // UI 상태 업데이트
      setSelectedMarker(store.storeId);

      // 비즈니스 로직 실행
      selectStore(store);
      setMapCenter({ lat: store.latitude, lng: store.longitude });
    },
    [selectStore, setMapCenter, setSelectedMarker, bottomSheetRef]
  );

  // 지도 중심점 변경 (UI 트리거)
  const handleMapCenterChange = useCallback(
    (newCenter: { lat: number; lng: number }) => {
      setMapCenter(newCenter);
    },
    [setMapCenter]
  );

  // 지도 마커 클릭 (바텀시트 닫고 인포윈도우 표시)
  const handleMapMarkerClick = useCallback(
    (store: Store) => {
      // 💡 가장 먼저 바텀시트 닫힘 플래그 설정 (깜빡임 방지)
      if (bottomSheetRef?.current) {
        console.log('⚡ 최우선 플래그 설정 - 깜빡임 방지');
        bottomSheetRef.current.setExplicitlyClosed(true);
      }

      if (import.meta.env.MODE === 'development') {
        console.log('🗺️ handleMapMarkerClick 호출됨 (지도 마커 클릭):', store.storeName);
        console.log('🔍 bottomSheetRef:', bottomSheetRef);
        console.log('🔍 bottomSheetRef.current:', bottomSheetRef?.current);
      }
      
      // 매장 선택 처리
      handleStoreSelect(store, true);
      
      // 바텀시트 닫기 (ref를 통해 직접 제어)
      if (bottomSheetRef?.current) {
        console.log('🔽 지도 마커 클릭으로 바텀시트 닫기');
        bottomSheetRef.current.close();
      } else {
        console.log('❌ bottomSheetRef가 없음 - 바텀시트 닫기 실패');
      }
    },
    [handleStoreSelect, bottomSheetRef]
  );

  // 바텀시트 매장 클릭 (기존 로직 유지)
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
    handleMarkerClick, // 바텀시트 매장 클릭용
    handleMapMarkerClick, // 지도 마커 클릭용
  };
};
