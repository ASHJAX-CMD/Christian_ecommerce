import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaRegHeart, FaBars } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineCamera } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { IoIosGlobe } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import video from "../../public/video/Home_hero.mp4";
import logo from "../../public/images/logo.png";
// import img1 from "../../public/images/img1.webp";
import FilterItem from "../components/users/FilterItem";
import { getAllProducts } from "../slices/product";
import ProductCard from "../components/users/ProductCard";

import Ideas from "../components/users/Ideas";
const Products = () => {
  const dispatch = useDispatch();
  const handleSelect = (type, value) => {
    console.log(type, value);
  };

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

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
        <div className=" flex gap-4 flex-col ml-10 p-8 text-2xl font-extrabold " >
          <p> Ideas for Your Home !</p>
        </div>
        <Ideas  />
        <div className="p-4 ml-4 flex gap-2 px-12">
          {/* <img src={img1} className="h-86" alt="" /> */}
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          <div className="w-60 bg-[#fefadf] p-4 shadow-md rounded-lg">
            <FilterItem
              title="Color"
              options={["Red", "Blue", "Black", "White"]}
              onSelect={handleSelect}
            />

            <FilterItem
              title="Size"
              options={["S", "M", "L", "XL"]}
              onSelect={handleSelect}
            />

            <FilterItem
              title="Price"
              options={[
                "Low to High",
                "High to Low",
                "Under $50",
                "$50 - $100",
              ]}
              onSelect={handleSelect}
            />
          </div>
        </div>

        <div>
          <div className="p-4 flex ml-30 gap-2 px-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Products;
