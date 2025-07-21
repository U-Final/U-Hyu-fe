import { useQuery } from '@tanstack/react-query';
import { fetchUserInfo } from '@features/mypage/api/mypageApi';
import type { UserInfo } from '@features/mypage/api/types';

export const useUserInfoQuery = () => {
  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
  });
};
