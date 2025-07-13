export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
  timestamp: string;
}

export interface ApiError {
  message: string;
  status: number;
  code: string;
  timestamp: string;
  path: string;
}
