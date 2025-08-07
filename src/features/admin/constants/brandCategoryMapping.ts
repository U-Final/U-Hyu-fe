export const BRAND_CATEGORY_MAPPING: Record<string, number> = {
  'CGV': 2,
  '롯데시네마': 2,
  '원더파크': 3,
  'GS25': 5,
  '쿠팡': 8,
  '펫생각': 9,
  '배스킨라빈스': 10,
  '파리바게트': 10,
  '뚜레쥬르': 10,
  '스타벅스': 10,
  '굽네치킨': 11,
  '도미노피자': 11,
  '미스터피자': 11,
  'VIPS': 11,
  '배달의민족': 11,
  '빛의벙커': 12,
  '그라운드시소': 12,
};

export const CATEGORY_ID_MAPPING: Record<string, number[]> = {
  '1': [1],
  '2': [2], 
  '3': [3],
  '4': [4],
  '5': [5],
  '6': [6],
  '7': [7],
  '8': [8],
  '9': [9],
  '10': [10],
  '11': [11],
  '12': [12],
  '13': [13],
};

export const getBrandCategoryId = (brandName: string): number => {
  return BRAND_CATEGORY_MAPPING[brandName] || 1;
};

export const getCategoryIds = (categoryKey: string): number[] => {
  return CATEGORY_ID_MAPPING[categoryKey] || [];
}; 