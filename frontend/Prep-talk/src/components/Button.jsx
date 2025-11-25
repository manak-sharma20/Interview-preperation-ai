import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "medium",
  ...props
}) => {
  let base =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 shadow-sm active:scale-[0.97]";

  let variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg",
    secondary:
      "bg-gray-800 text-white hover:bg-gray-700 shadow-md hover:shadow-lg",
    outline:
      "border border-gray-300 text-gray-700 hover:border-primary hover:text-primary bg-white",
  };

  let sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-5 py-2.5 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
