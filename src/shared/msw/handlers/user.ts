import { HttpResponse, http } from 'msw';

export const userHandlers = [
  http.post('/users/check-email', async ({ request }) => {
    const body = (await request.json()) as { email: string };
    const email = body.email;

    // 테스트용: 특정 이메일들을 이미 사용중으로 처리
    const usedEmails = ['test@example.com', 'used@email.com'];
    const isAvailable = email ? !usedEmails.includes(email) : false;

    return HttpResponse.json({
      statusCode: 0,
      message: isAvailable
        ? '사용 가능한 이메일입니다'
        : '이미 사용중인 이메일입니다',
      data: {
        isAvailable,
        email,
      },
    });
  }),

  http.post('/users/extra-info', async () => {
    // 유효성 검사 등 필요시 추가
    return HttpResponse.json({
      statusCode: 0,
      message: '회원가입 추가정보 입력 성공',
      data: 'SUCCESS',
    });
  }),
];
