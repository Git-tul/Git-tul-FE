import { Thread } from "@/store/usePostStore";

// 목업 데이터
export const mockThreadData: Thread = {
  user: {
    nickname: "Git-tul 팀",
    email: "admin@gittul.com",
    profileImage: null,
  },
  title: "Git-tul: 개발자를 위한 소셜 코딩 플랫폼",
  image: null,
  description:
    "Git-tul은 개발자들이 GitHub 프로젝트를 공유하고 소통할 수 있는 소셜 코딩 플랫폼입니다. 관심 있는 프로젝트를 발견하고, 다른 개발자들과 의견을 나누며, 코드를 통해 세상을 바꿔보세요. 인기 있는 오픈 소스 프로젝트를 탐색하고, 자신의 프로젝트를 홍보하며, 개발 커뮤니티와 연결될 수 있습니다. 지금 Git-tul과 함께 코딩의 즐거움을 공유하세요!",
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-01T00:00:00.000Z",
  id: 1,
  starCount: 5000,
  forkCount: 1200,
  viewCount: 15000,
  likeCount: 3500,
  commentCount: 420,
  bestComment: null,
  isLiked: false,
  isBookmarked: false,
  tags: ["GitHub", "소셜코딩", "개발자커뮤니티", "오픈소스", "Git-tul"],
};
