import React from "react";
import HeaderSection from "../features/users/HeaderSection";
import FilterItem from "../components/users/FilterItem";
import ProductCard from "../components/users/ProductCard";
import { useSelector } from "react-redux";
import Footer from "../features/users/Footer";

const Product = () => {
  const handleSelect = (type, value) => {
    console.log(type, value);
  };
   
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);
  return (
    <div className="min-h-screen">
      <HeaderSection />
      {/* main product div */}

      <div className="p-8 px-10  ">
        <div className="flex flex-col gap-5">
          <p className="text-4xl font-bold ">Pictures & PhotoFrames</p>
          <p className="w-[70%]">
            If photos are portals to good old memories, photo frames are shields
            that keep those memories alive. It's heartwarming to capture
            memories. When you look through old photographs of loved ones, you
            feel a rush of joy. However, it is critical that you protect and
            preserve these photos in beautiful photo frames so that they become
            treasured possessions that last for decades. 29 itemsSort and Filter
          </p>
        </div>
        {/* Product Item */}
        <div className="flex py-6 items-start gap-8">
          {/* filter Item */}
          <div className="w-60 bg-[#fefadf] p-4 shadow-md  rounded-lg sticky top-0">
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

          {/* Product starts here */}

          <div>
            <div className="flex-1 grid grid-cols-1 border-b sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => {
                console.log(product);
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
            {/* Load More Button */}
            <div className="mt-4">
              <div className="flex justify-center">
                <p className="bg-white border  font-semibold  p-2 px-6 w-fit rounded-4xl">
                  Load More!
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Text Container */}
        <div className="flex flex-col  gap-8 pt-6">
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold">
              Buy best photo frame online in India
            </p>
            <p className="w-[60%] text-sm">
              Buy photo frames online at IKEA at the most affordable prices
              because every memory deserves a space in your home. IKEA houses
              every type of frame; from basic picture frames and intricate ones
              that catch everyone’s attention. All you need to have are the
              pictures for photo frames and let IKEA do the rest.
            </p>
            <p className="w-[60%] text-sm">
              We believe that you should be surrounded by things that make you
              smile, laugh, and cry from happiness. What better way to do that
              than buy stylish photo frames and decorate them around your house?
              At IKEA, when you buy a photo frame online, you can trust its
              top-notch quality and the best photo frame price.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold">
              How to choose the right photo frame?
            </p>
            <p className="w-[60%] text-sm">
              You can find oval photo frames, white wall frames, or wooden and
              plastic ones, and much more to beautify your home and display your
              memories. Whether it is your wedding photo or a photo of your
              little one’s feet, a photo speaks a thousand words. Before you set
              out to buy photo frames online, you need to choose the correct
              photo frame for your photos.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">Style</p>
            <p className="w-[60%] text-sm">
              Do you want a frame for the tabletop or a photo frame for the wall
              or both? When you buy frames at IKEA, you get tons of options to
              choose from at an economical frame price. Don’t forget to factor
              in the frame colour and the design such as white wall frames or
              more colourful options like blue picture frames that can add a pop
              of colour to your room.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">Décor</p>
            <p className="w-[60%] text-sm">
              How do you plan on arranging and decorating each of the photo
              frame designs? You can mix it up by arranging different photo
              frame sizes together or you can look for collage photo frames or
              keep similar-sized ones together for a formal look. You need to
              think about how much space is available too then buy a picture
              frame.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">Photos</p>
            <p className="w-[60%] text-sm">
              When choosing a picture frame design online, keep in mind that the
              photos should stand out in the frame rather than the frame itself.
              You want a frame that complements and puts focus on the photos you
              want to display so choose accordingly.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">Durability</p>
            <p className="w-[60%] text-sm">
              Regardless of the photo frame sizes you choose; you want them to
              last as long as possible. You want to consider the frame’s
              material and its durability. Wooden picture frames are highly
              durable, while plastic oval photo frames also do quite well in the
              durability segment.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">Price</p>
            <p className="w-[60%] text-sm">
              When you have some fantastic pictures for photo frames opt for
              good quality ones that will last decades with minimal maintenance.
              The best photo frame design doesn’t have to be the most expensive
              one. At IKEA, you can find great options at low prices.
            </p>
            <p>Why are IKEA photo frames better than generic photo frames?</p>
            <p>
              IKEA photo frames offer several advantages over generic
              alternatives.
            </p>
            <ul className="list-disc pl-5">
              <li>
                They are constructed using higher-quality materials such as
                solid wood, metal, or premium-grade plastics, resulting in
                better durability and a more appealing finish.
              </li>
              <li>
                With superior craftsmanship and attention to detail, IKEA’s
                unique photo frames for walls provide a sturdier and more
                aesthetically pleasing option to showcase your cherished
                memories.
              </li>
              <li>
                Our picture frames often come with protective glass or acrylic
                covers, safeguarding your photos from dust, moisture, and UV
                rays.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">
              Which photo frames are the best for displaying family pictures?
            </p>
            <p className="w-[60%] text-sm">
              RCollage photo frames, available in a variety of materials,
              designs, and styles, are ideal for displaying family photos.
            </p>
          </div>
        </div>

        {/* Types of Frames */}
        <div className="grid grid-cols-3 pt-14 gap-4 auto-cols-[100px]">
          <p>Beige picture & photo frames</p>
          <p>Gold Picture & photo frames</p>
          <p>Wood picture & photo frames</p>
          <p>Black Pictures & Photo frames</p>
          <p>Grey Picture & Photo frames</p>
          <p>Beige picture & photo frames</p>
          <p>Beige picture & photo frames</p>
          <p>Gold Picture & photo frames</p>
        </div>
        <div className="flex pt-12 justify-center">
          <div className="flex flex-col gap-4">
            <p>Tell us about your Experience!</p>
            <p className="inline-block px-4 py-4 text-white text-md bg-blue-800 font-bold rounded-4xl text-center">
              Share feedback
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Product;
