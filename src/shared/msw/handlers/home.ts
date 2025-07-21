import { createErrorResponse } from "@/shared/utils/createErrorResponse";
import { createResponse } from "@/shared/utils/createResponse";
import { HOME_ENDPOINTS } from "@home/api/endpoints";
import { mockBenefitsData, mockNearbyStoresData, mockUserInfoData } from "@home/api/mockData";
import { http } from "msw";


export const homeHandlers = [
  http.get(HOME_ENDPOINTS.HOME.USER_INFO, () => {
    const shouldFail = false;
    if (shouldFail) { //실패시
      return createErrorResponse('로그인된 유저가 아닙니다.', 404);
    }

    return createResponse(  
      mockUserInfoData,
      "유저 정보 조회 성공",
    )
  }),

  // http.get(HOME_ENDPOINTS.HOME.RECOMMENDATIONS, () => {
  //   return HttpResponse.json(mockRecommendationData);
  // }),

  http.get(HOME_ENDPOINTS.HOME.NEARBY_STORES, () => {
    const shouldFail = false;
    if (shouldFail) { //실패시
      return createErrorResponse('주변매장 조회 실패', 400);
    }

    return createResponse(mockNearbyStoresData, "주변 매장 조회 성공")
  }),

  // 4. 멤버십 혜택
  // /home/benefits?grade=VIP 같은 요청을 보냄
  http.get(HOME_ENDPOINTS.HOME.BENEFITS, ({ request }) => {
    const url = new URL(request.url);
    const grade = url.searchParams.get("grade");

    const shouldFail = false;
    if (shouldFail) { //실패시
      return createErrorResponse('등급 혜택 조회 실패', 400);
    }

    return createResponse(mockBenefitsData, `${grade} 등급 혜택 조회 성공`);
  }),
];

/**
[로그인 유저 기준 흐름]
  1. 페이지 진입
  2. client.get('/user/me') → 유저 정보 받아오기 (ex. 혜은, VVIP)
  3. 위치 확인 (navigator.geolocation.getCurrentPosition)
  4. 좌표 기반 nearby store 요청
    → /home/nearby-stores?lat=...&lng=...&radius=1000
  5. 추천 리스트 요청
    → /home/recommendations?brandId=11 or grade=VVIP
  6. 등급 혜택 요청
    → /home/benefits?grade=VVIP
 */