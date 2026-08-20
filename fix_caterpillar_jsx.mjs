import fs from 'fs';

const path = 'app/page.tsx';
let content = fs.readFileSync(path, 'utf-8');

const oldJsxStart = content.indexOf('{/* 🐛 復活！ 画面上の可愛い芋虫マスコット */}');
const oldJsxEnd = content.indexOf('      {/* ヘッダー */}');

if (oldJsxStart !== -1 && oldJsxEnd !== -1) {
  const newJsx = `{/* 🐛 LSI芋虫マスコット */}
      {caterpillarVisible && (
        <div className="fixed bottom-10 z-50 caterpillar-walk" style={{ pointerEvents: 'none' }}>
          <div className="relative flex flex-col items-center" style={{ pointerEvents: 'auto' }}>
            {/* 吹き出し */}
            {caterpillarMessage && (
              <div className="absolute bottom-full mb-2 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-2xl border border-slate-300 shadow-lg whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-white">
                {caterpillarMessage}
              </div>
            )}
            <button
              onClick={handleCaterpillarClick}
              className="caterpillar-wiggle bg-sky-50 hover:bg-slate-100 border border-slate-300 p-2 rounded-2xl shadow-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
            >
              <span className="text-3xl filter drop-shadow-sm">
                {caterpillarClicks >= 30 ? '💥' : '🐛'}
              </span>
            </button>
          </div>
        </div>
      )}

`;
  content = content.substring(0, oldJsxStart) + newJsx + content.substring(oldJsxEnd);
  fs.writeFileSync(path, content);
  console.log("JSX replaced successfully.");
} else {
  console.log("Could not find JSX boundaries.", oldJsxStart, oldJsxEnd);
}
