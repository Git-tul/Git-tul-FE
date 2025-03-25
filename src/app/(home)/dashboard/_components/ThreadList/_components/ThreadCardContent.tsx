import { CardContent } from "@/components/ui/card";
import { Thread } from "@git-tul-types";
import Tag from "@/app/(home)/dashboard/_components/ThreadList/_components/Tag";
import Image from "next/image";

export default function ThreadCardContent({ title, description, starCount, forkCount, tags }: Thread) {
  return (
    <CardContent className="flex flex-col gap-4 ">
      <div className="flex items-center gap-2">
        <Image src="/icons/github_icon.svg" alt="스레드 아이콘" width={20} height={20} />
        <h1>{title}</h1>
      </div>
      <p>{description}</p>
      <div className="flex items-center gap-2 overflow-x-scroll scroll-hidden">
        {tags.map((tag) => {
          return <Tag key={tag} tag={tag} />;
        })}
      </div>
      <div className="flex items-center gap-5 pb-4 border-b-1 border-input/15">
        <div className="flex items-center bg-muted-foreground/50 py-1 px-2 rounded-xl gap-1">
          <Image src="/icons/star_icon.svg" alt="스타 아이콘" width={16} height={16} />
          <span className="text-[13px]">{starCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center bg-muted-foreground/50 py-1 px-2 rounded-xl gap-1">
          <Image src="/icons/share_icon.svg" alt="공유 아이콘" width={16} height={16} />
          <span className="text-[13px]">{forkCount.toLocaleString()}</span>
        </div>
      </div>
    </CardContent>
  );
}
