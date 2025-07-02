# Demo Ureka 프로젝트 템플릿

> React + TypeScript + Vite + Storybook + shadcn/ui + TailwindCSS를 사용한 모던 웹 개발 템플릿

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# Storybook 실행
npm run storybook
```

## 🏗️ 폴더 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── ui/             # shadcn/ui 컴포넌트
│   ├── forms/          # 폼 관련 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트
│   ├── navigation/     # 네비게이션 컴포넌트
│   └── common/         # 공통 컴포넌트
├── features/           # 기능별 모듈
│   ├── auth/           # 인증
│   ├── dashboard/      # 대시보드
│   └── profile/        # 프로필
├── shared/             # 공유 리소스
│   ├── hooks/          # 커스텀 훅
│   ├── services/       # API 서비스
│   ├── types/          # 타입 정의
│   └── utils/          # 유틸리티
└── stories/            # Storybook 문서
```

## 📦 포함된 기술 스택

- **Framework**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.0.0
- **Styling**: TailwindCSS v4.1.11
- **UI Components**: shadcn/ui
- **Documentation**: Storybook 9.0.14
- **Code Quality**: ESLint + Husky + lint-staged

## 🎨 컴포넌트 개발 가이드

### 기본 원칙

1. **직접 임포트 사용** (성능 최적화)

   ```typescript
   // ✅ 권장
   import { Button } from '@/components/ui/button';

   // ❌ 피하기 (배럴 익스포트)
   import { Button } from '@/components';
   ```

2. **기능별 폴더 구조**

   - 관련 컴포넌트들을 기능별로 그룹화
   - 각 폴더에 index.ts로 제한적 배럴 익스포트

3. **Storybook 문서화**
   - 모든 컴포넌트는 .stories.ts 파일 작성
   - 다양한 상태와 props 조합 테스트

## 🛠️ 개발 명령어

```bash
# 개발 서버 (http://localhost:5173)
npm run dev

# Storybook 서버 (http://localhost:6006)
npm run storybook

# 빌드
npm run build

# 프리뷰
npm run preview

# Storybook 빌드
npm run build-storybook

# 린트 및 포맷팅
npm run lint
npm run lint:fix
```

## 🔧 설정 파일

- `vite.config.ts` - Vite 설정
- `tailwind.config.js` - TailwindCSS 설정
- `components.json` - shadcn/ui 설정
- `.storybook/` - Storybook 설정
- `eslint.config.js` - ESLint 설정

## 📋 Git Hooks

- **pre-commit**: ESLint 자동 수정
- **pre-push**: 빌드 테스트

## 🎯 사용법

1. **새로운 컴포넌트 추가**

   ```bash
   # shadcn/ui 컴포넌트 설치
   npx shadcn@latest add [component-name]
   ```

2. **커스텀 컴포넌트 생성**

   - 해당 기능별 폴더에 컴포넌트 생성
   - .stories.ts 파일로 문서화
   - index.ts에 export 추가

3. **기능 모듈 개발**
   - `src/features/` 하위에 새 기능 폴더 생성
   - components, hooks, services 등 구조화

## 🚀 배포

이 템플릿은 다음 플랫폼에 배포할 수 있습니다:

- **Vercel**: `npx vercel`
- **Netlify**: `npm run build` 후 dist/ 폴더 배포
- **GitHub Pages**: GitHub Actions 워크플로우 사용

## 📝 라이선스

MIT License

## 🤝 기여하기

이슈와 PR은 언제나 환영합니다!
