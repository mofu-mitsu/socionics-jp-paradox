const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

const uiCode = `
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
                        const isSelected = selectedMultipleOptions.includes(opt);
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleMultipleOption(opt)}
                            className={\`w-full text-left p-4 md:p-5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer \${
                              isSelected
                                ? "bg-pink-100/80 border-pink-400 ring-2 ring-pink-400/30 shadow-md"
                                : "bg-white/90 border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm"
                            }\`}
                          >
                            <div className={\`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors \${isSelected ? "bg-pink-500 text-white" : "bg-slate-200"}\`}>
                               {isSelected && "✓"}
                            </div>
                            <span className={\`leading-relaxed \${isSelected ? "text-slate-900 font-bold" : "text-slate-800"}\`}>
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
`;

content = content.replace(
  `                {currentQ?.type === "game_trash" ? (`,
  uiCode
);

fs.writeFileSync('app/page.tsx', content);
console.log("Updated UI");
