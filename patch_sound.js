const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');
content = content.replace(
  'const handleSelectOption = (option: Option) => {',
  'const handleSelectOption = (option: Option) => {\n    playClickSound();'
);
fs.writeFileSync('app/page.tsx', content);
