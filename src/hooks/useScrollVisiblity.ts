import { useEffect, useState } from "react";

export default function useScrollVisiblity() {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;
  let ticking = false;

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const { scrollY } = window;
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

  return isVisible;
}
