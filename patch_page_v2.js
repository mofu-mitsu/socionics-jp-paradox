const fs = require('fs');

let code = fs.readFileSync('app/page.tsx', 'utf-8');

// 1. imports
code = code.replace(
  'import { QUESTIONS, Option, Question } from "@/lib/questions";',
  'import { QUESTIONS, Option, Question } from "@/lib/questions";\nimport { SOCIONICS_16TYPE_5QUESTIONS_V2 } from "@/lib/questions_v2";\nimport { LogOut } from "lucide-react";'
);

// 2. step and new states
code = code.replace(
  /const \[step, setStep\] = useState<\n\s*"title" \| "mbti_input" \| "quiz" \| "result"\n\s*>\("title"\);/g,
  `const [step, setStep] = useState<
    "title" | "mbti_input" | "quiz" | "approximate" | "result"
  >("title");
  
  // 近似タイプ診断用
  const [approximateQIndex, setApproximateQIndex] = useState(0);
  const [topCandidates, setTopCandidates] = useState<SocionicsType[]>([]);
  
  // 退出確認モーダル
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  
  // ダーリンちゃんエンディング
  const [showDarlingEnding, setShowDarlingEnding] = useState(false);
  `
);
code = code.replace(
  /const \[step, setStep\] = useState<[^>]+>\("title"\);/,
  `const [step, setStep] = useState<"title" | "mbti_input" | "quiz" | "approximate" | "result">("title");
  const [approximateQIndex, setApproximateQIndex] = useState(0);
  const [topCandidates, setTopCandidates] = useState<SocionicsType[]>([]);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [showDarlingEnding, setShowDarlingEnding] = useState(false);`
); // fallback

// 3. handleMbtiSubmit
code = code.replace(
  /const match = rawMbtiInput.match\(\n\s*\/\^\[EIei\]\[SNsn\]\[TFtf\]\[JPjp\]\$\/\n\s*\);/g,
  `const match = rawMbtiInput.match(/\\b([EIei][SNsn][TFtf][JPjp])\\b|\\b([ESILesil][LEIlei][EITeit])\\b/i);`
);
code = code.replace(
  /const match = rawMbtiInput.match\(\/\^\[EI\]\[SN\]\[TF\]\[JP\]\$\/i\);/g,
  `const match = rawMbtiInput.match(/\\b([EIei][SNsn][TFtf][JPjp])\\b|\\b([ESILesil][LEIlei][EITeit])\\b/i);`
);
code = code.replace(
  /setDetectedMbti\(match\[0\]\.toUpperCase\(\)\);/g,
  `setDetectedMbti((match[1] || match[2]).toUpperCase());`
);

// 4. resetState function
const resetStateFunc = `
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
    setApproximateQIndex(0);
    setTopCandidates([]);
    setShowDarlingEnding(false);
  };
`;
code = code.replace('const handleMbtiSubmit = () => {', resetStateFunc + '\n  const handleMbtiSubmit = () => {');

// 5. replace manual setStep("result") with goToNextStepAfterQuiz
const goToNextFunc = `
  const goToNextStepAfterQuiz = (
    finalIeScores: Record<IE, number>,
    finalPosSignatures: Record<ModelPosition, Record<IE, number>>
  ) => {
    const matches = calculateTypeMatches(finalIeScores, finalPosSignatures);
    const topType = matches[0]?.type;

    if (["ILI", "LII"].includes(topType) && !hasSeenIliLiiLsiSplit) {
      setHasSeenIliLiiLsiSplit(true);
      setIsRecMode(true);
      setCurrentQId("q_ili_lii_lsi_split_1");
    } else {
      const top4 = matches.slice(0, 4).map((m) => m.type);
      setTopCandidates(top4);
      setApproximateQIndex(0);
      setStep("approximate");
    }
  };
`;
code = code.replace('const handleSelectOption = (option: Option) => {', goToNextFunc + '\n  const handleSelectOption = (option: Option) => {');

// Replace in handleSubmitMultiple
code = code.replace(
  /const topType = calculateTypeMatches\(nextIeScores, nextPosSignatures\)\[0\]\?\.type;\s*if \(\["ILI", "LII", "LSI"\]\.includes\(topType\) && !hasSeenIliLiiLsiSplit\) \{\s*setHasSeenIliLiiLsiSplit\(true\);\s*setIsRecMode\(true\);\s*setCurrentQId\("q_ili_lii_lsi_split_1"\);\s*\} else \{\s*triggerConfetti\(\);\s*setStep\("result"\);\s*\}/g,
  `goToNextStepAfterQuiz(nextIeScores, nextPosSignatures);`
);

// Replace in handleSelectOption
code = code.replace(
  /const topType = calculateTypeMatches\(finalIeScores, finalPosSignatures\)\[0\]\?\.type;\s*if \(\["ILI", "LII", "LSI"\]\.includes\(topType\) && !hasSeenIliLiiLsiSplit\) \{\s*setHasSeenIliLiiLsiSplit\(true\);\s*setIsRecMode\(true\);\s*setCurrentQId\("q_ili_lii_lsi_split_1"\);\s*\} else \{\s*triggerConfetti\(\);\s*setStep\("result"\);\s*\}/g,
  `goToNextStepAfterQuiz(finalIeScores, finalPosSignatures);`
);

