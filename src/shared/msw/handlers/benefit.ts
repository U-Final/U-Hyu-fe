import { http } from 'msw';

import { BENEFIT_ENDPOINTS } from '@/features/benefit/api/endpoints';
import { allBrands } from '@/features/benefit/api/mockData';
import type {
  BenefitType,
  BrandListRes,
  StoreType,
} from '@/features/benefit/api/types';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

export const brandHandlers = [
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
      const size = Number(url.searchParams.get('size') ?? '3');
      const category = url.searchParams.get('category');
      const brandName = url.searchParams.get('brandName')?.toLowerCase().trim();
      const storeTypes = url.searchParams.getAll('storeType');
      const benefitTypes = url.searchParams.getAll('benefitType');

      // 초기 브랜드 리스트 전체 복사
      let filtered = [...allBrands];

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
      if (storeTypes.length > 0) {
        filtered = filtered.filter(b =>
          storeTypes.some(st => b.storeTypes.includes(st as StoreType))
        );
      }

      // benefitType 필터링
      if (benefitTypes.length > 0) {
        filtered = filtered.filter(b =>
          benefitTypes.some(bt => b.benefitTypes.includes(bt as BenefitType))
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

      return createResponse(
        result,
        '제휴처 리스트 목록 api 성공'
      );
    }
  }),
];
