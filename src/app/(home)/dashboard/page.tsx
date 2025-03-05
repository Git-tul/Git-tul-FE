import dynamic from "next/dynamic";
import { Thread } from "@git-tul-types";

const LeftAside = dynamic(() => import("./_components/LeftAside"));
const RightAside = dynamic(() => import("./_components/RightAside"));
const ThreadCard = dynamic(() => import("./_components/ThreadCard"));

export default function Dashboard() {
  const threadData: Thread[] = [
    {
      user: {
        nickname: "박태호",
        email: "admin@naver.com",
        profileImage: null,
      },
      title: "Sonic Unleashed의 비공식 PC 포트",
      image: null,
      description:
        "### Unleashed Recompiled는 Xbox 360 버전의 Sonic Unleashed를 정적 재컴파일 과정을 통해 만든 비공식 PC 포트입니다. Windows와 Linux를 지원하며, 고해상도, 울트라 와이드 지원, 높은 프레임 속도, 성능 개선 및 모딩 기능을 포함하고 있습니다. **게임 자산은 포함되지 않으며, 합법적으로 소유한 게임 파일을 제공해야 설치할 수 있습니다.**",
      createdAt: "2025-03-05T14:55:26.779999",
      updatedAt: "2025-03-05T14:55:26.780071",
      id: 19,
      starCount: 2657,
      forkCount: 102,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      bestComment: null,
      isLiked: false,
      isBookmarked: false,
      tags: ["C++", "Sonic Unleashed", "PC 포트", "모드 지원", "재컴파일"],
    },
    {
      user: {
        nickname: "김민준",
        email: "admin@naver.com",
        profileImage: null,
      },
      title: "AI Hedge Fund: AI 기반의 투자 의사결정 시스템",
      image: null,
      description:
        "### AI Hedge Fund는 AI를 활용하여 투자 결정을 내리는 시스템입니다. 이 프로젝트는 **교육적** 목적으로만 사용되며, 실제 거래를 목표로 하지 않습니다. 여러 에이전트가 협력하여 주식의 본질적 가치를 평가하고 거래 신호를 생성합니다.",
      createdAt: "2025-03-05T14:55:26.940523",
      updatedAt: "2025-03-05T14:55:26.940534",
      id: 20,
      starCount: 9762,
      forkCount: 1986,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      bestComment: null,
      isLiked: false,
      isBookmarked: false,
      tags: ["AI", "Python", "Hedge Fund", "투자", "교육"],
    },
    {
      user: {
        nickname: "김준구",
        email: "admin@naver.com",
        profileImage: null,
      },
      title: "Ladybird: 독립적인 웹 브라우저 개발 프로젝트",
      image: null,
      description:
        "### Ladybird는 웹 표준 기반의 독립적인 웹 브라우저입니다. #### 멀티 프로세스 아키텍처로 안정성과 보안을 갖추고 있으며, 다양한 플랫폼에서 실행 가능합니다.",
      createdAt: "2025-03-05T14:55:27.054548",
      updatedAt: "2025-03-05T14:55:27.054560",
      id: 21,
      starCount: 33955,
      forkCount: 1413,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      bestComment: null,
      isLiked: false,
      isBookmarked: false,
      tags: ["C++", "개발", "멀티 프로세스", "웹 브라우저", "SerenityOS"],
    },
  ];

  return (
    <section className="flex flex-1 gap-8 mt-12 max-w-[1248px] w-full mx-auto py-8 px-6 max-[1200px]:max-w-[930px]">
      <LeftAside />
      <article className="flex-1 min-w-0 mt-5">
        <div className="flex flex-col gap-6">
          {threadData.map((thread) => {
            return <ThreadCard key={thread.id} thread={thread} />;
          })}
        </div>
      </article>
      <RightAside />
    </section>
  );
}
