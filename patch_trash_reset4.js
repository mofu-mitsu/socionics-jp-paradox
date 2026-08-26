const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

content = content.replace(/setTrashItems\(\[\s*\{\s*id:\s*1,\s*type:\s*"paper"[^\]]*\]\);/g, 
`setTrashItems([
  { id: 1, icon: "📄", label: "古い資料", x: 20, y: 35 },
  { id: 2, icon: "🥫", label: "空き缶", x: 75, y: 25 },
  { id: 3, icon: "🍟", label: "食べカス", x: 45, y: 65 },
  { id: 4, icon: "📝", label: "メモ用紙", x: 80, y: 70 },
  { id: 5, icon: "🧃", label: "紙パック", x: 18, y: 70 },
]);`);

fs.writeFileSync('app/page.tsx', content);
