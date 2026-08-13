import React, { useState } from "react";
import {
  Play,
  CheckCircle,
  FileText,
  Lightbulb,
  Save,
  Check,
  Clock,
  Sparkles,
  BookOpen
} from "lucide-react";
import confetti from "canvas-confetti";
import { VIDEO_LESSONS } from "../data/appData";
import { useUser } from "../context/UserContext";

export const VideosView: React.FC = () => {
  const { user, markVideoCompleted, saveVideoNote } = useUser();

  const [selectedVideoId, setSelectedVideoId] = useState<string>(VIDEO_LESSONS[0].id);

  const currentVideo = VIDEO_LESSONS.find((v) => v.id === selectedVideoId) || VIDEO_LESSONS[0];

  const currentNote = user?.notes[currentVideo.id] || "";
  const [noteInput, setNoteInput] = useState(currentNote);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync note input when video changes
  React.useEffect(() => {
    setNoteInput(user?.notes[currentVideo.id] || "");
    setSavedSuccess(false);
  }, [selectedVideoId, user?.notes]);

  const handleSaveNote = () => {
    saveVideoNote(currentVideo.id, noteInput);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleMarkComplete = () => {
    markVideoCompleted(currentVideo.id);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.error(e);
    }
  };

  const isCompleted = user?.progress.completedVideos.includes(currentVideo.id);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider">
            Video Lessons & Notes
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#142033] mt-2">
            Global Tech Video Library
          </h1>
          <p className="text-xs sm:text-sm text-[#60708C] mt-1">
            Watch conceptual video lessons, review important data points, complete student activities, and save personal notes.
          </p>
        </div>
      </div>

      {/* Main Player & Sidebar Layout */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Player & Panels (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* YouTube Video Player Embed */}
          <div className="bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video relative border border-[#142033]">
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=0&rel=0`}
              title={currentVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Title & Actions */}
          <div className="bg-white rounded-3xl p-6 border border-[#DDE6F5] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-[10px] font-extrabold uppercase">
                  {currentVideo.category}
                </span>
                <span className="text-xs font-bold text-[#60708C] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#5B4BFF]" />
                  {currentVideo.duration}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-[#142033]">{currentVideo.title}</h2>
            </div>

            <button
              onClick={handleMarkComplete}
              disabled={isCompleted}
              className={`px-6 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                isCompleted
                  ? "bg-[#13B981]/10 text-[#13B981] border border-[#13B981]/30 cursor-default"
                  : "bg-[#5B4BFF] hover:bg-[#4338CA] text-white shadow-md hover:shadow-lg"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isCompleted ? "Video Completed ✓" : "Mark Complete"}</span>
            </button>
          </div>

          {/* Three Data Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Panel 1: Task & Assignment */}
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6F5] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#5B4BFF] font-extrabold text-xs">
                <FileText className="w-4 h-4" />
                <span>Task & Assignment</span>
              </div>
              <p className="text-xs text-[#142033] font-medium leading-relaxed">
                {currentVideo.taskDescription}
              </p>
            </div>

            {/* Panel 2: Student Activity */}
            <div className="bg-white rounded-3xl p-6 border border-[#DDE6F5] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[#08B7D8] font-extrabold text-xs">
                <Lightbulb className="w-4 h-4" />
                <span>Student Activity Guide</span>
              </div>
              <p className="text-xs text-[#142033] font-medium leading-relaxed">
                {currentVideo.studentActivity}
              </p>
            </div>
          </div>

          {/* Panel 3: Important Data Points */}
          <div className="bg-white rounded-3xl p-6 border border-[#DDE6F5] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#142033] font-extrabold text-xs">
              <Sparkles className="w-4 h-4 text-[#FF4FA3]" />
              <span>Important Data Points</span>
            </div>
            <ul className="space-y-2">
              {currentVideo.importantData.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#60708C]">
                  <span className="w-2 h-2 rounded-full bg-[#5B4BFF] mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Personal Notes Textarea */}
          <div className="bg-white rounded-3xl p-6 border border-[#DDE6F5] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#142033] font-extrabold text-xs">
                <BookOpen className="w-4 h-4 text-[#5B4BFF]" />
                <span>Personal Lesson Notes (Saved locally)</span>
              </div>
              {savedSuccess && (
                <span className="text-[11px] font-bold text-[#13B981] flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Notes Saved!
                </span>
              )}
            </div>

            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Write your key takeaways, questions for your teacher, or summary here..."
              rows={4}
              className="w-full p-4 bg-[#F5F7FF] border border-[#DDE6F5] rounded-2xl text-xs font-medium text-[#142033] focus:outline-none focus:border-[#5B4BFF]"
            />

            <button
              onClick={handleSaveNote}
              className="px-5 py-2.5 bg-[#142033] hover:bg-[#5B4BFF] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Personal Notes</span>
            </button>
          </div>
        </div>

        {/* Right Column: Playlist Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#DDE6F5] shadow-xs">
            <h3 className="text-base font-extrabold text-[#142033] mb-4 flex items-center justify-between">
              <span>Lesson Playlist</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EEF2FF] text-[#4338CA]">
                {VIDEO_LESSONS.length} Videos
              </span>
            </h3>

            <div className="space-y-2">
              {VIDEO_LESSONS.map((video, idx) => {
                const isSelected = video.id === currentVideo.id;
                const isVidCompleted = user?.progress.completedVideos.includes(video.id);

                return (
                  <button
                    key={video.id}
                    onClick={() => setSelectedVideoId(video.id)}
                    className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? "bg-[#EEF2FF] border-[#5B4BFF] shadow-xs"
                        : "bg-white border-[#DDE6F5] hover:bg-[#F5F7FF]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#142033] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                      {isVidCompleted ? (
                        <Check className="w-4 h-4 text-[#13B981]" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs font-extrabold truncate ${
                          isSelected ? "text-[#5B4BFF]" : "text-[#142033]"
                        }`}
                      >
                        {video.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-[#60708C] font-semibold">{video.duration}</span>
                        <span className="text-[10px] text-[#5B4BFF] font-bold">• {video.category}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
