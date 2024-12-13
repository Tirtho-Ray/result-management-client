import { useState } from "react";
import { RxHamburgerMenu, RxCrossCircled } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col ${isOpen ? "w-64" : "w-16"} transition-all duration-300 bg-gray-800 h-full`}>
      {/* Sidebar Toggle Button */}
      <div
        className="absolute top-4 right-0 p-2 bg-gray-800 rounded-l-md cursor-pointer text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <RxCrossCircled size={24} /> : <RxHamburgerMenu size={24} />}
      </div>

      {/* Sidebar Menu */}
      <div className={`mt-16 ${isOpen ? "block" : "hidden"} md:block`}>
        <ul className="space-y-4 text-white">
          <li>
            <NavLink
              to="/admin/dashboard/home"
              className="block px-4 py-2 hover:bg-gray-600 rounded-md"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/dashboard/student"
              className="block px-4 py-2 hover:bg-gray-600 rounded-md"
            >
              Students
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
