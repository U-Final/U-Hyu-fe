import type { Store } from '@kakao-map/types/store';
import type { RecommendedRanking } from '@recommendation/Recommendation.types';

export const mockRecommendStores: Store[] = [
  {
    storeId: 1,
    storeName: '스타벅스 강남점',
    categoryName: '카페',
    brandName: '스타벅스',
    addressDetail: '서울 강남구 테헤란로 1',
    benefit: '아메리카노 1잔 무료!',
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
    logoImage: '/images/brands/뚜레쥬르.png',
  },
  {
    brandId: 2,
    brandName: '투썸플레이스',
    logoImage: '/images/brands/뚜레쥬르.png',
  },
  {
    brandId: 3,
    brandName: '이마트',
    logoImage: '/images/brands/뚜레쥬르.png',
  },
];
