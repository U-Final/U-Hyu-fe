import React from 'react';

import { FILTER_TABS } from '@/shared/components/filter_tabs/FilterTabs.variants';

import type { NormalizedPlace } from '../../api/types';
import { CategoryIcon } from '../search/CategoryIcon';

interface CategoryMarkerProps {
  /** 장소 정보 */
  place: NormalizedPlace;
  /** 마커 클릭 핸들러 */
  onClick: (place: NormalizedPlace) => void;
  /** 선택 상태 */
  isSelected?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 카테고리 기반 마커 컴포넌트
 * 카테고리별 아이콘과 색상을 표시하는 개별 마커
 */
export const CategoryMarker: React.FC<CategoryMarkerProps> = ({
  place,
  onClick,
  isSelected = false,
  className = '',
}) => {
  const handleClick = () => {
    onClick(place);
  };

  // FilterTabs 색상을 사용하는 함수
  const getCategoryColorFromFilter = (placeCategory: string): string => {
    // 실제 백엔드 데이터 기반 매핑
    const categoryMappings: Record<string, string> = {
      // 실제 백엔드 카테고리명 기반 정확한 매핑
      '베이커리/디저트': '베이커리/디저트',
      '영화/미디어': '영화/미디어', 
      '음식점': '음식점',
      '쇼핑': '쇼핑',
      '뷰티': '뷰티',
      '건강': '건강',
      '생활/편의': '생활/편의',
      '교육': '교육',
      '여행/교통': '여행/교통',
      '공연/전시': '공연/전시',
      '액티비티': '액티비티',
      '테마파크': '테마파크',
      '워터파크/아쿠아리움': '워터파크/아쿠아리움',
      
      // 카카오 API 카테고리 매핑
      카페: '베이커리/디저트',
      베이커리: '베이커리/디저트',
      디저트: '베이커리/디저트',
      제과점: '베이커리/디저트',
      영화관: '영화/미디어',
      영화: '영화/미디어',
      미디어: '영화/미디어',
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
      미용실: '뷰티',
      네일샵: '뷰티',
      피부관리: '뷰티',
      화장품: '뷰티',
      병원: '건강',
      약국: '건강',
      한의원: '건강',
      치과: '건강',
      헬스장: '건강',
      편의점: '생활/편의',
      대형마트: '생활/편의',
      마트: '생활/편의',
      슈퍼마켓: '생활/편의',
      학교: '교육',
      학원: '교육',
      도서관: '교육',
      지하철역: '여행/교통',
      버스정류장: '여행/교통',
      주차장: '여행/교통',
      주유소: '여행/교통',
      숙박: '여행/교통',
      노래방: '영화/미디어',
      'PC방': '영화/미디어',
      박물관: '공연/전시',
      미술관: '공연/전시',
      공연장: '공연/전시',
      스포츠: '액티비티',
      수영장: '액티비티',
      골프장: '액티비티',
      볼링장: '액티비티',
      놀이공원: '테마파크',
      워터파크: '워터파크/아쿠아리움',
      아쿠아리움: '워터파크/아쿠아리움',
      수족관: '워터파크/아쿠아리움',
    };

    // 카테고리 매칭 시도
    const categoryParts = placeCategory.split(' > ');
    for (const part of categoryParts) {
      const trimmedPart = part.trim();
      if (categoryMappings[trimmedPart]) {
        const filterCategory = categoryMappings[trimmedPart];
        const filterTab = FILTER_TABS.find(tab => tab.value === filterCategory);
        if (filterTab) return filterTab.color ?? '#e6007e';
      }
    }

    // 키워드 매칭 시도 (부분 문자열 포함)
    for (const [keyword, filterCategory] of Object.entries(categoryMappings)) {
      if (placeCategory.includes(keyword)) {
        const filterTab = FILTER_TABS.find(tab => tab.value === filterCategory);
        if (filterTab) return filterTab.color ?? '#e6007e';
      }
    }

    // 개발 모드에서 매핑 결과 디버깅
    if (import.meta.env.MODE === 'development') {
      console.log(`🎨 CategoryMarker 매핑: ${placeCategory} → 매칭 없음 (기본값 사용)`);
    }
    
    // 기본값: 프라이머리 컬러
    return '#e6007e';
  };

  const backgroundColor = getCategoryColorFromFilter(place.category);
  const selectedBackgroundColor = '#3b82f6'; // blue-500

  return (
    <div
      onClick={handleClick}
      className={`
        relative cursor-pointer transform transition-all duration-200
        hover:scale-110 active:scale-95 z-10
        ${className}
      `}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${place.name} 마커`}
    >
      {/* 마커 아이콘 컨테이너 */}
      <div
        className={`
          relative w-10 h-10 rounded-full
          border-2 border-white shadow-xl
          flex items-center justify-center
          transition-all duration-200
          hover:scale-110 hover:shadow-2xl
          ${isSelected ? 'scale-125 ring-4 ring-blue-200 shadow-2xl' : ''}
        `}
        style={{
          backgroundColor: isSelected
            ? selectedBackgroundColor
            : backgroundColor,
          boxShadow: isSelected
            ? `0 8px 25px -5px ${selectedBackgroundColor}40, 0 10px 10px -5px ${selectedBackgroundColor}30`
            : `0 8px 25px -5px ${backgroundColor}40, 0 10px 10px -5px ${backgroundColor}30`,
        }}
      >
        {/* 카테고리 아이콘 - 마커 내부에서는 흰색으로 표시 */}
        <CategoryIcon
          category={place.category}
          categoryGroupCode={place.categoryGroupCode}
          size={16}
          color="#ffffff"
        />
      </div>

      {/* 마커 하단의 작은 포인터 */}
      <div
        className={`
          absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1
          w-0 h-0 border-l-2 border-r-2 border-t-4
          border-transparent
          transition-all duration-200
        `}
        style={{
          borderTopColor: isSelected
            ? selectedBackgroundColor
            : backgroundColor,
        }}
      />

      {/* 선택 상태일 때 펄스 효과 */}
      {isSelected && (
        <>
          <div className="absolute inset-0 w-10 h-10 rounded-full bg-blue-400 opacity-20 animate-ping" />
          <div className="absolute inset-0 w-14 h-14 rounded-full bg-blue-300 opacity-10 animate-pulse -translate-x-2 -translate-y-2" />
        </>
      )}
    </div>
  );
};

export default CategoryMarker;
