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

<p>
  <img height="400" alt="온보딩" src="https://github.com/user-attachments/assets/6ef043c0-9099-4f3d-a8d6-c83ff2a81f9a" />
  <img height="400" alt="온보딩" src="https://github.com/user-attachments/assets/11767289-b84b-467e-ad03-3c5bf6ae9e7c" />
  <img height="400" alt="온보딩" src="https://github.com/user-attachments/assets/ef8de2e4-7fe4-47f9-a4ed-b1c7079087e4" />
  <img height="400" alt="온보딩" src="https://github.com/user-attachments/assets/48cc2f04-bc7b-4bf4-9dd3-562cd3f635a1" />
</p>
<p>
  <img height="400" alt="카카오" src="https://github.com/user-attachments/assets/5b58ee56-a46b-4453-aa2d-995dc021597e" />
  <img height="400" alt="카카오" src="https://github.com/user-attachments/assets/4d0a9d70-9665-490f-8638-9fd74ea84a67" />
  <img height="400" alt="카카오" src="https://github.com/user-attachments/assets/ea5f5d78-c46c-48fe-8e57-e582372af64f" />
  <img height="400" alt="카카오" src="https://github.com/user-attachments/assets/ea74a190-f23f-4a98-a23e-6c69fb09c79b" />
</p>


<br/>


## 지도 서비스 (Map)



### 지도 기반 매장 탐색
- 현재 위치 기반 제휴 매장 마커 표시
- 줌 레벨별 클러스터링 처리
- 마커 클릭 시 상세 인포윈도우 렌더링 제공
- 혜택 별 카테고리 및 사용 조건 정보 제공
- 지역 드롭다운 메뉴를 통한 지역 이동

<p>
  <img height="400" alt="지도 기반 매장 탐색" src="https://github.com/user-attachments/assets/9a924d6f-f390-4ba4-9a0d-c5375b2f2286" />
  <img height="400" alt="지도 기반 매장 탐색" src="https://github.com/user-attachments/assets/3eac0cfc-ff69-4ad6-bb17-8ca21918cb4a" />
  <img height="400" alt="지도 기반 매장 탐색" src="https://github.com/user-attachments/assets/142b002d-1b16-4f0e-a260-76df7af920ff" />
  <img height="400" alt="지도 기반 매장 탐색" src="https://github.com/user-attachments/assets/330e6bd0-17e3-4196-89ab-38245830f6cb" />
</p>



### 카테고리 / 브랜드 필터

- 브랜드별 키워드 검색
- 카테고리 / 브랜드별 필터링 기능
- 거리 기반 매장 검색

<p>
  <img height="400" alt="카테고리 / 브랜드 필터" src="https://github.com/user-attachments/assets/7287c1e5-5b18-488e-8137-00a681304420" />
  <img height="400" alt="카테고리 / 브랜드 필터" src="https://github.com/user-attachments/assets/0a3e1325-2bf6-4f82-8dcd-3c43da56ae9e" />
  <img height="400" alt="카테고리 / 브랜드 필터" src="https://github.com/user-attachments/assets/3842d9ad-b80e-4732-bc4d-f9be4393102d" />
  <img height="400" alt="카테고리 / 브랜드 필터" src="https://github.com/user-attachments/assets/3822a61c-e689-4b0c-844b-c8ab2eedc05b" />
</p>



### 키워드 검색

- 카카오 Place API 연동
- 검색 결과 마커 시각화 및 간단 정보 노출
- 카테고리별 마커 아이콘 및 색상 매핑

<p>
  <img height="400" alt="키워드 검색" src="https://github.com/user-attachments/assets/f1a6b793-335b-46f3-ba99-cf9444705a34" />
  <img height="400" alt="키워드 검색" src="https://github.com/user-attachments/assets/1a08eeff-1f36-4ef1-b1f0-8fea5356295f" />
</p>


<br/>

## 마이맵 (MyMap)

### MyMap 폴더 관리
- 폴더 생성/삭제
- 폴더 테마 선택
- 폴더명 최대 10자 제한

