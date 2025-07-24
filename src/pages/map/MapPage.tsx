import useKakaoLoader from '@kakao-map/hooks/useKakaoLoader';
import { MapUIProvider } from '@kakao-map/context/MapUIContext';
import { MapContainer } from '@kakao-map/components/MapContainer';
import { MapControlsContainer } from '@kakao-map/components/MapControlsContainer';
import { LocationControlContainer } from '@kakao-map/components/location/LocationControlContainer';
import { BottomSheetContainer } from '@kakao-map/components/BottomSheetContainer';

/**
 * 카카오 맵과 관련된 리소스를 로드하고, 지도 및 UI 컨트롤, 위치 제어, 하단 시트가 포함된 전체 지도 페이지를 렌더링합니다.
 *
 * 지도 UI 상태를 제공하는 컨텍스트로 하위 컴포넌트들을 감쌉니다.
 *
 * @returns 지도와 관련된 UI가 포함된 React 요소
 */
function MapPage() {
  useKakaoLoader();

  return (
    <MapUIProvider>
      <div className="h-screen relative">
        <div className="absolute inset-0">
          <MapContainer />
          <MapControlsContainer />
          <LocationControlContainer />
        </div>
        <BottomSheetContainer />
      </div>
    </MapUIProvider>
  );
}

export default MapPage;
