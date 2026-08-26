const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `                ) : currentQ?.type === "game_intercom" ? (
                  /* 🥺 突発襲来：ダーリンちゃんインターフォンギミック */
                  <div className="text-center relative">
                    <div className="inline-block px-3.5 py-1 rounded-full bg-red-900/50 border border-red-500/50 text-red-400 text-xs font-bold mb-6">
                      {currentQ.categoryTag}
                    </div>
                    
                    <div className="relative w-48 h-48 mx-auto mb-8 rounded-full border-8 border-red-950/80 overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.3)] cursor-pointer group"
                         onClick={() => {
                            // ピンポーン音
                            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
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
                  </div>`;

// We will change the UI completely.
const replacement = `                ) : currentQ?.type === "game_intercom" ? (
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
                                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white font-mono text-xl focus:outline-none focus:border-red-500"
                                />
                                <button
                                  onClick={() => {
                                    if(smartphoneInput === "110") {
                                      // 通話演出
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
                                      alert("【SYSTEM ERROR 404】\\n通報は遮断されました。\\n\\n侵入者はあなたの【防衛本能】そのものです。\\n即座に境界線を確保してください。");
                                      handleSelectOption(currentQ.options[1]);
                                    } else {
                                      alert("ツー……ツー……繋がらない。");
                                    }
                                  }}
                                  className="px-6 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold cursor-pointer transition-colors"
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
                  </div>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Updated intercom block completely");
} else {
    console.log("Target intercom block not found!");
}
