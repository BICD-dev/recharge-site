// Topbar.tsx
import { MdNotifications } from "react-icons/md";
import { Link } from "react-router-dom";

interface TopbarProps {
  userName?: string;
  userAvatarUrl?: string;
}

const Topbar: React.FC<TopbarProps> = ({
  userName = "User",
  userAvatarUrl,
}) => {
  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 shadow-md">
      {/* logo */}
      <div className="flex items-center gap-2">
      <Link to="/"><img src="/images/logo/logo8.png" alt="brand_pic" width={40} height={40}/></Link>
    {/* <h1 className="text-gray-800 font-semibold text-lg">Datafy</h1> */}
  </div>

      {/* Right side: notifications + avatar */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative text-black hover:text-[#60da68]-dark transition-colors">
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
            <Link to="/dashboard/settings">
              <div className="w-10 h-10 rounded-full bg-[#60da68] flex items-center justify-center text-white font-bold">
                {userName.charAt(0)}
              </div>
            </Link>
          )}
          <span className="text-[#60da68] font-medium hidden md:inline">
            {userName}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
