const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf8');

// q_suggestive_mobilizing の型定義の中への誤挿入を削除
const regex = /    q_suggestive_mobilizing: {[\s\S]*?            jpDelta: { j: 1\.0; p: 0 };\n          };\n        \];\n      };\n/g;

content = content.replace(regex, "");
fs.writeFileSync('lib/questions.ts', content);
