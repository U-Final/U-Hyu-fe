import type { StoreDetail, StoreSummary } from './types';

// 목데이터: 주변 매장 목록
export const MOCK_STORES: StoreSummary[] = [
  {
    storeId: 1,
    storeName: '스타벅스 강남점',
    categoryName: 'cafe',
    addressDetail: '서울 강남구 강남대로 123',
    benefit: '카드 결제 시 5% 할인',
    logo_image: '/images/brands/스타벅스.png',
    brandName: '스타벅스',
    latitude: 37.54699,
    longitude: 127.09598,
  },
  {
    storeId: 2,
    storeName: '투썸플레이스 강남역점',
    categoryName: 'cafe',
    addressDetail: '서울 강남구 강남대로 456',
    benefit: '모바일 주문 시 10% 할인',
    logo_image: '/images/brands/투썸플레이스.png',
    brandName: '투썸플레이스',
    latitude: 37.5475,
    longitude: 127.0965,
  },
  {
    storeId: 3,
    storeName: 'GS25 강남점',
    categoryName: 'convenience',
    addressDetail: '서울 강남구 강남대로 789',
    benefit: 'GS&POINT 적립',
    logo_image: '/images/brands/GS25.png',
    brandName: 'GS25',
    latitude: 37.548,
    longitude: 127.097,
  },
  {
    storeId: 4,
    storeName: '올리브영 강남점',
    categoryName: 'beauty',
    addressDetail: '서울 강남구 강남대로 101',
    benefit: '올리브영 포인트 적립',
    logo_image: '/images/brands/올리브영.png',
    brandName: '올리브영',
    latitude: 37.5485,
    longitude: 127.0975,
  },
  {
    storeId: 5,
    storeName: '맥도날드 강남점',
    categoryName: 'fastfood',
    addressDetail: '서울 강남구 강남대로 202',
    benefit: '모바일 앱 주문 시 15% 할인',
    logo_image: '/images/brands/맥도날드.png',
    brandName: '맥도날드',
    latitude: 37.549,
    longitude: 127.098,
  },
  {
    storeId: 6,
    storeName: '파리바게뜨 강남점',
    categoryName: 'bakery',
    addressDetail: '서울 강남구 강남대로 303',
    benefit: '파리바게뜨 포인트 적립',
    logo_image: '/images/brands/파리바게뜨.png',
    brandName: '파리바게뜨',
    latitude: 37.5495,
    longitude: 127.0985,
  },
  {
    storeId: 7,
    storeName: 'CGV 강남점',
    categoryName: 'culture',
    addressDetail: '서울 강남구 강남대로 404',
    benefit: 'CGV 멤버십 포인트 적립',
    logo_image: '/images/brands/CGV.png',
    brandName: 'CGV',
    latitude: 37.55,
    longitude: 127.099,
  },
  {
    storeId: 8,
    storeName: '이마트 강남점',
    categoryName: 'shopping',
    addressDetail: '서울 강남구 강남대로 505',
    benefit: '이마트 포인트 적립',
    logo_image: '/images/brands/이마트.png',
    brandName: '이마트',
    latitude: 37.5505,
    longitude: 127.0995,
  },
  {
    storeId: 9,
    storeName: '피트니스클럽 강남점',
    categoryName: 'activity',
    addressDetail: '서울 강남구 강남대로 606',
    benefit: '신규 회원 1개월 무료',
    logo_image: '/images/brands/default-brand-logo.png',
    brandName: '피트니스클럽',
    latitude: 37.551,
    longitude: 127.1,
  },
  {
    storeId: 10,
    storeName: '약국 강남점',
    categoryName: 'pharmacy',
    addressDetail: '서울 강남구 강남대로 707',
    benefit: '처방약 10% 할인',
    logo_image: '/images/brands/default-brand-logo.png',
    brandName: '약국',
    latitude: 37.5515,
    longitude: 127.1005,
  },
];

