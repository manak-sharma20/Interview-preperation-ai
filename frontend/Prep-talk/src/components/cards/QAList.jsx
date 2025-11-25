import React from "react";

const QAList = ({ data }) => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((item, index) => (
        <div 
          key={index}
          className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-transform duration-300"
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            {item.question}
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QAList;
