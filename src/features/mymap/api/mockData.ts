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
    title: '친구들과 액티비티',
    markerColor: 'PURPLE',
    uuid: 'fff50aaf-b367-4ca7-bffa-601302892117',
  },
  {
    myMapListId: 2,
    title: '여름 휴가 코스',
    markerColor: 'ORANGE',
    uuid: '3c1e80ba-5e1e-4a42-8d7c-1c4d8dbf03b5',
  },
  {
    myMapListId: 3,
    title: '주말 데이트 코스',
    markerColor: 'RED',
    uuid: '3f7a2e6e-2b4a-4f41-9f79-96fc3e1d2d9b',
  },
  {
    myMapListId: 4,
    title: '우리 동네 제휴처',
    markerColor: 'GREEN',
    uuid: 'a2e8b12f-9381-4dbf-b792-1b1a7c8c0dbf',
  },
  {
    myMapListId: 5,
    title: '이번주 영화 모임 코스',
    markerColor: 'YELLOW',
    uuid: 'a2e8b12f-9381-4dbf-b792-1b1a7c8c0dbk',
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
      storeId: 11715,
      storeName: '광동상회',
      categoryName: '쇼핑',
      addressDetail: '서울특별시 중구 청계천로 298',
      benefit: '광동상회 제품 10% 할인 * 최대 3천원 할인 삼다수 제외',
      logoImage:
        'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%80%E1%85%AA%E1%86%BC%E1%84%83%E1%85%A9%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC%E1%84%92%E1%85%AC.png',
      brandName: '광동상회',
      latitude: 37.5694538182223,
      longitude: 127.011069634436,
    },
    {
      storeId: 5737,
      storeName: '베스킨라빈스 굿모닝시티점',
      categoryName: '베이커리/디저트',
      addressDetail: '장충단로 247 굿모닝시티 9층',
      benefit: '패밀리 사이즈(5가지 맛) 4천원 할인',
      logoImage:
        'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%87%E1%85%A6%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B5%E1%86%AB%E1%84%85%E1%85%A1%E1%84%87%E1%85%B5%E1%86%AB%E1%84%89%E1%85%B3.png',
      brandName: '베스킨라빈스',
      latitude: 37.5665105619079,
      longitude: 127.007244166035,
    },
    {
      storeId: 11742,
      storeName: '유가네닭갈비 동대문점',
      categoryName: '음식점',
      addressDetail: '서울 중구 을지로43길 9 (을지로6가, 정동빌딩) 지하 1층',
      benefit: '5% 할인 *2만원 이상 주문 시, 최대 4천원',
      logoImage:
        'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%8B%E1%85%B2%E1%84%80%E1%85%A1%E1%84%82%E1%85%A6%E1%84%83%E1%85%A1%E1%86%B0%E1%84%80%E1%85%A1%E1%86%AF%E1%84%87%E1%85%B5.png',
      brandName: '유가네닭갈비',
      latitude: 37.566777288359,
      longitude: 127.006708348049,
    },
    {
      storeId: 10413,
      storeName: '뚜레쥬르 제일제당센터점',
      categoryName: '베이커리/디저트',
      addressDetail: '서울특별시 중구 동호로 330 1층 (쌍림동, CJ제일제당빌딩)',
      benefit: '1천원당 50원 할인',
      logoImage:
        'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%84%E1%85%AE%E1%84%85%E1%85%A6%E1%84%8C%E1%85%B2%E1%84%85%E1%85%B3.png',
      brandName: '뚜레쥬르',
      latitude: 37.5638972,
      longitude: 127.0032734,
    },
  ],
  isMine: true,
};
