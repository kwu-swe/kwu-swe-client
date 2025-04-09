export interface ToApi<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}
