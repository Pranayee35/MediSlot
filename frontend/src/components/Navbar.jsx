import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/medislot-logo.svg";
import profile_pic from "../assets/profile_pic.png";
import dropDown_icon from "../assets/dropdown_icon.svg";
import menu_icon from "../assets/menu_icon.svg";
import cross_icon from "../assets/cross_icon.png";

import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, setToken,userData } = useContext(AppContext);


  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  // Close dropdown when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={logo}
        alt="logo"
      />

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <li>
          <NavLink to="/">HOME</NavLink>
        </li>
        <li>
          <NavLink to="/about">ABOUT</NavLink>
        </li>
        <li>
          <NavLink to="/contact">CONTACT</NavLink>
        </li>
        <li>
          <NavLink to="/doctors">ALL DOCTORS</NavLink>
        </li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">
        {token && userData 
        ? (
          /* Profile Dropdown */
          <div
            className="flex items-center gap-2 cursor-pointer relative"
            onClick={() => setOpen((prev) => !prev)}
          >
            <img className="rounded-full w-8" src={userData.image} alt="profile" />
            <img className="w-2" src={dropDown_icon} alt="dropdown" />

            {/* Dropdown Menu */}
            <div
              className={`absolute top-10 right-0 min-w-48 bg-stone-100 rounded-lg 
              flex flex-col gap-4 p-4 z-50 ${
                open ? "flex" : "hidden"
              }`}
            >
              <p
                onClick={() => navigate("/myprofile")}
                className="hover:text-black cursor-pointer"
              >
                My Profile
              </p>

              <p
                onClick={() => navigate("/myappointments")}
                className="hover:text-black cursor-pointer"
              >
                My Appointments
              </p>

              <p
                onClick={logout}
                className="hover:text-black cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-3 rounded-full font-light hidden sm:block"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className={`w-6 cursor-pointer ${token?"md:hidden" : "hidden"}`}
          src={menu_icon}
          alt="menu"
        />

        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={logo} alt="logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={cross_icon}
              alt="close"
            />
          </div>

          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              HOME
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              ALL DOCTORS
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              ABOUT
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              CONTACT
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
