import { useState } from "react";
import {HashLink} from "react-router-hash-link";
import type { HeaderItem } from "../../../../../constants/types/menu";

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  return (
    <div className="relative w-full">
      <HashLink
        to={item.to}
        onClick={item.submenu ? handleToggle : undefined}
        className="flex items-center justify-between w-full py-2 text-muted focus:outline-hidden"
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </HashLink>
      {submenuOpen && item.submenu && (
        <div className="bg-white p-2 w-full">
          {item.submenu.map((subItem, index) => (
            <HashLink
              key={index}
              to={subItem.to}
              className="block py-2 text-gray-500 hover:bg-gray-200"
              onClick={handleToggle}
            >
              {subItem.label}
            </HashLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
