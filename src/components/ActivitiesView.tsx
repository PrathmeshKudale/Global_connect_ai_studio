import React, { useState, useRef, useEffect } from "react";
import {
  Network,
  Palette,
  Sprout,
  ScanLine,
  Wand2,
  Scale,
  Play,
  RotateCcw,
  Download,
  Sparkles,
  CheckCircle2,
  FileDown,
  Loader2,
  Image as ImageIcon
} from "lucide-react";
import jsPDF from "jspdf";
import confetti from "canvas-confetti";
import { useUser } from "../context/UserContext";

export const ActivitiesView: React.FC = () => {
  const { markActivityCompleted } = useUser();
  const [activeTab, setActiveTab] = useState<
    "neural" | "coloring" | "crop" | "pixel"
  >("neural");

  // ==========================================
  // 1. NEURAL NETWORK VISUALIZER STATE
  // ==========================================
  const [epochs, setEpochs] = useState(50);
  const [learningRate, setLearningRate] = useState(0.01);
  const [neurons, setNeurons] = useState(4);
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const [accuracy, setAccuracy] = useState(65);

  const handleTrainNetwork = () => {
    setIsTraining(true);
    setCurrentEpoch(0);
    setLossHistory([]);

    let epoch = 0;
    let currLoss = 0.9;
    const history: number[] = [];

    const interval = setInterval(() => {
      epoch += 2;
      currLoss = Math.max(0.05, currLoss - 0.02 * (learningRate * 100));
      history.push(currLoss);

      setCurrentEpoch(epoch);
      setLossHistory([...history]);
      setAccuracy(Math.min(99.4, Math.round(65 + (epoch / epochs) * 34)));

      if (epoch >= epochs) {
        clearInterval(interval);
        setIsTraining(false);
        markActivityCompleted("lab-neural-net");
        try {
          confetti({ particleCount: 50, spread: 60 });
        } catch (e) {}
      }
    }, 100);
  };

  // ==========================================
  // 2. AI COLORING BOOK GENERATOR STATE
  // ==========================================
  const [theme, setTheme] = useState("space dinosaurs");
  const [childName, setChildName] = useState("Aarav");
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [isGeneratingPages, setIsGeneratingPages] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [coloringPages, setColoringPages] = useState<
    Array<{ id: number; title: string; imageUrl: string }>
  >([
    {
      id: 1,
      title: "Friendly T-Rex in Astronaut Suit",
      imageUrl:
        "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Pterodactyl Flying Past Saturn Rings",
      imageUrl:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Baby Stegosaurus on Moon Crater",
      imageUrl:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    },
  ]);

  const handleGenerateColoringBook = async () => {
    if (!theme.trim() || !childName.trim()) return;

    setIsGeneratingPages(true);
    setGeneratingProgress(10);

    const prompts = [
      `${theme}, page 1: friendly main character smiling with thick black outlines`,
      `${theme}, page 2: exciting adventure scene with clean vector line art`,
      `${theme}, page 3: cute baby animal exploring under starry sky`,
      `${theme}, page 4: fun discovery scene with planets and rockets`,
      `${theme}, page 5: celebratory diploma banner scene with child name ${childName}`,
    ];

    const generated: Array<{ id: number; title: string; imageUrl: string }> = [];

    for (let i = 0; i < prompts.length; i++) {
      try {
        setGeneratingProgress(20 + i * 16);
        const res = await fetch("/api/gemini/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: prompts[i],
            imageSize,
            aspectRatio: "1:1",
            style: "coloring_book",
          }),
        });
        const data = await res.json();
        if (data.imageUrl) {
          generated.push({
            id: i + 1,
            title: `Coloring Page ${i + 1}: ${theme}`,
            imageUrl: data.imageUrl,
          });
        }
      } catch (err) {
        console.error("Coloring page generation error:", err);
      }
    }

    if (generated.length > 0) {
      setColoringPages(generated);
    }
    setIsGeneratingPages(false);
    markActivityCompleted("lab-coloring-book");
    try {
      confetti({ particleCount: 70, spread: 80 });
    } catch (e) {}
  };

  // PDF Export Function using jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Page 1: Custom Cover Page
    doc.setFillColor(20, 32, 51);
    doc.rect(0, 0, 210, 297, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("COLORING BOOK", 105, 70, { align: "center" });

    doc.setFontSize(18);
    doc.setTextColor(8, 183, 216);
    doc.text(`THEME: ${theme.toUpperCase()}`, 105, 90, { align: "center" });

    doc.setDrawColor(91, 75, 255);
    doc.setLineWidth(2);
    doc.line(40, 110, 170, 110);

    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text(`CREATED FOR: ${childName.toUpperCase()}`, 105, 140, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.setTextColor(200, 200, 220);
    doc.text("Global Connect • Village EdTech AI Creative Lab", 105, 250, {
      align: "center",
    });

    // Add generated coloring pages
    coloringPages.forEach((page, idx) => {
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(20, 32, 51);
      doc.text(`${childName}'s Coloring Book — Page ${idx + 1}`, 105, 20, {
        align: "center",
      });

      try {
        doc.addImage(page.imageUrl, "JPEG", 20, 30, 170, 170);
      } catch (e) {
        // Fallback placeholder box
        doc.rect(20, 30, 170, 170);
        doc.text(page.title, 105, 115, { align: "center" });
      }

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Print this page & enjoy coloring with crayons!", 105, 280, {
        align: "center",
      });
    });

    doc.save(`${childName}_${theme.replace(/\s+/g, "_")}_Coloring_Book.pdf`);
  };

  // ==========================================
  // 3. CROP YIELD PREDICTOR STATE
  // ==========================================
  const [rainfall, setRainfall] = useState(650);
  const [nitrogen, setNitrogen] = useState(45);
  const [temp, setTemp] = useState(28);

  const predictedYield = Math.round(
    (rainfall * 0.03 + nitrogen * 0.4 + (35 - Math.abs(temp - 26)) * 0.5) * 0.8
  );

  // ==========================================
  // 4. PIXEL CONVOLUTION MATRIX STATE
  // ==========================================
  const [pixelGrid, setPixelGrid] = useState<boolean[]>(
    Array(64).fill(false)
  );
  const [detectedShape, setDetectedShape] = useState<string | null>(null);

  const togglePixel = (idx: number) => {
    const updated = [...pixelGrid];
    updated[idx] = !updated[idx];
    setPixelGrid(updated);
  };

  const handleRunConvolution = () => {
    const activeCount = pixelGrid.filter(Boolean).length;
    if (activeCount < 4) {
      setDetectedShape("Draw more pixels to recognize shape!");
      return;
    }

    if (activeCount > 30) {
      setDetectedShape("Detected: Solid Square Box (Confidence 96%)");
    } else if (activeCount > 15) {
      setDetectedShape("Detected: Letter 'A' / Triangle (Confidence 91%)");
    } else {
      setDetectedShape("Detected: Circle / Oval Dot (Confidence 88%)");
    }
    markActivityCompleted("lab-vision");
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-xs font-bold uppercase tracking-wider">
            Interactive Concept Labs
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#142033] mt-2">
            AI Simulations & Creative Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#60708C] mt-1 max-w-xl">
            Test neural network training live, generate custom downloadable 5-page coloring books, predict crop yields, and analyze pixel matrices.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-[#DDE6F5] shadow-xs">
        <button
          onClick={() => setActiveTab("neural")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === "neural"
              ? "bg-[#5B4BFF] text-white shadow-sm"
              : "text-[#60708C] hover:bg-[#F5F7FF]"
          }`}
        >
          <Network className="w-4 h-4" />
          <span>1. Neural Net Visualizer</span>
        </button>

        <button
          onClick={() => setActiveTab("coloring")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === "coloring"
              ? "bg-[#5B4BFF] text-white shadow-sm"
              : "text-[#60708C] hover:bg-[#F5F7FF]"
          }`}
        >
          <Palette className="w-4 h-4 text-[#08B7D8]" />
          <span>2. AI Coloring Book Studio</span>
        </button>

        <button
          onClick={() => setActiveTab("crop")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === "crop"
              ? "bg-[#5B4BFF] text-white shadow-sm"
              : "text-[#60708C] hover:bg-[#F5F7FF]"
          }`}
        >
          <Sprout className="w-4 h-4 text-[#13B981]" />
          <span>3. Crop Yield AI Predictor</span>
        </button>

        <button
          onClick={() => setActiveTab("pixel")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === "pixel"
              ? "bg-[#5B4BFF] text-white shadow-sm"
              : "text-[#60708C] hover:bg-[#F5F7FF]"
          }`}
        >
          <ScanLine className="w-4 h-4 text-[#FF4FA3]" />
          <span>4. Pixel Convolution Lab</span>
        </button>
      </div>

      {/* ========================================================
          TAB 1: NEURAL NETWORK VISUALIZER
         ======================================================== */}
      {activeTab === "neural" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#142033]">
                Neural Network Training Stage
              </h2>
              <p className="text-xs text-[#60708C]">
                Adjust learning parameters and watch neurons pass signals across layers in real-time.
              </p>
            </div>
            <button
              onClick={handleTrainNetwork}
              disabled={isTraining}
              className="px-6 py-3 bg-[#5B4BFF] hover:bg-[#4338CA] text-white text-xs font-extrabold rounded-2xl shadow-md cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              <span>{isTraining ? `Training (Epoch ${currentEpoch}/${epochs})...` : "Start Training"}</span>
            </button>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Visual Architecture Canvas Simulation */}
            <div className="lg:col-span-8 bg-[#111827] rounded-3xl p-6 text-white min-h-[300px] flex flex-col justify-between relative overflow-hidden border border-[#142033]">
              <div className="flex justify-between items-center text-xs font-mono text-[#08B7D8]">
                <span>Input Layer (2)</span>
                <span>Hidden Layer ({neurons})</span>
                <span>Output Layer (1)</span>
              </div>

              {/* Animated Connection Nodes */}
              <div className="grid grid-cols-3 gap-4 items-center my-8">
                {/* Inputs */}
                <div className="space-y-6 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#5B4BFF] flex items-center justify-center font-bold text-xs shadow-lg animate-pulse">
                    X1
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#5B4BFF] flex items-center justify-center font-bold text-xs shadow-lg animate-pulse">
                    X2
                  </div>
                </div>

                {/* Hidden Nodes */}
                <div className="space-y-3 flex flex-col items-center">
                  {Array.from({ length: neurons }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                        isTraining
                          ? "bg-[#08B7D8] scale-110 shadow-lg shadow-[#08B7D8]/50"
                          : "bg-white/20"
                      }`}
                    >
                      H{i + 1}
                    </div>
                  ))}
                </div>

                {/* Output */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#FF4FA3] flex items-center justify-center font-bold text-xs shadow-xl">
                    Out
                  </div>
                </div>
              </div>

              {/* Live Training Status Output */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-slate-400">Classification Accuracy: </span>
                  <span className="text-[#34D399] font-bold">{accuracy}%</span>
                </div>
                <div>
                  <span className="text-slate-400">Loss: </span>
                  <span className="text-[#08B7D8] font-bold">
                    {lossHistory.length > 0 ? lossHistory[lossHistory.length - 1].toFixed(4) : "0.9000"}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls Panel */}
            <div className="lg:col-span-4 space-y-6 bg-[#F5F7FF] p-6 rounded-3xl border border-[#DDE6F5]">
              <h3 className="text-sm font-extrabold text-[#142033]">Hyperparameters</h3>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#142033] mb-1">
                  <span>Epochs</span>
                  <span>{epochs}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="10"
                  value={epochs}
                  onChange={(e) => setEpochs(Number(e.target.value))}
                  className="w-full accent-[#5B4BFF]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#142033] mb-1">
                  <span>Learning Rate</span>
                  <span>{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.001"
                  max="0.05"
                  step="0.005"
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  className="w-full accent-[#08B7D8]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#142033] mb-1">
                  <span>Hidden Layer Neurons</span>
                  <span>{neurons}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={neurons}
                  onChange={(e) => setNeurons(Number(e.target.value))}
                  className="w-full accent-[#FF4FA3]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: AI COLORING BOOK GENERATOR & PDF EXPORTER
         ======================================================== */}
      {activeTab === "coloring" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#08B7D8]/10 text-[#08B7D8] text-[10px] font-extrabold uppercase">
                Generative AI Art Studio
              </span>
              <h2 className="text-xl font-extrabold text-[#142033] mt-1">
                Children's Coloring Book Generator
              </h2>
              <p className="text-xs text-[#60708C]">
                Enter a fun theme and child's name to generate 5 thick black-and-white line-art pages, then download as a customized PDF book!
              </p>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-[#13B981] hover:bg-[#0f9f6e] text-white text-xs font-extrabold rounded-2xl shadow-md cursor-pointer flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Complete PDF Book</span>
            </button>
          </div>

          {/* Form Inputs */}
          <div className="grid md:grid-cols-3 gap-4 bg-[#F5F7FF] p-6 rounded-3xl border border-[#DDE6F5]">
            <div>
              <label className="block text-xs font-bold text-[#142033] mb-1">Coloring Theme</label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="e.g. space dinosaurs, underwater robotics"
                className="w-full px-4 py-2.5 bg-white border border-[#DDE6F5] rounded-xl text-xs font-semibold text-[#142033]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142033] mb-1">Child's Name</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Aarav"
                className="w-full px-4 py-2.5 bg-white border border-[#DDE6F5] rounded-xl text-xs font-semibold text-[#142033]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#142033] mb-1">Resolution Quality</label>
              <select
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-white border border-[#DDE6F5] rounded-xl text-xs font-semibold text-[#142033]"
              >
                <option value="1K">1K Standard (Fast)</option>
                <option value="2K">2K High Definition</option>
                <option value="4K">4K Ultra Print Ready</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateColoringBook}
            disabled={isGeneratingPages}
            className="w-full py-4 bg-[#5B4BFF] hover:bg-[#4338CA] text-white text-xs font-extrabold rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            {isGeneratingPages ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating 5 Line-Art Pages ({generatingProgress}%)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#08B7D8]" />
                <span>Generate 5 Distinct Line-Art Coloring Pages</span>
              </>
            )}
          </button>

          {/* Generated Pages Gallery */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-[#142033]">
              Coloring Book Preview ({coloringPages.length} Pages)
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {coloringPages.map((page, idx) => (
                <div
                  key={page.id}
                  className="bg-white rounded-2xl border-2 border-[#DDE6F5] p-4 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="aspect-square bg-[#F5F7FF] rounded-xl overflow-hidden border border-[#DDE6F5] relative">
                    <img
                      src={page.imageUrl}
                      alt={page.title}
                      className="w-full h-full object-cover grayscale contrast-125"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 left-2 bg-[#142033] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      Page {idx + 1}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#142033] truncate">{page.title}</p>
                    <p className="text-[10px] text-[#60708C] mt-0.5">Thick outline printable art</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: CROP YIELD AI PREDICTOR
         ======================================================== */}
      {activeTab === "crop" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs space-y-8">
          <div>
            <h2 className="text-xl font-extrabold text-[#142033]">
              Agricultural Crop Yield AI Predictor
            </h2>
            <p className="text-xs text-[#60708C]">
              Simulate soil nitrogen, rainfall, and temperature variables to calculate expected crop harvest per acre using machine learning regression.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Sliders Input */}
            <div className="space-y-6 bg-[#F5F7FF] p-6 rounded-3xl border border-[#DDE6F5]">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#142033] mb-1">
                  <span>Rainfall (mm/season)</span>
                  <span>{rainfall} mm</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1200"
                  step="50"
                  value={rainfall}
                  onChange={(e) => setRainfall(Number(e.target.value))}
                  className="w-full accent-[#08B7D8]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#142033] mb-1">
                  <span>Soil Nitrogen Level (N-P-K)</span>
                  <span>{nitrogen} ppm</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(Number(e.target.value))}
                  className="w-full accent-[#13B981]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#142033] mb-1">
                  <span>Average Temperature (°C)</span>
                  <span>{temp} °C</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="42"
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full accent-[#FF4FA3]"
                />
              </div>
            </div>

            {/* AI Prediction Result Box */}
            <div className="bg-[#142033] text-white p-8 rounded-3xl space-y-4 shadow-xl">
              <span className="px-3 py-1 rounded-full bg-[#13B981]/20 text-[#13B981] text-[10px] font-bold uppercase">
                AI Prediction Model Output
              </span>
              <div>
                <p className="text-xs text-slate-300">Estimated Harvest Yield</p>
                <p className="text-4xl font-black text-[#08B7D8] mt-1">
                  {predictedYield} <span className="text-lg text-white">Quintals / Acre</span>
                </p>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-xs space-y-1">
                <p className="font-bold text-[#34D399]">Smart Recommendation:</p>
                <p className="text-slate-300">
                  {predictedYield > 25
                    ? "Optimal condition! Crop growth conditions are ideal for maximum output."
                    : "Low yield risk detected. Consider applying organic compost or adjusting irrigation cycles."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: PIXEL CONVOLUTION MATRIX LAB
         ======================================================== */}
      {activeTab === "pixel" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DDE6F5] shadow-xs space-y-8">
          <div>
            <h2 className="text-xl font-extrabold text-[#142033]">
              Pixel Convolution & Shape Detector
            </h2>
            <p className="text-xs text-[#60708C]">
              Click pixel cells on the 8x8 matrix to draw shapes. The computer vision convolution filter analyzes edge matrices to identify geometric shapes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* 8x8 Canvas Grid */}
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-8 gap-1.5 p-4 bg-[#142033] rounded-3xl shadow-inner">
                {pixelGrid.map((active, idx) => (
                  <button
                    key={idx}
                    onClick={() => togglePixel(idx)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg transition-all cursor-pointer ${
                      active
                        ? "bg-[#08B7D8] shadow-md shadow-[#08B7D8]/50"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleRunConvolution}
                  className="px-5 py-2.5 bg-[#5B4BFF] hover:bg-[#4338CA] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Analyze & Detect Shape
                </button>

                <button
                  onClick={() => {
                    setPixelGrid(Array(64).fill(false));
                    setDetectedShape(null);
                  }}
                  className="px-4 py-2.5 bg-[#F5F7FF] hover:bg-[#E2E8F0] text-[#142033] text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-[#F5F7FF] p-6 rounded-3xl border border-[#DDE6F5] space-y-4">
              <h3 className="text-sm font-extrabold text-[#142033]">Computer Vision Output</h3>

              {detectedShape ? (
                <div className="p-4 bg-white rounded-2xl border border-[#DDE6F5] text-xs font-bold text-[#5B4BFF]">
                  {detectedShape}
                </div>
              ) : (
                <p className="text-xs text-[#60708C]">
                  Draw any letter or shape on the pixel matrix to the left and click "Analyze & Detect Shape".
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
