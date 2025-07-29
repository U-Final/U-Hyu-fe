import type { RecommendStore } from '@recommendation/api/recommendedStores.types';

export const mockRecommendStores: RecommendStore[] = [
  {
    store_id: 1,
    store_name: '스타벅스 강남점',
    category_name: '카페',
    brand_name: '스타벅스',
    addr_detail: '서울 강남구 테헤란로 1',
    description: '아메리카노 1잔 무료!',
    geom: 'POINT (127.02758 37.49794)',
    logoImage: '/public/images/brands/default-brand-logo.png',
    favorite_count: 123,
  },
  {
    store_id: 2,
    store_name: '이디야 신촌점',
    category_name: '카페',
    brand_name: '이디야',
    addr_detail: '서울 서대문구 연세로 10',
    description: '50% 할인 쿠폰!',
    geom: 'POINT (126.9371 37.561)',
    logoImage: '/public/images/brands/뚜레쥬르.png',
  },
  {
    store_id: 3,
    store_name: '이디야 신촌점',
    category_name: '카페',
    brand_name: '이디야',
    addr_detail: '서울 서대문구 연세로 10',
    description: '50% 할인 쿠폰!',
    geom: 'POINT (126.9371 37.561)',
    logoImage: '/public/images/brands/뚜레쥬르.png',
  },
];
