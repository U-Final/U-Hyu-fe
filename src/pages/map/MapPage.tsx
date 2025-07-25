import { useRef } from 'react';

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
  const bottomSheetRef = useRef<MapDragBottomSheetRef>(null);

  // 초기화를 제거 - 바텀시트는 닫힌 상태로 시작
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('🌟 MapPage에서 바텀시트 초기화 호출');
  //     bottomSheetRef.current?.initialize();
  //   }, 200); // 컴포넌트들이 완전히 마운트된 후 호출

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <MapUIProvider>
      <div className="h-screen relative">
        <div className="absolute inset-0">
          <MapContainer bottomSheetRef={bottomSheetRef} />
          <MapControlsContainer bottomSheetRef={bottomSheetRef} />
          <LocationControlContainer />
        </div>

        <BottomSheetContainer ref={bottomSheetRef} />
      </div>
    </MapUIProvider>
  );
}

export default MapPage;
