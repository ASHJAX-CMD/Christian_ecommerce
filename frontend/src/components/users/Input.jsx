// src/components/ui/Input.jsx
import React from "react";

const Input = ({ label, type = "text", placeholder, value, onChange, name }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-gray-800 font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name} // ✅ important!
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-[#8FA31E] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#556B2F]"
      />
    </div>
  );
};


export default Input;
