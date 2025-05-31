"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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

  // 무한 스크롤을 위한 ref와 observer 설정
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 인증 상태 변화 감지 (로그인/로그아웃 시 자동으로 스레드 목록 갱신)
  useAuthStateListener();

  // 추가 데이터 로딩 핸들러
  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchThreads();
    }
  }, [isLoading, hasMore, fetchThreads]);

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

  // 무한 스크롤 설정
  useEffect(() => {
    // 이전 observer가 있다면 연결 해제
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 새로운 observer 생성
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // 관찰 대상이 화면에 보이고, 로딩 중이 아니고, 더 불러올 데이터가 있는 경우
        if (entry.isIntersecting && !isLoading && hasMore) {
          handleLoadMore();
        }
      },
      {
        // 옵저버 설정 (root: null은 viewport, threshold는 얼마나 보여야 감지할지)
        root: null,
        rootMargin: "100px", // 뷰포트 하단에서 100px 위에서 감지
        threshold: 0.1, // 10% 이상 보이면 감지
      }
    );

    // 감지 대상 엘리먼트 연결
    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef);
    }

    // 컴포넌트 언마운트 시 observer 해제
    return () => {
      if (observerRef.current && currentLoadMoreRef) {
        observerRef.current.unobserve(currentLoadMoreRef);
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, hasMore, handleLoadMore]);

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

        {/* 무한 스크롤 감지 영역 */}
        {hasMore && (
          <div
            ref={loadMoreRef}
            className="h-10 flex items-center justify-center my-4"
          >
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">로딩 중...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
