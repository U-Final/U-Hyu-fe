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
 * 카카오 키워드 검색 API 호출 (실제 REST API 사용)
 */
export const searchKeyword = async (
  keyword: string,
  options?: KakaoKeywordSearchOptions
): Promise<{
  places: NormalizedPlace[];
  meta: KakaoKeywordSearchResponse['meta'];
  pagination: KakaoPagination | null;
}> => {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  
  if (!KAKAO_REST_API_KEY) {
    throw new Error('카카오 REST API 키가 설정되지 않았습니다.');
  }

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
    params.append('radius', Math.min(Math.max(options.radius, 0), 20000).toString());
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
    params.append('sort', options.sort === 'DISTANCE' ? 'distance' : 'accuracy');
  }

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`카카오 API 요청 실패: ${response.status} ${response.statusText}`);
    }

    const data: KakaoKeywordSearchResponse = await response.json();
    const normalizedPlaces = data.documents.map(normalizeKakaoPlace);

    // 페이지네이션 정보 구성
    const pagination: KakaoPagination | null = data.meta.total_count > 0 ? {
      totalCount: data.meta.total_count,
      hasNextPage: !data.meta.is_end,
      hasPrevPage: (options?.page || 1) > 1,
      current: options?.page || 1,
      gotoPage: () => {},
      gotoFirst: () => {},
      gotoLast: () => {},
      nextPage: () => {},
      prevPage: () => {},
    } : null;

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
export const searchKeywordByLocation = (
  keyword: string,
  center: { lat: number; lng: number },
  radius: number = 5000
) => {
  return searchKeyword(keyword, {
    location: center,
    radius,
    sort: 'DISTANCE',
    size: 15,
  });
};

/**
 * 현재 지도 영역 기준으로 키워드 검색
 */
export const searchKeywordByBounds = (
  keyword: string,
  bounds: {
    sw: { lat: number; lng: number };
    ne: { lat: number; lng: number };
  }
) => {
  return searchKeyword(keyword, {
    bounds,
    sort: 'ACCURACY',
    size: 15,
  });
};

/**
 * 카테고리별 키워드 검색
 */
export const searchKeywordByCategory = (
  keyword: string,
  categoryCode: string,
  center?: { lat: number; lng: number },
  radius: number = 5000
) => {
  return searchKeyword(keyword, {
    category_group_code: categoryCode,
    location: center,
    radius,
    sort: center ? 'DISTANCE' : 'ACCURACY',
    size: 15,
  });
};