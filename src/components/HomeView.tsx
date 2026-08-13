import React from "react";
import {
  Sparkles,
  BookOpen,
  Video,
  FlaskConical,
  Gamepad2,
  Code2,
  Globe,
  ArrowRight,
  School,
  CheckCircle2,
  Users,
  Brain,
  Lightbulb
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { PARTNER_SCHOOLS } from "../data/appData";

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  openAuthModal: (mode: "signup" | "signin") => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, openAuthModal }) => {
  const { user, continueAsGuest } = useUser();

  const handleGuestClick = () => {
    if (!user) {
      continueAsGuest();
    }
    onNavigate("sessions");
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Dark Gradient Banner */}
      <section className="relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-[#111827] via-[#4F46E5] to-[#06B6D4] p-6 sm:p-12 text-white shadow-2xl">
        {/* Decorative Grid Lines & Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF4FA3]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-extrabold uppercase tracking-wider text-[#08B7D8]">
              <Globe className="w-4 h-4 animate-spin-slow" />
              <span>Global Education for Rural Students</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              Bringing the World's Knowledge to Every{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#08B7D8] via-[#A5B4FC] to-[#FF4FA3]">
                Village Classroom
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 font-medium max-w-2xl leading-relaxed">
              Global Connect connects rural dreams with global opportunities by bringing future-ready AI skills, technology, interactive simulations, and expert mentorship to Class 5–10 students.
            </p>

            {/* Core Idea Pill Banner */}
            <div className="inline-flex items-center gap-3 p-3 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF4FA3] to-[#5B4BFF] flex items-center justify-center shrink-0 shadow-md">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-black text-white">"Donate 1 Hour of Knowledge"</p>
                <p className="text-[11px] text-slate-300">
                  One hour of a global expert's time becomes a life-changing learning opportunity for a student.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {user ? (
                <button
                  onClick={() => onNavigate("sessions")}
                  className="px-6 py-3.5 bg-[#08B7D8] hover:bg-[#0693ae] text-[#142033] font-black rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 text-sm"
                >
                  <span>Explore Learning Path</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="px-6 py-3.5 bg-[#5B4BFF] hover:bg-[#4338CA] text-white font-black rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 text-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#08B7D8]" />
                    <span>Join Us (Sign Up)</span>
                  </button>

                  <button
                    onClick={handleGuestClick}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold rounded-full transition-all cursor-pointer text-sm"
                  >
                    Continue as Guest
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Animated AI Orb Graphic + Live Stats Stack */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Pulsing Glowing Background Circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5B4BFF] to-[#08B7D8] opacity-30 blur-2xl animate-pulse" />
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-white/30 animate-spin-slow" />
              <div className="absolute inset-12 rounded-full border border-white/20" />

              {/* Central Glowing AI Orb */}
              <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#5B4BFF] via-[#08B7D8] to-[#FF4FA3] p-1 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full bg-[#111827] rounded-full flex flex-col items-center justify-center p-4 text-center">
                  <Brain className="w-10 h-10 sm:w-12 sm:h-12 text-[#08B7D8] mb-1 animate-bounce" />
                  <span className="text-xs font-black tracking-widest text-white uppercase">AI Classroom</span>
                </div>
              </div>

              {/* Floating Badge Chips Around Orb */}
              <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-[#142033] px-3 py-1.5 rounded-full text-[11px] font-black shadow-md flex items-center gap-1.5 border border-[#DDE6F5]">
                <BookOpen className="w-3.5 h-3.5 text-[#5B4BFF]" />
                <span>AI & Coding</span>
              </div>

              <div className="absolute bottom-4 right-2 bg-white/90 backdrop-blur-md text-[#142033] px-3 py-1.5 rounded-full text-[11px] font-black shadow-md flex items-center gap-1.5 border border-[#DDE6F5]">
                <FlaskConical className="w-3.5 h-3.5 text-[#08B7D8]" />
                <span>Simulations</span>
              </div>

              <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white/90 backdrop-blur-md text-[#142033] px-3 py-1.5 rounded-full text-[11px] font-black shadow-md flex items-center gap-1.5 border border-[#DDE6F5]">
                <Globe className="w-3.5 h-3.5 text-[#FF4FA3]" />
                <span>Global Mentors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Counters Stats Grid Bar */}
        <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate("sessions")}
            className="p-4 bg-white/10 hover:bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 cursor-pointer transition-transform hover:-translate-y-1 text-center sm:text-left"
          >
            <p className="text-3xl sm:text-4xl font-black text-[#08B7D8]">10+</p>
            <p className="text-xs font-bold text-slate-200 mt-1">Sessions & Courses</p>
          </div>

          <div
            onClick={() => onNavigate("videos")}
            className="p-4 bg-white/10 hover:bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 cursor-pointer transition-transform hover:-translate-y-1 text-center sm:text-left"
          >
            <p className="text-3xl sm:text-4xl font-black text-[#A5B4FC]">31+</p>
            <p className="text-xs font-bold text-slate-200 mt-1">Video Lessons</p>
          </div>

          <div
            onClick={() => onNavigate("activities")}
            className="p-4 bg-white/10 hover:bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 cursor-pointer transition-transform hover:-translate-y-1 text-center sm:text-left"
          >
            <p className="text-3xl sm:text-4xl font-black text-[#FF4FA3]">6+</p>
            <p className="text-xs font-bold text-slate-200 mt-1">AI Concept Labs</p>
          </div>

          <div
            onClick={() => onNavigate("games")}
            className="p-4 bg-white/10 hover:bg-white/15 rounded-2xl backdrop-blur-md border border-white/10 cursor-pointer transition-transform hover:-translate-y-1 text-center sm:text-left"
          >
            <p className="text-3xl sm:text-4xl font-black text-[#34D399]">7+</p>
            <p className="text-xs font-bold text-slate-200 mt-1">Learning Games</p>
          </div>
        </div>
      </section>

      {/* Feature Pillar Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider">
            Interactive Learning Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142033]">
            Empowering Rural Students with Cutting-Edge Tools
          </h2>
          <p className="text-xs sm:text-sm text-[#60708C]">
            Explore our hands-on suite designed for curiosity, creativity, and career confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Courses */}
          <div
            onClick={() => onNavigate("sessions")}
            className="bg-white p-6 rounded-3xl border border-[#DDE6F5] shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#5B4BFF]/10 text-[#5B4BFF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#142033] mb-2">Structured Roadmap</h3>
              <p className="text-xs text-[#60708C] leading-relaxed">
                Step-by-step learning paths covering AI basics, web development, prompt engineering, and future tech.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#5B4BFF] group-hover:translate-x-1 transition-transform">
              <span>View Sessions</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 2: AI Labs & Simulations */}
          <div
            onClick={() => onNavigate("activities")}
            className="bg-white p-6 rounded-3xl border border-[#DDE6F5] shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#08B7D8]/10 text-[#08B7D8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#142033] mb-2">AI Concept Labs</h3>
              <p className="text-xs text-[#60708C] leading-relaxed">
                Interactive neural network training visualizer, crop yield predictor, and AI coloring page generator!
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#08B7D8] group-hover:translate-x-1 transition-transform">
              <span>Launch Labs</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 3: Code Lab */}
          <div
            onClick={() => onNavigate("codelab")}
            className="bg-white p-6 rounded-3xl border border-[#DDE6F5] shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF4FA3]/10 text-[#FF4FA3] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#142033] mb-2">In-App Code Lab</h3>
              <p className="text-xs text-[#60708C] leading-relaxed">
                Write real HTML, CSS, and JavaScript with instant live browser output and interactive coding challenges.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#FF4FA3] group-hover:translate-x-1 transition-transform">
              <span>Open Code Editor</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 4: Learning Games */}
          <div
            onClick={() => onNavigate("games")}
            className="bg-white p-6 rounded-3xl border border-[#DDE6F5] shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#13B981]/10 text-[#13B981] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#142033] mb-2">Mini Learning Games</h3>
              <p className="text-xs text-[#60708C] leading-relaxed">
                Fun games teaching prompt construction, machine learning classification, and AI ethics with score tracking.
              </p>
            </div>
            <div className="mt-6 flex items-center text-xs font-bold text-[#13B981] group-hover:translate-x-1 transition-transform">
              <span>Play Games</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Schools Showcase */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5B4BFF] mb-1">
              <School className="w-4 h-4" />
              <span>Village School Network</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#142033]">Partner Schools & Classrooms</h3>
          </div>
          <button
            onClick={() => openAuthModal("signup")}
            className="text-xs font-bold text-[#5B4BFF] bg-[#EEF2FF] hover:bg-[#E0E7FF] px-4 py-2 rounded-full transition-colors cursor-pointer self-start md:self-auto"
          >
            Register Your School
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PARTNER_SCHOOLS.slice(0, 5).map((sch) => (
            <div
              key={sch}
              className="p-3.5 bg-[#F5F7FF] rounded-2xl border border-[#DDE6F5] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-[#5B4BFF]/10 text-[#5B4BFF] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-[#142033]">{sch}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
