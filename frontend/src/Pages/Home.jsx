import React from 'react'
import { FaPhoneAlt, FaRegHeart } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { AiOutlineShoppingCart, AiOutlineCamera } from "react-icons/ai";

const Products = () => {
  return (
    <div>
          <div className="bg-[#fdf7e9] text-gray-700 font-poppins min-h-screen">
      
      {/* Top bar */}
      <header className="bg-[#2d3a22] text-white text-sm px-4 py-1 flex items-center">
        <div className="flex items-center gap-4">
          <span>🌐 In</span>
          <div className="flex items-center gap-1">
            <FaPhoneAlt className="text-xs" />
            xxxx-4545-xxxx for shopping and Customs Contact
          </div>
        </div>
      </header>

      {/* Navbar */}
      <nav className="flex justify-between items-center bg-[#fffbea] px-8 py-3 shadow-sm">
        
        {/* Left */}
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold flex items-center">
            Frame<span className="text-sm ml-1">◯</span>
          </div>

          <ul className="flex gap-5">
            <li className="cursor-pointer hover:text-[#7a6221] transition">
              Products
            </li>
            <li className="cursor-pointer hover:text-[#7a6221] transition">
              Offers
            </li>
            <li className="cursor-pointer hover:text-[#7a6221] transition">
              Design/Support
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6">
          
          {/* Search */}
          <div className="flex items-center border border-gray-300 bg-white rounded-full px-3 py-1">
            <input
              type="text"
              placeholder="What are you Looking For ?"
              className="outline-none text-sm w-48 bg-transparent"
            />
            <AiOutlineCamera className="text-lg text-gray-600 cursor-pointer" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3 text-sm">
            <BsPerson />
            <span className="text-xs text-gray-600">
              Hey! Login / SignUP
            </span>
            <FaRegHeart className="text-lg cursor-pointer" />
            <AiOutlineShoppingCart className="text-lg" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center mt-10 text-center">
        <div className="w-[80%] max-w-[1000px] rounded-2xl overflow-hidden shadow-lg">
          <video
            className="w-full h-auto"
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay
            muted
            loop
          />
        </div>

        <h2 className="mt-6 text-4xl font-dancing">
          Wall Changing Good
        </h2>
      </div>
    </div>

    </div>
  )
}

export default Products;