import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Thread, User } from "@git-tul-types";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Heart, MessageSquareMore, Bookmark, Share2 } from "lucide-react";
import Image from "next/image";

interface ThreadCardFooterProps extends Thread {
  profileImage: User["profileImage"];
}

export default function ThreadCardFooter({
  likeCount,
  commentCount,
  bestComment,
  profileImage,
}: ThreadCardFooterProps) {
  return (
    <CardFooter className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-3 w-full">
        <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
          <Heart />
          <span className="text-[13px]">{likeCount}</span>
        </Button>
        <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
          <MessageSquareMore />
          <span className="text-[13px]">{commentCount}</span>
        </Button>
        <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
          <Bookmark />
        </Button>
        <Button className="flex items-center gap-2 border border-transparent hover:border-input/40">
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
              <Image src="icons/default_profile_icon.svg" alt="기본 프로필 아이콘" width={24} height={24} />
            )}
          </div>
        </div>
      )}
    </CardFooter>
  );
}
