import type { Store } from '@kakao-map/types/store';
import type { RecommendedRanking } from '@recommendation/Recommendation.types';

export const mockRecommendStores: Store[] = [
  {
    storeId: 1,
    storeName: '스타벅스 코엑스 센터몰 매장 테스트용 매우 긴 매장명으로 UI 테스트 진행',
    categoryName: '카페',
    brandName: '스타벅스',
    addressDetail: '서울특별시 강남구 영동대로 513 코엑스몰 지하2층 스타벅스 커피 전문점 (삼성동, 코엑스몰) 상세주소테스트',
    benefit: '🎉 U-HYU 회원 특별 혜택! 아메리카노, 카페라떼, 카푸치노 등 모든 에스프레소 음료 1잔 무료 제공! 추가로 베이커리 상품 20% 할인, 텀블러 구매 시 10% 추가 할인, 스타벅스 카드 충전 시 보너스 스타 적립, 계절 한정 음료 체험 기회 제공, VIP 고객 대상 신메뉴 사전 체험 기회, 생일 월 특별 쿠폰 증정, 친구 추천 시 양쪽 모두 혜택 제공하는 매우 상세하고 긴 혜택 설명입니다.',
    latitude: 37.4979,
    longitude: 127.0276,
    logoImage: '/images/brands/default-brand-logo.png',
  },
  {
    storeId: 2,
    storeName: '이디야 신촌점',
    categoryName: '카페',
    brandName: '이디야',
    addressDetail: '서울 서대문구 연세로 10',
    benefit: '50% 할인 쿠폰!',
    latitude: 37.5599,
    longitude: 126.9369,
    logoImage: '/images/brands/뚜레쥬르.png',
  },
  {
    storeId: 3,
    storeName: '투썸플레이스 홍대점',
    categoryName: '카페',
    brandName: '투썸플레이스',
    addressDetail: '서울 마포구 홍익로 5',
    benefit: '케이크 1조각 무료!',
    latitude: 37.5552,
    longitude: 126.9237,
    logoImage: '/images/brands/뚜레쥬르.png',
  },
];

export const mockRecommendedRanking: RecommendedRanking[] = [
  {
    brandId: 1,
    brandName: '스타벅스',
    logoImg: '/images/brands/뚜레쥬르.png',
  },
  {
    brandId: 2,
    brandName: '투썸플레이스',
    logoImg: '/images/brands/뚜레쥬르.png',
  },
  {
    brandId: 3,
    brandName: '이마트',
    logoImg: '/images/brands/뚜레쥬르.png',
  },
];
