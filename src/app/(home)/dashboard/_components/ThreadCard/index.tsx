"use client";

import Tag from "@/app/(home)/dashboard/_components/ThreadCard/_components/Tag";
import ThreadCardContent from "@/app/(home)/dashboard/_components/ThreadCard/_components/ThreadCardContent";
import ThreadCardFooter from "@/app/(home)/dashboard/_components/ThreadCard/_components/ThreadCardFooter";
import ThreadCardHeader from "@/app/(home)/dashboard/_components/ThreadCard/_components/ThreadCardHeader";
import { Card } from "@/components/ui/card";
import { Thread } from "@git-tul-types";

export default function ThreadCard({ thread }: { thread: Thread }) {
  return (
    <Card className="w-full h-fit max-w-[650px]">
      <ThreadCardHeader {...thread.user} />
      <ThreadCardContent {...thread} />
      <ThreadCardFooter {...thread} profileImage={thread.user.profileImage} />
    </Card>
  );
}
