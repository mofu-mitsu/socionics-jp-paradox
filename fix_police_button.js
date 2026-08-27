const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `<button onClick={() => {
                           setDarlingEndingState("police");
                           setTimeout(() => { triggerCaterpillarInvasion("🐛"); }, 1500);
                        }} className="w-full py-4 bg-transparent border border-red-900 hover:bg-red-950 text-red-500/50 font-bold rounded-xl transition-all cursor-pointer">
                          110番に通報する
                        </button>`;

content = content.replace(target, "");
fs.writeFileSync('app/page.tsx', content);
