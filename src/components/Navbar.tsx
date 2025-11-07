import { useState } from "react";
import {Link, NavLink} from 'react-router-dom'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = ()=> setIsOpen(!isOpen)


    return ( 
        <div className="fixed top-0 left-0 z-50 w-full px-6 py-3 flex justify-between items-center bg-white border-b-4 border-gray-600">
                  {/* <Link to="/"> <img
                        src={logo}
                        alt="rechargex Logo"
                        // className="h-20 lg:h-20 lg:h-24  lg:max-w-[280px] lg:max-w-[320px] object-contain"
                        className="w-[15rem] cursor-pointer lg:w-[15rem] lg:w-[20rem]"
                     /></Link> replace with the logo*/} 
                     <h1 className="font-bold text-2xl cursor-pointer pb-2  ">Recharge<b className="text-[#cc2b03] font-bold text-2xl">X</b></h1>

                     {/* desktop menu */}
                     <ul className="hidden font-semibold text-black lg:flex justify-between  w-1/3">
                        <NavLink to="/" className={({isActive}) => isActive ? "text-[1.2rem] text-[#cc2b03] pb-2 capitalize font-semibold underline" : "text-gray-700 text-[1.2rem] pb-2 no-underline"} >
                        <li>Personal</li>
                        </NavLink>
                        <NavLink to="/business" className={({isActive}) => isActive ? "text-[1.2rem] text-[#cc2b03] pb-2 capitalize font-semibold underline" : "text-gray-700 text-[1.2rem] pb-2 no-underline"} >
                        <li>Business</li>
                        </NavLink>
                        <NavLink to="/commerce" className={({isActive}) => isActive ? "text-[1.2rem] text-[#cc2b03] pb-2 capitalize font-semibold underline" : "text-gray-700 text-[1.2rem] pb-2 no-underline"} >
                        <li>Commerce</li>
                        </NavLink>
                        <NavLink to="/career" className={({isActive}) => isActive ? "text-[1.2rem] text-[#cc2b03] pb-2 capitalize font-semibold underline" : "text-gray-700 text-[1.2rem] pb-2 no-underline"} >
                        <li>We're Hiring</li>
                        </NavLink>

                     </ul>
                     <div className="hidden lg:flex items-center justify-between w-1/4">
                        <NavLink to="/login">
                            <button className="bg-white px-10 py-2 rounded-lg cursor-pointer transition text-[#cc2b03] capitalize border">
                            Login
                            </button>
                        </NavLink>
                        <NavLink to="/register">
                            <button className="bg-[#cc2b03] px-10 py-2 rounded-lg cursor-pointer hover:bg-[#cc2b03] transition text-white capitalize">
                            sign up
                            </button>
                        </NavLink>
                    </div>

                    {/* mobile menu toggle */}
                    <div className="lg:hidden z-50" onClick={toggleSidebar}>
                        <div
                        className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                        >
                        {/* {isOpen ? <X color="white" size={32} /> : <Menu color="black" size={32} />} */}
                        {isOpen ? <button className="border-none text-2xl">X</button> : <button className="border-none text-2xl">&equiv;</button>}
                        </div>
                    </div>

                    {/* mobile sidebar */}
                    <div className={`fixed top-0 left-0 h-full w-[70%] bg-white p-6 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
                        <ul className="flex flex-col gap-6 text-lg mt-8 font-semibold text-[#cc2b03] mb-6">
          <Link to="/" onClick={toggleSidebar}><li>Personal</li></Link>
          <Link to="/business" onClick={toggleSidebar}><li>Business</li></Link>
          <Link to="/commerce" onClick={toggleSidebar}><li>Commerce</li></Link>
          <Link to="/career" onClick={toggleSidebar}><li>We're Hiring</li></Link>
          
        </ul>
                        <div className="flex flex-col gap-4">
                            <Link to="/login">
                                <button className="bg-white px-10 py-2 rounded-lg cursor-pointer transition text-[#cc2b03] capitalize border">
                            Login
                            </button>
                            </Link>

                            <Link to="/register">
                                <button className="bg-[#cc2b03] px-10 py-2 rounded-lg cursor-pointer hover:bg-[#cc2b03] transition text-white capitalize">
                            sign up
                            </button>
                            </Link>
                        </div>

                    </div>

                    {/* blur background */}
                    {isOpen && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                                 onClick={toggleSidebar}></div>
                                )
                    }
        </div>
     );
}
 
export default Navbar;