"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function HashTagCard() {
  const tagData = ["인기", "AI", "프론트엔드", "백엔드", "모바일", "데브옵스"];
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const selectedTag = params.get("tag");

  const handleTagClick = (tag: string) => {
    params.set("tag", tag);
    replace(`${pathname}?${params}`);
  };

  return (
    <Card className="w-[240px] h-fit">
      <CardHeader>
        <CardTitle className="text-foreground">인기 해시태그 🏷️</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {tagData.map((tag, idx) => {
          return (
            <Button
              key={idx}
              className={`border-none hover:bg-primary font-light hover:text-white text-sm py-2 px-3 rounded-md flex justify-start ${
                tag === selectedTag ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleTagClick(tag)}
            >
              <span>#</span> {tag}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
