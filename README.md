## 🧱 프론트엔드 개발 구조 및 전략

### 1. 📦 기능 단위 디렉토리 분리 (`features/` 중심 설계)

프로젝트 구조는 **도메인 단위 책임 분리**를 기반으로 설계했습니다. 이를 통해 각 기능이 독립적으로 유지보수되며, 변경 사항이 다른 영역에 영향을 주지 않도록 합니다.

```
src/
├── features/
│   ├── user/             # 사용자 관련 기능
│   ├── auth/             # 인증 및 보안
│   ├── map/              # 지도 도메인
│   └── store/            # 제휴 스토어 기능
├── shared/               # 전역 공통 리소스 (UI 컴포넌트, hooks 등)
├── pages/                # 라우팅 페이지 (Next.js 기준)
```

- **features/**: 실제 비즈니스 로직이 위치하며, API 호출, 훅, 컴포넌트, 상태 관리 등을 한 도메인 안에 배치합니다.
- **shared/**: 전역 공통으로 사용하는 Button, Modal, Hook 등을 배치합니다.

### 2. 🧩 재사용 가능한 컴포넌트 설계

단순히 하나의 컴포넌트를 만들기보다는, 다음을 고려해 설계했습니다:

- **역할에 따른 컴포넌트 분리**: `ButtonBase`, `PrimaryButton`, `GhostButton`처럼 기본 스타일을 `Base`에 담고, 역할에 따라 확장
- **Props 최소화 및 명시적 타입 지정**: 공통 인터페이스를 정의하고, 확장 가능하도록 타입 설계

예시:
```tsx
// shared/components/ui/ButtonBase.tsx
export const ButtonBase = ({ children, ...props }: ButtonBaseProps) => (
  <button {...props}>{children}</button>
);

// shared/components/ui/PrimaryButton.tsx
export const PrimaryButton = (props: ButtonBaseProps) => (
  <ButtonBase className="bg-primary text-white" {...props} />
);

3. 💡 모듈화와 생산성 향상: Alias + Barrel Export
	•	Alias (@components, @features, @constants 등)
tsconfig.json과 Vite 설정을 통해 상대경로 대신 의미 있는 경로 사용을 유도해 가독성 및 유지보수를 향상시켰습니다.

```
// tsconfig.json
"paths": {
  "@components/*": ["src/shared/components/*"],
  "@features/*": ["src/features/*"]
}
```

	•	Barrel Export (index.ts)
각 디렉토리마다 index.ts를 통해 외부에서의 import 구문을 단순화하였습니다.
```
// features/user/index.ts
export * from './api';
export * from './components';
```

4. Storybook 도입 및 UI 명세 자동화

Storybook을 통해 다음과 같은 목적을 달성했습니다:
	•	컴포넌트 단위 개발 → UI 명세 자동화
	•	디자이너와의 커뮤니케이션 향상
	•	Variant/Size/State 등 각종 Prop 기반의 시각적 테스트 용이
