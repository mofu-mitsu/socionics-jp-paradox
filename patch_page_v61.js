const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Title drop-shadow
content = content.replace(
  'drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]', 
  'drop-shadow-[0_4px_12px_rgba(14,165,233,0.2)] text-slate-800'
);

fs.writeFileSync('app/page.tsx', content);
console.log("Updated title drop shadow");
