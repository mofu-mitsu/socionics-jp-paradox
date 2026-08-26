const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// 1. Add useMemo for shuffled options
content = content.replace(
  /const isGlitchMode = step === "quiz" && isRecMode;/,
  `const isGlitchMode = step === "quiz" && isRecMode;

  const shuffledApproximateOptions = useMemo(() => {
    if (step !== "approximate") return [];
    const opts = SOCIONICS_16TYPE_5QUESTIONS_V2[approximateQIndex].options
      .filter((opt) => topCandidates.includes(opt.result as SocionicsType));
    
    // Fisher-Yates shuffle
    const shuffled = [...opts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [step, approximateQIndex, topCandidates]);`
);

// 2. Replace the rendering logic for options
const targetRender = `{SOCIONICS_16TYPE_5QUESTIONS_V2\\[approximateQIndex\\].options\\s*\\.filter\\(\\(opt\\) => topCandidates\\.includes\\(opt\\.result as SocionicsType\\)\\)\\s*\\.map\\(\\(opt, idx\\) => \\(`;
const regexRender = new RegExp(targetRender);
content = content.replace(regexRender, `{shuffledApproximateOptions.map((opt, idx) => (`);

fs.writeFileSync('app/page.tsx', content);
