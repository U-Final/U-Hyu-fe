import { ApiErrorResponse } from "@/shared/client/ApiErrorResponse";


export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiErrorResponse) return error.message;
  if (error instanceof Error) return error.message;
  return '알 수 없는 오류가 발생했습니다.';
};