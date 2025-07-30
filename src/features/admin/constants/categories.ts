export const ADMIN_CATEGORIES = [
  { id: 'all', name: '전체', color: 'var(--color-brand-blue)' },
  { id: 'movie', name: '영화 / 미디어', color: 'var(--category-movie)' },
  { id: 'themepark', name: '테마파크', color: 'var(--category-themepark)' },
  { id: 'waterpark', name: '워터파크/아쿠아리움', color: 'var(--category-waterpark)' },
  { id: 'activity', name: '액티비티', color: 'var(--category-activity)' },
  { id: 'beauty', name: '뷰티(피부과, 클리닉)', color: 'var(--category-beauty)' },
  { id: 'health', name: '건강(제약, 영양제 등)', color: 'var(--category-health)' },
  { id: 'shopping', name: '쇼핑', color: 'var(--category-shopping)' },
  { id: 'convenience', name: '생활/편의', color: 'var(--category-convenience)' },
  { id: 'bakery', name: '베이커리/디저트', color: 'var(--category-bakery)' },
  { id: 'restaurant', name: '음식점', color: 'var(--category-restaurant)' },
  { id: 'performance', name: '공연/전시', color: 'var(--category-performance)' },
  { id: 'education', name: '교육', color: 'var(--category-education)' },
  { id: 'travel', name: '여행/교통', color: 'var(--category-travel)' },
] as const;

export type CategoryId = typeof ADMIN_CATEGORIES[number]['id']; 