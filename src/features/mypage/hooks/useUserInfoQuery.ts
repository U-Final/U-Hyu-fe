import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@mypage/api/mypageApi';
import type { UserInfoData } from '@mypage/api/types';

export const useUserInfoQuery = () => {
  return useQuery<UserInfoData>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });
};
