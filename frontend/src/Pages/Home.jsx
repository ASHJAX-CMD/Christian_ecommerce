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
import photo1 from "../../public/images/Photo1.webp";
import photo2 from "../../public/images/Photo2.webp";

import FilterItem from "../components/users/FilterItem";
import { getAllProducts } from "../slices/product";
import ProductCard from "../components/users/ProductCard";
import Ideas from "../components/users/Ideas";

const Products = () => {

  // ==============================
  // REDUX SETUP
  // ==============================
  const dispatch = useDispatch();

  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSelect = (type, value) => {
    console.log(type, value);
  };

  // ==============================
  // LOADING & ERROR STATES
  // ==============================
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen">

      {/* ===================================================== */}
      {/* =================== HEADER SECTION ================== */}
      {/* ===================================================== */}
      <div className="bg-[#fefadf] text-gray-700 font-sans ">
        
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
            <Link to="/">
              <img
                className="h-14 w-auto border-2 rounded-2xl"
                src={logo}
                alt="logo"
              />
            </Link>

            <ul className="flex gap-6">
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
            <BsPerson className="cursor-pointer text-3xl hover:text-[#38A3A5]" />

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


        {/* ===================================================== */}
        {/* =================== HERO SECTION ==================== */}
        {/* ===================================================== */}
        <section className="flex justify-center items-center px-4 py-8">
          <div className="relative w-full md:w-[90%] lg:w-[100%] max-w-[1600px]">

            <video
              disablePictureInPicture
              autoPlay
              muted
              loop
              className="w-full rounded-2xl h-auto"
            >
              <source src={video} type="video/mp4" />
            </video>

            {/* Hero Text */}
            <p className="absolute font-['Beau_Rivage'] text-4xl -bottom-6 -left-4 lg:-bottom-10 md:-bottom-6 lg:-left-10 text-black md:text-6xl lg:text-8xl font-bold drop-shadow-lg">
              Wall Changing Good !
            </p>
          </div>
        </section>
      </div>


      {/* ===================================================== */}
      {/* =============== CONTENT SECTION (PART 2) ============ */}
      {/* ===================================================== */}
      <div className="bg-[#fefadf] text-gray-850 font-sans ">

        {/* Section Intro Text */}
        <div className="flex flex-col px-20 py-1 gap-6">
          <p className="text-5xl text-black monoton-regular">
            Picture & Photo Frames
          </p>
          <p className="text-gray-700 max-w-3xl line-clamp-4">
            If photos are portals to good old memories...
          </p>
        </div>

        {/* Ideas Heading */}
        <div className="flex gap-4 flex-col ml-10 p-8 text-2xl font-extrabold">
          <p>Ideas for Your Home !</p>
        </div>


        {/* ===================================================== */}
        {/* ============ PRODUCTS + FILTER SECTION ============= */}
        {/* ===================================================== */}
        <div className="p-4 ml-4 flex gap-2 px-12">

          {/* Product Cards */}
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Filter Sidebar */}
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


        {/* ===================================================== */}
        {/* ================== IDEAS COMPONENT ================== */}
        {/* ===================================================== */}
        <Ideas />


        {/* ===================================================== */}
        {/* ================== IMAGE GRID SECTION =============== */}
        {/* ===================================================== */}
        <div className="grid grid-cols-3 p-8 px-14 auto-rows-[200px] auto-cols-[400px] gap-4">

          {/* Large Image */}
          <div className="row-span-3">
            <img className="w-full h-full object-cover rounded-2xl" src={photo1} />
          </div>

          {/* Medium Image */}
          <div className="row-span-2">
            <img className="w-full h-full object-cover rounded-2xl" src={photo2} />
          </div>

          {/* Small Images */}
          <div>
            <img
              className="w-full h-full object-cover rounded-2xl"
              src="https://i.etsystatic.com/10418593/r/il/48dacc/4103078084/il_600x600.4103078084_9b56.jpg"
            />
          </div>

          <div className="row-span-2">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src="https://i.etsystatic.com/10418593/r/il/9730fd/2305205311/il_794xN.2305205311_l503.jpg"
            />
          </div>

          <div>
            <img
              className="w-full h-full object-cover rounded-2xl"
              src="https://assets.wsimgs.com/wsimgs/ab/images/dp/wcm/202314/0114/exotic-ebony-wood-gallery-frame-m.jpg"
            />
          </div>

        </div>
         <div className="p-4 ml-4 flex gap-2 px-12">

          {/* Product Cards */}
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Filter Sidebar */}
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
      </div>
    </div>
  );
};

export default Products;