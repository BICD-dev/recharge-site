// Sidebar.tsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
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
  {
    name: "Wallet",
    icon: MdAccountBalanceWallet,
    path: "/dashboard/fund-wallet",
  },
  { name: "Profile", icon: MdPerson, path: "/dashboard/profile" },
  { name: "Settings", icon: MdSettings, path: "/dashboard/settings" },
  { name: "Security", icon: MdSecurity, path: "/dashboard/security" },
  { name: "Support", icon: MdHelpCenter, path: "/dashboard/support" },
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
    fixed top-0 left-0 h-full bg-white shadow-md z-50
    transition-all duration-300 flex flex-col justify-between

    /* Desktop: always full width */
    md:static md:translate-x-0 md:w-64

    /* Mobile collapsed: wider and shows only icons */
    ${mobileOpen ? " w-64 translate-x-0" : "w-20 translate-x-0 md:w-64 static"}
  `}
      >
        <div className="md:hidden flex flex-col gap-5 bg-white px-4 py-3 shadow-sm border-b border-gray-100">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 w-fit rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center"
          >
            {mobileOpen ? (
              <MdClose size={28} />
            ) : (
              <IoIosArrowForward size={28} />
            )}
          </button>
        </div>
        <div className="text-white">space</div>
        {/* MENU */}
        <nav className="mt-6 flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center 
    ${mobileOpen ? "justify-start gap-3 px-4" : "pl-6 justify-start gap-3"}  
    py-3 m-2 rounded-lg transition-colors
    hover:bg-[#60da68] hover:text-white 
    ${isActive ? "bg-[#60da68] text-white" : "text-gray-700"}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <item.icon
                size={mobileOpen ? 24 : 30}
                className={`transition-all duration-200`}
              />

              {/* Hide text when mobile sidebar is collapsed */}
              <span
                className={`
                  font-medium pl-4 whitespace-nowrap transition-all duration-200
                  ${
                    mobileOpen
                      ? "opacity-100 w-auto"
                      : "opacity-0 w-0 md:opacity-100 md:w-auto"
                  }
                `}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <button
          className="flex items-center gap-3 px-4 py-3 text-red-500 border border-red-500 
            hover:bg-red-500 hover:text-white transition-colors rounded-lg m-2 mb-6 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <MdLogout size={24} />

          <span
            className={`
              font-medium transition-all duration-200
              ${
                mobileOpen
                  ? "opacity-100 w-auto"
                  : "opacity-0 w-0 md:opacity-100 md:w-auto"
              }
            `}
          >
            Logout
          </span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
