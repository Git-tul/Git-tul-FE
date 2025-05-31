import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, API_URL } from "./constants";

/**
 * 인증 토큰을 가져오는 함수
 */
export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
};

/**
 * 인증이 필요한 API 요청을 처리하는 함수
 */
export const withAuth = async <T>(
  handler: (authToken: string) => Promise<T>,
  options?: {
    unauthorizedMessage?: string;
    errorMessage?: string;
  }
) => {
  try {
    const authToken = await getAuthToken();

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message:
            options?.unauthorizedMessage || "인증되지 않은 사용자입니다.",
        },
        {
          status: 401,
        }
      );
    }

    return await handler(authToken);
  } catch (error) {
    console.error("API 요청 오류:", error);
    return NextResponse.json(
      {
        success: false,
        message: options?.errorMessage || "요청 처리 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
};

/**
 * 백엔드 API 요청을 생성하는 함수
 */
export const createApiRequest = (
  endpoint: string,
  options: RequestInit = {}
) => {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;
  return { url, options };
};

/**
 * 백엔드 API 호출 후 응답 처리하는 함수
 */
export const handleApiResponse = async (
  response: Response,
  errorMessage?: string
) => {
  if (!response.ok) {
    return NextResponse.json(
      {
        success: false,
        message: errorMessage || "API 요청 처리에 실패했습니다.",
      },
      {
        status: response.status,
      }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
};