// Replace in handleSelectChappy
code = code.replace(
  /const topType = calculateTypeMatches\(ieScores, posSignatures\)\[0\]\?\.type;\s*if \(\["ILI", "LII", "LSI"\]\.includes\(topType\) && !hasSeenIliLiiLsiSplit\) \{\s*setHasSeenIliLiiLsiSplit\(true\);\s*setIsRecMode\(true\);\s*setCurrentQId\("q_ili_lii_lsi_split_1"\);\s*\} else \{\s*triggerConfetti\(\);\s*setStep\("result"\);\s*\}/g,
  `goToNextStepAfterQuiz(ieScores, posSignatures);`
);

// 6. Add handleApproximateSelect
const handleApproximateSelect = `
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
`;
code = code.replace('const handleGoBack = () => {', handleApproximateSelect + '\n  const handleGoBack = () => {');

// 7. Render: Header changes (Exit Button)
code = code.replace(
  /<header className=\{`relative z-10 w-full max-w-4xl mx-auto p-4 flex items-center justify-between \$\{isGlitchMode \? 'opacity-0 pointer-events-none' : ''\}`\}>/,
  `<header className={\`relative z-10 w-full max-w-4xl mx-auto p-4 flex items-center justify-between \${isGlitchMode ? 'opacity-0 pointer-events-none' : ''}\`}>`
);
code = code.replace(
  /<span className="font-bold text-slate-800 tracking-wide text-lg sm:text-xl">\s*ソシオJ\/Pねじれ診断\s*<\/span>/,
  `<span className="font-bold text-slate-800 tracking-wide text-lg sm:text-xl">
            ソシオJ/Pねじれ診断
          </span>
        </div>
        <div className="flex items-center gap-2">` // inject flex container for the right side
);
code = code.replace(
  /<button\s*onClick=\{handleGoBack\}\s*className="bg-white\/80 hover:bg-white text-slate-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm border border-pink-200 transition-colors flex items-center gap-2 cursor-pointer"\s*>\s*<ArrowLeft className="w-4 h-4" \/>\s*前の一間に戻る\s*<\/button>\s*<button\s*className="bg-white\/60 hover:bg-white text-slate-500 hover:text-slate-700 w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-sm border border-slate-200 cursor-pointer"\s*title="ピンと来ない"\s*>\s*<HelpCircle className="w-4 h-4" \/>\s*<span className="sr-only">ピンと来ない<\/span>\s*<\/button>/,
  `<button
            onClick={handleGoBack}
            className="bg-white/80 hover:bg-white text-slate-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm border border-pink-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            前の一間に戻る
          </button>
          <button
            className="bg-white/60 hover:bg-white text-slate-500 hover:text-slate-700 px-3 py-2 rounded-full flex items-center gap-2 transition-colors shadow-sm border border-slate-200 cursor-pointer text-xs font-bold"
            title="ピンと来ない"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">ピンと来ない</span>
          </button>
          {(step === "quiz" || step === "approximate" || step === "mbti_input") && (
            <button
              onClick={() => setIsExitModalOpen(true)}
              className="bg-white/60 hover:bg-red-50 text-slate-500 hover:text-red-600 px-3 py-2 rounded-full flex items-center gap-1 transition-colors shadow-sm border border-slate-200 cursor-pointer text-xs font-bold ml-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">退出</span>
            </button>
          )}`
);

// 8. Render: approximate step
const approximateRender = `
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
                  {SOCIONICS_16TYPE_5QUESTIONS_V2[approximateQIndex].options
                    .filter((opt) => topCandidates.includes(opt.result as SocionicsType))
                    .map((opt, idx) => (
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
`;
code = code.replace(
  /\{step === "quiz" && \(\s*<motion\.div/, 
  approximateRender + '\n          {step === "quiz" && (\n            <motion.div'
);

// 9. Modals (Exit + Darling)
const modalsStr = `
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
                
                <div className="flex flex-col gap-4">
                  <button onClick={() => alert("ダーリンちゃんが満面の笑みで婚姻届を出してきた！")} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.8)] transition-all cursor-pointer">
                    はい、住みます……♡
                  </button>
                  <button onClick={() => setShowDarlingEnding(false)} className="w-full py-4 bg-transparent border border-red-900 hover:bg-red-950 text-red-500/50 font-bold rounded-xl transition-all cursor-pointer">
                    逃げる
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
`;
code = code.replace(/<\/main>/, '</main>\n' + modalsStr);

// 10. Update result screen behavior to trigger Darling Ending
code = code.replace(
  /alert\("ダーリンちゃんに言い訳を送信したよ！♡"\);/g,
  `setShowDarlingEnding(true);`
);

// Fix replace issues
code = code.replace(/setStep\("title"\);[\s\S]*?setHistory\(\[\]\);/, '');

fs.writeFileSync('app/page.tsx', code);
console.log('Patched page.tsx');
