// axios 요청 함수 모음
import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';
import { HOME_ENDPOINTS } from '@home/api/endpoints';
import type { Benefit, NearbyStore, UserInfo } from '@home/api/home.types';

// ✅ 1. 유저 정보
export const fetchUserInfo = async (): Promise<UserInfo> => {
  const res = await client.get<ApiResponse<UserInfo>>(HOME_ENDPOINTS.HOME.USER_INFO);

  return res.data.data!;
};

// ✅ 2. 주변 매장
export const fetchNearbyStores = async (): Promise<NearbyStore[]> => {
  const res = await client.get<ApiResponse<NearbyStore[]>>(HOME_ENDPOINTS.HOME.NEARBY_STORES);
  
  return res.data.data!;

};

// ✅ 3. 추천 리스트 (브랜드 ID 또는 grade 기반)
// export const fetchRecommendations = async (params: { brandId?: number; grade?: string }): Promise<Recommendation[]> => {
//   const res = await client.get<ApiResponse<Recommendation[]>>(HOME_ENDPOINTS.HOME.RECOMMENDATIONS, {
//     params,
//   });
//   return res.data.result;
// };

// ✅ 4. 멤버십 혜택
export const fetchBenefits = async (grade: string): Promise<Benefit[]> => {
  const res = await client.get<ApiResponse<Benefit[]>>(HOME_ENDPOINTS.HOME.BENEFITS, {
    params: { grade },
  });
  
  return res.data.data!;
};
