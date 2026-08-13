import React, { useState } from "react";
import { UserProvider } from "./context/UserContext";
import { Navbar } from "./components/Navbar";
import { AuthModal } from "./components/AuthModal";
import { HomeView } from "./components/HomeView";
import { SessionsView } from "./components/SessionsView";
import { VideosView } from "./components/VideosView";
import { ActivitiesView } from "./components/ActivitiesView";
import { GamesView } from "./components/GamesView";
import { CodeLabView } from "./components/CodeLabView";
import { DashboardView } from "./components/DashboardView";
import { AboutView } from "./components/AboutView";
import { AIChatBot } from "./components/AIChatBot";
import { Globe, Heart, ShieldCheck } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"signup" | "signin">("signup");

  const openAuthModal = (mode: "signup" | "signin") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-[#F5F7FF] text-[#142033] font-sans flex flex-col selection:bg-[#5B4BFF] selection:text-white">
        {/* Navigation Header Bar */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          openAuthModal={openAuthModal}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {currentTab === "home" && (
            <HomeView onNavigate={setCurrentTab} openAuthModal={openAuthModal} />
          )}

          {currentTab === "sessions" && (
            <SessionsView onSelectVideoSession={() => setCurrentTab("videos")} />
          )}

          {currentTab === "videos" && <VideosView />}

          {currentTab === "activities" && <ActivitiesView />}

          {currentTab === "games" && <GamesView />}

          {currentTab === "codelab" && <CodeLabView />}

          {currentTab === "dashboard" && (
            <DashboardView openAuthModal={openAuthModal} />
          )}

          {currentTab === "about" && (
            <AboutView openAuthModal={openAuthModal} />
          )}
        </main>

        {/* Floating AI Chatbot Widget */}
        <AIChatBot />

        {/* Auth Modal Overlay */}
        <AuthModal
          isOpen={authModalOpen}
          mode={authMode}
          onClose={() => setAuthModalOpen(false)}
          onSwitchMode={(m) => setAuthMode(m)}
        />

        {/* Global Footer */}
        <footer className="bg-white border-t border-[#DDE6F5] py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs text-[#60708C]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#5B4BFF] text-white flex items-center justify-center font-bold text-xs">
                GC
              </div>
              <span className="font-extrabold text-[#142033]">Global Connect</span>
              <span>— "Knowledge Has No Borders"</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 font-semibold">
              <button onClick={() => setCurrentTab("about")} className="hover:text-[#5B4BFF] cursor-pointer">
                Mission & Objectives
              </button>
              <button onClick={() => setCurrentTab("sessions")} className="hover:text-[#5B4BFF] cursor-pointer">
                Course Path
              </button>
              <button onClick={() => setCurrentTab("activities")} className="hover:text-[#5B4BFF] cursor-pointer">
                AI Labs
              </button>
            </div>

            <div className="flex items-center gap-1 font-semibold">
              <span>Developed by Kalpesh Bauskar & Prathmesh Kudale</span>
            </div>
          </div>
        </footer>
      </div>
    </UserProvider>
  );
}
