import type {
  MyMapListRes,
  MyMapToggleStoreRes,
  MymapUuidRes,
  StoreBookmarkStatusRes,
} from './types';

/**
 * 목데이터: mymap 목록 조회
 */
export const MOCK_MYMAP_LIST: MyMapListRes[] = [
  {
    myMapListId: 1,
    title: 'test1',
    markerColor: 'PURPLE',
    uuid: 'fff50aaf-b367-4ca7-bffa-601302892117',
  },
  {
    myMapListId: 2,
    title: 'test2',
    markerColor: 'ORANGE',
    uuid: '3c1e80ba-5e1e-4a42-8d7c-1c4d8dbf03b5',
  },
  {
    myMapListId: 3,
    title: 'test2',
    markerColor: 'RED',
    uuid: '3f7a2e6e-2b4a-4f41-9f79-96fc3e1d2d9b',
  },
  {
    myMapListId: 4,
    title: 'test4',
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
  markerColor: 'PURPLE',
  title: 'test1',
  myMapListId: 34,
  uuid: 'fff50aaf-b367-4ca7-bffa-601302892117',
  storeList: [
    {
      storeId: 821,
      storeName: '파리크라상 삼성역점',
      categoryName: '베이커리/디저트',
      addressDetail: '서울 강남구 테헤란로 528 슈페리어타워 1층',
      benefit: '제공',
      logoImage:
        'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%91%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8F%E1%85%B3%E1%84%85%E1%85%A1%E1%84%89%E1%85%A1%E1%86%BC.png',
      brandName: '파리크라상',
      latitude: 37.5080952698916,
      longitude: 127.062000046367,
    },
    {
      storeId: 5519,
      storeName: '베스킨라빈스 대치점',
      categoryName: '베이커리/디저트',
      addressDetail: '서울 강남구 선릉로 402',
      benefit: '제공',
      logoImage:
        'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%87%E1%85%A6%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B5%E1%86%AB%E1%84%85%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3.png',
      brandName: '베스킨라빈스',
      latitude: 37.5007996814053,
      longitude: 127.051008258871,
    },
    {
      storeId: 5520,
      storeName: '베스킨라빈스 대치2호점',
      categoryName: '베이커리/디저트',
      addressDetail: '선릉로64길 5',
      benefit: '제공',
      logoImage:
        'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%87%E1%85%A6%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B5%E1%86%AB%E1%84%85%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3.png',
      brandName: '베스킨라빈스',
      latitude: 37.4978067335334,
      longitude: 127.052619059885,
    },
  ],
  isMine: true,
};
