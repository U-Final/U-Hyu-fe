import { useQuery } from '@tanstack/react-query';
import { userApi } from '@user/api/userApi';
import type { GetUserInfoResponse } from '@user/api/types';

export const useUserInfoQuery = () => {
  return useQuery<GetUserInfoResponse>({
    queryKey: ['userInfo'],
    queryFn: userApi.getUserInfo,
  });
};
