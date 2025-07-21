import type { ApiResponse } from '@/shared/client/client.type';
import { HttpResponse } from 'msw';

export const createResponse = <T>(
  result: T,
  message: string,
  status: number = 200,
  code: number = 0
): HttpResponse<ApiResponse<T>> => {
  return HttpResponse.json<ApiResponse<T>>(
    {
      code,
      status,
      message,
      result,
    },
    { status }
  );
};