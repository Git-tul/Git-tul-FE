declare module "@git-tul-types" {
  interface User {
    nickname: string;
    email: string;
    profileImage: string | null;
  }

  interface Thread {
    user: User;
    title: string;
    image: string | null;
    description: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    starCount: number;
    forkCount: number;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    bestComment: string | null;
    isLiked: boolean;
    isBookmarked: boolean;
    tags: string[];
  }
}
