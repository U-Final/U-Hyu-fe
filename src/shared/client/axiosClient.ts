import axios, { type AxiosInstance } from 'axios';

const IS_MOCKING = import.meta.env.VITE_USE_MSW === 'true';

const API_CONFIG = {
  BASE_URL: IS_MOCKING ? '' : import.meta.env.VITE_API_URL, // ✅ 여기서 빈 문자열이면 상대경로!
  TIMEOUT: 10000,
} as const;

// 공통 응답 인터셉터
const responseInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    response => response,
    error => {
      const res = error.response;

      if (res?.data?.statusCode && res?.data?.message) {
        return Promise.reject({
          statusCode: res.data.statusCode,
          message: res.data.message,
        });
      }

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
