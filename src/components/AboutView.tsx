import React from "react";
import {
  Globe,
  Sparkles,
  CheckCircle2,
  Users,
  Target,
  Quote,
  ArrowRight,
  Heart
} from "lucide-react";
import { OBJECTIVES, TEAM_MEMBERS, TESTIMONIALS } from "../data/appData";

interface AboutViewProps {
  openAuthModal: (mode: "signup" | "signin") => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ openAuthModal }) => {
  const focusTags = [
    "AI & Digital Literacy",
    "Coding & Tech Skills",
    "Global Expert Connections",
    "Project-Based Learning",
    "Innovation Mindset"
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Top Banner */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DDE6F5] shadow-xs space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase">
          <Globe className="w-3.5 h-3.5" />
          <span>About Global Connect</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#142033] leading-tight">
          Democratizing Global Exposure for the Grassroots
        </h1>

        <p className="text-sm sm:text-base text-[#60708C] leading-relaxed max-w-3xl">
          Global Connect is an educational initiative focused on bringing global exposure, advanced technology, AI skills, and expert mentorship to students at the grassroots level in village and rural schools.
        </p>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 bg-[#F5F7FF] rounded-3xl border border-[#DDE6F5] space-y-2">
            <span className="text-xs font-black text-[#5B4BFF] uppercase tracking-wider">Our Vision</span>
            <h3 className="text-lg font-black text-[#142033]">Equal Opportunity for Every Village Classroom</h3>
            <p className="text-xs text-[#60708C] leading-relaxed">
              We envision a world where geographical location or economic background never limits a child's access to world-class tech education, mentorship, and global aspirations.
            </p>
          </div>

          <div className="p-6 bg-[#F5F7FF] rounded-3xl border border-[#DDE6F5] space-y-2">
            <span className="text-xs font-black text-[#08B7D8] uppercase tracking-wider">Our Mission</span>
            <h3 className="text-lg font-black text-[#142033]">Bridge Rural Classrooms & Global Innovation</h3>
            <p className="text-xs text-[#60708C] leading-relaxed">
              To empower students with future-ready skills through 1-hour expert knowledge donations, interactive AI simulations, and practical coding tools.
            </p>
          </div>
        </div>

        {/* Focus Tags */}
        <div className="pt-4 border-t border-[#DDE6F5]">
          <p className="text-xs font-bold text-[#142033] mb-3">Core Pillars & Focus Areas:</p>
          <div className="flex flex-wrap gap-2">
            {focusTags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-extrabold border border-[#C7D2FE]"
              >
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Objectives Section */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase">
            Our Core Objectives
          </span>
          <h2 className="text-2xl font-black text-[#142033]">5 Pillars Driving Grassroots Impact</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OBJECTIVES.map((obj) => (
            <div
              key={obj.number}
              className="bg-white p-6 rounded-3xl border border-[#DDE6F5] shadow-xs hover:shadow-md transition-shadow space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#5B4BFF] text-white flex items-center justify-center font-black text-sm">
                {obj.number}
              </div>
              <h3 className="text-base font-extrabold text-[#142033]">{obj.title}</h3>
              <p className="text-xs text-[#60708C] leading-relaxed">{obj.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#DDE6F5] shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase">
            Leadership & Developers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#142033]">
            Meet the Global Connect Team
          </h2>
          <p className="text-xs sm:text-sm text-[#60708C]">
            Dedicated leaders and software engineering minds building technology for grassroots classrooms.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-[#F5F7FF] rounded-3xl p-6 border border-[#DDE6F5] flex flex-col items-center text-center space-y-4 hover:shadow-lg transition-all"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#5B4BFF] shadow-md">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-base font-black text-[#142033]">{member.name}</h3>
                <p className="text-[11px] font-bold text-[#5B4BFF] mt-0.5">{member.role}</p>
              </div>

              <p className="text-xs text-[#60708C] leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase">
            Community Voices
          </span>
          <h2 className="text-2xl font-black text-[#142033]">Stories From Village Classrooms</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-[#DDE6F5] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-[#5B4BFF]/30" />
                <p className="text-xs text-[#142033] font-medium leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#DDE6F5]">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#5B4BFF]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-[#142033]">{t.name}</h4>
                  <p className="text-[10px] text-[#60708C] font-semibold">{t.role} • {t.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="bg-gradient-to-r from-[#111827] via-[#4F46E5] to-[#06B6D4] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase">
          <Heart className="w-4 h-4 text-[#FF4FA3]" />
          <span>Donate 1 Hour of Knowledge</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black">
          Join the Global Connect Movement
        </h2>

        <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium">
          Whether you are a student, teacher, or global tech mentor, help us bring modern AI, coding, and future skills to every village classroom.
        </p>

        <button
          onClick={() => openAuthModal("signup")}
          className="px-8 py-4 bg-[#08B7D8] hover:bg-[#0693ae] text-[#142033] font-black rounded-full shadow-xl hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2 text-sm"
        >
          <span>Get Started Today</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
