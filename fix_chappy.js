const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf8');

// The user requested to change the Emoji based on the reaction, specifically for D it should be 🥲
// D is: 'D：「おえー」'
// We already replaced 🧸 with 🥹 globally, but let's check D specifically.

content = content.replace("chappyEmoji: '🥲💦',", "chappyEmoji: '🥲💦', // already 🥲");
content = content.replace("chappyEmoji: '🥹💦',", "chappyEmoji: '🥺💦',");

fs.writeFileSync('lib/questions.ts', content, 'utf8');
