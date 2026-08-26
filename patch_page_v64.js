const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `window.webkitAudioContext`;
const replacement = `(window as any).webkitAudioContext`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('app/page.tsx', content);
    console.log("Fixed typescript error");
} else {
    console.log("Could not find typescript error target");
}
