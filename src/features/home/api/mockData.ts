// 목업 데이터 정의

export const mockUserInfoData = {
  // user_name, grade
  userName: '김유휴',
  grade: 'VIP',
};

export const mockRecommendationData = [
  // 근데 일단 첫번째로는 일단 내가 브랜드 아이디를 넘기면 그거에 대한 정보를 불러오게 될거같은데 말이지 일ㄷ나
];

export const mockNearbyStoresData = [
  // 여기는 카카오맵 보면서 만들면 될거같은디
  // 필요한거
  /* 주변 매장 정보 타입
  1. 매장명 store_name
  2. 주소 addr_detail
  3. 등급혜택 description
  4. 로고 이미지 logoImage
  추가로 좌표가 필요할지도?
  */

  {
    store_name: '스타벅스 강남역점',
    addr_detail: '서울 강남구 테헤란로 123',
    description: 'VIP 등급 아메리카노 무료',
  },
  {
    store_name: '스타벅스 강남역점',
    addr_detail: '서울 강남구 테헤란로 123',
    description: 'VIP 등급 아메리카노 무료',
  },
  {
    store_name: '스타벅스 강남역점',
    addr_detail: '서울 강남구 테헤란로 123',
    description: 'VIP 등급 아메리카노 무료',
  },
];

export const mockBenefitsData = [
  /**
   * 멤버십 혜택
   * 1. benefit_type(DISCOUNT, GIFT)
   * 2. description
   * 3. logoImage
   */
  {
    benefit_type: 'DISCOUNT',
    description: 'VVIP 등급 고객: CGV 영화 티켓 100% 할인',
  },
  {
    benefit_type: 'GIFT',
    description: 'VIP 등급 고객: 스타벅스 아메리카노 쿠폰 제공',
  },
  {
    benefit_type: 'DISCOUNT',
    description: 'GOLD 등급 고객: 이마트 5% 할인 쿠폰',
  },
];
