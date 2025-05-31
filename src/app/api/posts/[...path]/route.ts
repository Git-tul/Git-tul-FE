import { NextRequest } from "next/server";
import { withAuth, createApiRequest, handleApiResponse } from "@/lib/api";

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  return withAuth(async (authToken) => {
    // 경로 파라미터 추출
    const { path } = params;
    const endpoint = `/posts/${path.join("/")}`;

    // 쿼리 파라미터 추출 및 전달
    const url = new URL(request.url);
    const queryString = url.search ? url.search : "";

    // 요청 옵션 구성
    const requestOptions: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    };

    // 요청 본문이 있는 경우 처리
    if (["POST", "PUT", "PATCH"].includes(method)) {
      try {
        const bodyData = await request.json();
        requestOptions.body = JSON.stringify(bodyData);
      } catch (e) {
        // 요청 본문이 없거나 JSON이 아닌 경우 무시
      }
    }

    // 백엔드 API 요청 생성
    const { url: apiUrl, options } = createApiRequest(
      `${endpoint}${queryString}`,
      requestOptions
    );

    console.log(`Forwarding ${method} request to: ${apiUrl}`);

    // API 호출 및 응답 처리
    const response = await fetch(apiUrl, options);
    return handleApiResponse(response, "API 요청 처리에 실패했습니다.");
  });
}

// HTTP 메서드별 핸들러
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "DELETE");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, "PATCH");
}
