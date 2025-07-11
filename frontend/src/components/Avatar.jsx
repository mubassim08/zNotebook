import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Avatar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const showUsername = () => localStorage.getItem("username");
  const showEmail = () => localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setIsOpen(false);
    navigate("/login");
    toast.success("Logged out");
  };

  // Close pannel on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {localStorage.getItem("token") && (
        <>
          <FaUserCircle
            size={30}
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />

          <div
            id="userDropdown"
            className={`absolute right-0 mt-2 z-10 w-44 origin-top-right transform transition-all duration-200 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600 ${
              isOpen
                ? "scale-100 opacity-100 visible"
                : "scale-95 opacity-0 invisible"
            }`}
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div className="mb-1">{showUsername()}</div>
              <div className="font-medium truncate">{showEmail()}</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <FaMoon />
                <span>Theme</span>
              </li>
            </ul>
            <div className="py-1">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full"
              >
                <PiSignOutBold />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
