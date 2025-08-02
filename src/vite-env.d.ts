/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_KAKAO_LOGIN_URL: string;
  readonly VITE_KAKAO_JS_KEY: string;
  readonly VITE_MAP_INITIAL_LNG: string;
  readonly VITE_MAP_INITIAL_LAT: string;
  readonly VITE_USE_MSW: string;
  readonly VITE_DEFAULT_RADIUS: string;
  readonly VITE_SEARCH_DISTANCE_THRESHOLD: string;
  readonly VITE_SEARCH_DEBOUNCE_DELAY: string;
  readonly VITE_KAKAO_REST_API_KEY: string;
  readonly VITE_KAKAO_JAVASCRIPT_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Kakao: any;
}
