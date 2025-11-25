import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="
      bg-white 
      rounded-2xl 
      shadow-sm 
      border 
      border-gray-100 
      p-6 
      transition-all 
      duration-300 
      hover:shadow-md 
      hover:-translate-y-1 
      hover:border-gray-200
    ">
      <div className="
        w-14 
        h-14 
        rounded-xl 
        bg-primary/10 
        flex 
        items-center 
        justify-center 
        text-primary 
        mb-5 
        transition-all 
        duration-300 
        group-hover:scale-110
      ">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;

