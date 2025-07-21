import { Map as KakaoMapComponent } from 'react-kakao-maps-sdk';
import useKakaoLoader from './hooks/useKakaoLoader';

/**
 * Kakao 지도를 지정된 위치와 스타일로 렌더링하는 React 컴포넌트입니다.
 *
 * 카카오 지도 API를 로드한 후, 중심 좌표(위도 33.450701, 경도 126.570667)와 줌 레벨 3으로 지도를 표시합니다. 지도 컨테이너는 가로 100%, 세로 350px로 설정됩니다.
 *
 * @returns Kakao 지도를 포함하는 React 요소
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
    ></KakaoMapComponent>
  );
}

export default KakaoMap;
