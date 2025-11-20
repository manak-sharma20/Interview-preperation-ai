// src/pages/Analytics/Analytics.jsx
import React from "react";

const Analytics = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Performance Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-2">Score Over Time</h3>
          <p className="text-sm text-gray-500">Placeholder chart (add chart library later)</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-2">Areas to Improve</h3>
          <p className="text-sm text-gray-500">Summary and tips will be shown here.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
