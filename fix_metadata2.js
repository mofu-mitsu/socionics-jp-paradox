const fs = require('fs');
let content = fs.readFileSync('app/layout.tsx', 'utf-8');

const targetOGP = `images: [{ url: '/ogp.png', width: 1200, height: 630, alt: 'ソシオJ/Pねじれ診断' }]`;
const targetTwitter = `images: ['/ogp.png']`;

const replacementOGP = `images: [{ url: 'https://socionics-jp-paradox.vercel.app/ogp.png', width: 1200, height: 630, alt: 'ソシオJ/Pねじれ診断' }]`;
const replacementTwitter = `images: ['https://socionics-jp-paradox.vercel.app/ogp.png']`;

content = content.replace(targetOGP, replacementOGP).replace(targetTwitter, replacementTwitter);
fs.writeFileSync('app/layout.tsx', content);
