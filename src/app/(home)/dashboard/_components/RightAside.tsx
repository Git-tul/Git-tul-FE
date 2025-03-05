"use client";

import { useEffect, useState } from "react";
import HashTagCard from "@/app/(home)/dashboard/_components/HashTagCard";
import PopularDeveloperCard from "@/app/(home)/dashboard/_components/PopularDeveloperCard";
import RecommandProjectCard from "@/app/(home)/dashboard/_components/RecommandProjectCard";
import { useMediaQuery } from "@/hooks/useMatchMedia";

export default function RightAside() {
  const [isClient, setIsClient] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;
  let ticking = false;

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsVisible(scrollY < lastScrollY || scrollY < 50); // 위로 스크롤하거나, 페이지 상단이면 보이기
          lastScrollY = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <aside className="w-fit flex flex-col gap-6">
      <div className={`flex flex-col transition-all duration-300 gap-4 sticky ${isVisible ? "top-20" : "top-6"}`}>
        <RecommandProjectCard />
        <PopularDeveloperCard />
        {isClient && !isDesktop && <p>해시태그 열기</p>}
      </div>
    </aside>
  );
}
