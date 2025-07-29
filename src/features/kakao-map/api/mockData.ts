import type { ApiResponse } from '@/shared/client/client.type';

import type {
  CategoryBrand,
  CategoryBrandsResponse,
  StoreDetail,
  StoreSummary,
  ToggleFavoriteResponse,
} from './types';

// 목데이터: 주변 매장 목록 (실제 카테고리 및 브랜드 기반)
export const MOCK_STORES: StoreSummary[] = [
  // 영화/미디어 (culture)
  {
    storeId: 1,
    storeName: 'CGV 강남점',
    categoryName: 'culture',
    addressDetail: '서울 강남구 강남대로 123',
    benefit: 'CGV 골드클래스 할인',
    logo_image: '/images/brands/CGV.png',
    brandName: 'CGV',
    latitude: 37.54699,
    longitude: 127.09598,
  },
  {
    storeId: 2,
    storeName: '롯데시네마 강남역점',
    categoryName: 'culture',
    addressDetail: '서울 강남구 강남대로 456',
    benefit: '롯데시네마 포인트 적립',
    logo_image: '/images/brands/롯데시네마.png',
    brandName: '롯데시네마',
    latitude: 37.5475,
    longitude: 127.0965,
  },
  {
    storeId: 3,
    storeName: '메가박스 강남대로점',
    categoryName: 'culture',
    addressDetail: '서울 강남구 강남대로 789',
    benefit: '메가박스 멤버십 할인',
    logo_image: '/images/brands/메가박스.png',
    brandName: '메가박스',
    latitude: 37.548,
    longitude: 127.097,
  },

  // 액티비티 (activity)
  {
    storeId: 4,
    storeName: '스카이라인 루지 강남점',
    categoryName: 'activity',
    addressDetail: '서울 강남구 강남대로 101',
    benefit: '루지 체험 할인권',
    logo_image: '/images/brands/스카이라인루지.png',
    brandName: '스카이라인 루지',
    latitude: 37.5485,
    longitude: 127.0975,
  },
  {
    storeId: 5,
    storeName: '클룩 강남센터',
    categoryName: 'activity',
    addressDetail: '서울 강남구 강남대로 202',
    benefit: '액티비티 예약 할인',
    logo_image: '/images/brands/클룩.png',
    brandName: '클룩',
    latitude: 37.549,
    longitude: 127.098,
  },
  {
    storeId: 6,
    storeName: '부산 엑스 더 스카이 서울점',
    categoryName: 'activity',
    addressDetail: '서울 강남구 강남대로 303',
    benefit: '전망대 입장 할인',
    logo_image: '/images/brands/부산엑스더스카이.png',
    brandName: '부산 엑스 더 스카이',
    latitude: 37.5495,
    longitude: 127.0985,
  },

  // 뷰티/클리닉 (beauty)
  {
    storeId: 7,
    storeName: '오가나셀 피부과 의원 청담점',
    categoryName: 'beauty',
    addressDetail: '서울 강남구 청담동 404',
    benefit: '피부관리 프로그램 할인',
    logo_image: '/images/brands/오가나셀.png',
    brandName: '오가나셀 피부과 의원 청담점',
    latitude: 37.55,
    longitude: 127.099,
  },
  {
    storeId: 8,
    storeName: '데이원클리닉 강남점',
    categoryName: 'beauty',
    addressDetail: '서울 강남구 강남대로 505',
    benefit: '미용 시술 할인',
    logo_image: '/images/brands/데이원클리닉.png',
    brandName: '데이원클리닉',
    latitude: 37.5505,
    longitude: 127.0995,
  },
  {
    storeId: 9,
    storeName: '포쉬네일 강남점',
    categoryName: 'beauty',
    addressDetail: '서울 강남구 강남대로 606',
    benefit: '네일아트 서비스 할인',
    logo_image: '/images/brands/포쉬네일.png',
    brandName: '포쉬네일',
    latitude: 37.551,
    longitude: 127.1,
  },

  // 건강/영양제 (pharmacy)
  {
    storeId: 10,
    storeName: '동아제약 디몰 강남점',
    categoryName: 'pharmacy',
    addressDetail: '서울 강남구 강남대로 707',
    benefit: '건강기능식품 할인',
    logo_image: '/images/brands/동아제약.png',
    brandName: '동아제약 디몰',
    latitude: 37.5515,
    longitude: 127.1005,
  },
  {
    storeId: 11,
    storeName: 'LG생활건강샵 U+패밀리샵 강남점',
    categoryName: 'pharmacy',
    addressDetail: '서울 강남구 강남대로 808',
    benefit: 'LG생활건강 제품 할인',
    logo_image: '/images/brands/LG생활건강.png',
    brandName: 'LG생활건강샵 U+패밀리샵',
    latitude: 37.552,
    longitude: 127.101,
  },
  {
    storeId: 12,
    storeName: '필리 강남점',
    categoryName: 'pharmacy',
    addressDetail: '서울 강남구 강남대로 909',
    benefit: '영양제 정기구독 할인',
    logo_image: '/images/brands/필리.png',
    brandName: '필리',
    latitude: 37.5525,
    longitude: 127.1015,
  },

  // 생활/편의 (lifestyle)
  {
    storeId: 13,
    storeName: 'GS25 강남점',
    categoryName: 'lifestyle',
    addressDetail: '서울 강남구 강남대로 1010',
    benefit: 'GS&POINT 적립',
    logo_image: '/images/brands/GS25.png',
    brandName: 'GS25',
    latitude: 37.553,
    longitude: 127.102,
  },
  {
    storeId: 14,
    storeName: '펫생각 강남점',
    categoryName: 'lifestyle',
    addressDetail: '서울 강남구 강남대로 1111',
    benefit: '반려동물 용품 할인',
    logo_image: '/images/brands/펫생각.png',
    brandName: '펫생각',
    latitude: 37.5535,
    longitude: 127.1025,
  },
  {
    storeId: 15,
    storeName: '셸로 강남점',
    categoryName: 'lifestyle',
    addressDetail: '서울 강남구 강남대로 1212',
    benefit: '생활용품 할인',
    logo_image: '/images/brands/셸로.png',
    brandName: '셸로',
    latitude: 37.554,
    longitude: 127.103,
  },

  // 쇼핑 (shopping)
  {
    storeId: 16,
    storeName: 'GS THE FRESH 강남점',
    categoryName: 'shopping',
    addressDetail: '서울 강남구 강남대로 1313',
    benefit: 'GS THE FRESH 적립',
    logo_image: '/images/brands/GSTHEFRESH.png',
    brandName: 'GS THE FRESH',
    latitude: 37.5545,
    longitude: 127.1035,
  },
  {
    storeId: 17,
    storeName: 'VYVY 강남점',
    categoryName: 'shopping',
    addressDetail: '서울 강남구 강남대로 1414',
    benefit: 'VYVY 멤버십 할인',
    logo_image: '/images/brands/VYVY.png',
    brandName: 'VYVY',
    latitude: 37.555,
    longitude: 127.104,
  },
  {
    storeId: 18,
    storeName: '롯데백화점몰 강남점',
    categoryName: 'shopping',
    addressDetail: '서울 강남구 강남대로 1515',
    benefit: '롯데백화점 포인트 적립',
    logo_image: '/images/brands/롯데백화점.png',
    brandName: '롯데백화점몰',
    latitude: 37.5555,
    longitude: 127.1045,
  },

  // 음식점 (food)
  {
    storeId: 19,
    storeName: 'VIPS 강남점',
    categoryName: 'food',
    addressDetail: '서울 강남구 강남대로 1616',
    benefit: 'VIPS 멤버십 할인',
    logo_image: '/images/brands/VIPS.png',
    brandName: 'VIPS',
    latitude: 37.556,
    longitude: 127.105,
  },
  {
    storeId: 20,
    storeName: '더플레이스 강남점',
    categoryName: 'food',
    addressDetail: '서울 강남구 강남대로 1717',
    benefit: '디너코스 할인',
    logo_image: '/images/brands/더플레이스.png',
    brandName: '더플레이스',
    latitude: 37.5565,
    longitude: 127.1055,
  },
  {
    storeId: 21,
    storeName: '제일제면소 강남점',
    categoryName: 'food',
    addressDetail: '서울 강남구 강남대로 1818',
    benefit: '면요리 할인',
    logo_image: '/images/brands/제일제면소.png',
    brandName: '제일제면소',
    latitude: 37.557,
    longitude: 127.106,
  },

  // 베이커리/디저트 (bakery)
  {
    storeId: 22,
    storeName: '파리바게뜨 강남점',
    categoryName: 'bakery',
    addressDetail: '서울 강남구 강남대로 1919',
    benefit: '파리바게뜨 포인트 적립',
    logo_image: '/images/brands/파리바게뜨.png',
    brandName: '파리바게뜨',
    latitude: 37.5575,
    longitude: 127.1065,
  },
  {
    storeId: 23,
    storeName: '뚜레쥬르 강남점',
    categoryName: 'bakery',
    addressDetail: '서울 강남구 강남대로 2020',
    benefit: '뚜레쥬르 멤버십 할인',
    logo_image: '/images/brands/뚜레쥬르.png',
    brandName: '뚜레쥬르',
    latitude: 37.558,
    longitude: 127.107,
  },
  {
    storeId: 24,
    storeName: '베스킨라빈스 강남점',
    categoryName: 'bakery',
    addressDetail: '서울 강남구 강남대로 2121',
    benefit: '아이스크림 할인',
    logo_image: '/images/brands/베스킨라빈스.png',
    brandName: '베스킨라빈스',
    latitude: 37.5585,
    longitude: 127.1075,
  },
];

