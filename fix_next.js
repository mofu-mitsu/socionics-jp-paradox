const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

content = content.replace(/if \(option\.nextId === "result"\) \{/g, 'if (option.nextId === "result" || !option.nextId) {');
fs.writeFileSync('app/page.tsx', content);
