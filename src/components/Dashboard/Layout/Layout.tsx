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
    <div className="flex w-full h-screen gap-4">
      <Sidebar />

      <div className="flex flex-col flex-1 bg-gray-50">
        <Topbar userName={userName || "User"} />
        <main className="p-6 md:p-6 overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
}
