const fs = require('fs');

let content = fs.readFileSync('lib/questions.ts', 'utf8');

// 1. typeの更新
content = content.replace(
  "type?: 'standard' | 'game_trash' | 'game_plant' | 'game_chappy';",
  "type?: 'standard' | 'game_trash' | 'game_plant' | 'game_chappy' | 'multiple';\n  nextId?: string;"
);

// 2. nextId の書き換え
// 既存の配点はいじらないように、正規表現で nextId のみを置換する。

const replacements = {
  // q6a, q6b
  "q6a: {": { from: "nextId: 'result'", to: "nextId: 'q7'" },
  "q6b: {": { from: "nextId: 'result'", to: "nextId: 'q7'" },
  
  // q10, q_fi_position
  "q10: {": { from: "nextId: 'end'", to: "nextId: 'q_fi_position'" },
  "q_fi_position: {": { from: "nextId: 'end'", to: "nextId: 'q_thinking_style'" },

  // q_thinking_style の感情型
  "// E（感情型全般）\n        text: '「論理やデータ、効率の算出よりも": { from: "nextId: 'end'", to: "nextId: 'q_dislike_type'" },

  // deep群
  "q_lii_lsi_deep: {": { from: "nextId: 'end'", to: "nextId: 'q_dislike_type'" },
  "q_ili_sli_deep: {": { from: "nextId: 'end'", to: "nextId: 'q_dislike_type'" },
  "q_lie_lse_deep: {": { from: "nextId: 'end'", to: "nextId: 'q_dislike_type'" },
  "q_ile_sle_deep: {": { from: "nextId: 'end'", to: "nextId: 'q_dislike_type'" },

  // q_dislike_type
  "q_dislike_type: {": { from: "nextId: 'end'", to: "nextId: 'q_thinking_style_5step'" },

  // q_thinking_style_5step
  "q_thinking_style_5step: {": { from: "nextId: 'end'", to: "nextId: 'q_bureaucracy_response'" },

  // q_bureaucracy_response
  "q_bureaucracy_response: {": { from: "nextId: 'end'", to: "nextId: 'q_perception_1'" },

  // q_perception_1, 2, romantic
  "q_perception_1: {": { from: "nextId: 'end'", to: "nextId: 'q_perception_2'" },
  "q_perception_2: {": { from: "nextId: 'end'", to: "nextId: 'q_romantic_style'" },
  "q_romantic_style: {": { from: "nextId: 'end'", to: "nextId: 'q_suggestive_mobilizing'" },
};

let lines = content.split('\n');
let currentContext = null;

for (let i = 0; i < lines.length; i++) {
  // コンテキストの追跡
  for (const key of Object.keys(replacements)) {
    if (lines[i].includes(key)) {
      currentContext = key;
    }
  }
  
  if (currentContext && lines[i].includes(replacements[currentContext].from)) {
    lines[i] = lines[i].replace(replacements[currentContext].from, replacements[currentContext].to);
  }
}
content = lines.join('\n');

// 新しい質問の追加
const newQuestion = `
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
  },
};`;

content = content.replace("};", newQuestion);

fs.writeFileSync('lib/questions.ts', content);
console.log("Updated questions.ts");
