import fs from 'fs';

let content = fs.readFileSync('app/page.tsx', 'utf-8');

const replacements = [
  // text colors
  ['text-slate-100', 'text-slate-800'],
  ['text-slate-200', 'text-slate-700'],
  ['text-slate-300', 'text-slate-600'],
  ['text-slate-400', 'text-slate-500'],
  ['text-white', 'text-slate-900'],
  
  // bg colors
  ['bg-slate-950', 'bg-white'],
  ['bg-slate-900', 'bg-sky-50'],
  ['bg-slate-800', 'bg-slate-100'],
  ['bg-slate-700', 'bg-slate-200'],
  
  // border colors
  ['border-slate-800', 'border-slate-200'],
  ['border-slate-700', 'border-slate-300'],
  ['border-slate-600', 'border-slate-400'],
  ['border-white/10', 'border-slate-200/50'],
  ['border-white/20', 'border-slate-300/50'],

  // accent colors for contrast on light mode
  ['text-pink-300', 'text-pink-600'],
  ['text-pink-200', 'text-pink-700'],
  ['text-pink-400', 'text-pink-500'],
  ['text-sky-300', 'text-sky-600'],
  ['text-sky-200', 'text-sky-700'],
  ['text-sky-400', 'text-sky-500'],
  ['bg-pink-500/40', 'bg-pink-100/80'],
  ['bg-pink-500/30', 'bg-pink-100/50'],
  ['border-pink-500/30', 'border-pink-300/50'],
  ['border-pink-400/40', 'border-pink-300/50'],
  ['border-pink-400/30', 'border-pink-300/40'],
  ['border-pink-500/40', 'border-pink-400/50'],
  ['border-pink-500/50', 'border-pink-400/60'],
];

replacements.forEach(([from, to]) => {
  // Be careful with simple replace, we use split join
  content = content.split(from).join(to);
});

fs.writeFileSync('app/page.tsx', content);
console.log("Colors updated!");
