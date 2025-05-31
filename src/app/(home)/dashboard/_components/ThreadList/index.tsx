"use client";

import { useEffect, useState } from "react";
import ThreadCard from "@/app/(home)/dashboard/_components/ThreadList/_components/ThreadCard";
import usePostStore, {
  Thread,
  useAuthStateListener,
} from "@/store/usePostStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ThreadList() {
  const { threads, isLoading, error, fetchThreads, hasMore } = usePostStore();
  const [initialLoading, setInitialLoading] = useState(true);

  // 인증 상태 변화 감지 (로그인/로그아웃 시 자동으로 스레드 목록 갱신)
  useAuthStateListener();

  // 초기 데이터 로딩
  useEffect(() => {
    const loadInitialData = async () => {
      await fetchThreads();
      setInitialLoading(false);
    };

    loadInitialData();

    // 컴포넌트 언마운트 시 스레드 상태 리셋
    return () => {
      usePostStore.getState().resetThreads();
    };
  }, [fetchThreads]);

  // 추가 데이터 로딩 핸들러
  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      fetchThreads();
    }
  };

  if (initialLoading) {
    return (
      <article className="flex-1 min-w-0 mt-5">
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-[300px] max-w-[650px]" />
          ))}
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <article className="flex-1 min-w-0 mt-5">
        <div className="p-4 text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <Button onClick={() => fetchThreads()}>다시 시도</Button>
        </div>
      </article>
    );
  }

  if (threads.length === 0) {
    return (
      <article className="flex-1 min-w-0 mt-5">
        <div className="p-4 text-center">
          <p className="text-gray-500 mb-2">표시할 스레드가 없습니다.</p>
        </div>
      </article>
    );
  }

  return (
    <article className="flex-1 min-w-0 mt-5">
      <div className="flex flex-col gap-6">
        {threads.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}

        {hasMore && (
          <div className="flex justify-center my-4">
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  로딩 중...
                </>
              ) : (
                "더 보기"
              )}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
