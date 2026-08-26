const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf-8');

// Replace q_darling_liar with result in specific lines
const targetLines = [
  "nextId: 'q_darling_liar'"
];

// Instead of complex regex, let's just manually replace it in the block of those questions.
// I will just replace all "nextId: 'q_darling_liar'" to "nextId: 'result'" for now?
// Actually, earlier I changed everything to 'q_darling_liar'.
// Which ones should go to 'result'?
// q_ili_lii_lsi_split_5 options
// q_sle_vs_see_5 options
// q_te_se_split_3 options
// Let's do it by finding those keys and replacing the next 30 lines.

['q_ili_lii_lsi_split_5', 'q_sle_vs_see_5', 'q_te_se_split_3'].forEach(q => {
  const idx = content.indexOf(q + ':');
  if (idx !== -1) {
    const endIdx = content.indexOf('},', idx + 100);
    // Well, it's safer to just replace globally within a substring
    const blockEnd = content.indexOf(']', idx);
    const block = content.substring(idx, blockEnd + 50);
    const newBlock = block.replace(/nextId:\s*'q_darling_liar'/g, "nextId: 'result'");
    content = content.substring(0, idx) + newBlock + content.substring(idx + block.length);
  }
});

fs.writeFileSync('lib/questions.ts', content);
