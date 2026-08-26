const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `              {/* 行動ログ（コピー用） */}`;
const replacement = `              {/* 煽りボタン (近似診断へ) */}
              <div className="flex flex-col gap-4 mt-6 mb-6">
                <button
                  onClick={() => {
                    setTopCandidates(calculatedMatches.slice(0, 4).map(m => m.type));
                    setStep("approximate");
                    setApproximateQIndex(0);
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }}
                  className="w-full py-4 rounded-xl font-bold bg-pink-100 hover:bg-pink-200 text-pink-700 transition-colors shadow-md border border-pink-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="text-xl">🥺</span>
                  <span>上位4つの近似タイプと比べる（精密決戦）</span>
                </button>
              </div>
              
              {/* 行動ログ（コピー用） */}`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Added approximate diagnostic button to result screen!");
} else {
    console.log("Could not find the target location for approximate button!");
}
