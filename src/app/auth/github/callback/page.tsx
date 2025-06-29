"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

function GithubCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loginWithOAuth } = useAuthStore();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (error) {
        setStatus("error");
        setMessage("깃허브 로그인이 취소되었습니다.");
        setTimeout(() => {
          router.push("/");
        }, 3000);
        return;
      }

      if (!code) {
        setStatus("error");
        setMessage("인증 코드가 없습니다.");
        setTimeout(() => {
          router.push("/");
        }, 3000);
        return;
      }

      try {
        const success = await loginWithOAuth("github", code);
        
        if (success) {
          setStatus("success");
          setMessage("깃허브 로그인이 완료되었습니다!");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setStatus("error");
          setMessage("깃허브 로그인에 실패했습니다.");
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      } catch (error) {
        setStatus("error");
        setMessage("로그인 처리 중 오류가 발생했습니다.");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, loginWithOAuth, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        {status === "loading" && (
          <>
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              깃허브 로그인 처리 중
            </h2>
            <p className="text-gray-600">잠시만 기다려주세요...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              로그인 성공!
            </h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              로그인 실패
            </h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function GithubCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            페이지 로딩 중
          </h2>
          <p className="text-gray-600">잠시만 기다려주세요...</p>
        </div>
      </div>
    }>
      <GithubCallbackContent />
    </Suspense>
  );
} 