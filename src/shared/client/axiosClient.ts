import axios, { type AxiosInstance } from 'axios';

const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
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

// 인증이 필요한 요청용 클라이언트 (쿠키 자동 포함)
export const authClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
