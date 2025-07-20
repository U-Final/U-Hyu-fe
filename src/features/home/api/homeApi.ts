// axios 요청 함수 모음
import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';
import { HOME_ENDPOINTS } from '@home/api/endpoints';

export interface NearbyStore {
  store_name: string;
  addr_detail: string;
  description: string;
  logo_image?: string;        // 선택적으로 이미지 추가
  latitude?: number;
  longitude?: number;
  isFavorite?: boolean;
}

export interface Benefit {
  benefit_type: 'DISCOUNT' | 'GIFT';
  description: string;
  logo_image?: string;
}

export interface Recommendation {
  brand_id: number;
  brand_name: string;
  benefit_title: string;
  description: string;
  logo_image: string;
  tags: string[];
}

export interface UserInfo {
  user_name: string;
  grade: string;
}

// ✅ 1. 유저 정보
export const fetchUserInfo = async (): Promise<UserInfo> => {
  const res = await client.get<ApiResponse<UserInfo>>(HOME_ENDPOINTS.HOME.USER_INFO);
  
  if (!res.data.result) {
    throw new Error('🚨 유저 정보가 존재하지 않습니다');
  }

  return res.data.result;
};



// // ✅ 2. 주변 매장
export const fetchNearbyStores = async (): Promise<NearbyStore[]> => {
  const res = await client.get<ApiResponse<NearbyStore[]>>(HOME_ENDPOINTS.HOME.NEARBY_STORES);
  
  if (!res.data.result) {
    throw new Error('주변 매장 정보가 없습니다.');
  }
  
  return res.data.result;

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

  if (!res.data.result) {
    throw new Error('혜택 정보가 존재하지 않습니다');
  }
  
  return res.data.result;
};
