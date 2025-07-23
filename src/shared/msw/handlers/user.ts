import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

export const userHandlers = [
  http.post('/users/check-email', async ({ request }) => {
    const body = (await request.json()) as { email: string };
    const email = body.email;

    // 에러 시나리오: 잘못된 이메일 형식
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return createErrorResponse('올바른 이메일 형식이 아닙니다', 400);
    }

    // 테스트용: 특정 이메일들을 이미 사용중으로 처리
    const usedEmails = ['test@example.com', 'used@email.com'];
    const isAvailable = email ? !usedEmails.includes(email) : false;

    return createResponse(
      {
        isAvailable,
        email,
      },
      isAvailable ? '사용 가능한 이메일입니다' : '이미 사용중인 이메일입니다',
      0
    );
  }),

  http.post('/users/extra-info', async ({ request }) => {
    try {
      const body = (await request.json()) as {
        grade?: string;
        recentBrands?: string[];
        interestedBrands?: string[];
      };

      // 에러 시나리오: 필수 필드 누락
      if (!body.grade || !body.recentBrands || !body.interestedBrands) {
        return createErrorResponse('필수 입력 항목이 누락되었습니다', 400);
      }

      // 유효성 검사 등 필요시 추가
      return createResponse('SUCCESS', '회원가입 추가정보 입력 성공', 0);
    } catch (error) {
      console.error('Extra info submission error:', error);
      return createErrorResponse('서버 내부 오류가 발생했습니다', 500);
    }
  }),
];
