"use client";

import Tag from "@/app/(home)/dashboard/_components/ThreadCard/_components/Tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Thread } from "@git-tul-types";
import { Bookmark, Ellipsis, Heart, MessageSquareMore, Share2 } from "lucide-react";
import Image from "next/image";

export default function ThreadCard({ thread }: { thread: Thread }) {
  return (
    <Card className="w-full h-fit max-w-[650px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {thread.user.profileImage ? (
              <Avatar className="w-[24px] h-[24px]">
                <AvatarImage src={thread.user.profileImage} />
                <AvatarFallback>loading..</AvatarFallback>
              </Avatar>
            ) : (
              <Image src="icons/default_profile_icon.svg" alt="기본 프로필 아이콘" width={24} height={24} />
            )}
            <p className="text-sm">{thread.user.nickname}</p>
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
          <h1>{thread.title}</h1>
        </div>
        <p>{thread.description}</p>
        <div className="flex items-center gap-2 overflow-x-scroll scroll-hidden">
          {thread.tags.map((tag) => {
            return <Tag key={tag} tag={tag} />;
          })}
        </div>
        <div className="flex items-center gap-5 pb-4 border-b-1 border-input/15">
          <div className="flex items-center bg-muted-foreground/50 py-1 px-2 rounded-xl gap-1">
            <Image src="/icons/star_icon.svg" alt="스타 아이콘" width={16} height={16} />
            <span className="text-[13px]">{thread.starCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center bg-muted-foreground/50 py-1 px-2 rounded-xl gap-1">
            <Image src="/icons/share_icon.svg" alt="공유 아이콘" width={16} height={16} />
            <span className="text-[13px]">{thread.forkCount.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-3 w-full">
          <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
            <Heart />
            <span className="text-[13px]">{thread.likeCount}</span>
          </Button>
          <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
            <MessageSquareMore />
            <span className="text-[13px]">{thread.commentCount}</span>
          </Button>
          <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
            <Bookmark />
          </Button>
          <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
            <Share2 />
          </Button>
        </div>
        {thread.bestComment && (
          <div className="p-3 flex flex-col rounded-md bg-muted-foreground w-full">
            <div className="flex items-center gap-2">
              {thread.user.profileImage ? (
                <Avatar className="w-[24px] h-[24px]">
                  <AvatarImage src={thread.user.profileImage} />
                  <AvatarFallback>loading..</AvatarFallback>
                </Avatar>
              ) : (
                <Image src="icons/default_profile_icon.svg" alt="기본 프로필 아이콘" width={24} height={24} />
              )}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
