import React, { useState } from "react";

const FilterItem = ({ title, options, onSelect, type = "checkbox" }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-3">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="font-semibold">{title}</h3>
        <span>{open ? "-" : "+"}</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="mt-2 space-y-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type={type} // ✅ dynamic
                name={title}
                title="Price"
                options={["Under or = 500", "500 - 1000", "Above or = 1000"]}
                onChange={(e) => onSelect(title, option, e.target.checked)}
               
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterItem;
