"use client";

import dynamic from "next/dynamic";
import { useAuthStateListener } from "@/store/usePostStore";

const LeftAside = dynamic(() => import("./_components/LeftAside"));
const RightAside = dynamic(() => import("./_components/RightAside"));
const ThreadList = dynamic(() => import("./_components/ThreadList"));

export default function Dashboard() {
  // 인증 상태 변화를 감지하는 훅 사용
  useAuthStateListener();

  return (
    <section className="flex flex-1 gap-8 mt-12 max-w-[1248px] w-full mx-auto py-8 px-6 max-[1200px]:max-w-[930px]">
      <LeftAside />
      <ThreadList />
      <RightAside />
    </section>
  );
}
