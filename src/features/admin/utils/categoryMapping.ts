export const getCategoryMapping = (): Record<string, string[]> => ({
  '1': ['APP/기기'],
  '2': ['영화 / 미디어', '영화/미디어'],
  '3': ['테마파크'],
  '4': ['워터파크/아쿠아리움'],
  '5': ['액티비티'],
  '6': ['뷰티(피부과, 클리닉)', '뷰티'],
  '7': ['건강(제약, 영양제 등)', '건강'],
  '8': ['쇼핑'],
  '9': ['생활/편의'],
  '10': ['베이커리/디저트'],
  '11': ['음식점'],
  '12': ['공연/전시'],
  '13': ['교육'],
  '14': ['여행/교통'],
});

export const filterDataByCategory = <T extends { categoryName: string; categoryId?: number }>(
  data: T[],
  selectedCategory: string
): T[] => {
  // 전체 선택시 모든 데이터 반환
  if (selectedCategory === 'all') {
    return data;
  }
  
  // 숫자 카테고리 ID로 직접 필터링
  const categoryId = parseInt(selectedCategory, 10);
  if (!isNaN(categoryId)) {
    return data.filter(item => item.categoryId === categoryId);
  }
  
  // 카테고리 이름으로 매핑하여 필터링
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