import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function PopularDeveloperCard() {
  const developerData = [
    {
      nickname: "박지훈",
      role: "풀스택 개발자",
      profileImage: null,
    },
    {
      nickname: "김서연",
      role: "AI 엔지니어",
      profileImage: null,
    },
    {
      nickname: "이민우",
      role: "프론트엔드 개발자",
      profileImage: null,
    },
  ];

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="text-foreground">인기 개발자 🖥️</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {developerData.map((developer, idx) => {
          return (
            <div className="flex items-center gap-3" key={idx}>
              {developer.profileImage ? (
                <Avatar>
                  <AvatarImage src={developer.profileImage} />
                  <AvatarFallback>loading..</AvatarFallback>
                </Avatar>
              ) : (
                <Image src="icons/default_profile_icon.svg" alt="기본 프로필 아이콘" width={40} height={40} />
              )}
              <div className="flex flex-col">
                <p className="text-white text-sm">{developer.nickname}</p>
                <span className="text-[11px]">{developer.role}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
