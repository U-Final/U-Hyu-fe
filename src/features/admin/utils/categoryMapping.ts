export const getCategoryMapping = (): Record<string, string[]> => ({
  'movie': ['영화 / 미디어'],
  'themepark': ['테마파크'],
  'waterpark': ['워터파크/아쿠아리움'],
  'activity': ['액티비티'],
  'beauty': ['뷰티(피부과, 클리닉)'],
  'health': ['건강(제약, 영양제 등)'],
  'shopping': ['쇼핑'],
  'convenience': ['생활/편의'],
  'bakery': ['베이커리/디저트'],
  'restaurant': ['음식점'],
  'performance': ['공연/전시'],
  'education': ['교육'],
  'travel': ['여행/교통'],
});

export const filterDataByCategory = <T extends { categoryName: string }>(
  data: T[],
  selectedCategory: string
): T[] => {
  if (selectedCategory === 'all') {
    return data;
  }
  
  const categoryMap = getCategoryMapping();
  return data.filter(category => 
    categoryMap[selectedCategory]?.includes(category.categoryName) || false
  );
}; 