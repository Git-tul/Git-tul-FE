"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";
import useAuthStore from "@/store/useAuthStore";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const { checkAuth } = useAuthStore();

  // 앱 로드 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
