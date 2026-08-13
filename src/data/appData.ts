import { SessionCourse, VideoLesson, ActivityLab, MiniGame, Testimonial, TeamMember } from "../types";

export const PARTNER_SCHOOLS = [
  "Kanya Vidyalay, Uchagav",
  "Kendra Shala, Nagdevwadi",
  "M. R. High School, Gadhinglaj",
  "New High School, Kolhapur",
  "Princess Padma Raje Girls High School, Kolhapur",
  "Other Village School"
];

export const SESSIONS_COURSES: SessionCourse[] = [
  {
    id: "session-1",
    title: "Introduction to Artificial Intelligence & Future Tech",
    category: "AI & Tech",
    description: "Discover what AI is, how computers think, machine learning basics, and how AI is changing our everyday world.",
    duration: "4 Weeks • 8 Modules",
    level: "Beginner",
    tags: ["AI Literacy", "Machine Learning", "Future Skills"],
    iconName: "BrainCircuit",
    modulesCount: 8
  },
  {
    id: "session-2",
    title: "Web Development & Code Foundations (HTML/CSS/JS)",
    category: "Coding",
    description: "Learn how to build real websites, format pages with HTML tags, style with CSS colors, and create interactive buttons.",
    duration: "6 Weeks • 12 Modules",
    level: "Beginner",
    tags: ["HTML5", "CSS3", "JavaScript", "Web Building"],
    iconName: "Code2",
    modulesCount: 12
  },
  {
    id: "session-3",
    title: "Prompt Engineering & Creative AI Tools",
    category: "AI & Tech",
    description: "Master the art of asking AI the right questions, generating images, writing stories, and creating learning study guides.",
    duration: "3 Weeks • 6 Modules",
    level: "Intermediate",
    tags: ["Prompting", "Generative AI", "Creativity"],
    iconName: "Sparkles",
    modulesCount: 6
  },
  {
    id: "session-4",
    title: "Global Mentorship & Career Exploration",
    category: "Global Exposure",
    description: "Connect with global engineers, doctors, and scientists to explore global university paths and innovative tech careers.",
    duration: "4 Weeks • 5 Sessions",
    level: "Beginner",
    tags: ["Mentorship", "Global Careers", "Guidance"],
    iconName: "Globe2",
    modulesCount: 5
  },
  {
    id: "session-5",
    title: "Computer Vision & Smart Sensor Applications",
    category: "Innovation",
    description: "Understand how cameras recognize objects, face detection works, and autonomous vehicles navigate safely.",
    duration: "5 Weeks • 10 Modules",
    level: "Intermediate",
    tags: ["Computer Vision", "Robotics", "Sensors"],
    iconName: "Eye",
    modulesCount: 10
  },
  {
    id: "session-6",
    title: "Ethics in AI & Responsible Technology",
    category: "AI & Tech",
    description: "Explore fairness in AI algorithms, data privacy, detecting misinformation, and building technology that helps humanity.",
    duration: "2 Weeks • 4 Modules",
    level: "Intermediate",
    tags: ["AI Ethics", "Data Privacy", "Digital Safety"],
    iconName: "ShieldCheck",
    modulesCount: 4
  }
];

