import fs from 'fs';

const path = 'app/page.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Replace old caterpillar state
const oldStateRegex = /const \[caterpillarReaction, setCaterpillarReaction\] = useState\(false\);/;
const newState = `// LSI 芋虫マスコット状態
  const [caterpillarClicks, setCaterpillarClicks] = useState(0);
  const [caterpillarMessage, setCaterpillarMessage] = useState("");
  const [caterpillarVisible, setCaterpillarVisible] = useState(true);`;
content = content.replace(oldStateRegex, newState);

// Replace handleCaterpillarClick
const oldHandlerRegex = /const handleCaterpillarClick = \(\) => \{\s*setCaterpillarReaction\(true\);\s*setTimeout\(\(\) => setCaterpillarReaction\(false\), 1200\);\s*\};/;
const newHandler = `const handleCaterpillarClick = () => {
    const newClicks = caterpillarClicks + 1;
    setCaterpillarClicks(newClicks);
    if (newClicks >= 30) {
      setCaterpillarMessage("ぐえぇぇっ💦");
      setTimeout(() => setCaterpillarVisible(false), 2000);
    } else {
      const messages = [
        "お前はSLEか？やめろ！",
        "Tiの秩序を乱すな！",
        "何回つつく気だ！",
        "やめろってば！",
        "Seが強すぎる！",
        "私語は慎め！",
        "ルールを守れ！"
      ];
      setCaterpillarMessage(messages[(newClicks - 1) % messages.length]);
    }
  };`;
content = content.replace(oldHandlerRegex, newHandler);

fs.writeFileSync(path, content);
console.log("State and handler replaced");
