"use client";

import ThreadCardContent from "@/app/(home)/dashboard/_components/ThreadList/_components/ThreadCardContent";
import ThreadCardFooter from "@/app/(home)/dashboard/_components/ThreadList/_components/ThreadCardFooter";
import ThreadCardHeader from "@/app/(home)/dashboard/_components/ThreadList/_components/ThreadCardHeader";
import { Card } from "@/components/ui/card";
import { Thread } from "@/store/usePostStore";

export default function ThreadCard({ thread }: { thread: Thread }) {
  return (
    <Card className="w-full h-fit max-w-[650px]">
      <ThreadCardHeader
        profileImage={thread.user.profileImage}
        nickname={thread.user.nickname}
        createdAt={thread.createdAt}
      />
      <ThreadCardContent {...thread} />
      <ThreadCardFooter
        id={thread.id}
        likeCount={thread.likeCount}
        commentCount={thread.commentCount}
        bestComment={thread.bestComment}
        profileImage={thread.user.profileImage}
        isLiked={thread.isLiked}
        isBookmarked={thread.isBookmarked}
      />
    </Card>
  );
}
