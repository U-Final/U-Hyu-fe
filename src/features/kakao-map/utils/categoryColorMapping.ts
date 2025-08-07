import { FILTER_TABS } from '@/shared/components/filter_tabs/FilterTabs.variants';

const DEFAULT_PRIMARY_COLOR = '#e6007e';

/**
 * 카테고리 매핑 상수
 * 백엔드 카테고리명과 FilterTabs 카테고리를 연결하는 매핑 테이블
 */
const CATEGORY_MAPPINGS: Record<string, string> = {
  '베이커리/디저트': '베이커리/디저트',
  '영화/미디어': '영화/미디어',
  음식점: '음식점',
  쇼핑: '쇼핑',
  뷰티: '뷰티',
  건강: '건강',
  '생활/편의': '생활/편의',
  교육: '교육',
  '여행/교통': '여행/교통',
  '공연/전시': '공연/전시',
  액티비티: '액티비티',
  테마파크: '테마파크',
  '워터파크/아쿠아리움': '워터파크/아쿠아리움',

  카페: '베이커리/디저트',
  베이커리: '베이커리/디저트',
  디저트: '베이커리/디저트',
  제과점: '베이커리/디저트',
  영화관: '영화/미디어',
  영화: '영화/미디어',
  미디어: '영화/미디어',
  엔터테인먼트: '영화/미디어',
  노래방: '영화/미디어',
  PC방: '영화/미디어',
  한식: '음식점',
  중식: '음식점',
  일식: '음식점',
  양식: '음식점',
  분식: '음식점',
  패스트푸드: '음식점',
  치킨: '음식점',
  피자: '음식점',
  고기구이: '음식점',
  의류: '쇼핑',
  신발: '쇼핑',
  가방: '쇼핑',
  액세서리: '쇼핑',
  패션: '쇼핑',
  미용실: '뷰티',
  네일샵: '뷰티',
  피부관리: '뷰티',
  화장품: '뷰티',
  미용: '뷰티',
  병원: '건강',
  약국: '건강',
  한의원: '건강',
  치과: '건강',
  헬스장: '건강',
  의료: '건강',
  편의점: '생활/편의',
  대형마트: '생활/편의',
  마트: '생활/편의',
  슈퍼마켓: '생활/편의',
  학교: '교육',
  학원: '교육',
  도서관: '교육',
  교육기관: '교육',
  지하철역: '여행/교통',
  버스정류장: '여행/교통',
  주차장: '여행/교통',
  주유소: '여행/교통',
  숙박: '여행/교통',
  호텔: '여행/교통',
  박물관: '공연/전시',
  미술관: '공연/전시',
  공연장: '공연/전시',
  전시관: '공연/전시',
  스포츠: '액티비티',
  수영장: '액티비티',
  골프장: '액티비티',
  볼링장: '액티비티',
  운동: '액티비티',
  놀이공원: '테마파크',
  워터파크: '워터파크/아쿠아리움',
  아쿠아리움: '워터파크/아쿠아리움',
  수족관: '워터파크/아쿠아리움',
};

/**
 * 성능 최적화를 위한 색상 캐시
 */
const colorCache = new Map<string, string>();

/**
 * 카테고리명을 기반으로 FilterTabs의 색상을 반환하는 공통 유틸리티 함수
 * @param categoryStr 매장 또는 장소의 카테고리명
 * @returns FilterTabs에 정의된 색상 또는 기본 프라이머리 색상
 */
export const getCategoryColorFromFilter = (categoryStr: string): string => {
  if (!categoryStr || categoryStr.trim() === '') {
    return DEFAULT_PRIMARY_COLOR;
  }

  const cached = colorCache.get(categoryStr);
  if (cached) return cached;

  let resultColor = DEFAULT_PRIMARY_COLOR;

  const categoryParts = categoryStr.split(' > ');
  for (const part of categoryParts) {
    const trimmedPart = part.trim();
    if (CATEGORY_MAPPINGS[trimmedPart]) {
      const filterCategory = CATEGORY_MAPPINGS[trimmedPart];
      const filterTab = FILTER_TABS.find(tab => tab.value === filterCategory);
      if (filterTab?.color) {
        resultColor = filterTab.color;
        break;
      }
    }
  }

  if (resultColor === DEFAULT_PRIMARY_COLOR) {
    for (const [keyword, filterCategory] of Object.entries(CATEGORY_MAPPINGS)) {
      if (categoryStr.includes(keyword)) {
        const filterTab = FILTER_TABS.find(tab => tab.value === filterCategory);
        if (filterTab?.color) {
          resultColor = filterTab.color;
          break;
        }
      }
    }
  }

  colorCache.set(categoryStr, resultColor);

  return resultColor;
};

/**
 * 캐시를 초기화하는 함수 (테스트나 특별한 경우에 사용)
 */
export const clearCategoryColorCache = (): void => {
  colorCache.clear();
};

/**
 * 현재 캐시 크기를 반환하는 함수 (디버깅 용도)
 */
export const getCacheSize = (): number => {
  return colorCache.size;
};