export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: "video-1",
    title: "Introduction To Artificial Intelligence",
    duration: "12:45",
    youtubeId: "2ePf9rue1Ao",
    category: "AI Fundamentals",
    taskDescription: "Watch the video to understand the difference between human intelligence and machine intelligence. Write down three daily examples of AI in your notebook.",
    importantData: [
      "Artificial Intelligence (AI) simulates human reasoning in software.",
      "Machine Learning learns patterns directly from data examples without hardcoded rules.",
      "Key applications: voice assistants, recommendation systems, automated medical diagnosis."
    ],
    studentActivity: "Identify 3 smart devices or apps in your village or school (e.g., smartphone voice typing, YouTube recommendation) and describe how they use AI."
  },
  {
    id: "video-2",
    title: "How Computers Learn: Machine Learning Explained",
    duration: "15:20",
    youtubeId: "z-EtmaFJieY",
    category: "Machine Learning",
    taskDescription: "Learn about Supervised, Unsupervised, and Reinforcement Learning through easy real-world analogies.",
    importantData: [
      "Supervised Learning uses labeled data (e.g., Apple vs Banana images).",
      "Unsupervised Learning groups similar unlabeled items into clusters.",
      "Reinforcement Learning learns by trial, error, and reward signals."
    ],
    studentActivity: "Draw a simple diagram showing input data -> machine learning model -> predictions."
  },
  {
    id: "video-3",
    title: "HTML Basics: Building Your First Web Page",
    duration: "18:10",
    youtubeId: "UB1O30fR-EE",
    category: "Coding",
    taskDescription: "Understand tags like <h1>, <p>, <a>, <img>, and <div> to build a personal bio webpage.",
    importantData: [
      "HTML stands for HyperText Markup Language.",
      "Heading tags (<h1> to <h6>) create structural text hierarchy.",
      "Use paragraph <p> for body text and <a> for hyperlinks."
    ],
    studentActivity: "Go to the Code Lab in this app and build a 1-page profile with your name, school, and favorite subject."
  },
  {
    id: "video-4",
    title: "Generative AI & Image Creation",
    duration: "14:05",
    youtubeId: "5sLYAQS9s8U",
    category: "Generative AI",
    taskDescription: "Explore how diffusion models and neural networks transform text descriptions into detailed artwork.",
    importantData: [
      "Generative AI creates new text, images, music, or code based on training data.",
      "Prompts are clear instructions given to AI models.",
      "Detailed descriptive prompts lead to high-quality output."
    ],
    studentActivity: "Try writing 3 distinct prompts in our AI Creative & Coloring Book Lab to generate custom coloring art!"
  },
  {
    id: "video-5",
    title: "Computer Vision & How Cameras See",
    duration: "16:30",
    youtubeId: "OcycT1Jio2w",
    category: "Computer Vision",
    taskDescription: "Understand how images are stored as grid arrays of pixels (RGB colors) and analyzed by neural networks.",
    importantData: [
      "Pixels are tiny dots of color (Red, Green, Blue values 0-255).",
      "Convolutional Neural Networks (CNNs) scan pixel patterns to identify shapes and faces.",
      "Used in medical scans, agriculture crop disease detection, and self-driving vehicles."
    ],
    studentActivity: "Draw a 5x5 grid representing a pixel matrix and color cells to form a simple letter 'A'."
  }
];

export const ACTIVITIES_LABS: ActivityLab[] = [
  {
    id: "lab-neural-net",
    title: "Interactive Neural Network Visualizer",
    category: "AI Simulation",
    description: "Adjust learning rates, hidden layer weights, and epochs to watch a neural network classify data live on a canvas.",
    iconName: "Network"
  },
  {
    id: "lab-coloring-book",
    title: "AI Coloring Book & Line-Art Generator",
    category: "Generative AI Lab",
    description: "Provide any theme and child's name to generate 5 thick-line black-and-white printable coloring pages and download as a single PDF book!",
    iconName: "Palette"
  },
  {
    id: "lab-prediction",
    title: "Crop Yield AI Prediction Lab",
    category: "Machine Learning",
    description: "Simulate rainfall, soil nitrogen, temperature, and sunlight parameters to observe how AI predicts agricultural harvest yields.",
    iconName: "Sprout"
  },
  {
    id: "lab-vision",
    title: "Pixel Convolution & Shape Detector",
    category: "Computer Vision",
    description: "Draw custom shapes or digits on an interactive canvas matrix and test the AI shape detector in real-time.",
    iconName: "ScanLine"
  },
  {
    id: "lab-prompt",
    title: "Smart Prompt Builder Studio",
    category: "Prompt Engineering",
    description: "Experiment with role, task, context, and format rules to construct perfect AI prompts and test live responses.",
    iconName: "Wand2"
  },
  {
    id: "lab-ethics",
    title: "AI Fairness & Bias Simulator",
    category: "AI Ethics",
    description: "Test hiring and loan approval algorithms with diverse datasets to identify and fix algorithmic bias.",
    iconName: "Scale"
  }
];

