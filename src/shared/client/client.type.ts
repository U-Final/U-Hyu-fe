export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface ApiError {
  message: string;
  statusCode: number;
}
