const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `              <div className="mt-12 pt-8 border-t border-slate-300/50">
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
              </div>`;

const replacement = `              <div className="mt-12 pt-8 border-t border-slate-300/50">
                <p className="text-sm font-bold text-slate-600 mb-4">🔮 直接「精密決戦」へ進む (近似タイプ診断)</p>
                <p className="text-xs text-slate-500 mb-4">最大4つまでタイプを選択して比較できます。</p>
                
                <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto mb-6">
                  {Object.keys(MODEL_A_DEFINITIONS).map(type => {
                     const isSelected = selectedApproxTypes.includes(type as SocionicsType);
                     return (
                       <button
                          key={type}
                          onClick={() => {
                             if (isSelected) {
                               setSelectedApproxTypes(selectedApproxTypes.filter(t => t !== type));
                             } else if (selectedApproxTypes.length < 4) {
                               setSelectedApproxTypes([...selectedApproxTypes, type as SocionicsType]);
                             }
                          }}
                          className={\`px-3 py-1.5 font-bold rounded-lg text-sm transition-all shadow-sm cursor-pointer border \${
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
                
                {selectedApproxTypes.length > 0 && (
                  <button
                    onClick={() => {
                       setTopCandidates(selectedApproxTypes);
                       setStep("approximate");
                       setApproximateQIndex(0);
                    }}
                    className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full shadow-lg transition-all animate-fade-in cursor-pointer"
                  >
                    選択したタイプで決戦開始！
                  </button>
                )}
              </div>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Updated approx selector logic");
} else {
    console.log("Could not find approx selector");
}
