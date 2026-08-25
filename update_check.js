const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf-8');
content = content.replace(
    /if \(topType === "ILI" && !hasSeenIliLiiLsiSplit\) \{/,
    'if (["ILI", "LII", "LSI"].includes(topType) && !hasSeenIliLiiLsiSplit) {'
);
fs.writeFileSync('app/page.tsx', content);
