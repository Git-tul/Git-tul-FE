"use client";

import { useEffect, useState } from "react";
import HeaderNav from "@/components/header/HeaderNav";

const Header = () => {
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

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-card transition-transform duration-300 z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <HeaderNav />
    </header>
  );
};

export default Header;
