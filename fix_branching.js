const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const targetLogic = `    if (["ILI", "LII", "LSI"].includes(topType) && !hasSeenIliLiiLsiSplit) {
      setHasSeenIliLiiLsiSplit(true);
      setIsRecMode(true);
      setCurrentQId("q_ili_lii_lsi_split_1");
    } else if (["SLE", "SEE"].includes(topType) && !hasSeenSleSplit) {
      setHasSeenSleSplit(true);
      setCurrentQId("q_sle_vs_see_1");
    } else if (["SLE", "LIE", "LSE"].includes(topType) && !hasSeenTeSeSplit) {
      setHasSeenTeSeSplit(true);
      setCurrentQId("q_te_se_split_1");
    } else {`;

const replacementLogic = `    if (["ILI"].includes(topType) && !hasSeenIliLiiLsiSplit) {
      setHasSeenIliLiiLsiSplit(true);
      setIsRecMode(true);
      setCurrentQId("q_ili_lii_lsi_split_1");
    } else if (["SLE"].includes(topType) && !hasSeenSleSplit) {
      setHasSeenSleSplit(true);
      setCurrentQId("q_sle_vs_see_1");
    } else if (["LIE", "LSE"].includes(topType) && !hasSeenTeSeSplit) {
      setHasSeenTeSeSplit(true);
      setCurrentQId("q_te_se_split_1");
    } else {`;

content = content.replace(targetLogic, replacementLogic);
fs.writeFileSync('app/page.tsx', content);
