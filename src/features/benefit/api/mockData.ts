import type { BenefitType, Brand, BrandDetailRes, StoreType } from './types';

/**
 * 브랜드 정보 목데이터 타입
 */
interface BrandMock extends Brand {
  category: string;
  storeTypes: StoreType;
  benefitTypes: BenefitType;
}

/**
 * 목데이터: 브랜드 정보
 */
export const MOCK_ALL_BRANDS: BrandMock[] = [
  {
    brandId: 101,
    brandName: '굽네치킨',
    logoImage: '/images/brands/굽네치킨.png',
    description: '아메리카노 20% 할인',
    category: '음식점',
    storeTypes: 'OFFLINE',
    benefitTypes: 'DISCOUNT',
  },
  {
    brandId: 102,
    brandName: '뚜레쥬르',
    logoImage: '/images/brands/뚜레쥬르.png',
    description: '케이크 10% 할인',
    category: '베이커리/디저트',
    storeTypes: 'OFFLINE',
    benefitTypes: 'DISCOUNT',
  },
  {
    brandId: 103,
    brandName: '롯데시네마',
    logoImage: '/images/brands/롯데시네마.png',
    description: '영화 티켓 1,000원 할인',
    category: '영화/미디어',
    storeTypes: 'OFFLINE',
    benefitTypes: 'DISCOUNT',
  },
  {
    brandId: 104,
    brandName: '배스킨라빈스',
    logoImage: '/images/brands/베스킨라빈스.png',
    description: '레귤러 1+1 혜택',
    category: '베이커리/디저트',
    storeTypes: 'OFFLINE',
    benefitTypes: 'GIFT',
  },
  {
    brandId: 105,
    brandName: '원더파크',
    logoImage: '/images/brands/원더파크.png',
    description: '전 상품 15% 할인',
    category: '테마파크',
    storeTypes: 'ONLINE',
    benefitTypes: 'DISCOUNT',
  },
  {
    brandId: 106,
    brandName: '파리바게뜨',
    logoImage: '/images/brands/파리바게뜨.png',
    description: '전 상품 15% 할인',
    category: '베이커리/디저트',
    storeTypes: 'OFFLINE',
    benefitTypes: 'DISCOUNT',
  },
  {
    brandId: 107,
    brandName: 'CGV',
    logoImage: '/images/brands/CGV.png',
    description: '2+1 행사 상품 제공',
    category: '영화/미디어',
    storeTypes: 'OFFLINE',
    benefitTypes: 'GIFT',
  },
  {
    brandId: 108,
    brandName: 'GS25',
    logoImage: '/images/brands/GS25.png',
    description: '2+1 행사 상품 제공',
    category: '생활/편의',
    storeTypes: 'OFFLINE',
    benefitTypes: 'GIFT',
  },
  {
    brandId: 12,
    brandName: '아쿠아필드',
    logoImage:
      'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%8B%E1%85%A1%E1%84%8F%E1%85%AE%E1%84%8B%E1%85%A1%E1%84%91%E1%85%B5%E1%86%AF%E1%84%83%E1%85%B3.png',
    description: '2+1 행사 상품 제공',
    category: '생활/편의',
    storeTypes: 'OFFLINE',
    benefitTypes: 'GIFT',
  },
  {
    brandId: 16,
    brandName: '아쿠아플라넷',
    logoImage:
      'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%8B%E1%85%A1%E1%84%8F%E1%85%AE%E1%84%8B%E1%85%A1%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%82%E1%85%A6%E1%86%BA.png',
    description: '2+1 행사 상품 제공',
    category: '생활/편의',
    storeTypes: 'OFFLINE',
    benefitTypes: 'GIFT',
  },
];

/**
 * 목데이터: 브랜드 상세 정보
 */
