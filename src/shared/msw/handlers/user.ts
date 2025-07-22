import { HttpResponse, http } from 'msw';

export const userHandlers = [
  http.post('/users/extra-info', async () => {
    // 유효성 검사 등 필요시 추가
    return HttpResponse.json({
      statusCode: 0,
      message: '회원가입 추가정보 입력 성공',
      data: 'SUCCESS',
    });
  }),
];
