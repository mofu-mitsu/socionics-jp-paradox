const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target1 = `    setTrashItems([
      { id: 1, type: "paper", top: "20%", left: "15%", rot: -15 },
      { id: 2, type: "can", top: "60%", left: "70%", rot: 45 },
      { id: 3, type: "bottle", top: "80%", left: "30%", rot: 90 },
      { id: 4, type: "paper", top: "40%", left: "50%", rot: -5 },
      { id: 5, type: "can", top: "10%", left: "80%", rot: 180 },
    ]);`;

const replacement1 = `    setTrashItems([
      { id: 1, icon: "📄", label: "古い資料", x: 20, y: 35 },
      { id: 2, icon: "🥫", label: "空き缶", x: 75, y: 25 },
      { id: 3, icon: "🍟", label: "食べカス", x: 45, y: 65 },
      { id: 4, icon: "📝", label: "メモ用紙", x: 80, y: 70 },
      { id: 5, icon: "🧃", label: "紙パック", x: 18, y: 70 },
    ]);`;

while(content.includes(target1)) {
    content = content.replace(target1, replacement1);
}

fs.writeFileSync('app/page.tsx', content);
