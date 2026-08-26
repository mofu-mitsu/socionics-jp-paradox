const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Add hasSeenSleSplit state
content = content.replace(
  `const [hasSeenIliLiiLsiSplit, setHasSeenIliLiiLsiSplit] = useState(false);`,
  `const [hasSeenIliLiiLsiSplit, setHasSeenIliLiiLsiSplit] = useState(false);\n  const [hasSeenSleSplit, setHasSeenSleSplit] = useState(false);`
);

// Replace routing logic
const targetLogic = `    if (["ILI", "LII", "LSI"].includes(topType) && !hasSeenIliLiiLsiSplit) {
      setHasSeenIliLiiLsiSplit(true);
      setIsRecMode(true);
      setCurrentQId("q_ili_lii_lsi_split_1");
    } else {
      if (currentQId !== "q_darling_intercom") { setCurrentQId("q_darling_intercom"); } else { triggerConfetti(); setStep("result"); }                      
    }`;

const replacementLogic = `    if (["ILI"].includes(topType) && !hasSeenIliLiiLsiSplit) {
      setHasSeenIliLiiLsiSplit(true);
      setIsRecMode(true);
      setCurrentQId("q_ili_lii_lsi_split_1");
    } else if (["SLE"].includes(topType) && !hasSeenSleSplit) {
      setHasSeenSleSplit(true);
      setCurrentQId("q_sle_vs_see_1");
    } else if (["LIE", "LSE"].includes(topType) && !hasSeenSleSplit) {
      setHasSeenSleSplit(true);
      setCurrentQId("q_te_se_split_1");
    } else {
      if (currentQId !== "q_darling_intercom") { setCurrentQId("q_darling_intercom"); } else { triggerConfetti(); setStep("result"); }                      
    }`;

content = content.replace(targetLogic, replacementLogic);

// Add to reset logic
content = content.replace(
  `setHasSeenIliLiiLsiSplit(false);`,
  `setHasSeenIliLiiLsiSplit(false);\n                    setHasSeenSleSplit(false);`
);

fs.writeFileSync('app/page.tsx', content);
