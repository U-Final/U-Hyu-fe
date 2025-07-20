// src/shared/error/ApiErrorResponse.ts
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
  timestamp?: string;
  path?: string;

  constructor(error: ApiResponse<unknown> & { path?: string }) {
    super(error.message);
    this.code = error.code;
    this.status = error.status;
    this.timestamp = error.timestamp;
    this.path = error.path;
    this.name = 'ApiError';
  }
}