export const MOCK_BRAND_DETAILS: BrandDetailRes[] = [
  {
    brandId: 101,
    brandName: '굽네치킨',
    logoImage: '/images/brands/굽네치킨.png',
    usageMethod: '매장 방문 후 유플러스 고객 인증',
    usageLimit: '1일 1회 / 일부 매장 제외',
    benefitRes: [
      { grade: 'VVIP', description: '20% 할인 + 음료 무료' },
      { grade: 'VIP', description: '15% 할인' },
    ],
  },
  {
    brandId: 102,
    brandName: '뚜레쥬르',
    logoImage: '/images/brands/뚜레쥬르.png',
    usageMethod: '유플러스 쿠폰 제시',
    usageLimit: '1일 2회 / 케이크 제외',
    benefitRes: [
      { grade: 'VVIP', description: '10% 할인 + 추가 적립' },
      { grade: 'GOOD', description: '5% 할인' },
    ],
  },
  {
    brandId: 103,
    brandName: '롯데시네마',
    logoImage: '/images/brands/롯데시네마.png',
    usageMethod: '모바일 앱에서 쿠폰 등록',
    usageLimit: '주 1회 / 본인만 사용 가능',
    benefitRes: [
      { grade: 'VVIP', description: '영화 1,000원 할인 + 콤보 업그레이드' },
      { grade: 'VIP', description: '영화 1,000원 할인' },
    ],
  },
  {
    brandId: 104,
    brandName: '배스킨라빈스',
    logoImage: '/images/brands/베스킨라빈스.png',
    usageMethod: '매장 QR코드 스캔 후 쿠폰 적용',
    usageLimit: '하루 1회 / 일부 제품 제외',
    benefitRes: [
      { grade: 'VVIP', description: '1+1 (레귤러 사이즈)' },
      { grade: 'GOOD', description: '10% 할인' },
    ],
  },
  {
    brandId: 105,
    brandName: '원더파크',
    logoImage: '/images/brands/원더파크.png',
    usageMethod: '앱 바코드 스캔 후 적용',
    usageLimit: '1일 3회 / 행사 상품 제외',
    benefitRes: [
      { grade: 'VVIP', description: '2+1 혜택 + 추가 포인트' },
      { grade: 'GOOD', description: '2+1 행사 적용' },
    ],
  },
  {
    brandId: 106,
    brandName: '파리바게뜨',
    logoImage: '/images/brands/파리바게뜨.png',
    usageMethod: '모바일 앱에서 쿠폰 등록',
    usageLimit: '주 1회 / 본인만 사용 가능',
    benefitRes: [
      { grade: 'VVIP', description: '영화 1,000원 할인 + 콤보 업그레이드' },
      { grade: 'VIP', description: '영화 1,000원 할인' },
    ],
  },
  {
    brandId: 107,
    brandName: 'CGV',
    logoImage: '/images/brands/CGV.png',
    usageMethod: '매장 QR코드 스캔 후 쿠폰 적용',
    usageLimit: '하루 1회 / 일부 제품 제외',
    benefitRes: [
      { grade: 'VVIP', description: '1+1 (레귤러 사이즈)' },
      { grade: 'GOOD', description: '10% 할인' },
    ],
  },
  {
    brandId: 108,
    brandName: 'GS25',
    logoImage: '/images/brands/GS25.png',
    usageMethod: '앱 바코드 스캔 후 적용',
    usageLimit: '1일 3회 / 행사 상품 제외',
    benefitRes: [
      { grade: 'VVIP', description: '2+1 혜택 + 추가 포인트' },
      { grade: 'GOOD', description: '2+1 행사 적용' },
    ],
  },
  {
    brandId: 12,
    brandName: '아쿠아필드',
    logoImage:
      'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%8B%E1%85%A1%E1%84%8F%E1%85%AE%E1%84%8B%E1%85%A1%E1%84%91%E1%85%B5%E1%86%AF%E1%84%83%E1%85%B3.png',
    usageMethod:
      '■ &nbsp;쿠폰 다운로드 방법 U+ 멤버십앱 메인 화면 우측 상단 검색(돋보기 모양)클릭 &gt; 아쿠아필드 검색 &gt; 제휴사 클릭 후 &#39;다운로드&#39; 클릭 &gt; &nbsp;U+멤버십 앱 메인 화면 우측 상단 &#39;마이&#39; 클릭 &gt; 내 쿠폰함 &gt; 쿠폰 내 이용방법 및 유의사항 참고&nbsp;  ■ &nbsp;쿠폰 사용 방법 - STEP 1. 멤버십 앱 내 쿠폰 다운로드 - STEP 2. 내 쿠폰함에서 다운로드한 쿠폰 확인 - STEP 3. 결제 전 매장 직원에게 쿠폰 제시  ■ &nbsp;꼭 확인하세요&nbsp; &nbsp;- 이 쿠폰은 아쿠아필드 전 지점(하남/고양/안성)에서 사용하실 수 있습니다. &nbsp;- 이 쿠폰은 찜질스파, 워터파크 중 1개를 선택해서 사용하실 수 있습니다. (멀티패스 사용 불가) &nbsp;- 이 쿠폰은 다운로드한 달의 마지막 날까지 사용하실 수 있습니다. &nbsp;- 이 쿠폰은 키오스크에서도 상시 혜택을 받으실 수 있습니다. &nbsp;- 이 쿠폰은 본인 포함 최대 2명까지 혜택을 이용하실 수 있습니다. &nbsp;- 이 쿠폰은 주말과 공휴일에 사용하실 수 없습니다.&nbsp; &nbsp;- 이 쿠폰은 현장 결제 시에만 사용 가능하며, 다른 할인 혜택과 중복으로 이용하실 수 없습니다. &nbsp;- 방문 전 아쿠아필드 홈페이지의 이용 안내와 운영 정책을 꼭 읽어 주시기 바랍니다 &nbsp;- 캡처한 쿠폰 이미지는 사용하실 수 없습니다. &nbsp;- 기간이 지난 쿠폰은 사용하거나 다시 발급받으실 수 없습니다. &nbsp;- 쿠폰 사용 기간은 연장할 수 없습니다. &nbsp;- U+ 멤버십 포인트와 함께 사용하실 수 없습니다. &nbsp;- 환불과 관련된 사항은 아쿠아필드의 규정을 따릅니다. &nbsp;- 이 쿠폰은 상품권이나 현금으로 교환하실 수 없습니다. &nbsp;- 이 쿠폰은 다른 쿠폰[종이 상품권, 모바일 상품권(금액권/제품권), 할인 쿠폰, 기타 쿠폰]과 중복으로 사용하실 수 없습니다.&nbsp;  ※ 본 쿠폰은 평수기와 성수기 기간에 따라 혜택 요금이 다르므로, 이용 전 반드시 요금을 확인해 주세요. - 평수기 기간: ~ 2025년 07월 18일(금) &nbsp; ▶ 대인 요금: 찜질스파 25,000원, 워터파크 45,000원, 멀티패스 55,000원 &nbsp; ▶ 소인 요금: 찜질스파 20,000원, 워터파크 35,000원, 멀티패스 45,000원 - 성수기 기간: 2025년 07월 19일(토) ~ 2025년 08월 17일(일) &nbsp; ▶ 대인 요금:&nbsp;찜질스파 26,000원, 워터파크 56,000원,&nbsp;멀티패스 66,000원 &nbsp; ▶ 소인 요금:&nbsp;찜질스파 21,000원, 워터파크 46,000원,&nbsp;멀티패스 56,000원 ※ 대인(중학생 이상) / 소인(36개월~초등학생)&nbsp;  ■ 문의 &nbsp;- 아쿠아필드 고객센터(하남점: 031-8072-8800, 고양점: 031-5173-4500, 안성점: 031-8092-1900, 오전 10시~오후 6시, 유료)',
    usageLimit: '월 1회',
    benefitRes: [
      {
        grade: 'VVIP',
        description: '찜질스파 또는 워터파크 주중 30% 할인 (최대 2인)',
      },
      {
        grade: 'VIP',
        description: '찜질스파 또는 워터파크 주중 30% 할인 (최대 2인)',
      },
      {
        grade: 'GOOD',
        description: '찜질스파 또는 워터파크 주중 30% 할인 (최대 2인)',
      },
    ],
  },
  {
    brandId: 16,
    brandName: '아쿠아플라넷',
    logoImage:
      'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%8B%E1%85%A1%E1%84%8F%E1%85%AE%E1%84%8B%E1%85%A1%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A1%E1%84%82%E1%85%A6%E1%86%BA.png',
    usageMethod:
      '결제 시 직원에게 멤버십 카드 제시  *꼭 확인하세요 - 중복 할인 불가(일산점, 여수점, 제주점, 광교점)</br>  대표문의 아쿠아플라넷 02-789-5663',
    usageLimit: '일 1회 (대인기준 / 본인포함 최대 4인)',
    benefitRes: [
      {
        grade: 'VVIP',
        description: '①일산점, 광교점 20% 할인\\n②여수점, 제주점 15% 할인',
      },
      {
        grade: 'VIP',
        description: '①일산점, 광교점 20% 할인\\n②여수점, 제주점 15% 할인',
      },
      {
        grade: 'GOOD',
        description: '①일산점, 광교점 20% 할인\\n②여수점, 제주점 15% 할인',
      },
    ],
  },
];
