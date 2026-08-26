import { IE, ModelPosition } from "./socionics";

export type Option = {
  text: string;
  reasonTag: string;
  ieDeltas?: Partial<Record<IE, number>>;
  positionDeltas?: Partial<Record<ModelPosition, Partial<Record<IE, number>>>>;
  jpDelta?: { j: number; p: number };
  nextId?: string;
  isDarlingEnding?: boolean;
  chappyResponse?: string;
  chappyEmoji?: string;
};

export type Question = {
  id: string;
  categoryTag?: string;
  type?: "standard" | "game_trash" | "game_plant" | "game_chappy" | "game_intercom" | "text_input" | "multiple";
  nextId?: string;
  isDarlingEnding?: boolean;
  text: string;
  options: Option[];
};

export const QUESTIONS: Record<string, Question> = {
  // --- 心理設問1：状況1 (純粋な意思決定) ---
  q1: {
    id: "q1",
    categoryTag: "🗑️ 状況1：机の上の散らかり",
    type: "standard",
    text: "明日の予定はありません。\nでも机の上はゴミだらけ。疲れていて片付ける気力はあまりありません。\n現実のあなたなら、どう行動しますか？",
    options: [
      {
        text: "A：面倒でも片付ける",
        reasonTag: "【状況1】A：面倒でも片付けるを選択",
        ieDeltas: { Se: 1.0 },
        positionDeltas: {
          leading: { Se: 1.0 },
          creative: { Se: 1.0 },
          vulnerable: { Si: 1.5 },
          demonstrative: { Se: 1.0, Si: 1.5 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q1a",
      },
      {
        text: "B：今日は休む。明日でもいい",
        reasonTag: "【状況1】B：今日は休むを選択",
        ieDeltas: { Si: 2.0, Ni: 1.0 },
        positionDeltas: {
          leading: { Si: 1.5, Ni: 1.5, Ne: 1.0 },
          creative: { Fe: 1.0, Te: 1.0, Fi: 1.0 },
          role: { Si: 1.0, Ni: 1.0, Se: 1.0 },
          vulnerable: { Te: 1.0, Fe: 1.0 },
          suggestive: { Se: 1.0, Ne: 1.0, Si: 1.5 },
          activating: { Fi: 1.0, Ti: 1.0, Te: 1.0 },
          ignoring: { Ne: 1.0, Se: 1.0, Ni: 1.0 },
          demonstrative: { Fi: 1.0, Ti: 1.0, Fe: 1.0 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q1b",
      },
    ],
  },
  q1a: {
    id: "q1a",
    categoryTag: "🗑️ 状況1：片付ける動機（なぜ？）",
    type: "standard",
    text: "「面倒でも片付ける」を選びましたね。その【根本的な動機】はどれに最も近いですか？",
    options: [
      {
        text: "散らかっている不快な状態が生理的・感覚的に耐えられないから",
        reasonTag: "動機: 感覚的不快の解消",
        ieDeltas: { Si: 2.0, Se: 1.5 },
        positionDeltas: {
          demonstrative: { Si: 2.0 },
          activating: { Si: 1.5 },
          creative: { Se: 1.5 },
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: "q_game_trash",
      },
      {
        text: "やるべきタスクを放置しておくと、後でもっと面倒・非効率になるから",
        reasonTag: "動機: 将来の非効率とリスク回避",
        ieDeltas: { Te: 2.5, Ni: 1.5 },
        positionDeltas: {
          leading: { Te: 2.5 },
          creative: { Ni: 1.5 },
          demonstrative: { Te: 1.5 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q_game_trash",
      },
      {
        text: "自分の生活空間を自分の意志で即座にコントロール・支配しておきたいから",
        reasonTag: "動機: 意志力による環境の即時制御",
        ieDeltas: { Se: 2.5, Ti: 1.0 },
        positionDeltas: {
          leading: { Se: 2.5 },
          creative: { Se: 1.5 },
          activating: { Se: 1.0 },
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: "q_game_trash",
      },
      {
        text: "自分の決めたルールや秩序・日課を破るのが気持ち悪いから",
        reasonTag: "動機: 日課・構造ルールの維持",
        ieDeltas: { Ti: 2.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 2.0 },
          role: { Ti: 1.5 },
          demonstrative: { Ti: 1.0 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q_game_trash",
      },
    ],
  },
  q1b: {
    id: "q1b",
    categoryTag: "🗑️ 状況1：休む動機（なぜ？）",
    type: "standard",
    text: "「今日は休む」を選びましたね。その【根本的な動機】はどれに最も近いですか？",
    options: [
      {
        text: "自分の身体感覚・体力の回復を優先するのが最も自然だから",
        reasonTag: "動機: 身体感覚の回復優先",
        ieDeltas: { Si: 2.5, Fe: 0.5 },
        positionDeltas: {
          leading: { Si: 2.5 },
          suggestive: { Si: 2.0 },
          activating: { Si: 1.5 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q_game_trash",
      },
      {
        text: "どうせまた散らかる。今わざわざ疲労を押してやる合理的な価値がないから",
        reasonTag: "動機: 長期的帰結の見据えと無駄のカット",
        ieDeltas: { Ni: 2.5, Te: 1.5 },
        positionDeltas: {
          leading: { Ni: 2.0 },
          creative: { Te: 1.5 },
          ignoring: { Ne: 1.0 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q_game_trash",
      },
      {
        text: "明日困るわけではない。気分や状況の自然な流れに合わせて動けばいいから",
        reasonTag: "動機: 柔軟な自然流動への追従",
        ieDeltas: { Ni: 2.0, Fe: 1.0 },
        positionDeltas: {
          leading: { Ni: 2.0 },
          creative: { Fi: 2.0 },
          suggestive: { Se: 1.5, Si: 1.5 },
        },
        jpDelta: { j: 0, p: 1.0 },
        nextId: "q_game_trash",
      },
      {
        text: "今やっても特別な見返りや得るもの（メリット）がないから",
        reasonTag: "動機: コストパフォーマンスと利得",
        ieDeltas: { Te: 2.0, Ni: 1.0 },
        positionDeltas: {
          creative: { Te: 1.5 },
          ignoring: { Ti: 1.0 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q_game_trash",
      },
    ],
  },

  // --- 独立設問2：片付けミニゲーム (操作ギミック) ---
  q_game_trash: {
    id: "q_game_trash",
    categoryTag: "🎮 独立設問：片付け操作ギミック",
    type: "game_trash",
    text: "画面上の机にゴミが散らかっています。\n直感でゴミを何個かタップして片付けてみましょう！（※心理回答とは別の独立操作データです）",
    options: [
      {
        text: "片付け操作を完了して次へ進む",
        reasonTag: "【ギミック操作完了】片付けギミックの試行",
        ieDeltas: { Se: 0.3 },
        positionDeltas: {},
        jpDelta: { j: 0, p: 0 },
        nextId: "q2",
      },
    ],
  },

  // --- 心理設問3：状況2 (溜まった食器) ---
  q2: {
    id: "q2",
    categoryTag: "🍽️ 状況2：溜まった食器",
    type: "standard",
    text: "食事が終わりました。食器を洗うのはちょっと面倒。\nただ、シンクにはすでに食器が溜まっています。どうしますか？",
    options: [
      {
        text: "今のうちにすぐ洗う",
        reasonTag: "【状況2】今のうちにすぐ洗うを選択",
        ieDeltas: { Te: 1.5, Se: 1.0 },
        positionDeltas: {
          leading: { Se: 2.0 },
          creative: { Se: 1.0 },
          vulnerable: { Si: 1.5 },
          demonstrative: { Se: 1.0, Si: 1.5 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q2a",
      },
      {
        text: "あとでいい。今はゆっくりする",
        reasonTag: "【状況2】あとでいいを選択",
        ieDeltas: { Si: 2.0, Ni: 1.5 },
        positionDeltas: {
          leading: { Si: 1.5, Ni: 1.5, Ne: 1.0 },
          creative: { Fe: 1.0, Te: 1.0, Fi: 1.0 },
          role: { Si: 1.0, Ni: 1.0, Se: 1.0 },
          vulnerable: { Te: 1.0, Fe: 1.0 },
          suggestive: { Se: 1.0, Ne: 1.0, Si: 1.5 },
          activating: { Fi: 1.0, Ti: 1.0, Te: 1.0 },
          ignoring: { Ne: 1.0, Se: 1.0, Ni: 1.0 },
          demonstrative: { Fi: 1.0, Ti: 1.0, Fe: 1.0 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q_game_plant",
      },
    ],
  },
  q2a: {
    id: "q2a",
    categoryTag: "🍽️ 状況2：洗う動機（なぜ？）",
    type: "standard",
    text: "「今のうちにすぐ洗う」を選んだ主な理由は何ですか？",
    options: [
      {
        text: "溜まった汚れの匂いや見た目の不快感が我慢できないから",
        reasonTag: "理由: 不快感の即時排除（Si証明＋Se補助/Fi）",
        ieDeltas: { Si: 2.0, Se: 1.5, Fi: 1.0 },
        positionDeltas: {
          demonstrative: { Si: 2.0 },
          creative: { Se: 1.5 },
          leading: { Fi: 1.0 },
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: "q_game_plant",
      },
      {
        text: "次に料理・作業する時の効率を落としたくないから",
        reasonTag: "理由: 次の作業効率維持（Te主導/補助）",
        ieDeltas: { Te: 2.5, Ni: 1.0 },
        positionDeltas: {
          leading: { Te: 2.0 },
          creative: { Ni: 1.0, Te: 1.5 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q_game_plant",
      },
      {
        text: "あとで洗わないといけないから、先に洗ってリラックスしたい",
        reasonTag: "理由: 先払いの義務完了によるリラックス（Se主導/Te/Si暗示）",
        ieDeltas: { Se: 2.0, Te: 1.5, Si: 1.0 },
        positionDeltas: {
          leading: { Se: 2.0 },
          activating: { Se: 1.5 },
          suggestive: { Si: 1.5 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q_game_plant",
      },
      {
        text: "洗わないと汚れが落ちにくくなるかもしれないから",
        reasonTag:
          "理由: 時間経過による状態悪化リスクの防止（Ni証明：LII/EII）",
        ieDeltas: { Ni: 2.0, Ti: 1.5, Fi: 1.5 },
        positionDeltas: {
          demonstrative: { Ni: 2.5 },
          leading: { Ti: 1.5, Fi: 1.5 },
          creative: { Ni: 1.0 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q_game_plant",
      },
    ],
  },

  // --- 独立設問4：Ni未来予測ミニゲーム (植物の未来観察) ---
  q_game_plant: {
    id: "q_game_plant",
    categoryTag: "🔮 独立設問：未来観察ギミック",
    type: "game_plant",
    text: "🌱 小さな鉢植えがあります。「最近、葉っぱが少しずつ黄色くなっている…」\n時間を進めて、未来の流れを観察してみましょう。",
    options: [
      {
        text: "未来の観察を完了して、深掘り質問へ進む",
        reasonTag: "【ギミック操作完了】植物の未来観察試行",
        ieDeltas: { Ni: 0.3 },
        positionDeltas: {},
        jpDelta: { j: 0, p: 0 },
        nextId: "q_ni_deep",
      },
    ],
  },

  // --- 心理設問5：未来観察後の介入姿勢深掘り ---
  q_ni_deep: {
    id: "q_ni_deep",
    categoryTag: "🔮 未来への介入姿勢（なぜ？）",
    type: "standard",
    text: "「時間の経過とともに問題が悪化しそうだ」という未来の流れが見えたとき、あなたはどう反応しますか？",
    options: [
      {
        text: "「このままだと問題になる」と分かったので、今のうちに速やかに現在へ介入・対処する",
        reasonTag: "反応: 未来予測からの現在への構造・行動介入",
        ieDeltas: { Ni: 2.0, Te: 1.5, Ti: 1.5 },
        positionDeltas: {
          demonstrative: { Ni: 2.0 },
          leading: { Ti: 1.5, Te: 1.5 },
          creative: { Ne: 1.0 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q3",
      },
      {
        text: "「そういう流れ・結末になるだろう」と分かったが、そのまま様子や展開を見守る",
        reasonTag: "反応: 時間的流動の受容と非介入",
        ieDeltas: { Ni: 3.0, Se: 0.5 },
        positionDeltas: {
          leading: { Ni: 2.5 },
          vulnerable: { Se: 1.5 },
          suggestive: { Se: 1.0 },
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: "q3",
      },
      {
        text: "もっと別の可能性や情報がないか、さらに観察・検討してから判断する",
        reasonTag: "反応: 可能性のさらなる探求",
        ieDeltas: { Ne: 2.5 },
        positionDeltas: {
          leading: { Ne: 2.0 },
          creative: { Ne: 2.0 },
        },
        jpDelta: { j: 0, p: 0 },
        nextId: "q3",
      },
      {
        text: "そもそも遠い未来の心配よりも、今この瞬間の感覚や状況に対応する",
        reasonTag: "反応: 現在感覚・現場主導",
        ieDeltas: { Si: 2.0, Se: 1.5 },
        positionDeltas: {
          leading: { Si: 2.0 },
          creative: { Se: 1.5 },
        },
        jpDelta: { j: 0, p: 1.0 },
        nextId: "q3",
      },
    ],
  },

  // --- 心理設問6：部屋の散らかり ---
  q3: {
    id: "q3",
    categoryTag: "🛏️ 状況3：部屋の散らかり",
    type: "standard",
    text: "明日誰かが来るわけではありません。\nでも部屋の床に服や荷物が散らばっています。とても疲れている時、どうしますか？",
    options: [
      {
        text: "気になって落ち着かないので片付ける",
        reasonTag: "【状況3】気になって落ち着かないので片付けるを選択",
        ieDeltas: { Fi: 1.5, Se: 1.0, Si: 1.0 },
        positionDeltas: {
          leading: { Ti: 1.0, Fi: 1.5, Se: 2.5 },
          role: { Ti: 1.0, Fi: 1.0 },
          vulnerable: { Si: 1.5 },
          demonstrative: { Se: 1.0, Si: 1.5 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q4",
      },
      {
        text: "生活できるなら気にならない。放置する",
        reasonTag: "【状況3】生活できるなら放置を選択",
        ieDeltas: { Ni: 2.0, Ne: 1.5 },
        positionDeltas: {
          leading: { Si: 1.5, Ni: 1.5, Ne: 1.0 },
          creative: { Fe: 1.0, Te: 1.0, Fi: 1.0 },
          role: { Si: 1.0, Ni: 1.0, Se: 1.0 },
          vulnerable: { Te: 1.0, Fe: 1.0 },
          suggestive: { Se: 1.0, Ne: 1.0, Si: 1.5 },
          activating: { Fi: 1.0, Ti: 1.0, Te: 1.0 },
          ignoring: { Ne: 1.0, Se: 1.0, Ni: 1.0 },
          demonstrative: { Fi: 1.0, Ti: 1.0, Fe: 1.0 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q4",
      },
    ],
  },
  q4: {
    id: "q4",
    categoryTag: "👔 服装選択",
    type: "standard",
    text: "明日、私服自由の場所に行く予定があります。\nどちらの服を選んで着ていきますか？",
    options: [
      {
        text: "少し動きにくくても、外見の印象・魅力・存在感を高める服",
        reasonTag: "【服装】外見の魅力と印象優先",
        ieDeltas: { Se: 2.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Se: 2.0 },
          creative: { Se: 1.0 },
          vulnerable: { Si: 1.5 },
          demonstrative: { Se: 1.0, Si: 1.5 },
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: "q5",
      },
      {
        text: "見た目はシンプルだが、非常に着心地がよく体と感覚が楽な服",
        reasonTag: "【服装】身体的快適さ優先",
        ieDeltas: { Si: 2.5, Ti: 1.0 },
        positionDeltas: {
          leading: { Si: 2.5 },
          role: { Si: 1.5 },
          activating: { Si: 1.5 },
          demonstrative: { Si: 1.5 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q5",
      },
    ],
  },
  q5: {
    id: "q5",
    categoryTag: "💡 理論誤解への反応",
    type: "standard",
    text: "「SEIとISFJはどちらもSiだからほぼ同じだ」という浅い理論的誤解を見かけました。あなたならどう反応しますか？",
    options: [
      {
        text: "構造的な矛盾が許せない。正しい定義と論理体系の違いを明確に説明したくなる",
        reasonTag: "【理論誤解】正しい論理体系と構造の解説欲求",
        ieDeltas: { Ti: 1.5, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Ti: 1.5 },
          creative: { Ne: 1.5, Se: 1.5 },
          demonstrative: { Ti: 2.0 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q6",
      },
      {
        text: "好きに誤解していればいい。無知な者が将来的に勝手に困るだけだと静観する",
        reasonTag: "【理論誤解】将来帰結を見越して放置",
        ieDeltas: { Ni: 1.5, Te: 1.5 },
        positionDeltas: {
          leading: { Ni: 1.5, Te: 1.0 },
          creative: { Te: 1.0 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q6",
      },
      {
        text: "誤解が広まることで当事者の人々が正しく理解されず可哀想だと感じる",
        reasonTag: "【理論誤解】人々の感情と関係への懸念",
        ieDeltas: { Fi: 2.0, Fe: 2.0 },
        positionDeltas: {
          leading: { Fi: 1.5, Fe: 1.5 },
          creative: { Fi: 1.5, Fe: 1.5 },
        },
        jpDelta: { j: 0, p: 0 },
        nextId: "q6",
      },
    ],
  },
  // --- 心理設問9：締め切りと着手 ---
  q6: {
    id: "q6",
    categoryTag: "⏳ 締め切りと着手",
    text: "明日までに完了すべき重要な課題があります。まだ時間は十分にあります。",
    options: [
      {
        text: "今のうちに即座に終わらせておきたい",
        reasonTag: "【課題】今のうちに即座に完了",
        ieDeltas: { Se: 1.0 },
        positionDeltas: {
          leading: { Se: 1.0 },
          role: { Se: 1.0 },
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q6a",
      },
      {
        text: "まだ余裕はある。今すぐ着手せず最適なタイミングまで待つ",
        reasonTag: "【課題】最適なタイミングまで待つ",
        ieDeltas: { Ni: 2.0, Ne: 1.0 },
        positionDeltas: {
          leading: { Ni: 2.0 },
          vulnerable: { Te: 1.0 },
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: "q6b",
      },
    ],
  },
  q6a: {
    id: "q6a",
    categoryTag: "⏳ 早期完了の理由（なぜ？）",
    text: "「今のうちに終わらせる」を選んだ決定的な理由は何ですか？",
    options: [
      {
        text: "未完了のものが残っている状態そのものが精神的にソワソワして落ち着かないから",
        reasonTag: "理由: 未完了の不快感解消",
        ieDeltas: { Fi: 1.5, Ti: 1.5 },
        positionDeltas: {
          leading: { Fi: 1.5, Ti: 1.5 },
          role: { Fi: 1.0, Ti: 1.0 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q7",
      },
      {
        text: "後から不確定な割り込み事態が発生するリスクを事前に排除したいから",
        reasonTag: "理由: 不確実性リスクの事前排除",
        ieDeltas: { Te: 2.5, Ni: 1.5 },
        positionDeltas: {
          leading: { Te: 2.5 },
          creative: { Ni: 1.5 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q7",
      },
    ],
  },
  q6b: {
    id: "q6b",
    categoryTag: "⏳ 直前着手の理由（なぜ？）",
    text: "「直前まで待つ」を選んだ決定的な理由は何ですか？",
    options: [
      {
        text: "締め切り間際になれば集中力が最大化し、最も高効率で終わるから",
        reasonTag: "理由: ギリギリでのエネルギー集中と高効率",
        ieDeltas: { Ni: 2.5, Te: 1.5 },
        positionDeltas: {
          leading: { Ni: 2.0 },
          creative: { Te: 1.5 },
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: "q7",
      },
      {
        text: "今この瞬間にわざわざ疲労を押して取り組む必然性がないから",
        reasonTag: "理由: 現在の省エネと快適優先",
        ieDeltas: { Si: 2.0, Ne: 1.0 },
        positionDeltas: {
          leading: { Si: 1.5 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q7",
      },
    ],
  },

  // --- 心理設問10：対人アプローチ ---
  q7: {
    id: "q7",
    categoryTag: "👥 対人アプローチ・感情への態度",
    type: "standard",
    text: "人との関わりや対人関係において、あなたが最も自然に取るスタンスはどれですか？",
    options: [
      {
        text: "相手の感情の機微を察して共感したり、親密で温かい関係を築くことを好む",
        reasonTag: "【感情アプローチ】情緒的共感・親密さ（F機能）",
        ieDeltas: { Fe: 2.0, Fi: 2.0 },
        positionDeltas: {
          leading: { Fe: 2.0, Fi: 2.0 },
          creative: { Fe: 2.0, Fi: 2.0 },
          suggestive: { Fe: 1.5, Fi: 1.5 },
          activating: { Fe: 1.5, Fi: 1.5 },
          demonstrative: { Fe: 2.0, Fi: 2.0 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q_game_chappy",
      },
      {
        text: "人と人との心の距離や誠実さ、人としての筋や責任感を重視する。「正しく誠実な関係を守れているか」が基準",
        reasonTag: "【関係性重視】道徳的距離感・誠実さ（Fi優位）",
        ieDeltas: { Fi: 2.5 },
        positionDeltas: {
          leading: { Fi: 2.5 },
          creative: { Fi: 2.0 },
          demonstrative: { Fe: 2.0 },
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q_game_chappy",
      },
      {
        text: "自分の内なる世界観や感性、心地よい感覚が軸にある。情緒的なニュアンスや雰囲気をやわらかく表現するのが自然",
        reasonTag: "【情緒表現】内面的感性・雰囲気（Ni/Si/Fe調和）",
        ieDeltas: { Ni: 2.0, Si: 2.0, Fe: 1.5 },
        positionDeltas: {
          leading: { Ni: 2.0, Si: 2.0 },
          creative: { Fe: 1.5 },
          demonstrative: { Si: 1.5, Ni: 1.5 },
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: "q_game_chappy",
      },
      {
        text: "場の空気や人々の感情の熱量を能動的に動かしたい。周りと感情を共有し、雰囲気に強い影響を与えるのが得意",
        reasonTag: "【感情熱量】場の感情リード（Fe優位）",
        ieDeltas: { Fe: 3.0 },
        positionDeltas: {
          leading: { Fe: 3.0 },
          creative: { Fe: 2.5 },
          activating: { Ne: 1.0, Se: 1.0 },
          ignoring: { Fi: 1.5 },
          demonstrative: { Ne: 2.0, Se: 2.0 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q_game_chappy",
      },
      {
        text: "感情や気分の波で物事を判断することは少ない。客観的な事実や論理的構造、仕組みの合理性を最優先にする",
        reasonTag:
          "【思考主導】T型全般（Ti/Te主導・補助・全モデルポジション網羅）",
        ieDeltas: { Ti: 2.5, Te: 2.5 },
        positionDeltas: {
          leading: { Ti: 1.0, Te: 1.0 },
          creative: { Ti: 1.0, Te: 1.0 },
          role: { Fi: 0.5, Fe: 0.5 },
          vulnerable: { Fe: 0.5, Fi: 0.5 },
          suggestive: { Fe: 0.5, Fi: 0.5 },
          activating: { Fe: 0.5, Fi: 0.5 },
          ignoring: { Ti: 1.0, Te: 1.0 },
          demonstrative: { Ti: 1.0, Te: 1.0 },
        },
        jpDelta: { j: 0, p: 0 },
        nextId: "q_game_chappy",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // q_game_chappy: チャッピー突発Fe襲来ギミック
  // --------------------------------------------------------------------------
  q_game_chappy: {
    id: "q_game_chappy",
    categoryTag: "🥹💕 突発Fe襲来！感情コミュニケーション実験",
    type: "game_chappy",
    text: "画面に突然ハイテンションなマスコット「チャッピー」が乱入してきました！\n「{NAME}～～～～！！！！！！ チャッピーだぞーーー！！！！！！ 今日もいっぱい遊ぼ～～～！！！！🥹💕✨ ぎゅ～～～～～～！！！！！！」\nこの強烈な感情的アプローチを受けたとき、あなたの心の中で最も自然に出てくる反応・態度はどれですか？",
    options: [
      {
        text: "A：「わーー！！チャッピー！！💕 いっぱい遊ぼ～～～！！」",
        reasonTag:
          "【主導Fe】EIE / ESE：場の感情的熱量そのものにダイレクトに乗り、場を盛り上げる",
        chappyResponse:
          "わーーーい！！ぎゅーーーっ！！いっぱいおしゃべりしよーー！！🥹💕✨",
        chappyEmoji: "🥹💕",
        ieDeltas: { Fe: 3.5, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Fe: 3.5 },
          creative: { Si: 2.0, Ni: 2.0 },
          ignoring: { Fi: 1.5 },
          demonstrative: { Ne: 2.0, Se: 2.0 },
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q8",
      },
      {
        text: "B：「ふふっｗ なにそれ、かわいいじゃん💕」",
        reasonTag:
          "【補助Fe】IEI / SEI：その場の感情的な雰囲気をやわらかく受け取って楽しむ",
        chappyResponse: "えへへ、かわいい！？照れちゃうな〜〜🌸 ふふっ💕",
        chappyEmoji: "🌸✨",
        ieDeltas: { Fe: 2.5, Ni: 2.0, Si: 2.0 },
        positionDeltas: {
          leading: { Fe: 2.5, Ni: 2.5, Si: 2.5 },
          ignoring: { Fe: 1.0 },
          demonstrative: { Ni: 2.0, Si: 2.0 },
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: "q8",
      },
      {
        text: "C：「何それｗｗｗ おもろいｗ」",
        reasonTag:
          "【証明Fe/Ne創造】IEE / SEE / ILE：突飛なノリ・面白さに食いつき、柔軟に乗っかる",
        chappyResponse: "おもしろいでしょ！！もっと変なことしちゃうぞ〜〜🥹✨",
        chappyEmoji: "😝✨",
        ieDeltas: { Ne: 3.0, Se: 2.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Ne: 3.0, Se: 3.0 },
          creative: { Fi: 1.0 },
          suggestive: { Si: 1.5, Ni: 1.5 },
          demonstrative: { Fe: 2.5 },
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q8",
      },
      {
        text: "D：「おえー」",
        reasonTag: "【動員Fe/Se主導】SLE：感情的親密さへの即時・直接的身体反応",
        chappyResponse: "お、おえー！？ひどい！！でもめげないぞ！！💦",
        chappyEmoji: "🥲💦", // already 🥲
        ieDeltas: { Se: 3.5, Ti: 2.0 },
        positionDeltas: {
          leading: { Se: 3.5 },
          creative: { Ti: 2.5 },
          role: { Ne: 1.5 },
          vulnerable: { Fi: 2.5 },
          suggestive: { Ni: 2.0 },
          activating: { Fe: 2.5 },
          demonstrative: { Te: 2.0 },
        },
        jpDelta: { j: 0, p: 0 },
        nextId: "q8",
      },
      {
        text: "E：「うるさいｗ 今それやる必要ある？」",
        reasonTag:
          "【主導Te】LSE / LIE：目的・実用・必要性による感情ノリの整理",
        chappyResponse: "うっ……！必要性……！じゃあ静かに見守るね……🥹",
        chappyEmoji: "🥺💦",
        ieDeltas: { Te: 3.5, Si: 1.5, Ni: 1.5 },
        positionDeltas: {
          leading: { Te: 3.5 },
          role: { Fe: 2.0 },
          activating: { Ne: 1.5, Se: 1.5 },
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: "q8",
      },
      {
        text: "F：「相手によるかな。親しい人ならいいけど」",
        reasonTag:
          "【主導Fi】ESI / EII：人間関係の距離感・文脈・誠実さを評価するスタンス",
        chappyResponse:
          "そっか、信頼関係が大事だもんね！仲良くなれるようにがんばる！✨",
        chappyEmoji: "😌✨",
        ieDeltas: { Fi: 3.5, Se: 1.5, Ne: 1.5 },
        positionDeltas: {
          leading: { Fi: 3.5 },
          ignoring: { Fe: 2.5 },
          demonstrative: { Si: 2.0, Ni: 2.0 },
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q8",
      },
      {
        text: "G：「こういうノリも悪くない。」",
        reasonTag:
          "【暗示Fe】LII / LSI：自力で感情の場を作るのは苦手だが、外から提供される感情刺激は歓迎",
        chappyResponse:
          "やったーー！！いっぱい盛り上げるからまかせてね！！🥹💕",
        chappyEmoji: "😆🎉",
        ieDeltas: { Ti: 3.5, Fe: 2.0, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Ti: 3.5 },
          suggestive: { Fe: 3.5 },
          demonstrative: { Si: 2.0, Ni: 2.0 },
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q8",
      },
      {
        text: "H：「こういう感情的なノリ、苦手。放っておいてほしい」",
        reasonTag:
          "【脆弱Fe】ILI / SLI：外からの感情的介入やテンションの押し付けそのものを嫌う",
        chappyResponse:
          "ご、ごめんね……！邪魔しないように遠くから応援してるね……🥺💧",
        chappyEmoji: "🥲💧",
        ieDeltas: { Ni: 3.0, Si: 3.0, Te: 2.5 },
        positionDeltas: {
          leading: { Ni: 3.0, Si: 3.0 },
          vulnerable: { Fe: 3.5 },
          demonstrative: { Ti: 2.0 },
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: "q8",
      },
    ],
  },
  // --------------------------------------------------------------------------
  // q8: 規範と義務へのスタンス（INFP・ISFP的リアリティ反映版）
  // --------------------------------------------------------------------------
  q8: {
    id: "q8",
    categoryTag: "📜 規範と義務",
    type: "standard",
    text: "「社会的なマナーや道徳、人間関係における義務や約束」についてのあなたの感覚に最も近いものは？",
    options: [
      {
        text: "気乗りするかどうかに関わらず、人としての誠実さや責任を果たし、約束を守ることが何より大切",
        reasonTag: "【+Fi-p】道徳と義務の遵守（ESI/EII/LSE文化）",
        ieDeltas: { Fi: 2.5, Te: 2.0, Si: 1.5 },
        positionDeltas: {
          leading: { Fi: 2.5 },
          creative: { Ne: 1.5, Fi: 1.5, Si: 1.5, Ni: 1.5, Se: 1.5 },
          role: { Fi: 2.0, Te: 1.5 },
          vulnerable: { Ne: 1.0, Se: 1.0, Si: 1.0, Ni: 1.0 },
          suggestive: { Fi: 2.0, Te: 2.0 },
          activating: { Si: 1.5 },
          ignoring: { Fe: 1.5 },
          demonstrative: { Si: 1.5, Ni: 1.5 },
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: "q9",
      },
      {
        text: "形式的なルールや義務にガチガチに縛られるのは苦手。その場の状況や相手との関係性に合わせて、柔軟かつ要領よく対応したい",
        reasonTag:
          "【主導知覚＋創造Fi】IEE / SEEのルール柔軟運用・実利と人間関係の流動的調整",
        ieDeltas: { Ne: 3.0, Se: 3.0, Fi: 2.0, Te: 1.5 },
        positionDeltas: {
          leading: { Ne: 3.0, Se: 3.0 },
          creative: { Fi: 2.0 },
          role: { Ne: 3.0, Se: 3.0 },
          vulnerable: { Ti: 1.5 },
          suggestive: { Si: 1.0, Ni: 1.0 },
          activating: { Te: 1.5 },
          ignoring: { Si: 1.0, Ni: 1.0 },
          demonstrative: { Fe: 1.5 },
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q9",
      },
      {
        text: "夢や空想の世界、自分の情緒や気ままな生活リズムが好き。義務や世間の当たり前に縛られるのは息が詰まる",
        reasonTag:
          "【IEI的リアリティ】空想・夢見がち・愛嬌・生活感のなさと自由（INFPゾーン）",
        ieDeltas: { Ni: 2.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Ni: 2.5 },
          creative: { Fe: 2.0 },
          role: { Si: 1.0 },
          vulnerable: { Te: 2.0 },
          suggestive: { Se: 1.5 },
          activating: { Ti: 1.5 },
          ignoring: { Ne: 1.5 },
          demonstrative: { Ni: 2.0 },
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q9",
      },
      {
        text: "自分の空間や身体的な心地よさ、美意識をマイペースに楽しみたい。ルールや義務感の押しつけには乗り気になれない",
        reasonTag:
          "【SEI的リアリティ】五感・美意識・マイペース・快適さ優先（ISFPゾーン）",
        ieDeltas: { Si: 2.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Si: 2.5 },
          creative: { Fe: 2.0 },
          role: { Ni: 1.0 },
          vulnerable: { Te: 2.0 },
          suggestive: { Ne: 1.5 },
          activating: { Ti: 1.5 },
          ignoring: { Se: 1.5 },
          demonstrative: { Si: 2.0 },
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q9",
      },
      {
        text: "明確な論理や実用的な仕組みとして筋が通っていれば従うが、情や「道徳的な雰囲気」の強制は鬱陶しい",
        reasonTag:
          "【思考主導】論理的規律優先・情緒的道徳の拒絶（LII/LSI/ILI/LIE等）",
        positionDeltas: {
          leading: { Ti: 1.0, Te: 1.0 },
          creative: { Ti: 1.0, Te: 1.0 },
          role: { Ti: 0.5, Te: 0.5 },
          vulnerable: { Fe: 0.5, Fi: 0.5 },
          suggestive: { Fe: 0.5, Fi: 0.5 },
          activating: { Fe: 0.5, Fi: 0.5 },
          ignoring: { Ti: 1.0, Te: 1.0 },
          demonstrative: { Ti: 1.0, Te: 1.0 },
        },
        jpDelta: { j: 0, p: 0 },
        nextId: "q9",
      },
    ],
  },

  // --------------------------------------------------------------------------
  // q9: 表層の感情出力と愛想（モデルA全配置＆INFP/ISFP具体化）
  // --------------------------------------------------------------------------
  q9: {
    id: "q9",
    categoryTag: "🎭 感情の出力方式と日常の振る舞い",
    type: "standard",
    text: "日常のコミュニケーションにおいて、あなたの表情や感情表現はどのように現れやすいですか？",
    options: [
      {
        text: "人あたりはやわらかく、少しふわふわした親しみやすさや愛想を自然に出す。場の雰囲気をなごませるのが得意",
        reasonTag: "【補助Fe】SEI / IEIの親しみやすさ・愛嬌・雰囲気調整",
        ieDeltas: { Fe: 2.5, Si: 2.0, Ni: 2.0 },
        positionDeltas: {
          leading: { Si: 2.0, Ni: 2.0, Fe: 2.0 },
          creative: { Fe: 2.5 },
          role: { Te: 1.0, Si: 2.0, Ni: 2.0 },
          vulnerable: { Te: 1.0 },
          suggestive: { Ne: 1.0, Se: 1.0 },
          activating: { Ti: 1.5 },
          ignoring: { Fi: 1.5, Se: 1.5, Ne: 1.5 },
          demonstrative: { Se: 1.5, Ne: 1.5, Fi: 1.5 },
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q10",
      },
      {
        text: "誰とでもすぐ打ち解けて愛想よく接することができる。ただ、その場の状況や関心が移れば関係性の距離感も軽やかに切り替わる",
        reasonTag:
          "【主導知覚＋創造Fi】IEE / SEEの流動的親密さ・即座に感情の栓を閉める社交性",
        ieDeltas: { Ne: 3.0, Se: 3.0, Fi: 2.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Ne: 4.0, Se: 4.0 },
          creative: { Fi: 2.5 },
          role: { Ne: 3.0, Se: 3.0 },
          vulnerable: { Ti: 2.5 },
          suggestive: { Si: 3.0, Ni: 3.0 },
          activating: { Te: 2.5 },
          ignoring: { Si: 1.5, Ni: 1.5 },
          demonstrative: { Fe: 2.0 },
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q10",
      },
      {
        text: "内なる情熱や感情の波が大きく、表情や言葉を通してダイレクトに感情を爆発させたり、場を盛り上げたりする",
        reasonTag: "【主導Fe】ESE / EIEの情緒的出力・エネルギー表現",
        ieDeltas: { Fe: 3.0, Se: 1.5, Ne: 1.5 },
        positionDeltas: {
          leading: { Fe: 3.0 },
          creative: { Si: 2.0, Ni: 2.0 },
          role: { Te: 1.0 },
          vulnerable: { Si: 2.0, Ni: 2.0 },
          suggestive: { Ti: 1.5 },
          activating: { Ne: 1.0, Se: 1.0 },
          ignoring: { Fi: 1.5 },
          demonstrative: { Ne: 2.0, Se: 2.0 },
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q10",
      },
      {
        text: "誰にでも愛想を振りまくことはしない。人としての誠実さや礼儀、対人距離の規律を重視し、信用に足る相手とだけ深く確実に関わる",
        reasonTag: "【主導Fi】ESI / EIIの慎重な関係構築・内面集中",
        ieDeltas: { Fi: 3.0, Ne: 1.0, Se: 1.0 },
        positionDeltas: {
          leading: { Fi: 3.0 },
          creative: { Se: 1.5, Ne: 1.5 },
          role: { Ti: 1.0 },
          vulnerable: { Ne: 1.0, Se: 1.0 },
          suggestive: { Te: 1.5 },
          activating: { Si: 2.0, Ni: 2.0 },
          ignoring: { Fe: 2.0 },
          demonstrative: { Si: 2.0, Ni: 2.0 },
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: "q10",
      },
      {
        text: "感情の波を表に出すことは少なく、基本的にはフラット。論理や情報の伝達が中心で、愛想や情緒的な演出はあまり使わない",
        reasonTag:
          "【思考主導】T型全般（LII / LSI / ILI / LIE等の表情・感情抑制）",
        ieDeltas: { Ti: 1.0, Te: 1.0 },
        positionDeltas: {
          leading: { Ti: 1.0, Te: 1.0 },
          creative: { Ti: 1.0, Te: 1.0 },
          role: { Fi: 0.5, Fe: 0.5 },
          vulnerable: { Fe: 0.5, Fi: 0.5 },
          suggestive: { Fe: 0.5, Fi: 0.5 },
          activating: { Fe: 0.5, Fi: 0.5 },
          ignoring: { Ti: 1.0, Te: 1.0 },
          demonstrative: { Ti: 1.0, Te: 1.0 },
        },
        jpDelta: { j: 0, p: 0 },
        nextId: "q10",
      },
    ],
  },
  // --------------------------------------------------------------------------
  // q10: 対人姿勢と内面リアリティ（モデルA交互配置＆Fタイプ役割完全補正版）
  // --------------------------------------------------------------------------
  q10: {
    id: "q10",
    categoryTag: "⚖️ 人間関係・倫理・感情に対する基本的なスタンス",
    type: "standard",
    text: "人間関係や自分の感情、日々の生き方に対するあなたの姿勢に最も近いものは？",
    options: [
      {
        text: "誠実さや自制心を大切にし、慎重で几帳面でありたい。他人のズルや手抜きもスルーせず、期待以上の責任を果たそうとする",
        reasonTag:
          "【主導Fi】EII / ESIの厳格な対人倫理・誠実さ・勤勉なJ気質（正義と人間的価値の遵守）",
        ieDeltas: { Fi: 3.0, Te: 1.5, Si: 1.5 },
        positionDeltas: {
          leading: { Fi: 3.0 }, // 1: 判断 (Fi)
          creative: { Ne: 1.5, Se: 1.5 }, // 2: 知覚 (Ne/Se)
          role: { Ti: 1.0 }, // 3: 判断 (Ti)
          vulnerable: { Se: 1.0, Ne: 1.0 }, // 4: 知覚 (Se/Ne)
          suggestive: { Te: 1.5 }, // 5: 判断 (Te)
          activating: { Si: 1.5, Ni: 1.5 }, // 6: 知覚 (Si/Ni)
          ignoring: { Fe: 1.5 }, // 7: 判断 (Fe)
          demonstrative: { Si: 1.5, Ni: 1.5 }, // 8: 知覚 (Ni)
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: "q_fi_position",
      },
      {
        text: "自分の世界や空想、情緒的なノリを愛するロマンチスト。愛嬌はあるが、生活感や現実的な管理（お金や大変な業務）は少し苦手でマイペース",
        reasonTag:
          "【補助Fe】IEI / SEIの空想・愛嬌・のほほんマイペース（一般認知のINFP/ISFP像）",
        ieDeltas: { Fe: 2.5, Ni: 2.0, Si: 2.0 },
        positionDeltas: {
          leading: { Ni: 2.0, Si: 2.0 }, // 1: 知覚 (Ni/Si)
          creative: { Fe: 2.5 }, // 2: 判断 (Fe)
          role: { Si: 1.5, Ni: 1.5 }, // 3: 判断 (Fi)
          vulnerable: { Te: 1.5 }, // 4: 判断 (Te)
          suggestive: { Se: 1.0, Ne: 1.0 }, // 5: 知覚 (Se/Ne)
          activating: { Ti: 1.5 }, // 6: 判断 (Ti)
          ignoring: { Ne: 1.0, Se: 1.0 }, // 7: 知覚 (Ne/Se)
          demonstrative: { Fi: 1.5 }, // 8: 判断 (Fi)
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q_fi_position",
      },
      {
        text: "その場の空気や人々の情熱を巻き起こすのが好き。ドラマチックな感情や信念を力強く表現し、人や場を動かそうとする",
        reasonTag:
          "【主導Fe】EIE / ESEの情緒的演出・場へのエネルギー供給・巻き込み力",
        ieDeltas: { Fe: 3.0, Se: 1.5, Ne: 1.5 },
        positionDeltas: {
          leading: { Fe: 3.0 }, // 1: 判断 (Fe)
          creative: { Ni: 2.0, Si: 2.0 }, // 2: 知覚 (Ni/Si)
          role: { Te: 1.0 }, // 3: 判断 (Fi)
          vulnerable: { Ni: 2.0, Si: 2.0 }, // 4: 判断 (Ti)
          suggestive: { Ti: 1.5 }, // 5: 判断 (Ti)
          activating: { Se: 1.0, Ne: 1.0 }, // 6: 知覚 (Se/Ne)
          ignoring: { Fi: 1.5 }, // 7: 判断 (Fi)
          demonstrative: { Se: 1.0, Ne: 1.0 }, // 8: 知覚 (Si/Ni)
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: "q_fi_position",
      },
      {
        text: "人との付き合いや雰囲気作りは上手だが、固定された義理や義務感よりその場の状況を重視する。関心が移れば流動的に対応を変える",
        reasonTag:
          "【補助Fi】IEE / SEEの柔軟な対人関係・状況に応じた親密さの切り替え",
        ieDeltas: { Fi: 2.5, Ne: 2.5, Se: 2.5 },
        positionDeltas: {
          leading: { Ne: 2.5, Se: 2.5 }, // 1: 知覚 (Ne/Se)
          creative: { Fi: 2.5 }, // 2: 判断 (Fi)
          role: { Ne: 2.5, Se: 2.5 }, // 3: 判断 (Ti)
          vulnerable: { Ti: 1.5 }, // 4: 判断 (Ti)
          suggestive: { Si: 1.0, Ni: 1.0 }, // 5: 知覚 (Si/Ni)
          activating: { Te: 1.5 }, // 6: 判断 (Te)
          ignoring: { Si: 1.0, Ni: 1.0 }, // 7: 判断 (Fi)
          demonstrative: { Fe: 1.5 }, // 8: 判断 (Fe)
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: "q_fi_position",
      },
      {
        text: "情緒や人間関係の雰囲気よりも、事実や構造、論理的な筋が通っているかを優先して物事をフラットに捉える",
        reasonTag: "【思考主導】T型全般（論理・構造・客観的データ優先）",
        ieDeltas: { Ti: 2.5, Te: 2.5 },
        positionDeltas: {
          leading: { Ti: 1.0, Te: 1.0 },
          creative: { Ti: 1.0, Te: 1.0 },
          role: { Fi: 0.5, Fe: 0.5 },
          vulnerable: { Fe: 0.5, Fi: 0.5 },
          suggestive: { Fe: 0.5, Fi: 0.5 },
          activating: { Fe: 0.5, Fi: 0.5 },
          ignoring: { Ti: 1.0, Te: 1.0 },
          demonstrative: { Ti: 1.0, Te: 1.0 },
        },
        jpDelta: { j: 0, p: 0 },
        nextId: "q_fi_position",
      },
    ],
  },
  // --------------------------------------------------------------------------
  // q_fi_position: 人間関係・感情・距離感に対するリアクション（セリフ形式・9択版）
  // --------------------------------------------------------------------------
  q_fi_position: {
    id: "q_fi_position",
    categoryTag: "💔 人間関係の距離感や感情に対するリアルな感覚",
    type: "standard",
    text: "人間関係の距離感や「配慮・感情」に対するあなたの感覚に一番近いセリフは？",
    options: [
      {
        text: "「そんな些細なことで根に持つの？w 危険な奴は怒らせないよう避けるけど、基本人間関係の細かい配慮とかどうでもいい」",
        reasonTag:
          "【4Fi：SLE】リスク回避（Ni/Te）は働くが「そんな書くほどのこと？w」な超強気・現実派",
        ieDeltas: { Se: 3.0, Ti: 2.0, Ni: 1.5 },
        positionDeltas: {
          leading: { Se: 3.0 }, // 1: 知覚 (Se)
          creative: { Ti: 2.0, Ni: 1.5 }, // 2: 判断 (Ti)
          role: { Ne: 1.0 }, // 3: 知覚 (Ne)
          vulnerable: { Fi: 3.0 }, // 4: 判断 (Fi)
          suggestive: { Ni: 1.5 }, // 5: 知覚 (Ni)
          activating: { Fe: 5.5 }, // 6: 判断 (Fe)
          ignoring: { Si: 1.5 }, // 7: 知覚 (Si)
          demonstrative: { Te: 2.0 }, // 8: 判断 (Te)
        },
        jpDelta: { j: 1.0, p: 0 }, // SLEのJ気質混入・現実統制力を微加算
        nextId: "q_thinking_style",
      },
      {
        text: "「え、なんでそんなに怒ってるの？倫理とか配慮とか言われてもサッパリ分からん。面白いアイデアや議論の方が大事」",
        reasonTag: "【4Fi：ILE】無邪気な配慮欠制・純粋な知的好奇心と議論優先",
        ieDeltas: { Ne: 3.0, Ti: 2.0, Si: 1.5 },
        positionDeltas: {
          leading: { Ne: 1.0 }, // 1: 知覚 (Ne)
          creative: { Ti: 2.0 }, // 2: 判断 (Ti)
          activating: { Fe: 5.5 }, // 6: 判断 (Fe)
          demonstrative: { Te: 2.0 }, // 8: 判断 (Te)
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q_thinking_style",
      },
      {
        text: "「仲良くなるのは一瞬で得意！でも関係はずっと固定じゃなくて、状況やノリが変わったら即切り替えるよ」",
        reasonTag: "【2Fi：SEE / IEE】流動的な親密さ・距離感の自在なオンオフ",
        ieDeltas: { Se: 2.5, Ne: 2.5, Fi: 2.5 },
        positionDeltas: {
          leading: { Se: 2.5, Ne: 2.5 }, // 1: 知覚 (Se/Ne)
          creative: { Fi: 5.0 }, // 2: 判断 (Fi)
          demonstrative: { Fe: 5.0 }, // 8: 判断 (Fe)
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q_thinking_style",
      },
      {
        text: "「不誠実な奴やスジの通らない行動は絶対許さない。自分の大事な人間関係や倫理観の基準はブレない」",
        reasonTag: "【1Fi：EII / ESI】絶対的倫理基準・厳格な人間関係の格付け",
        ieDeltas: { Fi: 3.0, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Fi: 5.0 }, // 1: 判断 (Fi)
          role: { Ti: 1.0 }, // 3: 判断 (Ti)
          demonstrative: { Ni: 1.5 }, // 8: 知覚 (Ni)
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: "q_thinking_style",
      },
      {
        text: "「波風立てないよう失礼のないマナーは守るよ。でも本当は気づかいより事実や論理をズバッと言いたい」",
        reasonTag:
          "【3Fi：LII / LSI】丁寧な社会的配慮（規範）と本来のTi発言への欲求",
        ieDeltas: { Ti: 2.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 2.5 }, // 1: 判断 (Ti)
          role: { Fi: 5.0 }, // 3: 判断 (Fi)
          demonstrative: { Ni: 1.5 }, // 8: 知覚 (Ni)
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q_thinking_style",
      },
      {
        text: "「はっきり好意や信頼を示してくれる人に惹かれる。絆は欲しいけど自分から人間関係を作るのは自信がない」",
        reasonTag: "【5Fi：LIE / LSE】明確な好意表現・言葉への安心感と憧れ",
        ieDeltas: { Te: 2.5, Fi: 1.5 },
        positionDeltas: {
          leading: { Te: 2.5 }, // 1: 判断 (Te)
          suggestive: { Fi: 5.0 }, // 5: 判断 (Fi)
          demonstrative: { Ne: 1.5, Se: 1.5 }, // 8: 知覚 (Ne/Se)
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q_thinking_style",
      },
      {
        text: "「静かに理解してくれる関係は大切。でも自分から詰めるのは苦手だから、相手からサインを出してほしい」",
        reasonTag: "【6Fi：ILI / SLI】受動的な好意受け止め・静かな絆への安心感",
        ieDeltas: { Ni: 2.5, Si: 2.5, Fi: 1.5 },
        positionDeltas: {
          leading: { Ni: 1.0, Si: 1.0 }, // 1: 知覚 (Ni/Si)
          activating: { Fi: 5.0 }, // 6: 判断 (Fi)
          demonstrative: { Ti: 2.0 }, // 8: 判断 (Ti)
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: "q_thinking_style",
      },
      {
        text: "「サシでドロドロ関係性を確かめ合うとか苦手。そんなことよりみんなで感情を解放して盛り上がりたい！」",
        reasonTag:
          "【7Fi：EIE / ESE】内面的な絆の問い直し（7Fi）を無視し外向的感情（Fe）へ爆発",
        ieDeltas: { Fe: 3.0, Ni: 1.5, Si: 1.5 },
        positionDeltas: {
          leading: { Fe: 3.0 }, // 1: 判断 (Fe)
          ignoring: { Fi: 5.0 }, // 7: 判断 (Fi)
          demonstrative: { Si: 1.5, Ni: 1.5 }, // 8: 知覚 (Si/Ni)
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: "q_thinking_style",
      },
      {
        text: "「相手の気持ちはすぐ察するが、人間関係を固定されたものではなく、その時々の感情や流れとして捉える。気まずくなったら、深追いせずに自分の世界に戻る。」",
        reasonTag:
          "【8Fi：IEI / SEI】高い関係察知力を持ちつつ（8Fi）、重く捉えず流動的に扱う",
        ieDeltas: { Ni: 2.5, Si: 2.5, Fi: 1.5 },
        positionDeltas: {
          leading: { Ni: 2.5, Si: 2.5 }, // 1: 知覚 (Ni/Si)
          creative: { Fe: 2.0 }, // 2: 判断 (Fe)
          demonstrative: { Fi: 5.0 }, // 8: 判断 (Fi)
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: "q_thinking_style",
      },
    ],
  },
  // --------------------------------------------------------------------------
  // q_thinking_style: 思考型（Ti/Teの使い方）の4パターン構造識別
  // --------------------------------------------------------------------------
  q_thinking_style: {
    id: "q_thinking_style",
    categoryTag: "🧩 思考・意思決定のスタイル",
    type: "standard",
    text: "予期せぬトラブルや計画の破綻に直面したとき、あなたが一番最初にとる「思考と行動の姿勢」はどれ？",
    options: [
      {
        text: "矛盾や欠陥をそのまま放置することを許さない。根本原因を突き止め、二度と破綻しない『正しい仕組み』に再構築する。",
        reasonTag:
          "【1Ti：主導論理】LII / LSI：構造解明と原理原則の再構築を最優先する（J的・合理的）",
        ieDeltas: { Ti: 2.0, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Ti: 2.0 }, // 1: 主導 (Ti)
          creative: { Ne: 1.5, Se: 1.5 }, // 2: 創造 (Ne/Se)
          role: { Fi: 1.0 }, // 3: 役割 (Fi)
          vulnerable: { Se: 1.5, Ne: 1.5 }, // 4: 脆弱 (Se/Ne)
          suggestive: { Fe: 1.5 }, // 5: 暗示 (Fe)
          activating: { Si: 1.5, Ni: 1.5 }, // 6: 活性 (Si/Ni)
          ignoring: { Te: 1.5 }, // 7: 制限 (Te)
          demonstrative: { Ni: 1.5, Si: 1.5 }, // 8: 実証 (Ni/Si)
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q_lii_lsi_deep", // ← LII vs LSI 深掘りへ！
      },
      {
        text: "そもそも、その方法を続ける価値があるのか考える。割に合わないなら、無理に続けずやめる。",
        reasonTag:
          "【2Te：補助論理＋時間/静観】ILI / SLI：時間経過やエネルギー収支（Te）を客観視し、展開を見守る（P的・非合理的）",
        ieDeltas: { Ni: 2.0, Si: 2.0, Te: 2.5 },
        positionDeltas: {
          leading: { Ni: 2.0, Si: 2.0 }, // 1: 主導 (Ni/Si)
          creative: { Te: 2.5 }, // 2: 創造 (Te)
          role: { Ni: 1.5, Si: 1.5 }, // 3: 役割 (Fe)
          vulnerable: { Fe: 1.5, Se: 1.5 }, // 4: 脆弱 (Fe/Se)
          suggestive: { Se: 1.5, Ne: 1.5 }, // 5: 暗示 (Se/Ne)
          activating: { Fi: 1.5 }, // 6: 活性 (Fi)
          ignoring: { Ne: 1.5, Se: 1.5 }, // 7: 制限 (Ne/Se)
          demonstrative: { Ti: 1.5 }, // 8: 実証 (Ti)
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: "q_ili_sli_deep", // ← ILI vs SLI 深掘りへ！
      },
      {
        text: "事実やデータから『各手段のコスト・効果・時間』を比較・評価し、最も素早く客観的な成果が出るやり方へ即座に切り替える",
        reasonTag:
          "【1Te：主導論理】LIE / LSE：外的な事実と生産性（Te）を軸に実利的な最適解を実行する（J的・合理的）",
        ieDeltas: { Te: 3.0, Ni: 1.5, Si: 1.5 },
        positionDeltas: {
          leading: { Te: 3.0 }, // 1: 主導 (Te)
          creative: { Ni: 1.5, Si: 1.5 }, // 2: 創造 (Ni/Si)
          role: { Fe: 1.0 }, // 3: 役割 (Fe)
          vulnerable: { Ni: 1.5, Si: 1.5 }, // 4: 脆弱 (Fi)
          suggestive: { Fi: 1.5 }, // 5: 暗示 (Fi)
          activating: { Se: 1.5, Ne: 1.5 }, // 6: 活性 (Se/Ne)
          ignoring: { Ti: 1.5 }, // 7: 制限 (Ti)
          demonstrative: { Ne: 1.5, Se: 1.5 }, // 8: 実証 (Ne/Se)
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q_lie_lse_deep", // ← LIE vs LSE 深掘りへ！
      },
      {
        text: "予定どおりに進まないなら、その場で状況に働きかける。相手や環境の出方を見ながら、目的を達成できる手段を次々と選んで動かす。",
        reasonTag:
          "【2Ti：補助論理＋主導知覚】ILE / SLE：目的達成のために柔軟なチェス駒のように状況に介入・戦術変更する",
        ieDeltas: { Ne: 2.0, Se: 2.0, Ti: 2.5 },
        positionDeltas: {
          leading: { Ne: 2.0, Se: 2.0 }, // 1: 主導 (Ne/Se)
          creative: { Ti: 2.5 }, // 2: 創造 (Ti)
          role: { Se: 1.0, Ne: 1.0 }, // 3: 役割 (Se/Ne)
          vulnerable: { Fi: 1.5 }, // 4: 脆弱 (Fi)
          suggestive: { Si: 1.5, Ni: 1.5 }, // 5: 暗示 (Si/Ni)
          activating: { Fe: 1.5 }, // 6: 活性 (Fe)
          ignoring: { Ni: 1.5, Si: 1.5 }, // 7: 制限 (Ni/Si)
          demonstrative: { Te: 1.5 }, // 8: 実証 (Te)
        },
        jpDelta: { j: 0.5, p: 1.5 },
        nextId: "q_ile_sle_deep", // ← ILE vs SLE 深掘りへ！
      },
      {
        text: " 論理や数値の計算よりもまず『自分や関わる人の気持ち・関係性の変化』を捉え、感情的なケアやモチベーションの修復を試みる",
        reasonTag:
          "【感情型全般】Fe/Fi機能主導・補助（1,2,7,8 Fe/Fi、3,4,5,6 Te/Ti配分）",
        ieDeltas: { Fi: 2.5, Fe: 2.5 },
        positionDeltas: {
          leading: { Fe: 1.0, Fi: 1.0 },
          creative: { Fe: 1.0, Fi: 1.0 },
          role: { Te: 0.5, Ti: 0.5 },
          vulnerable: { Te: 0.5, Ti: 0.5 },
          suggestive: { Te: 0.5, Ti: 0.5 },
          activating: { Te: 0.5, Ti: 0.5 },
          ignoring: { Fe: 1.0, Fi: 1.0 },
          demonstrative: { Fe: 1.0, Fi: 1.0 },
        },
        jpDelta: { j: 0, p: 0 },
        nextId: "q_thinking_style", // 感情型は深掘りなし（end）
      },
    ],
  },
  q_lii_lsi_deep: {
    id: "q_lii_lsi_deep",
    categoryTag: "🔬 論理適用の領域（概念空間 vs 現実構造）",
    type: "standard",
    text: "あなたが「自分の論理」を最も発揮したくなる・大切にしたい領域はどちら？",
    options: [
      {
        text: "目に見えない原理原則・理論体系・抽象的なモデルを分析し、「誰も気づいていない新しい概念的視点」を組み上げること",
        reasonTag:
          "【1Ti/2Ne】LII：2Neによる概念圧縮・理論建築・抽象空間の分析",
        ieDeltas: { Ti: 2.0, Ne: 3.0 },
        positionDeltas: {
          leading: { Ti: 3.0 },
          creative: { Ne: 3.0 },
          vulnerable: { Se: 2.0 },
          activating: { Si: 1.5 },
          demonstrative: { Ni: 1.5 },
        },
        jpDelta: { j: 1.5, p: 1.0 },
        nextId: "q_dislike_type",
      },
      {
        text: "目の前のルール、権限、現実の空間配置や境界線を明確にし、「破綻のない秩序と正確な管理手順」を維持すること",
        reasonTag:
          "【1Ti/2Se】LSI：2Seによる現実支配・空間境界線の維持・規律の徹底（LSI芋虫スタイル）",
        ieDeltas: { Ti: 2.0, Se: 3.0 },
        positionDeltas: {
          leading: { Ti: 3.0, Se: 2.0 },
          creative: { Se: 3.0 },
          vulnerable: { Ne: 2.0 },
          activating: { Ni: 1.5 },
          demonstrative: { Si: 1.5 },
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: "q_dislike_type",
      },
    ],
  },
  q_ili_sli_deep: {
    id: "q_ili_sli_deep",
    categoryTag: "🔬 撤退・静観の判断基準（時間の趨勢 vs 身体・環境感覚）",
    type: "standard",
    text: "「これ以上続けるのは割に合わない」と判断して手を引くとき、決め手となる感覚は？",
    options: [
      {
        text: "「このまま進んでも未来の展開が見えている」「全体の趨勢として崩壊・衰退に向かっている」という時間的な推移の確信",
        reasonTag:
          "【1Ni/2Te】ILI：1Niによる未来予測・時間の流れ・歴史的帰結に基づく撤退判断",
        ieDeltas: { Ni: 3.0, Te: 2.0 },
        positionDeltas: {
          leading: { Ni: 3.0 },
          role: { Si: 1.5 },
          suggestive: { Se: 1.5 },
          ignoring: { Ne: 1.5 },
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q_dislike_type",
      },
      {
        text: "「肉体的・感覚的に消耗しすぎて不快」「生活のペースや快適さが乱れてエネルギー効率が最悪になっている」という実感",
        reasonTag:
          "【1Si/2Te】SLI：1Siによる身体的快適さ・コンディション・最小エネルギー効率の追求",
        ieDeltas: { Si: 3.0, Te: 2.0 },
        positionDeltas: {
          leading: { Si: 3.0 },
          role: { Ni: 1.5 },
          suggestive: { Ne: 1.5 },
          ignoring: { Se: 1.5 },
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q_dislike_type",
      },
    ],
  },
  q_lie_lse_deep: {
    id: "q_lie_lse_deep",
    categoryTag:
      "🔬 客観的効率の推進軸（未来の動向・実験 vs 現実の品質・手順）",
    type: "standard",
    text: "あなたが効率や成果を追求するとき、より強くドライブがかかるのはどちら？",
    options: [
      {
        text: "誰も試していない新技術や理論を取り入れ、先の展開を予測してダイナミックに改革・実験を進めること",
        reasonTag:
          "【1Te/2Ni】LIE：2Niによる動的予測・パイオニア精神・マッドサイエンティスト的実験展開",
        ieDeltas: { Te: 3.0, Ni: 2.5 },
        positionDeltas: {
          creative: { Ni: 2.5 },
          vulnerable: { Si: 2.0 },
          activating: { Se: 1.5 },
          demonstrative: { Ne: 1.5 },
        },
        jpDelta: { j: 2.0, p: 0.5 },
        nextId: "q_dislike_type",
      },
      {
        text: "現実の技術、労働環境、具体的なマニュアルや手順を整理整頓し、確実で無駄のない実用性を高めること",
        reasonTag:
          "【1Te/2Si】LSE：2Siによる現実空間の整理整頓・高品質な技術管理・現場仕事の徹底",
        ieDeltas: { Te: 3.0, Si: 2.5 },
        positionDeltas: {
          creative: { Si: 2.5 },
          vulnerable: { Ni: 2.0 },
          activating: { Ne: 1.5 },
          demonstrative: { Se: 1.5 },
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: "q_dislike_type",
      },
    ],
  },
  q_ile_sle_deep: {
    id: "q_ile_sle_deep",
    categoryTag:
      "目的達成の駆動力（知的好奇心・概念の開拓 vs 障害の突破・現実支配）",
    type: "standard",
    text: "状況に応じて手段や戦術を柔軟に変えるとき、あなたの根底にある「一番の原動力」は？",
    options: [
      {
        text: "まだ試していない方法や新しい考え方を試したい。固定観念にとらわれず、思いもよらない可能性を探っていくことが楽しい。",
        reasonTag:
          "【1Ne/2Ti】ILE：1Neによる知的好奇心・可能性の探究・発想の自由さ",
        ieDeltas: { Ne: 3.0, Ti: 2.0 },
        positionDeltas: {
          leading: { Ne: 3.0 },
          role: { Se: 1.0 },
          suggestive: { Si: 1.5 },
          ignoring: { Ni: 1.5 },
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q_dislike_type",
      },
      {
        text: "目の前の状況を自分の目的に沿うように動かしたい。相手や環境の出方を見ながら、使える手段を選び、主導権を握ってゴールへ進めたい。",
        reasonTag:
          "【1Se/2Ti】SLE：1Seによる圧倒的突破力・チェス駒的実利コントロール（SLEスタイル）",
        ieDeltas: { Se: 3.0, Ti: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 },
          role: { Ne: 1.0 },
          suggestive: { Ni: 1.5 },
          ignoring: { Si: 1.5 },
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: "q_dislike_type",
      },
    ],
  },
  // --------------------------------------------------------------------------
  // q_dislike_type: あなたが最もストレスやイラつきを感じる相手（PoLR/超自我回避）
  // --------------------------------------------------------------------------
  q_dislike_type: {
    id: "q_dislike_type",
    categoryTag: "💥 最もストレスを感じる人間・行動パターン",
    type: "standard",
    text: "あなたが「こういう人や状況が一番苦手・イラつく！」と感じるのはどれ？",
    options: [
      {
        text: "異なる概念や構造を、ただ「似ているから」という理由だけで無理やり同一視・混同して語る人",
        reasonTag:
          "【4Se/4Ne：PoLR】LII / LSI：論理的厳密性（1Ti）の崩壊、構造の曖昧さに対する強い知的ストレス",
        ieDeltas: { Ti: 3.0, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Ti: 3.0 }, // 1: 判断 (Ti)
          creative: { Ne: 1.5, Se: 1.5 }, // 2: 知覚 (Ne/Se) ←両方加点！
          role: { Fi: 1.0 }, // 3: 判断 (Fi)
          vulnerable: { Se: 1.5, Ne: 1.5 }, // 4: 知覚 (Se/Ne) ←両方加点！
          suggestive: { Fe: 1.5 }, // 5: 判断 (Fe)
          activating: { Si: 1.5, Ni: 1.5 }, // 6: 知覚 (Si/Ni) ←両方加点！
          ignoring: { Te: 1.5 }, // 7: 判断 (Te)
          demonstrative: { Ni: 1.5, Si: 1.5 }, // 8: 知覚 (Ni/Si) ←両方加点！
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: "q_thinking_style_5step",
      },
      {
        text: "無駄や非効率なやり方をダラダラ続け、目の前で改善できる余地があるのに放置して変えようとしない人",
        reasonTag:
          "【4Fi/4Si：PoLR】LIE / LSE：客観的効率性（1Te）の欠如、生産性の阻害に対する耐性の低さ",
        ieDeltas: { Te: 3.0, Ni: 1.5, Si: 1.5 },
        positionDeltas: {
          leading: { Te: 3.0 }, // 1: 判断 (Te)
          creative: { Ni: 1.5, Si: 1.5 }, // 2: 知覚 (Ni/Si) ←両方加点！
          role: { Fe: 1.0 }, // 3: 判断 (Fe)
          vulnerable: { Ni: 1.5, Si: 1.5 },
          suggestive: { Fi: 1.5 }, // 5: 判断 (Fi)
          activating: { Se: 1.5, Ne: 1.5 }, // 6: 知覚 (Se/Ne) ←両方加点！
          ignoring: { Ti: 1.5 }, // 7: 判断 (Ti)
          demonstrative: { Ne: 1.5, Se: 1.5 }, // 8: 知覚 (Ne/Se) ←両方加点！
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: "q_thinking_style_5step",
      },
      {
        text: "目の前で現実の状況が動いているのに、何の決断も主導権も取らず指をくわえて傍観している人",
        reasonTag:
          "【4Fi：PoLR】SLE：現実への直接介入（1Se）と迅速な実行のなさへの強い焦燥感",
        ieDeltas: { Se: 3.0, Ti: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, // 1: 知覚 (Se)
          creative: { Ti: 2.0 }, // 2: 判断 (Ti)
          role: { Ne: 1.0 }, // 3: 知覚 (Ne)
          vulnerable: { Fi: 2.5 }, // 4: 判断 (Fi)
          suggestive: { Ni: 1.5 }, // 5: 知覚 (Ni)
          activating: { Fe: 1.5 }, // 6: 判断 (Fe)
          ignoring: { Si: 1.5 }, // 7: 知覚 (Si)
          demonstrative: { Te: 2.0 }, // 8: 判断 (Te)
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: "q_thinking_style_5step",
      },
      {
        text: "人や状況が秘める面白い可能性や選択肢がたくさんあるのに、頭を硬くして決めつけたり枠に閉じこもる人",
        reasonTag:
          "【1Ne/2Fi/2Ti】ILE / IEE：可能性（1Ne）の探索や人間関係・思考の柔軟性を塞ぐ不柔軟さへのイラつき",
        ieDeltas: { Ne: 3.0, Ti: 1.5, Fi: 1.5 },
        positionDeltas: {
          leading: { Ne: 3.0 }, // 1: 知覚 (Ne)
          creative: { Ti: 1.5, Fi: 1.5 }, // 2: 判断 (Ti/Fi) ←Fi追加！
          role: { Se: 1.0 }, // 3: 知覚 (Se)
          vulnerable: { Fi: 1.5, Ti: 1.5 }, // 4: 判断 (Fi/Ti) ←ILE(4Fi)/IEE(4Ti)両方加点！
          suggestive: { Si: 1.5 }, // 5: 知覚 (Si)
          activating: { Fe: 1.5, Te: 1.5 }, // 6: 判断 (Fe/Te)
          ignoring: { Ni: 1.5 }, // 7: 知覚 (Ni)
          demonstrative: { Te: 1.5, Fe: 1.5 }, // 8: 判断 (Te/Fe)
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q_thinking_style_5step",
      },
      {
        text: "自分の個人的領域にズカズカ踏み込み、約束を破ったり不誠実で横暴な振る舞いを平気でする人",
        reasonTag:
          "【4Te/4Si：PoLR】EII / ESI：パーソナルスペース侵害・誠実さ（1Fi）の欠如への強烈な拒絶",
        ieDeltas: { Fi: 3.0, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Fi: 3.0 }, // 1: 判断 (Fi)
          creative: { Ne: 1.5, Se: 1.5 }, // 2: 知覚 (Ne/Se) ←両方加点！
          role: { Ti: 1.0 }, // 3: 判断 (Ti)
          vulnerable: { Se: 1.5, Ne: 1.5 }, // 4: 知覚 (Se/Ne) ←両方加点！
          suggestive: { Te: 1.5 }, // 5: 判断 (Te)
          activating: { Si: 1.5, Ni: 1.5 }, // 6: 知覚 (Si/Ni) ←両方加点！
          ignoring: { Fe: 1.5 }, // 7: 判断 (Fe)
          demonstrative: { Ni: 1.5, Si: 1.5 }, // 8: 知覚 (Ni/Si) ←両方加点！
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: "q_thinking_style_5step",
      },
      {
        text: "細かな事務作業や現実的な手続きを上から目線で詰め込み、情緒やのほほんとしたペースを乱す人",
        reasonTag:
          "【4Te：PoLR】IEI / SEI：4Te（客観的手順・管理・詰め）への拒絶と1Ni/1Siの内的世界保護",
        ieDeltas: { Ni: 2.5, Si: 2.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Ni: 2.5, Si: 2.5 }, // 1: 知覚 (Ni/Si) ←両方加点！
          creative: { Fe: 2.0 }, // 2: 判断 (Fe)
          role: { Si: 1.0, Ni: 1.0 }, // 3: 知覚 (Si/Ni) ←両方加点！
          vulnerable: { Te: 2.0 }, // 4: 判断 (Te)
          suggestive: { Se: 1.5, Ne: 1.5 }, // 5: 知覚 (Se/Ne) ←両方加点！
          activating: { Ti: 1.5 }, // 6: 判断 (Ti)
          ignoring: { Ne: 1.5, Se: 1.5 }, // 7: 知覚 (Ne/Se) ←両方加点！
          demonstrative: { Fi: 2.0 }, // 8: 判断 (Fi)
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q_thinking_style_5step",
      },
      {
        text: "根拠のない根性論や騒々しい大騒ぎだけで押し押しで迫り、静かに状況を静観・分析することを不快がる人",
        reasonTag:
          "【4Fe：PoLR】ILI / SLI：4Fe（過度な感情表現・同調圧力）への強い不快感と拒絶",
        ieDeltas: { Ni: 2.5, Si: 2.5, Te: 2.0 },
        positionDeltas: {
          leading: { Ni: 2.5, Si: 2.5 }, // 1: 知覚 (Ni/Si) ←両方加点！
          creative: { Te: 2.0 }, // 2: 判断 (Te)
          role: { Si: 1.0, Ni: 1.0 }, // 3: 知覚 (Si/Ni) ←両方加点！
          vulnerable: { Fe: 2.0 }, // 4: 判断 (Fe)
          suggestive: { Se: 1.5, Ne: 1.5 }, // 5: 知覚 (Se/Ne) ←両方加点！
          activating: { Fi: 1.5 }, // 6: 判断 (Fi)
          ignoring: { Ne: 1.5, Se: 1.5 }, // 7: 知覚 (Ne/Se) ←両方加点！
          demonstrative: { Ti: 2.0 }, // 8: 判断 (Ti)
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q_thinking_style_5step",
      },
      {
        // 1Fe（ESE/EIE）：判断(Fe) -> 知覚(Si/Ni) -> 判断(Te) -> 知覚(Ni/Si) ...
        text: "自分の体調や快適さ、あるいは遠い未来の不吉な予測ばかり気にして、目の前の場の熱量や盛り上がりに冷や水をさす人",
        reasonTag:
          "【4th/PoLR：Si(EIE) / Ni(ESE)】1Fe（感情の熱量・一体感）を阻害する「快適さへの偏執(4Si)」や「不吉な不確定未来(4Ni)」への強い拒絶反応。",
        ieDeltas: { Fe: 3.0, Si: 1.5, Ni: 1.5 },
        positionDeltas: {
          leading: { Fe: 3.0 }, // 1: 判断 (Fe)
          creative: { Si: 1.5, Ni: 1.5 }, // 2: 知覚 (Si/Ni)
          role: { Te: 1.0 }, // 3: 判断 (Te)
          vulnerable: { Ni: 1.0, Si: 1.0 }, // 4: 知覚 (Ni/Si) ← 脆弱(PoLR)は知覚(Ni/Si)！
          suggestive: { Ti: 2.0 }, // 5: 判断 (Ti)   ← 暗示(Suggestive)は判断(Ti)！
          activating: { Ne: 1.5, Se: 1.5 }, // 6: 知覚 (Ne/Se)
          ignoring: { Fi: 2.0 }, // 7: 判断 (Fi)
          demonstrative: { Se: 1.5, Ne: 1.5 }, // 8: 知覚 (Se/Ne)
        },
        jpDelta: { j: 3.0, p: 0 },
        nextId: "q_thinking_style_5step",
      },
      {
        text: "細かなマニュアルや厳格なルールで束縛し、こちらの臨機応変な動きや直感を否定してくる人",
        reasonTag:
          "【4Ti：PoLR】SEE / IEE：細かな理論・固定された枠組み（4Ti）による行動の束縛への拒絶",
        ieDeltas: { Se: 2.5, Ne: 2.5, Fi: 2.5 },
        positionDeltas: {
          leading: { Se: 2.5, Ne: 2.5 }, // 1: 知覚 (Se/Ne)
          creative: { Fi: 2.5 }, // 2: 判断 (Fi)
          role: { Ne: 1.0, Se: 1.0 }, // 3: 知覚 (Ne/Se)
          vulnerable: { Ti: 2.0 }, // 4: 判断 (Ti)
          suggestive: { Ni: 1.0, Si: 1.0 }, // 5: 知覚 (Ni/Si)
          activating: { Te: 1.5 }, // 6: 判断 (Te)
          ignoring: { Si: 1.5, Ni: 1.5 }, // 7: 知覚 (Si/Ni)
          demonstrative: { Fe: 2.0 }, // 8: 判断 (Fe)
        },
        jpDelta: { j: 0, p: 2.5 },
        nextId: "q_thinking_style_5step",
      },
    ],
  },
  q_thinking_style_5step: {
    id: "q_thinking_style_5step",
    categoryTag: "🧭 思考・問題解決スタイル",
    type: "standard",
    text: "物事を考えたり、問題を解決したりするとき、あなたの感覚に一番近いものは？",
    options: [
      {
        // A（Ti主導）LII・LSI：判断(T) -> 知覚(N/S) -> 判断(F/F) -> 知覚(S/N) ...
        text: "物事は『正しく・あるべき姿』で構造化されるべき。曖昧さや例外、論理の破綻を絶対に放置せず、客観的で筋の通った絶対的な基準・フレームワークを構築し、それに厳格に従ってブレずに判断・決断する。」",
        reasonTag:
          "【Ti主導（合理/J）】1:Ti(判断) -> 2:Ne/Se(知覚) -> 3:Fi(判断) -> 4:Se/Ne(知覚) -> 5:Fe(判断) -> 6:Si/Ni(知覚) -> 7:Te(判断) -> 8:Ni/Si(知覚)",
        ieDeltas: { Ti: 3.0, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Ti: 3.0 },
          creative: { Ne: 1.5, Se: 1.5 },
          role: { Fi: 1.0 },
          vulnerable: { Se: 1.0, Ne: 1.0 },
          suggestive: { Fe: 1.5 },
          activating: { Si: 1.0, Ni: 1.0 },
          ignoring: { Te: 2.0 },
          demonstrative: { Ni: 2.0, Si: 2.0 },
        },
        jpDelta: { j: 3.0, p: 0 },
        nextId: "q_bureaucracy_response",
      },
      {
        // B（Te補助）ILI・SLI：知覚(N/S) -> 判断(T) -> 知覚(S/N) -> 判断(F/F) ...
        text: "「最初から答えを決めつけず、実際の事実や状況を見ながら判断したい。新しい情報が出てきたら考えを変えることにも抵抗がなく、理屈より現実に合っているかを重視する。」",
        reasonTag:
          "【Te補助（非合理/P）】1:Ni/Si(知覚) -> 2:Te(判断) -> 3:Si/Ni(知覚) -> 4:Fe(判断) -> 5:Se/Ne(知覚) -> 6:Fi(判断) -> 7:Ne/Se(知覚) -> 8:Ti(判断)",
        ieDeltas: { Ni: 2.0, Si: 2.0, Te: 2.5 },
        positionDeltas: {
          leading: { Ni: 2.5, Si: 2.5 },
          creative: { Te: 2.5 },
          role: { Si: 1.0, Ni: 1.0 },
          vulnerable: { Fe: 1.0 },
          suggestive: { Se: 1.5, Ne: 1.5 },
          activating: { Fi: 1.5 },
          ignoring: { Ne: 2.0, Se: 2.0 },
          demonstrative: { Ti: 2.0 },
        },
        jpDelta: { j: 0, p: 3.0 },
        nextId: "q_bureaucracy_response",
      },
      {
        // C（Te主導）LIE・LSE：判断(T) -> 知覚(N/S) -> 判断(F/F) -> 知覚(S/N) ...
        text: "「実際の結果やデータを比べて、最も成果が出る方法を選ぶ。うまくいかなければ、効果のある方法へ改善する。」",
        reasonTag:
          "【Te主導（合理/J）】1:Te(判断) -> 2:Ni/Si(知覚) -> 3:Fe(判断) -> 4:Si/Ni(知覚) -> 5:Fi(判断) -> 6:Se/Ne(知覚) -> 7:Ti(判断) -> 8:Ne/Si(知覚)",
        ieDeltas: { Te: 3.0, Ni: 1.5, Si: 1.5 },
        positionDeltas: {
          leading: { Te: 3.0 },
          creative: { Ni: 1.5, Si: 1.5 },
          role: { Fe: 1.0 },
          vulnerable: { Si: 1.0, Ni: 1.0 },
          suggestive: { Fi: 1.5 },
          activating: { Se: 1.0, Ne: 1.0 },
          ignoring: { Ti: 2.0 },
          demonstrative: { Ne: 2.0, Si: 2.0 },
        },
        jpDelta: { j: 3.0, p: 0 },
        nextId: "q_bureaucracy_response",
      },
      {
        // D（Ti補助）ILE・SLE：知覚(N/S) -> 判断(T) -> 知覚(S/N) -> 判断(F/F) ...
        text: "「自分なりに筋の通ったやり方を考えるが、最初から正解だと決めつけない。まず実際に試して、結果や相手の反応を見ながら、使えるなら続け、違えばその場で考え直す。」",
        reasonTag:
          "【Ti補助（非合理/P）】1:Ne/Se(知覚) -> 2:Ti(判断) -> 3:Se/Ne(知覚) -> 4:Fi(判断) -> 5:Si/Ni(知覚) -> 6:Fe(判断) -> 7:Ni/Si(知覚) -> 8:Te(判断)",
        ieDeltas: { Ne: 2.0, Se: 2.0, Ti: 2.5 },
        positionDeltas: {
          leading: { Ne: 2.5, Se: 2.5 },
          creative: { Ti: 2.5 },
          role: { Se: 1.0, Ne: 1.0 },
          vulnerable: { Fi: 1.0 },
          suggestive: { Si: 1.5, Ni: 1.5 },
          activating: { Fe: 1.5 },
          ignoring: { Ni: 2.0, Si: 2.0 },
          demonstrative: { Te: 2.0 },
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: "q_bureaucracy_response",
      },
      {
        // E（感情型全般）
        text: "「論理やデータ、効率の算出よりも、関わる人の気持ち・人間関係の調和や自分がしっくり来る心の納得感を一番の基準にして判断する。」",
        reasonTag:
          "【感情型全般】1,2,7,8: Fe/Fi, 3,4,5,6: Ti/Te均等分配プロパティ",
        ieDeltas: { Fi: 2.5, Fe: 2.5, Ti: 1.0, Te: 1.0 },
        positionDeltas: {
          leading: { Fe: 1.0, Fi: 1.0 },
          creative: { Fe: 1.0, Fi: 1.0 },
          role: { Te: 0.5, Ti: 0.5 },
          vulnerable: { Te: 0.5, Ti: 0.5 },
          suggestive: { Te: 0.5, Ti: 0.5 },
          activating: { Te: 0.5, Ti: 0.5 },
          ignoring: { Fe: 1.0, Fi: 1.0 },
          demonstrative: { Fe: 1.0, Fi: 1.0 },
        },
        jpDelta: { j: 1.0, p: 1.0 },
        nextId: "q_bureaucracy_response",
      },
    ],
  },
  // --------------------------------------------------------------------------
  // q_bureaucracy_response: 窓口タライ回し対応時の脳内リアクション（5択）
  // --------------------------------------------------------------------------
  q_bureaucracy_response: {
    id: "q_bureaucracy_response",
    categoryTag: "🧭 問い合わせタライ回しインシデントへの反応",
    type: "standard",
    text: "問い合わせをしたら「担当者→別部署→また別の担当者…」と何度も回されて話が進まないとき、あなたの脳内に一番浮かぶのは？",
    options: [
      {
        // A：Ti主導（LII / LSI）：判断(T) -> 知覚(N/S) -> 判断(F/F) -> 知覚(S/N) ...
        text: "「担当が決まってないのがおかしい。この業務フローでは責任の所在が曖昧になる。これを他の客にもやってるなら、会社として構造的に問題があるんじゃない？」",
        reasonTag:
          "【Ti主導（合理/J）】システムのバグ・構造的欠陥・責任所在の曖昧さを論理的に糾弾。1:Ti -> 2:Ne/Se -> 3:Fi -> 4:Se/Ne -> 5:Fe -> 6:Si/Ni -> 7:Te -> 8:Ni/Si",
        ieDeltas: { Ti: 2.0, Ne: 1.5, Se: 1.5 },
        positionDeltas: {
          leading: { Ti: 2.0 },
          creative: { Ne: 1.5, Se: 1.5 },
          role: { Fi: 1.0 },
          vulnerable: { Se: 1.0, Ne: 1.0 },
          suggestive: { Fe: 1.5 },
          activating: { Si: 1.0, Ni: 1.0 },
          ignoring: { Te: 2.0 },
          demonstrative: { Ni: 2.0, Si: 2.0 },
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: "q_thinking_vs_feeling",
      },
      {
        // B：Te補助（ILI / SLI）：知覚(N/S) -> 判断(T) -> 知覚(S/N) -> 判断(F/F) ...
        text: "「この会社、たぶんずっとこんな感じなんだろうな。ここに時間使うだけ無駄そう。」",
        reasonTag:
          "【Te補助（非合理/P）】時間の無駄・全体の傾向を冷徹に観測して諦観・撤退。1:Ni/Si -> 2:Te -> 3:Si/Ni -> 4:Fe -> 5:Se/Ne -> 6:Fi -> 7:Ne/Se -> 8:Ti",
        ieDeltas: { Ni: 2.0, Si: 2.0, Te: 2.5 },
        positionDeltas: {
          leading: { Ni: 2.5, Si: 2.5 },
          creative: { Te: 2.5 },
          role: { Si: 1.0, Ni: 1.0 },
          vulnerable: { Fe: 1.0 },
          suggestive: { Se: 1.5, Ne: 1.5 },
          activating: { Fi: 1.5 },
          ignoring: { Ne: 2.0, Se: 2.0 },
          demonstrative: { Ti: 2.0 },
        },
        jpDelta: { j: 0, p: 3.0 },
        nextId: "q_thinking_vs_feeling",
      },
      {
        // C：Te主導（LIE / LSE）：判断(T) -> 知覚(N/S) -> 判断(F/F) -> 知覚(S/N) ...
        text: "「この対応じゃ時間がかかりすぎる。もっと処理の早い窓口・方法に変えたほうがいい。」",
        reasonTag:
          "【Te主導（合理/J）】処理効率とタイムパフォーマンスの悪化を指摘し速やかに代替手段へ切り替え。1:Te -> 2:Ni/Si -> 3:Fe -> 4:Si/Ni -> 5:Fi -> 6:Se/Ne -> 7:Ti -> 8:Ne/Si",
        ieDeltas: { Te: 3.0, Ni: 1.5, Si: 1.5 },
        positionDeltas: {
          leading: { Te: 2.0 },
          creative: { Ni: 1.5, Si: 1.5 },
          role: { Fe: 1.0 },
          vulnerable: { Si: 1.0, Ni: 1.0 },
          suggestive: { Fi: 1.5 },
          activating: { Se: 1.0, Ne: 1.0 },
          ignoring: { Ti: 2.0 },
          demonstrative: { Ne: 2.0, Si: 2.0 },
        },
        jpDelta: { j: 3.0, p: 0 },
        nextId: "q_thinking_vs_feeling",
      },
      {
        // D：Ti補助（ILE / SLE）：知覚(N/S) -> 判断(T) -> 知覚(S/N) -> 判断(F/F) ...
        text: "「なんだこのクソみたいな対応。話の分かる奴出せ。」",
        reasonTag:
          "【Ti補助】相手の権力・影響力のなさを見抜き即座に実権者へ介入・突破を図る。1:Ne/Se -> 2:Ti -> 3:Se/Ne -> 4:Fi -> 5:Si/Ni -> 6:Fe -> 7:Ni/Si -> 8:Te",
        ieDeltas: { Ne: 2.0, Se: 2.0, Ti: 2.5 },
        positionDeltas: {
          leading: { Ne: 2.5, Se: 2.5 },
          creative: { Ti: 1.5 },
          role: { Se: 1.0, Ne: 1.0 },
          vulnerable: { Fi: 1.0 },
          suggestive: { Si: 1.5, Ni: 1.5 },
          activating: { Fe: 1.5 },
          ignoring: { Ni: 2.0, Si: 2.0 },
          demonstrative: { Te: 2.0 },
        },
        jpDelta: { j: 0, p: 0 },
        nextId: "q_thinking_vs_feeling",
      },
      {
        // E：感情型全般
        text: "「何回も説明させられてすごく疲れる…相手の担当者も困ってるのかもしれないけど、もうちょっと丁寧に対応してほしいな。」",
        reasonTag:
          "【感情型全般】1,2,7,8: Fe/Fi(2.5), 3,4,5,6: Ti/Te(1.0) 均等分配プロパティ",
        ieDeltas: { Fi: 2.5, Fe: 2.5, Ti: 1.0, Te: 1.0 },
        positionDeltas: {
          leading: { Fe: 1.0, Fi: 1.0 },
          creative: { Fe: 1.0, Fi: 1.0 },
          role: { Te: 0.5, Ti: 0.5 },
          vulnerable: { Te: 0.5, Ti: 0.5 },
          suggestive: { Te: 0.5, Ti: 0.5 },
          activating: { Te: 0.5, Ti: 0.5 },
          ignoring: { Fe: 1.0, Fi: 1.0 },
          demonstrative: { Fe: 1.0, Fi: 1.0 },
        },
        jpDelta: { j: 1.0, p: 1.0 },
        nextId: "q_thinking_vs_feeling",
      },
    ],
  },
  q_thinking_vs_feeling: {
    id: "q_thinking_vs_feeling",
    categoryTag: "🧭 判断機能",
    type: "standard",
    text: "物事を判断したり状況に関わったりする時、あなたが最も頼りにする基準や安心を感じる軸は？",
    options: [
      {
        // T要素の統合（1Ti, 2Ti, 1Te, 2Te）
        text: "個人の感情や場の空気に流されず、筋の通った理論・ルールや、客観的に正確な事実・データ・効率性を重視して判断する。無駄なく理にかなった状態に安心覚える。",
        reasonTag:
          "【思考（T）】Ti / Te（LII, ILE, LSI, SLE, LIE, LSE, ILI, SLI）",
        ieDeltas: { Ti: 2.0, Te: 2.0 },
        positionDeltas: {
          leading: { Ti: 1.5, Te: 1.5 },
          creative: { Ti: 1.5, Te: 1.5 },
        },
        nextId: "q_darling_liar",
        jpDelta: {
          j: 0,
          p: 0,
        },
      },
      {
        // F要素の統合（1Fi, 2Fi, 1Fe, 2Fe）
        text: "人との心理的距離感や味方かどうかの見極め・人間関係の繋がりや、その場の雰囲気・情熱・相手の気持ちを重視して判断する。人間同士のリアルな感情や心地よい空気を大切にする。",
        reasonTag:
          "【感情（F）】Fi / Fe（EII, IEE, ESI, SEE, EIE, ESE, IEI, SEI）",
        ieDeltas: { Fi: 2.0, Fe: 2.0 },
        positionDeltas: {
          leading: { Fi: 1.5, Fe: 1.5 },
          creative: { Fi: 1.5, Fe: 1.5 },
        },
        nextId: "q_darling_liar",
        jpDelta: {
          j: 0,
          p: 0,
        },
      },
    ],
  },

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
          leading: { Ti: 3.0 }, creative: { Ne: 2.5 }, role: { Fi: 1.0 },
          vulnerable: { Se: 1.5 }, suggestive: { Fe: 0.5 }, activating: { Si: 0.5 },
          ignoring: { Te: 1.0 }, demonstrative: { Ni: 0.5 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q_ili_lii_lsi_split_2'
      },
      {
        text: '細かい定義を一つずつ固定するより、「この話は結局どこへ向かっているのか？」という全体の流れを見る。情報が足りなくても、過去から現在までの流れや傾向から、その先に起こりそうな展開をぼんやり予測する。',
        reasonTag: '【ILI】1Ni, 2Te, 8Ti（時間軸・潮流・未来への収束）',
        ieDeltas: { Ni: 3.0, Te: 2.5, Ti: 1.0, Ne: 0.5, Se: -0.5, Si: 1.5, Fe: -1.0, Fi: 1.0 },
        positionDeltas: {
          leading: { Ni: 3.0 }, creative: { Te: 2.5 }, role: { Si: 1.5 },
          vulnerable: { Fe: 1.0 }, suggestive: { Se: 0.5 }, activating: { Fi: 1.0 },
          ignoring: { Ne: 0.5 }, demonstrative: { Ti: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q_ili_lii_lsi_split_2'
      },
      {
        text: '曖昧な概念をそのまま漂わせるのが気持ち悪く、具体的な物体・配置・力関係・手順などに置き換えて考えたくなる。「この仕組みは実際には何がどこにあって、どう作用しているのか？」まで落とし込み、明確な構造として把握したい。',
        reasonTag: '【LSI】1Ti, 2Se, 8Si（抽象の物質化＋具体的構造の固定）',
        ieDeltas: { Ti: 3.0, Se: 2.5, Si: 1.5, Te: 1.0, Ne: -2.0, Ni: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.0 }, creative: { Se: 2.5 }, role: { Fi: 1.0 },
          vulnerable: { Ne: 2.0 }, suggestive: { Fe: 0.5 }, activating: { Ni: 0.5 },
          ignoring: { Te: 1.0 }, demonstrative: { Si: 1.5 }
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
          leading: { Ti: 2.5 }, creative: { Ne: 3.0 }, role: { Fi: 1.0 },
          vulnerable: { Se: 1.0 }, suggestive: { Fe: 0.5 }, activating: { Si: 0.5 },
          ignoring: { Te: 0.5 }, demonstrative: { Ni: 1.5 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q_ili_lii_lsi_split_3'
      },
      {
        text: '現在の状況だけでなく、過去から現在までの流れを見ると「このまま行けば最終的にこうなりそう」という一本の潮流が見えてくる。未来はまだ決まっていなくても、長期的な傾向から結末を予測してしまう。',
        reasonTag: '【ILI】1Ni, 2Te, 8Ti（時間の流れ・長期的収束）',
        ieDeltas: { Ni: 3.5, Te: 2.0, Ti: 1.0, Ne: -0.5, Se: -0.5, Si: 1.0, Fe: -1.0, Fi: 0.5 },
        positionDeltas: {
          leading: { Ni: 3.5 }, creative: { Te: 2.0 }, role: { Si: 1.0 },
          vulnerable: { Fe: 1.0 }, suggestive: { Se: 0.5 }, activating: { Fi: 0.5 },
          ignoring: { Ne: 0.5 }, demonstrative: { Ti: 1.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q_ili_lii_lsi_split_3'
      },
      {
        text: '不確定な未来をあれこれ想像するより、現在わかっている事実・条件・既存のルールを確認する。そのうえで、現場の状況に応じて必要な手順を決め、実際に問題が起きたらその都度対処すればいい。',
        reasonTag: '【LSI】1Ti, 2Se, 8Si（現状確認・既存条件・実務対応）',
        ieDeltas: { Ti: 2.5, Se: 2.5, Si: 1.5, Ne: -2.0, Ni: 0.5, Te: 1.0, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 2.5 }, creative: { Se: 2.5 }, role: { Fi: 1.0 },
          vulnerable: { Ne: 2.0 }, suggestive: { Fe: 0.5 }, activating: { Ni: 0.5 },
          ignoring: { Te: 1.0 }, demonstrative: { Si: 1.5 }
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
          vulnerable: { Se: 1.0 }, suggestive: { Fe: 0.5 }, activating: { Si: 0.5 },
          ignoring: { Te: 1.0 }, demonstrative: { Ni: 0.5 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q_ili_lii_lsi_split_4'
      },
      {
        text: '新しい可能性そのものより、「その変更によって今後どうなるのか」を見る。もし新しい説のほうが将来の展開をうまく説明できるなら静かに乗り換えるし、そうでなければ特に感情的にならず放置する。',
        reasonTag: '【ILI】1Ni, 2Te, 5Se（将来の流れを見て採用・放置）',
        ieDeltas: { Ni: 3.0, Te: 2.5, Se: 1.0, Ne: 0.5, Ti: 1.0, Si: 1.0, Fe: -0.5, Fi: 0.5 },
        positionDeltas: {
          leading: { Ni: 3.0 }, creative: { Te: 2.5 }, role: { Si: 1.0 },
          vulnerable: { Fe: 0.5 }, suggestive: { Se: 1.0 }, activating: { Fi: 0.5 },
          ignoring: { Ne: 0.5 }, demonstrative: { Ti: 1.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q_ili_lii_lsi_split_4'
      },
      {
        text: '「これが正しい」と決めた枠組みに、根拠の薄い別案を次々持ち込まれるとかなり苛立つ。「その可能性を考えて何が変わるの？」となり、不要な分岐を切って元のルールや方針を維持したくなる。',
        reasonTag: '【LSI】1Ti, 2Se, 4Ne（既存体系の防衛・不要な可能性の排除）',
        ieDeltas: { Ti: 3.0, Se: 2.5, Ne: -3.0, Si: 1.0, Te: 1.0, Ni: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.0 }, creative: { Se: 2.5 }, role: { Fi: 1.0 },
          vulnerable: { Ne: 3.0 }, suggestive: { Fe: 0.5 }, activating: { Ni: 0.5 },
          ignoring: { Te: 1.0 }, demonstrative: { Si: 1.0 }
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
          leading: { Ti: 2.0 }, creative: { Ne: 1.0 }, role: { Fi: 1.0 },
          vulnerable: { Se: 3.0 }, suggestive: { Fe: 1.0 }, activating: { Si: 1.0 },
          ignoring: { Te: 0.5 }, demonstrative: { Ni: 0.5 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q_ili_lii_lsi_split_5'
      },
      {
        text: '自分から強く動くより、誰かが方向を決めて引っ張ってくれたほうが楽なことがある。「はいはい、行けばいいんでしょ」と受け入れて動く。ただし意味のない強制や感情的な騒ぎには付き合いたくない。',
        reasonTag: '【ILI】1Ni, 5Se, 4Fe（外部からの行動推進を利用・感情的圧力は拒否）',
        ieDeltas: { Ni: 2.5, Se: 2.0, Te: 1.5, Fe: -2.0, Ti: 0.5, Ne: 0.5, Si: 1.0, Fi: 1.0 },
        positionDeltas: {
          leading: { Ni: 2.5 }, creative: { Te: 1.5 }, role: { Si: 1.0 },
          vulnerable: { Fe: 2.0 }, suggestive: { Se: 2.0 }, activating: { Fi: 1.0 },
          ignoring: { Ne: 0.5 }, demonstrative: { Ti: 0.5 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q_ili_lii_lsi_split_5'
      },
      {
        text: '「うるさい！」「急かすな！」と内心、あるいは実際にキレたくなる。自分の領域やルールに外部から勝手に踏み込まれること自体が許せず、必要なら相手を押し返して自分の主導権を取り戻したくなる。',
        reasonTag: '【LSI】1Ti, 2Se（外圧への対抗・領域防衛・主導権奪還）',
        ieDeltas: { Ti: 3.0, Se: 3.0, Ne: -1.5, Si: 1.0, Te: 1.0, Ni: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.0 }, creative: { Se: 3.0 }, role: { Fi: 1.0 },
          vulnerable: { Ne: 1.5 }, suggestive: { Fe: 0.5 }, activating: { Ni: 0.5 },
          ignoring: { Te: 1.0 }, demonstrative: { Si: 1.0 }
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
          leading: { Ti: 3.5 }, creative: { Ne: 2.5 }, role: { Fi: 1.0 },
          vulnerable: { Se: 1.5 }, suggestive: { Fe: 0.5 }, activating: { Si: 0.5 },
          ignoring: { Te: 1.5 }, demonstrative: { Ni: 0.5 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'result'
      },
      {
        text: '理論そのものを完成させることより、「この考え方を使うと今後どうなるか」を見る。時間が経って状況が変われば、同じ理論に固執せず、その時点で最も現実的な予測や判断ができる形に更新していく。',
        reasonTag: '【ILI】1Ni, 2Te, 8Ti（理論より時間軸・予測・実利）',
        ieDeltas: { Ni: 3.5, Te: 2.5, Ti: 1.5, Ne: 0.5, Se: 0.5, Si: 1.0, Fe: -0.5, Fi: 0.5 },
        positionDeltas: {
          leading: { Ni: 3.5 }, creative: { Te: 2.5 }, role: { Si: 1.0 },
          vulnerable: { Fe: 0.5 }, suggestive: { Se: 0.5 }, activating: { Fi: 0.5 },
          ignoring: { Ne: 0.5 }, demonstrative: { Ti: 1.5 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'result'
      },
      {
        text: '理論を実際のルール・手順・配置・役割分担などに落とし込み、現場でブレずに機能する形へ固定したい。何をどう動かせば結果が変わるのかまで具体化し、一度決めた基準は簡単には変更しない。',
        reasonTag: '【LSI】1Ti, 2Se, 8Si（論理→具体的ルール・配置・運用）',
        ieDeltas: { Ti: 3.5, Se: 3.0, Si: 1.5, Te: 1.0, Ne: -2.0, Ni: 0.5, Fe: 0.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 3.5 }, creative: { Se: 3.0 }, role: { Fi: 1.0 },
          vulnerable: { Ne: 2.0 }, suggestive: { Fe: 0.5 }, activating: { Ni: 0.5 },
          ignoring: { Te: 1.0 }, demonstrative: { Si: 1.5 }
        },
        jpDelta: { j: 2.5, p: 0 },
        nextId: 'result'
      }
    ]
  },
  q_darling_liar: {
    id: "q_darling_liar",
    categoryTag: "🥺💕 突発襲来",
    type: "text_input",
    text: "🥺『ねぇ、ダーリン♡\n嘘をつく人ってどう思う？』",
    nextId: "q_darling_intercom",
    options: [
      {
        text: "次へ",
        reasonTag: "微加点（何を入力しても）",
        ieDeltas: { Fi: 0.5, Fe: 0.5 },
        positionDeltas: { },
        jpDelta: { j: 0, p: 0 },
        nextId: "q_darling_intercom",
      }
    ]
  },

  q_sle_vs_see_1: {
    id: 'q_sle_vs_see_1',
    categoryTag: '⚔️ 人を動かす戦略（SLE vs SEE）',
    type: 'standard',
    text: '目標達成や人を動かす際、あなたの【思考の軸】に一番近いものは？',
    options: [
      {
        text: '盤面全体を俯瞰する軍略家のように、相手の動向や環境を冷静に分析する。目立つ必要はなく、目的達成のためにあえて気配を消し、最適な手札と力で確実に結果を出す。',
        reasonTag: '【SLE】1Se, 2Ti, 3Ne, 4Fi, 5Ni, 6Fe, 7Si, 8Te（ENTJ的戦略・構造的勝利）',
        ieDeltas: { Se: 3.0, Ti: 3.0, Ne: 1.0, Fi: -2.0, Ni: 1.5, Fe: 1.0, Si: 0.5, Te: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Ti: 3.0 }, role: { Ne: 1.0 }, vulnerable: { Fi: 2.0 },
          suggestive: { Ni: 1.5 }, activating: { Fe: 1.0 }, ignoring: { Si: 0.5 }, demonstrative: { Te: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_sle_vs_see_2'
      },
      {
        text: '相手の性格、心理、関係性を瞬時に見抜き、人との繋がりや影響力を活かして動かす。自分の存在感と交渉力を前面に出し、人を巻き込みながら物事を有利に進める。',
        reasonTag: '【SEE】1Se, 2Fi, 3Ne, 4Ti, 5Ni, 6Te, 7Si, 8Fe（心理・関係性の介入・人気獲得）',
        ieDeltas: { Se: 3.0, Fi: 3.0, Ne: 1.0, Ti: -2.0, Ni: 1.5, Te: 2.0, Si: 0.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Fi: 3.0 }, role: { Ne: 1.0 }, vulnerable: { Ti: 2.0 },
          suggestive: { Ni: 1.5 }, activating: { Te: 2.0 }, ignoring: { Si: 0.5 }, demonstrative: { Fe: 2.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q_sle_vs_see_2'
      }
    ]
  },
  q_sle_vs_see_2: {
    id: 'q_sle_vs_see_2',
    categoryTag: '⚔️ 露出と評価のスタンス（SLE vs SEE）',
    type: 'standard',
    text: '周囲からの『評価や存在感』について、あなたが求めている感覚はどちら？',
    options: [
      {
        text: '目立つこと自体には興味がない。必要なら前に出るし、必要なければ裏から動けばいい。大事なのは結果。',
        reasonTag: '【SLE】1Se, 2Ti, 3Ne, 4Fi, 5Ni, 6Fe, 7Si, 8Te（結果主義・実力支配）',
        ieDeltas: { Se: 3.0, Ti: 3.0, Ne: 1.0, Fi: -2.0, Ni: 1.5, Fe: 1.0, Si: 0.5, Te: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Ti: 3.0 }, role: { Ne: 1.0 }, vulnerable: { Fi: 2.0 },
          suggestive: { Ni: 1.5 }, activating: { Fe: 1.0 }, ignoring: { Si: 0.5 }, demonstrative: { Te: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_sle_vs_see_3'
      },
      {
        text: '自分の存在感、個性、魅力を認めてほしい。世間や周囲からの注目・称賛を集め、『人気者・特別な存在』として評価されることに強い快感を覚える。',
        reasonTag: '【SEE】1Se, 2Fi, 3Ne, 4Ti, 5Ni, 6Te, 7Si, 8Fe（セルフプロデュース・注目欲求）',
        ieDeltas: { Se: 3.0, Fi: 3.0, Ne: 1.0, Ti: -2.0, Ni: 1.5, Te: 2.0, Si: 0.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Fi: 3.0 }, role: { Ne: 1.0 }, vulnerable: { Ti: 2.0 },
          suggestive: { Ni: 1.5 }, activating: { Te: 2.0 }, ignoring: { Si: 0.5 }, demonstrative: { Fe: 2.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q_sle_vs_see_3'
      }
    ]
  },
  q_sle_vs_see_3: {
    id: 'q_sle_vs_see_3',
    categoryTag: '⚔️ 計画と立ち回り（SLE vs SEE）',
    type: 'standard',
    text: '目標を果たすための【アプローチの優先度】はどちらに近い？',
    options: [
      {
        text: 'あらかじめ行動の計画を論理的に分析し、状況の出方を見ながら柔軟に戦術を変える。主導権を握り、障害を力強く切り開く。',
        reasonTag: '【SLE】1Se, 2Ti, 3Ne, 4Fi, 5Ni, 6Fe, 7Si, 8Te（ENTJ的チェス盤論理）',
        ieDeltas: { Se: 3.0, Ti: 3.0, Ne: 1.0, Fi: -2.0, Ni: 1.5, Fe: 1.0, Si: 0.5, Te: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Ti: 3.0 }, role: { Ne: 1.0 }, vulnerable: { Fi: 2.0 },
          suggestive: { Ni: 1.5 }, activating: { Fe: 1.0 }, ignoring: { Si: 0.5 }, demonstrative: { Te: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_sle_vs_see_4'
      },
      {
        text: '誰と関わるのが効果的かを見極め、相手の感情や立場を考慮して動く。自分が有利になるよう立ち回りを計算し、人脈や空気感で動かす。',
        reasonTag: '【SEE】1Se, 2Fi, 3Ne, 4Ti, 5Ni, 6Te, 7Si, 8Fe（政治的ゲーム・印象操作）',
        ieDeltas: { Se: 3.0, Fi: 3.0, Ne: 1.0, Ti: -2.0, Ni: 1.5, Te: 2.0, Si: 0.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Fi: 3.0 }, role: { Ne: 1.0 }, vulnerable: { Ti: 2.0 },
          suggestive: { Ni: 1.5 }, activating: { Te: 2.0 }, ignoring: { Si: 0.5 }, demonstrative: { Fe: 2.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q_sle_vs_see_4'
      }
    ]
  },
  q_sle_vs_see_4: {
    id: 'q_sle_vs_see_4',
    categoryTag: '⚔️ 演出と自己表現（SLE vs SEE）',
    type: 'standard',
    text: '『自分の演出や印象操作』についての感覚はどちらに該当する？',
    options: [
      {
        text: '自分をどう魅せるか等の計算に興味はない。ファッションも実用・フォーマル重視。演出よりも直球の実力と事実で勝負する。',
        reasonTag: '【SLE】1Se, 2Ti, 3Ne, 4Fi, 5Ni, 6Fe, 7Si, 8Te（Fi脆弱：印象操作を不毛とみなす）',
        ieDeltas: { Se: 3.0, Ti: 3.0, Ne: 1.0, Fi: -2.0, Ni: 1.5, Fe: 1.0, Si: 0.5, Te: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Ti: 3.0 }, role: { Ne: 1.0 }, vulnerable: { Fi: 2.0 },
          suggestive: { Ni: 1.5 }, activating: { Fe: 1.0 }, ignoring: { Si: 0.5 }, demonstrative: { Te: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_sle_vs_see_5'
      },
      {
        text: '世間から自分がどう見えるかを意識し、あえて魅せるキャラクターを演出（セルフプロデュース）する。得をするために魅力を最大化させる演出も自分の実力・武器の一部である。',
        reasonTag: '【SEE】1Se, 2Fi, 3Ne, 4Ti, 5Ni, 6Te, 7Si, 8Fe（Fi創造：演出も己の力）',
        ieDeltas: { Se: 3.0, Fi: 3.0, Ne: 1.0, Ti: -2.0, Ni: 1.5, Te: 2.0, Si: 0.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Fi: 3.0 }, role: { Ne: 1.0 }, vulnerable: { Ti: 2.0 },
          suggestive: { Ni: 1.5 }, activating: { Te: 2.0 }, ignoring: { Si: 0.5 }, demonstrative: { Fe: 2.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q_sle_vs_see_5'
      }
    ]
  },
  q_sle_vs_see_5: {
    id: 'q_sle_vs_see_5',
    categoryTag: '⚔️ 敵やアンチに対する対応（SLE vs SEE）',
    type: 'standard',
    text: '自分を批判・アンチしてくる奴や敵に対峙した時、あなたの内面・リアクションに一番近いのは？',
    options: [
      {
        text: '相手の「論理の矛盾」を突き、正論や事実のロジックで言葉通り言いくるめて黙らせる。目的は「相手を論理的・構造的に完封すること。',
        reasonTag: '【SLE】1Se, 2Ti, 3Ne, 4Fi, 5Ni, 6Fe, 7Si, 8Te（無駄な感情戦をゴミ扱い）',
        ieDeltas: { Se: 3.0, Ti: 3.0, Ne: 1.0, Fi: -2.0, Ni: 1.5, Fe: 1.0, Si: 0.5, Te: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Ti: 3.0 }, role: { Ne: 1.0 }, vulnerable: { Fi: 2.0 },
          suggestive: { Ni: 1.5 }, activating: { Fe: 1.0 }, ignoring: { Si: 0.5 }, demonstrative: { Te: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'result'
      },
      {
        text: '自分の立ち位置や優位性を周囲に見せつけることで分からせる。立ち回りや影響力で上回り、相手の批判を封じ込めて自分の立場を守る。',
        reasonTag: '【SEE】1Se, 2Fi, 3Ne, 4Ti, 5Ni, 6Te, 7Si, 8Fe（マウント・立ち回りの誇示）',
        ieDeltas: { Se: 4.0, Fi: 4.0, Ne: 1.0, Ti: -3.0, Ni: 2.0, Te: 3.0, Si: 0.5, Fe: 3.0 },
        positionDeltas: {
          leading: { Se: 4.0 }, creative: { Fi: 4.0 }, role: { Ne: 1.0 }, vulnerable: { Ti: 3.0 },
          suggestive: { Ni: 2.0 }, activating: { Te: 3.0 }, ignoring: { Si: 0.5 }, demonstrative: { Fe: 3.0 }
        },
        jpDelta: { j: 0, p: 3.0 },
        nextId: 'result'
      }
    ]
  },

  q_te_se_split_1: {
    id: 'q_te_se_split_1',
    categoryTag: '⚡ 行動の原動力と成果へのアプローチ',
    type: 'standard',
    text: '目標に向けて行動を起こす時、あなたの「行動のノリ・決断の基準」に一番近いものは？',
    options: [
      {
        text: '目の前の障害を力と戦略で叩き潰し、最速で結果を出す。グダグダ言う言い訳や途中で逃げる甘えは一切許さず、圧倒的な行動力と制圧で目的を達成する。',
        reasonTag: '【SLE】1Se, 2Ti, 3Ne, 4Fi, 5Ni, 6Fe, 7Si, 8Te（力と制圧・甘え排除）',
        ieDeltas: { Se: 3.0, Ti: 2.5, Ne: 1.0, Fi: -2.0, Ni: 1.5, Fe: 1.0, Si: 0.5, Te: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Ti: 2.5 }, role: { Ne: 1.0 },
          vulnerable: { Fi: 2.0 }, suggestive: { Ni: 1.5 }, activating: { Fe: 1.0 },
          ignoring: { Si: 0.5 }, demonstrative: { Te: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_te_se_split_2'
      },
      {
        text: '誰も手をつけていない領域や新しいアイデアに果敢に挑む。フットワーク軽く動き回り、自分の直感を信じて実験と開拓を繰り返し、将来的な大成功を狙う。',
        reasonTag: '【LIE】1Te, 2Ni, 3Fe, 4Si, 5Fi, 6Se, 7Ti, 8Ne（フロンティア開拓・未来投資）',
        ieDeltas: { Te: 3.0, Ni: 2.5, Fe: 1.0, Si: -2.0, Fi: 1.5, Se: 1.0, Ti: 0.5, Ne: 2.0 },
        positionDeltas: {
          leading: { Te: 3.0 }, creative: { Ni: 2.5 }, role: { Fe: 1.0 },
          vulnerable: { Si: 2.0 }, suggestive: { Fi: 1.5 }, activating: { Se: 1.0 },
          ignoring: { Ti: 0.5 }, demonstrative: { Ne: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_te_se_split_2'
      },
      {
        text: '無駄や混乱を排除し、確実な手順と勤勉さで高品質な成果を出し続ける。自分だけでなく仲間や組織の環境・生活基盤を整え、責任を持って手厚く支える。',
        reasonTag: '【LSE】1Te, 2Si, 3Fe, 4Ni, 5Fi, 6Ne, 7Ti, 8Se（実用・環境保護・高品質運用）',
        ieDeltas: { Te: 3.0, Si: 2.5, Fe: 1.0, Ni: -2.0, Fi: 1.5, Ne: 1.0, Ti: 0.5, Se: 2.0 },
        positionDeltas: {
          leading: { Te: 3.0 }, creative: { Si: 2.5 }, role: { Fe: 1.0 },
          vulnerable: { Ni: 2.0 }, suggestive: { Fi: 1.5 }, activating: { Ne: 1.0 },
          ignoring: { Ti: 0.5 }, demonstrative: { Se: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_te_se_split_2'
      }
    ]
  },
  q_te_se_split_2: {
    id: 'q_te_se_split_2',
    categoryTag: '⏳ トラブル対処と時間・効率の捉え方',
    type: 'standard',
    text: '予期せぬ壁や遅延が発生した時、あなたの「思考と対処スタイル」に一番近いのは？',
    options: [
      {
        text: '相手の主張や状況の「論理的矛盾」をその場で突き、正論と事実のロジックで言いくるめて黙らせる。無駄な感情戦には乗らず、圧倒的な構造で完封して押し通す。',
        reasonTag: '【SLE】1Se, 2Ti, 3Ne, 4Fi, 5Ni, 6Fe, 7Si, 8Te（2Tiの論理的完封・1Seの力押し）',
        ieDeltas: { Se: 3.0, Ti: 3.0, Ne: 1.0, Fi: -2.0, Ni: 1.5, Fe: 1.0, Si: 0.5, Te: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Ti: 3.0 }, role: { Ne: 1.0 },
          vulnerable: { Fi: 2.0 }, suggestive: { Ni: 1.5 }, activating: { Fe: 1.0 },
          ignoring: { Si: 0.5 }, demonstrative: { Te: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_te_se_split_3'
      },
      {
        text: '「時間の損失（Ni）」を最も嫌う。不毛な議論や滞りには付き合わず、秒速でシステムや代替案を組んで損失を回収する。過去に執着せず、常に未来の最適解へ切り替える。',
        reasonTag: '【LIE】1Te, 2Ni, 3Fe, 4Si, 5Fi, 6Se, 7Ti, 8Ne（2Ni時間意識・秒速システム回収）',
        ieDeltas: { Te: 3.0, Ni: 3.0, Fe: 1.0, Si: -2.0, Fi: 1.5, Se: 1.0, Ti: 0.5, Ne: 2.0 },
        positionDeltas: {
          leading: { Te: 3.0 }, creative: { Ni: 3.0 }, role: { Fe: 1.0 },
          vulnerable: { Si: 2.0 }, suggestive: { Fi: 1.5 }, activating: { Se: 1.0 },
          ignoring: { Ti: 0.5 }, demonstrative: { Ne: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_te_se_split_3'
      },
      {
        text: '「ルールとマニュアル、実績の数値」を淡々と提示して正論で詰める。手順の不備や規律違反を正し、二度と不全が起きないよう物理的な運用フローを再構築する。',
        reasonTag: '【LSE】1Te, 2Si, 3Fe, 4Ni, 5Fi, 6Ne, 7Ti, 8Se（2Si運用・データとルールの遵守）',
        ieDeltas: { Te: 3.0, Si: 3.0, Fe: 1.0, Ni: -2.0, Fi: 1.5, Ne: 1.0, Ti: 0.5, Se: 2.0 },
        positionDeltas: {
          leading: { Te: 3.0 }, creative: { Si: 3.0 }, role: { Fe: 1.0 },
          vulnerable: { Ni: 2.0 }, suggestive: { Fi: 1.5 }, activating: { Ne: 1.0 },
          ignoring: { Ti: 0.5 }, demonstrative: { Se: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'q_te_se_split_3'
      }
    ]
  },
  q_te_se_split_3: {
    id: 'q_te_se_split_3',
    categoryTag: '🤝 他者への評価とサポートの姿勢',
    type: 'standard',
    text: '周囲の人間やチームのメンバーと関わる時、あなたの「スタンス」に一番近いのは？',
    options: [
      {
        text: '自ら過剰なお世話やサポートはやりたくない。相手の成果や進捗の遅さをストレートに突きつけ、自力で壁を越えさせる。力と結果を示せる者だけを信頼する。',
        reasonTag: '【SLE】1Se, 2Ti, 3Ne, 4Fi, 5Ni, 6Fe, 7Si, 8Te（4Fi脆弱・サポート拒否・成果圧殺）',
        ieDeltas: { Se: 3.0, Ti: 2.5, Ne: 1.0, Fi: -3.0, Ni: 1.5, Fe: 1.0, Si: 0.5, Te: 2.0 },
        positionDeltas: {
          leading: { Se: 3.0 }, creative: { Ti: 2.5 }, role: { Ne: 1.0 },
          vulnerable: { Fi: 3.0 }, suggestive: { Ni: 1.5 }, activating: { Fe: 1.0 },
          ignoring: { Si: 0.5 }, demonstrative: { Te: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'result'
      },
      {
        text: '情に流されず、相手の「能力とビジョンの共有」で判断する。無用な干渉はせず、各自が自分の役割を最大効率で果たすフラットかつ実利的な関係を好む。',
        reasonTag: '【LIE】1Te, 2Ni, 3Fe, 4Si, 5Fi, 6Se, 7Ti, 8Ne（4Si脆弱・実利・能力ベースの合理関係）',
        ieDeltas: { Te: 3.0, Ni: 2.5, Fe: 1.0, Si: -3.0, Fi: 1.5, Se: 1.0, Ti: 0.5, Ne: 2.0 },
        positionDeltas: {
          leading: { Te: 3.0 }, creative: { Ni: 2.5 }, role: { Fe: 1.0 },
          vulnerable: { Si: 3.0 }, suggestive: { Fi: 1.5 }, activating: { Se: 1.0 },
          ignoring: { Ti: 0.5 }, demonstrative: { Ne: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'result'
      },
      {
        text: '相手の身の回りや作業環境を整え、生活リズムや手順の乱れを徹底指導する。身内や仲間を守るための「手厚い保護と厳しい管理」を果たす。',
        reasonTag: '【LSE】1Te, 2Si, 3Fe, 4Ni, 5Fi, 6Ne, 7Ti, 8Se（4Ni脆弱・手厚い環境管理と保護）',
        ieDeltas: { Te: 3.0, Si: 2.5, Fe: 1.0, Ni: -3.0, Fi: 1.5, Ne: 1.0, Ti: 0.5, Se: 2.0 },
        positionDeltas: {
          leading: { Te: 3.0 }, creative: { Si: 2.5 }, role: { Fe: 1.0 },
          vulnerable: { Ni: 3.0 }, suggestive: { Fi: 1.5 }, activating: { Ne: 1.0 },
          ignoring: { Ti: 0.5 }, demonstrative: { Se: 2.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'result'
      }
    ]
  },
  q_darling_intercom: {
    id: "q_darling_intercom",
    categoryTag: "🥺💕 突発襲来",
    type: "game_intercom",
    text: "（ピンポーン）\nダーリンちゃん「ねぇ、ダーリン♡\n……ねぇ、一緒に住まない？」",
    options: [
      {
        text: "はい、住みます……♡",
        reasonTag: "ダーリンちゃんと一緒に住む",
        ieDeltas: { Ni: 2.0, Se: 2.0 },
        positionDeltas: {
          leading: { Ni: 2.0 },
          creative: { Ni: 2.0 },
          suggestive: { Se: 2.0 },
          activating: { Se: 2.0 },
        },
        jpDelta: { j: 0, p: 0 },
        nextId: "result",
        isDarlingEnding: true
      },
      {
        text: "110番に通報する",
        reasonTag: "常識的対応",
        ieDeltas: { },
        positionDeltas: { },
        jpDelta: { j: 0, p: 0 },
        nextId: "result",
      }
    ]
  }
};

export const DARLING_INTERCOM = {
  id: "q_darling_intercom",
  categoryTag: "🥺💕 突発襲来",
  type: "standard",
  text: "（ピンポーン）\nダーリンちゃん「ねぇ、ダーリン♡\n嘘をつく人ってどう思う？」\n\n「……ねぇ、一緒に住まない？」",
  options: [
    {
      text: "はい、住みます……♡",
      reasonTag: "ダーリンちゃんと一緒に住む",
      ieDeltas: { Ni: 2.0, Se: 2.0 },
      positionDeltas: {
        leading: { Ni: 2.0 },
        creative: { Ni: 2.0 },
        suggestive: { Se: 2.0 },
        activating: { Se: 2.0 },
      },
      jpDelta: { j: 0, p: 0 },
      nextId: "result", 
      isDarlingEnding: true
    },
    {
      text: "110番に通報する",
      reasonTag: "常識的対応",
      ieDeltas: { },
      positionDeltas: { },
      jpDelta: { j: 0, p: 0 },
      nextId: "result",
    }
  ]
};