// 목데이터: 매장 상세 정보 (실제 카테고리 및 브랜드 기반)
export const MOCK_STORE_DETAILS: Record<number, StoreDetail> = {
  1: {
    storeName: 'CGV 강남점',
    isFavorite: false,
    favoriteCount: 245,
    benefits: 'CGV 골드클래스 할인, VIP 라운지 이용',
    usageLimit: '월 3회',
    usageMethod: 'CGV 앱에서 예매 시 자동 적용',
  },
  2: {
    storeName: '롯데시네마 강남역점',
    isFavorite: true,
    favoriteCount: 189,
    benefits: '롯데시네마 포인트 적립, 팝콘세트 할인',
    usageLimit: '월 2회 사용 가능',
    usageMethod: '온라인 예매 시 할인코드 입력',
  },
  3: {
    storeName: '메가박스 강남대로점',
    isFavorite: true,
    favoriteCount: 312,
    benefits: '메가박스 멤버십 할인, 컬렉션북 증정',
    usageLimit: '월 4회',
    usageMethod: '메가박스 앱 또는 현장 키오스크',
  },
  4: {
    storeName: '스카이라인 루지 강남점',
    isFavorite: false,
    favoriteCount: 78,
    benefits: '루지 체험 할인권, 그룹 할인',
    usageLimit: '1일 2회 사용 가능',
    usageMethod: '현장 방문 시 쿠폰 제시',
  },
  5: {
    storeName: '클룩 강남센터',
    isFavorite: true,
    favoriteCount: 156,
    benefits: '액티비티 예약 할인, 클룩 크레딧 적립',
    usageLimit: '월 제한 없음',
    usageMethod: '클룩 앱에서 예약 시 자동 적용',
  },
  6: {
    storeName: '부산 엑스 더 스카이 서울점',
    isFavorite: false,
    favoriteCount: 203,
    benefits: '전망대 입장 할인, 기념품샵 할인',
    usageLimit: '월 2회',
    usageMethod: '현장 매표소에서 할인코드 제시',
  },
  7: {
    storeName: '오가나셀 피부과 의원 청담점',
    isFavorite: false,
    favoriteCount: 89,
    benefits: '피부관리 프로그램 할인, 무료 상담',
    usageLimit: '월 1회',
    usageMethod: '전화 예약 시 할인 코드 제시',
  },
  8: {
    storeName: '데이원클리닉 강남점',
    isFavorite: true,
    favoriteCount: 134,
    benefits: '미용 시술 할인, 애프터케어 서비스',
    usageLimit: '월 2회',
    usageMethod: '온라인 예약 시 할인 적용',
  },
  9: {
    storeName: '포쉬네일 강남점',
    isFavorite: false,
    favoriteCount: 67,
    benefits: '네일아트 서비스 할인, 젤네일 무료 리터치',
    usageLimit: '월 3회',
    usageMethod: '매장 방문 시 멤버십 카드 제시',
  },
  10: {
    storeName: '동아제약 디몰 강남점',
    isFavorite: false,
    favoriteCount: 45,
    benefits: '건강기능식품 할인, 무료 건강상담',
    usageLimit: '월 제한 없음',
    usageMethod: '온라인 또는 매장에서 할인코드 사용',
  },
  11: {
    storeName: 'LG생활건강샵 U+패밀리샵 강남점',
    isFavorite: true,
    favoriteCount: 123,
    benefits: 'LG생활건강 제품 할인, 포인트 적립',
    usageLimit: '월 제한 없음',
    usageMethod: 'U+ 가족 회원 혜택 자동 적용',
  },
  12: {
    storeName: '필리 강남점',
    isFavorite: false,
    favoriteCount: 89,
    benefits: '영양제 정기구독 할인, 무료 영양상담',
    usageLimit: '월 1회',
    usageMethod: '필리 앱에서 구독 시 할인 적용',
  },
  13: {
    storeName: 'GS25 강남점',
    isFavorite: false,
    favoriteCount: 234,
    benefits: 'GS&POINT 적립, 생필품 할인',
    usageLimit: '제한 없음',
    usageMethod: 'GS&POINT 카드 제시',
  },
  14: {
    storeName: '펫생각 강남점',
    isFavorite: true,
    favoriteCount: 67,
    benefits: '반려동물 용품 할인, 펫케어 서비스',
    usageLimit: '월 3회',
    usageMethod: '매장 방문 시 멤버십 카드 제시',
  },
  15: {
    storeName: '셸로 강남점',
    isFavorite: false,
    favoriteCount: 145,
    benefits: '생활용품 할인, 대용량 구매 혜택',
    usageLimit: '월 2회',
    usageMethod: '셸로 앱에서 쿠폰 사용',
  },
  16: {
    storeName: 'GS THE FRESH 강남점',
    isFavorite: false,
    favoriteCount: 178,
    benefits: 'GS THE FRESH 적립, 신선식품 할인',
    usageLimit: '월 제한 없음',
    usageMethod: 'GS THE FRESH 카드 제시',
  },
  17: {
    storeName: 'VYVY 강남점',
    isFavorite: true,
    favoriteCount: 92,
    benefits: 'VYVY 멤버십 할인, 독점 상품 우선구매',
    usageLimit: '월 4회',
    usageMethod: 'VYVY 앱에서 멤버십 혜택 적용',
  },
  18: {
    storeName: '롯데백화점몰 강남점',
    isFavorite: false,
    favoriteCount: 267,
    benefits: '롯데백화점 포인트 적립, VIP 라운지 이용',
    usageLimit: '월 제한 없음',
    usageMethod: '롯데 멤버십 카드 제시',
  },
  19: {
    storeName: 'VIPS 강남점',
    isFavorite: true,
    favoriteCount: 345,
    benefits: 'VIPS 멤버십 할인, 생일 특별 혜택',
    usageLimit: '월 2회',
    usageMethod: 'VIPS 앱에서 예약 시 할인 적용',
  },
  20: {
    storeName: '더플레이스 강남점',
    isFavorite: false,
    favoriteCount: 156,
    benefits: '디너코스 할인, 와인 페어링 서비스',
    usageLimit: '월 1회',
    usageMethod: '전화 예약 시 할인 코드 제시',
  },
  21: {
    storeName: '제일제면소 강남점',
    isFavorite: false,
    favoriteCount: 89,
    benefits: '면요리 할인, 사이드 메뉴 무료 제공',
    usageLimit: '월 3회',
    usageMethod: '매장 방문 시 할인 쿠폰 제시',
  },
  22: {
    storeName: '파리바게뜨 강남점',
    isFavorite: true,
    favoriteCount: 203,
    benefits: '파리바게뜨 포인트 적립, 케이크 주문 할인',
    usageLimit: '월 제한 없음',
    usageMethod: '파리바게뜨 앱에서 적립 및 사용',
  },
  23: {
    storeName: '뚜레쥬르 강남점',
    isFavorite: false,
    favoriteCount: 178,
    benefits: '뚜레쥬르 멤버십 할인, 샐러드 무료 업그레이드',
    usageLimit: '월 4회',
    usageMethod: '뚜레쥬르 앱에서 주문 시 할인 적용',
  },
  24: {
    storeName: '베스킨라빈스 강남점',
    isFavorite: false,
    favoriteCount: 234,
    benefits: '아이스크림 할인, BR 포인트 적립',
    usageLimit: '월 제한 없음',
    usageMethod: 'BR 앱에서 쿠폰 사용',
  },
};

