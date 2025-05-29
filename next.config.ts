import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // 프로덕션 빌드 시 ESLint 검사 비활성화
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 프로덕션 빌드 시 타입 검사 비활성화
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
