const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf8');

// 1. 状態変数の追加
const stateInsert = `  const [selectedMultipleOptions, setSelectedMultipleOptions] = useState<Option[]>([]);`;
content = content.replace(
  `  const [history, setHistory] = useState<`,
  stateInsert + `\n  const [history, setHistory] = useState<`
);

// 2. handleSelectOption の前に handleSubmitMultiple を追加
const handleSubmitCode = `
  const toggleMultipleOption = (option: Option) => {
    setSelectedMultipleOptions(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleSubmitMultiple = () => {
    if (selectedMultipleOptions.length === 0) {
      alert("少なくとも1つは選んでね！");
      return;
    }
    
    const currentQ = QUESTIONS[currentQId];
    if (!currentQ) return;

    const qText = currentQ.text;
    const aText = selectedMultipleOptions.map((o, i) => \`\${i + 1}. \${o.text}\`).join('\\n');
    const reasonText = selectedMultipleOptions.map(o => o.reasonTag).join(' / ');

    const newLogs = [
      ...actionLogs,
      { q: qText, a: aText, reason: reasonText },
    ];

    setHistory((prev) => [
      ...prev,
      {
        qId: currentQId,
        ieScores: { ...ieScores },
        posSignatures: JSON.parse(JSON.stringify(posSignatures)),
        jp: { ...jpScore },
        logs: [...actionLogs],
      },
    ]);

    setActionLogs(newLogs);

    let nextJ = 0;
    let nextP = 0;
    const nextIeScores = { ...ieScores };
    const nextPosSignatures = JSON.parse(JSON.stringify(posSignatures));

    selectedMultipleOptions.forEach(option => {
      if (option.ieDeltas) {
        Object.entries(option.ieDeltas).forEach(([ieKey, val]) => {
          const ie = ieKey as IE;
          nextIeScores[ie] = (nextIeScores[ie] || 0) + (val || 0);
        });
      }
      if (option.positionDeltas) {
        Object.entries(option.positionDeltas).forEach(([posKey, ieDeltas]) => {
          const pos = posKey as ModelPosition;
          if (ieDeltas) {
            Object.entries(ieDeltas).forEach(([ieKey, delta]) => {
              const ie = ieKey as IE;
              nextPosSignatures[pos][ie] = (nextPosSignatures[pos][ie] || 0) + (delta || 0);
            });
          }
        });
      }
      nextJ += option.jpDelta.j;
      nextP += option.jpDelta.p;
    });

    setIeScores(nextIeScores);
    setPosSignatures(nextPosSignatures);
    setJpScore(prev => ({ j: prev.j + nextJ, p: prev.p + nextP }));
    setSelectedMultipleOptions([]);

    const nextId = currentQ.nextId;
    if (nextId && nextId !== "result" && nextId !== "end") {
      setCurrentQId(nextId);
    } else {
      triggerConfetti();
      setStep("result");
    }
  };

`;

content = content.replace(
  "  // 通常設問の選択肢ハンドリング",
  handleSubmitCode + "  // 通常設問の選択肢ハンドリング"
);

// 3. 戻るボタンのとき selectedMultipleOptions をリセット
content = content.replace(
  "    setHistory(prev => prev.slice(0, prev.length - 1));",
  "    setSelectedMultipleOptions([]);\n    setHistory(prev => prev.slice(0, prev.length - 1));"
);

fs.writeFileSync('app/page.tsx', content);
console.log("Updated page.tsx logic");
