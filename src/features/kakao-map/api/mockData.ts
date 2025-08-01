import type { ApiResponse } from '@/shared/client/client.type';

import type {
  CategoryBrand,
  CategoryBrandsResponse,
  GRADE,
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
    categoryName: '문화/여가',
    addressDetail: '서울 강남구 강남대로 123',
    benefit: 'CGV 골드클래스 할인',
    logoImage: '/images/brands/CGV.png',
    brandName: 'CGV',
    latitude: 37.503320984596634,
    longitude: 127.04980263250734,
  },
  {
    storeId: 2,
    storeName: '롯데시네마 강남역점',
    categoryName: '문화/여가',
    addressDetail: '서울 강남구 강남대로 456',
    benefit: '롯데시네마 포인트 적립',
    logoImage: '/images/brands/롯데시네마.png',
    brandName: '롯데시네마',
    latitude: 37.5035,
    longitude: 127.0499,
  },
  {
    storeId: 3,
    storeName: '메가박스 강남대로점',
    categoryName: '문화/여가',
    addressDetail: '서울 강남구 강남대로 789',
    benefit: '메가박스 멤버십 할인',
    logoImage: '/images/brands/메가박스.png',
    brandName: '메가박스',
    latitude: 37.5038,
    longitude: 127.0502,
  },

  // 액티비티 (activity)
  {
    storeId: 4,
    storeName: '스카이라인 루지 강남점',
    categoryName: '액티비티',
    addressDetail: '서울 강남구 강남대로 101',
    benefit: '루지 체험 할인권',
    logoImage: '/images/brands/스카이라인루지.png',
    brandName: '스카이라인 루지',
    latitude: 37.5041,
    longitude: 127.0505,
  },
  {
    storeId: 5,
    storeName: '클룩 강남센터',
    categoryName: '액티비티',
    addressDetail: '서울 강남구 강남대로 202',
    benefit: '액티비티 예약 할인',
    logoImage: '/images/brands/클룩.png',
    brandName: '클룩',
    latitude: 37.5044,
    longitude: 127.0508,
  },
  {
    storeId: 6,
    storeName: '부산 엑스 더 스카이 서울점',
    categoryName: '액티비티',
    addressDetail: '서울 강남구 강남대로 303',
    benefit: '전망대 입장 할인',
    logoImage: '/images/brands/부산엑스더스카이.png',
    brandName: '부산 엑스 더 스카이',
    latitude: 37.5047,
    longitude: 127.0511,
  },

  // 뷰티/클리닉 (beauty)
  {
    storeId: 7,
    storeName: '오가나셀 피부과 의원 청담점',
    categoryName: '뷰티/건강',
    addressDetail: '서울 강남구 청담동 404',
    benefit: '피부관리 프로그램 할인',
    logoImage: '/images/brands/오가나셀.png',
    brandName: '오가나셀 피부과 의원 청담점',
    latitude: 37.505,
    longitude: 127.0514,
  },
  {
    storeId: 8,
    storeName: '데이원클리닉 강남점',
    categoryName: '뷰티/건강',
    addressDetail: '서울 강남구 강남대로 505',
    benefit: '미용 시술 할인',
    logoImage: '/images/brands/데이원클리닉.png',
    brandName: '데이원클리닉',
    latitude: 37.5053,
    longitude: 127.0517,
  },
  {
    storeId: 9,
    storeName: '포쉬네일 강남점',
    categoryName: '뷰티/건강',
    addressDetail: '서울 강남구 강남대로 606',
    benefit: '네일아트 서비스 할인',
    logoImage: '/images/brands/포쉬네일.png',
    brandName: '포쉬네일',
    latitude: 37.5056,
    longitude: 127.052,
  },

  // 건강/영양제 (pharmacy)
  {
    storeId: 10,
    storeName: '동아제약 디몰 강남점',
    categoryName: '뷰티/건강',
    addressDetail: '서울 강남구 강남대로 707',
    benefit: '건강기능식품 할인',
    logoImage: '/images/brands/동아제약.png',
    brandName: '동아제약 디몰',
    latitude: 37.5059,
    longitude: 127.0523,
  },
  {
    storeId: 11,
    storeName: 'LG생활건강샵 U+패밀리샵 강남점',
    categoryName: '뷰티/건강',
    addressDetail: '서울 강남구 강남대로 808',
    benefit: 'LG생활건강 제품 할인',
    logoImage: '/images/brands/LG생활건강.png',
    brandName: 'LG생활건강샵 U+패밀리샵',
    latitude: 37.5062,
    longitude: 127.0526,
  },
  {
    storeId: 12,
    storeName: '필리 강남점',
    categoryName: '뷰티/건강',
    addressDetail: '서울 강남구 강남대로 909',
    benefit: '영양제 정기구독 할인',
    logoImage: '/images/brands/필리.png',
    brandName: '필리',
    latitude: 37.5065,
    longitude: 127.0529,
  },

  // 생활/편의 (lifestyle)
  {
    storeId: 13,
    storeName: 'GS25 강남점',
    categoryName: '생활/편의',
    addressDetail: '서울 강남구 강남대로 1010',
    benefit: 'GS&POINT 적립',
    logoImage: '/images/brands/GS25.png',
    brandName: 'GS25',
    latitude: 37.5068,
    longitude: 127.0532,
  },
  {
    storeId: 14,
    storeName: '펫생각 강남점',
    categoryName: '생활/편의',
    addressDetail: '서울 강남구 강남대로 1111',
    benefit: '반려동물 용품 할인',
    logoImage: '/images/brands/펫생각.png',
    brandName: '펫생각',
    latitude: 37.5071,
    longitude: 127.0535,
  },
  {
    storeId: 15,
    storeName: '셸로 강남점',
    categoryName: '생활/편의',
    addressDetail: '서울 강남구 강남대로 1212',
    benefit: '생활용품 할인',
    logoImage: '/images/brands/셸로.png',
    brandName: '셸로',
    latitude: 37.5074,
    longitude: 127.0538,
  },

  // 쇼핑 (shopping)
  {
    storeId: 16,
    storeName: 'GS THE FRESH 강남점',
    categoryName: '쇼핑',
    addressDetail: '서울 강남구 강남대로 1313',
    benefit: 'GS THE FRESH 적립',
    logoImage: '/images/brands/GSTHEFRESH.png',
    brandName: 'GS THE FRESH',
    latitude: 37.5077,
    longitude: 127.0541,
  },
  {
    storeId: 17,
    storeName: 'VYVY 강남점',
    categoryName: '쇼핑',
    addressDetail: '서울 강남구 강남대로 1414',
    benefit: 'VYVY 멤버십 할인',
    logoImage: '/images/brands/VYVY.png',
    brandName: 'VYVY',
    latitude: 37.508,
    longitude: 127.0544,
  },
  {
    storeId: 18,
    storeName: '롯데백화점몰 강남점',
    categoryName: '쇼핑',
    addressDetail: '서울 강남구 강남대로 1515',
    benefit: '롯데백화점 포인트 적립',
    logoImage: '/images/brands/롯데백화점.png',
    brandName: '롯데백화점몰',
    latitude: 37.5083,
    longitude: 127.0547,
  },

  // 음식점 (food)
  {
    storeId: 19,
    storeName: 'VIPS 강남점',
    categoryName: '푸드',
    addressDetail: '서울 강남구 강남대로 1616',
    benefit: 'VIPS 멤버십 할인',
    logoImage: '/images/brands/VIPS.png',
    brandName: 'VIPS',
    latitude: 37.5086,
    longitude: 127.055,
  },
  {
    storeId: 20,
    storeName: '더플레이스 강남점',
    categoryName: '푸드',
    addressDetail: '서울 강남구 강남대로 1717',
    benefit: '디너코스 할인',
    logoImage: '/images/brands/더플레이스.png',
    brandName: '더플레이스',
    latitude: 37.5089,
    longitude: 127.0553,
  },
  {
    storeId: 21,
    storeName: '제일제면소 강남점',
    categoryName: '푸드',
    addressDetail: '서울 강남구 강남대로 1818',
    benefit: '면요리 할인',
    logoImage: '/images/brands/제일제면소.png',
    brandName: '제일제면소',
    latitude: 37.5092,
    longitude: 127.0556,
  },

  // 베이커리/디저트 (bakery)
  {
    storeId: 22,
    storeName: '파리바게뜨 강남점',
    categoryName: '푸드',
    addressDetail: '서울 강남구 강남대로 1919',
    benefit: '파리바게뜨 포인트 적립',
    logoImage: '/images/brands/파리바게뜨.png',
    brandName: '파리바게뜨',
    latitude: 37.5095,
    longitude: 127.0559,
  },
  {
    storeId: 23,
    storeName: '뚜레쥬르 강남점',
    categoryName: '푸드',
    addressDetail: '서울 강남구 강남대로 2020',
    benefit: '뚜레쥬르 멤버십 할인',
    logoImage: '/images/brands/뚜레쥬르.png',
    brandName: '뚜레쥬르',
    latitude: 37.5098,
    longitude: 127.0562,
  },
  {
    storeId: 24,
    storeName: '베스킨라빈스 강남점',
    categoryName: '푸드',
    addressDetail: '서울 강남구 강남대로 2121',
    benefit: '아이스크림 할인',
    logoImage: '/images/brands/베스킨라빈스.png',
    brandName: '베스킨라빈스',
    latitude: 37.5101,
    longitude: 127.0565,
  },

  // 추가 영화/미디어 매장 (문화/여가)
  {
    storeId: 25,
    storeName: '씨네폭스 강남점',
    categoryName: '문화/여가',
    addressDetail: '서울 강남구 강남대로 2222',
    benefit: '씨네폭스 멤버십 할인',
    logoImage: '/images/brands/씨네폭스.png',
    brandName: '씨네폭스',
    latitude: 37.5104,
    longitude: 127.0568,
  },

  // 테마파크 (문화/여가)
  {
    storeId: 26,
    storeName: '뽀로로파크 강남점',
    categoryName: '문화/여가',
    addressDetail: '서울 강남구 강남대로 2323',
    benefit: '뽀로로파크 입장료 할인',
    logoImage: '/images/brands/뽀로로파크.png',
    brandName: '뽀로로파크',
    latitude: 37.5107,
    longitude: 127.0571,
  },
  {
    storeId: 27,
    storeName: '서울랜드',
    categoryName: '문화/여가',
    addressDetail: '서울 강남구 강남대로 2424',
    benefit: '서울랜드 자유이용권 할인',
    logoImage: '/images/brands/서울랜드.png',
    brandName: '서울랜드',
    latitude: 37.511,
    longitude: 127.0574,
  },

  // 워터파크/아쿠아리움 (액티비티)
  {
    storeId: 28,
    storeName: '아쿠아필드 강남점',
    categoryName: '액티비티',
    addressDetail: '서울 강남구 강남대로 2525',
    benefit: '아쿠아필드 입장료 할인',
    logoImage: '/images/brands/아쿠아필드.png',
    brandName: '아쿠아필드',
    latitude: 37.5113,
    longitude: 127.0577,
  },
  {
    storeId: 29,
    storeName: '코엑스아쿠아리움',
    categoryName: '액티비티',
    addressDetail: '서울 강남구 강남대로 2626',
    benefit: '코엑스아쿠아리움 입장료 할인',
    logoImage: '/images/brands/코엑스아쿠아리움.png',
    brandName: '코엑스아쿠아리움',
    latitude: 37.5116,
    longitude: 127.058,
  },

  // 추가 액티비티
  {
    storeId: 30,
    storeName: 'SEOUL SKY',
    categoryName: '액티비티',
    addressDetail: '서울 강남구 강남대로 2727',
    benefit: 'SEOUL SKY 전망대 할인',
    logoImage: '/images/brands/SEOULSKY.png',
    brandName: 'SEOUL SKY',
    latitude: 37.5119,
    longitude: 127.0583,
  },
  {
    storeId: 31,
    storeName: '한강유람선 이크루즈',
    categoryName: '액티비티',
    addressDetail: '서울 강남구 강남대로 2828',
    benefit: '한강유람선 승선료 할인',
    logoImage: '/images/brands/이크루즈.png',
    brandName: '한강유람선 이크루즈',
    latitude: 37.5122,
    longitude: 127.0586,
  },

  // 추가 뷰티/건강
  {
    storeId: 32,
    storeName: '유엔아이피부과의원',
    categoryName: '뷰티/건강',
    addressDetail: '서울 강남구 강남대로 2929',
    benefit: '피부과 진료 할인',
    logoImage: '/images/brands/유엔아이피부과.png',
    brandName: '유엔아이피부과의원',
    latitude: 37.5125,
    longitude: 127.0589,
  },

  // 추가 쇼핑
  {
    storeId: 33,
    storeName: 'U+콕 강남점',
    categoryName: '쇼핑',
    addressDetail: '서울 강남구 강남대로 3030',
    benefit: 'U+콕 포인트 적립',
    logoImage: '/images/brands/U+콕.png',
    brandName: 'U+콕',
    latitude: 37.5128,
    longitude: 127.0592,
  },
  {
    storeId: 34,
    storeName: '현대면세점 강남점',
    categoryName: '쇼핑',
    addressDetail: '서울 강남구 강남대로 3131',
    benefit: '현대면세점 할인',
    logoImage: '/images/brands/현대면세점.png',
    brandName: '현대면세점',
    latitude: 37.5131,
    longitude: 127.0595,
  },

  // 추가 생활/편의
  {
    storeId: 35,
    storeName: '다락 강남점',
    categoryName: '생활/편의',
    addressDetail: '서울 강남구 강남대로 3232',
    benefit: '다락 생활용품 할인',
    logoImage: '/images/brands/다락.png',
    brandName: '다락',
    latitude: 37.5134,
    longitude: 127.0598,
  },
  {
    storeId: 36,
    storeName: '청소연구소 강남점',
    categoryName: '생활/편의',
    addressDetail: '서울 강남구 강남대로 3333',
    benefit: '청소서비스 할인',
    logoImage: '/images/brands/청소연구소.png',
    brandName: '청소연구소',
    latitude: 37.5137,
    longitude: 127.0601,
  },

  // 추가 베이커리/디저트 (푸드)
  {
    storeId: 37,
    storeName: '파리크라상 강남점',
    categoryName: '푸드',
    addressDetail: '서울 강남구 강남대로 3434',
    benefit: '파리크라상 제품 할인',
    logoImage: '/images/brands/파리크라상.png',
    brandName: '파리크라상',
    latitude: 37.514,
    longitude: 127.0604,
  },
  {
    storeId: 38,
    storeName: '브레댄코 강남점',
    categoryName: '푸드',
    addressDetail: '서울 강남구 강남대로 3535',
    benefit: '브레댄코 베이커리 할인',
    logoImage: '/images/brands/브레댄코.png',
    brandName: '브레댄코',
    latitude: 37.5143,
    longitude: 127.0607,
  },

  // 추가 음식점 (푸드)
  {
    storeId: 39,
    storeName: '굽네치킨 강남점',
    categoryName: '푸드',
    addressDetail: '서울 강남구 강남대로 3636',
    benefit: '굽네치킨 배달 할인',
    logoImage: '/images/brands/굽네치킨.png',
    brandName: '굽네치킨',
    latitude: 37.5146,
    longitude: 127.061,
  },
  {
    storeId: 40,
    storeName: '도미노피자 강남점',
    categoryName: '푸드',
    addressDetail: '서울 강남구 강남대로 3737',
    benefit: '도미노피자 할인',
    logoImage: '/images/brands/도미노피자.png',
    brandName: '도미노피자',
    latitude: 37.5149,
    longitude: 127.0613,
  },

  // 공연/전시 (문화/여가)
  {
    storeId: 41,
    storeName: '빛의 벙커',
    categoryName: '문화/여가',
    addressDetail: '서울 강남구 강남대로 3838',
    benefit: '빛의 벙커 입장료 할인',
    logoImage: '/images/brands/빛의벙커.png',
    brandName: '빛의 벙커',
    latitude: 37.5152,
    longitude: 127.0616,
  },
  {
    storeId: 42,
    storeName: '페인터즈 공연장',
    categoryName: '문화/여가',
    addressDetail: '서울 강남구 강남대로 3939',
    benefit: '페인터즈 공연 티켓 할인',
    logoImage: '/images/brands/페인터즈.png',
    brandName: '페인터즈',
    latitude: 37.5155,
    longitude: 127.0619,
  },

  // 교육
  {
    storeId: 43,
    storeName: '월스트리트 잉글리시 강남점',
    categoryName: '교육',
    addressDetail: '서울 강남구 강남대로 4040',
    benefit: '영어교육 수강료 할인',
    logoImage: '/images/brands/월스트리트잉글리시.png',
    brandName: '월스트리트 잉글리시',
    latitude: 37.5158,
    longitude: 127.0622,
  },
  {
    storeId: 44,
    storeName: '허그맘 강남점',
    categoryName: '교육',
    addressDetail: '서울 강남구 강남대로 4141',
    benefit: '심리상담 할인',
    logoImage: '/images/brands/허그맘.png',
    brandName: '허그맘',
    latitude: 37.5161,
    longitude: 127.0625,
  },

  // 여행/교통
  {
    storeId: 45,
    storeName: 'SK렌터카 강남점',
    categoryName: '여행/교통',
    addressDetail: '서울 강남구 강남대로 4242',
    benefit: 'SK렌터카 렌탈 할인',
    logoImage: '/images/brands/SK렌터카.png',
    brandName: 'SK렌터카',
    latitude: 37.5164,
    longitude: 127.0628,
  },
  {
    storeId: 46,
    storeName: '티웨이항공 강남점',
    categoryName: '여행/교통',
    addressDetail: '서울 강남구 강남대로 4343',
    benefit: '티웨이항공 항공료 할인',
    logoImage: '/images/brands/티웨이항공.png',
    brandName: '티웨이항공',
    latitude: 37.5167,
    longitude: 127.0631,
  },
];

