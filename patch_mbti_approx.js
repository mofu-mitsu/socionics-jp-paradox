const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Fix MBTI regex (just make sure LII etc are in it).
const mbtiRegex = /const match = rawMbtiInput\.match\([\s\S]*?\/i,/;
content = content.replace(mbtiRegex, 'const match = rawMbtiInput.match(/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP|ILE|SEI|ESE|LII|EIE|LSI|SLE|IEI|SEE|ILI|LIE|ESI|LSE|EII|IEE|SLI)/i,');

// Remove 16 types from title, create a dedicated button
const oldApproxTarget = /<div className="mt-12 pt-8 border-t border-slate-300\/50">[\s\S]*?選択したタイプで決戦開始！\s*<\/button>\s*\)\}\s*<\/div>/;

const newApproxButton = `<div className="mt-12 pt-8 border-t border-slate-300/50 flex justify-center">
                <button
                  onClick={() => { playClickSound(); setStep("approximate_select"); }}
                  className="px-6 py-3 bg-white/70 hover:bg-sky-100 border border-slate-300 hover:border-sky-400 text-slate-700 font-bold rounded-full shadow-sm transition-all cursor-pointer"
                >
                  🔮 16タイプから直接選ぶ (近似診断)
                </button>
              </div>`;

if (content.match(oldApproxTarget)) {
    content = content.replace(oldApproxTarget, newApproxButton);
}

// Add approximate_select step render
const approxSelectRender = `          {/* STEP: 16タイプ選択 (近似診断) */}
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
                        className={\`px-4 py-2 font-bold rounded-xl text-sm transition-all shadow-sm cursor-pointer border \${
                          isSelected 
                            ? "bg-pink-500 text-white border-pink-600 shadow-pink-500/30 scale-105" 
                            : "bg-white/70 hover:bg-sky-100 border-slate-300 hover:border-sky-400 text-slate-700"
                        }\`}
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
          )}`;

const mbtiInputRender = `{step === "mbti_input" && (`;
content = content.replace(mbtiInputRender, approxSelectRender + '\n\n          ' + mbtiInputRender);

// Also add "approximate_select" to step type definition
content = content.replace(/useState<"title" \| "mbti_input" \| "quiz" \| "approximate" \| "result">/, 'useState<"title" | "mbti_input" | "quiz" | "approximate" | "approximate_select" | "result">');

fs.writeFileSync('app/page.tsx', content);
