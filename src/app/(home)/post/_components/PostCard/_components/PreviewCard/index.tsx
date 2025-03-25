"use client";

import Tag from "@/app/(home)/dashboard/_components/ThreadList/_components/Tag";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Heart, MessageSquareMore, Bookmark, Share2, X, Ellipsis } from "lucide-react";
// import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

export default function PreviewCard() {
  const { watch } = useFormContext();

  const title = watch("title") || "";
  const content = watch("content") || "";
  const tags = watch("tags") || [];

  return (
    <DialogContent className=" min-w-[650px] h-fit flex flex-col gap-8">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">미리보기</DialogTitle>
      </DialogHeader>
      <Card className="w-full h-fit">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <Avatar className="w-[24px] h-[24px]">
              <AvatarImage src={profileImage} />
              <AvatarFallback>loading..</AvatarFallback>
            </Avatar> */}
              <Image src="icons/default_profile_icon.svg" alt="기본 프로필 아이콘" width={24} height={24} />
              <p className="text-sm">사용자 이름</p>
            </div>
            <div>
              <Button size="icon">
                <Ellipsis />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <div className="flex items-center gap-2">
            <Image src="/icons/github_icon.svg" alt="스레드 아이콘" width={20} height={20} />
            <h1 className="text-lg text-white">{title || "제목이 표시됩니다."}</h1>
          </div>
          <p>{content || "내용이 표시됩니다."}</p>
          <div className="flex items-center gap-2 overflow-x-scroll scroll-hidden">
            {tags.length > 0 ? (
              tags.map((tag: string) => {
                return <Tag key={tag} tag={tag} />;
              })
            ) : (
              <div className="px-2 rounded-lg text-primary bg-primary/10 flex items-center h-[24px]">
                <span className="text-[12px]"># 태그 예시</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-5 pb-4 border-b-1 border-input/15">
            <div className="flex items-center bg-muted-foreground/50 py-1 px-2 rounded-xl gap-1">
              <Image src="/icons/star_icon.svg" alt="스타 아이콘" width={16} height={16} />
              <span className="text-[13px]">0</span>
            </div>
            <div className="flex items-center bg-muted-foreground/50 py-1 px-2 rounded-xl gap-1">
              <Image src="/icons/share_icon.svg" alt="공유 아이콘" width={16} height={16} />
              <span className="text-[13px]">0</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-3 w-full">
            <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
              <Heart />
              <span className="text-[13px]">0</span>
            </Button>
            <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
              <MessageSquareMore />
              <span className="text-[13px]">0</span>
            </Button>
            <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
              <Bookmark />
            </Button>
            <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
              <Share2 />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </DialogContent>
  );
}
