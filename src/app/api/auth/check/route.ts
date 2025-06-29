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

    // 백엔드 인증 확인을 위한 /users/me API 호출
    try {
      const response = await fetch(`${AUTH_URL.replace('/auth', '')}/users/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("userData", userData);
        return NextResponse.json({
          isLoggedIn: true,
          user: {
            id: userData.userId,
            nickname: userData.nickname || userData.userName,
            email: userData.email,
            profileImage: userData.profileImageUrl,
          },
        });
      } else {
        // 토큰이 유효하지 않은 경우
        return NextResponse.json(
          {
            isLoggedIn: false,
          },
          {
            status: 401,
          }
        );
      }
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
