import PostCard from "@/app/(home)/post/_components/PostCard";

export default function Post() {
  return (
    <section className="flex flex-1 gap-8 mt-12 max-w-[1248px] w-full mx-auto py-8 px-6 max-[1200px]:max-w-[930px]">
      <div className="flex flex-col gap-8 w-full">
        <h1 className="text-2xl">카드 발행</h1>
        <PostCard />
      </div>
    </section>
  );
}
