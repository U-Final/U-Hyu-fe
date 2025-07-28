import type { ActivityBenefit, ActivityBrand } from '../api/types';

export const mockBenefit: ActivityBenefit = {
  id: 1,
  benefitName: 'CGV 영화 할인',
  brandName: 'CGV',
  usedAt: '2024-01-15T10:30:00Z',
  benefitType: 'DISCOUNT'
};

export const mockBrands: ActivityBrand[] = [
  {
    id: 1,
    brandName: '뚜레쥬르',
    visitCount: 5,
    lastVisitAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    brandName: 'CGV',
    visitCount: 3,
    lastVisitAt: '2024-01-10T14:20:00Z'
  },
  {
    id: 3,
    brandName: '파리바게뜨',
    visitCount: 2,
    lastVisitAt: '2024-01-08T09:15:00Z'
  }
];

export const mockFavoriteBrands = [
  { id: 1, image: "/images/brands/CGV.png", name: "CGV", description: "전국 CGV에서 사용 가능", isFavorite: true },
  { id: 2, image: "/images/brands/베스킨라빈스.png", name: "배스킨라빈스", description: "아이스크림 할인 혜택", isFavorite: true },
  { id: 3, image: "/images/brands/GS25.png", name: "GS25", description: "편의점 1000원 할인", isFavorite: true },
  { id: 4, image: "/images/brands/굽네치킨.png", name: "굽네치킨", description: "배달 시 2000원 할인", isFavorite: true },
  { id: 5, image: "/images/brands/뚜레쥬르.png", name: "뚜레쥬르", description: "빵 10% 할인", isFavorite: true },
  { id: 6, image: "/images/brands/원더파크.png", name: "원더파크", description: "테마파크 자유 이용권", isFavorite: true },
  { id: 7, image: "/images/brands/파리바게뜨.png", name: "파리바게트", description: "음료 무료 쿠폰", isFavorite: true },
  { id: 8, image: "/images/brands/롯데시네마.png", name: "롯데시네마", description: "영화 관람 30% 할인", isFavorite: true },
  { id: 9, image: "/images/brands/CGV.png", name: "CGV", description: "전국 CGV에서 사용 가능", isFavorite: true },
  { id: 10, image: "/images/brands/베스킨라빈스.png", name: "배스킨라빈스", description: "아이스크림 할인 혜택", isFavorite: true },
  { id: 11, image: "/images/brands/GS25.png", name: "GS25", description: "편의점 1000원 할인", isFavorite: true },
  { id: 12, image: "/images/brands/굽네치킨.png", name: "굽네치킨", description: "배달 시 2000원 할인", isFavorite: true },
  { id: 13, image: "/images/brands/뚜레쥬르.png", name: "뚜레쥬르", description: "빵 10% 할인", isFavorite: true },
  { id: 14, image: "/images/brands/원더파크.png", name: "원더파크", description: "테마파크 자유 이용권", isFavorite: true },
  { id: 15, image: "/images/brands/파리바게뜨.png", name: "파리바게트", description: "음료 무료 쿠폰", isFavorite: true },
  { id: 16, image: "/images/brands/롯데시네마.png", name: "롯데시네마", description: "영화 관람 30% 할인", isFavorite: true },
];
