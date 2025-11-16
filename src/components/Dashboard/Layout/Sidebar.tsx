// Sidebar.tsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdLocalPhone,
  MdDataUsage,
  MdAccountBalanceWallet,
  MdReceipt,
  MdPerson,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";

const menuItems = [
  { name: "Dashboard", icon: MdDashboard, path: "/" },
  { name: "Airtime", icon: MdLocalPhone, path: "/airtime" },
  { name: "Data", icon: MdDataUsage, path: "/data" },
  { name: "Electricity", icon: MdDataUsage, path: "/electricity" },
  { name: "Cable", icon: MdDataUsage, path: "/cable" },
  { name: "WAEC", icon: MdDataUsage, path: "/waec" },
  { name: "Wallet", icon: MdAccountBalanceWallet, path: "/wallet" },
  { name: "Transactions", icon: MdReceipt, path: "/transactions" },
  { name: "Profile", icon: MdPerson, path: "/profile" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-primary font-bold text-lg">Menu</h1>
        <button onClick={toggleSidebar}>
          {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static transition-transform duration-300`}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Menu */}
          <nav className="mt-8 flex-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 text-primary hover:bg-primary hover:text-white transition-colors rounded-lg m-2 ${
                    isActive ? "bg-primary text-white" : ""
                  }`
                }
                onClick={() => setIsOpen(false)} // Close sidebar on mobile
              >
                <item.icon size={24} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <button
            className="flex items-center gap-3 px-6 py-3 text-primary hover:bg-red-500 hover:text-white transition-colors rounded-lg m-2 mb-6"
            onClick={() => {
              // TODO: Add logout logic
              console.log("Logout clicked");
            }}
          >
            <MdLogout size={24} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
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
