"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { Bell, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AuthController } from "@/components/auth/AuthController";
import useAuthStore from "@/store/useAuthStore";

const HeaderNav = () => {
  const pathName = usePathname();
  const { isLoggedIn } = useAuthStore();

  return (
    <nav className="flex items-center justify-between w-full h-16 max-w-[1248px] px-6 mx-auto bg-transparent">
      <div className="flex items-center justify-between gap-8 w-[220px]">
        <Link href="/dashboard">
          <Image
            src="/icons/logo_icon.svg"
            alt="로고 아이콘"
            width={42}
            height={32}
          />
        </Link>
        <Link
          href="/dashboard"
          className={`${pathName === "/dashboard" ? "text-primary" : ""}`}
        >
          홈
        </Link>
        <Link
          href="/post"
          className={`${pathName === "/post" ? "text-primary" : ""}`}
        >
          카드 만들기
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {pathName === "/dashboard" && (
          <div className="relative mr-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-card-foreground/70"
              size={18}
            />
            <Input
              type="text"
              placeholder="레포지토리 또는 해시태그 검색"
              className="pl-10 py-2 w-[256px] transition-all duration-300 focus:w-[400px]"
            />
          </div>
        )}
        <div className="flex items-center gap-6">
          {isLoggedIn && (
            <button role="button" className="hover:cursor-pointer">
              <Bell className="hover:stroke-primary" />
            </button>
          )}
          <AuthController />
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;
