import React from "react";
import { assets } from "../assets/admin_assets/assets";

const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <button onClick={()=>setToken("")} className="bg-black text-white cursor-pointer px-5 py-2 sm:px-7 sm:py-2 text-sm sm:text-sm rounded-full ">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
