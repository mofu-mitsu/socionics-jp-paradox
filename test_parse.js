const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf8');

const end = content.substring(content.length - 150);
console.log(end);
