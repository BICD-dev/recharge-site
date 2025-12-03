// Sidebar.tsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdReceipt,
  MdLogout,
  MdClose,
  MdSettings,
  MdHelpCenter,
  MdMenu,
} from "react-icons/md";

const menuItems = [
  { name: "Dashboard", icon: MdDashboard, path: "/dashboard/personal/user" },
  { name: "Transactions", icon: MdReceipt, path: "/dashboard/transactions" },
  { name: "Settings", icon: MdSettings, path: "/dashboard/settings" },
  { name: "Support", icon: MdHelpCenter, path: "/dashboard/support" },
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Toggle Button - Only show on mobile */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`
          md:hidden fixed top-1/2 -translate-y-1/2 z-50
          p-3 rounded-r-xl shadow-lg
          transition-all duration-300 ease-in-out
          ${
            mobileOpen
              ? "left-64 bg-red-500 hover:bg-red-600"
              : "left-0 bg-green-600 hover:bg-green-700"
          }
          text-white active:scale-95
        `}
      >
        {mobileOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          h-full bg-white shadow-xl flex flex-col
          w-64
          
          /* Mobile: fixed and slide in/out */
           top-0 left-0 z-40
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          
          /* Desktop: static, always visible, no animation */
          md:translate-x-0 md:static md:shadow-md md:z-auto
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-green-600">Menu</h2>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-6 mx-3 my-1 rounded-lg 
                transition-all duration-200
                ${
                  isActive
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                }
                `
              }
              onClick={() => setMobileOpen(false)}
            >
              <item.icon size={22} className="shrink-0" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            className="flex items-center gap-3 w-full px-4 py-3 
              text-red-500 border-2 border-red-500 rounded-lg
              hover:bg-red-500 hover:text-white 
              transition-all duration-200 font-medium
              active:scale-95"
            onClick={() => {
              setMobileOpen(false);
              navigate("/login");
            }}
          >
            <MdLogout size={22} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;