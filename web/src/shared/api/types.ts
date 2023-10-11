export interface ResponseError {
  message: string;
  errors: ApiError[];
}

export interface ApiError {
  message: string;
  code: string;
  field?: string;
}
