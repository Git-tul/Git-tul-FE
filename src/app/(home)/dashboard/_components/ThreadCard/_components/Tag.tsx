export default function Tag({ tag }: { tag: string }) {
  return (
    <div key={tag} className="px-2 rounded-lg text-primary bg-primary/10 flex items-center h-[24px]">
      <span className="text-[12px]"># {tag}</span>
    </div>
  );
}
