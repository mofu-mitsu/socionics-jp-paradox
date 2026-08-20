import fs from 'fs';

const content = fs.readFileSync('app/page.tsx', 'utf-8');

const lines = content.split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("import { QUESTIONS, Option, Question } from '@/lib/questions';")) {
    startIndex = i;
  }
  if (lines[i].includes("const POSITIONS_ARRAY: ModelPosition[] = [") && startIndex !== -1) {
    endIndex = i - 1; // line before this
    break;
  }
}

if (startIndex !== -1 && endIndex !== -1) {
  // Remove everything between startIndex (exclusive) and endIndex (inclusive)
  // Wait, I want to keep the import, and delete everything up to `};` before `const POSITIONS_ARRAY`
  // let's trace backwards from endIndex
  let cutEnd = endIndex;
  while(cutEnd > startIndex && !lines[cutEnd].startsWith('};')) {
    cutEnd--;
  }
  if (lines[cutEnd].startsWith('};')) {
     lines.splice(startIndex + 1, cutEnd - startIndex);
     fs.writeFileSync('app/page.tsx', lines.join('\n'));
     console.log("Fixed!");
  } else {
     console.log("Could not find '};'");
  }
} else {
  console.log("Could not find bounds", startIndex, endIndex);
}
