"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import usePostStore from "@/store/usePostStore";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Heart, MessageSquareMore, Bookmark, Share2 } from "lucide-react";
import Image from "next/image";
import useAuthStore from "@/store/useAuthStore";
import { useCallback } from "react";
import { toast } from "sonner";

interface ThreadCardFooterProps {
  id: number;
  likeCount: number;
  commentCount: number;
  bestComment: any | null;
  profileImage: string | null;
  isLiked: boolean;
  isBookmarked: boolean;
}

export default function ThreadCardFooter({
  id,
  likeCount,
  commentCount,
  bestComment,
  profileImage,
  isLiked,
  isBookmarked,
}: ThreadCardFooterProps) {
  const { likeThread, unlikeThread, bookmarkThread, unbookmarkThread } =
    usePostStore();
  const { isLoggedIn } = useAuthStore();

  const handleLike = useCallback(() => {
    if (!isLoggedIn) {
      toast.error("로그인이 필요한 기능입니다.");
      return;
    }

    if (isLiked) {
      unlikeThread(id);
    } else {
      likeThread(id);
    }
  }, [id, isLiked, likeThread, unlikeThread, isLoggedIn]);

  const handleBookmark = useCallback(() => {
    if (!isLoggedIn) {
      toast.error("로그인이 필요한 기능입니다.");
      return;
    }

    if (isBookmarked) {
      unbookmarkThread(id);
    } else {
      bookmarkThread(id);
    }
  }, [id, isBookmarked, bookmarkThread, unbookmarkThread, isLoggedIn]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.origin + `/thread/${id}`);
    toast.success("링크가 클립보드에 복사되었습니다.");
  }, [id]);

  return (
    <CardFooter className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-3 w-full">
        <Button
          className={`flex items-center gap-2 border border-transparent hover:border-input/40 ${
            isLiked ? "text-red-500" : ""
          }`}
          onClick={handleLike}
          variant="ghost"
        >
          <Heart className={isLiked ? "fill-red-500" : ""} />
          <span className="text-[13px]">{likeCount}</span>
        </Button>
        <Button
          className="flex items-center gap-2 border border-transparent hover:border-input/40"
          variant="ghost"
        >
          <MessageSquareMore />
          <span className="text-[13px]">{commentCount}</span>
        </Button>
        <Button
          className={`flex items-center gap-2 border border-transparent hover:border-input/40 ${
            isBookmarked ? "text-blue-500" : ""
          }`}
          onClick={handleBookmark}
          variant="ghost"
        >
          <Bookmark className={isBookmarked ? "fill-blue-500" : ""} />
        </Button>
        <Button
          className="flex items-center gap-2 border border-transparent hover:border-input/40"
          onClick={handleShare}
          variant="ghost"
        >
          <Share2 />
        </Button>
      </div>
      {bestComment && (
        <div className="p-3 flex flex-col rounded-md bg-muted-foreground w-full">
          <div className="flex items-center gap-2">
            {profileImage ? (
              <Avatar className="w-[24px] h-[24px]">
                <AvatarImage src={profileImage} />
                <AvatarFallback>loading..</AvatarFallback>
              </Avatar>
            ) : (
              <Image
                src="icons/default_profile_icon.svg"
                alt="기본 프로필 아이콘"
                width={24}
                height={24}
              />
            )}
          </div>
        </div>
      )}
    </CardFooter>
  );
}
