import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    navigate,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <nav className="flex items-center justify-between py-5 px-4 md:px-10 font-medium relative bg-white z-50 shadow-sm">
      {/* Logo */}
      <Link to="/">
        <img className="w-36 cursor-pointer" src={assets.logo} alt="Logo" />
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden sm:flex gap-8 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, i) => (
          <NavLink
            key={i}
            to={path}
            className={({ isActive }) =>
              `relative after:block after:w-full after:h-[2px] after:bg-gray-700 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                isActive ? "text-black after:scale-x-100" : ""
              }`
            }
          >
            <p className="uppercase">{path === "/" ? "Home" : path.slice(1)}</p>
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile Dropdown */}
        <div className="relative group">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
          />
          {token && (
            <div className="absolute right-0 top-8 bg-white shadow-md rounded-md py-2 w-40 hidden group-hover:block">
              <p className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/profile")}>
                My Profile
              </p>
              <p className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/orders")}>
                Orders
              </p>
              <p className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={logout}>
                Logout
              </p>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="Cart" />
          <span className="absolute -right-2 -bottom-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            {getCartCount() || 0}
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0 w-full" : "translate-x-full w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700 w-full h-full">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-2 p-4 border-b cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <span>Back</span>
          </div>
          {["/", "/collection", "/about", "/contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              onClick={() => setVisible(false)}
              className="py-4 px-6 border-b text-sm uppercase hover:bg-gray-100"
            >
              {path === "/" ? "Home" : path.slice(1)}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
