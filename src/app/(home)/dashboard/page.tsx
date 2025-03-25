import dynamic from "next/dynamic";

const LeftAside = dynamic(() => import("./_components/LeftAside"));
const RightAside = dynamic(() => import("./_components/RightAside"));
const ThreadList = dynamic(() => import("./_components/ThreadList"));

export default function Dashboard() {
  return (
    <section className="flex flex-1 gap-8 mt-12 max-w-[1248px] w-full mx-auto py-8 px-6 max-[1200px]:max-w-[930px]">
      <LeftAside />
      <ThreadList />
      <RightAside />
    </section>
  );
}
