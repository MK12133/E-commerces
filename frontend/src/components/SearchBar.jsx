import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center py-6 px-4 transition-all duration-300 animate-fade-in">
      <div className="relative inline-flex w-full sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pl-5 pr-10 rounded-full text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 bg-white placeholder:text-gray-400"
          type="text"
          placeholder="Search products..."
        />
        <img
          src={assets.search_icon}
          alt="Search icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 opacity-70"
        />
      </div>
      <div className="mt-3">
        <img
          src={assets.cross_icon}
          className="inline w-4 cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={() => setShowSearch(false)}
          alt="Close search"
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
