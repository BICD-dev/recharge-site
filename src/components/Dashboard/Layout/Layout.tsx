import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  first_name?: string;
  [key: string]: any; // for other properties
}

export default function Layout({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("token"); // adjust key if different
      if (!token) return;

      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.first_name) {
        setUserName(decoded.first_name);
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }, []);

 return (
  <div className="flex h-screen overflow-hidden">
  <Sidebar />

  <div className="flex flex-col flex-1 bg-gray-50 min-w-0">
    <Topbar userName={userName || "User"} />
    
    {/* Add h-full or flex-1 to make main scrollable */}
    <main className="flex-1 p-3 md:p-6 overflow-y-auto overflow-x-hidden">
      {children}
    </main>
  </div>
</div>
)
};