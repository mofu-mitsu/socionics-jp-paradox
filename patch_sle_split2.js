const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const targetLogic = /if \(\["ILI", "LII", "LSI"\].includes\(topType\) && !hasSeenIliLiiLsiSplit\) \{[\s\S]*?\} else \{\s*if \(currentQId !== "q_darling_intercom"\) \{ setCurrentQId\("q_darling_intercom"\); \} else \{ triggerConfetti\(\); setStep\("result"\); \}\s*\}/;

const replacementLogic = `if (["ILI"].includes(topType) && !hasSeenIliLiiLsiSplit) {
      setHasSeenIliLiiLsiSplit(true);
      setIsRecMode(true);
      setCurrentQId("q_ili_lii_lsi_split_1");
    } else if (["SEE"].includes(topType) && !hasSeenSleSplit) {
      setHasSeenSleSplit(true);
      setCurrentQId("q_sle_vs_see_1");
    } else if (["LIE", "LSE"].includes(topType) && !hasSeenSleSplit) {
      setHasSeenSleSplit(true);
      setCurrentQId("q_te_se_split_1");
    } else {
      if (currentQId !== "q_darling_intercom") { setCurrentQId("q_darling_intercom"); } else { triggerConfetti(); setStep("result"); }                      
    }`;

content = content.replace(targetLogic, replacementLogic);
fs.writeFileSync('app/page.tsx', content);
