const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');
const target = `  const currentQ = QUESTIONS[currentQId];`;
const replacement = `  const currentQ = QUESTIONS[currentQId];
  
  const shuffledOptions = useMemo(() => {
    if (!currentQ || !currentQ.options) return [];
    const opts = [...currentQ.options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [currentQId]);`;
content = content.replace(target, replacement);
fs.writeFileSync('app/page.tsx', content);
