const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `<button onClick={() => setShowDarlingEnding(false)} className="w-full py-4 bg-transparent border border-red-900 hover:bg-red-950 text-red-500/50 font-bold rounded-xl transition-all cursor-pointer">
                    110番に通報する
                  </button>`;

const replacement = `<button onClick={() => {
                     alert("【SYSTEM ERROR 404】\\n通報は遮断されました。\\n\\n侵入者はあなたの【防衛本能】そのものです。\\n即座に境界線を確保してください。");
                     setShowDarlingEnding(false);
                  }} className="w-full py-4 bg-transparent border border-red-900 hover:bg-red-950 text-red-500/50 font-bold rounded-xl transition-all cursor-pointer">
                    110番に通報する
                  </button>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Updated 110 action");
} else {
    console.log("Could not find 110 action button");
}
