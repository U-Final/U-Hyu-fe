export const MYPAGE_ROOT = '/user';

export const MYPAGE_ENDPOINTS = {
  USER_INFO: `${MYPAGE_ROOT}`,
  UPDATE_USER: `${MYPAGE_ROOT}`,
  BOOKMARK_LIST: `${MYPAGE_ROOT}/bookmark`,
  BOOKMARK_DETAIL: (id: number | string = ':bookmarkId') => `${MYPAGE_ROOT}/bookmark/${id}`,
  STATISTICS: `${MYPAGE_ROOT}/statistics`,
}; 