import React, { useState } from "react";
import { Code2, Play, RotateCcw, ExternalLink, Terminal, Monitor, Check } from "lucide-react";
import { useUser } from "../context/UserContext";

const STARTER_TEMPLATES: Record<string, { title: string; code: string }> = {
  template1: {
    title: "1. My First Village Bio Webpage",
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #F5F7FF; padding: 20px; color: #142033; }
    .card { background: white; padding: 20px; border-radius: 16px; border: 1px solid #DDE6F5; }
    h1 { color: #5B4BFF; }
    .btn { background: #5B4BFF; color: white; border: none; padding: 10px 20px; border-radius: 20px; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello, I am a Global Connect Learner!</h1>
    <p>I am learning Web Development and AI at my village school.</p>
    <button class="btn" onclick="sayHello()">Click Me!</button>
    <p id="output" style="color: #08B7D8; font-weight: bold; font-size: 18px;"></p>
  </div>

  <script>
    function sayHello() {
      document.getElementById('output').innerText = 'Welcome to Global Connect Coding Lab!';
      console.log('Button clicked successfully!');
    }
  </script>
</body>
</html>`
  },
  template2: {
    title: "2. Interactive JavaScript AI Light Switch",
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { text-align: center; font-family: sans-serif; padding: 30px; background: #111827; color: white; }
    .bulb { width: 100px; h-100px; background: #374151; border-radius: 50%; margin: 20px auto; transition: 0.3s; }
    .on { background: #F59E0B; box-shadow: 0 0 40px #F59E0B; }
    button { background: #08B7D8; color: #111827; border: none; padding: 12px 24px; border-radius: 20px; font-weight: bold; font-size: 16px; cursor: pointer; }
  </style>
</head>
<body>
  <h2>Smart Sensor Simulation</h2>
  <div id="light" class="bulb"></div>
  <button onclick="toggleLight()">Toggle Smart Sensor</button>

  <script>
    let isLightOn = false;
    function toggleLight() {
      isLightOn = !isLightOn;
      const el = document.getElementById('light');
      if (isLightOn) {
        el.classList.add('on');
        console.log('Sensor activated: Light ON');
      } else {
        el.classList.remove('on');
        console.log('Sensor deactivated: Light OFF');
      }
    }
  </script>
</body>
</html>`
  }
};

export const CodeLabView: React.FC = () => {
  const { incrementCodeRun } = useUser();
  const [selectedTemplateKey, setSelectedTemplateKey] = useState("template1");
  const [code, setCode] = useState(STARTER_TEMPLATES["template1"].code);
  const [previewSrcDoc, setPreviewSrcDoc] = useState(STARTER_TEMPLATES["template1"].code);
  const [consoleLogs, setConsoleLogs] = useState<string[]>(["[Console Ready] Click 'Run Code' to execute."]);

  const handleRunCode = () => {
    setPreviewSrcDoc(code);
    incrementCodeRun();
    setConsoleLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Executed successfully. Rendered live output.`
    ]);
  };

  const handleSelectTemplate = (key: string) => {
    setSelectedTemplateKey(key);
    setCode(STARTER_TEMPLATES[key].code);
    setPreviewSrcDoc(STARTER_TEMPLATES[key].code);
  };

  const handleReset = () => {
    setCode(STARTER_TEMPLATES[selectedTemplateKey].code);
    setPreviewSrcDoc(STARTER_TEMPLATES[selectedTemplateKey].code);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider">
            In-App Code Editor
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#142033] mt-2">
            Global Connect Code Lab
          </h1>
          <p className="text-xs sm:text-sm text-[#60708C] mt-1">
            Write HTML, CSS, and JavaScript with live browser rendering and output console right inside the app.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedTemplateKey}
            onChange={(e) => handleSelectTemplate(e.target.value)}
            className="px-4 py-2.5 bg-[#F5F7FF] border border-[#DDE6F5] rounded-xl text-xs font-bold text-[#142033]"
          >
            {Object.entries(STARTER_TEMPLATES).map(([k, t]) => (
              <option key={k} value={k}>
                {t.title}
              </option>
            ))}
          </select>

          <button
            onClick={handleRunCode}
            className="px-5 py-2.5 bg-[#13B981] hover:bg-[#0f9f6e] text-white text-xs font-extrabold rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Run Code</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 bg-[#F5F7FF] hover:bg-[#E2E8F0] text-[#142033] rounded-xl cursor-pointer"
            title="Reset Starter Code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <a
            href="https://onecompiler.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-[#142033] hover:bg-[#5B4BFF] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>Full Compiler</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Code Editor & Preview Split Screen */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column: Code Editor Input */}
        <div className="bg-[#111827] rounded-3xl p-4 border border-[#142033] shadow-xl flex flex-col space-y-2">
          <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#08B7D8]" />
              <span>index.html (HTML/CSS/JS)</span>
            </div>
            <span>UTF-8</span>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-96 p-4 bg-transparent text-emerald-400 font-mono text-xs leading-relaxed focus:outline-none resize-none"
          />
        </div>

        {/* Right Column: Live Output Preview & Console */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-[#DDE6F5] shadow-md overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-[#F5F7FF] border-b border-[#DDE6F5] flex items-center gap-2 text-xs font-bold text-[#142033]">
              <Monitor className="w-4 h-4 text-[#5B4BFF]" />
              <span>Live Browser Stage Output</span>
            </div>
            <iframe
              title="Code Preview"
              srcDoc={previewSrcDoc}
              className="w-full h-64 border-0 bg-white"
              sandbox="allow-scripts"
            />
          </div>

          {/* Console Output Panel */}
          <div className="bg-[#142033] rounded-2xl p-4 border border-white/10 text-white font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-[#08B7D8] font-bold border-b border-white/10 pb-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>Output Console Logs</span>
            </div>
            <div className="h-20 overflow-y-auto space-y-1 text-slate-300 text-[11px]">
              {consoleLogs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