// 목데이터: 매장 상세 정보
export const MOCK_STORE_DETAILS: Record<number, StoreDetail> = {
  1: {
    storeName: 'CGV 동대문',
    isFavorite: true,
    favoriteCount: 1,
    benefits: '3천원 할인',
    usageLimit: '월 1회',
    usageMethod: '키오스크 어쩌구',
  },
  2: {
    storeName: '투썸플레이스 강남역점',
    isFavorite: true,
    favoriteCount: 89,
    benefits: '모바일 주문 시 10% 할인, 투썸 포인트 적립',
    usageLimit: '1일 2회 사용 가능',
    usageMethod: '모바일 앱에서 주문 시 자동 적용',
  },
  3: {
    storeName: 'GS25 강남점',
    isFavorite: false,
    favoriteCount: 67,
    benefits: 'GS&POINT 적립, 특정 상품 할인',
    usageLimit: '제한 없음',
    usageMethod: 'GS&POINT 카드 제시',
  },
  4: {
    storeName: '올리브영 강남점',
    isFavorite: false,
    favoriteCount: 234,
    benefits: '올리브영 포인트 적립, 멤버십 혜택',
    usageLimit: '1일 3회 사용 가능',
    usageMethod: '올리브영 멤버십 카드 제시',
  },
  5: {
    storeName: '맥도날드 강남점',
    isFavorite: true,
    favoriteCount: 156,
    benefits: '모바일 앱 주문 시 15% 할인, 맥도날드 포인트 적립',
    usageLimit: '1일 1회 사용 가능',
    usageMethod: '모바일 앱에서 쿠폰 사용',
  },
  6: {
    storeName: '파리바게뜨 강남점',
    isFavorite: false,
    favoriteCount: 156,
    benefits: '모바일 앱 주문 시 15% 할인, 맥도날드 포인트 적립',
    usageLimit: '1일 1회 사용 가능',
    usageMethod: '모바일 앱에서 쿠폰 사용',
  },
  7: {
    storeName: 'CGV 강남점',
    isFavorite: false,
    favoriteCount: 156,
    benefits: '모바일 앱 주문 시 15% 할인, 맥도날드 포인트 적립',
    usageLimit: '1일 1회 사용 가능',
    usageMethod: '모바일 앱에서 쿠폰 사용',
  },
  8: {
    storeName: '이마트 강남점',
    isFavorite: false,
    favoriteCount: 156,
    benefits: '모바일 앱 주문 시 15% 할인, 맥도날드 포인트 적립',
    usageLimit: '1일 1회 사용 가능',
    usageMethod: '모바일 앱에서 쿠폰 사용',
  },
  9: {
    storeName: '피트니스클럽 강남점',
    isFavorite: false,
    favoriteCount: 156,
    benefits: '모바일 앱 주문 시 15% 할인, 맥도날드 포인트 적립',
    usageLimit: '1일 1회 사용 가능',
    usageMethod: '모바일 앱에서 쿠폰 사용',
  },
  10: {
    storeName: '약국 강남점',
    isFavorite: false,
    favoriteCount: 156,
    benefits: '모바일 앱 주문 시 15% 할인, 맥도날드 포인트 적립',
    usageLimit: '1일 1회 사용 가능',
    usageMethod: '모바일 앱에서 쿠폰 사용',
  },
};

// 목데이터: 즐겨찾기 상태
export const MOCK_FAVORITES: Record<number, boolean> = {
  2: true, // 투썸플레이스
  5: true, // 맥도날드
};

// 목데이터 응답 헬퍼 함수들
export const createMockStoreListResponse = (stores: StoreSummary[]) => ({
  data: stores,
  message: '주변 매장 목록을 성공적으로 조회했습니다.',
  statusCode: 200,
});

export const createMockStoreDetailResponse = (storeId: number) => {
  const storeDetail = MOCK_STORE_DETAILS[storeId];
  if (!storeDetail) {
    throw new Error(`Store with ID ${storeId} not found`);
  }

  return {
    data: storeDetail,
    message: '매장 상세 정보를 성공적으로 조회했습니다.',
    statusCode: 200,
  };
};

export const createMockToggleFavoriteResponse = (storeId: number) => {
  const currentStatus = MOCK_FAVORITES[storeId] || false;
  const newStatus = !currentStatus;

  if (newStatus) {
    MOCK_FAVORITES[storeId] = true;
  } else {
    delete MOCK_FAVORITES[storeId];
  }

  if (MOCK_STORE_DETAILS[storeId]) {
    MOCK_STORE_DETAILS[storeId].isFavorite = newStatus;
  }

  return {
    data: {
      storeId,
      isBookmarked: newStatus,
    },
    message: '즐겨찾기가 성공적으로 업데이트되었습니다.',
    statusCode: 200,
  };
};
