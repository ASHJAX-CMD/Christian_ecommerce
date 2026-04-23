import React from "react";
import logo from "../../../public/images/logo.png";

import { IoIosGlobe } from "react-icons/io";
import { FaPhoneAlt, FaRegHeart, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineCamera } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";

const HeaderSection = () => {
  const navigate = useNavigate();
  const clickCart = () => {
    navigate("/cart");
  };
  const { user, loading } = useSelector((state) => state.user);
  if (loading) return null;
  return (
    <div className="bg-[#fefadf] text-gray-700 font-sans ">
      {console.log(user)}
      <header className="bg-[#273617] text-white px-4 py-2 flex items-center justify-between md:justify-start relative rounded-b-3xl">
        {/* Country Selector */}
        <div className="flex items-center text-2xl gap-1 hover:text-[#38A3A5] cursor-pointer">
          <IoIosGlobe />
          <span className="text-sm">IN</span>
        </div>

        {/* Contact Info (Desktop Only) */}
        <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/4 ">
          <FaPhoneAlt />
          <span className="font-['Oswald']">
            xxxx-4545-xxxx For shopping and customs contact
          </span>
        </div>
      </header>

      {/* ===================================================== */}
      {/* =================== NAVBAR SECTION ================== */}
      {/* ===================================================== */}
      <nav className="flex items-center justify-between px-10 py-3 ">
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <FaBars className="text-xl cursor-pointer" />
        </div>

        {/* Logo + Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">
          <Link to="/home">
            <img
              className="h-14 w-auto border-2 rounded-2xl"
              src={logo}
              alt="logo"
            />
          </Link>

          <ul className="flex gap-6">
            <li className="hover:text-[#38A3A5] font-['Oswald'] text-lg font-bold cursor-pointer">
              <Link to="/product">Products</Link>
            </li>
            <li className="hover:text-[#38A3A5] font-['Oswald'] text-lg font-bold cursor-pointer">
              <Link to="/offers">Offers</Link>
            </li>
            <li className="hover:text-[#38A3A5] font-['Oswald'] text-lg font-bold cursor-pointer">
              <Link to="/design&support">Design/Support</Link>
            </li>
          </ul>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center px-6">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-full max-w-[700px]">
            <IoSearchOutline className="text-gray-600 text-2xl mr-2" />

            <input
              type="text"
              placeholder="What are you looking for?"
              className="hidden md:block outline-none text-sm w-full bg-transparent"
            />

            <AiOutlineCamera className="text-gray-600 ml-auto cursor-pointer text-2xl hover:text-[#38A3A5]" />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 text-2xl">
          <Link
            to={`${user ? "/profile" : "/login"}`}
            className="hover:text-[#38A3A5] flex items-center gap-3 text-2xl font-['Oswald'] font-semibold"
          >
            <BsPerson className="cursor-pointer text-3xl hover:text-[#38A3A5]" />

            <div className="hidden md:block text-lg">
              {user ? <p>Welcome {user.name}</p> : <p> Hey! Login / SignUp</p>}
            </div>
          </Link>
          <FaRegHeart className="cursor-pointer text-2xl hover:text-[#38A3A5]" />
          <AiOutlineShoppingCart
            onClick={clickCart}
            className="cursor-pointer text-2xl hover:text-[#38A3A5]"
          />
        </div>
      </nav>

      {/* ===================================================== */}
      {/* =================== HERO SECTION ==================== */}
      {/* ===================================================== */}
    </div>
  );
};

export default HeaderSection;
