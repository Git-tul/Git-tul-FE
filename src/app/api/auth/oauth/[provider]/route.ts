import { NextResponse } from "next/server";
import { serialize } from "cookie";
import {
  AUTH_URL,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_MAX_AGE,
} from "@/lib/constants";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const { provider } = await params;
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    console.log("OAuth 요청:", { provider, code });

    if (!code) {
      console.log("OAuth 코드가 없습니다");
      return NextResponse.json(
        {
          success: false,
          message: "OAuth 코드가 필요합니다.",
        },
        {
          status: 400,
        }
      );
    }

    // 백엔드 OAuth API 호출
    const backendUrl = `${AUTH_URL}/oauth/${provider}?code=${code}`;
    console.log("백엔드 요청 URL:", backendUrl);
    
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://gittul.miensoap.me"
      },
    });

    console.log("백엔드 응답 상태:", response.status);
    
    const data = await response.json();
    console.log("백엔드 응답 데이터:", data);

    if (!response.ok) {
      console.log("백엔드 응답 에러:", data);
      return NextResponse.json(
        {
          success: false,
          message: data.message || "OAuth 로그인에 실패했습니다.",
        },
        {
          status: response.status,
        }
      );
    }

    // 토큰을 httpOnly 쿠키로 저장
    console.log("액세스 토큰:", data.accessToken);
    console.log("쿠키 설정 시작");
    
    const cookieValue = serialize(AUTH_COOKIE_NAME, data.accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: AUTH_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    console.log("쿠키 값:", cookieValue);

    // 응답 헤더에 쿠키 설정
    console.log("성공 응답 반환");
    return NextResponse.json(
      { success: true },
      {
        headers: {
          "Set-Cookie": cookieValue,
        },
      }
    );
  } catch (error) {
    console.error("OAuth login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "OAuth 로그인 처리 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
} 