const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Fix GAS URL
content = content.replace(
  /https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec/g,
  "https://script.google.com/macros/s/AKfycbyKNxuGhZqSwUCZTfAcjbHmdETzMs_-qzz8nOSZukc8mParcejIPA3U2zQzxqN1MUrK0g/exec"
);

const target = `<div className="flex flex-col gap-4">
                    <button onClick={() => {
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
                  </div>`;

const replacement = `<div className="flex flex-col gap-4">
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
                    {(darlingEndingState === "police" || darlingEndingState === "fire") && (
                      <div className="text-red-500 font-bold text-sm text-left border border-red-900 bg-red-950/50 p-4 rounded-xl leading-relaxed">
                        【SYSTEM ERROR 404】<br/><br/>
                        {darlingEndingState === "police" ? "通報は遮断されました。" : "消防車ではなく……芋虫消防車が到着しました。🚒🐛"}<br/>
                        {darlingEndingState === "police" && "侵入者はあなたの【防衛本能】そのものです。"}<br/><br/>
                        {darlingEndingState === "police" && <span className="text-pink-400">※即座に境界線を確保してください。</span>}
                      </div>
                    )}
                  </div>`;

content = content.replace(target, replacement);
fs.writeFileSync('app/page.tsx', content);
