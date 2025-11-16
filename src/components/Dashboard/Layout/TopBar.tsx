// Topbar.tsx
import React from "react";
import { MdNotifications } from "react-icons/md";

interface TopbarProps {
  title: string;
  userName?: string;
  userAvatarUrl?: string;
}

const Topbar: React.FC<TopbarProps> = ({
  title,
  userName = "User",
  userAvatarUrl,
}) => {
  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 shadow-md">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-primary">{title}</h1>

      {/* Right side: notifications + avatar */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative text-primary hover:text-primary-dark transition-colors">
          <MdNotifications size={28} />
          {/* Notification badge */}
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 cursor-pointer">
          {userAvatarUrl ? (
            <img
              src={userAvatarUrl}
              alt={userName}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {userName.charAt(0)}
            </div>
          )}
          <span className="text-primary font-medium hidden md:inline">
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
