"use client";

import { useState } from "react";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";
import useAuthStore from "@/store/useAuthStore";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function AuthController() {
  const { isLoggedIn, user, logout } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleOpenLogin = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  const handleOpenSignup = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };

  const handleCloseSignup = () => {
    setShowSignupModal(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  // 로그인한 사용자용 컴포넌트
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/profile">
          <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
            <AvatarImage src={user?.profileImage || undefined} alt="프로필" />
            <AvatarFallback>
              {user?.nickname
                ? user.nickname.substring(0, 2).toUpperCase()
                : "GT"}
            </AvatarFallback>
          </Avatar>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full w-8 h-8 hover:bg-muted"
          onClick={handleLogout}
          title="로그아웃"
        >
          <LogOut size={18} />
          <span className="sr-only">로그아웃</span>
        </Button>
      </div>
    );
  }

  // 비로그인 사용자용 컴포넌트
  return (
    <>
      <div className="flex items-center">
        <Button
          onClick={handleOpenLogin}
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-muted"
          title="로그인"
        >
          <User size={20} />
          <span className="sr-only">로그인</span>
        </Button>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseLogin}
        onOpenSignup={handleOpenSignup}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={handleCloseSignup}
        onOpenLogin={handleOpenLogin}
      />
    </>
  );
}
