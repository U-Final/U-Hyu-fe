import axios, { AxiosError, type AxiosResponse } from 'axios';
import { useUserStore } from '@shared/store/userStore';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// 쿠키에서 토큰 가져오는 유틸리티 함수
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

// 기본 설정
const baseConfig = {
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, // 쿠키 자동 포함
  headers: {
    'Content-Type': 'application/json',
  },
};

// 인터셉터 없는 인스턴스 (로그인, 회원가입 등)
export const client = axios.create(baseConfig);

// 인터셉터 있는 인스턴스 (인증 필요한 요청)
export const authClient = axios.create(baseConfig);

// 토큰 갱신 중복 방지
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 요청 인터셉터
authClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
authClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { config, response } = error;

    if (response?.status === 401 && config && !config._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(authClient(config));
          });
        });
      }

      config._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getCookie('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await client.post('/auth/refresh', {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // 스토어 업데이트
        useUserStore.getState().updateTokens(accessToken, newRefreshToken);

        // 대기 중인 요청들 처리
        onTokenRefreshed(accessToken);

        // 원래 요청 재시도
        config.headers.Authorization = `Bearer ${accessToken}`;
        return authClient(config);
      } catch (refreshError) {
        // 리프레시 실패 시 로그아웃
        useUserStore.getState().removeCredentials();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
