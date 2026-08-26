const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Feature 3: Default isSoundEnabled to false
content = content.replace(
  `const [isSoundEnabled, setIsSoundEnabled] = useState(true);`,
  `const [isSoundEnabled, setIsSoundEnabled] = useState(false);`
);

// Feature 3: Add playClickSound helper
const helperTarget = `  const displayName = userName.trim() || "あなた";`;
const helperReplacement = `  const displayName = userName.trim() || "あなた";

  const playClickSound = () => {
    if (isSoundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.stop(audioCtx.currentTime + 0.1);
      } catch (e) {}
    }
  };`;
content = content.replace(helperTarget, helperReplacement);

// Feature 3: Call playClickSound in handleSelectOption and button clicks
content = content.replace(
  `const handleSelectOption = (option: Option) => {`,
  `const handleSelectOption = (option: Option) => {\n    playClickSound();`
);

content = content.replace(
  `onClick={() => setStep("mbti_input")}`,
  `onClick={() => { playClickSound(); setStep("mbti_input"); }}`
);

content = content.replace(
  `const handleMbtiSubmit = () => {`,
  `const handleMbtiSubmit = () => {\n    playClickSound();`
);

// Feature 5: Show next button after invasion
content = content.replace(
  `const [hasSeenSleSplit, setHasSeenSleSplit] = useState(false);`,
  `const [hasSeenSleSplit, setHasSeenSleSplit] = useState(false);\n  const [showNextAfterInvasion, setShowNextAfterInvasion] = useState(false);`
);

// Feature 4 & 5: Caterpillar invasion function and Smartphone logic
const caterpillarInvasionFn = `
  const triggerCaterpillarInvasion = (emoji: string) => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);
    
    const msgs = ["境界線確保。侵入継続。", "領土侵犯ヲ確認。占領プロセスヲ実行中..."];
    
    for(let i=0; i<30; i++) {
      const cat = document.createElement('div');
      cat.innerHTML = emoji + '<br/><div style="font-size: 10px; color: red; background: black; padding: 2px; white-space: nowrap;">' + msgs[i%2] + '</div>';
      cat.style.position = 'absolute';
      cat.style.left = Math.random() * 100 + 'vw';
      cat.style.top = -20 + 'vh';
      cat.style.transition = 'all ' + (2 + Math.random()*3) + 's ease-in';
      cat.style.fontSize = (20 + Math.random()*40) + 'px';
      container.appendChild(cat);
      
      setTimeout(() => {
        cat.style.top = 120 + 'vh';
        cat.style.transform = 'rotate(' + (Math.random()*360) + 'deg)';
      }, 50);
    }
    
    setTimeout(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setShowNextAfterInvasion(true);
    }, 4500);
  };
`;
// Insert caterpillarInvasionFn right after playClickSound
content = content.replace(helperReplacement, helperReplacement + caterpillarInvasionFn);

// Update Smartphone logic
const smartphoneTarget = /if\s*\(smartphoneInput === "110"\)\s*\{[\s\S]*?alert\("【SYSTEM ERROR 404】\\n通報は遮断されました。\\n\\n侵入者はあなたの【防衛本能】そのものです。\\n即座に境界線を確保してください。"\);\s*handleSelectOption\(currentQ\.options\[1\]\);\s*\}\s*else\s*\{[\s\S]*?\}/;

const smartphoneReplacement = `if (smartphoneInput === "119") {
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

content = content.replace(smartphoneTarget, smartphoneReplacement);

// Update invasion animation click inside Darling Modal
const endingButtonTarget = /onClick=\{\(\) => \{[\s\S]*?const container = document\.createElement\('div'\);[\s\S]*?setTimeout\(\(\) => \{[\s\S]*?setShowDarlingEnding\(false\);[\s\S]*?\}, 2000\);\s*\}\}\s*className="w-full py-4 bg-red-600/g;

const endingButtonReplacement = `onClick={() => {
                      triggerCaterpillarInvasion("🐛");
                  }} className="w-full py-4 bg-red-600`;

content = content.replace(endingButtonTarget, endingButtonReplacement);

// Also we need to render the "次へ" button when showNextAfterInvasion is true in showDarlingEnding Modal.
const modalContentTarget = /<div className="flex flex-col gap-4">[\s\S]*?<\/div>/;

// We will selectively match the flex-col gap-4 part
// Wait, the modal has:
/*
                <div className="flex flex-col gap-4">
                  <button onClick={() => {
                     ...
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
                  </button>
                </div>
*/
const modalContentReplacement = `
                {showNextAfterInvasion ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 mt-8">
                    <button onClick={() => {
                      setShowNextAfterInvasion(false);
                      setShowDarlingEnding(false);
                      if (QUESTIONS["q_darling_intercom"] && QUESTIONS["q_darling_intercom"].options) {
                        handleSelectOption(QUESTIONS["q_darling_intercom"].options[0]);
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

// We need to carefully replace the buttons block in showDarlingEnding
const modalBlockTarget = /<div className="flex flex-col gap-4">\s*<button onClick=\{\(\) => \{\s*triggerCaterpillarInvasion[\s\S]*?<\/div>/;

// Actually I already replaced the `onClick` above, so I'll just find the updated string and replace it. Let's do it cleanly using a regex on the original file content.
