import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: user } = useUser();
  const userName = user?.first_name ?? "User";
  const showOnboardWarning = Boolean(user && !user?.is_onboarded);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-gray-50 min-w-0">
        <Topbar userName={userName} userAvatarUrl={user?.avatar_url} />

        {showOnboardWarning && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-3 m-3 rounded flex items-center justify-between">
            <div className="text-sm">
              Complete your onboarding for a smooth experience.
            </div>
            <div>
              <Link
                to="/onboarding"
                className="ml-4 inline-flex items-center px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded"
              >
                Continue Onboarding
              </Link>
            </div>
          </div>
        )}

        <main className="flex-1 p-3 md:p-6 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}