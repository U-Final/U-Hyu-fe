# 🗺️ U-Hyu 프론트엔드

**주변 멤버십 혜택을 지도로 탐색하고, 다른 사람들과 매장을 공유하는 위치 기반 플랫폼**



## 기능 요약

| 기능 구분        | 주요 기능 소개 |
|------------------|----------------|
| 회원 관리        | 소셜 로그인, JWT 인증, 등급 및 권한 기반 유저 관리 |
| 홈               | 주변 매장 및 추천 매장 탐색 |
| 혜택 조회        | 멤버십 등급별 혜택 리스트 및 상세 보기 |
| 추천 매장        | 선호 브랜드 기반 맞춤형 매장 추천 |
| 지도 서비스      | 카카오 맵 기반 매장 검색, 필터링, 마커 시각화 |
| 마이맵           | 나만의 폴더형 즐겨찾기 지도 구성 및 공유 |
| 마이페이지       | 내 정보, 관심 브랜드 관리 및 통계 |
| 바코드 발급      | 앱 내 혜택 사용을 위한 멤버십 바코드 제공 |
| 추가 정보 입력   | 가입 이후 선호 브랜드 등 보완 정보 수집 |
| 어드민(관리자)   | 제휴 매장/사용자 통계, 통계 분석 대시보드 |

<br/>

## U-Hyu 주요 기능



## 회원 관리

- **소셜 로그인**: 카카오 OAuth
- **인증 처리**: JWT 기반 액세스/리프레시 토큰
- **최초 가입 설문**: 이메일, 멤버십 등급 등 선호/이용 브랜드 입력
- **역할 기반 권한 관리**: 사용자 / 관리자
- **멤버십 등급 관리**: 우수, VIP, VVIP

<img width="830" height="441" alt="온보딩" src="https://github.com/user-attachments/assets/d6c9c82a-f0a3-443f-81ca-6527573e3040" />
<img width="830" height="441" alt="카카오 로그인" src="https://github.com/user-attachments/assets/660cf0dc-b652-413d-add0-0965b1651ea9" />


<br/>


## 지도 서비스 (Map)



### 지도 기반 매장 탐색
- 현재 위치 기반 제휴 매장 마커 표시
- 줌 레벨별 클러스터링 처리
- 마커 클릭 시 상세 인포윈도우 렌더링 제공
- 혜택 별 카테고리 및 사용 조건 정보 제공
- 지역 드롭다운 메뉴를 통한 지역 이동

<img width="849" height="438" alt="지도 기반 매장 탐색" src="https://github.com/user-attachments/assets/da481a1b-7aa2-43dc-bf1a-db6925c055db" />



### 카테고리 / 브랜드 필터

- 브랜드별 키워드 검색
- 카테고리 / 브랜드별 필터링 기능
- 거리 기반 매장 검색

<img width="825" height="438" alt="카테고리/브랜드 필터" src="https://github.com/user-attachments/assets/f68b1aeb-6ffb-46bf-8f5b-d991c1dfcd7c" />




### 키워드 검색

- 카카오 Place API 연동
- 검색 결과 마커 시각화 및 간단 정보 노출
- 카테고리별 마커 아이콘 및 색상 매핑

<img width="451" height="438" alt="키워드 검색" src="https://github.com/user-attachments/assets/a8784087-2e1c-4466-bc2a-e65720425290" />


<br/>

## 마이맵 (MyMap)

### MyMap 폴더 관리
- 폴더 생성/삭제
- 폴더 프리셋 색상 선택
- 폴더명 최대 10자 제한

<img width="651" height="438" alt="MyMap 폴더 관리" src="https://github.com/user-attachments/assets/39be9e36-0f30-4374-94bc-e7856242aae8" />

  
### MyMap 매장 관리 및 시각화
- 지도에서 매장 선택 후 폴더에 추가/삭제
- 폴더별 매장 마커 시각화
- 카드 클릭 시 지도 위치 이동

