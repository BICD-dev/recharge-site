import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-gray-50">
        <Topbar userName="Bright" />
        <main className="p-1 md:p-6">{children}</main>
      </div>
    </div>
  );
}
