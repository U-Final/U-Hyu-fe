import { Map as KakaoMapComponent } from 'react-kakao-maps-sdk';
import useKakaoLoader from './hooks/useKakaoLoader';

/**
 * Renders a Kakao map centered at a fixed location with a predefined zoom level.
 *
 * The map is displayed with full width and a height of 350 pixels, centered at latitude 33.450701 and longitude 126.570667.
 */
function KakaoMap() {
  useKakaoLoader();

  return (
    <KakaoMapComponent
      id="map"
      center={{
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        width: '100%',
        height: '350px',
      }}
      level={3}
    />
  );
}

export default KakaoMap;
