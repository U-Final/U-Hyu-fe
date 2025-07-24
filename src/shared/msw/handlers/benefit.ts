import { BENEFIT_ENDPOINTS } from '@benefit/api/endpoints';
import { MOCK_ALL_BRANDS, MOCK_BRAND_DETAILS } from '@benefit/api/mockData';
import type { BenefitType, BrandListRes, StoreType } from '@benefit/api/types';
import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

export const benefitHandlers = [
  // 제휴처 목록 조회 MSW 핸들러
  http.get(BENEFIT_ENDPOINTS.BENEFIT.ROOT, ({ request }) => {
    const url = new URL(request.url);
    const shouldFail = false;

    if (shouldFail) {
      //실패 시
      return createErrorResponse('에러처리.', 400);
    } else {
      // 성공 시
      // query 파라미터 파싱
      const page = Number(url.searchParams.get('page') ?? '0');
      const size = Number(url.searchParams.get('size') ?? '10');
      const category = url.searchParams.get('category');
      const brandName = url.searchParams
        .get('brand_name')
        ?.toLowerCase()
        .trim();
      const storeType = url.searchParams.get('storeType');
      const benefitType = url.searchParams.get('benefitType');

      // 초기 브랜드 리스트 전체 복사
      let filtered = [...MOCK_ALL_BRANDS];

      // category 필터링
      if (category && category !== 'all') {
        filtered = filtered.filter(b => b.category === category);
      }

      // brandName (검색어) 필터링
      if (brandName) {
        filtered = filtered.filter(
          b =>
            b.brandName.toLowerCase().includes(brandName) ||
            (b.description?.toLowerCase().includes(brandName) ?? false)
        );
      }

      // storeType 필터링
      if (storeType) {
        filtered = filtered.filter(b =>
          b.storeTypes.includes(storeType as StoreType)
        );
      }

      // benefitType 필터링
      if (benefitType && ['DISCOUNT', 'GIFT'].includes(benefitType)) {
        filtered = filtered.filter(b =>
          b.benefitTypes.includes(benefitType as BenefitType)
        );
      }

      // 페이지네이션 처리
      const totalCount = filtered.length;
      const totalPages = Math.ceil(totalCount / size);
      const paginated = filtered.slice(page * size, (page + 1) * size);
      const hasNext = page + 1 < totalPages;

      // 응답 생성
      const result: BrandListRes = {
        brandList: paginated,
        currentPage: page,
        totalPages,
        hasNext,
      };

      return createResponse(result, '제휴처 리스트 목록 api 성공');
    }
  }),

  // 제휴처 정보 상세 조회 MSW 핸들러
  http.get(BENEFIT_ENDPOINTS.BENEFIT.DETAIL_MSW(), ({ params }) => {
    const { brandId } = params;

    const brand = MOCK_BRAND_DETAILS.find(b => b.brandId === Number(brandId));
    const shouldFail = false;
    if (shouldFail) {
      //임시 에러메시지
      return createErrorResponse('에러메시지', 404);
    }

    if (!brand) {
      return createErrorResponse('에러메시지', 404);
    }
    return createResponse(brand, '성공');
  }),
];
