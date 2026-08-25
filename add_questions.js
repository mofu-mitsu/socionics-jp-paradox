const fs = require('fs');

const questionsToAdd = `
  // ==========================================================================
  // 【ILI vs LII vs LSI 専用設問1】
  // 抽象情報をどう処理するか
  // ==========================================================================
  q_ili_lii_lsi_split_1: {
    id: 'q_ili_lii_lsi_split_1',
    categoryTag: '🧠 抽象情報の処理と構造化',
    type: 'standard',
    text: '意味や構造が曖昧な抽象的な説明を読んだ時、あなたの頭の中で最も起こりやすい反応は？',
    options: [
      {
        text: 'まず「その言葉は具体的に何を指している？」「前提条件は？」「その結論に至る因果関係は？」と定義や論理構造を確認したくなる。情報が足りなければ、別の解釈や可能性も並べながら、最終的に矛盾のない形へ整理したい。',
        reasonTag: '【LII】1Ti, 2Ne, 8Te（定義・因果関係の監査＋可能性の整理）',
        ieDeltas: { Ti: 3.0, Ne: 2.5, Te: 1.0, Ni: 0.5, Se: -1.5, Si: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.0 }, creative: { Ne: 2.5 }, demonstrative: { Te: 1.0 },
          suggestive: { Fe: 0.5 }, vulnerable: { Se: 1.5 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q_ili_lii_lsi_split_2'
      },
      {
        text: '細かい定義を一つずつ固定するより、「この話は結局どこにあ向かっているのか？」という全体の流れを見る。情報が足りなくても、過去から現在までの流れや傾向から、その先に起こりそうな展開をぼんやり予測する。',
        reasonTag: '【ILI】1Ni, 2Te, 8Ti（時間軸・潮流・未来への収束）',
        ieDeltas: { Ni: 3.0, Te: 2.5, Ti: 1.0, Ne: 0.5, Se: -0.5, Si: 1.5, Fe: -1.0, Fi: 1.0 },
        positionDeltas: {
          leading: { Ni: 3.0 }, creative: { Te: 2.5 }, demonstrative: { Ti: 1.0 },
          suggestive: { Se: 0.5 }, vulnerable: { Fe: 1.5 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q_ili_lii_lsi_split_2'
      },
      {
        text: '曖昧な概念をそのまま漂わせるのが気持ち悪く、具体的な物体・配置・力関係・手順などに置き換えて考えたくなる。「この仕組みは実際には何がどこにあって、どう作用しているのか？」まで落とし込み、明確な構造として把握したい。',
        reasonTag: '【LSI】1Ti, 2Se, 8Si（抽象の物質化＋具体的構造の固定）',
        ieDeltas: { Ti: 3.0, Se: 2.5, Si: 1.5, Te: 1.0, Ne: -2.0, Ni: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.0 }, creative: { Se: 2.5 }, demonstrative: { Si: 1.5 },
          ignoring: { Te: 1.0 }, vulnerable: { Ne: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_ili_lii_lsi_split_2'
      }
    ]
  },
  // ==========================================================================
  // 【ILI vs LII vs LSI 専用設問2】
  // 未来・予測・不確定要素
  // ==========================================================================
  q_ili_lii_lsi_split_2: {
    id: 'q_ili_lii_lsi_split_2',
    categoryTag: '🔮 未来予測と不確定要素への態度',
    type: 'standard',
    text: 'まだ結果が出ていない出来事について考える時、あなたの感覚に一番近いものは？',
    options: [
      {
        text: '今ある情報から考えられる複数の可能性を比較し、「この条件ならA、この条件ならB」と整理する。遠い未来ほど不確定要素が増えるので、一つの結論に固定するより、条件ごとの分岐を残しておきたい。',
        reasonTag: '【LII】1Ti, 2Ne, 8Ni（条件分岐・可能性の比較）',
        ieDeltas: { Ti: 2.5, Ne: 3.0, Ni: 1.5, Te: 0.5, Se: -1.0, Si: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 2.5 }, creative: { Ne: 3.0 }, demonstrative: { Ni: 1.5 },
          vulnerable: { Se: 1.0 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q_ili_lii_lsi_split_3'
      },
      {
        text: '現在の状況だけでなく、過去から現在までの流れを見ると「このまま行けば最終的にこうなりそう」という一本の潮流が見えてくる。未来はまだ決まっていなくても、長期的な傾向から結末を予測してしまう。',
        reasonTag: '【ILI】1Ni, 2Te, 8Ti（時間の流れ・長期的収束）',
        ieDeltas: { Ni: 3.5, Te: 2.0, Ti: 1.0, Ne: -0.5, Se: -0.5, Si: 1.0, Fe: -1.0, Fi: 0.5 },
        positionDeltas: {
          leading: { Ni: 3.5 }, creative: { Te: 2.0 }, demonstrative: { Ti: 1.0 },
          vulnerable: { Fe: 1.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q_ili_lii_lsi_split_3'
      },
      {
        text: '不確定な未来をあれこれ想像するより、現在わかっている事実・条件・既存のルールを確認する。そのうえで、現場の状況に応じて必要な手順を決め、実際に問題が起きたらその都度対処すればいい。',
        reasonTag: '【LSI】1Ti, 2Se, 8Si（現状確認・既存条件・実務対応）',
        ieDeltas: { Ti: 2.5, Se: 2.5, Si: 1.5, Ne: -2.0, Ni: 0.5, Te: 1.0, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 2.5 }, creative: { Se: 2.5 }, demonstrative: { Si: 1.5 },
          vulnerable: { Ne: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_ili_lii_lsi_split_3'
      }
    ]
  },
  // ==========================================================================
  // 【ILI vs LII vs LSI 専用設問3】
  // 既存の理論・自認と新しい可能性
  // ==========================================================================
  q_ili_lii_lsi_split_3: {
    id: 'q_ili_lii_lsi_split_3',
    categoryTag: '🧩 自認・理論と新しい可能性',
    type: 'standard',
    text: '自分が長く考えて「これが一番筋が通っている」と決めた理論や自認に、別の可能性を提示された時は？',
    options: [
      {
        text: '「なるほど、その可能性もあるか」と一度は検討する。むしろ新しい視点を材料にして、元の理論のどこが強く、どこに条件を追加すべきかを再構築したくなる。最終的に元の結論へ戻ることもある。',
        reasonTag: '【LII】1Ti, 2Ne, 3Fi（可能性を材料にした理論再構築）',
        ieDeltas: { Ti: 3.0, Ne: 3.0, Fi: 1.0, Ni: 0.5, Se: -1.0, Si: 0.5, Fe: 0.5, Te: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.0 }, creative: { Ne: 3.0 }, role: { Fi: 1.0 },
          vulnerable: { Se: 1.0 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q_ili_lii_lsi_split_4'
      },
      {
        text: '新しい可能性そのものより、「その変更によって今後どうなるのか」を見る。もし新しい説のほうが将来の展開をうまく説明できるなら静かに乗り換えるし、そうでなければ特に感情的にならず放置する。',
        reasonTag: '【ILI】1Ni, 2Te, 5Se（将来の流れを見て採用・放置）',
        ieDeltas: { Ni: 3.0, Te: 2.5, Se: 1.0, Ne: 0.5, Ti: 1.0, Si: 1.0, Fe: -0.5, Fi: 0.5 },
        positionDeltas: {
          leading: { Ni: 3.0 }, creative: { Te: 2.5 }, suggestive: { Se: 1.0 },
          demonstrative: { Ti: 1.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q_ili_lii_lsi_split_4'
      },
      {
        text: '「これが正しい」と決めた枠組みに、根拠の薄い別案を次々持ち込まれるとかなり苛立つ。「その可能性を考えて何が変わるの？」となり、不要な分岐を切って元のルールや方針を維持したくなる。',
        reasonTag: '【LSI】1Ti, 2Se, 4Ne（既存体系の防衛・不要な可能性の排除）',
        ieDeltas: { Ti: 3.0, Se: 2.5, Ne: -3.0, Si: 1.0, Te: 1.0, Ni: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.0 }, creative: { Se: 2.5 }, vulnerable: { Ne: 3.0 },
          demonstrative: { Si: 1.0 }
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: 'q_ili_lii_lsi_split_4'
      }
    ]
  },
  // ==========================================================================
  // 【ILI vs LII vs LSI 専用設問4】
  // 外部からの圧力・強制・マウントへの反応
  // ==========================================================================
  q_ili_lii_lsi_split_4: {
    id: 'q_ili_lii_lsi_split_4',
    categoryTag: '⚔️ 外圧・強制・境界線への反応',
    type: 'standard',
    text: '外部から「早くやれ」「今すぐ決めろ」「黙って従え」と強く圧をかけられた時、最も近い反応は？',
    options: [
      {
        text: '「うわ、無理。急かさないで」となり、反発するより先に距離を取りたくなる。強い圧を受けると頭が真っ白になったり、静かな場所へ引っ込んで自分のペースを取り戻したくなる。',
        reasonTag: '【LII】1Ti, 4Se（外圧への弱さ・撤退）',
        ieDeltas: { Ti: 2.0, Se: -3.0, Ne: 1.0, Ni: 0.5, Te: 0.5, Si: 1.0, Fe: 1.0, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 2.0 }, creative: { Ne: 1.0 }, vulnerable: { Se: 3.0 },
          suggestive: { Fe: 1.0 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q_ili_lii_lsi_split_5'
      },
      {
        text: '自分から強く動くより、誰かが方向を決めて引っ張ってくれたほうが楽なことがある。「はいはい、行けばいいんでしょ」と受け入れて動く。ただし意味のない強制や感情的な騒ぎには付き合いたくない。',
        reasonTag: '【ILI】1Ni, 5Se, 4Fe（外部からの行動推進を利用・感情的圧力は拒否）',
        ieDeltas: { Ni: 2.5, Se: 2.0, Te: 1.5, Fe: -2.0, Ti: 0.5, Ne: 0.5, Si: 1.0, Fi: 1.0 },
        positionDeltas: {
          leading: { Ni: 2.5 }, creative: { Te: 1.5 }, suggestive: { Se: 2.0 },
          vulnerable: { Fe: 2.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q_ili_lii_lsi_split_5'
      },
      {
        text: '「うるさい！」「急かすな！」と内心、あるいは実際にキレたくなる。自分の領域やルールに外部から勝手に踏み込まれること自体が許せず、必要なら相手を押し返して自分の主導権を取り戻したくなる。',
        reasonTag: '【LSI】1Ti, 2Se（外圧への対抗・領域防衛・主導権奪還）',
        ieDeltas: { Ti: 3.0, Se: 3.0, Ne: -1.5, Si: 1.0, Te: 1.0, Ni: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.0 }, creative: { Se: 3.0 }, vulnerable: { Ne: 1.5 },
          demonstrative: { Si: 1.0 }
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: 'q_ili_lii_lsi_split_5'
      }
    ]
  },
  // ==========================================================================
  // 【ILI vs LII vs LSI 専用設問5】
  // 理論と現実への接続
  // ==========================================================================
  q_ili_lii_lsi_split_5: {
    id: 'q_ili_lii_lsi_split_5',
    categoryTag: '🔧 理論・構造・現実への落とし込み',
    type: 'standard',
    text: '自分なりの理論や仕組みを作る時、「正しい構造」をどう扱う感覚が一番近い？',
    options: [
      {
        text: 'まず全体の概念や関係性を整理し、「どの条件なら成立するのか」「例外は何か」まで含めて一貫した体系を作りたい。実用化する時も、その体系から矛盾なく具体的な仕様へ落としていく。',
        reasonTag: '【LII】1Ti, 2Ne, 8Te（普遍構造→条件分岐→具体化）',
        ieDeltas: { Ti: 3.5, Ne: 2.5, Te: 1.5, Ni: 0.5, Se: -1.5, Si: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.5 }, creative: { Ne: 2.5 }, demonstrative: { Te: 1.5 },
          vulnerable: { Se: 1.5 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: null
      },
      {
        text: '理論そのものを完成させることより、「この考え方を使うと今後どうなるか」を見る。時間が経って状況が変われば、同じ理論に固執せず、その時点で最も現実的な予測や判断ができる形に更新していく。',
        reasonTag: '【ILI】1Ni, 2Te, 8Ti（理論より時間軸・予測・実利）',
        ieDeltas: { Ni: 3.5, Te: 2.5, Ti: 1.5, Ne: 0.5, Se: 0.5, Si: 1.0, Fe: -0.5, Fi: 0.5 },
        positionDeltas: {
          leading: { Ni: 3.5 }, creative: { Te: 2.5 }, demonstrative: { Ti: 1.5 },
          suggestive: { Se: 0.5 }, vulnerable: { Fe: 1.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: null
      },
      {
        text: '理論を実際のルール・手順・配置・役割分担などに落とし込み、現場でブレずに機能する形へ固定したい。何をどう動かせば結果が変わるのかまで具体化し、一度決めた基準は簡単には変更しない。',
        reasonTag: '【LSI】1Ti, 2Se, 8Si（論理→具体的ルール・配置・運用）',
        ieDeltas: { Ti: 3.5, Se: 3.0, Si: 1.5, Te: 1.0, Ne: -2.0, Ni: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.5 }, creative: { Se: 3.0 }, demonstrative: { Si: 1.5 },
          ignoring: { Te: 1.0 }, vulnerable: { Ne: 2.0 }
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: null
      }
    ]
  },
`;

const content = fs.readFileSync('lib/questions.ts', 'utf-8');
const closingBraceIndex = content.lastIndexOf('};');
if (closingBraceIndex !== -1) {
    const newContent = content.substring(0, closingBraceIndex) + questionsToAdd + content.substring(closingBraceIndex);
    fs.writeFileSync('lib/questions.ts', newContent);
    console.log("Successfully added questions");
} else {
    console.error("Could not find closing brace of QUESTIONS object");
}
