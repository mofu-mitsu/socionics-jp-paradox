const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Remove from handleSubmitMultiple
const target1 = `  const currentQ = QUESTIONS[currentQId];
  
  const shuffledOptions = useMemo(() => {
    if (!currentQ || !currentQ.options) return [];
    const opts = [...currentQ.options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [currentQId]);`;

content = content.replace(target1, `  const currentQ = QUESTIONS[currentQId];`);

// Add to component body, right after the currentQ declaration at 655~
// Actually, let's find the correct top-level declaration.
// "const currentQ = QUESTIONS[currentQId];" is around 663.
// Let's find it.
const target2 = `  const currentQ = QUESTIONS[currentQId];
  // 8ポジションそれぞれにおける8情報要素（IE）の順位ランキング生成`;

const replacement2 = `  const currentQ = QUESTIONS[currentQId];
  
  const shuffledOptions = useMemo(() => {
    if (!currentQ || !currentQ.options) return [];
    const opts = [...currentQ.options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [currentQId, currentQ]);
  // 8ポジションそれぞれにおける8情報要素（IE）の順位ランキング生成`;

content = content.replace(target2, replacement2);

fs.writeFileSync('app/page.tsx', content);
