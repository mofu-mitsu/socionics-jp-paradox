const fs = require('fs');
let content = fs.readFileSync('app/layout.tsx', 'utf-8');

const target = `export const metadata: Metadata = {`;
const replacement = `export const metadata: Metadata = {
  metadataBase: new URL('https://socionics-jp-paradox.vercel.app'),`;

content = content.replace(target, replacement);
fs.writeFileSync('app/layout.tsx', content);
