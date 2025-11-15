;
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { HeaderItem } from "../../../../constants/types/menu";
import ThemeToggler from '../ThemeToggler';

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = useLocation().pathname;
  const handleMouseEnter = () => {
      setSubmenuOpen(true);
    }
    const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };  

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={item.to}
        className={`text-17 flex font-medium hover:text-primary capitalized  ${
          path === item.to ? "text-primary " : " text-muted "
        }`}
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
      </Link>
      {submenuOpen && (
        <div
          className={`absolute py-2 left-0 mt-0.5 w-60 bg-white dark:bg-darklight dark:text-white shadow-lg rounded-lg `}
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {item.submenu?.map((subItem, index) => (
            <Link
              key={index}
              to={subItem.to}
              className={`block px-4 py-2   ${
                path === subItem.to
                  ? "bg-primary text-white"
                  : "text-black dark:text-white hover:bg-primary"
              }`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
