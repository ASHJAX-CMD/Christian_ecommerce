import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { IoArrowForward } from "react-icons/io5";
import video from "../../public/video/Home_hero.mp4";
import photo1 from "../../public/images/Photo1.webp";
import photo2 from "../../public/images/Photo2.webp";

import FilterItem from "../components/users/FilterItem";

import ProductCard from "../components/users/ProductCard";
import Ideas from "../components/users/Ideas";
import HeaderSection from "../features/users/HeaderSection";
import Footer from "../features/users/Footer";
import { getAllProducts } from "../slices/product";

const Products = () => {
  const dispatch = useDispatch();
  // ==============================
  // REDUX SETUP
  // ==============================
  useEffect(() => {
    dispatch(getAllProducts({ type: "home" }));
  }, [dispatch]);
  const {
    
    loading,
    error,
  } = useSelector((state) => state.products);
const { homeItems: products } = useSelector((state) => state.products);
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

      <HeaderSection />
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
        <div className="p-4 ml-4 flex gap-8 justify-center px-12">
          {/* Product Cards */}
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Filter Sidebar */}
          {/* <div className="w-60 bg-[#fefadf] p-4 shadow-md rounded-lg">
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
          </div> */}
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
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={photo1}
            />
          </div>

          {/* Medium Image */}
          <div className="row-span-2">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src={photo2}
            />
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

        {/* Starting From Price Section */}

        <div className="p-4 ml-4 h-[500px] flex px-12 group">
          {/* LEFT SIDE */}
          <div className="w-[40%] bg-[#f5f7f6] flex flex-col justify-center items-center">
            <p
              style={{ fontFamily: '"Staatliches", sans-serif' }}
              className="text-6xl"
            >
              Bestsellers starting from
            </p>

            <p className="font-semibold text-5xl">$10.99</p>

            <div className="w-10 h-10 mt-6 flex items-center justify-center rounded-full border border-black transition-colors duration-300 hover:bg-black hover:text-white cursor-pointer">
              <IoArrowForward size={18} />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 h-full relative overflow-hidden">
            {/* Default Image */}
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/bc/9f/ef/brussels-cachet.jpg?w=1200&h=900&s=1"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />

            {/* Hover Image */}
            <img
              src="https://images.pexels.com/photos/11696469/pexels-photo-11696469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </div>
        {/* Explore Frames tab */}
        <div className="gap-4 bg-white px-14 p-6">
          <div className="flex gap-4  bg-white   ">
            <div className="flex flex-col gap-4 w-[50%]">
              <p
                style={{ fontFamily: '"Staatliches", sans-serif' }}
                className="text-2xl"
              >
                Explore our Frame and Home Decor Range
              </p>
              <p
                style={{ fontFamily: '"Staatliches", sans-serif' }}
                className="text-xl text-gray-800"
              >
                IKEA is a global leader in life at home.
              </p>
              <p className="text-gray-800">
                Whether you just moved into a new home or looking to revamp your
                current one, we at IKEA are here to inspire you with affordable
                home furniture solutions, there is a piece of furniture to every
                corner of your home.
              </p>
              <p className="text-gray-800">
                Create a home that is perfect for you. Shopping at IKEA is a bit
                different and exciting compared to your shopping at an everyday
                retail. It is about experiencing solutions first hand and
                getting to know ideas and inspirations that can fit perfectly
                into your home. That’s why, we offer more than 7500 products,
                solutions at our store along with home furnishing ideas and
                services for you to explore. When you visit IKEA store, make
                yourself at home in our many room settings in the store. Squeeze
                the upholsteries, feel the oriental rugs, try the sofa beds and
                open the cabinets to feel the quality.
              </p>
              <p className="text-gray-800">
                On the price tag, you’ll find all you need to know about a
                product, including where in the store you can pick it up. Since
                most IKEA furniture is flat-packed, they are quite easy to bring
                home when you buy from the store.
              </p>
            </div>

            <div className="flex justify-center w-[50%] flex-wrap gap-x-2 content-center">
              <div className="flex justify-center flex-wrap gap-x-2 ">
                {[
                  "Sofas",
                  "Beds",
                  "Dining",
                  "Tv units",
                  "Mattresses",
                  "Seating",
                  "Coffee tables",
                  "Wardrobes",
                  "Storage",
                  "Bookshelves",
                  "Shoe racks",
                  "Decor",
                  "Bathroom",
                  "Textiles",
                  "Pots & plants",
                  "Home electronics",
                  "Home improvement",
                  "Lighting",
                ].map((item, index) => (
                  <p
                    key={index}
                    className="text-black cursor-pointer font-semibold transition-transform duration-200 hover:scale-105 hover:underline hover:font-bold "
                  >
                    {item} |
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center p-10">
            <p className="rounded-4xl bg-blue-900 cursor-pointer font-semibold text-white p-4">
              Learn more !
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