<img width="855" height="438" alt="MyMap 매장 관리" src="https://github.com/user-attachments/assets/7fd88009-09c8-4576-8942-cfc35593c319" />
<img width="446" height="438" alt="시각화" src="https://github.com/user-attachments/assets/52415b75-1754-4571-9180-13b4aa74479b" />



### 즐겨찾기 매장 관리 및 토글
- 지도에서 매장 선택 후 폴더에 추가/삭제
- 즐겨찾기 토글로 지도화면에서 즐겨찾기 마커
<img width="650" height="445" alt="즐겨찾기 매장 관리 및 토글" src="https://github.com/user-attachments/assets/eec52307-b101-4c80-ada7-19d5bb2d259a" />


### 공유 시스템
- UUID 기반 링크 생성
- 짧은 URL (`u-hyu.app/map/:uuid`) 제공
- 카카오톡 공유하기

<img width="859" height="448" alt="공유 시스템" src="https://github.com/user-attachments/assets/92814c42-d330-49b7-95d6-5ad50de10bff" />

<br/>

## 혜택 조회 (Benefit)

- 멤버십 등급별 혜택 리스트 및 상세 제공
- 혜택 조건, 사용 방법 등 안내
- 제휴처 검색 기능
- 카테고리 필터 + 다중 조건 필터링 지원

<img width="999" height="438" alt="혜택 조회" src="https://github.com/user-attachments/assets/768122f9-906b-45ab-9f5a-8bdd8c34dc8e" />

<br/>

## 추천 매장 (Recommendation)

- 로그인 후 근처 추천 매장 없는 경우
- 로그인시 추천 매장(사용자 선호 기반 맞춤 추천)
- 카드 클릭시 지도 시각화
- 비로그인시 브랜드 없을 때
- 비로그인 브랜드 자동 스크롤

<img width="842" height="438" alt="추천 매장" src="https://github.com/user-attachments/assets/09fc3811-b418-4d1c-827e-0c07d4429b33" />

<br/>

## 마이페이지 (MyPage)

- 사용자 정보 조회 및 수정
- 관심 브랜드 및 카테고리 설정

<img width="479" height="480" alt="마이페이지" src="https://github.com/user-attachments/assets/e18a70ae-305a-4cb8-aa20-2281aa515808" />

- 개인화된 통계 확인

<img width="610" height="438" alt="개인화된 통계 확인" src="https://github.com/user-attachments/assets/4645552b-e695-4273-b1f2-c34299c93521" />

<br/>

## 바코드 (Barcode)

- 멤버십 혜택 사용 바코드 표시
- 앱 내 플로팅 버튼으로 접근
- 혜택 이용 시 자동 매장 기록

<img width="851" height="438" alt="바코드" src="https://github.com/user-attachments/assets/86cdd9fb-0a43-4762-9926-b152327432b7" />

<br/>

## 관리자(Admin)

### 관리자(LG U+) 통계 시스템
- 저장된 매장 통계 조회 기능
- 즐겨찾기 + My Map에 추가한 개수를 카테고리별, 브랜드별로 조회
- 필터링 통계 조회 기능
- 사용자들이 필터링을 사용한 횟수를 카테고리 별로 조회
- 추천 통계 조회 기능
- 멤버십 사용 통계 조회 기능

- 전체 통계 조회 기능
- 전체 사용자의 저장된 매장 수 합계 조회
- 전체 사용자의 필터링 합계 조회
- 전체 사용자의 멤버십 사용 합계 조회

<img width="977" height="426" alt="전체 통계" src="https://github.com/user-attachments/assets/3c8beb33-a7eb-40d1-8cc1-ecae03ad7da7" />


### 관리자(LG U+) 기능
- 제휴처 관리 시스템
- 제휴처 추가,조회,수정,삭제 기능
  
<img width="460" height="502" alt="조회" src="https://github.com/user-attachments/assets/822610bc-57f3-463b-9d60-2ad0198063ad" />
<img width="848" height="466" alt="추가, 수정, 삭제" src="https://github.com/user-attachments/assets/18fb234b-0e91-4abc-be7c-d61a79d7239f" />

<br/>

