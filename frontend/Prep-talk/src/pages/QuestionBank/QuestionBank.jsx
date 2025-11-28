import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import {
  Search,
  Pin,
  Loader2,
  BookOpen,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
        const sessions = res.data.sessions || res.data;
        const allQs = sessions.flatMap((s) => s.questions || []);
        setQuestions(allQs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const togglePin = async (id) => {
    try {
      const res = await axiosInstance.put(API_PATHS.QUESTION.PIN(id));
      setQuestions((prev) =>
        prev.map((q) => (q._id === id ? res.data.question : q))
      );
      toast.success("Updated pin status");
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesFilter = filter === "all" || (filter === "pinned" && q.isPinned);
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Question Bank</h1>
          <p className="text-gray-500">Review and practice questions from your previous sessions.</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
            />
          </div>

          <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-xl">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${filter === "all"
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              All Questions
            </button>
            <button
              onClick={() => setFilter("pinned")}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${filter === "pinned"
                  ? "bg-indigo-50 text-indigo-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <Pin className="w-4 h-4" /> Pinned
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No questions found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((q) => (
              <div
                key={q._id}
                className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <button
                    onClick={() => togglePin(q._id)}
                    className={`p-2 rounded-lg transition-all ${q.isPinned
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-300 hover:text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    <Pin className={`w-5 h-5 ${q.isPinned ? "fill-current" : ""}`} />
                  </button>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-3 leading-relaxed flex-1">
                  {q.question}
                </h3>

                <div className="pt-4 border-t border-gray-50 mt-auto">
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {q.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
