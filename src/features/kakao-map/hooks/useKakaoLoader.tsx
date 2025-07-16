import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

/**
 * Initializes the Kakao Maps JavaScript SDK loader with the app key and required libraries.
 *
 * Loads the Kakao Maps SDK using the app key from the environment and includes the 'clusterer', 'drawing', and 'services' libraries for extended map functionality.
 */
export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    /**
     * ※주의※ appkey의 경우 본인의 appkey를 사용하셔야 합니다.
     * 해당 키는 docs를 위해 발급된 키 이므로, 임의로 사용하셔서는 안됩니다.
     *
     * @참고 https://apis.map.kakao.com/web/guide/
     */
    appkey: import.meta.env.VITE_KAKAO_JS_KEY!,
    libraries: ['clusterer', 'drawing', 'services'],
  });
}
