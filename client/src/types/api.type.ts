// types/responseHandler.ts
export interface ApiResponse<T = unknown> {
    success: boolean;
    code: number;
    message: string;
    data?: T;
    error?: {
      message: string;
      [key: string]: any;
    };
  }
  