import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaRegHeart, FaBars } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineCamera } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { IoIosGlobe } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import video from "../../public/video/Home_hero.mp4";
import logo from "../../public/images/logo.png";
import img1 from "../../public/images/img1.webp";
import Rating from "../features/users/Rating";
import { FaShoppingCart } from "react-icons/fa";

const Products = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-[#fefadf] text-gray-700 font-sans ">
        {/* ================= HEADER ================= */}
        <header className="bg-[#273617] text-white px-4 py-2 flex items-center justify-between md:justify-start relative rounded-b-3xl">
          {/* Country */}
          <div className="flex items-center text-2xl gap-1 hover:text-[#38A3A5] cursor-pointer">
            <IoIosGlobe />
            <span className="flex  text-sm gap-1 hover:text-[#38A3A5] cursor-pointer">
              IN
            </span>
          </div>

          {/* Call (centered only on desktop) */}
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/4 ">
            <FaPhoneAlt />
            <span className="font-['Oswald']">
              xxxx-4545-xxxx{" "}
              <span className="font-['Oswald'] ">
                For shopping and customs contact
              </span>{" "}
            </span>
          </div>
        </header>

        {/* ================= NAVBAR ================= */}
        <nav className="flex items-center justify-between  px-10 py-3 ">
          {/* Hamburger (mobile only) */}
          <div className="md:hidden">
            <FaBars className="text-xl cursor-pointer" />
          </div>

          {/* Logo + Menu (desktop only) */}
          <div className="hidden md:flex items-center gap-5">
            <Link className="  " to="/">
              <img
                className="h-14 w-auto border-2 rounded-2xl"
                src={logo}
                alt=""
              />
            </Link>

            <ul className="flex gap-6 ">
              <li className="hover:text-[#38A3A5] font-['Oswald'] text-lg font-bold cursor-pointer">
                <Link to="/">Products</Link>
              </li>
              <li className="hover:text-[#38A3A5] font-['Oswald'] text-lg font-bold cursor-pointer">
                <Link to="/">Offers</Link>
              </li>
              <li className="hover:text-[#38A3A5] font-['Oswald'] text-lg font-bold cursor-pointer">
                <Link to="/">Design/Support</Link>
              </li>
            </ul>
          </div>

          {/* Search */}
          {/* Search */}
          <div className="flex-1 flex justify-center px-6">
            <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-full max-w-[700px]">
              <IoSearchOutline className="text-gray-600  text-2xl mr-2" />

              <input
                type="text"
                placeholder="What are you looking for?"
                className="hidden md:block  outline-none text-sm w-full bg-transparent"
              />

              <AiOutlineCamera className="text-gray-600 ml-auto cursor-pointer text-2xl hover:text-[#38A3A5]" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 text-2xl">
            <BsPerson className="cursor-pointer text-3xl hover:text-[#38A3A5]" />

            {/* Hide text on mobile */}
            <div className="hidden md:block text-sm">
              <Link
                to="/login"
                className="hover:text-[#38A3A5] font-['Oswald'] text-lg font-semibold"
              >
                Hey! Login / SignUp
              </Link>
            </div>

            <FaRegHeart className="cursor-pointer text-2xl hover:text-[#38A3A5]" />
            <AiOutlineShoppingCart className="cursor-pointer text-2xl hover:text-[#38A3A5]" />
          </div>
        </nav>

        {/* ================= HERO SECTION ================= */}
        <section className="flex justify-center items-center px-4 py-8">
          <div className="relative w-full md:w-[90%] lg:w-[100%] max-w-[1600px]  ">
            <video
              disablePictureInPicture
              autoPlay
              muted
              loop
              className="w-full rounded-2xl h-auto"
            >
              <source src={video} type="video/mp4" />
            </video>

            {/* Text inside video */}
            <p className="absolute font-['Beau_Rivage'] text-4xl -bottom-6 -left-4 lg:-bottom-10 md-left-6 md:-bottom-6 lg:-left-10 text-black md:text-6xl  lg:text-8xl font-bold drop-shadow-lg">
              Wall Changing Good !
            </p>
          </div>
        </section>
      </div>
      {/* part 2 of home page*/}
      <div className="bg-[#fefadf] text-gray-850 font-sans ">
        {/* txt box*/}
        <div className=" flex flex-col px-20 py-1   gap-6">
          <p className="text-5xl text-black monoton-regular ">
            Picture & Photo Frames
          </p>
          <p className=" text-gray-700 max-w-3xl line-clamp-4">
            If photos are portals to good old memories, photo frames are shields
            that keep those memories alive. It's heartwarming to capture
            memories. When you look through old photographs of loved ones, you
            feel a rush of joy. However, it is critical that you protect and
            preserve these photos in beautiful photo frames so that they become
            treasured possessions that last for decades.
          </p>
        </div>
        <div className="p-4 flex gap-2 px-12">
          <img src={img1} className="h-102" alt="" />
          <div className="p-2 rounded-xl bg-white">
            <img
              className="  h-102"
              src="https://www.ikea.com/us/en/images/products/roedalm-frame-black__1251233_pe924195_s5.jpg?f=xl"
              alt=""
            />
            <div className="flex  bg-white  p-4 flex-col gap-1">
              <section>
                <p className="font-extrabold">RÖDALM</p>
                <p>Frame, black, 12x16 "</p>
              </section>
              <p className="font-extrabold text-2xl">$55.5</p>
              <section>
                <Rating rating={null} />
                <button className="w-full mt-3 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                  <FaShoppingCart />
                  Add to Cart
                </button>
                 <button className="w-full mt-3 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                  Shop Now !
                </button>
              </section>
            </div>
            
          </div>
           <div className="p-2 rounded-xl bg-white">
            <img
              className="  h-102"
              src="https://www.ikea.com/us/en/images/products/roedalm-frame-black__1251233_pe924195_s5.jpg?f=xl"
              alt=""
            />
            <div className="flex  bg-white  p-4 flex-col gap-1">
              <section>
                <p className="font-extrabold">RÖDALM</p>
                <p>Frame, black, 12x16 "</p>
              </section>
              <p className="font-extrabold text-2xl">$55.5</p>
              <section>
                <Rating rating={null} />
                <button className="w-full mt-3 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                  <FaShoppingCart />
                  Add to Cart
                </button>
                 <button className="w-full mt-3 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
                  Shop Now !
                </button>
              </section>
            </div>
            
          </div>
          
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Products;
