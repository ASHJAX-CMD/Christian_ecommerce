// src/pages/Register.jsx
import React, { useState } from "react";
import Input from "../components/users/Input";
import video from "../../public/video/v1.mp4";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form Data Submitted: ", formData);
    // Call your API here
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

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Register card */}
      <div className="relative z-10 bg-[#EFF5D2]/90 p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
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
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-[#556B2F] text-white py-3 rounded-md mt-4 hover:bg-[#1c3d25] transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#1c3d25]  hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
