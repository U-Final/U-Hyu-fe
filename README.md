# 🗺️ U-Hyu 프론트엔드

**주변 멤버십 혜택을 지도로 탐색하고, 다른 사람들과 매장을 공유하는 위치 기반 플랫폼**

---

## 📌 기능 요약

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
| 어드민(관리자)   | 제휴 매장/사용자 통계, 통계 분석 대시보드 (구현 중) |

---

## 🧑‍💼 회원 관리

<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/a6bf8fe4-26c3-4b4d-9184-f41f90655e7a" width="360" />
      <div style="margin-top:6px; font-size:14px;">카카오 로그인</div>
    </td>
  </tr>
</table>

- **소셜 로그인**: 카카오 OAuth
- **인증 처리**: JWT 기반 액세스/리프레시 토큰
- **최초 가입 설문**: 선호/이용 브랜드 입력
- **역할 기반 권한 관리**: 사용자 / 관리자
- **멤버십 등급 관리**: 우수, VIP, VVIP

---

## 🗺️ 지도 서비스 (Map)

<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/7807acda-0561-430b-bd10-25b18021c513" width="400" />
      <div style="margin-top:6px; font-size:14px;">지도 UI</div>
    </td>
  </tr>
</table>

### 지도 기반 매장 탐색
- 현재 위치 기반 제휴 매장 마커 표시
- 줌 레벨별 클러스터링 처리 (구현 중)
- 마커 클릭 시 상세 인포윈도우 렌더링 제공
- 혜택 별 카테고리 및 사용 조건 정보 제공
- 지역 드롭다운 메뉴를 통한 지역 이동

---

### 카테고리 / 브랜드 필터
<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/2ab3e522-2832-4854-8c05-f5daa2fa3052" width="360" />
      <div style="margin-top:6px; font-size:14px;">브랜드 필터</div>
    </td>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/f1bb62db-19ad-42e4-9340-2658d5ba697a" width="360" />
      <div style="margin-top:6px; font-size:14px;">카테고리 필터</div>
    </td>
  </tr>
</table>

- 브랜드별 키워드 검색
- 카테고리 / 브랜드별 필터링 기능
- 거리 기반 매장 검색

---

### 키워드 검색

<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/da795d90-f8db-42d3-9ac3-1190db89210e" width="400" />
      <div style="margin-top:6px; font-size:14px;">키워드 검색 결과</div>
    </td>
  </tr>
</table>

- 카카오 Place API 연동
- 검색 결과 마커 시각화 및 간단 정보 노출
- 카테고리별 마커 아이콘 및 색상 매핑

---

## 📌 마이맵 (MyMap)

<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/e8520c5e-ca19-4d62-96a6-777aaa33e50f" width="400" />
      <div style="margin-top:6px; font-size:14px;">마이맵 UI</div>
    </td>
  </tr>
</table>

### MyMap 폴더 관리
- 폴더 생성/삭제
- 폴더 프리셋 색상 선택
- 폴더명 최대 10자 제한
  
### MyMap 및 즐겨찾기 매장 관리
- 지도에서 매장 선택 후 폴더에 추가/삭제
- 지도에서 매장 선택 후 즐겨찾기에 추가/삭제

### 시각화
- 폴더별 매장 마커 시각화
- 카드 클릭 시 지도 위치 이동

### 공유 시스템
- UUID 기반 링크 생성
- 짧은 URL (`u-hyu.app/map/:uuid`) 제공
- 카카오톡 공유하기

---

## 💎 혜택 조회 (Benefit)

<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/a34c7261-ce33-4b96-9652-5bc17229d17e" width="400" />
      <div style="margin-top:6px; font-size:14px;">혜택 조회</div>
    </td>
  </tr>
</table>

- 멤버십 등급별 혜택 리스트 및 상세 제공
- 혜택 조건, 사용 방법 등 안내
- 제휴처 검색 기능
- 카테고리 필터 + 다중 조건 필터링 지원

---

## 🌟 추천 매장 (Recommendation)

<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/4ee24595-60cc-449f-895f-6e96e86b9f5c" width="400" />
      <div style="margin-top:6px; font-size:14px;">추천 매장 UI</div>
    </td>
  </tr>
</table>

- 사용자 선호 기반 맞춤 추천
- 추천 매장 지도 시각화 (구현 중)

---

## 🙋‍♂️ 마이페이지 (MyPage)

<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/97e38831-7a70-46b9-ba24-750ae729a89a" width="400" />
      <div style="margin-top:6px; font-size:14px;">마이페이지 UI</div>
    </td>
  </tr>
</table>

- 사용자 정보 조회 및 수정
- 관심 브랜드 및 카테고리 설정
- 개인화된 통계 확인 (예정)

---

## 🎫 바코드 (Barcode)

<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/0b02fb71-3ccc-469c-92c8-2bedd4cea760" width="400" />
      <div style="margin-top:6px; font-size:14px;">바코드 기능</div>
    </td>
  </tr>
</table>

- 멤버십 혜택 사용 바코드 표시
- 앱 내 플로팅 버튼으로 접근
- 혜택 이용 시 자동 매장 기록

---

## ➕ 추가 정보 입력 (Extra Info)

<table>
  <tr>
    <td style="border:1px solid #ccc; border-radius:8px; padding:8px; text-align:center;">
      <img src="https://github.com/user-attachments/assets/de887acb-9594-47fd-84dd-309d32db00a3" width="400" />
      <div style="margin-top:6px; font-size:14px;">온보딩 입력 화면</div>
    </td>
  </tr>
</table>

- 이메일, 관심 브랜드, 멤버십 등급 등 입력
- 사용자 맞춤 추천을 위한 온보딩 설계

---

## 🛠️ 관리자(Admin) *(구현 중)*

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