## Progressive Web App (PWA) 
- 앱 설치 가능: 별도 앱 마켓 없이도 홈 화면에 추가하여 빠르게 접근
- 지도 앱에 최적화된 경험: 위치 기반 기능을 자주 사용하는 사용자에게 앱 수준의 빠른 진입과 사용성을 제공
- 재방문율 향상: 설치된 앱은 사용자 유입을 꾸준히 유도

<img width="910" height="582" alt="스크린샷 2025-08-07 오후 2 00 52" src="https://github.com/user-attachments/assets/48a196c7-1055-4bbb-8a70-0a684b507920" />

<br/>

## 기술 스택

### 프레임워크 & 스타일
<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/shadcn/ui-111827?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge"/>
</p>
### 상태관리 & 통신
<p>
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zotero&logoColor=white"/>
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
</p>
### 개발 도구
<p>
  <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"/>
  <img src="https://img.shields.io/badge/Recharts-8884D8?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"/>
</p>

<br/>

## 협업 과정
- [프론트엔드 컨벤션](https://github.com/U-Final/U-Hyu-fe/wiki/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)
- [Git 컨벤션](https://github.com/U-Final/U-Hyu-fe/wiki/Git-%EC%BB%A8%EB%B2%A4%EC%85%98)

## QA
- [MyMap 기능 리팩토링](https://github.com/U-Final/U-Hyu-fe/wiki/MyMap-%EA%B8%B0%EB%8A%A5-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81)

<br/>

## 프로젝트 구조
- [Domain‐Driven 구조](https://github.com/U-Final/U-Hyu-fe/wiki/Domain%E2%80%90Driven-%EA%B5%AC%EC%A1%B0)
- [개발 구조 및 전략](https://github.com/U-Final/U-Hyu-fe/wiki/UHYU-(%EC%9C%A0%ED%9C%B4)-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C-%EA%B5%AC%EC%A1%B0-%EB%B0%8F-%EC%A0%84%EB%9E%B5)

```
src/
├── features/                     # 도메인(기능)별 핵심 비즈니스 로직
│   ├── user/                         # 사용자 관련 기능
│   │   ├── apis/
│   │   │   ├── userApi.ts
│   │   │   ├── types.ts
│   │   │   └── endpoints.ts      # API 경로 상수 정의
│   │   ├── hooks/
│   │   │   ├── useUserQuery.ts
│   │   ├── components/
│   │   └── index.ts
│   │
│   ├── feature_name/
│   │   ├── apis/          # 관련 API 함수 모음
│   │   ├── components/    # UI 컴포넌트
│   │   ├── hooks/         # 전용 커스텀 훅
│   │   ├── types/         # 관련 타입 정의
│   │   ├── constants/     # 상수
│   │   ├── index.ts       # 이 feature를 묶는 배럴스피너?
│   │   └── etc/           # 각자 필요하다고 생각되는 기타 폴더
│   │ 
├── shared/                       # 프로젝트 전역 공유 리소스
│   ├── components/                   # 버튼, 카드 등 공통 UI 컴포넌트
│   ├── hooks/                        # 전역 커스텀 훅
│   ├── store/                        # 전역 상태관리
│   ├── client                        # axios, query client, intercept 유틸 함수 등
│   ├── constants/                    # API_BASE_URL 등
│   └── types/                        # 여러 도메인에서 공유되는 전역 타입
│
├── pages/                        # 페이지 관련 (React Router 기준)
├── routes/                       # path 라우트 관련
└── index.tsx

```

<br/>

## 로컬 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

```

<br/>

## 프론트엔드 팀원 정보

| <img src="https://avatars.githubusercontent.com/u/198835896?v=4" width=150px> | <img src="https://avatars.githubusercontent.com/u/153170795?v=4" width=150px> | <img src="https://avatars.githubusercontent.com/u/138192341?v=4" width=150px> | <img src="https://avatars.githubusercontent.com/u/100357408?v=4" width=150px> |
| :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                  [박희준](https://github.com/heejun8)                   |                     [이혜은](https://github.com/ihyeeun)                     |                   [이다예](https://github.com/leedaye0412)                    |                    [한동찬](https://github.com/pillow12360)                     |
