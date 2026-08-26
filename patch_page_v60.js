const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `                ) : currentQ?.type === "text_input" ? (`
const replacement = `                ) : currentQ?.type === "game_intercom" ? (
                  /* 🥺 突発襲来：ダーリンちゃんインターフォンギミック */
                  <div className="text-center relative">
                    <div className="inline-block px-3.5 py-1 rounded-full bg-red-900/50 border border-red-500/50 text-red-400 text-xs font-bold mb-6">
                      {currentQ.categoryTag}
                    </div>
                    
                    <div className="relative w-48 h-48 mx-auto mb-8 rounded-full border-8 border-red-950/80 overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.3)] cursor-pointer group"
                         onClick={() => {
                            // ピンポーン音
                            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                            const osc = audioCtx.createOscillator();
                            const gain = audioCtx.createGain();
                            osc.type = 'sine';
                            osc.connect(gain);
                            gain.connect(audioCtx.destination);
                            
                            // 鳴らす
                            osc.frequency.setValueAtTime(880, audioCtx.currentTime);
                            gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
                            osc.start();
                            
                            setTimeout(() => {
                              osc.frequency.setValueAtTime(659.25, audioCtx.currentTime);
                            }, 300);
                            
                            setTimeout(() => {
                              gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
                              osc.stop(audioCtx.currentTime + 0.1);
                            }, 800);
                         }}>
                         
                      {/* 魚眼レンズ（ドアスコープ）エフェクト */}
                      <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none rounded-full" style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }}></div>
                      <div className="absolute inset-0 z-30 pointer-events-none rounded-full opacity-30" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 20%)' }}></div>
                      
                      {/* ダーリンちゃん */}
                      <div className="absolute inset-0 flex items-center justify-center transform scale-[1.5] group-hover:scale-[2] transition-transform duration-1000 z-10 animate-[wiggle_4s_ease-in-out_infinite]">
                        <span className="text-[120px]">🥺</span>
                      </div>
                    </div>
                    
                    <p className="font-serif text-lg md:text-xl font-bold leading-relaxed mb-8 whitespace-pre-wrap text-red-400">
                      （ピンポーン）<br/>
                      <span className="text-red-100 mt-2 block">
                        ダーリンちゃん「ねぇ、ダーリン♡<br/>
                        ……ねぇ、一緒に住まない？」
                      </span>
                    </p>
                    
                    <div className="space-y-4">
                       <button
                          onClick={() => handleSelectOption(currentQ.options[0])}
                          className="w-full py-4 rounded-xl font-bold transition-all bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                        >
                          {currentQ.options[0].text}
                        </button>
                        <button
                          onClick={() => handleSelectOption(currentQ.options[1])}
                          className="w-full py-4 rounded-xl font-bold transition-all bg-transparent border border-red-900 text-red-500 hover:bg-red-950/50"
                        >
                          {currentQ.options[1].text}
                        </button>
                    </div>
                  </div>
                ) : currentQ?.type === "text_input" ? (`

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Replaced with game_intercom logic!");
} else {
    console.log("Could not find target!");
}
