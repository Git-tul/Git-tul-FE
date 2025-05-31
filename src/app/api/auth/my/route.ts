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
          success: false,
          message: "인증되지 않은 사용자입니다.",
        },
        {
          status: 401,
        }
      );
    }

    // 백엔드 API에서 사용자 정보 가져오기
    const response = await fetch(`${AUTH_URL}/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "사용자 정보를 가져오는데 실패했습니다.",
        },
        {
          status: response.status,
        }
      );
    }

    const userData = await response.json();

    // 프론트엔드에서 필요한 형태로 데이터 변환
    return NextResponse.json({
      id: userData.userId,
      nickname: userData.nickname,
      email: userData.email,
      profileImage: userData.profileImageUrl,
    });
  } catch (error) {
    console.error("사용자 정보 조회 오류:", error);
    return NextResponse.json(
      {
        success: false,
        message: "사용자 정보를 가져오는 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}
