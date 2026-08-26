const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const targetDownload = `      const link = document.createElement("a");
      link.download = \`socio_modelA_result_\${new Date().getTime()}.png\`;
      link.href = dataUrl;
      link.click();`;

const replacementDownload = `      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        setGeneratedImageUrl(dataUrl);
      } else {
        const link = document.createElement("a");
        link.download = \`socio_modelA_result_\${new Date().getTime()}.png\`;
        link.href = dataUrl;
        link.click();
      }`;

content = content.replace(targetDownload, replacementDownload);

const targetModal = `    <div className={\`min-h-screen relative overflow-x-hidden flex flex-col justify-between font-sans transition-colors duration-1000 \${`;

const replacementModal = `    <div className={\`min-h-screen relative overflow-x-hidden flex flex-col justify-between font-sans transition-colors duration-1000 \${
      isGlitchMode 
        ? 'bg-black text-red-500 selection:bg-red-900 selection:text-red-100'
        : 'bg-slate-50 text-slate-800 selection:bg-pink-100 selection:text-pink-900'
    }\`}>
      <AnimatePresence>
        {generatedImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                <p className="font-bold text-slate-800 text-sm">画像を長押しして保存してください</p>
                <button
                  onClick={() => setGeneratedImageUrl(null)}
                  className="p-2 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-slate-100 flex justify-center rounded-b-2xl">
                <img src={generatedImageUrl} alt="診断結果" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hidden">`;

// Using a more precise replace for the modal injection point
content = content.replace(/<div className=\{\`min-h-screen relative overflow-x-hidden flex flex-col justify-between font-sans transition-colors duration-1000 \$\{[^}]+\}\`\}>/, 
`$&
      <AnimatePresence>
        {generatedImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-2xl shrink-0">
                <p className="font-bold text-slate-800 text-sm">画像を長押しして保存してください</p>
                <button
                  onClick={() => setGeneratedImageUrl(null)}
                  className="p-2 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-700" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-slate-100 flex justify-center rounded-b-2xl">
                <img src={generatedImageUrl} alt="診断結果" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>`);

fs.writeFileSync('app/page.tsx', content);
