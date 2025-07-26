/**
 * My Map 목록 조회 응답
 */
export interface MyMapListRes {
  myMapListId: number;
  title: string;
  markerColor: string;
  uuid: string;
}

/**
 * My Map 추가 요청
 */
export interface MyMapStoreAddReq {
  title: string;
  markerColor: string;
  uuid: string;
}

/**
 * My Map 추가 응답
 */
export interface MyMapStoreAddRes {
  myMapListId: number;
}

/**
 * My Map 수정 요청
 */
export interface MyMapListUpdateReq {
  myMapListId: number;
  title: string;
  markerColor: string;
}

/**
 * My Map 수정 응답
 */
export interface MyMapListUpdateRes {
  myMapListId: number;
}

/**
 * My Map 삭제 요청
 */
export interface MyMapListDeleteParams {
  myMapListId: number;
}

/**
 * My Map 삭제 응답
 */
export interface MyMapListDeleteRes {
  Resultcode: number;
}

/**
 * My Map 매장 추가/삭제 요청
 */
export interface MyMapToggleStoreParams {
  myMapListId: number;
  store_id: number;
}

/**
 * My Map 매장 추가/삭제 응답
 */
export interface MyMapToggleStoreRes {
  myMapListId: number;
  storeId: number;
  isMyMapped: boolean;
}

/**
 * My Map 매장 등록 유무 조회 요청
 */
export interface StoreBookmarkStatusParams {
  store_id: number;
}

/**
 * My Map 매장 등록 유무 조회 응답
 */
export interface StoreBookmarkStatusRes {
  storeName: string;
  bookmarkedMyMapLists: MyMapListInfo[];
  isBookmarked: boolean;
}

export interface MyMapListInfo {
  myMapListId: number;
  markerColor: string;
  title: string;
  isMyMapped: boolean;
}

/**
 * My Map 지도 조회 (UUID 기반) 요청
 */
export interface MymapUuidParams {
  uuid: string;
}

/**
 * My Map 지도 조회 (UUID 기반) 요청
 */
export type MymapUuidRes = {
  markerColor: string;
  title: string;
  myMapListId: number;
  uuid: string;
  storeList: Store[];
  isMine: boolean;
};

export type Store = {
  storeId: number;
  storeName: string;
  categoryName: string;
  addressDetail: string;
  benefit: string | null;
  logo_image: string;
  brandName: string;
  latitude: number;
  longitude: number;
};
