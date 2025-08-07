import { client } from '@/shared/client';
import type { ApiResponse } from '@/shared/client/client.type';
import { HOME_ENDPOINTS } from '@home/api/endpoints';
import type { Benefit, NearbyStore, UserInfo } from '@home/api/home.types';

export const fetchUserInfo = async (): Promise<UserInfo> => {
  const res = await client.get<ApiResponse<UserInfo>>(HOME_ENDPOINTS.HOME.USER_INFO);

  return res.data.data!;
};

export const fetchNearbyStores = async (): Promise<NearbyStore[]> => {
  const res = await client.get<ApiResponse<NearbyStore[]>>(HOME_ENDPOINTS.HOME.NEARBY_STORES);
  
  return res.data.data!;

};

export const fetchBenefits = async (grade: string): Promise<Benefit[]> => {
  const res = await client.get<ApiResponse<Benefit[]>>(HOME_ENDPOINTS.HOME.BENEFITS, {
    params: { grade },
  });
  
  return res.data.data!;
};
