const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf-8');

content = content.split('"q_perception_1"').join('"q_darling_liar"');
fs.writeFileSync('lib/questions.ts', content);
console.log("REPLACED q_perception_1");
