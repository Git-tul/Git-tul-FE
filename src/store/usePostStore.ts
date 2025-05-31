import { create } from "zustand";
import { API_URL } from "@/lib/constants";
import useAuthStore from "./useAuthStore";
import { mockThreadData } from "@/lib/mockData";
import { useEffect } from "react";

// 포스트(스레드) 타입 정의
export interface Thread {
  id: number;
  title: string;
  image: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
  starCount: number;
  forkCount: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  bestComment: any | null;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
  user: {
    id?: number;
    nickname: string;
    email: string;
    profileImage: string | null;
  };
}

// 페이지네이션 쿼리 타입
export interface PageQuery {
  page: number;
  size: number;
}

interface PostState {
  threads: Thread[];
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  mockThread: Thread;

  // 액션
  fetchThreads: () => Promise<void>;
  resetThreads: () => void;
  refreshOnAuthChange: (isLoggedIn: boolean) => Promise<void>;
  likeThread: (threadId: number) => Promise<void>;
  unlikeThread: (threadId: number) => Promise<void>;
  bookmarkThread: (threadId: number) => Promise<void>;
  unbookmarkThread: (threadId: number) => Promise<void>;
}

const usePostStore = create<PostState>((set, get) => ({
  threads: [],
  isLoading: false,
  error: null,
  page: 1,
  hasMore: true,
  mockThread: mockThreadData,

  fetchThreads: async () => {
    const { isLoggedIn, user } = useAuthStore.getState();
    const { page, threads } = get();

    // 로그인하지 않은 경우 목업 데이터만 보여줌
    if (!isLoggedIn) {
      if (threads.length === 0) {
        set({ threads: [mockThreadData], hasMore: false });
      }
      return;
    }

    // 로그인한 경우 API 호출
    set({ isLoading: true, error: null });

    try {
      const pageQuery: PageQuery = {
        page,
        size: 10,
      };

      const queryParams = new URLSearchParams();
      queryParams.append("page", pageQuery.page.toString());
      queryParams.append("size", pageQuery.size.toString());

      // 실제 API 서버로 요청 (Next.js API 라우트 사용)
      const response = await fetch(`/api/posts?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error("포스트를 불러오는데 실패했습니다.");
      }

      const data = await response.json();
      const size = data.length;

      // Todo. 백엔드 페이징 오류 확인
      // 새로운 데이터에서 중복 ID를 필터링
      const existingIds = new Set(threads.map((thread) => thread.id));
      const uniqueNewThreads = data.filter(
        (thread: Thread) => !existingIds.has(thread.id)
      );

      set((state) => ({
        threads:
          page === 1
            ? data // 첫 페이지는 그대로 사용
            : [...state.threads, ...uniqueNewThreads], // 이후 페이지는 중복 제거 후 추가
        isLoading: false,
        page: state.page + 1,
        hasMore: size > 0,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "포스트를 불러오는데 실패했습니다.",
      });
    }
  },

  resetThreads: () => {
    set({ threads: [], page: 1, hasMore: true });
  },

  // 인증 상태 변경 시 스레드 목록 새로고침
  refreshOnAuthChange: async (isLoggedIn: boolean) => {
    // 기존 데이터 초기화
    set({ threads: [], page: 1, hasMore: true, error: null });

    if (isLoggedIn) {
      // 로그인한 경우 API에서 데이터 가져오기
      await get().fetchThreads();
    } else {
      // 로그아웃한 경우 목업 데이터 표시
      set({ threads: [mockThreadData], hasMore: false });
    }
  },

  // 나머지 API 호출은 임시 구현 (UI 상태만 변경)
  likeThread: async (threadId: number) => {
    console.log("좋아요 기능 구현 예정:", threadId);
    set((state) => ({
      threads: state.threads.map((thread) =>
        thread.id === threadId
          ? { ...thread, isLiked: true, likeCount: thread.likeCount + 1 }
          : thread
      ),
    }));
  },

  unlikeThread: async (threadId: number) => {
    console.log("좋아요 취소 기능 구현 예정:", threadId);
    set((state) => ({
      threads: state.threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              isLiked: false,
              likeCount: Math.max(0, thread.likeCount - 1),
            }
          : thread
      ),
    }));
  },

  bookmarkThread: async (threadId: number) => {
    console.log("북마크 기능 구현 예정:", threadId);
    set((state) => ({
      threads: state.threads.map((thread) =>
        thread.id === threadId ? { ...thread, isBookmarked: true } : thread
      ),
    }));
  },

  unbookmarkThread: async (threadId: number) => {
    console.log("북마크 취소 기능 구현 예정:", threadId);
    set((state) => ({
      threads: state.threads.map((thread) =>
        thread.id === threadId ? { ...thread, isBookmarked: false } : thread
      ),
    }));
  },
}));

// AuthStore의 상태 변화를 감지하는 훅
export const useAuthStateListener = () => {
  const { refreshOnAuthChange } = usePostStore();

  useEffect(() => {
    // 이전 인증 상태 저장
    let prevAuthState = useAuthStore.getState().isLoggedIn;

    // 초기 로드 시 로그인 상태라면 즉시 갱신
    if (prevAuthState) {
      refreshOnAuthChange(true);
    }

    // AuthStore 상태 변화 구독
    const unsubscribe = useAuthStore.subscribe((state) => {
      // 인증 상태가 변경되었을 때만 실행
      if (state.isLoggedIn !== prevAuthState) {
        // 새로운 인증 상태로 스레드 목록 갱신
        refreshOnAuthChange(state.isLoggedIn);
        // 상태 업데이트
        prevAuthState = state.isLoggedIn;
      }
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, [refreshOnAuthChange]);
};

export default usePostStore;
