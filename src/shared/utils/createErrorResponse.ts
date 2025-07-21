
import type { ApiError } from '@/shared/client/client.type';
import { HttpResponse } from 'msw';

export const createErrorResponse = (
  message: string,
  statusCode: number = 400
): HttpResponse<ApiError> => {
  return HttpResponse.json<ApiError>(
    {
      message,
      statusCode,
    },
    { status: statusCode }
  );
};
