import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import formatCount from "@/utils/formatCount";
import Image from "next/image";

export default function RecommandProjectCard() {
  const projectData = [
    {
      projectName: "Next.js 스타터 템플릿",
      starPoint: "1200",
    },
    {
      projectName: "CLI 개발 도구",
      starPoint: "892",
    },
    {
      projectName: "ORM 라이브러리",
      starPoint: "756",
    },
  ];

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="text-foreground">추천 프로젝트 📕</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {projectData.map((project, idx) => {
          return (
            <div className="flex items-center gap-3" key={idx}>
              <Image src="/icons/project_code_icon.svg" alt="추천 프로젝트 아이콘" width={40} height={40} />
              <div className="flex flex-col">
                <p className="text-white text-sm">{project.projectName}</p>
                <div>
                  <span className="text-[13px]">⭐</span>
                  <span className="text-[11px]">{formatCount(project.starPoint)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
