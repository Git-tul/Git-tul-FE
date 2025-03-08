"use client";

import { useEffect, useState } from "react";
import PopularDeveloperCard from "@/app/(home)/dashboard/_components/RightAside/_components/PopularDeveloperCard";
import RecommandProjectCard from "@/app/(home)/dashboard/_components/RightAside/_components/RecommandProjectCard";
import { useMediaQuery } from "@/hooks/useMatchMedia";
import useScrollVisiblity from "@/hooks/useScrollVisiblity";

export default function RightAside() {
  const [isClient, setIsClient] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isVisible = useScrollVisiblity();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <aside className="w-fit flex flex-col gap-6">
      <div
        className={`w-[288px] max-[1200px]:w-[250px] flex flex-col transition-all duration-300 gap-4 sticky ${
          isVisible ? "top-20" : "top-6"
        }`}
      >
        <RecommandProjectCard />
        <PopularDeveloperCard />
        {isClient && !isDesktop && <p>해시태그 열기</p>}
      </div>
    </aside>
  );
}
