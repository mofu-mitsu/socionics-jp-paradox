const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `                {showNextAfterInvasion ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-red-400 font-bold mb-4 animate-pulse">
                      占領プロセス完了。<br/>あなたは完全に掌握されました♡
                    </p>
                    <button onClick={() => {
                      if (hasSeenDarlingLiar) {
                        triggerConfetti();
                        setStep("result");
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
                    <button onClick={() => {
                        triggerCaterpillarInvasion("🐛");
                    }} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.8)] transition-all cursor-pointer">
                      はい、住みます……♡ (占領を許可する)
                    </button>
                    <button onClick={() => {
                       alert("【SYSTEM ERROR 404】\\n通報は遮断されました。\\n\\n侵入者はあなたの【防衛本能】そのものです。\\n即座に境界線を確保してください。");
                       triggerCaterpillarInvasion("🐛");
                    }} className="w-full py-4 bg-transparent border border-red-900 hover:bg-red-950 text-red-500/50 font-bold rounded-xl transition-all cursor-pointer">
                      110番に通報する
                    </button>
                  </div>
                )}`;

const replacement = `                {showNextAfterInvasion ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-red-400 font-bold mb-4 animate-pulse">
                      占領プロセス完了。<br/>あなたは完全に掌握されました♡
                    </p>
                    <button onClick={() => {
                      triggerConfetti();
                      setStep("result");
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
                        <button onClick={() => {
                           setDarlingEndingState("police");
                           setTimeout(() => { triggerCaterpillarInvasion("🐛"); }, 1500);
                        }} className="w-full py-4 bg-transparent border border-red-900 hover:bg-red-950 text-red-500/50 font-bold rounded-xl transition-all cursor-pointer">
                          110番に通報する
                        </button>
                      </>
                    )}
                    {darlingEndingState === "invading" && (
                      <div className="text-red-500 font-bold animate-pulse text-lg py-4">
                        占領プロセスを実行中……
                      </div>
                    )}
                    {darlingEndingState === "police" && (
                      <div className="text-red-500 font-bold text-sm text-left border border-red-900 bg-red-950/50 p-4 rounded-xl leading-relaxed">
                        【SYSTEM ERROR 404】<br/><br/>
                        通報は遮断されました。<br/>
                        侵入者はあなたの【防衛本能】そのものです。<br/><br/>
                        <span className="text-pink-400">※即座に境界線を確保してください。</span>
                      </div>
                    )}
                    {darlingEndingState === "fire" && (
                      <div className="text-red-500 font-bold text-sm text-left border border-red-900 bg-red-950/50 p-4 rounded-xl leading-relaxed">
                        【SYSTEM ERROR 404】<br/><br/>
                        消防車ではなく……芋虫消防車が到着しました。🚒🐛
                      </div>
                    )}
                  </div>
                )}`;

content = content.replace(target, replacement);
fs.writeFileSync('app/page.tsx', content);
