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
#### 3.1 Alias (@components, @features, @constants 등)
tsconfig.json과 Vite 설정을 통해 상대경로 대신 의미 있는 경로 사용을 유도해 가독성 및 유지보수를 향상.

```
// tsconfig.json
"paths": {
  "@components/*": ["src/shared/components/*"],
  "@features/*": ["src/features/*"]
}
```

#### 3.2 Barrel Export (index.ts)
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
