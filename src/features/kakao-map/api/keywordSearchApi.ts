import type {
  KakaoKeywordSearchOptions,
  KakaoKeywordSearchResponse,
  KakaoPlace,
  NormalizedPlace,
} from './types';

interface KakaoPagination {
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  current: number;
  gotoPage: (page: number) => void;
  gotoFirst: () => void;
  gotoLast: () => void;
  nextPage: () => void;
  prevPage: () => void;
}

interface KakaoLatLng {
  getLat: () => number;
  getLng: () => number;
}

interface KakaoLatLngBounds {
  extend: (latlng: KakaoLatLng) => void;
}

interface KakaoPlacesService {
  keywordSearch: (
    keyword: string,
    callback: (
      result: KakaoPlace[],
      status: string,
      pagination: KakaoPagination
    ) => void,
    options?: Record<string, unknown>
  ) => void;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        services: {
          Places: new () => KakaoPlacesService;
          Status: {
            OK: string;
            ZERO_RESULT: string;
            ERROR: string;
          };
          SortBy?: {
            ACCURACY: string;
            DISTANCE: string;
          };
        };
        LatLng: new (lat: number, lng: number) => KakaoLatLng;
        LatLngBounds: new () => KakaoLatLngBounds;
      };
    };
  }
}

/**
 * 카카오 장소 검색 결과를 정규화된 형태로 변환
 */
export const normalizeKakaoPlace = (place: KakaoPlace): NormalizedPlace => {
  return {
    id: place.id,
    name: place.place_name,
    category: place.category_name,
    address: place.address_name,
    roadAddress: place.road_address_name,
    phone: place.phone,
    latitude: parseFloat(place.y),
    longitude: parseFloat(place.x),
    distance: place.distance ? parseInt(place.distance) : undefined,
    url: place.place_url,
  };
};

/**
 * 카카오 API 키 유효성 검증
 */
const validateKakaoApiKey = (apiKey: string): boolean => {
  // 카카오 REST API 키는 32자리 16진수 문자열
  const kakaoApiKeyPattern = /^[a-f0-9]{32}$/i;
  return kakaoApiKeyPattern.test(apiKey);
};

/**
 * 카카오 API 인증 헤더 생성
 */
const createKakaoAuthHeaders = (): HeadersInit => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

  if (!KAKAO_REST_API_KEY) {
    throw new Error(
      '카카오 REST API 키가 설정되지 않았습니다. ' +
        '.env 파일에 VITE_KAKAO_REST_API_KEY 환경변수를 설정해주세요.\n' +
        '예시: VITE_KAKAO_REST_API_KEY=53a3872100096cdf985756a17ffb1634'
    );
  }

  if (!validateKakaoApiKey(KAKAO_REST_API_KEY)) {
    throw new Error(
      '카카오 REST API 키 형식이 올바르지 않습니다. ' +
        '32자리 16진수 문자열이어야 합니다.\n' +
        '카카오 개발자센터(https://developers.kakao.com)에서 올바른 REST API 키를 확인해주세요.'
    );
  }



  return {
    Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
    'Content-Type': 'application/json',
  };
};

/**
 * 카카오 키워드 검색 API 호출 (실제 REST API 사용)
 */
