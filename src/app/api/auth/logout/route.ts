import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { AUTH_COOKIE_NAME } from "@/lib/constants";

export async function POST() {
  try {
    // 쿠키를 만료시키기 (maxAge를 0으로 설정)
    const cookieValue = serialize(AUTH_COOKIE_NAME, "", {
      httpOnly: true,
      path: "/",
      maxAge: 0, // 즉시 만료
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // 응답 헤더에 만료된 쿠키 설정
    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Set-Cookie": cookieValue,
        },
      }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "로그아웃 처리 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}
