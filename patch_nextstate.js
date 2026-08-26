const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

content = content.replace(
  `const [hasSeenSleSplit, setHasSeenSleSplit] = useState(false);`,
  `const [hasSeenSleSplit, setHasSeenSleSplit] = useState(false);\n  const [showNextAfterInvasion, setShowNextAfterInvasion] = useState(false);`
);

fs.writeFileSync('app/page.tsx', content);
