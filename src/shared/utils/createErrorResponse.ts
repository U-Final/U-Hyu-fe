import type { ApiErrorResponse } from '@/shared/client/client.type';
import { HttpResponse } from 'msw';

export const createErrorResponse = (
  message: string,
  status: number = 400,
  code: number = 1001,
  path?: string
): HttpResponse<ApiErrorResponse> => {
  return HttpResponse.json<ApiErrorResponse>(
    {
      message,
      status,
      code,
      timestamp: new Date().toISOString(),
      path,
    },
    { status } // 실제 HTTP 응답 status도 일치시킴
  );
};
