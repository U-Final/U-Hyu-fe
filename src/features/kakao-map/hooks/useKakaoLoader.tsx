import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

/**
 * Kakao Maps JavaScript SDK를 환경 변수의 앱 키와 추가 라이브러리 옵션으로 초기화하는 커스텀 훅입니다.
 *
 * Kakao Maps SDK를 사용할 수 있도록 앱 키와 함께 'clusterer', 'drawing', 'services' 라이브러리를 로드합니다.
 * 앱 키는 반드시 본인의 Kakao Developers 콘솔에서 발급받은 키를 사용해야 합니다.
 *
 * @see https://apis.map.kakao.com/web/guide/
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