// 목데이터: 즐겨찾기 상태 (실제 매장 기반)
export const MOCK_FAVORITES: Record<number, boolean> = {
  2: true, // 롯데시네마 강남역점
  3: true, // 메가박스 강남대로점
  5: true, // 클룩 강남센터
  8: true, // 데이원클리닉 강남점
  11: true, // LG생활건강샵 U+패밀리샵 강남점
  14: true, // 펫생각 강남점
  17: true, // VYVY 강남점
  19: true, // VIPS 강남점
  22: true, // 파리바게뜨 강남점
};

// 목데이터 응답 헬퍼 함수들
export const createMockStoreListResponse = (
  stores: StoreSummary[]
): ApiResponse<StoreSummary[]> => ({
  data: stores,
  message: '주변 매장 목록을 성공적으로 조회했습니다.',
  statusCode: 200,
});

export const createMockStoreDetailResponse = (
  storeId: number
): ApiResponse<StoreDetail> => {
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

export const createMockToggleFavoriteResponse = (
  storeId: number
): ApiResponse<ToggleFavoriteResponse> => {
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

// 목데이터: 카테고리별 브랜드 목록 (매장이 있는 카테고리만)
export const MOCK_CATEGORY_BRANDS: Record<number, CategoryBrand[]> = {
  2: [
    // 영화/미디어
    { brandId: 1, brandName: 'CGV' },
    { brandId: 2, brandName: '롯데시네마' },
    { brandId: 3, brandName: '메가박스' },
  ],
  3: [
    // 워터파크/아쿠아리움
    { brandId: 4, brandName: '아쿠아필드' },
    { brandId: 5, brandName: '스파랜드' },
    { brandId: 6, brandName: '클럽디 오아시스' },
  ],
  4: [
    // 액티비티
    { brandId: 7, brandName: '스카이라인 루지' },
    { brandId: 8, brandName: '클룩' },
    { brandId: 9, brandName: '부산 엑스 더 스카이' },
  ],
  5: [
    // 뷰티(피부과, 클리닉)
    { brandId: 10, brandName: '오가나셀 피부과 의원 청담점' },
    { brandId: 11, brandName: '데이원클리닉' },
    { brandId: 12, brandName: '포쉬네일' },
  ],
  6: [
    // 건강(제약, 영양제 등)
    { brandId: 13, brandName: '동아제약 디몰' },
    { brandId: 14, brandName: 'LG생활건강샵 U+패밀리샵' },
    { brandId: 15, brandName: '필리' },
  ],
  7: [
    // 생활/편의
    { brandId: 16, brandName: 'GS25' },
    { brandId: 17, brandName: '펫생각' },
    { brandId: 18, brandName: '셸로' },
  ],
  8: [
    // 쇼핑
    { brandId: 19, brandName: 'GS THE FRESH' },
    { brandId: 20, brandName: 'VYVY' },
    { brandId: 21, brandName: '롯데백화점몰' },
  ],
  9: [
    // 음식점
    { brandId: 22, brandName: 'VIPS' },
    { brandId: 23, brandName: '더플레이스' },
    { brandId: 24, brandName: '제일제면소' },
  ],
  10: [
    // 베이커리/디저트
    { brandId: 25, brandName: '파리바게트' },
    { brandId: 26, brandName: '뚜레쥬르' },
    { brandId: 27, brandName: '베스킨라빈스' },
  ],
  11: [
    // 테마파크
    { brandId: 31, brandName: '뽀로로파크' },
    { brandId: 32, brandName: '아르떼 키즈파크 제주' },
    { brandId: 33, brandName: '원더빌리지' },
  ],
  12: [
    // 공연/전시
    { brandId: 34, brandName: '빛의 벙커' },
    { brandId: 35, brandName: '빛의 시어터' },
    { brandId: 36, brandName: '그라운드시소' },
  ],
  13: [
    // 교육
    { brandId: 37, brandName: '젠지' },
    { brandId: 38, brandName: '월스트리트 잉글리시' },
    { brandId: 39, brandName: 'DBR동아비즈니스리뷰' },
  ],
  14: [
    // 여행/교통
    { brandId: 40, brandName: 'SK렌터카' },
    { brandId: 41, brandName: '야놀자글로벌 해외 숙박' },
    { brandId: 42, brandName: '티웨이항공' },
  ],
};

// 목데이터 응답 헬퍼 함수: 카테고리별 브랜드 목록
export const createMockCategoryBrandsResponse = (
  categoryId: number
): CategoryBrandsResponse => {
  const brands = MOCK_CATEGORY_BRANDS[categoryId] || [];

  return {
    data: brands,
    message:
      brands.length > 0
        ? '카테고리별 브랜드 목록을 성공적으로 조회했습니다.'
        : '해당 카테고리에 브랜드가 없습니다.',
    statusCode: brands.length > 0 ? 200 : 404,
  };
};