<p>
  <img height="400" alt="MyMap 폴더 관리" src="https://github.com/user-attachments/assets/ae483714-e5f8-4d2b-a6bb-5535e9ef035d" />
  <img height="400" alt="MyMap 폴더 관리" src="https://github.com/user-attachments/assets/dc146c0d-e310-4071-a715-23447325a234" />
  <img height="400" alt="MyMap 폴더 관리" src="https://github.com/user-attachments/assets/6347f7f7-d3fd-4946-97ce-1b5b9beea9ee" />
  <img height="400" alt="MyMap 폴더 관리" src="https://github.com/user-attachments/assets/904f400d-98e7-48bd-b256-5864219ab877" />
</p>
<p>
  <img height="400" alt="MyMap 폴더 관리" src="https://github.com/user-attachments/assets/91c86455-0f18-4347-bc0d-90ac3a756738" />
  <img height="400" alt="MyMap 폴더 관리" src="https://github.com/user-attachments/assets/04eacbad-4e08-45a5-845d-0671da393688" />
</p>

  
### MyMap 매장 관리 및 시각화
- 지도에서 매장 선택 후 폴더에 추가/삭제
- 폴더별 매장 마커 시각화
- 카드 클릭 시 지도 위치 이동

<p>
  <img height="400" alt="MyMap 매장 관리 및 시각화" src="https://github.com/user-attachments/assets/d6396f5d-e0c2-478d-a839-ccc367be3e50" />
  <img height="400" alt="MyMap 매장 관리 및 시각화" src="https://github.com/user-attachments/assets/772d35ab-5ce1-4798-968b-901c8083a25c" />
  <img height="400" alt="MyMap 매장 관리 및 시각화" src="https://github.com/user-attachments/assets/13025aef-d49d-4537-9dea-d52d3176d3b0" />
  <img height="400" alt="MyMap 매장 관리 및 시각화" src="https://github.com/user-attachments/assets/ec6f82c9-f9bb-45cc-af46-3f7768b15df6" />
  <img height="400" alt="MyMap 매장 관리 및 시각화" src="https://github.com/user-attachments/assets/e6fac43c-4d6f-4fa7-80b3-4d9c8dc84a16" />
</p>
<p>
  <img height="400" alt="MyMap 매장 관리 및 시각화" src="https://github.com/user-attachments/assets/96626bd7-681f-470e-aeba-956e413fdcaa" />
  <img height="400" alt="MyMap 매장 관리 및 시각화" src="https://github.com/user-attachments/assets/f7614fe0-9a22-4e81-a6f2-294aab4e38b6" />
</p>



### 즐겨찾기 매장 관리 및 토글
- 지도에서 매장 선택 후 폴더에 추가/삭제
- 즐겨찾기 토글로 지도화면에서 즐겨찾기 마커
<p>
  <img height="400" alt="즐겨찾기 매장 관리 및 토글" src="https://github.com/user-attachments/assets/4b4b15f7-a91e-44e4-af05-4a92d25359e5" />
  <img height="400" alt="즐겨찾기 매장 관리 및 토글" src="https://github.com/user-attachments/assets/7b4b70da-769c-4665-8d2c-32e2e36b4197" />
  <img height="400" alt="즐겨찾기 매장 관리 및 토글" src="https://github.com/user-attachments/assets/c174743c-8e7c-4b71-9177-5eca544295e4" />
</p>


### 공유 시스템
- UUID 기반 링크 생성
- 짧은 URL (`u-hyu.app/map/:uuid`) 제공
- 카카오톡 공유하기

<p>
  <img height="400" alt="공유 시스템" src="https://github.com/user-attachments/assets/2592797b-f760-42d0-9e96-f0b0fc252ca1" />
  <img height="400" alt="공유 시스템" src="https://github.com/user-attachments/assets/3e2ac152-5fed-4bf8-840a-b78161273141" />
  <img height="400" alt="공유 시스템" src="https://github.com/user-attachments/assets/fcb0beae-3850-45cc-b22e-6354faa0d0f2" />
  <img height="400" alt="공유 시스템" src="https://github.com/user-attachments/assets/dd0d631d-5bf2-4f6c-a0d0-5e3306ad9357" />
