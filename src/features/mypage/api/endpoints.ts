const MYPAGE = '/user';

export const MYPAGE_ENDPOINTS = {
  MYPAGE: {
    ROOT: MYPAGE,
    USER_INFO: MYPAGE,
    UPDATE_USER: MYPAGE,
    UPLOAD_PROFILE_IMAGE: `${MYPAGE}/profile-image`,
    BOOKMARK_LIST: `${MYPAGE}/bookmark`,
    ADD_BOOKMARK: `${MYPAGE}/bookmark`,
    DELETE_BOOKMARK: (id: number) => `${MYPAGE}/bookmark/${id}`,
    BOOKMARK_MAP: `${MYPAGE}/bookmark/map`,
    ACTIVITY: `${MYPAGE}/activity`,
    // MSW용 엔드포인트
    USER_INFO_MSW: MYPAGE,
    UPDATE_USER_MSW: MYPAGE,
    UPLOAD_PROFILE_IMAGE_MSW: `${MYPAGE}/profile-image`,
    BOOKMARK_LIST_MSW: `${MYPAGE}/bookmark`,
    ADD_BOOKMARK_MSW: `${MYPAGE}/bookmark`,
    DELETE_BOOKMARK_MSW: (id: number | string = ':id') => `${MYPAGE}/bookmark/${id}`,
    BOOKMARK_MAP_MSW: `${MYPAGE}/bookmark/map`,
    ACTIVITY_MSW: `${MYPAGE}/activity`,
  },
}; 