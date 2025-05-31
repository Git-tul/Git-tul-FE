import { NextResponse } from "next/server";
import { serialize } from "cookie";
import {
  AUTH_URL,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_MAX_AGE,
} from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 백엔드 API 호출
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "로그인에 실패했습니다.",
        },
        {
          status: response.status,
        }
      );
    }

    // 토큰을 httpOnly 쿠키로 저장
    const cookieValue = serialize(AUTH_COOKIE_NAME, data.accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: AUTH_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // 응답 헤더에 쿠키 설정
    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Set-Cookie": cookieValue,
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "로그인 처리 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}
