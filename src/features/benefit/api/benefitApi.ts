import { BENEFIT_ENDPOINTS } from '@benefit/api/endpoints';
import type { BrandDetailRes, BrandListParams, BrandListRes } from '@benefit/api/types';



import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';





// 제휴처 목록 페이지 api
export const getBrandList = async (
  params?: BrandListParams
): Promise<BrandListRes> => {
  const res = await client.get<ApiResponse<BrandListRes>>(
    BENEFIT_ENDPOINTS.BENEFIT.ROOT,
    { params }
  );

  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }
  return res.data.data;
};

// 제휴처 정보 상세 조회 api
export const getBrandDetail = async (brandId: number): Promise<BrandDetailRes> => {
  const res = await client.get<ApiResponse<BrandDetailRes>>(
    BENEFIT_ENDPOINTS.BENEFIT.DETAIL(brandId)
  );

  if (!res.data.data) {
    throw new Error('Invalid API response: missing data');
  }

  return res.data.data;
};