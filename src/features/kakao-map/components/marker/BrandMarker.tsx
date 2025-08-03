import { type FC } from 'react';

import { FILTER_TABS } from '../../../../shared/components/filter_tabs/FilterTabs.variants.ts';
import type { Store } from '../../types/store.ts';

interface BrandMarkerProps {
  store: Store;
  isSelected?: boolean;
  isRecommended?: boolean;
  onClick?: () => void;
  activeCategory?: string;
}

const BrandMarker: FC<BrandMarkerProps> = ({
  store,
  isSelected = false,
  isRecommended = false,
  onClick,
}) => {
  const brandImageSrc = store.logoImage;

  // FilterTabs 색상을 직접 사용하는 개선된 함수
  const getCategoryColorFromFilter = (storeCategoryName: string): string => {
    // 매장 카테고리명을 FilterTabs에서 찾기
    const filterTab = FILTER_TABS.find(tab => {
      // 1순위: 정확한 매칭 (대소문자 구분 없이)
      if (tab.value.toLowerCase() === storeCategoryName.toLowerCase())
        return true;

      // 2순위: 부분 문자열 포함 검사
      if (
        storeCategoryName.includes(tab.value) ||
        tab.value.includes(storeCategoryName)
      )
        return true;

      // 3순위: 추가 매핑 테이블을 통한 매칭
      const categoryMappings: Record<string, string[]> = {
        '베이커리/디저트': [
          'bakery',
          'cafe',
          '카페',
          '베이커리',
          '디저트',
          '제과점',
        ],
        '영화/미디어': [
          'media',
          'culture',
          '영화관',
          '영화',
          '미디어',
          '엔터테인먼트',
        ],
        음식점: [
          'food',
          'restaurant',
          'fastfood',
          '한식',
          '중식',
          '일식',
          '양식',
          '분식',
          '치킨',
          '피자',
        ],
        쇼핑: ['shopping', '의류', '신발', '가방', '액세서리', '패션'],
        뷰티: ['beauty', '미용실', '네일샵', '피부관리', '화장품', '미용'],
        건강: [
          'health',
          'pharmacy',
          '병원',
          '약국',
          '한의원',
          '치과',
          '헬스장',
          '의료',
        ],
        '생활/편의': [
          'lifestyle',
          'convenience',
          '편의점',
          '대형마트',
          '마트',
          '슈퍼마켓',
        ],
        교육: ['education', '학교', '학원', '도서관', '교육기관'],
        '여행/교통': [
          'travel',
          '지하철역',
          '버스정류장',
          '주차장',
          '주유소',
          '숙박',
          '호텔',
        ],
        '공연/전시': ['performance', '박물관', '미술관', '공연장', '전시관'],
        액티비티: ['activity', '스포츠', '수영장', '골프장', '볼링장', '운동'],
        테마파크: ['themepark', '놀이공원', '테마파크'],
        '워터파크/아쿠아리움': [
          'waterpark',
          '워터파크',
          '아쿠아리움',
          '수족관',
        ],
      };

      const matchingCategories = categoryMappings[tab.value];
      return matchingCategories?.some(
        keyword =>
          storeCategoryName.toLowerCase().includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(storeCategoryName.toLowerCase())
      );
    });

    const resultColor = filterTab?.color || '#6b7280';

    // 개발 모드에서 매핑 결과 디버깅
    if (import.meta.env.MODE === 'development') {
      console.log(
        `🎨 BrandMarker 매핑: "${storeCategoryName}" → ${filterTab?.label || '매칭 없음'} (${resultColor})`,
        {
          찾은탭: filterTab,
          입력카테고리: storeCategoryName,
          결과색상: resultColor,
        }
      );
    }

    return resultColor;
  };

  // 항상 매장의 실제 카테고리 색상 사용
  const categoryColor = getCategoryColorFromFilter(store.categoryName);

  return (
    <div className="relative" onClick={onClick}>
      {/* 추천 매장 심플한 효과 */}
      {isRecommended && (
        <>
          {/* 단일 펄스 링 */}
          <div className="absolute inset-0 w-16 h-16 -translate-x-1 -translate-y-1 rounded-full border-2 border-yellow-400 opacity-50 animate-pulse" />
        </>
      )}
      {/* 메인 마커 */}
      <div
        className={`
          relative 
          w-14 h-14 
          rounded-full 
          shadow-xl 
          border-3 
          border-white
          cursor-pointer
          transition-all 
          duration-200
          hover:scale-110
          hover:shadow-2xl
          ${isSelected ? `ring-4 ${isRecommended ? 'ring-yellow-300' : 'ring-blue-300'} shadow-2xl` : ''}
        `}
        style={{
          backgroundColor: categoryColor,
          boxShadow: isRecommended
            ? `0 8px 25px -5px ${categoryColor}50, 0 10px 10px -5px ${categoryColor}30`
            : `0 8px 25px -5px ${categoryColor}40, 0 10px 10px -5px ${categoryColor}30`,
          border: isRecommended ? '3px solid #fbbf24' : '3px solid white',
        }}
      >
        {/* 브랜드 로고 */}
        <div className="absolute inset-2 bg-white rounded-full overflow-hidden">
          <img
            src={brandImageSrc}
            alt={`${store.storeName} 마커`}
            className="w-full h-full object-cover"
            onError={e => {
              e.currentTarget.src = '/images/brands/default-brand-logo.png';
            }}
          />
        </div>

        {/* 추천 매장 간단한 표시 */}
        {isRecommended && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        )}

        {/* 마커 포인터 */}
        <div
          className={`
            absolute 
            top-full 
            left-1/2
            transform
            -translate-x-1/2
            w-0 h-0
            border-l-[6px]
            border-r-[6px]
            border-t-[10px]
            border-transparent
            border-t-current
            drop-shadow-md
            ${isRecommended ? 'animate-pulse' : ''}
          `}
          style={{
            borderTopColor: isRecommended ? '#fbbf24' : categoryColor, // amber-400 or category color
            filter: isRecommended
              ? 'drop-shadow(0 2px 4px rgba(251, 191, 36, 0.4))'
              : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
          }}
        />
      </div>

      {/* 선택 상태 펄스 */}
      {isSelected && (
        <div
          className={`absolute inset-0 rounded-full border-2 border-blue-400 animate-ping`}
        />
      )}
    </div>
  );
};

export default BrandMarker;
