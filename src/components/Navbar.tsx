import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Video,
  FlaskConical,
  Gamepad2,
  Code2,
  LayoutDashboard,
  Info,
  LogOut,
  User,
  Sparkles,
  Menu,
  X,
  Globe
} from "lucide-react";
import { useUser } from "../context/UserContext";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAuthModal: (mode: "signup" | "signin") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, openAuthModal }) => {
  const { user, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "sessions", label: "Sessions", icon: BookOpen },
    { id: "videos", label: "Videos", icon: Video },
    { id: "activities", label: "Activities", icon: FlaskConical },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "codelab", label: "Code Lab", icon: Code2 },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "about", label: "About", icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DDE6F5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => setCurrentTab("home")}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#5B4BFF] via-[#08B7D8] to-[#FF4FA3] p-0.5 shadow-md transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-[#142033] rounded-[14px] flex items-center justify-center">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#08B7D8] animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl text-[#142033] tracking-tight">
                    Global<span className="text-[#5B4BFF]">Connect</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-[#EEF2FF] text-[#4338CA] border border-[#C7D2FE]">
                    Rural EdTech
                  </span>
                </div>
                <p className="text-[11px] text-[#60708C] font-medium hidden xs:block">
                  Knowledge Has No Borders
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#F5F7FF] p-1.5 rounded-2xl border border-[#DDE6F5]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#5B4BFF] text-white shadow-sm"
                        : "text-[#60708C] hover:text-[#142033] hover:bg-white/60"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Auth / Profile Actions */}
            <div className="flex items-center gap-2.5">
              {user ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTab("dashboard")}
                    className="flex items-center gap-2 bg-[#EEF2FF] hover:bg-[#E0E7FF] border border-[#C7D2FE] px-3 py-1.5 rounded-full transition-colors text-left cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#5B4BFF] to-[#08B7D8] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-xs font-bold text-[#142033] leading-tight truncate max-w-[100px]">
                        {user.name}
                      </p>
                      <p className="text-[10px] font-mono text-[#5B4BFF]">
                        {user.collegeId}
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-2 text-[#60708C] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-full transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openAuthModal("signin")}
                    className="text-xs font-bold text-[#5B4BFF] hover:text-[#4338CA] px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal("signup")}
                    className="flex items-center gap-1.5 text-xs font-bold bg-[#5B4BFF] hover:bg-[#4338CA] text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Join Us</span>
                  </button>
                </div>
              )}

              {/* Mobile menu hamburger toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#142033] hover:bg-[#F5F7FF] rounded-xl cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#DDE6F5] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#5B4BFF] text-white"
                      : "text-[#142033] hover:bg-[#F5F7FF]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Mobile Bottom Fixed Bar for easy thumb switching */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#DDE6F5] px-2 py-1.5 flex justify-around items-center shadow-lg">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold cursor-pointer transition-colors ${
                isActive ? "text-[#5B4BFF]" : "text-[#60708C]"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""}`} />
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
