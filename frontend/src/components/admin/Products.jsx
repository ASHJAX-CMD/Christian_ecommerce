import React, { useState } from "react";
import Addproduct from "./Addproduct";
import { MdNotificationsNone } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import LiveProducts from "./LiveProducts";

const Products = () => {
  const [add, setAdd] = useState(false);
  const location = useLocation();
  const currentLocation = () => {
    if (location.pathname === "/admin/products") {
      return true;
    }
    return false
    
  };
  return (
    <div className="flex flex-col min-h-screen w-full p-4 gap-10">
      {/* Header Section */}
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full bg-white p-4 rounded-xl justify-between items-center shadow-sm">
          {/* Search Bar */}
          <div className="flex gap-2 w-full max-w-md">
            <input
              type="search"
              name="Search"
              placeholder="Search products..."
              className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              type="submit"
            >
              Search
            </button>
          </div>

          {/* Add Products Button */}

          <div className="flex items-center gap-4">
            <MdNotificationsNone className="text-2xl" />
            <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_200%] animate-border-flow">
              <Link to={`${currentLocation()?"/admin/products/addproduct": "/admin/products"} `}>
                <div
                  onClick={() => {
                    setAdd(!add);
                  }}
                  className="rounded-xl bg-white px-4 py-2 font-bold text-center cursor-pointer hover:bg-gray-50 transition"
                >
                  {currentLocation()?"Add New Products": "Live Products !"}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="font-extrabold mt-4 text-2xl">Products:</p>
      {/* Products Grid */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Products;
