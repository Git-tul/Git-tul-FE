"use client";

import { useEffect, useState } from "react";
import HashTagCard from "@/app/(home)/dashboard/_components/LeftAside/components/HashTagCard";
import { useMediaQuery } from "@/hooks/useMatchMedia";
import useScrollVisiblity from "@/hooks/useScrollVisiblity";
import LoadingCard from "@/components/common/LoadingCard";

export default function LeftAside() {
  const [isClient, setIsClient] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isVisible = useScrollVisiblity();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <aside className="w-fit">
        <div className={`flex flex-col transition-all duration-300 gap-4 sticky ${isVisible ? "top-20" : "top-6"}`}>
          <LoadingCard cardStyle="w-[240px] h-[310px]" skeletonCount={6} skeletonStyle="w-full h-[36px]" />
        </div>
      </aside>
    );
  }

  if (!isDesktop) {
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
