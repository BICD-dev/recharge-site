// Sidebar.tsx
import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdLocalPhone,
  MdDataUsage,
  MdAccountBalanceWallet,
  MdReceipt,
  MdPerson,
  MdLogout,
  MdClose,
  MdLightbulb,
  MdCastForEducation,
  MdCable,
} from "react-icons/md";
import {IoIosArrowForward} from "react-icons/io";
const menuItems = [
  { name: "Dashboard", icon: MdDashboard, path: "/dashboard/personal/user" },
  { name: "Airtime", icon: MdLocalPhone, path: "/dashboard/airtime" },
  { name: "Data", icon: MdDataUsage, path: "/dashboard/data" },
  { name: "Electricity", icon: MdLightbulb, path: "/dashboard/electricity" },
  { name: "Cable", icon: MdCable, path: "/dashboard/cable" },
  { name: "WAEC", icon: MdCastForEducation, path: "/dashboard/waec" },
  { name: "Wallet", icon: MdAccountBalanceWallet, path: "/dashboard/fund-wallet" },
  { name: "Transactions", icon: MdReceipt, path: "/dashboard/transactions" },
  { name: "Profile", icon: MdPerson, path: "/dashboard/profile" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
<div className="md:hidden flex flex-col gap-5 bg-white px-4 py-3 shadow-sm border-b border-gray-100">
  <div></div>
  

  <button
    onClick={toggleSidebar}
    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center"
  >
    {isOpen ? <MdClose size={24} /> : <IoIosArrowForward size={24} />}
  </button>
</div>



      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static transition-transform duration-300`}
      >
        <div className="flex flex-col h-screen justify-between">
          
          {/* Menu */}
          <nav className="mt-8 flex-1 pt-10">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-3 hover:bg-[#60da68] hover:text-white transition-colors rounded-lg m-2 ${
                    isActive ? "bg-[#60da68] text-white" : "text-gray-700"
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
            className="flex items-center gap-3 px-6 py-3 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-lg m-2 mb-6 cursor-pointer"
            onClick={() => {
              // TODO: Add logout logic
              console.log("Logout clicked");
              navigate("/login");
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
