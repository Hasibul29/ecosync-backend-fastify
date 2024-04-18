const errorResponse = {
  success: false,
  message:
    "An unexpected error has occurred. Please contact the system administrator.",
} as ApiResponse<null>;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export { errorResponse, type ApiResponse };
