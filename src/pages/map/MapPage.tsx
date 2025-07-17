import useKakaoLoader from '@features/kakao-map/hooks/useKakaoLoader';
import { MapProvider } from '@features/kakao-map/context/MapContext';
import { MapContainer } from '@features/kakao-map/components/MapContainer';
import { MapControlsContainer } from '@features/kakao-map/components/MapControlsContainer';
import { LocationControlContainer } from '@features/kakao-map/components/location/LocationControlContainer';
import { BottomSheetContainer } from '@features/kakao-map/components/BottomSheetContainer';

/**
 * 카카오 맵 로더를 초기화하고, 지도와 관련된 UI 및 컨트롤을 포함하는 전체 맵 페이지를 렌더링합니다.
 *
 * 지도 영역과 하단 시트 UI를 포함하며, 맵 상태 관리를 위해 MapProvider 컨텍스트를 사용합니다.
 *
 * @returns 맵과 관련된 UI가 포함된 React 요소
 */
function MapPage() {
  useKakaoLoader();

  return (
    <MapProvider>
      <div className="h-screen flex flex-col">
        <div className="flex-1 relative">
          <MapContainer />
          <MapControlsContainer />
          <LocationControlContainer />
        </div>
        <BottomSheetContainer />
      </div>
    </MapProvider>
  );
}

export default MapPage;
