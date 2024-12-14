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
        {isOpen ? <FaTimes size={24} className="text-white" /> : <FaBars size={24} className="text-gray-800" />}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white md:w-[170px] lg:w-52 transform transition-transform duration-300  ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <ul className="flex flex-col mt-16 space-y-6 px-6">
          <li><NavLink to="/admin/dashboard/home" onClick={handleLinkClick}>Home</NavLink></li>
          <li><NavLink to="/admin/dashboard/student" onClick={handleLinkClick}>Home</NavLink></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
