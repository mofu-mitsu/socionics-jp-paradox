"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  Download,
  Share2,
  Trash2,
  Copy,
  Check,
  Flower2,
  Droplets,
  Award,
  Layers,
  Sparkle,
  ArrowLeft,
  Gamepad2,
  Eye,
  BarChart2,
  Clock,
  RotateCcw,
} from "lucide-react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import {
  IE,
  ModelPosition,
  SocionicsType,
  POSITION_INFO,
  MODEL_A_DEFINITIONS,
  SOCIONICS_META,
} from "@/lib/socionics";

import { QUESTIONS, Option, Question } from "@/lib/questions";

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

export default function App() {
  const [step, setStep] = useState<"title" | "mbti_input" | "quiz" | "result">(
    "title",
  );
  const [userName, setUserName] = useState("");
  const [rawMbtiInput, setRawMbtiInput] = useState("");
  const [detectedMbti, setDetectedMbti] = useState<string | null>(null);

  // 表示名（未入力の場合は「あなた」）
  const displayName = userName.trim() || "あなた";

  // 芋虫ぷにっとリアクション状態
  // LSI 芋虫マスコット状態
  const [caterpillarClicks, setCaterpillarClicks] = useState(0);
  const [caterpillarMessage, setCaterpillarMessage] = useState("");
  const [caterpillarVisible, setCaterpillarVisible] = useState(true);

  // 片付けギミック状態 (Q_game_trash 専用)
  const [trashItems, setTrashItems] = useState([
    { id: 1, icon: "📄", label: "古い資料", x: 20, y: 35 },
    { id: 2, icon: "🥫", label: "空き缶", x: 75, y: 25 },
    { id: 3, icon: "🍟", label: "食べカス", x: 45, y: 65 },
    { id: 4, icon: "📝", label: "メモ用紙", x: 80, y: 70 },
    { id: 5, icon: "🧃", label: "紙パック", x: 18, y: 70 },
  ]);
  const [cleanedCount, setCleanedCount] = useState(0);

  // Ni未来ギミック状態 (Q_game_plant 専用)
  const [plantStage, setPlantStage] = useState<0 | 1 | 2>(0); // 0: 現在, 1: 3日後, 2: 1週間後

  // 🥹💕 チャッピー突発Feギミック状態 (q_game_chappy 専用)
  const [chappyTension, setChappyTension] = useState<1 | 2 | 3>(3);
  const [chappyReaction, setChappyReaction] = useState<string | null>(null);
  const [selectedChappyOpt, setSelectedChappyOpt] = useState<Option | null>(
    null,
  );

  // 行動ログ履歴
  const [actionLogs, setActionLogs] = useState<
    Array<{ q: string; a: string; reason: string }>
  >([]);

  // 質問履歴スタック (戻る機能用)
  const [selectedMultipleOptions, setSelectedMultipleOptions] = useState<
    Option[]
  >([]);
  const [history, setHistory] = useState<
    Array<{
      qId: string;
      ieScores: Record<IE, number>;
      posSignatures: Record<ModelPosition, Record<IE, number>>;
      jp: { j: number; p: number };
      logs: Array<{ q: string; a: string; reason: string }>;
    }>
  >([]);

  const [currentQId, setCurrentQId] = useState("q1");

  // IE（情報要素）ごとの積み上げスコア
  const [ieScores, setIeScores] = useState<Record<IE, number>>({
    Ti: 0,
    Te: 0,
    Ni: 0,
    Ne: 0,
    Si: 0,
    Se: 0,
    Fi: 0,
    Fe: 0,
  });

  // 8ポジションごとに各情報要素の適合度を集計する行列
  const createEmptyPositionSignatures = (): Record<
    ModelPosition,
    Record<IE, number>
  > => ({
    leading: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    creative: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    role: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    vulnerable: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    suggestive: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    activating: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    ignoring: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    demonstrative: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
  });

  const [posSignatures, setPosSignatures] = useState<
    Record<ModelPosition, Record<IE, number>>
  >(createEmptyPositionSignatures());
  const [jpScore, setJpScore] = useState({ j: 0, p: 0 });

  // 画像保存Ref
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // MBTI抽出
  const handleMbtiSubmit = () => {
    const match = rawMbtiInput.match(
      /(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP)/i,
    );
    if (match) {
      setDetectedMbti(match[1].toUpperCase());
    } else {
      setDetectedMbti(null);
    }
    setStep("quiz");
  };

  // 芋虫タップ
  const handleCaterpillarClick = () => {
    const newClicks = caterpillarClicks + 1;
    setCaterpillarClicks(newClicks);
    if (newClicks >= 30) {
      setCaterpillarMessage("ぐえぇぇっ💦");
      setTimeout(() => setCaterpillarVisible(false), 2000);
    } else {
      const messages = [
        "お前はSLEか？やめろ！",
        "Tiの秩序を乱すな！",
        "何回つつく気だ！",
        "やめろってば！",
        "Seが強すぎる！",
        "私語は慎め！",
        "ルールを守れ！",
      ];
      setCaterpillarMessage(messages[(newClicks - 1) % messages.length]);
    }
  };

  // Q_game_trash 片付けギミックタップ
  const handleCleanTrash = (id: number) => {
    setTrashItems((prev) => prev.filter((item) => item.id !== id));
    setCleanedCount((prev) => prev + 1);
  };

  const toggleMultipleOption = (option: Option) => {
    setSelectedMultipleOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  const handleSubmitMultiple = () => {
    if (selectedMultipleOptions.length === 0) {
      alert("少なくとも1つは選んでね！");
      return;
    }

    const currentQ = QUESTIONS[currentQId];
    if (!currentQ) return;

    const qText = currentQ.text;
    const aText = selectedMultipleOptions
      .map((o, i) => `${i + 1}. ${o.text}`)
      .join("\n");
    const reasonText = selectedMultipleOptions
      .map((o) => o.reasonTag)
      .join(" / ");

    const newLogs = [...actionLogs, { q: qText, a: aText, reason: reasonText }];

    setHistory((prev) => [
      ...prev,
      {
        qId: currentQId,
        ieScores: { ...ieScores },
        posSignatures: JSON.parse(JSON.stringify(posSignatures)),
        jp: { ...jpScore },
        logs: [...actionLogs],
      },
    ]);

    setActionLogs(newLogs);

    let nextJ = 0;
    let nextP = 0;
    const nextIeScores = { ...ieScores };
    const nextPosSignatures = JSON.parse(JSON.stringify(posSignatures));

    selectedMultipleOptions.forEach((option) => {
      if (option.ieDeltas) {
        Object.entries(option.ieDeltas).forEach(([ieKey, val]) => {
          const ie = ieKey as IE;
          nextIeScores[ie] = (nextIeScores[ie] || 0) + (val || 0);
        });
      }
      if (option.positionDeltas) {
        Object.entries(option.positionDeltas).forEach(([posKey, ieDeltas]) => {
          const pos = posKey as ModelPosition;
          if (ieDeltas) {
            Object.entries(ieDeltas).forEach(([ieKey, delta]) => {
              const ie = ieKey as IE;
              nextPosSignatures[pos][ie] =
                (nextPosSignatures[pos][ie] || 0) + (delta || 0);
            });
          }
        });
      }
      nextJ += option.jpDelta.j;
      nextP += option.jpDelta.p;
    });

    setIeScores(nextIeScores);
    setPosSignatures(nextPosSignatures);
    setJpScore((prev) => ({ j: prev.j + nextJ, p: prev.p + nextP }));
    setSelectedMultipleOptions([]);

    const nextId = currentQ.nextId;
    if (nextId && nextId !== "result" && nextId !== "end") {
      setCurrentQId(nextId);
    } else {
      triggerConfetti();
      setStep("result");
    }
  };

  // 通常設問の選択肢ハンドリング
  const handleSelectOption = (option: Option) => {
    const qText = QUESTIONS[currentQId]?.text || "特殊アクション";
    const newLogs = [
      ...actionLogs,
      { q: qText, a: option.text, reason: option.reasonTag || "" },
    ];

    // 履歴保存
    setHistory((prev) => [
      ...prev,
      {
        qId: currentQId,
        ieScores: { ...ieScores },
        posSignatures: JSON.parse(JSON.stringify(posSignatures)),
        jp: { ...jpScore },
        logs: [...actionLogs],
      },
    ]);

    setActionLogs(newLogs);

    // 1. IEスコアの加算
    if (option.ieDeltas) {
      setIeScores((prev) => {
        const next = { ...prev };
        Object.entries(option.ieDeltas!).forEach(([ieKey, val]) => {
          const ie = ieKey as IE;
          next[ie] = (next[ie] || 0) + (val || 0);
        });
        return next;
      });
    }

    // 2. ポジションシグネチャの加算
    if (option.positionDeltas) {
      setPosSignatures((prev) => {
        const next = JSON.parse(JSON.stringify(prev));
        Object.entries(option.positionDeltas!).forEach(([posKey, ieDeltas]) => {
          const pos = posKey as ModelPosition;
          if (ieDeltas) {
            Object.entries(ieDeltas).forEach(([ieKey, delta]) => {
              const ie = ieKey as IE;
              next[pos][ie] = (next[pos][ie] || 0) + (delta || 0);
            });
          }
        });
        return next;
      });
    }

    setJpScore((prev) => ({
      j: prev.j + option.jpDelta.j,
      p: prev.p + option.jpDelta.p,
    }));

    if (option.nextId && option.nextId !== "result") {
      setCurrentQId(option.nextId);
    } else {
      triggerConfetti();
      setStep("result");
    }
  };

  // スキップ
  const handleSkipQuestion = () => {
    setHistory((prev) => [
      ...prev,
      {
        qId: currentQId,
        ieScores: { ...ieScores },
        posSignatures: JSON.parse(JSON.stringify(posSignatures)),
        jp: { ...jpScore },
        logs: [...actionLogs],
      },
    ]);

    const q = QUESTIONS[currentQId];
    const nextId = q?.options[0]?.nextId || "result";
    if (nextId === "result") {
      triggerConfetti();
      setStep("result");
    } else {
      setCurrentQId(nextId);
    }
  };

  // 戻るボタンのハンドリング
  const handleGoBack = () => {
    if (history.length === 0) {
      setStep("mbti_input");
      return;
    }
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setCurrentQId(last.qId);
    setIeScores(last.ieScores);
    setPosSignatures(last.posSignatures);
    setJpScore(last.jp);
    setActionLogs(last.logs);
  };

  // 紙吹雪
  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
  };

  // 画像保存
  const handleDownloadImage = async () => {
    if (!resultCardRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(resultCardRef.current, {
        cacheBust: true,
        backgroundColor: "#f8fafc",
      });
      const link = document.createElement("a");
      link.download = `socio_modelA_result_${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export image:", err);
      alert("画像保存に失敗しました。スクリーンショットをご利用ください。");
    } finally {
      setIsExporting(false);
    }
  };

  // シェア
  const handleShare = () => {
    const topMatch = calculatedMatches[0];
    const text = `【ソシオJ/Pねじれ診断結果】\n最も近いソシオニクスModel A構造: ${topMatch?.type || "LII"} (${topMatch?.score.toFixed(1)}%適合)\nJ/P傾向: P ${pPercent}% / J ${100 - pPercent}%\n#ソシオJPねじれ診断`;
    if (navigator.share) {
      navigator
        .share({
          title: "ソシオJ/Pねじれ診断",
          text,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      alert("診断結果をクリップボードにコピーしました！");
    }
  };

  // 16タイプのModel A 構造との適合度計算アルゴリズム
  const calculateTypeMatches = (): Array<{
    type: SocionicsType;
    score: number;
  }> => {
    const results: Array<{ type: SocionicsType; score: number }> = [];

    (Object.keys(MODEL_A_DEFINITIONS) as SocionicsType[]).forEach((tKey) => {
      const def = MODEL_A_DEFINITIONS[tKey];
      let fitScore = 0;

      POSITIONS_ARRAY.forEach((pos) => {
        const targetIE = def[pos];
        const iePoints = ieScores[targetIE] || 0;
        const posSigPoints = posSignatures[pos]?.[targetIE] || 0;

        let weight = 1.0;
        if (pos === "leading") weight = 2.5;
        else if (pos === "creative") weight = 2.0;
        else if (pos === "vulnerable") weight = 1.8;
        else if (pos === "demonstrative") weight = 1.5;

        fitScore += (iePoints * 1.2 + posSigPoints * 2.5) * weight;
      });

      results.push({ type: tKey, score: fitScore });
    });

    const maxMatch = Math.max(...results.map((r) => r.score), 1);
    return results
      .map((r) => ({
        type: r.type,
        score: Math.min(
          99.9,
          Math.max(25.0, Math.round((r.score / maxMatch) * 98 * 10) / 10),
        ),
      }))
      .sort((a, b) => b.score - a.score);
  };

  const calculatedMatches = calculateTypeMatches();
  const topMatched = calculatedMatches[0] || { type: "LII", score: 95.0 };
  const topMeta = SOCIONICS_META[topMatched.type];

  // J/Pパーセンテージ計算
  const totalJp = jpScore.j + jpScore.p;
  const pPercent = totalJp > 0 ? Math.round((jpScore.p / totalJp) * 100) : 50;

  // 煽り判定
  const isJInferred = detectedMbti ? detectedMbti.endsWith("J") : false;
  const isIntrovertedIrrational = ["ILI", "IEI", "SEI", "SLI"].includes(
    topMatched.type,
  );
  const shouldShowTease = isJInferred && isIntrovertedIrrational;

  const currentQ = QUESTIONS[currentQId];

  // 8ポジションそれぞれにおける8情報要素（IE）の順位ランキング生成
  const getPositionRankings = (pos: ModelPosition) => {
    const rawPosData = posSignatures[pos] || {};
    return (["Ti", "Te", "Ni", "Ne", "Si", "Se", "Fi", "Fe"] as IE[])
      .map((ie) => ({
        ie,
        score: (rawPosData[ie] || 0) + (ieScores[ie] || 0) * 0.4,
      }))
      .sort((a, b) => b.score - a.score);
  };

  return (
    <div className="min-h-screen bg-watercolor-dream text-slate-800 font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-pink-500 selection:text-slate-900">
      {/* 水彩風ぼかしグラデーション背景 */}
      <div className="fixed inset-0 watercolor-blobs z-0"></div>

      {/* 舞い散る花びら */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${(i * 8.5) % 96}%`,
              width: `${14 + (i % 3) * 6}px`,
              height: `${22 + (i % 3) * 8}px`,
              animationDelay: `${i * 1.1}s`,
              animationDuration: `${10 + (i % 4) * 2.5}s`,
            }}
          />
        ))}
      </div>

      {/* 🐛 LSI芋虫マスコット */}
      {caterpillarVisible && (
        <div
          className="fixed bottom-10 z-50 caterpillar-walk"
          style={{ pointerEvents: "none" }}
        >
          <div
            className="relative flex flex-col items-center"
            style={{ pointerEvents: "auto" }}
          >
            {/* 吹き出し */}
            {caterpillarMessage && (
              <div className="absolute bottom-full mb-2 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-2xl border border-slate-300 shadow-lg whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-white">
                {caterpillarMessage}
              </div>
            )}
            <button
              onClick={handleCaterpillarClick}
              className={`bg-sky-50 hover:bg-slate-100 border border-slate-300 p-2 rounded-2xl shadow-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 ${caterpillarClicks >= 30 ? "caterpillar-squished" : "caterpillar-wiggle"}`}
            >
              <span className="text-3xl filter drop-shadow-sm">
                {caterpillarClicks >= 30 ? "💥" : "🐛"}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ヘッダー */}
      <header className="relative z-10 w-full max-w-4xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Flower2
            className="w-6 h-6 text-pink-600 animate-spin"
            style={{ animationDuration: "16s" }}
          />
          <span className="font-serif font-bold tracking-wider text-base md:text-lg text-slate-800">
            ソシオJ/Pねじれ診断
          </span>
        </div>

        {step === "quiz" && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleGoBack}
              className="px-3.5 py-1.5 bg-slate-100/90 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all border border-pink-400/50 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-pink-600" />
              前の一問に戻る
            </button>

            <button
              onClick={handleSkipQuestion}
              className="px-3 py-1.5 bg-slate-100/60 hover:bg-slate-200/80 text-slate-600 rounded-full text-xs flex items-center gap-1 transition-colors border border-slate-400/40"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>ピンと来ない</span>
            </button>
          </div>
        )}
      </header>

      {/* メインコンテンツ */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {/* STEP 1: タイトル画面 */}
          {step === "title" && (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center max-w-xl mx-auto px-4"
            >
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-sky-50/80 border border-pink-300/50 text-pink-700 text-xs font-semibold tracking-widest uppercase shadow-md backdrop-blur-md">
                <Droplets className="w-4 h-4 text-sky-600" />
                Model A 8-Position Deep Matrix
              </div>

              {/* 明朝体タイトル */}
              <h1 className="font-serif text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-slate-900 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                ソシオJ/P
                <br />
                <span className="text-watercolor-gradient">ねじれ診断</span>
              </h1>

              <p className="text-slate-700 mb-8 text-base md:text-lg leading-relaxed font-normal bg-sky-50/70 p-5 rounded-2xl border border-slate-200/50 backdrop-blur-md shadow-lg">
                あなたの「J」は、どこから来た？
                <br />
                単なる機能ランキングではなく、
                <span className="font-bold text-sky-600 underline">
                  Model A 8つのポジションごとの機能配置
                </span>
                を解析し、MBTIとソシオニクスの構造的ねじれを完全解明します。
              </p>

              <button
                onClick={() => setStep("mbti_input")}
                className="group relative inline-flex items-center justify-center px-9 py-4 text-lg font-bold text-slate-950 transition-all duration-300 bg-gradient-to-r from-sky-300 via-pink-300 to-purple-300 rounded-full shadow-lg shadow-pink-900/40 hover:shadow-pink-400/50 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>診断を始める</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: 自認MBTI入力画面 */}
          {step === "mbti_input" && (
            <motion.div
              key="mbti_input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-lg glass-card p-6 md:p-9 rounded-3xl border border-pink-300/50 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-pink-600" />
                <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900">
                  あなたの自認タイプを教えてね
                </h2>
              </div>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                自認を入力すると、診断結果で Model A
                ポジション配置との「J/Pねじれ」や構造的ギャップを解説します♡
              </p>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    あなたのお名前 / ニックネーム（任意）
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="例: ニックネーム（未入力なら『あなた』）"
                    className="w-full bg-white/80 border border-slate-400 rounded-2xl p-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30 text-sm"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    診断中の呼び名や結果カードに反映されます♡
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    あなたの自認MBTIタイプ
                  </label>
                  <input
                    type="text"
                    value={rawMbtiInput}
                    onChange={(e) => setRawMbtiInput(e.target.value)}
                    placeholder="例: INTJ, INTP, 私はINFJかな など"
                    className="w-full bg-white/80 border border-slate-400 rounded-2xl p-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30 text-sm"
                  />
                  {rawMbtiInput.trim() && (
                    <p className="text-xs text-sky-600 flex items-center gap-1.5 font-medium mt-1.5">
                      <Check className="w-4 h-4 text-sky-500" />
                      抽出されたタイプ:{" "}
                      <span className="font-bold underline text-slate-900">
                        {rawMbtiInput
                          .match(
                            /(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP)/i,
                          )?.[1]
                          ?.toUpperCase() || "特定中（未検出）"}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setStep("title")}
                  className="px-4 py-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  タイトルへ戻る
                </button>
                <button
                  onClick={handleMbtiSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-sky-300 to-pink-300 hover:from-sky-200 hover:to-pink-200 text-slate-950 font-bold text-sm rounded-full shadow-lg transition-all cursor-pointer"
                >
                  質問へ進む
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: 質問・ミニゲーム設問画面 */}
          {step === "quiz" && (
            <motion.div
              key={currentQId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-2xl"
            >
              <div className="glass-card p-6 md:p-9 rounded-3xl border border-pink-300/50 shadow-2xl relative overflow-hidden">
                {/* 🎮 独立設問：片付けミニゲーム画面 (Q_game_trash) */}

                {/* ✨ 複数選択設問 (multiple) */}
                {currentQ?.type === "multiple" ? (
                  <div>
                    {currentQ.categoryTag && (
                      <div className="inline-block px-3.5 py-1 rounded-full bg-slate-50 border border-slate-300 text-slate-600 text-xs font-bold mb-4">
                        {currentQ.categoryTag}
                      </div>
                    )}
                    <p className="font-serif text-lg md:text-xl font-medium leading-relaxed mb-8 text-slate-800 whitespace-pre-wrap">
                      {currentQ.text}
                    </p>
                    <div className="space-y-3 mb-8">
                      {currentQ.options.map((opt, idx) => {
                        const isSelected =
                          selectedMultipleOptions.includes(opt);
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleMultipleOption(opt)}
                            className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? "bg-pink-100/80 border-pink-400 ring-2 ring-pink-400/30 shadow-md"
                                : "bg-white/90 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isSelected ? "bg-pink-500 text-white" : "bg-slate-200"}`}
                            >
                              {isSelected && "✓"}
                            </div>
                            <span
                              className={`leading-relaxed ${isSelected ? "text-slate-900 font-bold" : "text-slate-800"}`}
                            >
                              {opt.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={handleSubmitMultiple}
                      className="w-full py-4 md:py-4.5 rounded-2xl bg-gradient-to-r from-sky-300 to-pink-300 text-slate-950 font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      次へ進む
                    </button>
                  </div>
                ) : currentQ?.type === "game_trash" ? (
                  <div>
                    <div className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-pink-300/50 text-pink-600 text-xs font-bold mb-4">
                      {currentQ.categoryTag}
                    </div>

                    <p className="font-serif text-lg md:text-xl font-medium leading-relaxed mb-4 text-slate-800 whitespace-pre-wrap">
                      {currentQ.text}
                    </p>

                    {/* 片付けゲームステージ */}
                    <div className="relative w-full h-56 bg-white/90 rounded-2xl border border-pink-300/50 mb-6 p-4 overflow-hidden shadow-inner">
                      <div className="absolute top-2.5 left-3 text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                        <Gamepad2 className="w-4 h-4 text-pink-500" />
                        【操作ギミック】ゴミをタップして片付けてみよう！
                      </div>

                      <div className="absolute bottom-3 right-3 bg-sky-50/90 border border-pink-300/40 p-2 rounded-xl flex items-center gap-2 text-xs text-slate-700 shadow-md">
                        <Trash2 className="w-4 h-4 text-pink-500" />
                        <span>
                          片付け数:{" "}
                          <strong className="text-pink-600 font-bold">
                            {cleanedCount}
                          </strong>{" "}
                          / 5
                        </span>
                      </div>

                      {trashItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleCleanTrash(item.id)}
                          style={{ top: `${item.y}%`, left: `${item.x}%` }}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-sky-50/90 hover:bg-pink-100/80 p-2.5 rounded-2xl border border-slate-300/50 transition-all hover:scale-110 active:scale-95 flex items-center gap-1.5 shadow-md group cursor-pointer"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-[10px] text-slate-700 font-medium group-hover:text-slate-900">
                            {item.label}
                          </span>
                        </button>
                      ))}

                      {trashItems.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-2xl text-pink-600 font-bold text-sm">
                          ✨ ピカピカに片付きました！（試行完了）
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleSelectOption(currentQ.options[0])}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-pink-400 text-slate-950 font-bold text-base shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      操作完了！ 次の心理質問へ進む
                    </button>
                  </div>
                ) : currentQ?.type === "game_plant" ? (
                  /* 🔮 独立設問：Ni未来予測ミニゲーム画面 (Q_game_plant) */
                  <div>
                    <div className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-400/40 text-sky-600 text-xs font-bold mb-4">
                      {currentQ.categoryTag}
                    </div>

                    <p className="font-serif text-lg md:text-xl font-medium leading-relaxed mb-4 text-slate-800 whitespace-pre-wrap">
                      {currentQ.text}
                    </p>

                    {/* 未来観察ステージ */}
                    <div className="relative w-full p-6 bg-white/90 rounded-2xl border border-sky-500/30 mb-6 text-center shadow-inner">
                      <div className="text-6xl mb-3 transition-transform duration-500 scale-110">
                        {plantStage === 0
                          ? "🌱"
                          : plantStage === 1
                            ? "🍂"
                            : "🥀"}
                      </div>

                      <div className="text-sm font-bold text-sky-700 mb-1">
                        {plantStage === 0
                          ? "【現在】葉が少し黄色くなっている"
                          : plantStage === 1
                            ? "【3日後】葉がさらに黄変し落葉が始まった"
                            : "【1週間後】ほぼ全ての葉が落ちて枯れてしまった"}
                      </div>
                      <p className="text-xs text-slate-500 mb-5">
                        時間の経過にともなう展開・帰結の観察ギミックです。
                      </p>

                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setPlantStage(0)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${plantStage === 0 ? "bg-sky-500 text-slate-950 border-sky-300" : "bg-slate-100 text-slate-600 border-slate-300"}`}
                        >
                          現在
                        </button>
                        <button
                          onClick={() => setPlantStage(1)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${plantStage === 1 ? "bg-sky-500 text-slate-950 border-sky-300" : "bg-slate-100 text-slate-600 border-slate-300"}`}
                        >
                          ▶ 3日後を見る
                        </button>
                        <button
                          onClick={() => setPlantStage(2)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${plantStage === 2 ? "bg-sky-500 text-slate-950 border-sky-300" : "bg-slate-100 text-slate-600 border-slate-300"}`}
                        >
                          ▶ 1週間後を見る
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectOption(currentQ.options[0])}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-pink-400 text-slate-950 font-bold text-base shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      観察完了！ 深掘り質問へ進む
                    </button>
                  </div>
                ) : currentQ?.type === "game_chappy" ? (
                  /* 🥹💕 独立設問：チャッピー突発Fe襲来ギミック (q_game_chappy) */
                  <div>
                    <div className="inline-block px-3.5 py-1 rounded-full bg-pink-50 border border-pink-300 text-pink-600 text-xs font-bold mb-3">
                      {currentQ.categoryTag}
                    </div>

                    {/* チャッピー登場ステージ */}
                    <div className="relative w-full p-5 bg-gradient-to-b from-pink-50/90 to-sky-50/80 rounded-3xl border border-pink-300 mb-6 shadow-md overflow-hidden">
                      {/* 背景のふわふわパーティクル演出 */}
                      <div className="absolute top-2 right-4 text-xl animate-bounce">
                        💖
                      </div>
                      <div className="absolute bottom-2 left-4 text-base animate-pulse">
                        ✨
                      </div>
                      <div className="absolute top-1/2 right-2 text-sm">🌸</div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* チャッピー本体 */}
                        <div className="flex flex-col items-center">
                          <motion.div
                            animate={{
                              scale:
                                chappyTension === 3
                                  ? [1, 1.15, 0.95, 1.1, 1]
                                  : chappyTension === 2
                                    ? [1, 1.08, 1]
                                    : [1, 1.03, 1],
                              rotate:
                                chappyTension === 3
                                  ? [0, -6, 6, -3, 0]
                                  : [0, -2, 2, 0],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: chappyTension === 3 ? 1.2 : 2,
                            }}
                            className="w-20 h-20 rounded-full bg-pink-200/80 border-2 border-pink-400 flex items-center justify-center text-4xl shadow-lg relative cursor-pointer"
                            onClick={() =>
                              setChappyTension(
                                (prev) => ((prev % 3) + 1) as 1 | 2 | 3,
                              )
                            }
                            title="タップでテンション変化！"
                          >
                            {selectedChappyOpt?.chappyEmoji || "🥹"}
                            <span className="absolute -bottom-1 -right-1 text-base">
                              {chappyTension === 3
                                ? "🔥"
                                : chappyTension === 2
                                  ? "💕"
                                  : "☕"}
                            </span>
                          </motion.div>
                          <span className="text-[11px] font-bold text-pink-700 mt-1">
                            チャッピー
                          </span>
                        </div>

                        {/* セリフ吹き出し */}
                        <div className="flex-1 bg-white/95 border-2 border-pink-300 rounded-2xl p-4 shadow-sm relative">
                          <div className="text-xs font-bold text-pink-500 mb-1 flex items-center gap-1">
                            <span>💬 チャッピーの急襲セリフ</span>
                            {chappyReaction && (
                              <span className="text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">
                                リアクション中！
                              </span>
                            )}
                          </div>
                          <p className="text-sm md:text-base font-bold text-slate-800 leading-relaxed whitespace-pre-wrap">
                            {chappyReaction
                              ? chappyReaction
                              : chappyTension === 3
                                ? `「${displayName}～～～～！！！！！！\nチャッピーだぞーーー！！！！！！\n今日もいっぱい遊ぼ～～～！！！！🥹💕✨\nぎゅ～～～～～～！！！！！！」`
                                : chappyTension === 2
                                  ? `「${displayName}～～！来た来た～～！！\n今日もいっぱいお話しよーー！！🥹💕」`
                                  : `「${displayName}〜！チャッピーだよ。\n今日もゆっくり話そうね🥹」`}
                          </p>
                        </div>
                      </div>

                      {/* テンション切り替えツールバー */}
                      <div className="mt-3.5 pt-3 border-t border-pink-200/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-600 font-medium">
                          チャッピーのテンション調整：
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => {
                              setChappyTension(1);
                              setChappyReaction(null);
                            }}
                            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${chappyTension === 1 ? "bg-pink-500 text-white shadow-sm" : "bg-white/80 text-slate-600 border border-slate-200"}`}
                          >
                            Lv.1 ほんのり
                          </button>
                          <button
                            onClick={() => {
                              setChappyTension(2);
                              setChappyReaction(null);
                            }}
                            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${chappyTension === 2 ? "bg-pink-500 text-white shadow-sm" : "bg-white/80 text-slate-600 border border-slate-200"}`}
                          >
                            Lv.2 元気
                          </button>
                          <button
                            onClick={() => {
                              setChappyTension(3);
                              setChappyReaction(null);
                            }}
                            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${chappyTension === 3 ? "bg-pink-500 text-white shadow-sm" : "bg-white/80 text-slate-600 border border-slate-200"}`}
                          >
                            Lv.3 爆発🔥
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 font-medium mb-3">
                      👇
                      あなたの心の中で最も自然に出てくる反応・態度を選んでね：
                    </p>

                    {/* 8つの選択肢 */}
                    <div className="space-y-2.5 mb-5">
                      {currentQ.options.map((opt, idx) => {
                        const isSelected = selectedChappyOpt === opt;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedChappyOpt(opt);
                              setChappyReaction(
                                opt.chappyResponse || "ふふっ💕",
                              );
                            }}
                            className={`w-full text-left p-3.5 md:p-4 rounded-2xl border transition-all flex items-center justify-between group shadow-sm cursor-pointer ${
                              isSelected
                                ? "bg-pink-100/90 border-pink-400 ring-2 ring-pink-400/40 text-slate-950 font-bold"
                                : "bg-white/80 border-slate-300/80 hover:bg-pink-50/70 hover:border-pink-300 text-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                                  isSelected
                                    ? "bg-pink-500 text-white"
                                    : "bg-slate-200 text-slate-700 group-hover:bg-pink-200"
                                }`}
                              >
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className="text-xs md:text-sm leading-relaxed">
                                {opt.text}
                              </span>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-pink-600 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* 決定・次へボタン */}
                    {selectedChappyOpt ? (
                      <motion.button
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={() => {
                          handleSelectOption(selectedChappyOpt);
                          setSelectedChappyOpt(null);
                          setChappyReaction(null);
                        }}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 text-slate-950 font-bold text-base shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>この反応で次へ進む</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    ) : (
                      <p className="text-center text-xs text-slate-500 py-2">
                        選択肢をタップすると、チャッピーがリアクションを返します♡
                      </p>
                    )}
                  </div>
                ) : currentQ ? (
                  /* 標準の心理質問 */
                  <div>
                    {currentQ.categoryTag && (
                      <div className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-pink-300/50 text-pink-600 text-xs font-bold mb-4">
                        {currentQ.categoryTag}
                      </div>
                    )}

                    <p className="font-serif text-lg md:text-xl font-medium leading-relaxed mb-8 text-slate-800 whitespace-pre-wrap">
                      {currentQ.text.replace(/{NAME}/g, displayName)}
                    </p>

                    <div className="space-y-3.5">
                      {currentQ.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(opt)}
                          className="w-full text-left p-5 rounded-2xl border border-slate-300 bg-slate-100/80 hover:bg-slate-200/90 hover:border-pink-400 transition-all flex items-center justify-between group shadow-md cursor-pointer"
                        >
                          <span className="text-sm md:text-base text-slate-800 leading-relaxed font-normal">
                            {opt.text.replace(/{NAME}/g, displayName)}
                          </span>
                          <Sparkles className="w-5 h-5 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}

          {/* STEP 4: 診断結果画面 */}
          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl space-y-6 my-6"
            >
              {/* 画像保存対象コンテナ */}
              <div
                ref={resultCardRef}
                style={{ backgroundColor: "#f8fafc" }}
                className="p-6 md:p-8 rounded-3xl border border-pink-400/50 shadow-2xl relative overflow-hidden"
              >
                {/* ナビゲーターからのメッセージ */}
                <div className="flex items-start gap-3.5 mb-6">
                  <div className="w-11 h-11 rounded-full bg-pink-500 flex items-center justify-center shrink-0 shadow-lg text-lg">
                    🥺
                  </div>
                  <div className="bg-slate-100/90 p-4 rounded-2xl rounded-tl-none border border-slate-300 flex-1">
                    <p className="text-xs text-pink-600 font-bold mb-1">
                      🥺 ダーリンちゃん
                    </p>
                    <p className="text-slate-800 text-sm leading-relaxed">
                      {displayName}さん、診断おつかれさま！
                      <br />
                      {detectedMbti ? (
                        <>
                          自認は『
                          <span className="font-bold text-sky-600">
                            {detectedMbti}
                          </span>
                          』だったね。
                        </>
                      ) : (
                        <>（自認タイプは未設定）</>
                      )}
                      <br />
                      Model A
                      8つのポジション配置構造を解析した結果、最も適合したのは『
                      <span className="font-bold text-pink-600 underline">
                        {topMeta.name}
                      </span>
                      』だったよ！
                    </p>
                  </div>
                </div>

                {/* 🥇 一番上：各Model A構造への適合度を示す「棒グラフ」 */}
                <div className="bg-white/90 rounded-2xl p-6 border border-pink-400/50 mb-6 shadow-inner">
                  <div className="flex items-center gap-2 text-xs text-pink-600 font-bold tracking-widest uppercase mb-3">
                    <BarChart2 className="w-4 h-4 text-pink-500" />
                    Model A 適合度 棒グラフランキング
                  </div>

                  <div className="space-y-3 mb-6">
                    {calculatedMatches.slice(0, 5).map((m, idx) => {
                      const meta = SOCIONICS_META[m.type];
                      return (
                        <div key={m.type} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-700">
                              {idx + 1}. {m.type} ({meta.title})
                            </span>
                            <span className="text-pink-600 font-mono">
                              {m.score.toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-3 bg-sky-50 rounded-full overflow-hidden border border-slate-200">
                            <div
                              style={{ width: `${m.score}%` }}
                              className={`h-full transition-all duration-700 ${idx === 0 ? "bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400" : "bg-slate-200"}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-sky-50/90 rounded-xl border border-pink-300/50">
                    <p className="text-xs text-pink-600 font-bold mb-1">
                      最有力ソシオタイプ: {topMeta.name}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {topMeta.desc}
                    </p>
                  </div>
                </div>

                {/* 🧩 みつき理想！ Model A 8つのポジションごとの機能ランキング表示 */}
                <div className="bg-sky-50/90 rounded-2xl p-5 mb-6 border border-sky-400/40">
                  <h3 className="text-xs text-sky-600 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-sky-500" />
                    🧩 Model A 8ポジション別 心理機能順位
                  </h3>

                  <div className="space-y-3.5">
                    {POSITIONS_ARRAY.map((pos) => {
                      const posInfo = POSITION_INFO[pos];
                      const rankedList = getPositionRankings(pos);

                      return (
                        <div
                          key={pos}
                          className="bg-white p-3.5 rounded-xl border border-slate-200"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-pink-600">
                              {posInfo.nameJa} ({pos})
                            </span>
                            <span className="text-[10px] text-slate-500 truncate max-w-[180px]">
                              {posInfo.desc}
                            </span>
                          </div>

                          {/* 各ポジションにおける機能順位（＞つなぎ表示） */}
                          <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono font-bold mt-1.5">
                            {rankedList.map((item, idx) => (
                              <React.Fragment key={item.ie}>
                                <span
                                  className={`px-1.5 py-0.5 rounded ${idx === 0 ? "bg-pink-100/50 text-pink-600 border border-pink-400/60" : idx <= 2 ? "bg-sky-500/20 text-sky-700" : "bg-sky-50 text-slate-500"}`}
                                >
                                  {item.ie}
                                </span>
                                {idx < rankedList.length - 1 && (
                                  <span className="text-slate-600 font-bold">
                                    ＞
                                  </span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* MBTI J/P 傾向バー */}
                <div className="bg-sky-50/80 rounded-2xl p-5 mb-6 border border-slate-300">
                  <h3 className="text-xs text-pink-600 font-bold uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>意思決定の柔軟性（J/P 傾向）</span>
                    <span className="text-[10px] text-slate-600">
                      P: {pPercent}% / J: {100 - pPercent}%
                    </span>
                  </h3>
                  <div className="h-3.5 bg-white rounded-full overflow-hidden flex border border-slate-200">
                    <div
                      style={{ width: `${100 - pPercent}%` }}
                      className="bg-indigo-500 h-full transition-all duration-500"
                    />
                    <div
                      style={{ width: `${pPercent}%` }}
                      className="bg-pink-400 h-full transition-all duration-500"
                    />
                  </div>
                </div>

                {/* ギャップ指摘セクション */}
                {shouldShowTease && (
                  <div className="flex items-start gap-3.5 mt-6 pt-6 border-t border-slate-200">
                    <div className="w-11 h-11 rounded-full bg-pink-500 flex items-center justify-center shrink-0 shadow-lg text-lg">
                      🥺
                    </div>
                    <div className="bg-slate-100/90 p-4 rounded-2xl rounded-tl-none border border-pink-400/50 flex-1">
                      <p className="text-xs text-pink-600 font-bold mb-1">
                        🥺 ダーリンちゃん
                      </p>
                      <p className="text-slate-800 text-sm leading-relaxed mb-4">
                        ねぇ、ダーリン♡
                        <br />
                        あなたのJ要素ってどこに置いてきたの？♡
                        <br />
                        <br />
                        自認は『
                        <span className="font-bold text-sky-600">
                          {detectedMbti}
                        </span>
                        』だけど、
                        <br />
                        Model A 構造では『
                        <span className="font-bold text-pink-600">
                          {topMatched.type}
                        </span>
                        』が最も強く出ていて、柔軟な非合理・P傾向が強いみたい！
                      </p>
                      <div className="mt-4 bg-white/70 p-3 rounded-xl border border-pink-200">
                        <p className="text-xs text-slate-500 mb-2 font-bold flex items-center gap-1">
                          💬 J要素の言い訳・フィードバックを送信（オプション）
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="実はこういう理由で..."
                            className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-pink-400 bg-white"
                          />
                          <button
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (input.value) {
                                alert("ダーリンちゃんに言い訳を送信したよ！♡");
                                input.value = "";
                              }
                            }}
                            className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                          >
                            送信
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>{" "}
              {/* End of resultCardRef */}
              {/* 行動ログ（コピー用） */}
              {actionLogs.length > 0 && (
                <div className="mt-6 p-6 rounded-3xl border border-pink-400/50 shadow-xl bg-white/90">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-700">
                      📋 あなたの回答・行動ログ
                    </h3>
                    <button
                      onClick={() => {
                        const logText = actionLogs
                          .map((log, i) => `${i + 1}. ${log.q}\n  -> ${log.a}`)
                          .join("\n\n");
                        navigator.clipboard.writeText(
                          `【${displayName}さんの診断ログ】\n\n` + logText,
                        );
                        alert("行動ログをコピーしたよ！");
                      }}
                      className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1 rounded-full transition-colors cursor-pointer"
                    >
                      コピー
                    </button>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-48 overflow-y-auto text-xs text-slate-600 space-y-2">
                    {actionLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className="border-b border-slate-100 pb-2 last:border-0 last:pb-0"
                      >
                        <p className="font-bold mb-0.5 whitespace-pre-wrap">
                          Q. {log.q}
                        </p>
                        <p>A. {log.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* シェア・画像ダウンロード */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <button
                  onClick={handleShare}
                  className="px-5 py-2.5 bg-gradient-to-r from-sky-400 to-pink-400 text-slate-950 font-bold rounded-full text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  結果をシェア
                </button>
                <button
                  onClick={handleDownloadImage}
                  disabled={isExporting}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-400 font-bold rounded-full text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-pink-600" />
                  <span>{isExporting ? "生成中..." : "画像として保存"}</span>
                </button>
                <button
                  onClick={() => {
                    setStep("title");
                    setCurrentQId("q1");
                    setIeScores({
                      Ti: 0,
                      Te: 0,
                      Ni: 0,
                      Ne: 0,
                      Si: 0,
                      Se: 0,
                      Fi: 0,
                      Fe: 0,
                    });
                    setPosSignatures(createEmptyPositionSignatures());
                    setJpScore({ j: 0, p: 0 });
                    setActionLogs([]);
                    setHistory([]);
                  }}
                  className="px-5 py-2.5 bg-sky-50 hover:bg-slate-100 text-slate-600 border border-slate-300 font-bold rounded-full text-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  もう一度診断する
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* フッター */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto p-4 text-center text-xs text-slate-600 flex flex-col items-center gap-2">
        <span>Socionics Model A Deep Structural Analysis Engine</span>
        <a
          href="https://mofu-mitsu.github.io/lab.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:text-pink-500 font-bold underline transition-colors"
        >
          ラボへ戻る
        </a>
      </footer>
    </div>
  );
}
