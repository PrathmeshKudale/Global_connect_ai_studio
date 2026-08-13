import React, { useState } from "react";
import { Gamepad2, Trophy, CheckCircle, XCircle, RotateCcw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { useUser } from "../context/UserContext";

export const GamesView: React.FC = () => {
  const { markGameCompleted } = useUser();
  const [activeGame, setActiveGame] = useState<"prompt" | "classifier" | "ethics">("prompt");

  // Game 1: Prompt Master State
  const [promptScore, setPromptScore] = useState(0);
  const [promptQuestionIdx, setPromptQuestionIdx] = useState(0);
  const [promptAnswered, setPromptAnswered] = useState<number | null>(null);

  const PROMPT_QUESTIONS = [
    {
      target: "Create a detailed picture of a futuristic village classroom powered by solar panels.",
      options: [
        { text: "village school pic", score: 0, reason: "Too vague! AI needs clear details." },
        { text: "A futuristic village classroom with solar panels on roof, students using holographic tablets, digital art style, high contrast lighting", score: 25, reason: "Perfect! Specific, descriptive, and specifies style." },
        { text: "draw school with solar and kids", score: 10, reason: "Ok, but lacks artistic style and details." }
      ]
    },
    {
      target: "Ask AI to write a story explaining gravity to a Class 5 student.",
      options: [
        { text: "Tell me about gravity.", score: 5, reason: "Misses target audience age and tone." },
        { text: "Act as a friendly science teacher. Write a short story explaining gravity using a dropping apple analogy suitable for a 10-year-old child.", score: 25, reason: "Excellent! Defines role, context, and clear analogy." },
        { text: "Gravity physics formula derive for exam", score: 0, reason: "Too technical for Class 5 story." }
      ]
    },
    {
      target: "Generate a black and white line art page of a space astronaut puppy.",
      options: [
        { text: "space puppy image colored background", score: 5, reason: "Colored background makes line art hard to color." },
        { text: "Black and white children coloring book page of cute astronaut puppy on moon crater, thick black outlines, pure white background", score: 25, reason: "Spot on! Thick line art and white background." },
        { text: "realistic dog photo in space shuttle", score: 0, reason: "Photo style is not line art suitable for coloring." }
      ]
    }
  ];

  const handlePromptOptionClick = (optIdx: number, points: number) => {
    if (promptAnswered !== null) return;
    setPromptAnswered(optIdx);
    setPromptScore((prev) => prev + points);

    if (promptQuestionIdx === PROMPT_QUESTIONS.length - 1) {
      markGameCompleted("game-1");
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch (e) {}
    }
  };

  const handleNextPromptQuestion = () => {
    setPromptAnswered(null);
    if (promptQuestionIdx < PROMPT_QUESTIONS.length - 1) {
      setPromptQuestionIdx((prev) => prev + 1);
    }
  };

  const resetPromptGame = () => {
    setPromptScore(0);
    setPromptQuestionIdx(0);
    setPromptAnswered(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider">
            Gamified AI Learning
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#142033] mt-2">
            AI Mini Educational Games
          </h1>
          <p className="text-xs sm:text-sm text-[#60708C] mt-1">
            Test your prompt building skills, categorize machine learning datasets, and defend AI ethics with instant feedback.
          </p>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-[#DDE6F5] shadow-xs">
        <button
          onClick={() => setActiveGame("prompt")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
            activeGame === "prompt"
              ? "bg-[#5B4BFF] text-white shadow-sm"
              : "text-[#60708C] hover:bg-[#F5F7FF]"
          }`}
        >
          <Trophy className="w-4 h-4 text-[#08B7D8]" />
          <span>1. Prompt Master Challenge</span>
        </button>
      </div>

      {/* Game 1: Prompt Master Challenge */}
      {activeGame === "prompt" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#DDE6F5] pb-4">
            <div>
              <span className="text-xs font-bold text-[#60708C]">
                Question {promptQuestionIdx + 1} of {PROMPT_QUESTIONS.length}
              </span>
              <h2 className="text-xl font-extrabold text-[#142033] mt-0.5">
                Target: {PROMPT_QUESTIONS[promptQuestionIdx].target}
              </h2>
            </div>
            <div className="bg-[#EEF2FF] border border-[#C7D2FE] px-4 py-2 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-[#4338CA]">Score</span>
              <p className="text-xl font-black text-[#5B4BFF]">{promptScore} / 75</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold text-[#142033]">
              Select the best structured prompt option below:
            </p>

            {PROMPT_QUESTIONS[promptQuestionIdx].options.map((opt, idx) => {
              const isSelected = promptAnswered === idx;
              return (
                <div key={idx} className="space-y-2">
                  <button
                    onClick={() => handlePromptOptionClick(idx, opt.score)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? opt.score > 0
                          ? "bg-[#13B981]/10 border-[#13B981] text-[#13B981]"
                          : "bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]"
                        : "bg-[#F5F7FF] border-[#DDE6F5] hover:bg-[#E2E8F0] text-[#142033]"
                    }`}
                  >
                    <span>{opt.text}</span>
                    {isSelected && (
                      opt.score > 0 ? <CheckCircle className="w-5 h-5 text-[#13B981]" /> : <XCircle className="w-5 h-5 text-[#EF4444]" />
                    )}
                  </button>

                  {isSelected && (
                    <div className="p-3 bg-white rounded-xl border border-[#DDE6F5] text-xs text-[#60708C] font-medium">
                      💡 <strong>Feedback:</strong> {opt.reason}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {promptAnswered !== null && (
            <div className="pt-4 flex justify-between items-center">
              <button
                onClick={resetPromptGame}
                className="px-4 py-2 text-xs font-bold text-[#60708C] hover:text-[#142033] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Game
              </button>

              {promptQuestionIdx < PROMPT_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNextPromptQuestion}
                  className="px-6 py-2.5 bg-[#5B4BFF] text-white text-xs font-bold rounded-full cursor-pointer"
                >
                  Next Question →
                </button>
              ) : (
                <span className="text-xs font-bold text-[#13B981]">
                  🎉 Challenge Completed! Great Job!
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
