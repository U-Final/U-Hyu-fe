import { MYPAGE_ENDPOINTS } from '@/features/mypage/api/endpoints';
import { mockUserInfo } from '@/features/mypage/api/mockData';
import { http, HttpResponse } from 'msw';
import type { UpdateUserRequest } from '@/features/mypage/api/types';
import type { ApiResponse } from '@/shared/client/client.type';
import { delay } from 'msw';

const createResponse = <T>(result: T, message: string): ApiResponse<T> => ({
  statusCode: 200,
  message,
  data: result,
});

export const mypageHandlers = [
  // 개인정보 수정
  http.patch(MYPAGE_ENDPOINTS.USER_INFO, async ({ request }) => {
    const body = (await request.json()) as Partial<UpdateUserRequest>;

    // 에러 케이스: 잘못된 등급
    if (body.updatedGrade && !['VVIP', 'VIP', 'GOOD'].includes(body.updatedGrade)) {
      return new HttpResponse(
        JSON.stringify({
          statusCode: 400,
          message: '잘못된 등급입니다.',
          data: null,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 닉네임 필수 검증 (필요한 경우)
    if (body.updatedNickName !== undefined && !body.updatedNickName?.trim()) {
      return new HttpResponse(
        JSON.stringify({
          statusCode: 400,
          message: '닉네임은 필수입니다.',
          data: null,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (body.updatedProfileImage) mockUserInfo.profileImage = body.updatedProfileImage;
    if (body.updatedNickName) mockUserInfo.nickName = body.updatedNickName;
    if (body.updatedGrade) mockUserInfo.grade = body.updatedGrade;
    if (body.updatedBrandIdList) mockUserInfo.brandIds = body.updatedBrandIdList;
    if (body.markerId) mockUserInfo.marker = { ...mockUserInfo.marker, id: body.markerId };
    mockUserInfo.updatedAt = new Date().toISOString();
    await delay(300);
    return HttpResponse.json(createResponse({ userId: mockUserInfo.id }, '개인정보 수정 성공'));
  }),
  // 개인정보 조회
  http.get(MYPAGE_ENDPOINTS.USER_INFO, () =>
    HttpResponse.json(createResponse(mockUserInfo, '유저 정보 조회 성공'))
  ),


]; 