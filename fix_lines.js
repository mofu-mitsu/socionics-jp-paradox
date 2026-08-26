const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `{step === "quiz" && (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleGoBack}<div className="flex-1 max-w-[200px] bg-slate-200 rounded-full h-2 overflow-hidden mx-auto border border-slate-300">
              <div 
                className="bg-pink-400 h-full transition-all duration-500 ease-out"
                style={{ width: \`\${getProgressPercentage()}%\` }}
              />
            </div>
            <div className="text-xs font-bold text-slate-500 min-w-[32px] text-right">
              {getProgressPercentage()}%
            </div>
              className="px-3.5 py-1.5 bg-slate-100/90 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all border border-pink-400/50 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-pink-600" />
              前の一問に戻る
            </button>

            <button
              onClick={handleSkipQuestion}
              className="px-3 py-1.5 bg-slate-100/60 hover:bg-slate-200/80 text-slate-600 rounded-full text-xs flex items-center gap-1 transition-colors border border-slate-400/40"`;

const replacement = `{step === "quiz" && (
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={handleGoBack}
              className="px-3.5 py-1.5 bg-slate-100/90 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all border border-pink-400/50 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-pink-600" />
              前へ
            </button>
            <button
              onClick={handleSkipQuestion}
              className="px-3 py-1.5 bg-slate-100/60 hover:bg-slate-200/80 text-slate-600 rounded-full text-xs flex items-center gap-1 transition-colors border border-slate-400/40"`;

content = content.replace(target, replacement);

const target2 = `              <HelpCircle className="w-3.5 h-3.5" />
              <span>ピンと来ない</span>
            </button>
          </div>
        )}`;

const replacement2 = `              <HelpCircle className="w-3.5 h-3.5" />
              <span>スキップ</span>
            </button>
            
            <div className="flex items-center gap-2 flex-1 min-w-[120px] max-w-[200px]">
              <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden border border-slate-300">
                <div 
                  className="bg-pink-400 h-full transition-all duration-500 ease-out"
                  style={{ width: \`\${getProgressPercentage()}%\` }}
                />
              </div>
              <div className="text-xs font-bold text-slate-500 w-[32px] text-right">
                {getProgressPercentage()}%
              </div>
            </div>
          </div>
        )}`;

content = content.replace(target2, replacement2);

fs.writeFileSync('app/page.tsx', content);
