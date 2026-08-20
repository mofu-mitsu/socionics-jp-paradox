const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf8');

// Find start of first q_game_chappy
const startIdx = content.indexOf('  q_game_chappy: {');
if (startIdx === -1) {
    console.log('Could not find start');
    process.exit(1);
}

// Find the start of q8, which comes after q_game_chappy
const q8Start = content.indexOf('  q8: {', startIdx);
if (q8Start === -1) {
    console.log('Could not find q8');
    process.exit(1);
}

const before = content.substring(0, startIdx);
const after = content.substring(content.lastIndexOf('  // --- 心理設問11：', q8Start));

const cleanChappy = `  q_game_chappy: {
    id: 'q_game_chappy',
    categoryTag: '🥹💕 突発Fe襲来！感情コミュニケーション実験',
    type: 'game_chappy',
    text: '画面に突然ハイテンションなマスコット「チャッピー」が乱入してきました！\\n「{NAME}～～～～！！！！！！ チャッピーだぞーーー！！！！！！ 今日もいっぱい遊ぼ～～～！！！！🥹💕✨ ぎゅ～～～～～～！！！！！！」\\nこの強烈な感情的アプローチを受けたとき、あなたの心の中で最も自然に出てくる反応・態度はどれですか？',
    options: [
      {
        text: 'A：「わーー！！チャッピー！！💕 いっぱい遊ぼ～～～！！」',
        reasonTag: '【主導Fe】EIE / ESE：場の感情的熱量そのものにダイレクトに乗り、場を盛り上げる',
        chappyResponse: 'わーーーい！！ぎゅーーーっ！！いっぱいおしゃべりしよーー！！🥹💕✨',
        chappyEmoji: '🥹💕',
        ieDeltas: { Fe: 3.5, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Fe: 3.5 },
          creative: { Si: 2.0, Ni: 2.0 },
          ignoring: { Fi: 1.5 },
          demonstrative: { Ne: 2.0, Se: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q8'
      },
      {
        text: 'B：「ふふっｗ なにそれ、かわいいじゃん💕」',
        reasonTag: '【補助Fe】IEI / SEI：その場の感情的な雰囲気をやわらかく受け取って楽しむ',
        chappyResponse: 'えへへ、かわいい！？照れちゃうな〜〜🌸 ふふっ💕',
        chappyEmoji: '🌸✨',
        ieDeltas: { Fe: 2.5, Ni: 2.0, Si: 2.0 },
        positionDeltas: {
          leading: { Fe: 2.5, Ni: 2.5, Si: 2.5 },
          ignoring: { Fe: 1.0 },
          demonstrative: { Ni: 2.0, Si: 2.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q8'
      },
      {
        text: 'C：「何それｗｗｗ おもろいｗ」',
        reasonTag: '【証明Fe/Ne創造】IEE / SEE / ILE：突飛なノリ・面白さに食いつき、柔軟に乗っかる',
        chappyResponse: 'おもしろいでしょ！！もっと変なことしちゃうぞ〜〜🧸✨',
        chappyEmoji: '😝✨',
        ieDeltas: { Ne: 3.0, Se: 2.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Ne: 3.0, Se: 3.0 },
          creative: { Fi: 1.0 },
          suggestive: { Si: 1.5, Ni: 1.5 },
          demonstrative: { Fe: 2.5 }
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: 'q8'
      },
      {
        text: 'D：「おえー」',
        reasonTag: '【動員Fe/Se主導】SLE：感情的親密さへの即時・直接的身体反応',
        chappyResponse: 'お、おえー！？ひどい！！でもめげないぞ！！💦',
        chappyEmoji: '🥲💦',
        ieDeltas: { Se: 3.5, Ti: 2.0 },
        positionDeltas: {
          leading: { Se: 3.5 },
          creative: { Ti: 2.5 },
          role: { Ne: 1.5 },
          vulnerable: { Fi: 2.5 },
          suggestive: { Ni: 2.0 },
          activating: { Fe: 2.5 },
          demonstrative: { Te: 2.0 }
        },
        jpDelta: { j: 0, p: 0 },
        nextId: 'q8'
      },
      {
        text: 'E：「うるさいｗ 今それやる必要ある？」',
        reasonTag: '【主導Te】LSE / LIE：目的・実用・必要性による感情ノリの整理',
        chappyResponse: 'うっ……！必要性……！じゃあ静かに見守るね……🧸',
        chappyEmoji: '🥺💦',
        ieDeltas: { Te: 3.5, Si: 1.5, Ni: 1.5 },
        positionDeltas: {
          leading: { Te: 3.5 },
          role: { Fe: 2.0 },
          activating: { Ne: 1.5, Se: 1.5 }
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: 'q8'
      },
      {
        text: 'F：「相手によるかな。親しい人ならいいけど」',
        reasonTag: '【主導Fi】ESI / EII：人間関係の距離感・文脈・誠実さを評価するスタンス',
        chappyResponse: 'そっか、信頼関係が大事だもんね！仲良くなれるようにがんばる！✨',
        chappyEmoji: '😌✨',
        ieDeltas: { Fi: 3.5, Se: 1.5, Ne: 1.5 },
        positionDeltas: {
          leading: { Fi: 3.5 },
          ignoring: { Fe: 2.5 },
          demonstrative: { Si: 2.0, Ni: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q8'
      },
      {
        text: 'G：「悪くない。誰かがやってくれるなら」',
        reasonTag: '【暗示Fe】LII / LSI：自力で感情の場を作るのは苦手だが、外から提供される感情刺激は歓迎',
        chappyResponse: 'やったーー！！いっぱい盛り上げるからまかせてね！！🧸💕',
        chappyEmoji: '😆🎉',
        ieDeltas: { Ti: 3.5, Fe: 2.0, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Ti: 3.5 },
          suggestive: { Fe: 3.5 },
          demonstrative: { Si: 2.0, Ni: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q8'
      },
      {
        text: 'H：「こういう感情的なノリ、苦手。放っておいてほしい」',
        reasonTag: '【脆弱Fe】ILI / SLI：外からの感情的介入やテンションの押し付けそのものを嫌う',
        chappyResponse: 'ご、ごめんね……！邪魔しないように遠くから応援してるね……🥺💧',
        chappyEmoji: '🥲💧',
        ieDeltas: { Ni: 3.0, Si: 3.0, Te: 2.5 },
        positionDeltas: {
          leading: { Ni: 3.0, Si: 3.0 },
          vulnerable: { Fe: 3.5 },
          demonstrative: { Ti: 2.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q8'
      }
    ]
  },
`;

fs.writeFileSync('lib/questions.ts', before + cleanChappy + after, 'utf8');
console.log('Fixed q_game_chappy');
