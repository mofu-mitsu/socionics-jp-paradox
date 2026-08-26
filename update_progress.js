const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// Add getProgressPercentage
content = content.replace(
  /const isGlitchMode = step === "quiz" && isRecMode;/,
  `const isGlitchMode = step === "quiz" && isRecMode;

  const getProgressPercentage = () => {
    const estimatedTotal = 20; // 暫定の最大質問数
    const current = history.length + 1;
    let percentage = Math.round((current / estimatedTotal) * 100);
    if (percentage > 99) percentage = 99;
    return percentage;
  };`
);

// Add progress bar render in the quiz section
const targetHeader = `<div className="flex items-center gap-2">
            <button
              onClick={handleGoBack}`;
const progressHtml = `<div className="flex-1 max-w-[200px] bg-slate-200 rounded-full h-2 overflow-hidden mx-auto border border-slate-300">
              <div 
                className="bg-pink-400 h-full transition-all duration-500 ease-out"
                style={{ width: \`\${getProgressPercentage()}%\` }}
              />
            </div>
            <div className="text-xs font-bold text-slate-500 min-w-[32px] text-right">
              {getProgressPercentage()}%
            </div>`;

content = content.replace(targetHeader, `<div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleGoBack}` + progressHtml);

fs.writeFileSync('app/page.tsx', content);
