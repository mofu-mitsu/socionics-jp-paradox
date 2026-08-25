const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

content = content.replace(/Object\.entries\(option\.ieDeltas\)/g, 'Object.entries(option.ieDeltas || {})');
content = content.replace(/Object\.entries\(option\.positionDeltas\)/g, 'Object.entries(option.positionDeltas || {})');
content = content.replace(/option\.jpDelta\.j/g, '(option.jpDelta?.j || 0)');
content = content.replace(/option\.jpDelta\.p/g, '(option.jpDelta?.p || 0)');

fs.writeFileSync('app/page.tsx', content);
