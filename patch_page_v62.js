const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `              <button
                onClick={() => setStep("mbti_input")}
                className="group relative inline-flex items-center justify-center px-9 py-4 text-lg font-bold text-slate-950 transition-all duration-300 bg-gradient-to-r from-sky-300 via-pink-300 to-purple-300 rounded-full shadow-lg shadow-pink-900/40 hover:shadow-pink-400/50 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>診断を始める</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>`;

const replacement = `              <button
                onClick={() => setStep("mbti_input")}
                className="group relative inline-flex items-center justify-center px-9 py-4 text-lg font-bold text-slate-950 transition-all duration-300 bg-gradient-to-r from-sky-300 via-pink-300 to-purple-300 rounded-full shadow-lg shadow-pink-900/40 hover:shadow-pink-400/50 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>診断を始める</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-12 pt-8 border-t border-slate-300/50">
                <p className="text-sm font-bold text-slate-600 mb-4">🔮 直接「精密決戦」へ進む (近似タイプ診断)</p>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                  {Object.keys(MODEL_A_DEFINITIONS).map(type => (
                     <button
                        key={type}
                        onClick={() => {
                           setTopCandidates([type as SocionicsType]);
                           setStep("approximate");
                           setApproximateQIndex(0);
                        }}
                        className="px-3 py-1.5 bg-white/70 hover:bg-sky-100 border border-slate-300 hover:border-sky-400 text-slate-700 font-bold rounded-lg text-sm transition-all shadow-sm cursor-pointer"
                     >
                        {type}
                     </button>
                  ))}
                </div>
              </div>
            </motion.div>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Replaced start button area");
} else {
    console.log("Could not find start button area");
}
