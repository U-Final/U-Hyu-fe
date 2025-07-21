import { HttpResponse, http } from 'msw';

import {
  MOCK_STORES,
  createMockStoreDetailResponse,
  createMockStoreListResponse,
  createMockToggleFavoriteResponse,
} from '@/features/kakao-map/api/mockData';
import type {
  StoreDetailResponse,
  StoreListResponse,
  ToggleFavoriteResponseType,
} from '@/features/kakao-map/api/types';

/**
 * 지도 관련 API의 MSW 핸들러들
 * 개발 환경에서 백엔드 API를 시뮬레이션
 */
export const mapHandlers = [
  /**
   * 주변 매장 목록 조회 API 핸들러
   * GET /map/stores - 필터 파라미터 처리 포함
   */
  http.get('*/map/stores', ({ request }) => {
    const url = new URL(request.url);

    // 필수 파라미터 추출
    const lat = Number(url.searchParams.get('lat'));
    const lng = Number(url.searchParams.get('lng'));
    const radius = Number(url.searchParams.get('radius'));

    // 필터 파라미터 추출
    const category = url.searchParams.get('category');
    const brand = url.searchParams.get('brand');
    const search = url.searchParams.get('search');

    // 기본 파라미터 유효성 검증
    if (isNaN(lat) || isNaN(lng) || isNaN(radius) || radius <= 0) {
      return HttpResponse.json(
        {
          status: 400,
          message:
            '잘못된 요청 파라미터입니다. lat, lng, radius는 유효한 숫자여야 하며, radius는 0보다 커야 합니다.',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    // 1단계: 반경 내 매장 필터링 (위치 기반)
    let filteredStores = MOCK_STORES.filter(store => {
      const distance =
        Math.sqrt(
          Math.pow(store.latitude - lat, 2) + Math.pow(store.longitude - lng, 2)
        ) * 111000; // 대략적인 미터 단위 변환 (1도 ≈ 111km)

      return distance <= radius;
    });

    // 2단계: 카테고리 필터 적용
    if (category && category !== 'all') {
      filteredStores = filteredStores.filter(store => {
        // 백엔드에서 처리할 카테고리 매핑 로직
        // 단순 매핑
        if (store.categoryName === category) {
          return true;
        }

        // 복합 카테고리 매핑 (프론트엔드 카테고리가 여러 백엔드 카테고리를 포함)
        if (category === 'convenience') {
          return store.categoryName === 'convenience';
        }
        if (category === 'restaurant') {
          return ['restaurant', 'fastfood', 'bakery'].includes(
            store.categoryName
          );
        }
        if (category === 'culture') {
          return ['culture', 'cafe'].includes(store.categoryName);
        }

        return false;
      });
    }

    // 3단계: 브랜드 필터 적용
    if (brand && brand.trim() !== '') {
      const brandTerm = brand.toLowerCase().trim();
      filteredStores = filteredStores.filter(store =>
        store.brandName.toLowerCase().includes(brandTerm)
      );
    }

    // 4단계: 검색어 필터 적용 (매장명, 브랜드명, 주소에서 검색)
    if (search && search.trim() !== '') {
      const searchTerm = search.toLowerCase().trim();
      filteredStores = filteredStores.filter(
        store =>
          store.storeName.toLowerCase().includes(searchTerm) ||
          store.brandName.toLowerCase().includes(searchTerm) ||
          store.addressDetail.toLowerCase().includes(searchTerm)
      );
    }

    // 개발 환경에서 디버깅 정보 출력
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 MSW Store Filter Applied:', {
        originalQuery: {
          lat,
          lng,
          radius,
          category,
          brand,
          search,
        },
        filteringSteps: {
          totalStores: MOCK_STORES.length,
          afterRadiusFilter: MOCK_STORES.filter(store => {
            const distance =
              Math.sqrt(
                Math.pow(store.latitude - lat, 2) +
                  Math.pow(store.longitude - lng, 2)
              ) * 111000;
            return distance <= radius;
          }).length,
          afterCategoryFilter: category ? 'applied' : 'skipped',
          afterBrandFilter: brand ? 'applied' : 'skipped',
          afterSearchFilter: search ? 'applied' : 'skipped',
          finalCount: filteredStores.length,
        },
        appliedFilters: { category, brand, search },
      });
    }

    // 성공 응답 반환
    const response: StoreListResponse =
      createMockStoreListResponse(filteredStores);
    return HttpResponse.json(response, { status: 200 });
  }),

  /**
   * 매장 상세 정보 조회 API 핸들러
   * GET /map/stores/:storeId
   */
  http.get('*/map/stores/:storeId', ({ params }) => {
    const storeId = Number(params.storeId);

    // storeId 파라미터 유효성 검증
    if (isNaN(storeId) || storeId <= 0) {
      return HttpResponse.json(
        {
          status: 400,
          message:
            '잘못된 매장 ID입니다. storeId는 유효한 양의 정수여야 합니다.',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    try {
      const response: StoreDetailResponse =
        createMockStoreDetailResponse(storeId);
      return HttpResponse.json(response, { status: 200 });
    } catch {
      return HttpResponse.json({
        status: 404,
        message: '매장을 찾을 수 없습니다.',
        data: null,
      });
    }
  }),

  /**
   * 매장 즐겨찾기 토글 API 핸들러
   * POST /map/stores/:storeId/favorite
   */
  http.post('*/map/stores/:storeId/favorite', ({ params }) => {
    const storeId = Number(params.storeId);

    // storeId 파라미터 유효성 검증
    if (isNaN(storeId) || storeId <= 0) {
      return HttpResponse.json(
        {
          status: 400,
          message:
            '잘못된 매장 ID입니다. storeId는 유효한 양의 정수여야 합니다.',
          data: null,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const response: ToggleFavoriteResponseType =
      createMockToggleFavoriteResponse(storeId);
    return HttpResponse.json(response, { status: 200 });
  }),
];
