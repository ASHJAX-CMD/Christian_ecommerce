import React from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
const Footer = () => {
  return (
    <div>
        <div className="grid grid-cols-5 bg-gray-50 px-14 p-6 auto-cols-[200px]">
        <div className=" flex flex-col col-span- gap-8 ">
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">Join IKEA Family</p>
            <p>
              Enjoy member-only discounts & offers, early access to IKEA sale,
              delicious food offers and much more. Join for free.
            </p>
            <p className="p-4 px-6 w-fit text-sm font-semibold bg-black text-white text-center rounded-4xl">
              Join The Club!
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold text-lg">JIKEA Business Network</p>
            <p>
              Join the membership program for business customers with exciting
              benefits and features. Join us for free and enjoy member
              discounts, quick-fix tips, online tutorials and a lot more.
            </p>
            <p className="p-4 px-6 w-fit text-sm font-semibold bg-black text-white text-center rounded-4xl">
              Join Now
            </p>
          </div>
          <div>
            <div className="flex items-center  gap-10 mt-8">
              <FaFacebookF className="text-xl cursor-pointer hover:scale-110 transition-transform duration-200" />

              <FaInstagram className="text-xl cursor-pointer hover:scale-110 transition-transform duration-200" />

              <FaYoutube className="text-xl cursor-pointer hover:scale-110 transition-transform duration-200" />

              <FaXTwitter className="text-xl cursor-pointer hover:scale-110 transition-transform duration-200" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 ml-8">
          <p className="font-bold">IKEA Family</p>
          <p>Log In</p>
          <p>Join FrameO Family</p>
          <p>Members Only Offers</p>
          <p>Workshop & Events</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">Services</p>
          <p>Delivery Services</p>
          <p>Click & Collect</p>
          <p>Personal Shopper</p>
          <p>Online planning tool</p>
          <p>Assembly Service</p>
          <p>Measuring Service</p>
          <p>Kitchen Planning</p>
          <p>Installation Service</p>
          <p>Track & manage your Order</p>
          <p>Customer Service</p>
          <p>Recycle Program</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">Help</p>
          <p>How to Shop</p>
          <p>Return policy</p>
          <p>Prices and price tags</p>
          <p>Contact us</p>
          <p>FAQ's</p>
          <p>Gift Card</p>
          <p>Terms and Conditions</p>
          <p>Damaged articles Claim</p>
          <p>GST rate revision</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">About FrameO</p>
          <p>This is FrameO</p>
          <p>Careers at FrameO</p>
          <p>CSR Policy</p>
          <p>Newsroom</p>
          <p>Sustainability</p>
          <p>IKEA Stores</p>
        </div>
      </div>
      <div className="flex bg-gray-50 justify-between w-full px-14 ">
        <div className="flex w-full py-8 justify-between border-t">
          <p className="text-sm text-gray-800">
            © Inter IKEA Systems B.V. 2000-2026
          </p>
          <div className="flex justify-end gap-4">
            <p className="text-sm">Privacy Policy</p>
            <p className="text-sm">Cookies Policy</p>
            <p className="text-sm">Cookies Settings</p>
          </div>
        </div>
      </div>
</div>
  )
}

export default Footer
