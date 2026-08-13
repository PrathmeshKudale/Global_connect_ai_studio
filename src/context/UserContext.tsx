import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserProgress } from "../types";

interface UserContextType {
  user: User | null;
  signUp: (name: string, studentClass: string, school: string, schoolPass: string) => { collegeId: string };
  signIn: (collegeId: string, schoolPass: string) => boolean;
  continueAsGuest: () => void;
  logout: () => void;
  markVideoCompleted: (videoId: string) => void;
  markActivityCompleted: (activityId: string) => void;
  markGameCompleted: (gameId: string) => void;
  incrementCodeRun: () => void;
  saveVideoNote: (videoId: string, noteText: string) => void;
  resetProgress: () => void;
}

const DEFAULT_PROGRESS: UserProgress = {
  completedVideos: ["video-1"],
  completedActivities: [],
  completedGames: [],
  codeRunsCount: 0,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "global_connect_user_data_v1";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } catch (e) {
        console.error("Error writing localStorage:", e);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const signUp = (name: string, studentClass: string, school: string, _schoolPass: string) => {
    // Generate College ID format GC-SCH-XXXX
    const schoolPrefix = school.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, "SCH");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const collegeId = `GC-${schoolPrefix}-${randomNum}`;

    const newUser: User = {
      id: "usr_" + Date.now(),
      collegeId,
      name: name.trim(),
      studentClass,
      school,
      isLoggedIn: true,
      isGuest: false,
      progress: { ...DEFAULT_PROGRESS },
      notes: {},
    };

    setUser(newUser);
    return { collegeId };
  };

  const signIn = (collegeId: string, _schoolPass: string) => {
    const cleanId = collegeId.trim().toUpperCase();
    if (!cleanId) return false;

    // Check if user already stored or create session
    if (user && user.collegeId.toUpperCase() === cleanId) {
      setUser({ ...user, isLoggedIn: true });
      return true;
    }

    const newUser: User = {
      id: "usr_" + Date.now(),
      collegeId: cleanId,
      name: `Student (${cleanId})`,
      studentClass: "Class 8",
      school: "Kanya Vidyalay, Uchagav",
      isLoggedIn: true,
      isGuest: false,
      progress: { ...DEFAULT_PROGRESS },
      notes: {},
    };

    setUser(newUser);
    return true;
  };

  const continueAsGuest = () => {
    const guestUser: User = {
      id: "guest_" + Date.now(),
      collegeId: "GC-GUEST-0000",
      name: "Guest Student",
      studentClass: "Class 7",
      school: "Village Guest Learner",
      isLoggedIn: true,
      isGuest: true,
      progress: { ...DEFAULT_PROGRESS },
      notes: {},
    };
    setUser(guestUser);
  };

  const logout = () => {
    setUser(null);
  };

  const markVideoCompleted = (videoId: string) => {
    if (!user) return;
    const currentList = user.progress.completedVideos || [];
    if (!currentList.includes(videoId)) {
      setUser({
        ...user,
        progress: {
          ...user.progress,
          completedVideos: [...currentList, videoId],
        },
      });
    }
  };

  const markActivityCompleted = (activityId: string) => {
    if (!user) return;
    const currentList = user.progress.completedActivities || [];
    if (!currentList.includes(activityId)) {
      setUser({
        ...user,
        progress: {
          ...user.progress,
          completedActivities: [...currentList, activityId],
        },
      });
    }
  };

  const markGameCompleted = (gameId: string) => {
    if (!user) return;
    const currentList = user.progress.completedGames || [];
    if (!currentList.includes(gameId)) {
      setUser({
        ...user,
        progress: {
          ...user.progress,
          completedGames: [...currentList, gameId],
        },
      });
    }
  };

  const incrementCodeRun = () => {
    if (!user) return;
    setUser({
      ...user,
      progress: {
        ...user.progress,
        codeRunsCount: (user.progress.codeRunsCount || 0) + 1,
      },
    });
  };

  const saveVideoNote = (videoId: string, noteText: string) => {
    if (!user) return;
    setUser({
      ...user,
      notes: {
        ...user.notes,
        [videoId]: noteText,
      },
    });
  };

  const resetProgress = () => {
    if (!user) return;
    setUser({
      ...user,
      progress: {
        completedVideos: [],
        completedActivities: [],
        completedGames: [],
        codeRunsCount: 0,
      },
      notes: {},
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        continueAsGuest,
        logout,
        markVideoCompleted,
        markActivityCompleted,
        markGameCompleted,
        incrementCodeRun,
        saveVideoNote,
        resetProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
