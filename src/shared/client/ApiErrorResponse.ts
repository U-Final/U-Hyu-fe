import type { ApiResponse } from '@/shared/client/client.type';
export interface ApiErrorData {
  code: number;
  status: number;
  message: string;
  timestamp?: string;
  path?: string;
}

export class ApiErrorResponse extends Error {
  code: number;
  status: number;

  constructor(error: ApiResponse<unknown> & { path?: string }) {
    super(error.message);
    this.code = error.statusCode;
    this.status = error.statusCode;
    this.name = 'ApiError';
  }
}
