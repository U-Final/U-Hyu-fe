import { HttpResponse, http } from 'msw';

import { BRAND_ENDPOINTS } from '@/shared/components/brand_grid/api/endpoints';

export const brandHandlers = [
  http.get(BRAND_ENDPOINTS.BRAND, () => {
    return HttpResponse.json({
      statusCode: 0,
      message: '정상 처리 되었습니다.',
      data: [
        {
          brandId: 39,
          brandName: '롯데백화점몰',
          logoImage:
            'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%85%E1%85%A9%E1%86%BA%E1%84%83%E1%85%A6%E1%84%87%E1%85%A2%E1%86%A8%E1%84%92%E1%85%A1%E1%84%8C%E1%85%A5%E1%86%B7%E1%84%86%E1%85%A9%E1%86%AF.png',
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
            'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/LG%E1%84%89%E1%85%A2%E1%86%BC%E1%84%92%E1%85%AA%E1%86%AF%E1%84%80%E1%85%A5%E1%86%AB%E1%84%80%E1%85%A1%E1%86%BC%E1%84%89%E1%85%A3%E1%86%B8%20U%2B%E1%84%91%E1%85%A2%E1%86%BC%E1%84%85%E1%85%B5%E1%84%89%E1%85%A3%E1%86%B8.jpg',
        },
        {
          brandId: 10,
          brandName: '롯데월드 아이스링크',
          logoImage:
            'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%85%E1%85%A9%E1%86%BA%E1%84%83%E1%85%A6%E1%84%8B%E1%85%AF%E1%86%AF%E1%84%83%E1%85%B3%20%E1%84%8B%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B5%E1%86%BC%E1%84%8F%E1%85%B3.png',
        },
        {
          brandId: 25,
          brandName: 'CGV',
          logoImage:
            'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/CGV.png',
        },
        {
          brandId: 30,
          brandName: '베스킨라빈스',
          logoImage:
            'https://uhyu-bucket.s3.ap-northeast-2.amazonaws.com/logo/%E1%84%87%E1%85%A6%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%86%AB%E1%84%85%E1%85%A1%E1%84%87%E1%85%B3%E1%86%AB%E1%84%89%E1%85%B3.png',
        },
      ],
    });
  }),
];
