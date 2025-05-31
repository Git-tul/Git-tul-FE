import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, AUTH_URL } from "@/lib/constants";

export async function GET() {
  try {
    // 쿠키에서 토큰 가져오기
    const cookieStore = await cookies();
    const authToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

    if (!authToken) {
      return NextResponse.json(
        {
          isLoggedIn: false,
        },
        {
          status: 401,
        }
      );
    }

    // // 백엔드 인증 확인을 위한 /me API 호출 (선택적)
    // try {
    //   const response = await fetch(`${AUTH_URL}/me`, {
    //     headers: {
    //       Authorization: `Bearer ${authToken}`,
    //     },
    //   });

    //   if (response.ok) {
    //     const userData = await response.json();
    //     return NextResponse.json({
    //       isLoggedIn: true,
    //       user: userData,
    //     });
    //   }
    // } catch (error) {
    //   console.error("Auth check error:", error);
    // }

    // 최소한 쿠키가 있으면 로그인으로 간주
    return NextResponse.json({
      isLoggedIn: true,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      {
        isLoggedIn: false,
        message: "인증 확인 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}
