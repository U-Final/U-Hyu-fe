import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@mypage/api/mypageApi';
import type { UserInfo } from '@mypage/api/types';

export const useUserInfoQuery = () => {
  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });
};
