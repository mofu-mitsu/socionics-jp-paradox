const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const searchStr = `                )}

                {/* 行動ログ（コピー用） */}`;

const splitIdx = content.indexOf(searchStr);
if (splitIdx === -1) {
    console.log("Could not find split index");
    process.exit(1);
}

const beforeLogs = content.substring(0, splitIdx + 19);

// Find the end of the div
const divEndSearch = `                  </button>
                </div>
              </div>
            </motion.div>`;
const endIdx = content.indexOf(divEndSearch);
if (endIdx === -1) {
    console.log("Could not find end index");
    process.exit(1);
}

// We need to rewrite the logs and buttons section
const newSection = `
              </div> {/* End of resultCardRef */}

              {/* 行動ログ（コピー用） */}
              {actionLogs.length > 0 && (
                <div className="mt-6 p-6 rounded-3xl border border-pink-400/50 shadow-xl bg-white/90">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-700">📋 あなたの回答・行動ログ</h3>
                    <button
                      onClick={() => {
                        const logText = actionLogs.map((log, i) => \`\${i + 1}. \${log.q}\\n  -> \${log.a}\`).join('\\n\\n');
                        navigator.clipboard.writeText(\`【\${displayName}さんの診断ログ】\\n\\n\` + logText);
                        alert('行動ログをコピーしたよ！');
                      }}
                      className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1 rounded-full transition-colors cursor-pointer"
                    >
                      コピー
                    </button>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-48 overflow-y-auto text-xs text-slate-600 space-y-2">
                    {actionLogs.map((log, idx) => (
                      <div key={idx} className="border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                        <p className="font-bold mb-0.5 whitespace-pre-wrap">Q. {log.q}</p>
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
                  <span>{isExporting ? '生成中...' : '画像として保存'}</span>
                </button>
                <button
                  onClick={() => {
                    setStep('title');
                    setCurrentQId('q1');
                    setIeScores({ Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 });
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
            </motion.div>`;

const afterSection = content.substring(endIdx + `                  </button>
                </div>
              </div>
            </motion.div>`.length);

fs.writeFileSync('app/page.tsx', beforeLogs + newSection + afterSection, 'utf8');
console.log("Successfully moved logs outside resultCardRef");
