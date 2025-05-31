"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { formatRelativeTime } from "@/lib/dateUtils";

interface ThreadCardHeaderProps {
  profileImage: string | null;
  nickname: string;
  createdAt?: string;
}

export default function ThreadCardHeader({
  profileImage,
  nickname,
  createdAt,
}: ThreadCardHeaderProps) {
  const formattedDate = createdAt ? formatRelativeTime(createdAt) : null;

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {profileImage ? (
            <Avatar className="w-[24px] h-[24px]">
              <AvatarImage src={profileImage} />
              <AvatarFallback>loading..</AvatarFallback>
            </Avatar>
          ) : (
            <Image
              src="/icons/default_profile_icon.svg"
              alt="기본 프로필 아이콘"
              width={24}
              height={24}
            />
          )}
          <p className="text-sm font-medium">{nickname}</p>
          {formattedDate && <p className="text-xs ml-1">• {formattedDate}</p>}
        </div>
        <div>
          <Button size="icon" variant="ghost">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </div>
      </CardTitle>
    </CardHeader>
  );
}