</p>

<br/>

## 혜택 조회 (Benefit)

- 멤버십 등급별 혜택 리스트 및 상세 제공
- 혜택 조건, 사용 방법 등 안내
- 제휴처 검색 기능
- 카테고리 필터 + 다중 조건 필터링 지원

<p>
  <img height="400" alt="혜택 조회" src="https://github.com/user-attachments/assets/db3cd538-12d9-4ba4-8250-a343435b47a2" />
  <img height="400" alt="혜택 조회" src="https://github.com/user-attachments/assets/c9a50b06-f3ef-4027-a3f6-27204be4ee1e" />
  <img height="400" alt="혜택 조회" src="https://github.com/user-attachments/assets/25e61e03-6282-4a7b-818b-70f56aa7369d" />
  <img height="400" alt="혜택 조회" src="https://github.com/user-attachments/assets/e76896a1-9446-4a14-bd4d-5e1e0b1f872d" />
</p>

<br/>

## 추천 매장 (Recommendation)

- 로그인 후 근처 추천 매장 없는 경우
- 로그인시 추천 매장(사용자 선호 기반 맞춤 추천)
- 카드 클릭시 지도 시각화
- 비로그인시 브랜드 없을 때
- 비로그인 브랜드 자동 스크롤

<p>
  <img height="400" alt="추천 매장" src="https://github.com/user-attachments/assets/992a726f-8767-490e-a522-9ab0fdcffd10" />
  <img height="400" alt="추천 매장" src="https://github.com/user-attachments/assets/94bf17e3-e5ab-424c-b3bf-680f1322f25e" />
  <img height="400" alt="추천 매장" src="https://github.com/user-attachments/assets/3534beec-a255-4acc-91d4-1cb273b804bc" />
</p>

<br/>

## 마이페이지 (MyPage)

- 사용자 정보 조회 및 관리
- 멤버십 등급 및 관심 브랜드 선택/해제

<p>
  <img height="400" alt="마이페이지" src="https://github.com/user-attachments/assets/0cfb3a2f-08c8-497a-a2f1-cf23608717d2" />
  <img height="400" alt="마이페이지" src="https://github.com/user-attachments/assets/69d727fe-97a3-46dc-8379-1b94cb3e776c" />
</p>

- 개인별 활동내역 확인 (총 멤버십 사용 혜택 금액, 사용자 클릭 패턴 관심사 결과, 최근 방문 기록)
- 즐겨찾기 목록 조회 및 관리 (즐겨찾기 내역이 없을 시, 지도 페이지로 이동 유도 UI)
- UX/UI 기반 반응형 토글 탭 화면 전환 기능

<p>
  <img height="400" alt="총 멤버십 사용 혜택 금액" src="https://github.com/user-attachments/assets/d3663eac-1fd4-453a-8b38-fd27cec5941d" />
  <img height="400" alt="사용자 클릭 패턴 관심사 결과" src="https://github.com/user-attachments/assets/b9422923-8d83-445e-9462-13836684ff57" />
  <img height="400" alt="최근 방문 기록" src="https://github.com/user-attachments/assets/7ca47f4e-1bd9-487c-b537-b774b088080c" />
  <img height="400" alt="즐겨찾기" src="https://github.com/user-attachments/assets/e2cdfd29-591b-4b53-b4f2-e3252821cb53" />
</p>

<br/>

## 바코드 (Barcode)

- 멤버십 혜택 사용 바코드 표시
- 앱 내 플로팅 버튼으로 접근
- 혜택 이용 시 자동 매장 기록

<p>
  <img height="400" alt="바코드" src="https://github.com/user-attachments/assets/6c49a088-0ff9-401d-bbcc-f488b3607cdb" />
  <img height="400" alt="바코드" src="https://github.com/user-attachments/assets/66118381-64fc-4725-86ca-d27cb86501bf" />
  <img height="400" alt="바코드" src="https://github.com/user-attachments/assets/85a8998c-f7ad-4591-956c-e14b735f9df8" />
  <img height="400" alt="바코드" src="https://github.com/user-attachments/assets/9a131447-cc6e-4253-95b9-7a744c159fe4" />
