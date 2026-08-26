const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf-8');

// Replace all nextId: 'q_darling_intercom' with 'q_darling_liar'
content = content.replace(/nextId: 'q_darling_intercom'/g, "nextId: 'q_darling_liar'");

fs.writeFileSync('lib/questions.ts', content);
