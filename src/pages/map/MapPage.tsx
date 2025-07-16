import useKakaoLoader from '@features/kakao-map/hooks/useKakaoLoader';
import { MapProvider } from '@features/kakao-map/context/MapContext';
import { MapContainer } from '@features/kakao-map/components/MapContainer';
import { MapControlsContainer } from '@features/kakao-map/components/MapControlsContainer';
import { LocationControlContainer } from '@features/kakao-map/components/location/LocationControlContainer';
import { BottomSheetContainer } from '@features/kakao-map/components/BottomSheetContainer';

/**
 * Renders the main map page with Kakao map integration, map controls, location controls, and a bottom sheet UI.
 *
 * The component initializes the Kakao map loader, provides map-related context to its children, and arranges the map and related controls in a full viewport layout.
 *
 * @returns The rendered map page component.
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
