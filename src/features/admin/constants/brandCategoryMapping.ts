// 브랜드별 카테고리 매핑
export const BRAND_CATEGORY_MAPPING: Record<string, number> = {
  // 영화/미디어 (2)
  'CGV': 2,
  '롯데시네마': 2,
  
  // 테마파크 (3)
  '원더파크': 3,
  
  // 편의점 (5)
  'GS25': 5,
  
  // 쇼핑 (8)
  '쿠팡': 8,
  
  // 생활/편의 (9)
  '펫생각': 9,
  
  // 베이커리/디저트 (10)
  '배스킨라빈스': 10,
  '파리바게트': 10,
  '뚜레쥬르': 10,
  '스타벅스': 10,
  
  // 음식점 (11)
  '굽네치킨': 11,
  '도미노피자': 11,
  '미스터피자': 11,
  'VIPS': 11,
  '배달의민족': 11,
  
  // 공연/전시 (12)
  '빛의벙커': 12,
  '그라운드시소': 12,
};

// 카테고리 ID별 이름 매핑
export const CATEGORY_ID_MAPPING: Record<string, number[]> = {
  '1': [1], // APP/기기
  '2': [2], // 영화/미디어  
  '3': [3], // 테마파크
  '4': [4], // 카페
  '5': [5], // 편의점
  '6': [6], // 주유소
  '7': [7], // 병원
  '8': [8], // 쇼핑
  '9': [9], // 생활/편의
  '10': [10], // 베이커리/디저트
  '11': [11], // 음식점
  '12': [12], // 공연/전시
  '13': [13], // 교육
};

// 브랜드의 카테고리 ID 조회 함수
export const getBrandCategoryId = (brandName: string): number => {
  return BRAND_CATEGORY_MAPPING[brandName] || 1; // 기본값: APP/기기
};

// 카테고리 ID 배열 조회 함수
export const getCategoryIds = (categoryKey: string): number[] => {
  return CATEGORY_ID_MAPPING[categoryKey] || [];
}; 