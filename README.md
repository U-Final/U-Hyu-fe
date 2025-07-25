## 프론트엔드 개발 구조 및 전략

### 1. 기능 단위 디렉토리 분리 (`features/` 중심 설계)

프로젝트 구조는 **도메인 단위 책임 분리**를 기반으로 설계. <br/>
이를 통해 각 기능이 독립적으로 유지보수되며, 변경 사항이 다른 영역에 영향을 주지 않음.

```
src/
├── features/              # 비즈니스 로직 중심
│   ├── user/             # 사용자 관련 기능
│   ├── auth/             # 인증 및 보안
│   ├── map/              # 지도 도메인
│   └── store/            # 제휴 스토어 기능
├── shared/               # 전역 공통 리소스
├── pages/                # 라우팅 페이지

```

- **features/**: API 호출, 훅, 컴포넌트, 상태 관리를 한 도메인 안에 배치
- **shared/**: 전역 공통 Button, Modal, Hook 등을 배치

### 2. 재사용 가능한 컴포넌트 설계

**역할 기반 컴포넌트 분리**로 확장성과 일관성을 확보.<br/>
공통 인터페이스 정의 후 확장 가능한 타입 설계.<br/>

```tsx
// shared/components/ui/ButtonBase.tsx
export const ButtonBase = ({ children, ...props }: ButtonBaseProps) => (
  <button {...props}>{children}</button>
);

// shared/components/ui/PrimaryButton.tsx
export const PrimaryButton = (props: ButtonBaseProps) => (
  <ButtonBase className="bg-primary text-white" {...props} />
);
```

### 3. 모듈화와 생산성 향상: Alias + Barrel Export

### 3.1 Alias (@benefit, @mypage 등)

tsconfig.json과 Vite 설정을 통해 상대경로 대신 의미 있는 경로 사용을 유도해 가독성 및 유지보수를 향상.

```
// tsconfig.json
"paths": {
  "@benefit/*": ["src/features/benefit/*"],
  "@mypage/*": ["src/features/mypage/*"]
}

```

### 3.2 Barrel Export (index.ts)

각 디렉토리마다 index.ts를 통해 외부에서의 import 구문을 단순화.

```
// features/user/index.ts
export * from './api';
export * from './components';

```

### 4. Storybook 도입 및 UI 명세 자동화

> 컴포넌트 단위 개발 → UI 명세 자동화
> Variant/Size/State 등 각종 Prop 기반의 시각적 테스트 용이

개발 효율성과 품질 관리를 동시에 확보하는 전략적 도구로 활용.

### **5. API 개발 플로우 및 실제 연동 전략**

> 프론트엔드와 백엔드 개발을 병렬적으로 진행하기 위해, **Mock 데이터 기반 > API 개발**과 **React Query 중심의 API 통합 전략**을 사용한다.

실제 백엔드 준비 후에는 .env 설정값만으로 손쉽게 전환 가능하다.

### **개발 흐름 요약**

1. endpoints.ts: API 경로를 중앙에서 정의
2. types.ts: 요청/응답 타입을 명확하게 정의
3. userApi.ts: 실제 호출 로직 + mock 처리
4. mockData.ts: 개발용 테스트 데이터
5. useUserQueries.ts: React Query 훅으로 래핑
6. components/: 컴포넌트에서 간편하게 사용

### **디렉토리 구조 (요약)**

```
src/features/{feature-name}/
├── api/
│   ├── endpoints.ts      # API 경로 중앙 관리
│   ├── types.ts          # 타입 정의 (요청, 응답)
│   ├── {feature}Api.ts   # 실제 API 로직
│   └── mockData.ts       # 개발용 목데이터
├── hooks/               # React Query 훅
├── components/          # 도메인별 UI
```

### **환경 전환 (.env 설정 기반)**

- 개발용 목데이터 사용
  VITE_USE_MOCK_DATA=true
- 실제 API 연동
  VITE_USE_MOCK_DATA=false
- 지도 재검색 거리 설정 (미터 단위)
  VITE_SEARCH_DISTANCE_THRESHOLD=5000  # 기본값: 5km

### **핵심 전략 요약**

- **중앙 집중형 endpoint 관리**로 URL 하드코딩 방지
- **목데이터 우선 개발**로 백엔드와 병렬 개발
- **React Query 기반** 캐시 최적화, 자동 재요청 처리
- **Barrel export + Alias 사용**으로 import 가독성 유지
- **JSDoc + 타입 기반 문서화**로 협업 시 명확한 규격 공유

---

### **보안 및 품질 체크리스트**

- 타입 안전성 확보 (as const, interface 활용)
- try-catch 또는 에러 바운더리 처리
- 쿼리 키 통일성 유지 (USER_QUERY_KEYS)
- 캐시 무효화 전략 (invalidateQueries)
- 실데이터 전환을 위한 .env 값 전환 구조
