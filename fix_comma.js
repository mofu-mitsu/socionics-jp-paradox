const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf8');

content = content.replace(
  /    \]\r?\n\r?\n  q_mobilizing: \{/,
  "    ]\n  },\n  q_mobilizing: {"
);

fs.writeFileSync('lib/questions.ts', content);
