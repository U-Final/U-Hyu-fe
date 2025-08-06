import { userStore } from '@user/store/userStore';
import axios, { type AxiosInstance } from 'axios';
import { toast } from 'sonner';

const IS_MOCKING = import.meta.env.VITE_USE_MSW === 'true';

const API_CONFIG = {
  BASE_URL: IS_MOCKING ? '' : import.meta.env.VITE_API_URL,
  TIMEOUT: 10000,
} as const;

// 공통 응답 인터셉터
const responseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    response => response,
    error => {
      const res = error.response;

      // ✅ 1. 인증 관련 에러 처리 (401, 403)
      if (res?.status === 401 || res?.status === 403) {
        userStore.getState().clearUser();

        if (res?.status === 401) {
          toast.error('로그인이 만료되었습니다. 다시 로그인해주세요.');
        } else if (res?.status === 403) {
          // 403은 조용히 처리 (토스트 없음)
          if (import.meta.env.DEV) {
            console.log('🔐 권한 없음 - 비로그인 상태로 처리');
          }
        }

        return Promise.reject({
          statusCode: res?.status,
          message:
            res?.status === 401 ? '인증이 만료되었습니다.' : '권한이 없습니다.',
        });
      }

      // ✅ 2. 서버에서 내려준 에러 응답 처리
      if (res?.data?.statusCode && res?.data?.message) {
        toast.error(res.data.message);
        return Promise.reject({
          statusCode: res.data.statusCode,
          message: res.data.message,
        });
      }

      // ✅ 3. 예외 케이스 (네트워크 등)
      toast.error('서버와의 연결에 실패했습니다.');
      return Promise.reject({
        statusCode: 500,
        message: '서버와의 연결에 실패했습니다.',
      });
    }
  );
};

export const client: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
responseInterceptor(client);
