import { useEffect, useRef } from 'react';

import { BottomSheetContainer } from '@kakao-map/components/BottomSheetContainer';
import { MapContainer } from '@kakao-map/components/MapContainer';
import { MapControlsContainer } from '@kakao-map/components/MapControlsContainer';
import type { MapDragBottomSheetRef } from '@kakao-map/components/MapDragBottomSheet';
import { LocationControlContainer } from '@kakao-map/components/location/LocationControlContainer';
import { MapUIProvider } from '@kakao-map/context/MapUIContext';
import useKakaoLoader from '@kakao-map/hooks/useKakaoLoader';

/**
 * 카카오 맵과 관련된 리소스를 로드하고, 지도 및 UI 컨트롤, 위치 제어, 하단 시트가 포함된 전체 지도 페이지를 렌더링합니다.
 *
 * 지도 UI 상태를 제공하는 컨텍스트로 하위 컴포넌트들을 감쌉니다.
 * 거리 기반 재검색 기능이 항상 활성화되어 있습니다.
 *
 * @returns 지도와 관련된 UI가 포함된 React 요소
 */
function MapPage() {
  useKakaoLoader();
  const bottomSheetRef = useRef<MapDragBottomSheetRef>(null); // 바텀시트 제어용 ref

  // 바텀시트 초기화
  useEffect(() => {
    if (bottomSheetRef.current) {
      // 페이지 로드 시 바텀시트 초기화 및 중간 상태로 열기
      bottomSheetRef.current.initialize();

      // 약간의 지연 후 중간 상태로 열기
      setTimeout(() => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.openMiddle();
        }
      }, 300);
    }
  }, []);

  // MapUIProvider 내부 컴포넌트
  const MapContent = () => (
    <div className="h-screen relative">
      <div className="absolute inset-0">
        <MapContainer />
        <MapControlsContainer />
        <LocationControlContainer />
      </div>

      <BottomSheetContainer ref={bottomSheetRef} />
    </div>
  );

  return (
    <MapUIProvider>
      <MapContent />
    </MapUIProvider>
  );
}

export default MapPage;