export const MINI_GAMES: MiniGame[] = [
  {
    id: "game-1",
    title: "Prompt Master Challenge",
    category: "Prompting",
    description: "Choose the most descriptive prompt to match the target image/response and earn high scores!",
    iconName: "Trophy",
    scoreMax: 100
  },
  {
    id: "game-2",
    title: "Neural Network Classifier",
    category: "Machine Learning",
    description: "Drag incoming data points (images, audio, text) into the correct Supervised vs Unsupervised learning buckets!",
    iconName: "Layers",
    scoreMax: 100
  },
  {
    id: "game-3",
    title: "AI Ethics Defender",
    category: "Ethics",
    description: "Analyze scenarios regarding privacy, deepfakes, and automated decisions to make ethical technology choices.",
    iconName: "Shield",
    scoreMax: 100
  },
  {
    id: "game-4",
    title: "Pixel Art & Code Match",
    category: "Coding",
    description: "Match HTML/CSS tags with their visual outputs in a fast-paced memory tile game!",
    iconName: "Gamepad2",
    scoreMax: 100
  }
];

export const OBJECTIVES = [
  {
    number: "01",
    title: "Reduce the Opportunity Gap",
    description: "Provide equal access to modern education and global exposure for students from rural and village communities."
  },
  {
    number: "02",
    title: "Build Future Skills",
    description: "Introduce students to AI, coding, digital literacy, and emerging technologies through hands-on learning."
  },
  {
    number: "03",
    title: "Create Global Connections",
    description: "Connect learners with international professionals, university educators, and global mentors."
  },
  {
    number: "04",
    title: "Promote Learning by Doing",
    description: "Encourage students through interactive simulations, code labs, games, and real-world project challenges."
  },
  {
    number: "05",
    title: "Develop Future Leaders",
    description: "Transform students from passive consumers into creators, innovators, and problem-solvers ready for tomorrow's world."
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Strategic Advisory Council",
    role: "Founder & Strategic Leader",
    bio: "Guiding the visionary direction of Global Connect to democratize quality tech education across rural India and beyond.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "team-2",
    name: "Global Connect Leadership",
    role: "CEO, Global Connect",
    bio: "Spearheading grassroots outreach, school partnerships, and volunteer mentor networks across village classrooms.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "team-3",
    name: "Kalpesh Bauskar",
    role: "Developer — Technology & Infrastructure",
    bio: "Building and scaling the robust tech infrastructure behind global learning experiences for rural classrooms.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "team-4",
    name: "Prathmesh Kudale",
    role: "Developer — Software & Web Development",
    bio: "Crafting code, interactive labs, and digital solutions to bring global knowledge directly to students' fingertips.",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "Through Global Connect, I built my first web page and learned how AI works right in our Uchagav village classroom. I now dream of becoming a software engineer!",
    name: "Ananya Patil",
    role: "Class 9 Student",
    school: "Kanya Vidyalay, Uchagav",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "test-2",
    quote: "The 1-Hour Knowledge donation concept connects our village students with experts from Silicon Valley and top universities. The change in confidence is remarkable.",
    name: "Suresh Kamble",
    role: "Senior Science Teacher",
    school: "M. R. High School, Gadhinglaj",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
  },
  {
    id: "test-3",
    quote: "Donating an hour of my time to teach AI simulation labs to rural kids was one of the most rewarding mentorship experiences of my engineering career.",
    name: "Dr. Marcus Vance",
    role: "Volunteer AI Researcher & Global Mentor",
    school: "Global Mentor Network",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80"
  }
];
