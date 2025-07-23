export const USER_ENDPOINTS = {
  EXTRA_INFO: '/user/extra-info',
  GET_USER_INFO: '/user', // 실제 API 엔드포인트에 맞게 수정
  UPDATE_USER_INFO: '/user',
  CHECK_EMAIL: '/user/check-email',
  LOGOUT: '/auth/logout',
} as const;
