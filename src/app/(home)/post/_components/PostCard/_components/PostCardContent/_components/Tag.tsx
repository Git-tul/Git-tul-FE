import { X } from "lucide-react";

interface TagProps {
  tagIndex: number;
  handleRemoveTag: (index: number) => void; // 파라미터 이름 수정
  tag: string;
}

export default function Tag({ tagIndex, handleRemoveTag, tag }: TagProps) {
  return (
    <div className="flex items-center gap-1 bg-primary/30 text-white text-sm px-2 py-1 rounded-full">
      <p className="relative bottom-[1px]">{tag}</p>
      <button onClick={() => handleRemoveTag(tagIndex)}>
        <X size={14} className="ml-1 cursor-pointer hover:text-red-200" />
      </button>
    </div>
  );
}
