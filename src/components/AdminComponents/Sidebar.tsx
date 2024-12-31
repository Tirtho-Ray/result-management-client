import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle button - only visible on small devices */}
      <div className="md:hidden fixed top-4 left-4 z-50 text-white cursor-pointer" onClick={toggleSidebar}>
        {isOpen ? <FaTimes size={24} className="text-white z-100" /> : <FaBars size={24} className="text-gray-800" />}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-[200px] md:w-[180px] lg:w-56 transform transition-transform duration-300  ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h1 className="text-center font-serif font-bold mt-12 md:mt-6 md:text-md lg:text-lg ">Admin Dashboard </h1>
        <ul className="flex flex-col mt-8 space-y-2 px-3 text-center">
            <li className="px-3 py-2 border border-gray-600 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition ease-out duration-200 shadow-lg">
                <NavLink to="/admin/dashboard/home" onClick={handleLinkClick} className="block text-md lg:text-lg">Student Data</NavLink>
            </li>
            <li className="px-3 py-2 border border-gray-600 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition ease-out duration-200 shadow-lg">
                <NavLink to="/admin/dashboard/student" onClick={handleLinkClick} className="block text-md lg:text-lg">Manage Student</NavLink>
            </li>
            <li className="px-3 py-2 border border-gray-600 rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition ease-out duration-200 shadow-lg">
                <NavLink to="/admin/dashboard/subject" onClick={handleLinkClick} className="block text-md lg:text-lg">Manage Subject</NavLink>
            </li>
            <li className="px-3 py-2 border border-gray-600 rounded-lg hover:bg-yellow-500 mt-10 hover:text-gray-900 transition ease-out duration-200 shadow-lg">
                <NavLink to="/admin/dashboard/result" onClick={handleLinkClick} className="block text-md lg:text-lg">Manage Result</NavLink>
            </li>
        
            <li className="px-3 py-2 border border-gray-600 rounded-lg hover:bg-yellow-500 mt-10 hover:text-gray-900 transition ease-out duration-200 shadow-lg">
                <NavLink to="/" onClick={handleLinkClick} className="block text-md lg:text-lg">Home</NavLink>
            </li>
        
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
