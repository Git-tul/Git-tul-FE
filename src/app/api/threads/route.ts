import { NextRequest, NextResponse } from "next/server";
import { withAuth, createApiRequest, handleApiResponse } from "@/lib/api";
import useAuthStore from "@/store/useAuthStore";

// /api/threads 엔드포인트 (포스트 목록 조회)
export async function GET(request: NextRequest) {
  return withAuth(async (authToken) => {
    try {
      // 쿼리 파라미터 추출
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get("page") || "1");
      const size = parseInt(searchParams.get("size") || "10");

      // API 문서에 따르면 다음 파라미터가 필요함:
      // - user: User 객체 (쿼리 파라미터로 전달)
      // - page: PageQuery 객체 (쿼리 파라미터로 전달)
      const apiEndpoint = `/threads`;

      // 페이지네이션 정보 구성
      const pageQueryParams = new URLSearchParams();
      pageQueryParams.append("page", page.toString());
      pageQueryParams.append("size", size.toString());

      // 백엔드 API 요청 생성
      const { url: apiUrl, options } = createApiRequest(
        `${apiEndpoint}?${pageQueryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(`포스트 목록 요청: ${apiUrl}`);

      // API 호출
      const response = await fetch(apiUrl, options);

      // 응답 처리
      if (!response.ok) {
        console.error(`API 오류: ${response.status}`, await response.text());
        return NextResponse.json(
          { message: "포스트 목록을 가져오는데 실패했습니다." },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error("포스트 목록 조회 오류:", error);
      return NextResponse.json(
        { message: "포스트 목록을 가져오는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }
  });
}
