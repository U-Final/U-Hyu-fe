import { MYPAGE_ENDPOINTS } from '@/features/mypage/api/endpoints';
import { mockUserInfoData, mockUpdateUserResponse } from '@/features/mypage/api/mockData';
import { http, HttpResponse } from 'msw';
import type { UpdateUserRequest } from '@/features/mypage/api/types';
import type { ApiResponse } from '@/shared/client/client.type';
import { delay } from 'msw';

const createResponse = <T>(result: T, message: string): ApiResponse<T> => ({
  statusCode: 0,
  message,
  data: result,
});

export const mypageHandlers = [
  // 개인정보 수정
  http.patch(MYPAGE_ENDPOINTS.MYPAGE.UPDATE_USER, async ({ request }) => {
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

    // mockUserInfoData 업데이트
    if (body.updatedNickName) mockUserInfoData.nickName = body.updatedNickName;
    if (body.updatedGrade) mockUserInfoData.grade = body.updatedGrade;
    if (body.updatedBrandIdList) mockUserInfoData.brandIdList = body.updatedBrandIdList;
    mockUserInfoData.updatedAt = new Date().toISOString();
    
    await delay(300);
    return HttpResponse.json(createResponse(mockUpdateUserResponse, '정상 처리 되었습니다.'));
  }),
  
  // 개인정보 조회
  http.get(MYPAGE_ENDPOINTS.MYPAGE.USER_INFO, () =>
    HttpResponse.json(createResponse(mockUserInfoData, '정상 처리 되었습니다.'))
  ),
]; 