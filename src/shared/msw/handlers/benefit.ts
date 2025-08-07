import { BENEFIT_ENDPOINTS } from '@benefit/api/endpoints';
import { MOCK_ALL_BRANDS, MOCK_BRAND_DETAILS } from '@benefit/api/mockData';
import type { BenefitType, BrandListRes, StoreType } from '@benefit/api/types';
import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

export const benefitHandlers = [
  http.get(BENEFIT_ENDPOINTS.BENEFIT.ROOT, ({ request }) => {
    const url = new URL(request.url);
    const shouldFail = false;

    if (shouldFail) {
      return createErrorResponse('에러처리.', 400);
    } else {
      const page = Number(url.searchParams.get('page') ?? '0');
      const size = Number(url.searchParams.get('size') ?? '10');
      const category = url.searchParams.get('category');
      const brandName = url.searchParams
        .get('brand_name')
        ?.toLowerCase()
        .trim();
      const storeType = url.searchParams.get('storeType');
      const benefitType = url.searchParams.get('benefitType');

      let filtered = [...MOCK_ALL_BRANDS];

      if (category && category !== 'all') {
        filtered = filtered.filter(b => b.category === category);
      }

      if (brandName) {
        filtered = filtered.filter(
          b =>
            b.brandName.toLowerCase().includes(brandName) ||
            (b.description?.toLowerCase().includes(brandName) ?? false)
        );
      }

      if (storeType) {
        filtered = filtered.filter(b =>
          b.storeTypes.includes(storeType as StoreType)
        );
      }

      if (benefitType && ['DISCOUNT', 'GIFT'].includes(benefitType)) {
        filtered = filtered.filter(b =>
          b.benefitTypes.includes(benefitType as BenefitType)
        );
      }

      const totalCount = filtered.length;
      const totalPages = Math.ceil(totalCount / size);
      const paginated = filtered.slice(page * size, (page + 1) * size);
      const hasNext = page + 1 < totalPages;

      const result: BrandListRes = {
        brandList: paginated,
        currentPage: page,
        totalPages,
        hasNext,
      };

      return createResponse(result, '제휴처 리스트 목록 api 성공');
    }
  }),

  http.get(BENEFIT_ENDPOINTS.BENEFIT.DETAIL_MSW(), ({ params }) => {
    const { brandId } = params;

    const brand = MOCK_BRAND_DETAILS.find(b => b.brandId === Number(brandId));
    const shouldFail = false;
    if (shouldFail) {
      return createErrorResponse('에러메시지', 404);
    }

    if (!brand) {
      return createErrorResponse('에러메시지', 404);
    }
    return createResponse(brand, '성공');
  }),
];
