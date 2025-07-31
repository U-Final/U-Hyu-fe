export const getCategoryIdFromFilterValue = (filterValue: string): number => {
  const categoryMapping: Record<string, number> = {
    // 새로운 14개 비즈니스 카테고리 매핑
    'APP/기기': 1,
    '영화/미디어': 2,
    '워터파크/아쿠아리움': 3,
    '액티비티': 4,
    '뷰티': 5,
    '건강': 6,
    '생활/편의': 7,
    '쇼핑': 8,
    '음식점': 9,
    '베이커리/디저트': 10,
    '테마파크': 11,
    '공연/전시': 12,
    '교육': 13,
    '여행/교통': 14,

    // 기존 호환성을 위한 매핑 (구 카테고리가 있을 수 있음)
    culture: 2,
    '문화/여가': 2,
    activity: 4,
    beauty: 5,
    '뷰티/건강': 5,
    '뷰티(피부과, 클리닉)': 5,
    '건강(제약, 영양제 등)': 6,
    life: 7,
    shopping: 8,
    food: 9,
    푸드: 9,
    education: 13,
    travel: 14,
  };

  const categoryId = categoryMapping[filterValue];

  if (categoryId === undefined) {
    if (import.meta.env.MODE === 'development') {
      console.log(`알 수 없는 값 : ${filterValue}`);
    }
    return 0;
  }
  return categoryId;
};
