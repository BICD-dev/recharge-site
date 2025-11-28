// Sidebar.tsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdLocalPhone,
  MdAccountBalanceWallet,
  MdReceipt,
  MdPerson,
  MdLogout,
  MdClose,
  MdSettings,
  MdSecurity,
  MdHelpCenter,
} from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";

const menuItems = [
  { name: "Dashboard", icon: MdDashboard, path: "/dashboard/personal/user" },
  { name: "Transactions", icon: MdReceipt, path: "/dashboard/transactions" },
  { name: "Wallet", icon: MdAccountBalanceWallet, path: "/dashboard/fund-wallet" },
  { name: "Profile", icon: MdPerson, path: "/dashboard/profile" },
  { name: "Settings", icon: MdSettings, path: "/dashboard/settings" },
  { name: "Security", icon: MdSecurity, path: "/dashboard/security" },
  { name: "Support", icon: MdHelpCenter, path: "/dashboard/support" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile only
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop only
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex flex-col gap-5 bg-white px-4 py-3 shadow-sm border-b border-gray-100">
        <button
          onClick={toggleSidebar}
          className="p-2 w-fit rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center"
        >
          {isOpen ? <MdClose size={24} /> : <IoIosArrowForward size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-md z-50
          transition-all duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
          ${sidebarCollapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        <div className="flex flex-col h-full justify-between">

          {/* Desktop Collapse Button */}
          <div className="hidden md:flex justify-end mt-4 px-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all"
            >
              <IoIosArrowForward
                size={22}
                className={`${sidebarCollapsed ? "rotate-180" : ""} transition-transform`}
              />
            </button>
          </div>

          {/* Menu */}
          <nav className="mt-6 flex-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 m-2 rounded-lg transition-colors
                  hover:bg-[#60da68] hover:text-white
                  ${
                    isActive
                      ? "bg-[#60da68] text-white"
                      : "text-gray-700"
                  }`
                }
                onClick={() => setIsOpen(false)} // Close on mobile
              >
                <item.icon size={24} />

                {/* Text hides on collapse */}
                <span
                  className={`
                    font-medium whitespace-nowrap overflow-hidden transition-all duration-200
                    ${sidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
                  `}
                >
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <button
            className="flex items-center gap-3 px-6 py-3 text-red-500 border border-red-500 
              hover:bg-red-500 hover:text-white transition-colors rounded-lg m-2 mb-6 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <MdLogout size={24} />
            <span
              className={`
                font-medium transition-all duration-200
                ${sidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
