const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

content = content.replace('const [actionLogs, setActionLogs] = useState<string[]>([]);', 'const [actionLogs, setActionLogs] = useState<Array<{ q: string, a: string, reason: string }>>([]);');

content = content.replace('logs: string[]', 'logs: Array<{ q: string, a: string, reason: string }>');

content = content.replace('const newLogs = option.reasonTag ? [...actionLogs, option.reasonTag] : actionLogs;', 'const qText = QUESTIONS[currentQId]?.text || "特殊アクション";\n    const newLogs = [...actionLogs, { q: qText, a: option.text, reason: option.reasonTag || "" }];');

// also for the chappy specific one
content = content.replace('const newLogs = option.reasonTag ? [...actionLogs, option.reasonTag] : actionLogs;', 'const qText = QUESTIONS[currentQId]?.text || "特殊アクション";\n    const newLogs = [...actionLogs, { q: qText, a: option.text, reason: option.reasonTag || "" }];'); // if there are multiple

content = content.replace(/log\.questionText/g, 'log.q');
content = content.replace(/log\.selectedText/g, 'log.a');

fs.writeFileSync('app/page.tsx', content, 'utf8');
console.log('Fixed logs');
