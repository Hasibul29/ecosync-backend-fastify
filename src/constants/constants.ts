const errorResponse = {
  success: false,
  message:
    "An unexpected error has occurred. Please contact the system administrator.",
} as ApiResponse;

interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}

export { errorResponse, type ApiResponse };
