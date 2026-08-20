const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const targetStr = `                        自認は『<span className="font-bold text-sky-600">{detectedMbti}</span>』だけど、
                        <br />
                        Model A 構造では『
                        <span className="font-bold text-pink-600">
                          {topMatched.type}
                        </span>
                        』が最も強く出ていて、柔軟な非合理・P傾向が強いみたい！
                      </p>
                    </div>
                  </div>
                )}`;

const splitIdx = content.indexOf('柔軟な非合理・P傾向が強いみたい！');
if (splitIdx !== -1) {
    const endP = content.indexOf('</p>', splitIdx);
    
    // insert feedback input field
    const insertStr = `
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
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                              if (input.value) {
                                alert('ダーリンちゃんに言い訳を送信したよ！♡');
                                input.value = '';
                              }
                            }}
                            className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                          >
                            送信
                          </button>
                        </div>
                      </div>`;
    
    const newContent = content.substring(0, endP + 4) + insertStr + content.substring(endP + 4);
    fs.writeFileSync('app/page.tsx', newContent, 'utf8');
    console.log("Feedback field added.");
} else {
    console.log("String not found");
}
