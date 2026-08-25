const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf-8');
content = content.replace(/nextId: null/g, 'nextId: "result"');
fs.writeFileSync('lib/questions.ts', content);
