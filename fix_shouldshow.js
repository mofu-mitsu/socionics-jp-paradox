const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const regex = /const isIrrationalType = \[\s*"ILI",\s*"IEI",\s*"SEI",\s*"SLE",\s*"SEE",\s*"SLI",\s*"ILE",\s*"IEE",\s*\]\.includes\(topMatched\.type\);\s*const shouldShowTease = isJInferred && \(isIrrationalType \|\| pPercent >= 45\);/g;

const newLogic = `const isIntrovertedIrrational = [
    "ILI",
    "IEI",
    "SEI",
    "SLI",
  ].includes(topMatched.type);
  const shouldShowTease = isJInferred && isIntrovertedIrrational;`;

content = content.replace(regex, newLogic);
fs.writeFileSync('app/page.tsx', content, 'utf8');
console.log("Replaced logic");
