import React, { useCallback } from 'react';
import { useMapData } from '../../hooks/useMapData';
import { useMapStore } from '../../store/MapStore';
import LocationButton from './LocationButton';

interface LocationControlContainerProps {
  /** 지도 중심 변경 콜백 */
  onCenterChange?: (center: { lat: number; lng: number; _forceUpdate?: number }) => void;
}

export const LocationControlContainer: React.FC<LocationControlContainerProps> = ({
  onCenterChange
}) => {
  const { getCurrentLocation, loading, errors } = useMapData();
  const clearAllErrors = useMapStore(state => state.clearAllErrors);

  const handleLocationClick = useCallback(async () => {
    if (import.meta.env.MODE === 'development') {
      console.log('🔍 [Location Button] Button clicked');
      console.log('🔍 [Location Button] onCenterChange available:', !!onCenterChange);
    }

    // 이전 에러 클리어
    if (errors.location) {
      clearAllErrors();
    }
    
    try {
      // 위치 가져오기 실행
      if (import.meta.env.MODE === 'development') {
        console.log('🔍 [Location Button] Calling getCurrentLocation...');
      }
      
      await getCurrentLocation();
      
      if (import.meta.env.MODE === 'development') {
        console.log('🔍 [Location Button] getCurrentLocation completed');
      }
      
      // 성공 후 약간의 딜레이를 두고 지도 이동 (userLocation 업데이트 대기)
      setTimeout(() => {
        const currentUserLocation = useMapStore.getState().userLocation;
        if (import.meta.env.MODE === 'development') {
          console.log('🔍 [Location Button] Current user location from store:', currentUserLocation);
        }
        
        if (currentUserLocation && onCenterChange) {
          if (import.meta.env.MODE === 'development') {
            console.log('🎯 [Location Button] Moving map to:', currentUserLocation);
          }
          // 타임스탬프를 추가하여 항상 새로운 객체로 만들어 React의 참조 동등성 검사를 우회
          onCenterChange({
            ...currentUserLocation,
            _forceUpdate: Date.now()
          });
        } else {
          if (import.meta.env.MODE === 'development') {
            console.log('❌ [Location Button] Cannot move map - missing location or callback');
          }
        }
      }, 100);
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.error('❌ [Location Button] 위치 가져오기 실패:', error);
      }
    }
  }, [getCurrentLocation, errors.location, clearAllErrors, onCenterChange]);

  return (
    <LocationButton
      onClick={handleLocationClick}
      isLoading={loading.location}
      error={errors.location}
    />
  );
};
