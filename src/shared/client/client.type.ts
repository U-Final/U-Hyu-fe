export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiError {
  message: string;
  statusCode: number;
}