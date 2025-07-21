import type { ApiResponse } from '@/shared/client/client.type';
import { HttpResponse } from 'msw';

export const createResponse = <T>(
  data: T,
  message: string,
  statusCode: number = 200
): HttpResponse<ApiResponse<T>> => {
  return HttpResponse.json<ApiResponse<T>>(
    {
      data,
      message,
      statusCode,
    },
    { status: statusCode }
  );
};