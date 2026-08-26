const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `    <div className={\`min-h-screen relative overflow-x-hidden flex flex-col justify-between font-sans transition-colors duration-1000 \${
      isGlitchMode 
        ? 'bg-black text-red-500 selection:bg-red-900 selection:text-red-100'
        : 'bg-watercolor-dream text-slate-800 selection:bg-pink-500 selection:text-slate-900'
    }\`}>`;

const replacement = `    <div className={\`min-h-screen relative overflow-x-hidden flex flex-col justify-between font-sans transition-colors duration-1000 \${
      isGlitchMode 
        ? 'bg-black text-red-500 selection:bg-red-900 selection:text-red-100'
        : 'bg-watercolor-dream text-slate-800 selection:bg-pink-500 selection:text-slate-900'
    }\`}>
      {/* サウンドコントロール */}
      <button 
        onClick={() => setIsSoundEnabled(!isSoundEnabled)} 
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/50 backdrop-blur-sm border border-slate-300 text-slate-600 hover:bg-white/80 transition-all cursor-pointer shadow-sm"
        title={isSoundEnabled ? "サウンドON" : "サウンドOFF"}
      >
        {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 opacity-50" />}
      </button>`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Added sound toggle header button");
} else {
    console.log("Could not find root div to add sound toggle");
}