</p>

<br/>

## 관리자(Admin)

### 관리자(LG U+) 통계 시스템

- U-HYU 전체 통계 조회 기능
- 전체 사용자의 저장된 매장 수 합계 조회 (즐겨찾기 + MyMap) 
- 전체 사용자의 필터링 합계 조회
- 전체 사용자의 멤버십 사용 합계 조회
- 저장된 매장 통계 상세 조회 기능 (저장된 매장, 필터링, 추천, 멤버십)
- 카테고리별 브랜드 상세 조회
- 차트 시각화와 데이터 크기순 정렬로 인한 직관적 분석 (tooltip 적용)
- 카테고리 및 해당 브랜드별 정확한 수치 나열

<p>
  <img height="400" alt="전체 통계" src="https://github.com/user-attachments/assets/5d155191-e967-478d-a9d9-04dcbbb6aad8" />
  <img height="400" alt="저장된 매장 통계" src="https://github.com/user-attachments/assets/300132aa-1364-47f2-8acf-302678978769" />
  <img height="400" alt="카테고리별 브랜드 상세" src="https://github.com/user-attachments/assets/a4e0d22f-067e-45aa-821c-2001731643db" />
  <img height="400" alt="필터링" src="https://github.com/user-attachments/assets/b9cd3607-93cb-45e2-9284-70437ba34446" />
  <img height="400" alt="멤버십 사용" src="https://github.com/user-attachments/assets/17920562-a994-4f92-8f1a-43ecb9388ac3" />
</p>

### 관리자(LG U+) 기능
- 제휴처 관리 시스템
- 검색 및 필터링으로 인한 실시간 조회
- 제휴처 추가,조회,수정,삭제 기능
- UX/UI 기반 반응형 토글 탭 화면 전환 기능
  
<p>
  <img height="400" alt="수정" src="https://github.com/user-attachments/assets/894af426-ba3e-4946-b5fc-8db274a64ed0" />
  <img height="400" alt="수정" src="https://github.com/user-attachments/assets/4381ea93-8897-4824-a7f3-91f7698b6e56" />
  <img height="400" alt="수정" src="https://github.com/user-attachments/assets/034d0c4f-a99e-4759-8428-72a4b2809048" />
  <img height="400" alt="수정" src="https://github.com/user-attachments/assets/57a15684-4be8-46dc-a4b4-686ccf7ce5d3" />
</p>

<p>
  <img height="400" alt="조회" src="https://github.com/user-attachments/assets/705601b5-7034-4d4f-a8c8-cd861ed1ea13" />
  <img height="400" alt="조회" src="https://github.com/user-attachments/assets/4a0a1d5d-fa8a-4501-a8b0-075b8b8ae33f" />
</p>



<br/>

## Progressive Web App (PWA) 
- 앱 설치 가능: 별도 앱 마켓 없이도 홈 화면에 추가하여 빠르게 접근
- 지도 앱에 최적화된 경험: 위치 기반 기능을 자주 사용하는 사용자에게 앱 수준의 빠른 진입과 사용성을 제공
- 재방문율 향상: 설치된 앱은 사용자 유입을 꾸준히 유도

<p>
  <img height="400" alt="PWA" src="https://github.com/user-attachments/assets/f500288f-0af3-4ac4-a2cf-c0b0b26ad8c9" />
  <img height="400" alt="PWA" src="https://github.com/user-attachments/assets/c6564e26-dd98-4bf3-aa14-63421c2fc1d8" />
  <img height="400" alt="PWA" src="https://github.com/user-attachments/assets/59e281d8-fa10-421c-901e-35ca52f56458" />
</p>

<br/>

## 기술 스택

<h3>프레임워크 & 스타일</h3>
<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/shadcn/ui-111827?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge"/>
</p>
<h3>상태관리 & 통신</h3>
<p>
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zotero&logoColor=white"/>
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
</p>
<h3>개발 도구</h3>
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
