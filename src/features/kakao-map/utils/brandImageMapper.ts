export const getBrandImagePath = (storeName: string): string => {
  // 매장명에서 브랜드명 추출 (예: "스타벅스 강남점" → "스타벅스")
  const brandName = storeName.split(' ')[0];
  // 브랜드별 이미지 매핑
  const brandImageMap: Record<string, string> = {
    굽네치킨: '/images/brands/굽네치킨.png',
    파리바게뜨: '/images/brands/파리바게뜨.png',
    롯데시네마: '/images/brands/롯데시네마.png',
    베스킨라빈스: '/images/brands/베스킨라빈스.png',
    원더파크: '/images/brands/원더파크.png',
    CGV: '/images/brands/CGV.png',
    GS25: '/images/brands/GS25.png',
    뚜레쥬르: '/images/brands/뚜레쥬르.png',
  };
  // 매핑된 이미지가 있으면 반환, 없으면 기본 이미지
  return brandImageMap[brandName] || '/images/brands/default.png';
};
