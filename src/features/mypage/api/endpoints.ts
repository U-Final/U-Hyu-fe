export const MYPAGE_ENDPOINTS = {
  USER_INFO: '/user',
  UPDATE_USER: '/user',
  UPLOAD_PROFILE_IMAGE: '/user/profile-image',
  BOOKMARK_LIST: '/user/bookmark',
  ADD_BOOKMARK: '/user/bookmark',
  DELETE_BOOKMARK: (id: number) => `/user/bookmark/${id}`,
  BOOKMARK_MAP: '/user/bookmark/map',
  ACTIVITY: '/user/activity',
}; 