import type { MyMapListRes, MyMapToggleStoreRes, MymapUuidRes, StoreBookmarkStatusRes } from './types';

/**
 * 목데이터: mymap 목록 조회
 */
export const MOCK_MYMAP_LIST: MyMapListRes[] = [
  {
    myMapListId: 3,
    title: 'test1',
    markerColor: 'RED',
    uuid: '3f7a2e6e-2b4a-4f41-9f79-96fc3e1d2d9b',
  },
  {
    myMapListId: 4,
    title: 'test2',
    markerColor: 'GREEN',
    uuid: 'a2e8b12f-9381-4dbf-b792-1b1a7c8c0dbf',
  },
];

/**
 * 목데이터: mymap 매장 추가/삭제
 */
export const MOCK_MYMAP_TOGGLE: MyMapToggleStoreRes[] = [
  {
    myMapListId: 1,
    storeId: 1,
    isMyMapped: true,
  },
  {
    myMapListId: 2,
    storeId: 1,
    isMyMapped: false,
  },
  {
    myMapListId: 3,
    storeId: 1,
    isMyMapped: false,
  },
];

/**
 * 목데이터: mymap 매장 등록 유무 조회
 */
export const MOCK_STORE_BOOKMARK_STATUS: StoreBookmarkStatusRes = {
  storeName: '강남역 스타벅스',
  isBookmarked: true,
  bookmarkedMyMapLists: [
    {
      myMapListId: 1,
      markerColor: 'GREEN',
      title: '카페 탐방 코스',
      isMyMapped: true,
    },
    {
      myMapListId: 2,
      markerColor: 'RED',
      title: '데이트 장소',
      isMyMapped: false,
    },
    {
      myMapListId: 3,
      markerColor: 'ORANGE',
      title: '강남 맛집 투어',
      isMyMapped: false,
    },
  ],
};

/**
 * 목데이터: My Map 지도 조회 (UUID 기반)
 */
export const MOCK_MYMAP_DATA_BY_UUID: MymapUuidRes = {
  markerColor: 'RED',
  title: '프론트테스트',
  myMapListId: 2,
  uuid: 'd9f8a4b2-7c35-489f-b74e-7f91f1e6f4a9',
  isMine: true,
  storeList: [
    {
      storeId: 1,
      storeName: 'CGV 동대문',
      categoryName: '영화/미디어',
      addressDetail: '서울특별시 중구 장충단로13길 20',
      benefit: null,
      logo_image: 'cgv_logo.png',
      brandName: 'CGV',
      latitude: 37.5687346,
      longitude: 127.0076665,
    },
    {
      storeId: 2,
      storeName: '메가박스 강남',
      categoryName: '영화/미디어',
      addressDetail: '서울 강남구 강남대로 438',
      benefit: '팝콘 무료',
      logo_image: 'megabox_logo.png',
      brandName: '메가박스',
      latitude: 37.5012743,
      longitude: 127.039585,
    },
    {
      storeId: 3,
      storeName: '스타벅스 종각점',
      categoryName: '카페/디저트',
      addressDetail: '서울 종로구 종로 64',
      benefit: '아메리카노 1+1',
      logo_image: 'starbucks_logo.png',
      brandName: '스타벅스',
      latitude: 37.570377,
      longitude: 126.983079,
    },
    {
      storeId: 4,
      storeName: '이디야 커피 신촌점',
      categoryName: '카페/디저트',
      addressDetail: '서울 서대문구 연세로 12',
      benefit: null,
      logo_image: 'ediya_logo.png',
      brandName: '이디야',
      latitude: 37.556057,
      longitude: 126.938426,
    },
    {
      storeId: 5,
      storeName: '교촌치킨 홍대점',
      categoryName: '치킨/야식',
      addressDetail: '서울 마포구 홍익로5안길 24',
      benefit: '사이다 무료',
      logo_image: 'kyochon_logo.png',
      brandName: '교촌치킨',
      latitude: 37.556332,
      longitude: 126.924806,
    },
  ],
};