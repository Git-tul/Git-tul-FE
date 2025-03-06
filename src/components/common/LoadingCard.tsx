import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingCardProps {
  cardStyle: string;
  skeletonCount: number;
  skeletonStyle: string;
}

export default function LoadingCard({ cardStyle, skeletonCount, skeletonStyle }: LoadingCardProps) {
  const skeletonArray = Array.from({ length: skeletonCount }, (_, i) => i);

  return (
    <Card className={`${cardStyle}`}>
      <CardHeader>
        <CardTitle className="text-foreground">인기 해시태그 🏷️</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {skeletonArray.map((count) => {
          return <Skeleton key={count} className={`${skeletonStyle}`} />;
        })}
      </CardContent>
    </Card>
  );
}
