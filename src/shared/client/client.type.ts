export interface ApiResponse<T> {
  code: number;
  result?: T;
  message: string;
  status: number;
  timestamp?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code: string;
  timestamp: string;
  path: string;
}

export interface ApiResponse2<T> {
  data: T;
  message: string;
  status: number;
  timestamp?: string;
}