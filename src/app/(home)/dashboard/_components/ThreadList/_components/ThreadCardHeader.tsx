"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@git-tul-types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

export default function ThreadCardHeader({ profileImage, nickname }: User) {
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
            <Image src="icons/default_profile_icon.svg" alt="기본 프로필 아이콘" width={24} height={24} />
          )}
          <p className="text-sm">{nickname}</p>
        </div>
        <div>
          <Button size="icon">
            <Ellipsis />
          </Button>
        </div>
      </CardTitle>
    </CardHeader>
  );
}
