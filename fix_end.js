const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf8');

const insertStr = `
  q_suggestive_mobilizing: {
    id: 'q_suggestive_mobilizing',
    categoryTag: '✨ 無意識の欲求（複数選択可）',
    type: 'multiple',
    text: 'あなたが「こういう風にしてもらえるとすごく助かる」「自然と惹かれる・安心する」と感じるものを**すべて**選んでください。',
    nextId: 'result',
    options: [
      {
        text: '🔮 考えているだけで終わらず、まず動いてみるきっかけがほしい。具体的な行動や挑戦に誘ってもらえると、自分一人では動き出しにくいことにも取り組みやすい。',
        reasonTag: '【Ni主導 → Se暗示】ILI・IEI',
        ieDeltas: { Ni: 1.5, Se: 1.5 },
        positionDeltas: { leading: { Ni: 1.0 }, suggestive: { Se: 1.0 } },
        jpDelta: { j: 0, p: 1.0 }
      },
      {
        text: '⚔️ 目の前のことを進めるだけでなく、この先どうなるのか、どこへ向かうのかを示してほしい。今の行動がどんな未来につながるのか分かると、進む方向を決めやすい。',
        reasonTag: '【Se主導 → Ni暗示】SLE・SEE',
        ieDeltas: { Se: 1.5, Ni: 1.5 },
        positionDeltas: { leading: { Se: 1.0 }, suggestive: { Ni: 1.0 } },
        jpDelta: { j: 0, p: 1.0 }
      },
      {
        text: '🌿 今の心地よさを大切にしながら、自分では思いつかない新しい楽しみや可能性も教えてほしい。「こんなのもあるよ」と気軽に提案してもらえると嬉しい。',
        reasonTag: '【Si主導 → Ne暗示】SEI・SLI',
        ieDeltas: { Si: 1.5, Ne: 1.5 },
        positionDeltas: { leading: { Si: 1.0 }, suggestive: { Ne: 1.0 } },
        jpDelta: { j: 0, p: 1.0 }
      },
      {
        text: '💡 新しいことを考えたり試したりする一方で、自分の体調や本当の欲求には気づきにくい。安心して過ごせる環境を整えてくれたり、休息や心地よさを気にかけてもらえると助かる。',
        reasonTag: '【Ne主導 → Si暗示】ILE・IEE',
        ieDeltas: { Ne: 1.5, Si: 1.5 },
        positionDeltas: { leading: { Ne: 1.0 }, suggestive: { Si: 1.0 } },
        jpDelta: { j: 0, p: 1.0 }
      },
      {
        text: '📊 効率や成果だけでなく、人との信頼関係や大切な気持ちも知りたい。自分と相手がどういう関係なのか、何を大切にしているのかを分かりやすく示してもらえると安心する。',
        reasonTag: '【Te主導 → Fi暗示】LIE・LSE',
        ieDeltas: { Te: 1.5, Fi: 1.5 },
        positionDeltas: { leading: { Te: 1.0 }, suggestive: { Fi: 1.0 } },
        jpDelta: { j: 1.0, p: 0 }
      },
      {
        text: '🗡️ 自分が大切だと思うことを、現実の中でも実現する方法を知りたい。具体的に何をすれば役に立つのか、成果につながるのかを分かりやすく教えてもらえると助かる。',
        reasonTag: '【Fi主導 → Te暗示】ESI・EII',
        ieDeltas: { Fi: 1.5, Te: 1.5 },
        positionDeltas: { leading: { Fi: 1.0 }, suggestive: { Te: 1.0 } },
        jpDelta: { j: 1.0, p: 0 }
      },
      {
        text: '🧠 筋道を立てて考えるだけでなく、明るく楽しい雰囲気や感情の動きにも触れたい。面白い話やノリのいい反応で、気軽に場を盛り上げてもらえると嬉しい。',
        reasonTag: '【Ti主導 → Fe暗示】LII・LSI',
        ieDeltas: { Ti: 1.5, Fe: 1.5 },
        positionDeltas: { leading: { Ti: 1.0 }, suggestive: { Fe: 1.0 } },
        jpDelta: { j: 1.0, p: 0 }
      },
      {
        text: '🎭 物事を体系立てて整理し、概念を分かりやすく説明してくれる人を頼りにしたい。自分の行動がなぜ意味を持つのか、筋道を立てて説明してもらえると安心して動ける。',
        reasonTag: '【Fe主導 → Ti暗示】EIE・ESE',
        ieDeltas: { Fe: 1.5, Ti: 1.5 },
        positionDeltas: { leading: { Fe: 1.0 }, suggestive: { Ti: 1.0 } },
        jpDelta: { j: 1.0, p: 0 }
      }
    ]
  }
};
`;

content = content.replace(/  \},\n  };\n$/, insertStr);

fs.writeFileSync('lib/questions.ts', content);
