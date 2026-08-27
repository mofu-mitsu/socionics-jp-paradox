const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `  const getProgressPercentage = () => {
    const estimatedTotal = 20; // 暫定の最大質問数
    const current = history.length + 1;
    let percentage = Math.round((current / estimatedTotal) * 100);
    if (percentage > 99) percentage = 99;
    return percentage;
  };`;

const replacement = `  const getProgressPercentage = () => {
    if (step === "result") return 100;
    if (step === "approximate") {
      return 75 + Math.round((approximateQIndex / 5) * 24);
    }
    if (step === "quiz") {
      const match = currentQId.match(/^q(\\d+)$/);
      if (match) {
        const num = parseInt(match[1]);
        return Math.round((num / 12) * 60); // q1~q12 for 0-60%
      }
      const splitMatch = currentQId.match(/split_(\\d+)/);
      if (splitMatch) {
        const num = parseInt(splitMatch[1]);
        return 60 + Math.round((num / 5) * 15);
      }
      const perceptionMatch = currentQId.match(/perception_(\\d+)/);
      if (perceptionMatch) {
        const num = parseInt(perceptionMatch[1]);
        return 60 + Math.round((num / 2) * 15);
      }
      if (currentQId.includes("q_romantic_style") || currentQId.includes("q_suggestive_mobilizing") || currentQId.includes("q_mobilizing")) {
        return 60 + 10;
      }
      if (currentQId.includes("q_sle_vs_see") || currentQId.includes("q_see_iee_deep") || currentQId.includes("q_iei_sei_deep") || currentQId.includes("q_eii_esi_deep")) {
        return 60 + 5;
      }
      return 70;
    }
    return 0;
  };`;

content = content.replace(target, replacement);
fs.writeFileSync('app/page.tsx', content);
