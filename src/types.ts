export interface UserProgress {
  completedVideos: string[];
  completedActivities: string[];
  completedGames: string[];
  codeRunsCount: number;
}

export interface User {
  id: string;
  collegeId: string;
  name: string;
  studentClass: string;
  school: string;
  isLoggedIn: boolean;
  isGuest: boolean;
  progress: UserProgress;
  notes: Record<string, string>;
}

export interface SessionCourse {
  id: string;
  title: string;
  category: "AI & Tech" | "Coding" | "Global Exposure" | "Innovation";
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  iconName: string;
  modulesCount: number;
}

export interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  category: string;
  taskDescription: string;
  importantData: string[];
  studentActivity: string;
}

export interface ActivityLab {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
}

export interface MiniGame {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  scoreMax: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  school: string;
  avatarUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

export interface ColoringPage {
  id: string;
  title: string;
  prompt: string;
  imageUrl?: string;
  isLoading?: boolean;
}