export const getKeywordSearch = async (
  keyword: string,
  options?: KakaoKeywordSearchOptions
): Promise<{
  places: NormalizedPlace[];
  meta: KakaoKeywordSearchResponse['meta'];
  pagination: KakaoPagination | null;
}> => {
  if (!keyword.trim()) {
    throw new Error('검색 키워드가 필요합니다.');
  }

  // API 요청 파라미터 구성
  const params = new URLSearchParams();
  params.append('query', keyword.trim());

  if (options?.x !== undefined && options?.y !== undefined) {
    params.append('x', options.x.toString());
    params.append('y', options.y.toString());
  } else if (options?.location) {
    params.append('x', options.location.lng.toString());
    params.append('y', options.location.lat.toString());
  }

  if (options?.radius !== undefined) {
    params.append(
      'radius',
      Math.min(Math.max(options.radius, 0), 20000).toString()
    );
  }

  if (options?.category_group_code) {
    params.append('category_group_code', options.category_group_code);
  }

  if (options?.size !== undefined) {
    params.append('size', Math.min(Math.max(options.size, 1), 15).toString());
  }

  if (options?.page !== undefined) {
    params.append('page', Math.max(options.page, 1).toString());
  }

  if (options?.sort) {
    params.append(
      'sort',
      options.sort === 'DISTANCE' ? 'distance' : 'accuracy'
    );
  }

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?${params.toString()}`;

  try {
    // 카카오 API 전용 인증 헤더 사용
    const headers = createKakaoAuthHeaders();

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `카카오 API 요청 실패: ${response.status} ${response.statusText}${
          errorText ? ` - ${errorText}` : ''
        }`
      );
    }

    const data: KakaoKeywordSearchResponse = await response.json();
    const normalizedPlaces = data.documents.map(normalizeKakaoPlace);

    // 페이지네이션 정보 구성
    const pagination: KakaoPagination | null =
      data.meta.total_count > 0
        ? {
            totalCount: data.meta.total_count,
            hasNextPage: !data.meta.is_end,
            hasPrevPage: (options?.page || 1) > 1,
            current: options?.page || 1,
            gotoPage: () => {},
            gotoFirst: () => {},
            gotoLast: () => {},
            nextPage: () => {},
            prevPage: () => {},
          }
        : null;



    return {
      places: normalizedPlaces,
      meta: data.meta,
      pagination,
    };
  } catch (error) {


    if (error instanceof Error) {
      throw error;
    }
    throw new Error('카카오 키워드 검색 중 알 수 없는 오류가 발생했습니다.');
  }
};

/**
 * 지도 중심 좌표 기준으로 키워드 검색
 */
export const getKeywordSearchByLocation = (
  keyword: string,
  center: { lat: number; lng: number },
  radius: number = 5000
) => {
  return getKeywordSearch(keyword, {
    location: center,
    radius,
    sort: 'DISTANCE',
    size: 15,
  });
};

/**
 * 현재 지도 영역 기준으로 키워드 검색
 */
export const getKeywordSearchByBounds = (
  keyword: string,
  bounds: {
    sw: { lat: number; lng: number };
    ne: { lat: number; lng: number };
  }
) => {
  return getKeywordSearch(keyword, {
    bounds,
    sort: 'ACCURACY',
    size: 15,
  });
};

/**
 * 카테고리별 키워드 검색
 */
export const getKeywordSearchByCategory = (
  keyword: string,
  categoryCode: string,
  center?: { lat: number; lng: number },
  radius: number = 5000
) => {
  return getKeywordSearch(keyword, {
    category_group_code: categoryCode,
    location: center,
    radius,
    sort: center ? 'DISTANCE' : 'ACCURACY',
    size: 15,
  });
};

/**
 * 카카오 API 키 설정 상태 확인
 * 개발 도구나 디버깅용으로 사용
 */
export const getKakaoApiKeyStatus = (): {
  isConfigured: boolean;
  isValid: boolean;
  message: string;
} => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

  if (!KAKAO_REST_API_KEY) {
    return {
      isConfigured: false,
      isValid: false,
      message: 'VITE_KAKAO_REST_API_KEY 환경변수가 설정되지 않았습니다.',
    };
  }

  const isValid = validateKakaoApiKey(KAKAO_REST_API_KEY);

  return {
    isConfigured: true,
    isValid,
    message: isValid
      ? '카카오 API 키가 올바르게 설정되었습니다.'
      : '카카오 API 키 형식이 올바르지 않습니다. (32자리 16진수 문자열이어야 함)',
  };
};
