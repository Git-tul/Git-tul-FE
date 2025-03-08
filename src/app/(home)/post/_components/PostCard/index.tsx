"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function PostCard() {
  return (
    <Card className="w-full h-fit max-w-[736px] flex flex-col gap-4">
      <CardHeader>
        <div className="flex gap-2 items-center">
          <p>AI 요약 생성</p>
          <Switch />
        </div>
        <CardContent className="flex flex-col"></CardContent>
      </CardHeader>
    </Card>
  );
}
