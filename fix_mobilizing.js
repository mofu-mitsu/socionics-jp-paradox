const fs = require('fs');

let content = fs.readFileSync('lib/questions.ts', 'utf8');

// q_suggestive_mobilizing の nextId を更新
content = content.replace(
  /q_suggestive_mobilizing: \{[\s\S]*?nextId: 'result',/g,
  (match) => match.replace("nextId: 'result'", "nextId: 'q_mobilizing'")
);

const newQuestion = `
  q_mobilizing: {
    id: 'q_mobilizing',
    categoryTag: '🔥 活性化・動員（複数選択可）',
    type: 'multiple',
    text: 'あなたが「これを示してもらえると動きやすい」「これを提案されるとやる気が出る、助かる」と感じるものを**すべて**選んでください。',
    nextId: 'result',
    options: [
      {
        text: '🔮 考えたことを実際の行動につなげたい。自分だけで考え続けるより、「まずやってみよう」と背中を押してもらえたり、挑戦するきっかけを与えてもらえると動きやすい。',
        reasonTag: '【Ni補助 → Se動員】LIE・EIE',
        ieDeltas: { Ni: 1.0, Se: 2.0 },
        positionDeltas: { creative: { Ni: 1.0 }, activating: { Se: 2.0 }, suggestive: { Se: 1.0 } },
        jpDelta: { j: 1.0, p: 0 }
      },
      {
        text: '⚔️ 自分の目的に向かって進みたいが、今どう動くべきか迷ったり焦ったりすることがある。この先どうなりそうか、今は急ぐべきかを示してもらえると、落ち着いて判断しやすい。',
        reasonTag: '【Se補助 → Ni動員】LSI・ESI',
        ieDeltas: { Se: 1.0, Ni: 2.0 },
        positionDeltas: { creative: { Se: 1.0 }, activating: { Ni: 2.0 }, suggestive: { Ni: 1.0 } },
        jpDelta: { j: 1.0, p: 0 }
      },
      {
        text: '🌿 いつものやり方を大切にしつつも、もっと便利にしたり良くしたりできる方法も知りたい。「こんなやり方もあるよ」と、新しい可能性や改善案を示してもらえると試してみたくなる。',
        reasonTag: '【Si補助 → Ne動員】ESE・LSE',
        ieDeltas: { Si: 1.0, Ne: 2.0 },
        positionDeltas: { creative: { Si: 1.0 }, activating: { Ne: 2.0 }, suggestive: { Ne: 1.0 } },
        jpDelta: { j: 1.0, p: 0 }
      },
      {
        text: '💡 物事の可能性や理想について考えるのは好きだが、自分の疲れや緊張には気づきにくい。リラックスできる環境を整えてもらったり、楽しい過ごし方を提案してもらえると助かる。',
        reasonTag: '【Ne補助 → Si動員】LII・EII',
        ieDeltas: { Ne: 1.0, Si: 2.0 },
        positionDeltas: { creative: { Ne: 1.0 }, activating: { Si: 2.0 }, suggestive: { Si: 1.0 } },
        jpDelta: { j: 1.0, p: 0 }
      },
      {
        text: '📊 人の気持ちや好意を自分だけで読み取るより、相手から分かりやすく示してもらえると安心する。自分が大切にされていることや、相手がどう感じているのかを自然に伝えてもらえると、信頼して関係を築きやすい。',
        reasonTag: '【Te補助 → Fi動員】ILI・SLI',
        ieDeltas: { Te: 1.0, Fi: 2.0 },
        positionDeltas: { creative: { Te: 1.0 }, activating: { Fi: 2.0 }, suggestive: { Fi: 1.0 } },
        jpDelta: { j: 0, p: 1.0 }
      },
      {
        text: '🗡️ 自分が興味を持っていることについて、役立つ知識や具体的な方法を教えてもらえると安心する。自分だけで情報を選ぶより、詳しい人から『これが有効だよ』と示してもらえると動きやすい。',
        reasonTag: '【Fi補助 → Te動員】IEE・SEE',
        ieDeltas: { Fi: 1.0, Te: 2.0 },
        positionDeltas: { creative: { Fi: 1.0 }, activating: { Te: 2.0 }, suggestive: { Te: 1.0 } },
        jpDelta: { j: 0, p: 1.0 }
      },
      {
        text: '🧠 考えを整理したり可能性を考えたりするだけでなく、前向きで明るい反応を返してもらえると動きやすい。「それ面白そう」「やってみよう」と気持ちを明るくしてくれるような雰囲気があると嬉しい。',
        reasonTag: '【Ti補助 → Fe動員】ILE・SLE',
        ieDeltas: { Ti: 1.0, Fe: 2.0 },
        positionDeltas: { creative: { Ti: 1.0 }, activating: { Fe: 2.0 }, suggestive: { Fe: 1.0 } },
        jpDelta: { j: 0, p: 1.0 }
      },
      {
        text: '🎭 考えや信念が混乱したとき、物事を筋道立てて整理してもらえると安心する。自分の行動や考えが、どんな理屈につながっているのかを分かりやすく説明してもらえると納得しやすい。',
        reasonTag: '【Fe補助 → Ti動員】IEI・SEI',
        ieDeltas: { Fe: 1.0, Ti: 2.0 },
        positionDeltas: { creative: { Fe: 1.0 }, activating: { Ti: 2.0 }, suggestive: { Ti: 1.0 } },
        jpDelta: { j: 0, p: 1.0 }
      }
    ]
  }
};
`;

content = content.replace(/  \}\n\};\n?$/, newQuestion);

fs.writeFileSync('lib/questions.ts', content);
console.log("updated");
