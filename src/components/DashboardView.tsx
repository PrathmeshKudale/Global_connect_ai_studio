import React from "react";
import {
  Award,
  Video,
  FlaskConical,
  Gamepad2,
  Code2,
  RotateCcw,
  LogOut,
  FileDown,
  CheckCircle2,
  UserCheck,
  School,
  Sparkles
} from "lucide-react";
import jsPDF from "jspdf";
import { useUser } from "../context/UserContext";
import { VIDEO_LESSONS, ACTIVITIES_LABS } from "../data/appData";

interface DashboardViewProps {
  openAuthModal: (mode: "signup" | "signin") => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ openAuthModal }) => {
  const { user, resetProgress, logout } = useUser();

  if (!user) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-[#DDE6F5] text-center space-y-4 max-w-lg mx-auto my-12">
        <div className="w-16 h-16 bg-[#5B4BFF]/10 text-[#5B4BFF] rounded-full flex items-center justify-center mx-auto">
          <UserCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#142033]">Student Dashboard Access</h2>
        <p className="text-xs text-[#60708C]">
          Please sign in with your College ID or create an account to view your personal learning progress and download official certificates.
        </p>
        <button
          onClick={() => openAuthModal("signin")}
          className="px-6 py-3 bg-[#5B4BFF] text-white text-xs font-bold rounded-full shadow-md cursor-pointer"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const { completedVideos, completedActivities, completedGames, codeRunsCount } = user.progress;

  const totalTrackableItems = VIDEO_LESSONS.length + ACTIVITIES_LABS.length + 4;
  const completedTotal = completedVideos.length + completedActivities.length + completedGames.length;
  const progressPercent = Math.min(100, Math.round((completedTotal / totalTrackableItems) * 100));

  // Generate PDF Certificate of Achievement
  const handleDownloadCertificate = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Dark Navy Border Frame
    doc.setDrawColor(20, 32, 51);
    doc.setLineWidth(4);
    doc.rect(10, 10, 277, 190);

    // Inner Gold/Indigo Accent Line
    doc.setDrawColor(91, 75, 255);
    doc.setLineWidth(1);
    doc.rect(14, 14, 269, 182);

    // Header Branding
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(20, 32, 51);
    doc.text("GLOBAL CONNECT", 148.5, 45, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(8, 183, 216);
    doc.text("KNOWLEDGE HAS NO BORDERS • RURAL EDTECH INITIATIVE", 148.5, 54, { align: "center" });

    doc.setFontSize(20);
    doc.setTextColor(91, 75, 255);
    doc.text("CERTIFICATE OF LEARNING ACHIEVEMENT", 148.5, 75, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor(96, 112, 140);
    doc.text("This is proudly presented to", 148.5, 90, { align: "center" });

    // Student Name
    doc.setFontSize(26);
    doc.setTextColor(20, 32, 51);
    doc.text(user.name.toUpperCase(), 148.5, 108, { align: "center" });

    doc.setDrawColor(91, 75, 255);
    doc.setLineWidth(0.5);
    doc.line(70, 112, 227, 112);

    // Details Text
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(
      `College Student ID: ${user.collegeId}  |  Classroom: ${user.school} (${user.studentClass})`,
      148.5,
      122,
      { align: "center" }
    );

    doc.text(
      `For successful completion of AI Fundamentals, Interactive Coding Labs, and Concept Simulations.`,
      148.5,
      132,
      { align: "center" }
    );

    // Signatures / Stamps
    doc.setFontSize(10);
    doc.setTextColor(20, 32, 51);
    doc.text("Global Connect Leadership", 60, 170, { align: "center" });
    doc.line(30, 165, 90, 165);

    doc.text("Global Mentor Network", 230, 170, { align: "center" });
    doc.line(200, 165, 260, 165);

    doc.save(`${user.name.replace(/\s+/g, "_")}_Global_Connect_Certificate.pdf`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Student Profile Header Card */}
      <div className="bg-gradient-to-r from-[#111827] via-[#4F46E5] to-[#06B6D4] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white text-[#5B4BFF] flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black">{user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase">
                {user.studentClass}
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-1 flex items-center gap-1.5 font-medium">
              <School className="w-3.5 h-3.5 text-[#08B7D8]" />
              {user.school}
            </p>
            <p className="text-xs font-mono text-[#08B7D8] font-bold mt-1">
              Student ID: {user.collegeId}
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadCertificate}
          className="px-6 py-3.5 bg-[#08B7D8] hover:bg-[#0693ae] text-[#142033] text-xs font-black rounded-full shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Award className="w-4 h-4" />
          <span>Download Certificate (PDF)</span>
        </button>
      </div>

      {/* Progress Bar Header */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE6F5] shadow-xs space-y-3">
        <div className="flex justify-between items-center text-xs font-extrabold text-[#142033]">
          <span>Overall Learning Path Progress</span>
          <span className="text-[#5B4BFF] text-base">{progressPercent}%</span>
        </div>

        <div className="w-full h-3 bg-[#F5F7FF] rounded-full overflow-hidden border border-[#DDE6F5]">
          <div
            className="h-full bg-gradient-to-r from-[#5B4BFF] via-[#08B7D8] to-[#13B981] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#DDE6F5] shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#5B4BFF]/10 text-[#5B4BFF] flex items-center justify-center font-bold">
            <Video className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-[#142033]">{completedVideos.length}</p>
          <p className="text-xs font-semibold text-[#60708C]">Videos Completed</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#DDE6F5] shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#08B7D8]/10 text-[#08B7D8] flex items-center justify-center font-bold">
            <FlaskConical className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-[#142033]">{completedActivities.length}</p>
          <p className="text-xs font-semibold text-[#60708C]">AI Labs Finished</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#DDE6F5] shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#13B981]/10 text-[#13B981] flex items-center justify-center font-bold">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-[#142033]">{completedGames.length}</p>
          <p className="text-xs font-semibold text-[#60708C]">Games Completed</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#DDE6F5] shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FF4FA3]/10 text-[#FF4FA3] flex items-center justify-center font-bold">
            <Code2 className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-[#142033]">{codeRunsCount}</p>
          <p className="text-xs font-semibold text-[#60708C]">Code Executions</p>
        </div>
      </div>

      {/* Account Settings / Actions */}
      <div className="bg-white rounded-3xl p-6 border border-[#DDE6F5] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-extrabold text-[#142033]">Account Management</h3>
          <p className="text-xs text-[#60708C]">Reset local progress or log out of this session.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProgress}
            className="px-4 py-2.5 bg-[#F5F7FF] hover:bg-[#FEF2F2] text-[#EF4444] text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>

          <button
            onClick={logout}
            className="px-4 py-2.5 bg-[#142033] hover:bg-[#000] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
