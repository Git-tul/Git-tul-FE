import { NextResponse } from "next/server";
import { AUTH_URL } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userName, email, password, profileImage } = body;

    // 백엔드 API 호출
    const response = await fetch(`${AUTH_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        password,
        profileImage: profileImage || "https://via.placeholder.com/150",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "회원가입에 실패했습니다.",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "회원가입 처리 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      }
    );
  }
}
