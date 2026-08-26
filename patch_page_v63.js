const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `    try {
      const dataUrl = await toPng(resultCardRef.current, {
        cacheBust: true,
        backgroundColor: "#f8fafc",
      });`;

const replacement = `    try {
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

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Updated image download to force PC size");
} else {
    console.log("Could not find image download logic");
}
