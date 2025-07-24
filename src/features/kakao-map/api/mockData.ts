import type { CategoryBrand, CategoryBrandsResponse, StoreDetail, StoreSummary } from './types';

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

// 목데이터: 카테고리별 브랜드 목록
export const MOCK_CATEGORY_BRANDS: Record<number, CategoryBrand[]> = {
  1: [
    { brandId: 1, brandName: '스타벅스' },
    { brandId: 2, brandName: '투썸플레이스' },
    { brandId: 3, brandName: '이디야커피' },
    { brandId: 4, brandName: '커피빈' },
  ],
  2: [
    { brandId: 5, brandName: 'GS25' },
    { brandId: 6, brandName: 'CU' },
    { brandId: 7, brandName: '세븐일레븐' },
    { brandId: 8, brandName: '이마트24' },
  ],
  3: [
    { brandId: 9, brandName: '맥도날드' },
    { brandId: 10, brandName: 'KFC' },
    { brandId: 11, brandName: '버거킹' },
    { brandId: 12, brandName: '롯데리아' },
  ],
  4: [
    { brandId: 13, brandName: '올리브영' },
    { brandId: 14, brandName: '왓슨스' },
    { brandId: 15, brandName: 'LOHBS' },
  ],
  5: [
    { brandId: 16, brandName: '파리바게뜨' },
    { brandId: 17, brandName: '뚜레쥬르' },
    { brandId: 18, brandName: '삼립' },
  ],
  6: [
    { brandId: 19, brandName: 'CGV' },
    { brandId: 20, brandName: '롯데시네마' },
    { brandId: 21, brandName: '메가박스' },
  ],
  7: [
    { brandId: 22, brandName: '이마트' },
    { brandId: 23, brandName: '홈플러스' },
    { brandId: 24, brandName: '롯데마트' },
  ],
  8: [
    { brandId: 25, brandName: '피트니스클럽' },
    { brandId: 26, brandName: '헬스장' },
    { brandId: 27, brandName: '필라테스' },
  ],
  9: [
    { brandId: 28, brandName: '약국' },
    { brandId: 29, brandName: '온누리약국' },
    { brandId: 30, brandName: '부민약국' },
  ],
};

// 목데이터 응답 헬퍼 함수: 카테고리별 브랜드 목록
export const createMockCategoryBrandsResponse = (categoryId: number): CategoryBrandsResponse => {
  const brands = MOCK_CATEGORY_BRANDS[categoryId] || [];
  
  return {
    data: brands,
    message: brands.length > 0 ? '카테고리별 브랜드 목록을 성공적으로 조회했습니다.' : '해당 카테고리에 브랜드가 없습니다.',
    statusCode: brands.length > 0 ? 0 : 404,
  };
};
