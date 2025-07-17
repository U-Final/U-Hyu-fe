import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export interface UserInfo {
  profileImage: string;
  nickname: string;
  updatedAt: string;
  grade: 'VVIP' | 'VIP' | '우수';
  name: string;
  gender: 'MALE' | 'FEMALE';
  age: number;
  email: string;
}
export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const { data } = await axios.get<UserInfo>('/user');
    return data;
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error);
    throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
      }
};

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};
