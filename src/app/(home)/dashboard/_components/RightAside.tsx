"use client";

import { useEffect, useState } from "react";
import HashTagCard from "@/app/(home)/dashboard/_components/HashTagCard";
import PopularDeveloperCard from "@/app/(home)/dashboard/_components/PopularDeveloperCard";
import RecommandProjectCard from "@/app/(home)/dashboard/_components/RecommandProjectCard";
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
      <div className={`flex flex-col transition-all duration-300 gap-4 sticky ${isVisible ? "top-20" : "top-6"}`}>
        <RecommandProjectCard />
        <PopularDeveloperCard />
        {isClient && !isDesktop && <p>해시태그 열기</p>}
      </div>
    </aside>
  );
}
