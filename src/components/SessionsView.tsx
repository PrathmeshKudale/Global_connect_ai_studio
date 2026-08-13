import React, { useState } from "react";
import {
  BookOpen,
  BrainCircuit,
  Code2,
  Sparkles,
  Globe2,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight
} from "lucide-react";
import { SESSIONS_COURSES } from "../data/appData";
import { SessionCourse } from "../types";

interface SessionsViewProps {
  onSelectVideoSession: () => void;
}

const ICON_MAP: Record<string, any> = {
  BrainCircuit,
  Code2,
  Sparkles,
  Globe2,
  Eye,
  ShieldCheck,
};

export const SessionsView: React.FC<SessionsViewProps> = ({ onSelectVideoSession }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCourse, setActiveCourse] = useState<SessionCourse | null>(null);

  const categories = ["All", "AI & Tech", "Coding", "Global Exposure", "Innovation"];

  const filteredCourses = SESSIONS_COURSES.filter((course) => {
    if (selectedCategory === "All") return true;
    return course.category === selectedCategory;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider">
            Learning Roadmap
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#142033] mt-2">
            AI, Coding & Technology Path
          </h1>
          <p className="text-xs sm:text-sm text-[#60708C] mt-1 max-w-xl">
            Complete structured courses designed for village school students from foundational computer science to advanced AI simulations.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold cursor-pointer transition-all ${
                selectedCategory === cat
                  ? "bg-[#5B4BFF] text-white shadow-sm"
                  : "bg-[#F5F7FF] text-[#60708C] hover:text-[#142033] hover:bg-[#E2E8F0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const IconComponent = ICON_MAP[course.iconName] || BookOpen;

          return (
            <div
              key={course.id}
              onClick={() => setActiveCourse(course)}
              className="bg-white rounded-3xl p-6 border border-[#DDE6F5] shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Icon & Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#5B4BFF]/10 text-[#5B4BFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-[10px] font-extrabold uppercase">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#142033] mb-2 group-hover:text-[#5B4BFF] transition-colors leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-[#60708C] leading-relaxed line-clamp-3 mb-4">
                  {course.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-[#F5F7FF] text-[#60708C] text-[10px] font-bold border border-[#DDE6F5]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta Info Bar */}
              <div className="pt-4 border-t border-[#DDE6F5] flex items-center justify-between text-xs text-[#60708C] font-semibold">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#5B4BFF]" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-[#5B4BFF] font-bold group-hover:translate-x-1 transition-transform">
                  <span>Start Course</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-2xl relative space-y-6">
            <button
              onClick={() => setActiveCourse(null)}
              className="absolute top-4 right-4 p-2 text-[#60708C] hover:text-[#142033] rounded-full hover:bg-[#F5F7FF] cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#5B4BFF] text-white flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4338CA] text-[10px] font-bold uppercase">
                  {activeCourse.category}
                </span>
                <h3 className="text-xl font-black text-[#142033] mt-1">{activeCourse.title}</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#60708C] leading-relaxed">
              {activeCourse.description}
            </p>

            <div className="p-4 bg-[#F5F7FF] rounded-2xl border border-[#DDE6F5] space-y-2 text-xs">
              <div className="flex justify-between font-bold text-[#142033]">
                <span>Course Modules:</span>
                <span>{activeCourse.modulesCount} Interactive Modules</span>
              </div>
              <div className="flex justify-between font-bold text-[#142033]">
                <span>Recommended Level:</span>
                <span className="text-[#5B4BFF]">{activeCourse.level}</span>
              </div>
              <div className="flex justify-between font-bold text-[#142033]">
                <span>Duration:</span>
                <span>{activeCourse.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveCourse(null)}
                className="px-4 py-2.5 text-xs font-bold text-[#60708C] hover:text-[#142033] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveCourse(null);
                  onSelectVideoSession();
                }}
                className="px-6 py-2.5 bg-[#5B4BFF] hover:bg-[#4338CA] text-white text-xs font-bold rounded-full shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Go to Video Lessons</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
