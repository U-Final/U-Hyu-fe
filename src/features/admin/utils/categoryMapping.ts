export const getCategoryMapping = (): Record<string, string[]> => ({
  '9': ['음식점'],
  '10': ['베이커리/디저트'],
  '7': ['생활/편의'],
  '8': ['쇼핑'],
  '5': ['뷰티(피부과, 클리닉)', '뷰티'],
  '6': ['건강(제약, 영양제 등)', '건강'],
  '2': ['영화 / 미디어', '영화/미디어'],
  '14': ['여행/교통'],
  '13': ['교육'],
  '12': ['공연/전시'],
  '4': ['액티비티'],
  '11': ['테마파크'],
  '3': ['워터파크/아쿠아리움'],
  '1': ['APP/기기'],
});

export const filterDataByCategory = <T extends { categoryName: string; categoryId?: number }>(
  data: T[],
  selectedCategory: string
): T[] => {
  if (selectedCategory === 'all') {
    return data;
  }
  const categoryId = parseInt(selectedCategory, 10);
  if (!isNaN(categoryId)) {
    return data.filter(item => item.categoryId === categoryId);
  }
  
  const categoryMap = getCategoryMapping();
  const categoryNames = categoryMap[selectedCategory];
  if (categoryNames) {
    return data.filter(item => 
      categoryNames.some(name => 
        item.categoryName === name || item.categoryName.includes(name)
      )
    );
  }
  
  return data;
}; 