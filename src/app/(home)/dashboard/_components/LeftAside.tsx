"use client";

import { useEffect, useState } from "react";
import HashTagCard from "@/app/(home)/dashboard/_components/HashTagCard";
import { useMediaQuery } from "@/hooks/useMatchMedia";

export default function LeftAside() {
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

  if (!isClient || !isDesktop) {
    return null;
  }

  return (
    <aside className="w-fit">
      <div className={`flex flex-col transition-all duration-300 gap-4 sticky ${isVisible ? "top-20" : "top-6"}`}>
        <HashTagCard />
      </div>
    </aside>
  );
}
