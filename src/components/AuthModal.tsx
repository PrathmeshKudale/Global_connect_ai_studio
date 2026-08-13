import React, { useState, useEffect } from "react";
import { X, Sparkles, User, School, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useUser } from "../context/UserContext";
import { PARTNER_SCHOOLS } from "../data/appData";

interface AuthModalProps {
  isOpen: boolean;
  mode: "signup" | "signin";
  onClose: () => void;
  onSwitchMode: (mode: "signup" | "signin") => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, mode, onClose, onSwitchMode }) => {
  const { signUp, signIn, continueAsGuest } = useUser();

  // Form states
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("Class 8");
  const [school, setSchool] = useState(PARTNER_SCHOOLS[0]);
  const [schoolPass, setSchoolPass] = useState("");
  const [collegeId, setCollegeId] = useState("");

  const [previewId, setPreviewId] = useState("");
  const [createdSuccessId, setCreatedSuccessId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Live preview ID generator on input change in signup mode
  useEffect(() => {
    if (mode === "signup" && school) {
      const prefix = school.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, "SCH");
      setPreviewId(`GC-${prefix}-XXXX`);
    }
  }, [school, mode]);

  if (!isOpen) return null;

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!schoolPass.trim()) {
      setErrorMsg("Please enter school password (e.g., provided by your teacher).");
      return;
    }

    const { collegeId: newId } = signUp(name, studentClass, school, schoolPass);
    setCreatedSuccessId(newId);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!collegeId.trim()) {
      setErrorMsg("Please enter your College/Student ID.");
      return;
    }

    const ok = signIn(collegeId, schoolPass);
    if (ok) {
      onClose();
    } else {
      setErrorMsg("Invalid College ID or password.");
    }
  };

  const handleGuestClick = () => {
    continueAsGuest();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#DDE6F5] overflow-hidden">
        {/* Top Dark Header */}
        <div className="bg-gradient-to-r from-[#111827] via-[#4F46E5] to-[#06B6D4] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#08B7D8]" />
            <span>Global Connect Access</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            {mode === "signup" ? "Create Student Account" : "Sign In to Classroom"}
          </h2>
          <p className="text-xs text-white/80 mt-1 font-medium">
            {mode === "signup"
              ? "Join village classrooms and connect with global experts"
              : "Enter your generated College ID to continue learning"}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {createdSuccessId ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-[#13B981]/10 text-[#13B981] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#142033]">Account Created!</h3>
                <p className="text-xs text-[#60708C] mt-1">Here is your official College Student ID:</p>
              </div>
              <div className="p-4 bg-[#EEF2FF] border-2 border-[#5B4BFF] rounded-2xl text-center">
                <p className="text-2xl font-black font-mono text-[#5B4BFF] tracking-wider">
                  {createdSuccessId}
                </p>
                <p className="text-[11px] text-[#60708C] mt-1 font-semibold">
                  Save this ID! You will use it to sign in anytime.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3.5 px-6 bg-[#5B4BFF] text-white font-bold rounded-2xl shadow-md hover:bg-[#4338CA] transition-all cursor-pointer"
              >
                Start Learning Now
              </button>
            </div>
          ) : (
            <>
              {errorMsg && (
                <div className="mb-4 p-3 bg-[#EF4444]/10 text-[#EF4444] text-xs font-bold rounded-xl border border-[#EF4444]/20">
                  {errorMsg}
                </div>
              )}

              {mode === "signup" ? (
                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#142033] mb-1">Student Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-[#60708C]" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Patil"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FF] border border-[#DDE6F5] rounded-xl text-sm font-semibold text-[#142033] focus:outline-none focus:border-[#5B4BFF]"
                        required
                      />
                    </div>
                  </div>

                  {/* Class */}
                  <div>
                    <label className="block text-xs font-bold text-[#142033] mb-1">Student Class</label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F5F7FF] border border-[#DDE6F5] rounded-xl text-sm font-semibold text-[#142033] focus:outline-none focus:border-[#5B4BFF]"
                    >
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Others">Others / Mentor</option>
                    </select>
                  </div>

                  {/* School */}
                  <div>
                    <label className="block text-xs font-bold text-[#142033] mb-1">Partner School / College</label>
                    <div className="relative">
                      <School className="absolute left-3.5 top-3 w-4 h-4 text-[#60708C]" />
                      <select
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FF] border border-[#DDE6F5] rounded-xl text-sm font-semibold text-[#142033] focus:outline-none focus:border-[#5B4BFF]"
                      >
                        {PARTNER_SCHOOLS.map((sch) => (
                          <option key={sch} value={sch}>
                            {sch}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* School Password */}
                  <div>
                    <label className="block text-xs font-bold text-[#142033] mb-1">School Classroom Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#60708C]" />
                      <input
                        type="password"
                        value={schoolPass}
                        onChange={(e) => setSchoolPass(e.target.value)}
                        placeholder="Teacher provided password"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FF] border border-[#DDE6F5] rounded-xl text-sm font-semibold text-[#142033] focus:outline-none focus:border-[#5B4BFF]"
                        required
                      />
                    </div>
                  </div>

                  {/* Live College ID Preview */}
                  <div className="p-3 bg-[#EEF2FF] border border-[#C7D2FE] rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#4338CA]">Generated College ID Preview</p>
                      <p className="text-sm font-black font-mono text-[#5B4BFF]">{previewId}</p>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-[#5B4BFF]" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#5B4BFF] hover:bg-[#4338CA] text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Create Account & Get ID</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#142033] mb-1">Generated College ID</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-[#60708C]" />
                      <input
                        type="text"
                        value={collegeId}
                        onChange={(e) => setCollegeId(e.target.value)}
                        placeholder="e.g. GC-KAN-4821"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FF] border border-[#DDE6F5] rounded-xl text-sm font-bold font-mono text-[#142033] uppercase focus:outline-none focus:border-[#5B4BFF]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#142033] mb-1">School Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#60708C]" />
                      <input
                        type="password"
                        value={schoolPass}
                        onChange={(e) => setSchoolPass(e.target.value)}
                        placeholder="Enter password"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FF] border border-[#DDE6F5] rounded-xl text-sm font-semibold text-[#142033] focus:outline-none focus:border-[#5B4BFF]"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#5B4BFF] hover:bg-[#4338CA] text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Guest & Switch Mode Options */}
              <div className="mt-6 pt-4 border-t border-[#DDE6F5] text-center space-y-3">
                <button
                  type="button"
                  onClick={handleGuestClick}
                  className="w-full py-2.5 px-4 bg-[#F5F7FF] hover:bg-[#E2E8F0] text-[#142033] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Continue as Guest Learner
                </button>

                <p className="text-xs text-[#60708C]">
                  {mode === "signup" ? "Already registered?" : "Don't have a College ID yet?"}{" "}
                  <button
                    type="button"
                    onClick={() => onSwitchMode(mode === "signup" ? "signin" : "signup")}
                    className="text-[#5B4BFF] font-extrabold hover:underline cursor-pointer"
                  >
                    {mode === "signup" ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
