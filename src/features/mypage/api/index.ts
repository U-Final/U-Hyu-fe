import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export interface UserInfo {
  profileImage: string;
  nickname: string;
  updatedAt: string;
  grade: 'VVIP' | 'VIP' | '우수';
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const { data } = await axios.get<UserInfo>('/user');
  return data;
};

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};
