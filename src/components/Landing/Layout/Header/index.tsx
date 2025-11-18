'use client'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Logo from './Logo'
import HeaderLink from './Navigation/HeaderLink'
import MobileHeaderLink from './Navigation/MobileHeaderLink'
import { headerData } from './Navigation/menuData'

const Header: React.FC = () => {
  const pathUrl = useLocation().pathname
  const isAuthPage = pathUrl === "/login" || pathUrl === "/register"

  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <header className={`fixed top-0 z-50 w-full transition-all bg-darkmode pt-3 pb-3`}>
      <div className="container px-4 flex items-center justify-between">

        {/* LOGO */}
        <div className={`${isAuthPage ? "text-gray-700" : "text-white"}`}>
          <Logo />
        </div>

        {/* DESKTOP NAV */}
        <nav
          className={`hidden lg:flex grow items-center gap-8 justify-center 
          ${isAuthPage ? "text-gray-700" : "text-white"}`}>
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>

        {/* DESKTOP BUTTONS */}
        <div className="hidden lg:flex items-center justify-between w-1/4">
          <Link to="/login">
            <button
              className={`px-10 py-2 rounded-lg border capitalize transition cursor-pointer hover:bg-[#60da68]
                ${isAuthPage
                  ? "text-gray-700 bg-white border-gray-700"
                  : "bg-white "
                }`}>
              Login
            </button>
          </Link>

          <Link to="/register">
            <button
              className={`px-10 py-2 rounded-lg capitalize transition border cursor-pointer hover:bg-white hover:text-black
                ${isAuthPage
                  ? "text-white bg-[#60da68] border-primary"
                  : "text-black bg-[#60da68]"
                }`}>
              Sign up
            </button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="block lg:hidden p-2 rounded-lg"
        >
          <span className={`block w-6 h-0.5 ${isAuthPage ? "bg-gray-700" : "bg-white"}`}></span>
          <span className={`block w-6 h-0.5 mt-1.5 ${isAuthPage ? "bg-gray-700" : "bg-white"}`}></span>
          <span className={`block w-6 h-0.5 mt-1.5 ${isAuthPage ? "bg-gray-700" : "bg-white"}`}></span>
        </button>
      </div>

      {/* OVERLAY */}
      {navbarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setNavbarOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-full max-w-xs 
        bg-darkmode shadow-lg z-50 transform transition-transform duration-300 
        ${navbarOpen ? "translate-x-0" : "translate-x-full"}`}>

        <div className="flex items-center justify-between p-4">
          <Logo />
          <button
            onClick={() => setNavbarOpen(false)}
            className="w-5 h-5 bg-[url('/images/closed.svg')] bg-no-repeat bg-contain dark:invert"
          />
        </div>

        <nav className="flex flex-col items-start p-4">
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item}  />
          ))}

          {/* MOBILE AUTH BUTTONS */}
          <div className="mt-4 flex flex-col gap-4 w-full">
            <Link
              to="/login"
              onClick={() => setNavbarOpen(false)}
              className="bg-transparent border border-primary text-[#60da68] px-4 py-2 rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setNavbarOpen(false)}
              className="bg-[#60da68] text-white px-4 py-2 rounded-lg"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
