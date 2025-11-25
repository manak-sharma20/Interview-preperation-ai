import React from "react";
import { BarChart3, TrendingUp, Lightbulb } from "lucide-react";

const Analytics = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Performance Analytics</h2>
        <p className="text-gray-500 mt-1">
          Track your interview progress and discover areas to improve.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Score Over Time */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-xl">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Score Over Time</h3>
          </div>

          <div className="h-48 flex items-center justify-center text-gray-500 text-sm bg-gray-50 rounded-xl border border-dashed">
            📊 Chart will appear here (Coming Soon)
          </div>
        </div>

        {/* Areas To Improve */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 text-yellow-700 rounded-xl">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Areas to Improve</h3>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Your strengths and improvement suggestions will appear here once you start 
            completing AI-generated interview sessions.
          </p>
        </div>
      </div>

      {/* Additional Insights Section */}
      <div className="mt-10 bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-700 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Overall Performance</h3>
        </div>

        <p className="text-gray-600 leading-relaxed">
          Track your growth across sessions and identify patterns that help you prepare better
          for real interviews.
        </p>
      </div>
    </div>
  );
};

export default Analytics;
