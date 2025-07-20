import { ApiErrorResponse } from '@/shared/client/ApiErrorResponse';
import axios, { type AxiosInstance } from 'axios';

const IS_MOCKING = import.meta.env.VITE_USE_MSW === 'true';

const API_CONFIG = {
  BASE_URL: IS_MOCKING ? '' : import.meta.env.VITE_API_URL, // ✅ 여기서 빈 문자열이면 상대경로!
  TIMEOUT: 10000,
} as const;

// 인증이 필요하지 않은 요청용 클라이언트
export const client: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

client.interceptors.response.use(
  response => response, // 정상 응답은 그대로
  error => {
    if (error.response?.data?.code !== undefined) {
      // 서버 응답이 있는 경우 (code, message 등 포함)
      throw new ApiErrorResponse(error.response.data);
    }

    // 네트워크 오류 또는 서버가 응답하지 않는 경우
    return Promise.reject(error);
  }
);

// 인증이 필요한 요청용 클라이언트 (쿠키 자동 포함)
export const authClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
