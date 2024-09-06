import React from "react";

const Checkbox = ({ labelName, name, value, onChange, type, isChecked }) => {
  return (
    <div className="flex items-center">
      <input
        className="custom-checkbox cursor-pointer"
        name={name}
        // {...(type === "checkbox" ? { checked: value } : { value: value })}
        checked={isChecked}
        value={value}
        onChange={onChange}
        type={type}
      />
      <label htmlFor={name} className="ml-2 text-gray-700">
        {labelName}
      </label>
    </div>
  );
};

export default Checkbox;
