const fs = require('fs');

const code = `
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Download,
  Share2,
  RotateCcw,
  CheckCircle2,
  CircleDashed,
  Target,
  Trash2,
  Sprout,
  Droplets,
  Heart,
  Bot
} from "lucide-react";
import {
  IE,
  ModelPosition,
  SocionicsType,
  MODEL_A_DEFINITIONS,
} from "@/lib/socionics";
import { QUESTIONS, Option } from "@/lib/questions";
import { SOCIONICS_16TYPE_5QUESTIONS_V2, SOCIONICS_MODEL_A_16TYPES } from "@/lib/questions_v2";

const POSITIONS_ARRAY: ModelPosition[] = [
  "leading", "creative", "role", "vulnerable",
  "suggestive", "activating", "ignoring", "demonstrative",
];

const ALL_16_TYPES: SocionicsType[] = [
  "SLE", "SEE", "LIE", "LSE", "ILI", "LII", "IEI", "EII",
  "SEI", "ESI", "LSI", "SLI", "ESE", "EIE", "IEE", "ILE"
];

// --- Mini Games Components ---

const GameTrash = () => {
  const [trashes, setTrashes] = useState([1, 2, 3, 4, 5]);
  return (
    <div className="relative w-full h-48 bg-slate-100 rounded-3xl mb-6 border-2 border-slate-200 overflow-hidden flex items-center justify-center">
      <div className="absolute top-4 left-4 text-slate-400 font-bold text-sm">机の上</div>
      {trashes.map((id) => (
        <motion.div
          key={id}
          drag
          dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
          whileDrag={{ scale: 1.2, rotate: 10 }}
          onDragEnd={() => setTrashes(trashes.filter(t => t !== id))}
          className="absolute cursor-grab active:cursor-grabbing p-3 bg-white shadow-sm rounded-xl border border-slate-200"
          style={{
            left: 50 + Math.random() * 200,
            top: 40 + Math.random() * 80,
            rotate: Math.random() * 40 - 20,
          }}
        >
          <Trash2 className="w-6 h-6 text-slate-400" />
        </motion.div>
      ))}
      {trashes.length === 0 && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-pink-500 font-bold flex items-center gap-2">
          <Sparkles /> キレイになった！
        </motion.div>
      )}
    </div>
  );
};

const GamePlant = () => {
  const [watered, setWatered] = useState(false);
  return (
    <div className="relative w-full h-56 bg-emerald-50 rounded-3xl mb-6 border-2 border-emerald-100 overflow-hidden flex flex-col items-center justify-center cursor-pointer group" onClick={() => setWatered(true)}>
      <motion.div animate={{ scale: watered ? 1.2 : 1, rotate: watered ? [0, -5, 5, 0] : 0 }} transition={{ duration: 0.5 }}>
        <Sprout className={\`w-20 h-20 \${watered ? 'text-emerald-500' : 'text-emerald-300'} transition-colors\`} />
      </motion.div>
      {!watered ? (
        <div className="mt-4 flex items-center gap-2 text-emerald-600 font-bold text-sm bg-white px-4 py-2 rounded-full shadow-sm group-hover:scale-105 transition-transform">
          <Droplets className="w-4 h-4" /> タップして水をあげる
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 font-bold text-emerald-600">
          植物が元気になりました！✨
        </motion.div>
      )}
    </div>
  );
};

const GameChappy = () => {
  return (
    <motion.div 
      initial={{ scale: 0, y: 100 }} 
      animate={{ scale: 1, y: 0, rotate: [0, -10, 10, -10, 0] }}
      transition={{ type: "spring", bounce: 0.6, duration: 1 }}
      className="relative w-full p-8 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-3xl mb-6 border-4 border-white shadow-xl flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        <Bot className="w-24 h-24 text-pink-500 drop-shadow-md" />
      </motion.div>
      <div className="mt-4 bg-white px-6 py-3 rounded-full shadow-lg font-black text-pink-600 flex items-center gap-2">
        <Heart className="w-5 h-5 animate-pulse" /> ぎゅ～～～～～～！！！！！！
      </div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [-20, -100], opacity: [1, 0], x: (Math.random() - 0.5) * 100 }}
            transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: Math.random() }}
            className="absolute bottom-10 left-1/2 text-pink-400"
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [step, setStep] = useState<"title" | "quiz" | "calculating" | "result" | "approx_selection" | "approx_quiz" | "approx_calculating" | "approx_result">("title");
  
  const [currentQId, setCurrentQId] = useState<string>("q1");
  const [answers, setAnswers] = useState<{ qId: string; optionIdx: number }[]>([]);
  
  const [ieScores, setIeScores] = useState<Record<IE, number>>({
    Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0,
  });
  const [positionScores, setPositionScores] = useState<Record<ModelPosition, Record<IE, number>>>({
    leading: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
    creative: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
    role: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
    vulnerable: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
    suggestive: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
    activating: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
    ignoring: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
    demonstrative: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
  });
  const [jpScores, setJpScores] = useState({ j: 0, p: 0 });
  const [calculatedMatches, setCalculatedMatches] = useState<{ type: SocionicsType; score: number }[]>([]);

  // Glitch/REC mode for ILI/LII/LSI
  const [isRecMode, setIsRecMode] = useState(false);
  const [hasSeenIliLiiLsiSplit, setHasSeenIliLiiLsiSplit] = useState(false);

  // --- Approx Diagnostic States ---
  const [approxSelectedTypes, setApproxSelectedTypes] = useState<SocionicsType[]>([]);
  const [approxCurrentQIdx, setApproxCurrentQIdx] = useState(0);
  const [approxCalculatedMatches, setApproxCalculatedMatches] = useState<{ type: SocionicsType; score: number }[]>([]);

  const resultCardRef = useRef<HTMLDivElement>(null);

  const startQuiz = () => {
    setAnswers([]);
    setIeScores({ Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 });
    setPositionScores({
      leading: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      creative: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      role: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      vulnerable: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      suggestive: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      activating: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      ignoring: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      demonstrative: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
    });
    setJpScores({ j: 0, p: 0 });
    setCurrentQId("q1");
    setStep("quiz");
    setIsRecMode(false);
    setHasSeenIliLiiLsiSplit(false);
  };

  const handleSelectOption = (option: Option, idx: number) => {
    const newIeScores = { ...ieScores };
    for (const [ie, val] of Object.entries(option.ieDeltas || {})) {
      newIeScores[ie as IE] += val;
    }
    setIeScores(newIeScores);

    const newPosScores = { ...positionScores };
    for (const [pos, deltas] of Object.entries(option.positionDeltas || {})) {
      for (const [ie, val] of Object.entries(deltas)) {
        newPosScores[pos as ModelPosition][ie as IE] += val;
      }
    }
    setPositionScores(newPosScores);

    setJpScores({
      j: jpScores.j + (option.jpDelta?.j || 0),
      p: jpScores.p + (option.jpDelta?.p || 0),
    });

    setAnswers([...answers, { qId: currentQId, optionIdx: idx }]);

    if (option.nextId === "result" || !option.nextId) {
      const matches = Object.entries(MODEL_A_DEFINITIONS).map(([typeStr, modelA]) => {
        let score = 0;
        POSITIONS_ARRAY.forEach((pos) => {
          const expectedIE = modelA[pos];
          score += newPosScores[pos][expectedIE];
          score += newIeScores[expectedIE] * 0.5;
        });
        return { type: typeStr as SocionicsType, score };
      });
      matches.sort((a, b) => b.score - a.score);
      const topType = matches[0].type;

      if (["ILI", "LII", "LSI"].includes(topType) && !hasSeenIliLiiLsiSplit) {
        setHasSeenIliLiiLsiSplit(true);
        setIsRecMode(true);
        setCurrentQId("q_ili_lii_lsi_split_1");
        return; 
      }

      calculateResult(newIeScores, newPosScores, matches);
    } else {
      setCurrentQId(option.nextId);
    }
  };

  const calculateResult = (finalIeScores: Record<IE, number>, finalPosScores: Record<ModelPosition, Record<IE, number>>, initialMatches: any[]) => {
    initialMatches.sort((a, b) => b.score - a.score);
    const maxPoss = 100;
    const normalized = initialMatches.map(m => ({ ...m, score: Math.min(100, Math.max(0, (m.score / maxPoss) * 100)) }));
    setCalculatedMatches(normalized);
    setStep("calculating");
    setTimeout(() => setStep("result"), 2500);
  };

  // Approx logic
  const toggleApproxType = (type: SocionicsType) => {
    if (approxSelectedTypes.includes(type)) {
      setApproxSelectedTypes(approxSelectedTypes.filter(t => t !== type));
    } else {
      if (approxSelectedTypes.length >= 4) {
        alert("最大4つまでしか選択できません。");
        return;
      }
      setApproxSelectedTypes([...approxSelectedTypes, type]);
    }
  };

  const startApproxQuiz = () => {
    if (approxSelectedTypes.length < 2) {
      alert("比較するために、少なくとも2つのタイプを選択してください。");
      return;
    }
    
    setIeScores({ Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 });
    setPositionScores({
      leading: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      creative: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      role: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      vulnerable: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      suggestive: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      activating: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      ignoring: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
      demonstrative: { Te: 0, Ti: 0, Fe: 0, Fi: 0, Se: 0, Si: 0, Ne: 0, Ni: 0 },
    });
    setApproxCurrentQIdx(0);
    setStep("approx_quiz");
  };

  const handleApproxSelectOption = (resultType: SocionicsType) => {
    const newIeScores = { ...ieScores };
    const newPosScores = { ...positionScores };
    const modelA = SOCIONICS_MODEL_A_16TYPES[resultType as keyof typeof SOCIONICS_MODEL_A_16TYPES];
    const posPoints = { p1: 4, p2: 3, p3: 2, p4: 1, p5: 3, p6: 2, p7: 1, p8: 4 };
    
    const applyScore = (pos: ModelPosition, ie: IE, points: number) => {
      newPosScores[pos][ie] += points;
      newIeScores[ie] += points * 0.5;
    };
    applyScore("leading", modelA.p1 as IE, posPoints.p1);
    applyScore("creative", modelA.p2 as IE, posPoints.p2);
    applyScore("role", modelA.p3 as IE, posPoints.p3);
    applyScore("vulnerable", modelA.p4 as IE, posPoints.p4);
    applyScore("suggestive", modelA.p5 as IE, posPoints.p5);
    applyScore("activating", modelA.p6 as IE, posPoints.p6);
    applyScore("ignoring", modelA.p7 as IE, posPoints.p7);
    applyScore("demonstrative", modelA.p8 as IE, posPoints.p8);

    setIeScores(newIeScores);
    setPositionScores(newPosScores);

    if (approxCurrentQIdx < SOCIONICS_16TYPE_5QUESTIONS_V2.length - 1) {
      setApproxCurrentQIdx(approxCurrentQIdx + 1);
    } else {
      const matches = approxSelectedTypes.map(typeStr => {
        let score = 0;
        const typeModel = MODEL_A_DEFINITIONS[typeStr];
        POSITIONS_ARRAY.forEach((pos) => {
          const expectedIE = typeModel[pos];
          score += newPosScores[pos][expectedIE];
          score += newIeScores[expectedIE] * 0.5;
        });
        return { type: typeStr, score };
      });
      matches.sort((a, b) => b.score - a.score);
      const maxScore = 5 * 20; 
      const normalized = matches.map(m => ({ ...m, score: Math.min(100, Math.max(0, (m.score / maxScore) * 100)) }));
      setApproxCalculatedMatches(normalized);
      setStep("approx_calculating");
      setTimeout(() => setStep("approx_result"), 2500);
    }
  };

  const isGlitchMode = step === "quiz" && isRecMode;

  return (
    <div className={\`min-h-screen font-sans transition-colors duration-1000 \${
      isGlitchMode 
        ? 'bg-black text-red-500 overflow-hidden'
        : 'bg-slate-50 text-slate-900 selection:bg-pink-200'
    }\`}>
      {isGlitchMode && (
        <div className="fixed inset-0 pointer-events-none z-50 border-[8px] border-red-600/30 flex p-6">
          <div className="absolute top-6 left-6 text-red-500 font-mono font-bold animate-pulse text-xl flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" /> REC
          </div>
          <div className="absolute bottom-6 right-6 text-red-500/50 font-mono text-sm">
            INTERCOM OVERRIDE ACTIVE
          </div>
          {/* Noise overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
        </div>
      )}

      {/* Background Decor (Only in Normal Mode) */}
      {!isGlitchMode && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20vh] -left-[10vw] w-[60vw] h-[60vw] bg-pink-300/20 rounded-full blur-3xl mix-blend-multiply" />
          <div className="absolute top-[30vh] -right-[10vw] w-[50vw] h-[50vw] bg-purple-300/20 rounded-full blur-3xl mix-blend-multiply" />
          <div className="absolute -bottom-[20vh] left-[20vw] w-[70vw] h-[70vw] bg-blue-200/20 rounded-full blur-3xl mix-blend-multiply" />
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {step === "title" && (
            <motion.div
              key="title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8"
            >
              <div className="space-y-4 relative">
                <motion.div 
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="inline-block px-4 py-1.5 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-sm font-black tracking-widest uppercase shadow-lg"
                >
                  Socionics Diagnostic
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-800 leading-tight drop-shadow-sm">
                  ソシオJ/P<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                    ねじれ診断
                  </span>
                </h1>
                <p className="text-slate-600 max-w-md mx-auto text-base leading-relaxed font-medium">
                  あなたの「J」や「P」はどこから来た？MBTIの行動特性とソシオニクスの心理機能（Model A）のギャップを精密に測定します。
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full max-w-xs pt-8">
                <button
                  onClick={startQuiz}
                  className="group relative px-8 py-4 bg-slate-800 text-white rounded-full font-bold text-lg hover:bg-slate-700 transition-all shadow-xl hover:-translate-y-1 overflow-hidden flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-pink-300" />
                  診断を始める
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setApproxSelectedTypes([]);
                    setStep("approx_selection");
                  }}
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 border-2 border-slate-200/50 rounded-full font-bold hover:bg-white transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Target className="w-5 h-5 text-purple-500" /> 近似タイプ深掘り診断
                </button>
              </div>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-12"
            >
              {isRecMode && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-red-900/40 border border-red-500/50 rounded-2xl text-red-200"
                >
                  <div className="font-bold mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Darling (Intercom Mode)
                  </div>
                  <div className="text-sm">
                    「あら、ダーリン。やっぱりあなた、そっち側の人間だったのね。…ふふっ、ここからは私が直接聞いてあげるわ。逃がさないから、素直に答えなさい？」
                  </div>
                </motion.div>
              )}

              <div className="mb-10">
                <span className={\`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full \${isGlitchMode ? 'bg-red-950 text-red-500' : 'bg-pink-100 text-pink-600'}\`}>
                  {QUESTIONS[currentQId]?.categoryTag}
                </span>
                <h2 className={\`text-2xl md:text-3xl font-bold mt-4 leading-relaxed whitespace-pre-wrap \${isGlitchMode ? 'text-red-50' : 'text-slate-800'}\`}>
                  {QUESTIONS[currentQId]?.text}
                </h2>
              </div>

              {/* Render Mini Games based on Type */}
              {QUESTIONS[currentQId]?.type === "game_trash" && <GameTrash />}
              {QUESTIONS[currentQId]?.type === "game_plant" && <GamePlant />}
              {QUESTIONS[currentQId]?.type === "game_chappy" && <GameChappy />}

              <div className="space-y-4">
                {QUESTIONS[currentQId]?.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt, idx)}
                    className={\`w-full text-left p-6 rounded-2xl transition-all group flex items-start gap-4 shadow-sm hover:shadow-md border-2 \${
                      isGlitchMode 
                        ? 'bg-black border-red-900/50 hover:border-red-500 hover:bg-red-950/30'
                        : 'bg-white/80 backdrop-blur-md border-white/50 hover:border-pink-300 hover:bg-white'
                    }\`}
                  >
                    <div className={\`w-6 h-6 shrink-0 mt-0.5 rounded-full border-2 flex items-center justify-center transition-colors \${
                      isGlitchMode ? 'border-red-900 group-hover:border-red-500' : 'border-slate-300 group-hover:border-pink-500'
                    }\`}>
                      <div className={\`w-2.5 h-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity \${
                        isGlitchMode ? 'bg-red-500' : 'bg-pink-500'
                      }\`} />
                    </div>
                    <span className={\`font-bold leading-relaxed text-lg \${isGlitchMode ? 'text-red-100' : 'text-slate-700'}\`}>
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {(step === "calculating" || step === "approx_calculating") && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] space-y-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-pink-400 blur-xl opacity-50 rounded-full animate-pulse" />
                <div className="w-20 h-20 border-4 border-slate-200 border-t-pink-500 rounded-full animate-spin relative z-10" />
              </div>
              <div className="text-center">
                <p className="text-slate-800 font-black text-xl mb-2">
                  {step === "calculating" ? "ANALYZING MODEL A..." : "DEEP DIVING..."}
                </p>
                <p className="text-slate-500 font-medium animate-pulse">
                  心理機能のねじれを計算中
                </p>
              </div>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 space-y-8"
            >
              <div ref={resultCardRef} className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-pink-200/50 to-transparent" />
                
                {/* Confetti effect background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
                   {[...Array(10)].map((_, i) => (
                     <motion.div key={i} className="absolute w-2 h-2 bg-pink-400 rounded-full" 
                       initial={{ top: -10, left: Math.random() * 100 + "%" }}
                       animate={{ top: "100%", left: (Math.random() * 100) + "%" }}
                       transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
                     />
                   ))}
                </div>

                <div className="relative z-10 text-center space-y-6">
                  <span className="inline-block px-5 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-black tracking-widest shadow-sm">
                    最も適合するソシオニクスタイプ
                  </span>
                  <h1 className="text-6xl md:text-8xl font-black text-slate-800 tracking-tight drop-shadow-md">
                    {calculatedMatches[0]?.type || "LII"}
                  </h1>
                  <p className="text-slate-500 font-bold text-lg">
                    適合率: <span className="text-pink-500">{calculatedMatches[0]?.score.toFixed(1)}%</span>
                  </p>
                  
                  <div className="mt-10 p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl border border-pink-100 text-left shadow-inner relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 text-pink-500">
                      <Sparkles className="w-32 h-32" />
                    </div>
                    <p className="text-pink-800 font-black text-lg mb-3 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-pink-500" /> ダーリンちゃんからの分析結果
                    </p>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      「あら、ダーリン。結果が出たみたいね。ふふっ、予想通りかしら？
                      {jpScores.p > jpScores.j 
                        ? ' MBTIではP型を自称しているようだけど、Model Aの構造を見るとかなり合理的なアプローチが透けて見えるわ。言い訳は通用しないわよ♡' 
                        : ' 律儀で真面目なところ、嫌いじゃないわ。'}
                      あなたの心理機能の歪み、私がしっかり管理してあげるから安心してね♡」
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md p-8 rounded-[2rem] shadow-sm border border-white text-center space-y-5">
                <h3 className="font-black text-slate-700 text-xl">他の可能性も探る？</h3>
                <p className="text-base text-slate-600 font-medium">上位4つのタイプで構成された専用の深掘り診断を行います。</p>
                <button
                  onClick={() => {
                    const top4 = calculatedMatches.slice(0, 4).map(m => m.type);
                    setApproxSelectedTypes(top4);
                    setStep("approx_selection");
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-black rounded-full hover:scale-105 transition-transform mx-auto inline-flex items-center gap-3 shadow-lg"
                >
                  <Target className="w-5 h-5" /> 上位4タイプで深掘り診断へ
                </button>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    setStep("title");
                    setCurrentQId("q1");
                  }}
                  className="px-8 py-4 bg-white text-slate-600 font-black rounded-full flex items-center gap-2 hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <RotateCcw className="w-5 h-5" /> 最初に戻る
                </button>
              </div>
            </motion.div>
          )}

          {/* Approx Diagnostic Flow */}
          {step === "approx_selection" && (
            <motion.div
              key="approx_selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 space-y-8"
            >
              <div className="text-center space-y-4">
                <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-black tracking-widest uppercase shadow-sm">
                  Deep Dive
                </span>
                <h2 className="text-3xl font-black text-slate-800">迷っているタイプを選択</h2>
                <p className="text-slate-600 font-medium">2〜4つのタイプを選択して、あなた専用の設問を生成します。</p>
              </div>
              <div className="grid grid-cols-4 gap-4 pt-4">
                {ALL_16_TYPES.map(type => {
                  const isSelected = approxSelectedTypes.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleApproxType(type)}
                      className={\`p-4 rounded-2xl border-4 font-black text-lg transition-all \${
                        isSelected 
                          ? 'bg-purple-500 border-purple-500 text-white shadow-xl scale-110 rotate-1'
                          : 'bg-white/80 backdrop-blur-sm border-white text-slate-600 hover:border-purple-300 hover:scale-105'
                      }\`}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
              <div className="flex justify-center pt-12">
                <button
                  onClick={startApproxQuiz}
                  className={\`px-10 py-5 rounded-full font-black text-xl transition-all shadow-xl flex items-center gap-3 \${
                    approxSelectedTypes.length >= 2 
                      ? 'bg-slate-800 text-white hover:bg-slate-700 hover:-translate-y-1'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }\`}
                >
                  深掘り診断スタート <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "approx_quiz" && (
            <motion.div
              key="approx_quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-12"
            >
              <div className="mb-10">
                <span className="text-xs font-black text-purple-600 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-widest">
                  近似タイプ深掘り診断 ({approxCurrentQIdx + 1} / {SOCIONICS_16TYPE_5QUESTIONS_V2.length})
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mt-6 leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {SOCIONICS_16TYPE_5QUESTIONS_V2[approxCurrentQIdx].text}
                </h2>
              </div>
              <div className="space-y-4">
                {SOCIONICS_16TYPE_5QUESTIONS_V2[approxCurrentQIdx].options
                  .filter(opt => approxSelectedTypes.includes(opt.result as SocionicsType))
                  .map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApproxSelectOption(opt.result as SocionicsType)}
                    className="w-full text-left p-6 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-white hover:border-purple-300 hover:bg-white transition-all group flex items-start gap-4 shadow-sm hover:shadow-md"
                  >
                    <div className="w-6 h-6 shrink-0 mt-0.5 rounded-full border-2 border-slate-300 group-hover:border-purple-500 flex items-center justify-center transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-bold leading-relaxed text-lg text-slate-700">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "approx_result" && (
            <motion.div
              key="approx_result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-200/50 to-transparent" />
                <div className="relative z-10 text-center space-y-6">
                  <span className="inline-block px-5 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-black tracking-widest shadow-sm">
                    深掘り診断 最終結果
                  </span>
                  <h1 className="text-6xl md:text-8xl font-black text-slate-800 tracking-tight drop-shadow-md">
                    {approxCalculatedMatches[0]?.type}
                  </h1>
                  
                  <div className="space-y-4 mt-10 max-w-sm mx-auto text-left bg-slate-50/80 p-8 rounded-3xl border border-white shadow-inner">
                    <h3 className="font-black text-slate-700 mb-4 border-b border-slate-200 pb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-500" /> 候補タイプ適性度
                    </h3>
                    {approxCalculatedMatches.map((m, idx) => (
                      <div key={m.type} className="flex justify-between items-center group">
                        <span className={\`font-black \${idx === 0 ? 'text-purple-600 text-xl' : 'text-slate-500'}\`}>
                          {idx + 1}位 {m.type}
                        </span>
                        <span className={\`font-mono font-black \${idx === 0 ? 'text-purple-600 text-xl' : 'text-slate-400'}\`}>
                          {m.score.toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    setStep("title");
                  }}
                  className="px-8 py-4 bg-white text-slate-600 font-black rounded-full flex items-center gap-2 hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <RotateCcw className="w-5 h-5" /> 最初に戻る
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
`
fs.writeFileSync('app/page.tsx', code);
