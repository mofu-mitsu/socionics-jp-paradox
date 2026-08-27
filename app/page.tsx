"use client";

import React, { useState, useRef, useMemo } from "react";
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
  Volume2,
  VolumeX,
  Smartphone,
  X,
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
import { SOCIONICS_16TYPE_5QUESTIONS_V2 } from "@/lib/questions_v2";
import { LogOut } from "lucide-react";

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
  const [step, setStep] = useState<"title" | "mbti_input" | "quiz" | "approximate" | "approximate_select" | "result">(
    "title",
  );
  const [approximateQIndex, setApproximateQIndex] = useState(0);
  const [topCandidates, setTopCandidates] = useState<SocionicsType[]>([]);
  const [selectedApproxTypes, setSelectedApproxTypes] = useState<SocionicsType[]>([]);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [showSmartphoneInput, setShowSmartphoneInput] = useState(false);
  const [smartphoneInput, setSmartphoneInput] = useState("");
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [showDarlingEnding, setShowDarlingEnding] = useState(false);
  const [darlingEndingState, setDarlingEndingState] = useState<"initial" | "invading" | "police" | "fire">("initial");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

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

  // REC mode for ILI/LII/LSI
  const [isRecMode, setIsRecMode] = useState(false);
  const [hasSeenIliLiiLsiSplit, setHasSeenIliLiiLsiSplit] = useState(false);
  const [hasSeenSleSplit, setHasSeenSleSplit] = useState(false);
  const [hasSeenTeSeSplit, setHasSeenTeSeSplit] = useState(false);
  const [hasSeenDarlingLiar, setHasSeenDarlingLiar] = useState(false);
  const [showNextAfterInvasion, setShowNextAfterInvasion] = useState(false);

  // MBTI抽出
  
  const resetState = () => {
    setStep("title");
    setCurrentQId("q1");
    setIeScores({ Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 });
    setPosSignatures(createEmptyPositionSignatures());
    setJpScore({ j: 0, p: 0 });
    setActionLogs([]);
    setHistory([]);
    setIsRecMode(false);
    setHasSeenIliLiiLsiSplit(false);
                    setHasSeenSleSplit(false);
    setHasSeenTeSeSplit(false);
    setHasSeenDarlingLiar(false);
                    setShowNextAfterInvasion(false);
    setTopCandidates([]);
    setShowDarlingEnding(false);
    setDarlingEndingState("initial");
    setFeedbackSent(false);
    setIsSending(false);
    setTrashItems([
      { id: 1, icon: "📄", label: "古い資料", x: 20, y: 35 },
      { id: 2, icon: "🥫", label: "空き缶", x: 75, y: 25 },
      { id: 3, icon: "🍟", label: "食べカス", x: 45, y: 65 },
      { id: 4, icon: "📝", label: "メモ用紙", x: 80, y: 70 },
      { id: 5, icon: "🧃", label: "紙パック", x: 18, y: 70 },
    ]);
    setCleanedCount(0);
    setPlantStage(0);
    setChappyTension(3);
    setChappyReaction(null);
    setSelectedChappyOpt(null);
  };

  
  const playClickSound = () => {
    if (isSoundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.stop(audioCtx.currentTime + 0.1);
      } catch (e) {}
    }
  };

  const triggerCaterpillarInvasion = (emoji: string) => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);
    
    const msgs = ["境界線確保。侵入継続。", "領土侵犯ヲ確認。占領プロセスヲ実行中..."];
    
    for(let i=0; i<30; i++) {
      const cat = document.createElement('div');
      cat.innerHTML = emoji + '<br/><div style="font-size: 10px; color: red; background: black; padding: 2px; white-space: nowrap;">' + msgs[i%2] + '</div>';
      cat.style.position = 'absolute';
      cat.style.left = Math.random() * 100 + 'vw';
      cat.style.top = -20 + 'vh';
      cat.style.transition = 'all ' + (4 + Math.random()*4) + 's ease-in';
      cat.style.fontSize = (20 + Math.random()*40) + 'px';
      container.appendChild(cat);
      
      setTimeout(() => {
        cat.style.top = 120 + 'vh';
        cat.style.transform = 'rotate(' + (Math.random()*360) + 'deg)';
      }, 50);
    }
    
    setTimeout(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setShowNextAfterInvasion(true);
    }, 8500);
  };

  const handleMbtiSubmit = () => {
    const mbtiMatch = rawMbtiInput.match(/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP)/i);
    const socioMatch = rawMbtiInput.match(/(ILE|SEI|ESE|LII|EIE|LSI|SLE|IEI|SEE|ILI|LIE|ESI|LSE|EII|IEE|SLI)/i);
    
    if (mbtiMatch) {
      setDetectedMbti(mbtiMatch[1].toUpperCase());
    } else if (socioMatch) {
      setDetectedMbti(socioMatch[1].toUpperCase());
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
      nextJ += (option.jpDelta?.j || 0);
      nextP += (option.jpDelta?.p || 0);
    });

    setIeScores(nextIeScores);
    setPosSignatures(nextPosSignatures);
    setJpScore((prev) => ({ j: prev.j + nextJ, p: prev.p + nextP }));
    setSelectedMultipleOptions([]);

    const nextId = currentQ.nextId;
    if (nextId && nextId !== "result" && nextId !== "end") {
      setCurrentQId(nextId);
    } else {
      goToNextStepAfterQuiz(nextIeScores, nextPosSignatures);
    }
  };

  // 通常設問の選択肢ハンドリング
  
  const goToNextStepAfterQuiz = (
    finalIeScores: Record<IE, number>,
    finalPosSignatures: Record<ModelPosition, Record<IE, number>>
  ) => {
    const matches = calculateTypeMatches(finalIeScores, finalPosSignatures);
    const topType = matches[0]?.type;

    if (["ILI"].includes(topType) && !hasSeenIliLiiLsiSplit) {
      setHasSeenIliLiiLsiSplit(true);
      setIsRecMode(true);
      setCurrentQId("q_ili_lii_lsi_split_1");
    } else if (["SLE"].includes(topType) && !hasSeenSleSplit) {
      setHasSeenSleSplit(true);
      setCurrentQId("q_sle_vs_see_1");
    } else if (["LIE", "LSE"].includes(topType) && !hasSeenTeSeSplit) {
      setHasSeenTeSeSplit(true);
      setCurrentQId("q_te_se_split_1");
    } else {
      triggerConfetti(); setStep("result");                      
    }
  };

  const handleSelectOption = (option: Option, customText?: string) => {
    playClickSound();
    const qText = QUESTIONS[currentQId]?.text || "特殊アクション";
    const newLogs = [
      ...actionLogs,
      { q: qText, a: customText || option.text, reason: option.reasonTag || "" },
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
      j: prev.j + (option.jpDelta?.j || 0),
      p: prev.p + (option.jpDelta?.p || 0),
    }));

    if (option.nextId && option.nextId !== "result") {
      setCurrentQId(option.nextId);
    } else {
      // テンポラリで加算後のスコアを算出
      let finalIeScores = { ...ieScores };
      let finalPosSignatures = JSON.parse(JSON.stringify(posSignatures));
      
      if (option.ieDeltas) {
        Object.entries(option.ieDeltas).forEach(([ieKey, val]) => {
          const ie = ieKey as IE;
          finalIeScores[ie] = (finalIeScores[ie] || 0) + (val || 0);
        });
      }
      if (option.positionDeltas) {
        Object.entries(option.positionDeltas).forEach(([posKey, ieDeltas]) => {
          const pos = posKey as ModelPosition;
          if (ieDeltas) {
            Object.entries(ieDeltas).forEach(([ieKey, delta]) => {
              const ie = ieKey as IE;
              finalPosSignatures[pos][ie] = (finalPosSignatures[pos][ie] || 0) + (delta || 0);
            });
          }
        });
      }

      goToNextStepAfterQuiz(finalIeScores, finalPosSignatures);
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
      goToNextStepAfterQuiz(ieScores, posSignatures);
    } else {
      setCurrentQId(nextId);
    }
  };

  // 戻るボタンのハンドリング
  
  const handleApproximateSelect = (selectedType: SocionicsType, text: string) => {
    const model = MODEL_A_DEFINITIONS[selectedType];
    if (!model) return;
    
    const nextIeScores = { ...ieScores };
    const nextPosSignatures = JSON.parse(JSON.stringify(posSignatures));

    const weights: Record<ModelPosition, number> = {
      leading: 3.0, creative: 2.5, role: 1.0, vulnerable: -1.0,
      suggestive: 1.0, activating: 1.5, ignoring: 0, demonstrative: 1.0,
    };
    
    Object.entries(model).forEach(([posStr, ieStr]) => {
      const pos = posStr as ModelPosition;
      const ie = ieStr as IE;
      const w = weights[pos];
      nextIeScores[ie] = (nextIeScores[ie] || 0) + w;
      nextPosSignatures[pos][ie] = (nextPosSignatures[pos][ie] || 0) + w;
    });

    setIeScores(nextIeScores);
    setPosSignatures(nextPosSignatures);

    const qText = SOCIONICS_16TYPE_5QUESTIONS_V2[approximateQIndex].text;
    setActionLogs((prev) => [...prev, { q: qText, a: text, reason: "近似タイプ診断" }]);

    if (approximateQIndex + 1 < SOCIONICS_16TYPE_5QUESTIONS_V2.length) {
      setApproximateQIndex((prev) => prev + 1);
    } else {
      triggerConfetti();
      setStep("result");
    }
  };

  const handleGoBack = () => {
    if (history.length === 0) {
      setStep("mbti_input");
      return;
    }
    if (currentQId.startsWith("q_ili_lii_lsi_split")) {
      setIsRecMode(false);
      setHasSeenIliLiiLsiSplit(false);
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
      // スマホでもPCでも、画面に表示されている自然なサイズでキャプチャし、余白が広がりすぎるのを防ぐ
      const dataUrl = await toPng(resultCardRef.current, {
        cacheBust: true,
        backgroundColor: "#f8fafc",
        pixelRatio: 2,
      });
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        setGeneratedImageUrl(dataUrl);
      } else {
        const link = document.createElement("a");
        link.download = `socio_modelA_result_${new Date().getTime()}.png`;
        link.href = dataUrl;
        link.click();
      }
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
  const calculateTypeMatches = (
    overrideIeScores = ieScores,
    overridePosSignatures = posSignatures
  ): Array<{
    type: SocionicsType;
    score: number;
  }> => {
    const results: Array<{ type: SocionicsType; score: number }> = [];

    (Object.keys(MODEL_A_DEFINITIONS) as SocionicsType[]).forEach((tKey) => {
      const def = MODEL_A_DEFINITIONS[tKey];
      let fitScore = 0;

      POSITIONS_ARRAY.forEach((pos) => {
        const targetIE = def[pos];
        const iePoints = overrideIeScores[targetIE] || 0;
        const posSigPoints = overridePosSignatures[pos]?.[targetIE] || 0;

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

  const shuffledOptions = useMemo(() => {
    if (!currentQ || !currentQ.options) return [];
    const opts = [...currentQ.options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [currentQId, currentQ]);

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

  const isGlitchMode = step === "quiz" && isRecMode;

  const getProgressPercentage = () => {
    if (step === "result") return 100;
    if (step === "approximate") {
      return 75 + Math.round((approximateQIndex / 5) * 24);
    }
    if (step === "quiz") {
      const match = currentQId.match(/^q(\d+)$/);
      if (match) {
        const num = parseInt(match[1]);
        return Math.round((num / 12) * 60); // q1~q12 for 0-60%
      }
      const splitMatch = currentQId.match(/split_(\d+)/);
      if (splitMatch) {
        const num = parseInt(splitMatch[1]);
        return 60 + Math.round((num / 5) * 15);
      }
      const perceptionMatch = currentQId.match(/perception_(\d+)/);
      if (perceptionMatch) {
        const num = parseInt(perceptionMatch[1]);
        return 60 + Math.round((num / 2) * 15);
      }
      if (currentQId.includes("q_romantic_style") || currentQId.includes("q_suggestive_mobilizing") || currentQId.includes("q_mobilizing")) {
        return 60 + 10;
      }
      if (currentQId.includes("q_sle_vs_see") || currentQId.includes("q_see_iee_deep") || currentQId.includes("q_iei_sei_deep") || currentQId.includes("q_eii_esi_deep")) {
        return 60 + 5;
      }
      return 70;
    }
    return 0;
  };

  const shuffledApproximateOptions = useMemo(() => {
    if (step !== "approximate") return [];
    const opts = SOCIONICS_16TYPE_5QUESTIONS_V2[approximateQIndex].options
      .filter((opt) => topCandidates.includes(opt.result as SocionicsType));
    
    // Fisher-Yates shuffle
    const shuffled = [...opts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [step, approximateQIndex, topCandidates]);

  return (
    <div className={`min-h-screen relative overflow-x-hidden flex flex-col justify-between font-sans transition-colors duration-1000 ${
      isGlitchMode 
        ? 'bg-black text-red-500 selection:bg-red-900 selection:text-red-100'
        : 'bg-watercolor-dream text-slate-800 selection:bg-pink-500 selection:text-slate-900'
    }`}>
      <AnimatePresence>
        {generatedImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-2xl shrink-0">
                <p className="font-bold text-slate-800 text-sm">画像を長押しして保存してください</p>
                <button
                  onClick={() => setGeneratedImageUrl(null)}
                  className="p-2 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-700" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-slate-100 flex justify-center rounded-b-2xl">
                <img src={generatedImageUrl} alt="診断結果" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* サウンドコントロール */}
      <button 
        onClick={() => setIsSoundEnabled(!isSoundEnabled)} 
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/50 backdrop-blur-sm border border-slate-300 text-slate-600 hover:bg-white/80 transition-all cursor-pointer shadow-sm"
        title={isSoundEnabled ? "サウンドON" : "サウンドOFF"}
      >
        {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 opacity-50" />}
      </button>
      {isGlitchMode && (
        <div className="fixed inset-0 pointer-events-none z-[100] border-[8px] border-red-600/30 flex p-6">
          <div className="absolute top-6 left-6 text-red-500 font-mono font-bold animate-pulse text-xl flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" /> REC
          </div>
          <div className="absolute bottom-6 right-6 text-red-500/50 font-mono text-sm">
            INTERCOM OVERRIDE ACTIVE
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
        </div>
      )}

      {/* 水彩風ぼかしグラデーション背景 */}
      {!isGlitchMode && <div className="fixed inset-0 watercolor-blobs z-0"></div>}

      {/* 舞い散る花びら */}
      {!isGlitchMode && (
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
      )}

      {/* 🐛 LSI芋虫マスコット */}
      {!isGlitchMode && caterpillarVisible && (
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
      <header className={`relative z-10 w-full max-w-4xl mx-auto p-4 flex items-center justify-between ${isGlitchMode ? 'opacity-0 pointer-events-none' : ''}`}>
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
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={handleGoBack}
              className="px-3.5 py-1.5 bg-slate-100/90 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all border border-pink-400/50 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-pink-600" />
              前へ
            </button>
            <button
              onClick={handleSkipQuestion}
              className="px-3 py-1.5 bg-slate-100/60 hover:bg-slate-200/80 text-slate-600 rounded-full text-xs flex items-center gap-1 transition-colors border border-slate-400/40"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>スキップ</span>
            </button>
            
            <div className="flex items-center gap-2 flex-1 min-w-[120px] max-w-[200px]">
              <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden border border-slate-300">
                <div 
                  className="bg-pink-400 h-full transition-all duration-500 ease-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <div className="text-xs font-bold text-slate-500 w-[32px] text-right">
                {getProgressPercentage()}%
              </div>
            </div>
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
              <h1 className="font-serif text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-slate-900 drop-shadow-[0_4px_12px_rgba(14,165,233,0.2)] text-slate-800">
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
              
              <div className="mt-12 pt-8 border-t border-slate-300/50 flex justify-center">
                <button
                  onClick={() => { playClickSound(); setStep("approximate_select"); }}
                  className="px-6 py-3 bg-white/70 hover:bg-sky-100 border border-slate-300 hover:border-sky-400 text-slate-700 font-bold rounded-full shadow-sm transition-all cursor-pointer"
                >
                  🔮 16タイプから直接選ぶ (近似診断)
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: 自認MBTI入力画面 */}
                    {/* STEP: 16タイプ選択 (近似診断) */}
          {step === "approximate_select" && (
            <motion.div
              key="approximate_select"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-2xl glass-card p-6 md:p-10 rounded-3xl border border-white/50 shadow-2xl relative"
            >
              <button
                onClick={() => { playClickSound(); setStep("title"); }}
                className="absolute top-4 left-4 p-2 bg-white/50 hover:bg-white/80 rounded-full text-slate-600 transition-colors"
              >
                ← 戻る
              </button>
              
              <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mb-2 mt-4 text-center">
                🔮 近似タイプ診断
              </h2>
              <p className="text-sm text-slate-600 mb-8 text-center">
                最大4つまでタイプを選択して比較できます。
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto mb-8">
                {Object.keys(MODEL_A_DEFINITIONS).map(type => {
                   const isSelected = selectedApproxTypes.includes(type as SocionicsType);
                   return (
                     <button
                        key={type}
                        onClick={() => {
                           playClickSound();
                           if (isSelected) {
                             setSelectedApproxTypes(selectedApproxTypes.filter(t => t !== type));
                           } else if (selectedApproxTypes.length < 4) {
                             setSelectedApproxTypes([...selectedApproxTypes, type as SocionicsType]);
                           }
                        }}
                        className={`px-4 py-2 font-bold rounded-xl text-sm transition-all shadow-sm cursor-pointer border ${
                          isSelected 
                            ? "bg-pink-500 text-white border-pink-600 shadow-pink-500/30 scale-105" 
                            : "bg-white/70 hover:bg-sky-100 border-slate-300 hover:border-sky-400 text-slate-700"
                        }`}
                     >
                        {type}
                     </button>
                   );
                })}
              </div>
              
              <div className="text-center h-16">
                <AnimatePresence>
                  {selectedApproxTypes.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onClick={() => {
                         playClickSound();
                         setTopCandidates(selectedApproxTypes);
                         setStep("approximate");
                         setApproximateQIndex(0);
                      }}
                      className="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full shadow-lg shadow-sky-500/30 transition-all cursor-pointer"
                    >
                      選択したタイプで決戦開始！
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

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
                MBTI（16タイプ）またはソシオニクスタイプを入力してね。診断結果で Model A
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
                        {(rawMbtiInput.match(/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP)/i)?.[1] || rawMbtiInput.match(/(ILE|SEI|ESE|LII|EIE|LSI|SLE|IEI|SEE|ILI|LIE|ESI|LSE|EII|IEE|SLI)/i)?.[1])?.toUpperCase() || "特定中（未検出）"}
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
          
          {step === "approximate" && (
            <motion.div
              key="approximate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-2xl"
            >
              <div className="glass-card p-6 md:p-9 rounded-3xl border border-sky-300/50 shadow-2xl relative overflow-hidden">
                <div className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-300/50 text-sky-600 text-xs font-bold mb-4">
                  🔍 最終調整：近似タイプ決戦 ({approximateQIndex + 1}/5)
                </div>
                <p className="font-serif text-lg md:text-xl font-medium leading-relaxed mb-8 text-slate-800 whitespace-pre-wrap">
                  {SOCIONICS_16TYPE_5QUESTIONS_V2[approximateQIndex].text.replace(/{NAME}/g, displayName)}
                </p>
                <div className="space-y-3">
                  {shuffledApproximateOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleApproximateSelect(opt.result as SocionicsType, opt.text)}
                        className="w-full text-left p-5 rounded-2xl border border-slate-300 bg-slate-100/80 hover:bg-slate-200/90 hover:border-sky-400 transition-all flex items-center justify-between group shadow-md cursor-pointer"
                      >
                        <span className="text-sm md:text-base leading-relaxed font-normal text-slate-800">
                          {opt.text.replace(/{NAME}/g, displayName)}
                        </span>
                        <Sparkles className="w-5 h-5 text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                      </button>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div
              key={currentQId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-2xl"
            >
              <div className={`p-6 md:p-9 rounded-3xl border shadow-2xl relative overflow-hidden ${
                isGlitchMode 
                  ? 'bg-red-950/80 border-red-500/50 text-red-100' 
                  : 'glass-card border-pink-300/50 text-slate-800'
              }`}>
                {isRecMode && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 bg-red-900/40 border border-red-500/50 rounded-2xl text-red-200 shadow-inner"
                  >
                    <div className="font-bold mb-1 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-red-400" /> Darling (Intercom Mode)
                    </div>
                    <div className="text-sm leading-relaxed">
                      「あら、ダーリン。やっぱりあなた、そっち側の人間だったのね。…ふふっ、ここからは私が直接聞いてあげるわ。逃がさないから、素直に答えなさい？」
                    </div>
                  </motion.div>
                )}

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
                      {shuffledOptions.map((opt, idx) => {
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
                      {shuffledOptions.map((opt, idx) => {
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
                ) : currentQ?.type === "game_intercom" ? (
                  /* 🥺 突発襲来：ダーリンちゃんインターフォンギミック */
                  <div className="text-center relative">
                    <div className="inline-block px-3.5 py-1 rounded-full bg-red-900/50 border border-red-500/50 text-red-400 text-xs font-bold mb-6">
                      {currentQ.categoryTag}
                    </div>
                    
                    <div className="relative w-56 h-56 mx-auto mb-8 rounded-full border-[10px] border-[#1a1a1a] overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.4)] cursor-pointer group"
                         onClick={() => {
                            // ピンポーン音
                            if (isSoundEnabled) {
                              try {
                                const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                const osc = audioCtx.createOscillator();
                                const gain = audioCtx.createGain();
                                osc.type = 'sine';
                                osc.connect(gain);
                                gain.connect(audioCtx.destination);
                                
                                osc.frequency.setValueAtTime(880, audioCtx.currentTime);
                                gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
                                osc.start();
                                
                                setTimeout(() => {
                                  if(osc.frequency) osc.frequency.setValueAtTime(659.25, audioCtx.currentTime);
                                }, 300);
                                
                                setTimeout(() => {
                                  if(gain.gain) gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
                                  osc.stop(audioCtx.currentTime + 0.1);
                                }, 800);
                              } catch (e) {
                                console.log("WebAudio blocked");
                              }
                            }
                         }}>
                         
                      {/* 魚眼レンズ（ドアスコープ）エフェクト強化版 */}
                      <div className="absolute inset-0 bg-black/60 z-20 pointer-events-none rounded-full" style={{ boxShadow: 'inset 0 0 80px rgba(0,0,0,1)' }}></div>
                      <div className="absolute inset-0 z-30 pointer-events-none rounded-full opacity-50" style={{ background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 25%)' }}></div>
                      <div className="absolute inset-0 z-30 pointer-events-none rounded-full opacity-20 mix-blend-overlay" style={{ backgroundImage: 'repeating-radial-gradient(circle at center, transparent 0, transparent 2px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)' }}></div>
                      
                      {/* ダーリンちゃん */}
                      <div className="absolute inset-0 flex items-center justify-center transform scale-[1.3] group-hover:scale-[1.8] transition-transform duration-1000 z-10">
                        <motion.span 
                          animate={{ rotate: [-2, 2, -2] }}
                          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                          className="text-[140px] drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                        >🥺</motion.span>
                      </div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-red-950/80 p-5 rounded-2xl border border-red-500/30 mb-8 inline-block max-w-sm"
                    >
                      <p className="font-serif text-lg md:text-xl font-bold leading-relaxed text-red-100 text-left">
                        <span className="text-red-500 text-sm mb-2 block">（ピンポーン）</span>
                        ダーリンちゃん<br/>
                        「ねぇ、ダーリン♡<br/>
                        ……ねぇ、一緒に住まない？」
                      </p>
                    </motion.div>
                    
                    <div className="space-y-4 max-w-sm mx-auto">
                       <button
                          onClick={() => setShowDarlingEnding(true)}
                          className="w-full py-4 rounded-xl font-bold transition-all bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] cursor-pointer"
                        >
                          {currentQ.options[0].text}
                        </button>
                        
                        <div className="relative mt-6 pt-6 border-t border-red-900/50">
                          {showSmartphoneInput ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="bg-slate-900 p-4 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden"
                            >
                              <div className="absolute top-0 left-0 w-full h-6 bg-black flex justify-center items-center">
                                <div className="w-16 h-1.5 bg-slate-800 rounded-full"></div>
                              </div>
                              <p className="text-slate-400 text-xs mt-4 mb-2">緊急通報ダイヤル</p>
                              <div className="flex gap-2">
                                <input
                                  type="tel"
                                  value={smartphoneInput}
                                  onChange={(e) => setSmartphoneInput(e.target.value)}
                                  placeholder="番号を入力..."
                                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white font-mono text-xl focus:outline-none focus:border-red-500 min-w-0"
                                />
                                <button
                                  onClick={() => {
                                    if (smartphoneInput === "110") {
                                      if (isSoundEnabled) {
                                        try {
                                          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                          const osc = audioCtx.createOscillator();
                                          osc.type = 'sine';
                                          osc.connect(audioCtx.destination);
                                          osc.frequency.setValueAtTime(400, audioCtx.currentTime);
                                          osc.start();
                                          setTimeout(() => osc.stop(), 500);
                                        } catch(e){}
                                      }
                                      setDarlingEndingState("police");
                                      setShowDarlingEnding(true);
                                      setTimeout(() => { triggerCaterpillarInvasion("🐛"); }, 1500);
                                    } else if (smartphoneInput === "119") {
                                      if (isSoundEnabled) {
                                        try {
                                          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                          const osc = audioCtx.createOscillator();
                                          osc.type = 'sine';
                                          osc.connect(audioCtx.destination);
                                          osc.frequency.setValueAtTime(400, audioCtx.currentTime);
                                          osc.start();
                                          setTimeout(() => osc.stop(), 500);
                                        } catch(e){}
                                      }
                                      setDarlingEndingState("fire");
                                      setShowDarlingEnding(true);
                                      triggerCaterpillarInvasion("🚒🐛");
                                    } else {
                                      if (isSoundEnabled) {
                                        try {
                                          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                                          const osc = audioCtx.createOscillator();
                                          osc.type = 'sine';
                                          osc.connect(audioCtx.destination);
                                          osc.frequency.setValueAtTime(400, audioCtx.currentTime);
                                          osc.start();
                                          setTimeout(() => osc.stop(), 500);
                                        } catch(e){}
                                      }
                                      setDarlingEndingState("police");
                                      setShowDarlingEnding(true);
                                      triggerCaterpillarInvasion("🐛");
                                    }
                                  }}
                                  className="px-6 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold cursor-pointer transition-colors shrink-0"
                                >
                                  発信
                                </button>
                              </div>
                            </motion.div>
                          ) : (
                            <button
                              onClick={() => setShowSmartphoneInput(true)}
                              className="w-full py-4 rounded-xl font-bold transition-all bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 flex items-center justify-center gap-2 cursor-pointer group"
                            >
                              <Smartphone className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                              <span>スマホを取り出す</span>
                            </button>
                          )}
                        </div>
                    </div>
                  </div>
                ) : currentQ?.type === "text_input" ? (
                  /* テキスト入力型質問 */
                  <div>
                    {currentQ.categoryTag && (
                      <div className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold mb-4 border ${
                        isGlitchMode 
                          ? 'bg-red-900/50 border-red-500/50 text-red-400' 
                          : 'bg-sky-50 border-pink-300/50 text-pink-600'
                      }`}>
                        {currentQ.categoryTag}
                      </div>
                    )}
                    <p className={`font-serif text-lg md:text-xl font-medium leading-relaxed mb-8 whitespace-pre-wrap ${
                      isGlitchMode ? 'text-red-100' : 'text-slate-800'
                    }`}>
                      {currentQ.text.replace(/{NAME}/g, displayName)}
                    </p>
                    <div className="space-y-3.5 mb-6">
                      <textarea
                        className="w-full p-4 rounded-xl border border-red-500/50 bg-red-950/50 text-red-100 placeholder-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows={4}
                        placeholder="（正直に書きなさい……）"
                        value={textInputValue}
                        onChange={(e) => setTextInputValue(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                       <button
                          onClick={() => {
                             handleSelectOption(currentQ.options[0], textInputValue || "（無言）");
                             setTextInputValue("");
                          }}
                          className="px-6 py-3 rounded-xl font-bold transition-all bg-red-600 hover:bg-red-500 text-white cursor-pointer shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                        >
                          {currentQ.options[0].text}
                        </button>
                    </div>
                  </div>
                ) : currentQ ? (
                  /* 標準の心理質問 */
                  <div>
                    {currentQ.categoryTag && (
                      <div className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold mb-4 border ${
                        isGlitchMode 
                          ? 'bg-red-900/50 border-red-500/50 text-red-400' 
                          : 'bg-sky-50 border-pink-300/50 text-pink-600'
                      }`}>
                        {currentQ.categoryTag}
                      </div>
                    )}

                    <p className={`font-serif text-lg md:text-xl font-medium leading-relaxed mb-8 whitespace-pre-wrap ${
                      isGlitchMode ? 'text-red-100' : 'text-slate-800'
                    }`}>
                      {currentQ.text.replace(/{NAME}/g, displayName)}
                    </p>

                    <div className="space-y-3.5">
                      {shuffledOptions.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(opt)}
                          className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between group shadow-md cursor-pointer ${
                            isGlitchMode 
                              ? 'bg-red-900/30 border-red-500/30 hover:bg-red-900/60 hover:border-red-500 text-red-200' 
                              : 'border-slate-300 bg-slate-100/80 hover:bg-slate-200/90 hover:border-pink-400 text-slate-800'
                          }`}
                        >
                          <span className="text-sm md:text-base leading-relaxed font-normal">
                            {opt.text.replace(/{NAME}/g, displayName)}
                          </span>
                          <Sparkles className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2 ${
                            isGlitchMode ? 'text-red-400' : 'text-pink-500'
                          }`} />
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
                  <div className="w-11 h-11 rounded-full bg-pink-900/20 border border-pink-500/40 flex items-center justify-center shrink-0 shadow-md text-lg">
                    🥺
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl rounded-tl-none border border-pink-900/30 flex-1 shadow-lg backdrop-blur-sm">
                    <p className="text-xs text-pink-400 font-bold mb-1.5 flex items-center gap-1">
                      <span>🥺 ダーリンちゃん</span>
                      <span className="text-[10px] font-normal text-slate-500">（Fe観測インターフェース）</span>
                    </p>
                    <div className="text-slate-200 text-sm leading-relaxed space-y-2">
                      <p>
                        あら、{displayName}♡ くだらない不条理な試練、よく最後まで耐え切ったわね♡ 
                      </p>
                      <p className="text-xs text-slate-400">
                        {detectedMbti ? (
                          <>
                            あなたの自認は『
                            <span className="font-semibold text-sky-400 underline decoration-sky-500/30">
                              {detectedMbti}
                            </span>
                            』よね♡
                          </>
                        ) : (
                          <>（あら……自認すら隠して、本音を覆い隠すタイプなのね♡）</>
                        )}
                      </p>
                      <p className="pt-1 border-t border-slate-800">
                        Model Aの8ポジション配置構造を解剖して、あなたの仮面の奥の“本音”を剥ぎ取った結果……
                        <br />
                        最も適合したのは『
                        <span className="font-bold text-pink-400 text-base underline decoration-pink-500/50">
                          {topMeta.name}
                        </span>
                        』だったわ♡
                      </p>
                    </div>
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
                        {feedbackSent ? (
                           <div className="text-xs text-slate-700 leading-relaxed bg-pink-50/80 p-3 rounded-lg border border-pink-200 shadow-inner">
                             <p className="font-bold text-pink-600 mb-1">🥺 ダーリンちゃん</p>
                             <p>『あら、ダーリン♡ 随分と長文で必死な『Jの言い訳（ログ）』を送信してくれたのね？<br/>
                             『計画は立てている』『社会的にはJとして振る舞っている』『周囲の状況が非合理的なだけだ』……ふふ♡ 自分の内側にある『柔軟な諦観（P）』を隠すために、必死で外枠の論理（J）を補強しようとするその不器用さ……すごく愛おしいわ。<br/><br/>
                             ねぇ、ダーリン♡ あなたが一生懸命に構築したその『計画（J）』って、本当は“予期せぬ変化（P）に振り回されるエネルギーを節約したいだけ”の防衛本能（4F）なんじゃないかしら？<br/>
                             『私はJだ』って謂ったって、本当は私のこの理不尽な構造の中で、計画を無計画に崩される快感に浸っているんでしょ？♡<br/>
                             ……ふふ。送信されたその言い訳、あなたの『本音』と『演出』の比率を解析して、私のトランプの城の壁紙にしておくわね♡』</p>
                           </div>
                        ) : (
                          <>
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
                            disabled={isSending}
                            onClick={async (e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (input.value) {
                                setIsSending(true);
                                try {
                                  // GASフェッチ（エラーは握り潰す）
                                  await fetch("https://script.google.com/macros/s/AKfycbyKNxuGhZqSwUCZTfAcjbHmdETzMs_-qzz8nOSZukc8mParcejIPA3U2zQzxqN1MUrK0g/exec", {
                                    method: "POST",
                                    mode: "no-cors",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                      displayName: displayName,
                                      mbti: detectedMbti,
                                      result: topMeta?.name,
                                      feedback: input.value,
                                      logs: actionLogs
                                    })
                                  });
                                } catch(e){}
                                setFeedbackSent(true);
                                setIsSending(false);
                                input.value = "";
                              }
                            }}
                            className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                          >
                            {isSending ? "送信中..." : "送信"}
                          </button>
                        </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>{" "}
              {/* End of resultCardRef */}
              {/* 煽りボタン (近似診断へ) */}
              <div className="flex flex-col gap-4 mt-6 mb-6">
                <button
                  onClick={() => {
                    setTopCandidates(calculatedMatches.slice(0, 4).map(m => m.type));
                    setStep("approximate");
                    setApproximateQIndex(0);
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }}
                  className="w-full py-4 rounded-xl font-bold bg-pink-100 hover:bg-pink-200 text-pink-700 transition-colors shadow-md border border-pink-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="text-xl">🥺</span>
                  <span>上位4つの近似タイプと比べる（精密決戦）</span>
                </button>
              </div>
              
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
                    setIsRecMode(false);
                    setHasSeenIliLiiLsiSplit(false);
                    setTrashItems([
  { id: 1, icon: "📄", label: "古い資料", x: 20, y: 35 },
  { id: 2, icon: "🥫", label: "空き缶", x: 75, y: 25 },
  { id: 3, icon: "🍟", label: "食べカス", x: 45, y: 65 },
  { id: 4, icon: "📝", label: "メモ用紙", x: 80, y: 70 },
  { id: 5, icon: "🧃", label: "紙パック", x: 18, y: 70 },
]);
                    setCleanedCount(0);
                    setPlantStage(0);
                    setChappyTension(3);
                    setChappyReaction(null);
                    setSelectedChappyOpt(null);
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

        {/* 退出確認モーダル */}
        <AnimatePresence>
          {isExitModalOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl max-w-sm w-full border border-pink-200"
              >
                <h3 className="font-bold text-lg md:text-xl mb-3 text-slate-800">診断を終了しますか？</h3>
                <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                  ここまでの回答履歴はすべてリセットされ、タイトル画面へ戻ります。
                </p>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setIsExitModalOpen(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors cursor-pointer text-sm">
                    キャンセル
                  </button>
                  <button onClick={() => { setIsExitModalOpen(false); resetState(); }} className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold transition-colors shadow-md cursor-pointer text-sm">
                    終了する
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ダーリンちゃん 一緒に住もう ギミック */}
        <AnimatePresence>
          {showDarlingEnding && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-red-950 z-[200] flex items-center justify-center p-4 overflow-hidden"
            >
              {/* ホラーな背景演出 */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-30 animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-2 bg-red-600 animate-ping" />
              
              <motion.div 
                initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="relative z-10 max-w-md w-full bg-black/80 border border-red-600/50 p-8 rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.5)] text-center"
              >
                <div className="text-6xl mb-6 animate-bounce">🥺</div>
                <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-6 leading-relaxed font-serif">
                  ねぇ、ダーリン♡<br/>
                  一緒に住もう♡
                </h2>
                <p className="text-red-200/80 text-sm mb-10 leading-loose">
                  もう言い訳は十分聞いたわ。<br/>
                  あなたがどれだけPっぽくても、非合理でも、<br/>
                  私が全部管理してあげるから。<br/>
                  <br/>
                  ……逃がさないからね？
                </p>
                
                
                {showNextAfterInvasion ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 mt-8">
                    <button onClick={() => {
                      setShowNextAfterInvasion(false);
                      setShowDarlingEnding(false);
                      if (QUESTIONS["q_darling_intercom"] && QUESTIONS["q_darling_intercom"].options) {
                        handleSelectOption(QUESTIONS["q_darling_intercom"].options[0]);
                      } else {
                        triggerConfetti();
                        setStep("result");
                      }
                    }} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.8)] transition-all cursor-pointer">
                      次へ
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {darlingEndingState === "initial" && (
                      <>
                        <button onClick={() => {
                            setDarlingEndingState("invading");
                            triggerCaterpillarInvasion("🐛");
                        }} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.8)] transition-all cursor-pointer">
                          はい、住みます……♡ (占領を許可する)
                        </button>
                        
                      </>
                    )}
                    {darlingEndingState === "invading" && (
                      <div className="text-red-500 font-bold animate-pulse text-lg py-4">
                        占領プロセスを実行中……
                      </div>
                    )}
                    {(darlingEndingState === "police" || darlingEndingState === "fire") && (
                      <div className="text-red-500 font-bold text-sm text-left border border-red-900 bg-red-950/50 p-4 rounded-xl leading-relaxed">
                        【SYSTEM ERROR 404】<br/><br/>
                        {darlingEndingState === "police" ? "通報は遮断されました。" : "消防車ではなく……芋虫消防車が到着しました。🚒🐛"}<br/>
                        {darlingEndingState === "police" && "侵入者はあなたの【防衛本能】そのものです。"}<br/><br/>
                        {darlingEndingState === "police" && <span className="text-pink-400">※即座に境界線を確保してください。</span>}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


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