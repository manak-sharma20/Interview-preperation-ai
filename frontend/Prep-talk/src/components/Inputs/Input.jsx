import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
        className={`
          w-full 
          px-4 
          py-2.5 
          rounded-xl 
          border 
          border-gray-300 
          bg-white 
          text-gray-900 
          shadow-sm
          focus:ring-2 
          focus:ring-primary/40 
          focus:border-primary 
          focus:shadow-md 
          outline-none 
          transition-all 
          duration-200
          ${className}
        `}
      />
    </div>
  );
};

export default Input;

