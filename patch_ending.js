const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `                      alert("ダーリンちゃん「ふふ♡ 選択を誤ったわね♡」");
                  }} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.8)] transition-all cursor-pointer">
                    はい、住みます……♡
                  </button>
                  <button onClick={() => {
                     alert("【SYSTEM ERROR 404】\\n通報は遮断されました。\\n\\n侵入者はあなたの【防衛本能】そのものです。\\n即座に境界線を確保してください。");
                     setShowDarlingEnding(false);
                  }} className="w-full py-4 bg-transparent border border-red-900 hover:bg-red-950 text-red-500/50 font-bold rounded-xl transition-all cursor-pointer">
                    110番に通報する
                  </button>`;

const replacement = `                      setTimeout(() => {
                        setShowDarlingEnding(false);
                        if (QUESTIONS["q_darling_intercom"] && QUESTIONS["q_darling_intercom"].options) {
                          handleSelectOption(QUESTIONS["q_darling_intercom"].options[0]);
                        } else {
                          triggerConfetti();
                          setStep("result");
                        }
                      }, 2000);
                  }} className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.8)] transition-all cursor-pointer">
                    はい、住みます……♡ (占領を許可する)
                  </button>
                  <button onClick={() => {
                     alert("【SYSTEM ERROR 404】\\n通報は遮断されました。\\n\\n侵入者はあなたの【防衛本能】そのものです。\\n即座に境界線を確保してください。");
                     setShowDarlingEnding(false);
                     if (QUESTIONS["q_darling_intercom"] && QUESTIONS["q_darling_intercom"].options) {
                        handleSelectOption(QUESTIONS["q_darling_intercom"].options[1] || QUESTIONS["q_darling_intercom"].options[0]);
                     } else {
                        triggerConfetti();
                        setStep("result");
                     }
                  }} className="w-full py-4 bg-transparent border border-red-900 hover:bg-red-950 text-red-500/50 font-bold rounded-xl transition-all cursor-pointer">
                    110番に通報する
                  </button>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Updated ending modal logic");
} else {
    console.log("Could not find ending modal buttons");
}
