import useKakaoLoader from '@features/kakao-map/hooks/useKakaoLoader';
import { MapUIProvider } from '@features/kakao-map/context/MapUIContext';
import { MapContainer } from '@features/kakao-map/components/MapContainer';
import { MapControlsContainer } from '@features/kakao-map/components/MapControlsContainer';
import { LocationControlContainer } from '@features/kakao-map/components/location/LocationControlContainer';
import { BottomSheetContainer } from '@features/kakao-map/components/BottomSheetContainer';

function MapPage() {
  useKakaoLoader();

  return (
    <MapUIProvider>
      <div className="h-screen flex flex-col">
        <div className="flex-1 relative">
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
