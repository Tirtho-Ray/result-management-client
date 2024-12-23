import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import gsap from "gsap";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        if (menuOpen) {
            gsap.to(".mobile-menu", {
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
            });
        } else {
            gsap.to(".mobile-menu", {
                x: "-100%",
                opacity: 0,
                duration: 0.6,
                ease: "power3.in",
            });
        }
    }, [menuOpen]);

    return (
        <div className="sticky top-0 bg-white shadow-lg z-50">
            <nav className="flex items-center justify-between px-6 py-4 md:px-8 lg:px-16">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600 hover:scale-110 transition-transform duration-300">
                    MyLogo
                </div>

                {/* Menu Toggle Button for Mobile */}
                <div className="md:hidden text-2xl text-gray-700 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* Middle Pages */}
                <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    <li className="relative group">
                        <span className="hover:text-blue-600 cursor-pointer transition-colors duration-300">
                            Home
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                    <li className="relative group">
                        <span className="hover:text-blue-600 cursor-pointer transition-colors duration-300">
                            About
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                    <li className="relative group">
                        <span className="hover:text-blue-600 cursor-pointer transition-colors duration-300">
                            Services
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </ul>

                {/* Login Button */}
                <button className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                    Login
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className="mobile-menu fixed top-0 left-0 w-full h-full bg-white shadow-lg z-40 flex flex-col items-center justify-center text-gray-700 font-medium -translate-x-full opacity-0">
                <div className="absolute top-6 right-6 text-2xl text-gray-700 cursor-pointer" onClick={closeMenu}>
                    <FaTimes />
                </div>
                <ul className="space-y-6 text-center text-lg">
                    <li className="relative group" onClick={closeMenu}>
                        <span className="hover:text-blue-600 cursor-pointer transition-colors duration-300">
                            Home
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                    <li className="relative group" onClick={closeMenu}>
                        <span className="hover:text-blue-600 cursor-pointer transition-colors duration-300">
                            About
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                    <li className="relative group" onClick={closeMenu}>
                        <span className="hover:text-blue-600 cursor-pointer transition-colors duration-300">
                            Services
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </ul>
                <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300" onClick={closeMenu}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Navbar;
