import Header from "@/components/header/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col w-full relative">
      <Header />
      {children}
    </main>
  );
}
