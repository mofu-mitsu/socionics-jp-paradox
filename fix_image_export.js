const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const targetPng = `    try {
      // Force PC size
      const targetWidth = 768; 
      const style = {
        width: targetWidth + 'px',
        transform: 'none',
      };
      const dataUrl = await toPng(resultCardRef.current, {
        cacheBust: true,
        backgroundColor: "#f8fafc",
        style,
        width: targetWidth,
        pixelRatio: 2,
      });`;

const replacementPng = `    try {
      // スマホでもPCでも、画面に表示されている自然なサイズでキャプチャし、余白が広がりすぎるのを防ぐ
      const dataUrl = await toPng(resultCardRef.current, {
        cacheBust: true,
        backgroundColor: "#f8fafc",
        pixelRatio: 2,
      });`;

content = content.replace(targetPng, replacementPng);
fs.writeFileSync('app/page.tsx', content);
