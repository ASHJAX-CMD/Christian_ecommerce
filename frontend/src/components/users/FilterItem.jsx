import React, { useState } from "react";

const FilterItem = ({ title, options, onSelect }) => {
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
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                onChange={() => onSelect(title, option)}
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