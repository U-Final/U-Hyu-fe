import { Map as KakaoMapComponent } from 'react-kakao-maps-sdk';
import useKakaoLoader from './hooks/useKakaoLoader';

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
