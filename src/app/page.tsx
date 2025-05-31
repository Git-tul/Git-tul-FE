import { redirect } from "next/navigation";

export default function Home() {
  // 서버 컴포넌트에서 리다이렉트 수행
  redirect("/dashboard");
}
