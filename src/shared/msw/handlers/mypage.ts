import { MYPAGE_ENDPOINTS } from '@/features/mypage/api/endpoints';
import {
  mockUpdateUserResponse,
  mockUserInfoData,
} from '@/features/mypage/api/mockData';
import {
  mockActivityStatistics,
  mockBookmarks,
} from '@/features/mypage/types/mockActivity';
import type { UpdateUserRequest } from '@mypage/api/types';
import { HttpResponse, http } from 'msw';
import { delay } from 'msw';

import type { ApiResponse } from '@/shared/client/client.type';

const createResponse = <T>(result: T, message: string): ApiResponse<T> => ({
  statusCode: 0,
  message,
  data: result,
});

export const mypageHandlers = [
  http.patch(MYPAGE_ENDPOINTS.UPDATE_USER, async ({ request }) => {
    const body = (await request.json()) as Partial<UpdateUserRequest>;

    if (
      body.updatedGrade &&
      !['VVIP', 'VIP', 'GOOD'].includes(body.updatedGrade)
    ) {
      return new HttpResponse(
        JSON.stringify({
          statusCode: 400,
          message: '잘못된 등급입니다.',
          data: null,
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

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

    const updatedData = { ...mockUserInfoData };
    if (body.updatedNickName) {
      updatedData.nickName = body.updatedNickName;
    }
    if (body.updatedGrade) {
      updatedData.grade = body.updatedGrade;
    }
    if (body.updatedBrandIdList) {
      updatedData.interestedBrandList = body.updatedBrandIdList;
    }
    updatedData.updatedAt = new Date().toISOString();

    Object.assign(mockUserInfoData, updatedData);

    await delay(300);
    return HttpResponse.json(
      createResponse(mockUpdateUserResponse, '정상 처리 되었습니다.')
    );
  }),

  http.get(MYPAGE_ENDPOINTS.USER_INFO, () => {
    return HttpResponse.json(
      createResponse(mockUserInfoData, '정상 처리 되었습니다.')
    );
  }),

  http.get(MYPAGE_ENDPOINTS.STATISTICS, async () => {
    await delay(200);
    return HttpResponse.json(
      createResponse(mockActivityStatistics, '정상 처리 되었습니다.')
    );
  }),

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

  http.delete(MYPAGE_ENDPOINTS.BOOKMARK_DETAIL(), async ({ params }) => {
    const { bookmarkId } = params;
    const idx = mockBookmarks.findIndex(
      b => b.bookmarkId === Number(bookmarkId)
    );
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