// 목데이터: 매장 상세 정보 (실제 카테고리 및 브랜드 기반)
export const MOCK_STORE_DETAILS: Record<number, StoreDetail> = {
  1: {
    storeName: 'CGV 강남점',
    isFavorite: false,
    favoriteCount: 245,
    benefits: {
      grade: 'VIP' as GRADE,
      benefitText:
        'CGV 골드클래스 할인 30%, VIP 라운지 무료 이용, 팝콘세트 50% 할인, 생일자 무료 영화 관람권 증정, CGV 포인트 2배 적립, 프리미엄 좌석 우선 예매, 스낵바 할인 쿠폰 제공, 영화 관람 후 리뷰 작성 시 추가 포인트 적립',
    },
    usageLimit:
      '월 3회 사용 가능하며, 매월 1일 자정에 사용 횟수가 초기화됩니다. 연속 3개월 미사용 시 혜택이 일시 중단될 수 있습니다.',
    usageMethod:
      'CGV 앱에서 예매 시 자동 적용되며, 현장 매표소에서도 할인코드를 제시하면 동일한 혜택을 받을 수 있습니다. 온라인 예매 시에는 로그인 후 U+ 멤버십 인증을 완료해야 합니다.',
  },
  2: {
    storeName: '롯데시네마 강남역점',
    isFavorite: true,
    favoriteCount: 189,
    benefits: {
      grade: 'VVIP' as GRADE,
      benefitText: '롯데시네마 포인트 적립, 팝콘세트 할인',
    },
    usageLimit: '월 2회 사용 가능',
    usageMethod: '온라인 예매 시 할인코드 입력',
  },
  3: {
    storeName: '메가박스 강남대로점',
    isFavorite: true,
    favoriteCount: 312,
    benefits: {
      grade: '우수' as GRADE,
      benefitText: '메가박스 멤버십 할인, 컬렉션북 증정',
    },
    usageLimit: '월 4회',
    usageMethod: '메가박스 앱 또는 현장 키오스크',
  },
  4: {
    storeName: '스카이라인 루지 강남점',
    isFavorite: false,
    favoriteCount: 78,
    benefits: {
      grade: 'VIP' as GRADE,
      benefitText: '루지 체험 할인권, 그룹 할인',
    },
    usageLimit: '1일 2회 사용 가능',
    usageMethod: '현장 방문 시 쿠폰 제시',
  },
  5: {
    storeName: '클룩 강남센터',
    isFavorite: true,
    favoriteCount: 156,
    benefits: {
      grade: '우수' as GRADE,
      benefitText: '액티비티 예약 할인, 클룩 크레딧 적립',
    },
    usageLimit: '월 제한 없음',
    usageMethod: '클룩 앱에서 예약 시 자동 적용',
  },
  6: {
    storeName: '부산 엑스 더 스카이 서울점',
    isFavorite: false,
    favoriteCount: 203,
    benefits: {
      grade: 'VVIP' as GRADE,
      benefitText: '전망대 입장 할인, 기념품샵 할인',
    },
    usageLimit: '월 2회',
    usageMethod: '현장 매표소에서 할인코드 제시',
  },
  7: {
    storeName: '오가나셀 피부과 의원 청담점',
    isFavorite: false,
    favoriteCount: 89,
    benefits: {
      grade: '우수' as GRADE,
      benefitText: '피부관리 프로그램 할인, 무료 상담',
    },
    usageLimit: '월 1회',
    usageMethod: '전화 예약 시 할인 코드 제시',
  },
  8: {
    storeName: '데이원클리닉 강남점',
    isFavorite: true,
    favoriteCount: 134,
    benefits: {
      grade: 'VIP' as GRADE,
      benefitText: '미용 시술 할인, 애프터케어 서비스',
    },
    usageLimit: '월 2회',
    usageMethod: '온라인 예약 시 할인 적용',
  },
  9: {
    storeName: '포쉬네일 강남점',
    isFavorite: false,
    favoriteCount: 67,
    benefits: {
      grade: 'VVIP' as GRADE,
      benefitText: '네일아트 서비스 할인, 젤네일 무료 리터치',
    },
    usageLimit: '월 3회',
    usageMethod: '매장 방문 시 멤버십 카드 제시',
  },
  10: {
    storeName: '동아제약 디몰 강남점',
    isFavorite: false,
    favoriteCount: 45,
    benefits: {
      grade: '우수' as GRADE,
      benefitText: '건강기능식품 할인, 무료 건강상담',
    },
    usageLimit: '월 제한 없음',
    usageMethod: '온라인 또는 매장에서 할인코드 사용',
  },
  11: {
    storeName: 'LG생활건강샵 U+패밀리샵 강남점',
    isFavorite: true,
    favoriteCount: 123,
    benefits: {
      grade: 'VIP' as GRADE,
      benefitText: 'LG생활건강 제품 할인, 포인트 적립',
    },
    usageLimit: '월 제한 없음',
    usageMethod: 'U+ 가족 회원 혜택 자동 적용',
  },
  12: {
    storeName: '필리 강남점',
    isFavorite: false,
    favoriteCount: 89,
    benefits: {
      grade: 'VVIP' as GRADE,
      benefitText: '영양제 정기구독 할인, 무료 영양상담',
    },
    usageLimit: '월 1회',
    usageMethod: '필리 앱에서 구독 시 할인 적용',
  },
  13: {
    storeName: 'GS25 강남점',
    isFavorite: false,
    favoriteCount: 234,
    benefits: {
      grade: '우수' as GRADE,
      benefitText: 'GS&POINT 적립, 생필품 할인',
    },
    usageLimit: '제한 없음',
    usageMethod: 'GS&POINT 카드 제시',
  },
  14: {
    storeName: '펫생각 강남점',
    isFavorite: true,
    favoriteCount: 67,
    benefits: {
      grade: 'VIP' as GRADE,
      benefitText: '반려동물 용품 할인, 펫케어 서비스',
    },
    usageLimit: '월 3회',
    usageMethod: '매장 방문 시 멤버십 카드 제시',
  },
  15: {
    storeName: '셸로 강남점',
    isFavorite: false,
    favoriteCount: 145,
    benefits: {
      grade: 'VVIP' as GRADE,
      benefitText: '생활용품 할인, 대용량 구매 혜택',
    },
    usageLimit: '월 2회',
    usageMethod: '셸로 앱에서 쿠폰 사용',
  },
  16: {
    storeName: 'GS THE FRESH 강남점',
    isFavorite: false,
    favoriteCount: 178,
    benefits: {
      grade: '우수' as GRADE,
      benefitText: 'GS THE FRESH 적립, 신선식품 할인',
    },
    usageLimit: '월 제한 없음',
    usageMethod: 'GS THE FRESH 카드 제시',
  },
  17: {
    storeName: 'VYVY 강남점',
    isFavorite: true,
    favoriteCount: 92,
    benefits: {
      grade: 'VIP' as GRADE,
      benefitText: 'VYVY 멤버십 할인, 독점 상품 우선구매',
    },
    usageLimit: '월 4회',
    usageMethod: 'VYVY 앱에서 멤버십 혜택 적용',
  },
  18: {
    storeName: '롯데백화점몰 강남점',
    isFavorite: false,
    favoriteCount: 267,
    benefits: {
      grade: 'VVIP' as GRADE,
      benefitText: '롯데백화점 포인트 적립, VIP 라운지 이용',
    },
    usageLimit: '월 제한 없음',
    usageMethod: '롯데 멤버십 카드 제시',
  },
  19: {
    storeName: 'VIPS 강남점',
    isFavorite: true,
    favoriteCount: 345,
    benefits: {
      grade: 'VIP' as GRADE,
      benefitText: 'VIPS 멤버십 할인, 생일 특별 혜택',
    },
    usageLimit: '월 2회',
    usageMethod: 'VIPS 앱에서 예약 시 할인 적용',
  },
  20: {
    storeName: '더플레이스 강남점',
    isFavorite: false,
    favoriteCount: 156,
    benefits: {
      grade: '우수' as GRADE,
      benefitText: '디너코스 할인, 와인 페어링 서비스',
    },
    usageLimit: '월 1회',
    usageMethod: '전화 예약 시 할인 코드 제시',
  },
  21: {
    storeName: '제일제면소 강남점',
    isFavorite: false,
    favoriteCount: 89,
    benefits: {
      grade: '우수' as GRADE,
      benefitText: '면요리 할인, 사이드 메뉴 무료 제공',
    },
    usageLimit: '월 3회',
    usageMethod: '매장 방문 시 할인 쿠폰 제시',
  },
  22: {
    storeName: '파리바게뜨 강남점',
    isFavorite: true,
    favoriteCount: 203,
    benefits: {
      grade: '우수' as GRADE,
      benefitText: '파리바게뜨 포인트 적립, 케이크 주문 할인',
    },
    usageLimit: '월 제한 없음',
    usageMethod: '파리바게뜨 앱에서 적립 및 사용',
  },
  23: {
    storeName: '뚜레쥬르 강남점',
    isFavorite: false,
    favoriteCount: 178,
    benefits: {
      grade: 'VVIP' as GRADE,
      benefitText: '뚜레쥬르 멤버십 할인, 샐러드 무료 업그레이드',
    },
    usageLimit: '월 4회',
    usageMethod: '뚜레쥬르 앱에서 주문 시 할인 적용',
  },
  24: {
    storeName: '베스킨라빈스 강남점',
    isFavorite: false,
    favoriteCount: 234,
    benefits: {
      grade: 'VVIP' as GRADE,
      benefitText: '아이스크림 할인, BR 포인트 적립',
    },
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
