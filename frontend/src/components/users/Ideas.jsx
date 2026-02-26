import React from "react";
import { IoArrowForward } from "react-icons/io5";

const Ideas = () => {
  return (
    <div className="w-full px-16">
      
      {/* Scroll Container */}
      <div className="flex gap-6 overflow-x-auto pb-6 scroll-smooth">
        
        {/* Card 1 */}
        <div className="flex flex-col shrink-0 group">
          <div className="w-[500px] h-[600px] overflow-hidden ">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src="https://www.ikea.com/ext/ingkadam/m/3d1d12deb6d5d395/original/IN_Activate_IKEALed_Local_IKEAFamily_content-_FY24_15.jpg?f=xl"
              alt="Interior"
            />
          </div>

          <div className="flex flex-col bg-[#f2f2f2] p-10 gap-4 w-[500px]">
            <p className="text-2xl font-extrabold">
              Plan Your Perfect Home
            </p>

            <p className="text-gray-600 leading-relaxed">
              Turn your house into a home – Personalized Interior Design
              services for every BHK with IKEA. From space-saving ideas
              to cozy touches, get expert guidance.
            </p>

            <div className="w-10 h-10 mt-6 flex items-center justify-center rounded-full border border-black transition-all duration-300 group-hover:bg-black group-hover:text-white">
              <IoArrowForward size={18} />
            </div>
          </div>
        </div>

        {/* Duplicate Cards */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-col shrink-0 group">
            <div className="w-[500px] h-[600px] overflow-hidden ">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://www.ikea.com/ext/ingkadam/m/3d1d12deb6d5d395/original/IN_Activate_IKEALed_Local_IKEAFamily_content-_FY24_15.jpg?f=xl"
                alt="Interior"
              />
            </div>

            <div className="flex flex-col bg-[#f2f2f2] p-10 gap-4 w-[500px]">
              <p className="text-2xl font-extrabold">
                Plan Your Perfect Home
              </p>

              <p className="text-gray-600 leading-relaxed">
                Turn your house into a home – Personalized Interior Design
                services for every BHK with IKEA.
              </p>

              <div className="w-10 h-10 mt-6 flex items-center justify-center rounded-full border border-black transition-all duration-300 group-hover:bg-black group-hover:text-white">
                <IoArrowForward size={18} />
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Ideas;