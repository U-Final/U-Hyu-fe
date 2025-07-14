import { useQuery } from '@tanstack/react-query';
import { userApi } from '@user/api/userApi';
import type { UserInfo } from '@user/api/types';

export const useUserInfoQuery = () => {
  return useQuery<UserInfo>({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await userApi.getUserInfo();
      return response.data;
    },
  });
};
