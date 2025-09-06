// src/pages/Login.jsx
import React, { useState } from "react";
import Input from "../components/users/Input";
import { useDispatch } from "react-redux";
import { fetchUser } from "../slices/user";
import { useNavigate } from "react-router-dom";
import video from "../../public/video/video.mp4";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login Data Submitted: ", formData);
      const result = await dispatch(fetchUser(formData)).unwrap();
      console.log("Login success →", result);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay (optional, to darken/lighten video for readability) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-[#EFF5D2]/90 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="example@mail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-[#556B2F] text-white py-3 rounded-md mt-4 hover:bg-[#1c3d25] transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-[#1c3d25]">
          <a href="/forgot-password" className="hover:underline">
            Forgot Password?
          </a>
          <a href="/register" className="text-[#1c3d25] hover:underline">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
