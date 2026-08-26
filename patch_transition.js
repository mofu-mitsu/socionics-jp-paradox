const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Update resetState
content = content.replace(
  `setHasSeenSleSplit(false);`,
  `setHasSeenSleSplit(false);\n    setHasSeenTeSeSplit(false);`
);

// Update goToNextStepAfterQuiz
const target = `    if (["ILI", "LII"].includes(topType) && !hasSeenIliLiiLsiSplit) {
      setHasSeenIliLiiLsiSplit(true);
      setIsRecMode(true);
      setCurrentQId("q_ili_lii_lsi_split_1");
    } else if (["SLE", "SEE"].includes(topType) && !hasSeenSleSplit) {
      setHasSeenSleSplit(true);
      setCurrentQId("q_sle_vs_see_1");
    } else if (["LIE", "LSE"].includes(topType) && !hasSeenSleSplit) {
      setHasSeenSleSplit(true);
      setCurrentQId("q_te_se_split_1");
    } else {`;

const replacement = `    if (topType === "ILI" && !hasSeenIliLiiLsiSplit) {
      setHasSeenIliLiiLsiSplit(true);
      setIsRecMode(true);
      setCurrentQId("q_ili_lii_lsi_split_1");
    } else if (topType === "SLE" && !hasSeenSleSplit) {
      setHasSeenSleSplit(true);
      setCurrentQId("q_sle_vs_see_1");
    } else if (["LIE", "LSE"].includes(topType) && !hasSeenTeSeSplit) {
      setHasSeenTeSeSplit(true);
      setCurrentQId("q_te_se_split_1");
    } else {`;

content = content.replace(target, replacement);
fs.writeFileSync('app/page.tsx', content);
