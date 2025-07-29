import { MYPAGE_ENDPOINTS } from '@/features/mypage/api/endpoints';
import { mockUserInfoData, mockUpdateUserResponse } from '@/features/mypage/api/mockData';
import { http, HttpResponse } from 'msw';
import type { UpdateUserRequest } from '@mypage/api/types';
import type { ApiResponse } from '@/shared/client/client.type';
import { delay } from 'msw';
import { mockActivityStatistics, mockBookmarks } from '@/features/mypage/types/mockActivity';

const createResponse = <T>(result: T, message: string): ApiResponse<T> => ({
  statusCode: 0,
  message,
  data: result,
});

export const mypageHandlers = [
  // 개인정보 수정
  http.patch(MYPAGE_ENDPOINTS.UPDATE_USER, async ({ request }) => {
    const body = (await request.json()) as Partial<UpdateUserRequest>;
    
    console.log('🔧 MSW PATCH 요청 받음:', body);
    console.log('🔧 현재 mockUserInfoData:', mockUserInfoData);

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

    // mockUserInfoData 복사본 생성 및 업데이트
    const updatedData = { ...mockUserInfoData };
    if (body.updatedNickName) {
      updatedData.nickName = body.updatedNickName;
      console.log('✅ 닉네임 업데이트:', body.updatedNickName);
    }
    if (body.updatedGrade) {
      updatedData.grade = body.updatedGrade;
      console.log('✅ 등급 업데이트:', body.updatedGrade);
    }
    if (body.updatedBrandIdList) {
      updatedData.brandIdList = body.updatedBrandIdList;
      console.log('✅ 브랜드 업데이트:', body.updatedBrandIdList);
    }
    updatedData.updatedAt = new Date().toISOString();
    
    // 전역 mock 데이터 업데이트
    Object.assign(mockUserInfoData, updatedData);
    
    console.log('🔧 업데이트 후 mockUserInfoData:', mockUserInfoData);
    
    await delay(300);
    return HttpResponse.json(createResponse(mockUpdateUserResponse, '정상 처리 되었습니다.'));
  }),
  
  // 개인정보 조회
  http.get(MYPAGE_ENDPOINTS.USER_INFO, () => {
    console.log('🔧 MSW GET 요청 - 현재 mockUserInfoData:', mockUserInfoData);
    return HttpResponse.json(createResponse(mockUserInfoData, '정상 처리 되었습니다.'));
  }),

  // --- 액티비티: 활동내역 조회 ---
  http.get(MYPAGE_ENDPOINTS.STATISTICS, async () => {
    await delay(200);
    return HttpResponse.json(createResponse(mockActivityStatistics, '정상 처리 되었습니다.'));
  }),

  // --- 액티비티: 즐겨찾기 리스트 조회 ---
  http.get(MYPAGE_ENDPOINTS.BOOKMARK_LIST, async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const size = parseInt(url.searchParams.get('size') || '5', 10);
    const start = (page - 1) * size;
    const end = start + size;
    const paged = mockBookmarks.slice(start, end);
    await delay(200);
    return HttpResponse.json(createResponse(paged, '정상 처리 되었습니다.'));
  }),

  // --- 액티비티: 즐겨찾기 삭제 ---
  http.delete(MYPAGE_ENDPOINTS.BOOKMARK_DETAIL(), async ({ params }) => {
    const { bookmarkId } = params;
    // 실제로 mockBookmarks에서 해당 id를 삭제
    const idx = mockBookmarks.findIndex(b => b.bookmarkId === Number(bookmarkId));
    if (idx !== -1) {
      mockBookmarks.splice(idx, 1);
    }
    await delay(200);
    return HttpResponse.json({
      statusCode: 0,
      message: '정상 처리 되었습니다.',
      data: 'BOOKMARK_DELETE_SUCCESS',
    });
  }),
]; 