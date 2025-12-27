import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
import type { ReactNode } from "react";
import { useUser } from "@/hooks/useUser";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: user } = useUser();
  const userName = user?.first_name ?? "User";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-gray-50 min-w-0">
        <Topbar userName={userName} />

        <main className="flex-1 p-3 md:p-6 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}