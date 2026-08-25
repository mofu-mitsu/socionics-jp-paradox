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
  Target
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
  "leading",
  "creative",
  "role",
  "vulnerable",
  "suggestive",
  "activating",
  "ignoring",
  "demonstrative",
];

const ALL_16_TYPES: SocionicsType[] = [
  "SLE", "SEE", "LIE", "LSE",
  "ILI", "LII", "IEI", "EII",
  "SEI", "ESI", "LSI", "SLI",
  "ESE", "EIE", "IEE", "ILE"
];

export default function App() {
  const [step, setStep] = useState<"title" | "quiz" | "calculating" | "result" | "approx_selection" | "approx_quiz" | "approx_calculating" | "approx_result">("title");
  
  // Normal Diagnostic States
  const [currentQId, setCurrentQId] = useState<string>("q1");
  const [answers, setAnswers] = useState<{ qId: string; optionIdx: number }[]>([]);
  
  const [ieScores, setIeScores] = useState<Record<IE, number>>({
    Te: 0, Ti: 0, Fe: 0, Fi: 0,
    Se: 0, Si: 0, Ne: 0, Ni: 0,
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

  const [showBugs, setShowBugs] = useState(false);
  const [darlingMessage, setDarlingMessage] = useState("");
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
    setShowBugs(false);
    setDarlingMessage("");
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
    setTimeout(() => setStep("result"), 1500);
  };

  // --- Approx Diagnostic Functions ---
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
    
    // Reset scores for approx diagnostic
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
    
    // Add points using Model A positions (1-8)
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
      // Calculate final
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
      // Normalize
      const maxScore = 5 * 20; // Approx max possible score from 5 questions
      const normalized = matches.map(m => ({ ...m, score: Math.min(100, Math.max(0, (m.score / maxScore) * 100)) }));
      
      setApproxCalculatedMatches(normalized);
      setStep("approx_calculating");
      setTimeout(() => setStep("approx_result"), 1500);
    }
  };

  const handleShare = () => {
    alert("共有機能");
  };

  const handleDownloadImage = () => {
    alert("画像保存");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-pink-200">
      <main className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {step === "title" && (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-bold tracking-widest uppercase">
                  Socionics Diagnostic
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight">
                  ソシオJ/P<br />ねじれ診断
                </h1>
                <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
                  あなたの「J」や「P」はどこから来た？MBTIの行動特性とソシオニクスの心理機能（Model A）のギャップを精密に測定します。
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <button
                  onClick={startQuiz}
                  className="group relative px-8 py-4 bg-slate-800 text-white rounded-full font-bold text-lg hover:bg-slate-700 transition-all shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    診断を始める <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button
                  onClick={() => {
                    setApproxSelectedTypes([]);
                    setStep("approx_selection");
                  }}
                  className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <Target className="w-5 h-5 text-pink-500" /> 近似タイプ深掘り診断
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
              <div className="mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {QUESTIONS[currentQId]?.categoryTag}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mt-2 leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {QUESTIONS[currentQId]?.text}
                </h2>
              </div>
              <div className="space-y-3">
                {QUESTIONS[currentQId]?.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt, idx)}
                    className="w-full text-left p-5 rounded-2xl bg-white border-2 border-slate-100 hover:border-pink-300 hover:bg-pink-50 transition-all group flex items-start gap-4 shadow-sm hover:shadow-md"
                  >
                    <div className="w-6 h-6 shrink-0 mt-0.5 rounded-full border-2 border-slate-300 group-hover:border-pink-500 flex items-center justify-center transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-slate-700 font-medium leading-relaxed">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "calculating" && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] space-y-6"
            >
              <div className="w-16 h-16 border-4 border-slate-200 border-t-pink-500 rounded-full animate-spin" />
              <p className="text-slate-500 font-bold animate-pulse tracking-widest">
                ANALYZING MODEL A...
              </p>
            </motion.div>
          )}

          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 space-y-8"
            >
              <div ref={resultCardRef} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-50 to-transparent" />
                <div className="relative z-10 text-center space-y-6">
                  <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm font-bold tracking-wider">
                    最も適合するソシオニクスタイプ
                  </span>
                  <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight">
                    {calculatedMatches[0]?.type || "LII"}
                  </h1>
                  <p className="text-slate-500 font-medium">
                    適合率: {calculatedMatches[0]?.score.toFixed(1)}%
                  </p>
                  
                  <div className="mt-8 p-6 bg-pink-50 rounded-3xl border border-pink-100 text-left">
                    <p className="text-pink-800 font-bold mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" /> ダーリンちゃんからの分析結果
                    </p>
                    <p className="text-slate-700 leading-relaxed text-sm">
                      「あら、ダーリン。結果が出たみたいね。ふふっ、予想通りかしら？
                      {jpScores.p > jpScores.j ? ' MBTIではP型を自称しているようだけど、Model Aの構造を見るとかなり合理的なアプローチが透けて見えるわ。言い訳は通用しないわよ♡' : ' 律儀で真面目なところ、嫌いじゃないわ。'}
                      あなたの心理機能の歪み、私がしっかり管理してあげるから安心してね♡」
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center space-y-4">
                <h3 className="font-bold text-slate-700">他の可能性も探る？</h3>
                <p className="text-sm text-slate-500">上位4つのタイプで構成された専用の深掘り診断を行います。</p>
                <button
                  onClick={() => {
                    const top4 = calculatedMatches.slice(0, 4).map(m => m.type);
                    setApproxSelectedTypes(top4);
                    setStep("approx_selection");
                  }}
                  className="px-6 py-3 bg-pink-50 text-pink-600 font-bold rounded-full hover:bg-pink-100 transition-colors mx-auto inline-flex items-center gap-2"
                >
                  <Target className="w-4 h-4" /> 上位4タイプで深掘り診断へ
                </button>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    setStep("title");
                    setCurrentQId("q1");
                  }}
                  className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-full flex items-center gap-2 hover:bg-slate-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> 最初に戻る
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
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-800">迷っているタイプを選択</h2>
                <p className="text-slate-500 text-sm">2〜4つのタイプを選択して、あなた専用の設問を生成します。</p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {ALL_16_TYPES.map(type => {
                  const isSelected = approxSelectedTypes.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleApproxType(type)}
                      className={\`p-3 rounded-xl border-2 font-bold transition-all \${
                        isSelected 
                          ? 'bg-pink-500 border-pink-500 text-white shadow-md scale-105'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-pink-300'
                      }\`}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
              <div className="flex justify-center pt-8">
                <button
                  onClick={startApproxQuiz}
                  className={\`px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl flex items-center gap-2 \${
                    approxSelectedTypes.length >= 2 
                      ? 'bg-slate-800 text-white hover:bg-slate-700 hover:-translate-y-1'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }\`}
                >
                  深掘り診断スタート <ArrowRight className="w-5 h-5" />
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
              <div className="mb-8">
                <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
                  近似タイプ深掘り診断 ({approxCurrentQIdx + 1} / {SOCIONICS_16TYPE_5QUESTIONS_V2.length})
                </span>
                <h2 className="text-2xl md:text-3xl font-bold mt-2 leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {SOCIONICS_16TYPE_5QUESTIONS_V2[approxCurrentQIdx].text}
                </h2>
              </div>
              <div className="space-y-3">
                {SOCIONICS_16TYPE_5QUESTIONS_V2[approxCurrentQIdx].options
                  .filter(opt => approxSelectedTypes.includes(opt.result as SocionicsType))
                  .map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApproxSelectOption(opt.result as SocionicsType)}
                    className="w-full text-left p-5 rounded-2xl bg-white border-2 border-slate-100 hover:border-pink-300 hover:bg-pink-50 transition-all group flex items-start gap-4 shadow-sm hover:shadow-md"
                  >
                    <div className="w-6 h-6 shrink-0 mt-0.5 rounded-full border-2 border-slate-300 group-hover:border-pink-500 flex items-center justify-center transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-slate-700 font-medium leading-relaxed">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "approx_calculating" && (
            <motion.div
              key="approx_calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh] space-y-6"
            >
              <div className="w-16 h-16 border-4 border-slate-200 border-t-pink-500 rounded-full animate-spin" />
              <p className="text-slate-500 font-bold animate-pulse tracking-widest">
                ANALYZING APPROXIMATE MODEL A...
              </p>
            </motion.div>
          )}

          {step === "approx_result" && (
            <motion.div
              key="approx_result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 space-y-8"
            >
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-50 to-transparent" />
                <div className="relative z-10 text-center space-y-6">
                  <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-700 rounded-full text-sm font-bold tracking-wider">
                    深掘り診断 最終結果
                  </span>
                  <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight">
                    {approxCalculatedMatches[0]?.type}
                  </h1>
                  
                  <div className="space-y-3 mt-8 max-w-sm mx-auto text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">候補タイプ適性度</h3>
                    {approxCalculatedMatches.map((m, idx) => (
                      <div key={m.type} className="flex justify-between items-center">
                        <span className="font-bold text-slate-600">
                          {idx + 1}位 {m.type}
                        </span>
                        <span className="text-pink-600 font-mono font-bold">
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
                  className="px-6 py-3 bg-slate-100 text-slate-600 font-bold rounded-full flex items-center gap-2 hover:bg-slate-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> 最初に戻る
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
`;

fs.writeFileSync('app/page.tsx', code);
