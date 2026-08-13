import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  content: string;
}

export const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      content: "Namaste! I am Connect Bot, your AI Learning Mentor. Ask me anything about AI, coding, science, or your lessons!",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: "user_" + Date.now(),
      sender: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            content: m.content,
          })),
          systemInstruction:
            "You are Connect Bot, an encouraging, friendly AI learning mentor for rural village school students (Class 5–10) at Global Connect. Explain technology, science, coding, and AI using simple language, real-world analogies, and inspiring encouragement.",
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: "bot_" + Date.now(),
        sender: "bot",
        content: data.reply || "I am glad to help! What else would you like to explore?",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: "err_" + Date.now(),
          sender: "bot",
          content: "Sorry, I had trouble connecting. Please check your internet and try again!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "What is Artificial Intelligence?",
    "How do computers learn?",
    "What can I build with HTML?",
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 sm:bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-[#5B4BFF] to-[#08B7D8] text-white shadow-2xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2 group border-2 border-white"
        title="AI Learning Mentor Chat"
      >
        <Bot className="w-6 h-6 animate-bounce" />
        <span className="hidden sm:inline-block font-extrabold text-xs tracking-wider">
          Ask AI Mentor
        </span>
      </button>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 h-[480px] bg-white rounded-3xl shadow-2xl border border-[#DDE6F5] flex flex-col overflow-hidden animate-fadeIn">
          {/* Top Bar */}
          <div className="bg-gradient-to-r from-[#111827] via-[#4F46E5] to-[#06B6D4] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-[#08B7D8]" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-tight">Connect Bot</h3>
                <p className="text-[10px] text-slate-200 font-medium">Global AI Learning Mentor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F5F7FF]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 text-xs font-medium leading-relaxed ${
                  m.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-[#5B4BFF] text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                    AI
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[80%] ${
                    m.sender === "user"
                      ? "bg-[#5B4BFF] text-white rounded-br-none shadow-xs"
                      : "bg-white text-[#142033] border border-[#DDE6F5] rounded-bl-none shadow-xs"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#60708C] italic">
                <Loader2 className="w-4 h-4 animate-spin text-[#5B4BFF]" />
                <span>Connect Bot is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="p-2 bg-white border-t border-[#DDE6F5] flex gap-1.5 overflow-x-auto scrollbar-none">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="px-2.5 py-1 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#4338CA] text-[10px] font-bold rounded-full whitespace-nowrap shrink-0 cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#DDE6F5] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Connect Bot a question..."
              className="flex-1 px-3.5 py-2 bg-[#F5F7FF] border border-[#DDE6F5] rounded-xl text-xs font-semibold text-[#142033] focus:outline-none focus:border-[#5B4BFF]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-[#5B4BFF] hover:bg-[#4338CA] text-white rounded-xl shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
