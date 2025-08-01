import { http } from 'msw';

import { BRAND_ENDPOINTS } from '@/shared/components/brand_grid/api/endpoints';
import { createResponse } from '@/shared/utils/createResponse';

export const brandHandlers = [
  http.get(BRAND_ENDPOINTS.BRAND, () => {
    const mockBrands = [
      {
        brandId: 39,
        brandName: '롯데백화점몰',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%85%E1%85%A9%E1%86%BA%E1%84%83%E1%85%A6%E1%84%87%E1%85%A2%E1%86%A8%E1%84%92%E1%85%AA%E1%84%8C%E1%85%A5%E1%86%B7%E1%84%86%E1%85%A9%E1%86%AF.png',
      },
      {
        brandId: 15,
        brandName: '코엑스아쿠아리움',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%8F%E1%85%A9%E1%84%8B%E1%85%A6%E1%86%A8%E1%84%89%E1%85%B3%E1%84%8B%E1%85%A1%E1%84%8F%E1%85%AE%E1%84%8B%E1%85%A1%E1%84%85%E1%85%B5%E1%84%8B%E1%85%AE%E1%86%B7.png',
      },
      {
        brandId: 35,
        brandName: 'LG생활건강샵 U+패밀리샵',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/LG%E1%84%89%E1%85%A2%E1%86%BC%E1%84%92%E1%85%AA%E1%86%AF%E1%84%80%E1%85%A5%E1%86%AB%E1%84%80%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A3%E1%86%B8%20U%2B%E1%84%91%E1%85%A2%E1%84%86%E1%85%B5%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%A3%E1%86%B8.jpg',
      },
      {
        brandId: 10,
        brandName: '롯데월드 아이스링크',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%85%E1%85%A9%E1%86%BA%E1%84%83%E1%85%A6%E1%84%8B%E1%85%AF%E1%86%AF%E1%84%83%E1%85%B3%20%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B5%E1%86%BC%E1%84%8F%E1%85%B3.png',
      },
      {
        brandId: 30,
        brandName: '오가나셀 피부과 의원 청담점',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%8B%E1%85%A9%E1%84%80%E1%85%A1%E1%84%82%E1%85%A1%E1%84%89%E1%85%A6%E1%86%AF+%E1%84%91%E1%85%B5%E1%84%87%E1%85%AE%E1%84%80%E1%85%AA%E1%84%8B%E1%85%B4%E1%84%8B%E1%85%AF%E1%86%AB+%E1%84%8E%E1%85%A5%E1%86%BC%E1%84%83%E1%85%A1%E1%86%B7%E1%84%8C%E1%85%A5%E1%86%B7.png',
      },
      {
        brandId: 55,
        brandName: 'GS25',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/GS25.png',
      },
      {
        brandId: 110,
        brandName: '월스트리트 잉글리시',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%8B%E1%85%AF%E1%86%AF%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%E1%84%85%E1%85%B5%E1%84%90%E1%85%B3+%E1%84%8B%E1%85%B5%E1%86%BC%E1%84%80%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%B1.png',
      },
      {
        brandId: 101,
        brandName: '그라운드시소',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%80%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%83%E1%85%B3%E1%84%89%E1%85%B5%E1%84%89%E1%85%A9.png',
      },
      {
        brandId: 83,
        brandName: '굽네치킨',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%80%E1%85%AE%E1%86%B8%E1%84%82%E1%85%A6%E1%84%8E%E1%85%B5%E1%84%8F%E1%85%B5%E1%86%AB.jpg',
      },
      {
        brandId: 118,
        brandName: '야놀자고글로벌 국내 숙박',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%8B%E1%85%A3%E1%84%82%E1%85%A9%E1%86%AF%E1%84%8C%E1%85%A1%E1%84%80%E1%85%A9%E1%84%80%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A9%E1%84%87%E1%85%A5%E1%86%AF%20%E1%84%80%E1%85%AE%E1%86%A8%E1%84%82%E1%85%A2%20%E1%84%89%E1%85%AE%E1%86%A8%E1%84%87%E1%85%A1%E1%86%A8.png',
      },
      {
        brandId: 95,
        brandName: '원스토어',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%8B%E1%85%AF%E1%86%AB%E1%84%89%E1%85%B3%E1%84%90%E1%85%A9%E1%84%8B%E1%85%A5.png',
      },
      {
        brandId: 25,
        brandName: 'LG트윈스 경기 티켓 할인',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/LG%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B1%E1%86%AB%E1%84%89%E1%85%B3%20%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%B5%20%E1%84%90%E1%85%B5%E1%84%8F%E1%85%A6%E1%86%BA%20%E1%84%92%E1%85%A1%E1%86%AF%E1%84%8B%E1%85%B5%E1%86%AB.png',
      },
      {
        brandId: 2,
        brandName: 'CGV',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/CGV.png',
      },
      {
        brandId: 71,
        brandName: '파리바게트',
        logoImage:
          'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%91%E1%85%A1%E1%84%85%E1%85%B5%E1%84%87%E1%85%A1%E1%84%80%E1%85%A6%E1%84%90%E1%85%B3.jpg',
      },
    ];

    return createResponse(mockBrands, '관심 브랜드 목록 조회 성공');
  }),
];
