# 검색 기능 구현 문서

## 개요

U-Hyu 프로젝트에서 카카오 맵 기반 키워드 검색 기능을 구현하였습니다. 이 문서는 디바운스 적용 자동 검색 기능과 검색 결과 표시 기능의 구현 방법과 사용된 기술을 설명합니다.

## 🔧 핵심 기술 스택

### 1. 디바운스 (Debouncing)
- **라이브러리**: `lodash.debounce`
- **목적**: 불필요한 API 호출 방지 및 사용자 경험 개선
- **설정**: 환경변수 `VITE_SEARCH_DEBOUNCE_DELAY`로 지연 시간 조정 가능

### 2. React Hooks
- **useState**: 검색 상태 관리
- **useEffect**: 라이프사이클 관리 및 디바운스 함수 초기화
- **useCallback**: 함수 재생성 방지 및 성능 최적화
- **useRef**: 디바운스 함수 참조 저장

### 3. UI/UX 라이브러리
- **Framer Motion**: 검색 결과 애니메이션
- **Tailwind CSS**: 반응형 스타일링
- **Lucide React**: 아이콘 시스템

### 4. 타입 안전성
- **TypeScript**: 전체 코드베이스 타입 안전성 보장
- **인터페이스 정의**: Props와 상태에 대한 명확한 타입 정의

## 🏗️ 아키텍처 구조

```
src/features/kakao-map/
├── hooks/
│   └── useKeywordSearch.ts          # 핵심 검색 로직
├── components/
│   ├── MapControlsContainer.tsx     # 검색 상태 통합 관리
│   ├── layout/
│   │   └── MapTopControls.tsx       # UI 컨트롤 렌더링
│   └── search/
│       ├── SearchResultList.tsx     # 검색 결과 리스트
│       ├── SearchResultSummary.tsx  # 검색 결과 요약
│       ├── SearchResultItem.tsx     # 개별 결과 아이템
│       └── MapSearchInput.tsx       # 검색 입력 필드
├── api/
│   └── keywordSearchApi.ts          # 카카오 API 호출
└── types/
    └── types.ts                     # 타입 정의
```

## 📚 핵심 구현 상세

### 1. 디바운스 자동 검색 (`useKeywordSearch.ts`)

```typescript
// 환경변수 기반 디바운스 설정
const debounceDelay = Number(import.meta.env.VITE_SEARCH_DEBOUNCE_DELAY) || 500;

// 디바운스된 검색 함수 생성
useEffect(() => {
  if (autoSearch) {
    debouncedSearchRef.current = debounce(async (keyword: string) => {
      if (keyword.trim()) {
        // 지도 중심 좌표가 있으면 위치 기반 검색
        if (mapCenter) {
          await executeSearch(async () => {
            return await getKeywordSearchByLocation(keyword.trim(), mapCenter, searchRadius);
          }, keyword);
        } else {
          // 일반 키워드 검색
          await executeSearch(() => getKeywordSearch(keyword.trim()), keyword);
        }
      } else {
        clearResults();
      }
    }, debounceDelay);
  }

  return () => {
    debouncedSearchRef.current?.cancel(); // 메모리 누수 방지
  };
}, [autoSearch, debounceDelay, executeSearch, clearResults, mapCenter, searchRadius]);
```

**기술적 특징:**
- **메모리 관리**: 컴포넌트 언마운트 시 디바운스 함수 정리
- **조건부 검색**: 지도 중심 좌표 존재 여부에 따라 검색 방식 변경
- **에러 처리**: try-catch로 안전한 비동기 처리

### 2. 검색 상태 관리

```typescript
interface KeywordSearchState {
  keyword: string;                    // 현재 검색어
  results: NormalizedPlace[];         // 검색 결과
  loading: boolean;                   // 로딩 상태
  error: string | null;              // 에러 메시지
  hasSearched: boolean;              // 검색 실행 여부
  meta: KakaoKeywordSearchResponse['meta'] | null; // 메타 정보
  selectedPlace: NormalizedPlace | null; // 선택된 장소
}
```

**상태 관리 패턴:**
- **단일 상태 객체**: 모든 검색 관련 상태를 하나의 객체로 통합
- **불변성 유지**: spread 연산자를 통한 상태 업데이트
- **타입 안전성**: TypeScript 인터페이스로 상태 구조 보장

### 3. 검색 결과 UI (`SearchResultList.tsx`)

