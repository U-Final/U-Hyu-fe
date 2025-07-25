import type {
  MyMapListRes,
  MyMapToggleStoreRes,
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
    uuid: '9f5c2377-e67c-4c2e-b948-daeecb4ec63f',
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
