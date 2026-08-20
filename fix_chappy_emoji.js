const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

// The user wants Chappy's main emoji to change. 
// Right now it's hardcoded as `🥹` in line 780. We need to use `selectedChappyOpt?.chappyEmoji` if available, or default to `🥹`
// Also we need to make sure we don't change `chappyReaction` handling without preserving state.

content = content.replace(
  `                            🥹`, 
  `                            {selectedChappyOpt?.chappyEmoji || "🥹"}`
);

fs.writeFileSync('app/page.tsx', content, 'utf8');
console.log('Fixed Chappy emoji');