#### a) 로딩 상태
```typescript
if (loading) {
  return (
    <div className={`flex flex-col ${className}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <SearchResultSkeleton key={index} />
      ))}
    </div>
  );
}
```

#### b) 빈 상태 처리
```typescript
if (results.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-6 w-32 h-32 flex items-center justify-center">
        <img 
          src="/images/recommendation/empty-state-2.png" 
          alt="검색 결과 없음" 
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        검색 결과가 없습니다
      </h3>
      <p className="text-gray-500 text-sm mb-1">{emptyMessage}</p>
      <p className="text-gray-400 text-xs">다른 키워드로 다시 검색해보세요</p>
    </div>
  );
}
```

#### c) 애니메이션 적용
```typescript
<AnimatePresence>
  {results.map((place, index) => (
    <motion.div
      key={place.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.2, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
    >
      <SearchResultItem {...props} />
    </motion.div>
  ))}
</AnimatePresence>
```

**UI/UX 기법:**
- **스켈레톤 로딩**: 사용자에게 로딩 상태를 시각적으로 표현
- **스태거드 애니메이션**: 각 아이템이 순차적으로 나타나는 효과
- **감성적 빈 상태**: 이미지와 친근한 메시지로 사용자 경험 개선

### 4. 검색 결과 요약 (`SearchResultSummary.tsx`)

```typescript
export const SearchResultSummary: React.FC<SearchResultSummaryProps> = ({
  totalCount,
  currentCount,
  keyword,
  category,
}) => {
  // 카테고리 한글 매핑
  const getCategoryName = (cat?: string) => {
    const categoryMap: { [key: string]: string } = {
      'all': '전체',
      'food': '음식점',
      'shopping': '쇼핑',
      // ... 기타 카테고리
    };
    return categoryMap[cat || 'all'] || '전체';
  };

  return (
    <div className="flex flex-col p-4 border-b border-gray-100 bg-gray-50">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            '{keyword}' 검색결과
          </h2>
          {category && category !== 'all' && (
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              {getCategoryName(category)}
            </span>
          )}
        </div>
        <div className="text-sm font-medium text-blue-600">
          총 {totalCount.toLocaleString()}개
        </div>
      </div>
      <div className="text-xs text-gray-500">
        {currentCount}개 표시
      </div>
    </div>
  );
};
```

**정보 아키텍처:**
- **계층적 정보 표시**: 검색어 → 카테고리 → 결과 수 순으로 중요도 배치
- **시각적 구분**: 색상과 타이포그래피로 정보 위계 구성
- **숫자 포맷팅**: `toLocaleString()`으로 천 단위 구분자 표시

## 🔧 환경 설정

### 환경변수 (.env)
```bash
# 디바운스 지연 시간 (밀리초)
VITE_SEARCH_DEBOUNCE_DELAY=500

# 기타 관련 설정
VITE_DEFAULT_RADIUS=2000
VITE_SEARCH_DISTANCE_THRESHOLD=1500
```

### TypeScript 타입 정의 (vite-env.d.ts)
```typescript
interface ImportMetaEnv {
  readonly VITE_SEARCH_DEBOUNCE_DELAY: string;
  // ... 기타 환경변수
}
```

## 🚀 성능 최적화 전략

### 1. 메모이제이션
- **useCallback**: 함수 재생성 방지
- **React.memo**: 불필요한 리렌더링 방지

### 2. 비동기 처리
- **AbortController**: 요청 취소로 중복 호출 방지
- **Error Boundary**: 에러 격리 및 우아한 실패 처리

### 3. 번들 최적화
- **Tree Shaking**: lodash에서 debounce만 선택적 import
- **Lazy Loading**: 컴포넌트 지연 로딩

## 📱 반응형 대응

### 모바일 최적화
- **터치 최적화**: 44px 이상의 터치 타겟
- **뷰포트 대응**: 다양한 화면 크기에서 동작

### 접근성 (A11y)
- **키보드 내비게이션**: Tab, Enter 키 지원
- **스크린 리더**: aria-label, alt 태그 적용
- **고대비 모드**: 색상 대비 최적화

## 🔄 데이터 플로우

```
사용자 입력 → 디바운스 → API 호출 → 상태 업데이트 → UI 렌더링
     ↓              ↓           ↓           ↓            ↓
SearchInput → useKeywordSearch → KakaoAPI → useState → SearchResultList
```

## 📈 향후 개선 방안

### 1. 캐싱 전략
- **React Query**: 서버 상태 캐싱 및 동기화
- **Local Storage**: 검색 기록 저장

### 2. 검색 개선
- **자동완성**: 검색어 제안 기능
- **검색 기록**: 최근 검색어 관리
- **필터링**: 거리, 평점 등 고급 필터

### 3. 성능 향상
- **가상화**: 대량 결과에 대한 Virtual Scrolling
- **프리페칭**: 예상 검색어 미리 로드
- **CDN**: 이미지 및 정적 자산 최적화

## 🧪 테스트 전략

### 단위 테스트
- **hooks 테스트**: useKeywordSearch 로직 검증
- **컴포넌트 테스트**: UI 동작 확인

### 통합 테스트
- **E2E 테스트**: 전체 검색 플로우 검증
- **API 테스트**: 카카오 API 연동 확인

### 성능 테스트
- **디바운스 효과**: API 호출 횟수 측정
- **메모리 누수**: 컴포넌트 언마운트 후 정리 확인

---

이 구현은 현대적인 React 패턴과 성능 최적화 기법을 활용하여 사용자 친화적인 검색 경험을 제공합니다.