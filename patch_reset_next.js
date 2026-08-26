const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

content = content.replace(
  `setHasSeenSleSplit(false);`,
  `setHasSeenSleSplit(false);\n                    setShowNextAfterInvasion(false);`
);

fs.writeFileSync('app/page.tsx', content);
