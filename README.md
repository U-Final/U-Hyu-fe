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

<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="docs/gif/admin.gif" alt="Admin" width="400" />
      <div style="margin-top:6px; font-size:14px;">관리자 대시보드</div>
    </td>
  </tr>
</table>

### 브랜드 제휴 관리
- 제휴 브랜드 추가
- 제휴 브랜드 정보 수정
- 제휴 브랜드 삭제

### 플랫폼 통계
- DAU / MAU
- 카테고리, 브랜드별 추천 횟수 통계
- 카테고리, 브랜드별 멤버십 사용 횟수 통계
- 카테고리별 필터링 수 통계
- 카테고리, 브랜드별 즐겨찾기 수 통계

### 즐겨찾기 분석
- 전체 즐겨찾기 수
- 매장별 즐겨찾기 순위
- 카테고리 및 지역 분포

### 브랜드 성과 비교
- 방문률 / 할인 사용률 기반 비교

### 사용자 맞춤 통계
- 받은 혜택 금액, 관심 브랜드 분석 등

<br/>

## 기술 스택
- React 19
- TypeScript
- Tailwind CSS
- Zustand, Tanstack-query
- Storybook
- Prettier, ESLint, Husky

<br/>

## 협업 과정
- [프론트엔드 컨벤션](https://github.com/U-Final/U-Hyu-fe/wiki/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)
- [Git 컨벤션](https://github.com/U-Final/U-Hyu-fe/wiki/Git-%EC%BB%A8%EB%B2%A4%EC%85%98)

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
npm run build
npm run dev
```

<br/>

## 프론트엔드 팀원 정보

| <img src="https://avatars.githubusercontent.com/u/198835896?v=4" width=150px> | <img src="https://avatars.githubusercontent.com/u/153170795?v=4" width=150px> | <img src="https://avatars.githubusercontent.com/u/138192341?v=4" width=150px> | <img src="https://avatars.githubusercontent.com/u/100357408?v=4" width=150px> |
| :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                  [박희준](https://github.com/heejun8)                   |                     [이혜은](https://github.com/ihyeeun)                     |                   [이다예](https://github.com/leedaye0412)                    |                    [한동찬](https://github.com/pillow12360)                     |
