"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { Bell, User, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const HeaderNav = () => {
  const pathName = usePathname();

  return (
    <nav className="flex-1 flex items-center justify-between w-full h-16 bg-background px-4 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-evenly w-[400px]">
        <Link href="/dashboard">로고</Link>
        <Link href="/dashboard" className={`${pathName === "/dashboard" ? "text-primary" : ""}`}>
          홈
        </Link>
        <Link href="/">탐색</Link>
        <Link href="/">만들기</Link>
        <Link href="/">프로필</Link>
      </div>
      <div className="flex items-center relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-card-foreground/70" size={18} />
          <Input
            type="text"
            placeholder="레포지토리 또는 해시태그 검색"
            className="pl-10 py-2 w-[256px] transition-all duration-300 focus:w-[400px]"
          />
        </div>
        <div className="flex space-x-8 ml-8">
          <button role="button" className="hover:cursor-pointer">
            <Bell className="hover:stroke-primary" />
          </button>
          <button role="button" className="hover:cursor-pointer">
            <User className="hover:stroke-primary" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;
