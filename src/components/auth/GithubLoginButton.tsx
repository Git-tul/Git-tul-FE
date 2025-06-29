"use client";

import { Button } from "@/components/ui/button";
import { initiateGithubLogin } from "@/utils/github-oauth";
import Image from "next/image";

interface GithubLoginButtonProps {
  className?: string;
}

export function GithubLoginButton({ className }: GithubLoginButtonProps) {
  const handleGithubLogin = () => {
    initiateGithubLogin();
  };

  return (
    <Button
      type="button"
      variant="outline"
      className={`w-full flex items-center justify-center gap-2 ${className}`}
      onClick={handleGithubLogin}
    >
      <Image
        src="/icons/github_icon.svg"
        alt="GitHub"
        width={20}
        height={20}
        className="dark:invert"
      />
      <span>GitHub로 로그인</span>
    </Button>
  );
} 