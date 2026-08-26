const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const smartphoneTarget = /if\s*\(smartphoneInput === "110"\)\s*\{[\s\S]*?alert\("【SYSTEM ERROR 404】\\n通報は遮断されました。\\n\\n侵入者はあなたの【防衛本能】そのものです。\\n即座に境界線を確保してください。"\);\s*handleSelectOption\(currentQ\.options\[1\]\);\s*\}\s*else\s*\{\s*alert\("ツー……ツー……繋がらない。"\);\s*\}/;

const smartphoneReplacement = `if (smartphoneInput === "110") {
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
                                    } else if (smartphoneInput === "119") {
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
                                      alert("【SYSTEM ERROR 404】\\n消防車ではなく……芋虫消防車が到着しました。🚒🐛");
                                      triggerCaterpillarInvasion("🚒🐛");
                                      setShowDarlingEnding(true);
                                    } else {
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
                                      alert("【SYSTEM ERROR 404】\\n通報は遮断されました。\\nLSI芋虫につながりました……🐛");
                                      triggerCaterpillarInvasion("🐛");
                                      setShowDarlingEnding(true);
                                    }`;

if (content.match(smartphoneTarget)) {
    content = content.replace(smartphoneTarget, smartphoneReplacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Smartphone logic updated successfully!");
} else {
    console.log("Smartphone logic not found!");
}
