import { http } from 'msw';

import { createErrorResponse } from '@/shared/utils/createErrorResponse';
import { createResponse } from '@/shared/utils/createResponse';

export const userHandlers = [
  http.post('/user/check-email', async ({ request }) => {
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

  http.post('/user/onboarding', async ({ request }) => {
    try {
      const body = (await request.json()) as {
        age?: number;
        gender?: 'MALE' | 'FEMALE' | 'OTHER';
        grade?: 'GOOD' | 'VIP' | 'VVIP';
        recentBrands?: number[];
        interestedBrands?: number[];
      };

      // 에러 시나리오: 필수 필드 누락 검증
      const missingFields = [];
      if (!body.age || body.age <= 0) missingFields.push('age');
      if (!body.gender) missingFields.push('gender');
      if (!body.grade) missingFields.push('grade');
      if (!body.recentBrands || body.recentBrands.length === 0)
        missingFields.push('recentBrands');
      if (!body.interestedBrands || body.interestedBrands.length === 0)
        missingFields.push('interestedBrands');

      if (missingFields.length > 0) {
        return createErrorResponse(
          `필수 입력 항목이 누락되었습니다: ${missingFields.join(', ')}`,
          400
        );
      }

      // 유효성 검사: 나이 범위
      if (body.age! < 10 || body.age! > 100) {
        return createErrorResponse(
          '나이는 10세 이상 100세 이하여야 합니다',
          400
        );
      }

      // 유효성 검사: 성별 값
      if (!['MALE', 'FEMALE', 'OTHER'].includes(body.gender!)) {
        return createErrorResponse('올바른 성별 값이 아닙니다', 400);
      }

      // 유효성 검사: 등급 값
      if (!['GOOD', 'VIP', 'VVIP'].includes(body.grade!)) {
        return createErrorResponse('올바른 등급 값이 아닙니다', 400);
      }

      // 유효성 검사: 브랜드 ID 배열
      if (
        !Array.isArray(body.recentBrands) ||
        !Array.isArray(body.interestedBrands)
      ) {
        return createErrorResponse('브랜드 정보는 배열 형태여야 합니다', 400);
      }

      // 성공 응답
      return createResponse(
        {
          userId: 1, // MSW에서는 인증된 사용자 ID로 고정
          age: body.age,
          gender: body.gender,
          grade: body.grade,
          recentBrandsCount: body.recentBrands.length,
          interestedBrandsCount: body.interestedBrands.length,
          registeredAt: new Date().toISOString(),
        },
        '회원가입 추가정보가 성공적으로 저장되었습니다',
        200
      );
    } catch {
      return createErrorResponse('서버 내부 오류가 발생했습니다', 500);
    }
  }),
];
