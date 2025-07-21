
import type { ApiErrorData } from '@/shared/client/ApiErrorResponse';
import { HttpResponse } from 'msw';

export const createErrorResponse = (
  message: string,
  status: number = 400,
  code: number = 1001,
  path?: string
): HttpResponse<ApiErrorData> => {
  return HttpResponse.json<ApiErrorData>(
    {
      message,
      status,
      code,
      timestamp: new Date().toISOString(),
      path,
    },
    { status }
  );
};
