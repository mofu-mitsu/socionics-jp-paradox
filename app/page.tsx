'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  Download,
  Share2,
  Trash2,
  Copy,
  Check,
  Flower2,
  Droplets,
  Award,
  Layers,
  Sparkle,
  ArrowLeft,
  Gamepad2,
  Eye,
  BarChart2,
  Clock,
  RotateCcw
} from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import {
  IE,
  ModelPosition,
  SocionicsType,
  POSITION_INFO,
  MODEL_A_DEFINITIONS,
  SOCIONICS_META
} from '@/lib/socionics';

type Option = {
  text: string;
  reasonTag?: string;
  ieDeltas?: Partial<Record<IE, number>>;
  positionDeltas?: Partial<Record<ModelPosition, Partial<Record<IE, number>>>>;
  jpDelta: { j: number; p: number };
  nextId?: string;
};

type Question = {
  id: string;
  categoryTag?: string;
  type?: 'standard' | 'game_trash' | 'game_plant';
  text: string;
  options: Option[];
};

const QUESTIONS: Record<string, Question> = {
  // --- 心理設問1：状況1 (純粋な意思決定) ---
  q1: {
    id: 'q1',
    categoryTag: '🗑️ 状況1：机の上の散らかり',
    type: 'standard',
    text: '明日の予定はありません。\nでも机の上はゴミだらけ。疲れていて片付ける気力はあまりありません。\n現実のあなたなら、どう行動しますか？',
    options: [
      {
        text: 'A：面倒でも片付ける',
        reasonTag: '【状況1】A：面倒でも片付けるを選択',
        ieDeltas: { Se: 1.5, Te: 1.0 },
        positionDeltas: {
          vulnerable: { Si: 0.5 },
          creative: { Se: 1.5 },
          leading: { Te: 1.0 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q1a'
      },
      {
        text: 'B：今日は休む。明日でもいい',
        reasonTag: '【状況1】B：今日は休むを選択',
        ieDeltas: { Si: 2.0, Ni: 1.0 },
        positionDeltas: {
          leading: { Si: 1.5 },
          suggestive: { Si: 1.0 },
          creative: { Ni: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q1b'
      }
    ]
  },
  q1a: {
    id: 'q1a',
    categoryTag: '🗑️ 状況1：片付ける動機（なぜ？）',
    type: 'standard',
    text: '「面倒でも片付ける」を選びましたね。その【根本的な動機】はどれに最も近いですか？',
    options: [
      {
        text: '散らかっている不快な状態が生理的・感覚的に耐えられないから',
        reasonTag: '動機: 感覚的不快の解消（Si知覚→Se行動）',
        ieDeltas: { Si: 2.0, Se: 1.5 },
        positionDeltas: {
          demonstrative: { Si: 2.0 },
          activating: { Si: 1.5 },
          creative: { Se: 1.5 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q_game_trash'
      },
      {
        text: 'やるべきタスクを放置しておくと、後でもっと面倒・非効率になるから',
        reasonTag: '動機: 将来の非効率とリスク回避（Te/Ni）',
        ieDeltas: { Te: 2.5, Ni: 1.5 },
        positionDeltas: {
          leading: { Te: 2.0 },
          creative: { Ni: 1.5 },
          demonstrative: { Te: 1.5 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q_game_trash'
      },
      {
        text: '自分の生活空間を自分の意志で即座にコントロール・支配しておきたいから',
        reasonTag: '動機: 意志力による環境の即時制御（Se）',
        ieDeltas: { Se: 2.5, Ti: 1.0 },
        positionDeltas: {
          leading: { Se: 2.5 },
          creative: { Se: 1.5 },
          activating: { Se: 1.0 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q_game_trash'
      },
      {
        text: '自分の決めたルールや秩序・日課を破るのが気持ち悪いから',
        reasonTag: '動機: 日課・構造ルールの維持（Ti）',
        ieDeltas: { Ti: 2.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 2.0 },
          role: { Ti: 1.5 },
          demonstrative: { Ti: 1.0 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q_game_trash'
      }
    ]
  },
  q1b: {
    id: 'q1b',
    categoryTag: '🗑️ 状況1：休む動機（なぜ？）',
    type: 'standard',
    text: '「今日は休む」を選びましたね。その【根本的な動機】はどれに最も近いですか？',
    options: [
      {
        text: '自分の身体感覚・体力の回復を優先するのが最も自然だから',
        reasonTag: '動機: 身体感覚の回復優先（Si主導/暗示）',
        ieDeltas: { Si: 2.5, Fe: 0.5 },
        positionDeltas: {
          leading: { Si: 2.5 },
          suggestive: { Si: 2.0 },
          activating: { Si: 1.5 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q_game_trash'
      },
      {
        text: 'どうせまた散らかる。今わざわざ疲労を押してやる合理的な価値がないから',
        reasonTag: '動機: 長期的帰結の見据えと無駄のカット（Ni/Te）',
        ieDeltas: { Ni: 2.5, Te: 1.5 },
        positionDeltas: {
          leading: { Ni: 2.0 },
          creative: { Te: 1.5 },
          ignoring: { Ne: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q_game_trash'
      },
      {
        text: '明日困るわけではない。気分や状況の自然な流れに合わせて動けばいいから',
        reasonTag: '動機: 柔軟な自然流動への追従（Ne/Fi）',
        ieDeltas: { Ne: 2.0, Fi: 1.0 },
        positionDeltas: {
          creative: { Ne: 2.0 },
          suggestive: { Ne: 1.5 }
        },
        jpDelta: { j: 0, p: 1.0 },
        nextId: 'q_game_trash'
      },
      {
        text: '今やっても特別な見返りや得るもの（メリット）がないから',
        reasonTag: '動機: コストパフォーマンスと利得（Te）',
        ieDeltas: { Te: 2.0, Ni: 1.0 },
        positionDeltas: {
          creative: { Te: 1.5 },
          ignoring: { Ti: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q_game_trash'
      }
    ]
  },

  // --- 独立設問2：片付けミニゲーム (操作ギミック) ---
  q_game_trash: {
    id: 'q_game_trash',
    categoryTag: '🎮 独立設問：片付け操作ギミック',
    type: 'game_trash',
    text: '画面上の机にゴミが散らかっています。\n直感でゴミを何個かタップして片付けてみましょう！（※心理回答とは別の独立操作データです）',
    options: [
      {
        text: '片付け操作を完了して次へ進む',
        reasonTag: '【ギミック操作完了】片付けギミックの試行',
        ieDeltas: { Se: 0.3 },
        positionDeltas: {},
        jpDelta: { j: 0, p: 0 },
        nextId: 'q2'
      }
    ]
  },

  // --- 心理設問3：状況2 (溜まった食器) ---
  q2: {
    id: 'q2',
    categoryTag: '🍽️ 状況2：溜まった食器',
    type: 'standard',
    text: '食事が終わりました。食器を洗うのはちょっと面倒。\nただ、シンクにはすでに食器が溜まっています。どうしますか？',
    options: [
      {
        text: '今のうちにすぐ洗う',
        reasonTag: '【状況2】今のうちにすぐ洗うを選択',
        ieDeltas: { Te: 1.5, Se: 1.0 },
        positionDeltas: {
          leading: { Te: 1.5 },
          role: { Se: 1.0 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q2a'
      },
      {
        text: 'あとでいい。今はゆっくりする',
        reasonTag: '【状況2】あとでいいを選択',
        ieDeltas: { Si: 2.0, Ni: 1.5 },
        positionDeltas: {
          leading: { Si: 1.5 },
          vulnerable: { Te: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q_game_plant'
      }
    ]
  },
  q2a: {
    id: 'q2a',
    categoryTag: '🍽️ 状況2：洗う動機（なぜ？）',
    type: 'standard',
    text: '「今のうちにすぐ洗う」を選んだ主な理由は何ですか？',
    options: [
      {
        text: '溜まった汚れの匂いや見た目の不快感が我慢できないから',
        reasonTag: '理由: 感覚的不快の解消（Si）',
        ieDeltas: { Si: 2.0, Fi: 1.0 },
        positionDeltas: { demonstrative: { Si: 1.5 }, activating: { Si: 1.5 } },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q_game_plant'
      },
      {
        text: '次に料理・作業する時の効率を落としたくないから',
        reasonTag: '理由: 次の作業効率維持（Te）',
        ieDeltas: { Te: 2.5, Ni: 1.0 },
        positionDeltas: { leading: { Te: 2.0 }, creative: { Ni: 1.0 } },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q_game_plant'
      },
      {
        text: 'あとで洗わないといけないから、先に洗ってリラックスしたい',
        reasonTag: '理由: 先払いの義務完了による精神的リラックス（Te/Si）',
        ieDeltas: { Te: 2.0, Si: 1.5 },
        positionDeltas: { leading: { Te: 1.5 }, suggestive: { Si: 1.5 } },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q_game_plant'
      },
      {
        text: '洗わないと汚れが落ちにくくなるかもしれないから',
        reasonTag: '理由: 時間経過による状態悪化リスクの防止（Ni/Te）',
        ieDeltas: { Ni: 2.0, Te: 1.5 },
        positionDeltas: { leading: { Ni: 1.5 }, creative: { Te: 1.5 } },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q_game_plant'
      }
    ]
  },

  // --- 独立設問4：Ni未来予測ミニゲーム (植物の未来観察) ---
  q_game_plant: {
    id: 'q_game_plant',
    categoryTag: '🔮 独立設問：未来観察ギミック',
    type: 'game_plant',
    text: '🌱 小さな鉢植えがあります。「最近、葉っぱが少しずつ黄色くなっている…」\n時間を進めて、未来の流れを観察してみましょう。',
    options: [
      {
        text: '未来の観察を完了して、深掘り質問へ進む',
        reasonTag: '【ギミック操作完了】植物の未来観察試行',
        ieDeltas: { Ni: 0.3 },
        positionDeltas: {},
        jpDelta: { j: 0, p: 0 },
        nextId: 'q_ni_deep'
      }
    ]
  },

  // --- 心理設問5：未来観察後の介入姿勢深掘り ---
  q_ni_deep: {
    id: 'q_ni_deep',
    categoryTag: '🔮 未来への介入姿勢（なぜ？）',
    type: 'standard',
    text: '「時間の経過とともに問題が悪化しそうだ」という未来の流れが見えたとき、あなたはどう反応しますか？',
    options: [
      {
        text: '「このままだと問題になる」と分かったので、今のうちに速やかに現在へ介入・対処する',
        reasonTag: '反応: 未来予測からの現在への構造・行動介入（LII/LIE/EIE型：Ni証明/補助＋現在構造制御）',
        ieDeltas: { Ni: 2.0, Te: 1.5, Ti: 1.5 },
        positionDeltas: {
          demonstrative: { Ni: 2.0 },
          leading: { Ti: 1.5, Te: 1.5 },
          creative: { Ne: 1.0 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q3'
      },
      {
        text: '「そういう流れ・結末になるだろう」と分かったが、そのまま様子や展開を見守る',
        reasonTag: '反応: 時間的流動の受容と非介入（ILI/IEI型：Ni主導＋非介入流動）',
        ieDeltas: { Ni: 3.0, Se: 0.5 },
        positionDeltas: {
          leading: { Ni: 2.5 },
          vulnerable: { Se: 1.5 },
          suggestive: { Se: 1.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'q3'
      },
      {
        text: 'もっと別の可能性や情報がないか、さらに観察・検討してから判断する',
        reasonTag: '反応: 可能性のさらなる探求（Ne/Ti）',
        ieDeltas: { Ne: 2.5, Ti: 1.5 },
        positionDeltas: {
          leading: { Ne: 2.0 },
          creative: { Ti: 1.5 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q3'
      },
      {
        text: 'そもそも遠い未来の心配よりも、今この瞬間の感覚や状況に対応する',
        reasonTag: '反応: 現在感覚・現場主導（Si/Se）',
        ieDeltas: { Si: 2.0, Se: 1.5 },
        positionDeltas: {
          leading: { Si: 2.0 },
          creative: { Se: 1.5 }
        },
        jpDelta: { j: 0, p: 1.0 },
        nextId: 'q3'
      }
    ]
  },

  // --- 心理設問6：部屋の散らかり ---
  q3: {
    id: 'q3',
    categoryTag: '🛏️ 状況3：部屋の散らかり',
    type: 'standard',
    text: '明日誰かが来るわけではありません。\nでも部屋の床に服や荷物が散らばっています。どうしますか？',
    options: [
      {
        text: '気になって落ち着かないので片付ける',
        reasonTag: '【状況3】気になって落ち着かないので片付けるを選択',
        ieDeltas: { Fi: 1.5, Se: 1.0, Si: 1.0 },
        positionDeltas: {
          leading: { Fi: 1.5 },
          role: { Ti: 1.0 },
          demonstrative: { Si: 1.0 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q4'
      },
      {
        text: '生活できるなら気にならない。放置する',
        reasonTag: '【状況3】生活できるなら放置を選択',
        ieDeltas: { Ni: 2.0, Ne: 1.5 },
        positionDeltas: {
          leading: { Ni: 1.5 },
          vulnerable: { Se: 1.5 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q4'
      }
    ]
  },

  // --- 心理設問7：服装選択 ---
  q4: {
    id: 'q4',
    categoryTag: '👔 服装選択',
    type: 'standard',
    text: '明日、私服自由の場所に行く予定があります。\nどちらの服を選んで着ていきますか？',
    options: [
      {
        text: '少し動きにくくても、外見の印象・魅力・存在感を高める服',
        reasonTag: '【服装】外見の魅力と印象優先',
        ieDeltas: { Se: 2.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Se: 2.0, Fe: 1.5 },
          creative: { Fi: 1.0 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q5'
      },
      {
        text: '見た目はシンプルだが、非常に着心地がよく体と感覚が楽な服',
        reasonTag: '【服装】身体的快適さ優先',
        ieDeltas: { Si: 2.5, Ti: 1.0 },
        positionDeltas: {
          leading: { Si: 2.5 },
          demonstrative: { Si: 1.5 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q5'
      }
    ]
  },

  // --- 心理設問8：理論の誤解への反応 ---
  q5: {
    id: 'q5',
    categoryTag: '💡 理論誤解への反応',
    type: 'standard',
    text: '「SEIとISFJはどちらもSiだからほぼ同じだ」という浅い理論的誤解を見かけました。あなたならどう反応しますか？',
    options: [
      {
        text: '構造的な矛盾が許せない。正しい定義と論理体系の違いを明確に説明したくなる',
        reasonTag: '【理論誤解】正しい論理体系と構造の解説欲求（Ti/Ne）',
        ieDeltas: { Ti: 3.0, Ne: 1.5 },
        positionDeltas: {
          leading: { Ti: 2.5 },
          creative: { Ne: 1.5 },
          demonstrative: { Ti: 2.0 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q6'
      },
      {
        text: '好きに誤解していればいい。無知な者が将来的に勝手に困るだけだと静観する',
        reasonTag: '【理論誤解】将来帰結を見越して放置（Ni/Te）',
        ieDeltas: { Ni: 2.5, Te: 1.5 },
        positionDeltas: {
          leading: { Ni: 2.5 },
          creative: { Te: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q6'
      },
      {
        text: '誤解が広まることで当事者の人々が正しく理解されず可哀想だと感じる',
        reasonTag: '【理論誤解】人々の感情と関係への懸念（Fi/Fe）',
        ieDeltas: { Fi: 2.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Fi: 2.0, Fe: 1.5 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q6'
      }
    ]
  },

  // --- 心理設問9：締め切りと着手 ---
  q6: {
    id: 'q6',
    categoryTag: '⏳ 締め切りと着手',
    type: 'standard',
    text: '明日までに完了すべき重要な課題があります。まだ時間は十分にあります。',
    options: [
      {
        text: '今のうちに即座に終わらせておきたい',
        reasonTag: '【課題】今のうちに即座に完了',
        ieDeltas: { Te: 2.0, Se: 1.0 },
        positionDeltas: {
          leading: { Te: 2.0 },
          role: { Se: 1.0 }
        },
        jpDelta: { j: 2.0, p: 0 },
        nextId: 'result'
      },
      {
        text: 'まだ余裕はある。今すぐ着手せず最適なタイミングまで待つ',
        reasonTag: '【課題】最適なタイミングまで待つ',
        ieDeltas: { Ni: 2.0, Ne: 1.0 },
        positionDeltas: {
          leading: { Ni: 2.0 },
          vulnerable: { Te: 1.0 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'result'
      }
    ]
  }
};

const POSITIONS_ARRAY: ModelPosition[] = [
  'leading',
  'creative',
  'role',
  'vulnerable',
  'suggestive',
  'activating',
  'ignoring',
  'demonstrative'
];

export default function App() {
  const [step, setStep] = useState<'title' | 'mbti_input' | 'quiz' | 'result'>('title');
  const [rawMbtiInput, setRawMbtiInput] = useState('');
  const [detectedMbti, setDetectedMbti] = useState<string | null>(null);

  // 芋虫ぷにっとリアクション状態
  const [caterpillarReaction, setCaterpillarReaction] = useState(false);

  // 片付けギミック状態 (Q_game_trash 専用)
  const [trashItems, setTrashItems] = useState([
    { id: 1, icon: '📄', label: '古い資料', x: 20, y: 35 },
    { id: 2, icon: '🥫', label: '空き缶', x: 75, y: 25 },
    { id: 3, icon: '🍟', label: '食べカス', x: 45, y: 65 },
    { id: 4, icon: '📝', label: 'メモ用紙', x: 80, y: 70 },
    { id: 5, icon: '🧃', label: '紙パック', x: 18, y: 70 }
  ]);
  const [cleanedCount, setCleanedCount] = useState(0);

  // Ni未来ギミック状態 (Q_game_plant 専用)
  const [plantStage, setPlantStage] = useState<0 | 1 | 2>(0); // 0: 現在, 1: 3日後, 2: 1週間後

  // 行動ログ履歴
  const [actionLogs, setActionLogs] = useState<string[]>([]);

  // 質問履歴スタック (戻る機能用)
  const [history, setHistory] = useState<Array<{
    qId: string;
    ieScores: Record<IE, number>;
    posSignatures: Record<ModelPosition, Record<IE, number>>;
    jp: { j: number; p: number };
    logs: string[];
  }>>([]);

  const [currentQId, setCurrentQId] = useState('q1');

  // IE（情報要素）ごとの積み上げスコア
  const [ieScores, setIeScores] = useState<Record<IE, number>>({
    Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0
  });

  // 8ポジションごとに各情報要素の適合度を集計する行列
  const createEmptyPositionSignatures = (): Record<ModelPosition, Record<IE, number>> => ({
    leading: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    creative: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    role: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    vulnerable: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    suggestive: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    activating: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    ignoring: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
    demonstrative: { Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 },
  });

  const [posSignatures, setPosSignatures] = useState<Record<ModelPosition, Record<IE, number>>>(createEmptyPositionSignatures());
  const [jpScore, setJpScore] = useState({ j: 0, p: 0 });

  // 画像保存Ref
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // MBTI抽出
  const handleMbtiSubmit = () => {
    const match = rawMbtiInput.match(/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP)/i);
    if (match) {
      setDetectedMbti(match[1].toUpperCase());
    } else {
      setDetectedMbti(null);
    }
    setStep('quiz');
  };

  // 芋虫タップ
  const handleCaterpillarClick = () => {
    setCaterpillarReaction(true);
    setTimeout(() => setCaterpillarReaction(false), 1200);
  };

  // Q_game_trash 片付けギミックタップ
  const handleCleanTrash = (id: number) => {
    setTrashItems(prev => prev.filter(item => item.id !== id));
    setCleanedCount(prev => prev + 1);
  };

  // 通常設問の選択肢ハンドリング
  const handleSelectOption = (option: Option) => {
    const newLogs = option.reasonTag ? [...actionLogs, option.reasonTag] : actionLogs;

    // 履歴保存
    setHistory(prev => [
      ...prev,
      {
        qId: currentQId,
        ieScores: { ...ieScores },
        posSignatures: JSON.parse(JSON.stringify(posSignatures)),
        jp: { ...jpScore },
        logs: [...actionLogs]
      }
    ]);

    setActionLogs(newLogs);

    // 1. IEスコアの加算
    if (option.ieDeltas) {
      setIeScores(prev => {
        const next = { ...prev };
        Object.entries(option.ieDeltas!).forEach(([ieKey, val]) => {
          const ie = ieKey as IE;
          next[ie] = (next[ie] || 0) + (val || 0);
        });
        return next;
      });
    }

    // 2. ポジションシグネチャの加算
    if (option.positionDeltas) {
      setPosSignatures(prev => {
        const next = JSON.parse(JSON.stringify(prev));
        Object.entries(option.positionDeltas!).forEach(([posKey, ieDeltas]) => {
          const pos = posKey as ModelPosition;
          if (ieDeltas) {
            Object.entries(ieDeltas).forEach(([ieKey, delta]) => {
              const ie = ieKey as IE;
              next[pos][ie] = (next[pos][ie] || 0) + (delta || 0);
            });
          }
        });
        return next;
      });
    }

    setJpScore(prev => ({
      j: prev.j + option.jpDelta.j,
      p: prev.p + option.jpDelta.p
    }));

    if (option.nextId && option.nextId !== 'result') {
      setCurrentQId(option.nextId);
    } else {
      triggerConfetti();
      setStep('result');
    }
  };

  // スキップ
  const handleSkipQuestion = () => {
    setHistory(prev => [
      ...prev,
      {
        qId: currentQId,
        ieScores: { ...ieScores },
        posSignatures: JSON.parse(JSON.stringify(posSignatures)),
        jp: { ...jpScore },
        logs: [...actionLogs]
      }
    ]);

    const q = QUESTIONS[currentQId];
    const nextId = q?.options[0]?.nextId || 'result';
    if (nextId === 'result') {
      triggerConfetti();
      setStep('result');
    } else {
      setCurrentQId(nextId);
    }
  };

  // 戻るボタンのハンドリング
  const handleGoBack = () => {
    if (history.length === 0) {
      setStep('mbti_input');
      return;
    }
    const last = history[history.length - 1];
    setHistory(prev => prev.slice(0, prev.length - 1));
    setCurrentQId(last.qId);
    setIeScores(last.ieScores);
    setPosSignatures(last.posSignatures);
    setJpScore(last.jp);
    setActionLogs(last.logs);
  };

  // 紙吹雪
  const triggerConfetti = () => {
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
  };

  // 画像保存
  const handleDownloadImage = async () => {
    if (!resultCardRef.current || isExporting) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(resultCardRef.current, {
        cacheBust: true,
        backgroundColor: '#0f172a'
      });
      const link = document.createElement('a');
      link.download = `socio_modelA_result_${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image:', err);
      alert('画像保存に失敗しました。スクリーンショットをご利用ください。');
    } finally {
      setIsExporting(false);
    }
  };

  // シェア
  const handleShare = () => {
    const topMatch = calculatedMatches[0];
    const text = `【ソシオJ/Pねじれ診断結果】\n最も近いソシオニクスModel A構造: ${topMatch?.type || 'LII'} (${topMatch?.score.toFixed(1)}%適合)\nJ/P傾向: P ${pPercent}% / J ${100 - pPercent}%\n#ソシオJPねじれ診断`;
    if (navigator.share) {
      navigator.share({ title: 'ソシオJ/Pねじれ診断', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      alert('診断結果をクリップボードにコピーしました！');
    }
  };

  // 16タイプのModel A 構造との適合度計算アルゴリズム
  const calculateTypeMatches = (): Array<{ type: SocionicsType; score: number }> => {
    const results: Array<{ type: SocionicsType; score: number }> = [];

    (Object.keys(MODEL_A_DEFINITIONS) as SocionicsType[]).forEach(tKey => {
      const def = MODEL_A_DEFINITIONS[tKey];
      let fitScore = 0;

      POSITIONS_ARRAY.forEach(pos => {
        const targetIE = def[pos];
        const iePoints = ieScores[targetIE] || 0;
        const posSigPoints = posSignatures[pos]?.[targetIE] || 0;

        let weight = 1.0;
        if (pos === 'leading') weight = 2.5;
        else if (pos === 'creative') weight = 2.0;
        else if (pos === 'vulnerable') weight = 1.8;
        else if (pos === 'demonstrative') weight = 1.5;

        fitScore += (iePoints * 1.2 + posSigPoints * 2.5) * weight;
      });

      results.push({ type: tKey, score: fitScore });
    });

    const maxMatch = Math.max(...results.map(r => r.score), 1);
    return results
      .map(r => ({
        type: r.type,
        score: Math.min(99.9, Math.max(25.0, Math.round((r.score / maxMatch) * 98 * 10) / 10))
      }))
      .sort((a, b) => b.score - a.score);
  };

  const calculatedMatches = calculateTypeMatches();
  const topMatched = calculatedMatches[0] || { type: 'LII', score: 95.0 };
  const topMeta = SOCIONICS_META[topMatched.type];

  // J/Pパーセンテージ計算
  const totalJp = jpScore.j + jpScore.p;
  const pPercent = totalJp > 0 ? Math.round((jpScore.p / totalJp) * 100) : 50;

  // 煽り判定
  const isJInferred = detectedMbti ? detectedMbti.endsWith('J') : false;
  const isIrrationalType = ['ILI', 'IEI', 'SEI', 'SLE', 'SEE', 'SLI', 'ILE', 'IEE'].includes(topMatched.type);
  const shouldShowTease = isJInferred && (isIrrationalType || pPercent >= 45);

  const currentQ = QUESTIONS[currentQId];

  // 8ポジションそれぞれにおける8情報要素（IE）の順位ランキング生成
  const getPositionRankings = (pos: ModelPosition) => {
    const rawPosData = posSignatures[pos] || {};
    return (['Ti', 'Te', 'Ni', 'Ne', 'Si', 'Se', 'Fi', 'Fe'] as IE[])
      .map(ie => ({
        ie,
        score: (rawPosData[ie] || 0) + (ieScores[ie] || 0) * 0.4
      }))
      .sort((a, b) => b.score - a.score);
  };

  return (
    <div className="min-h-screen bg-watercolor-dream text-slate-100 font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-pink-500 selection:text-white">
      
      {/* 水彩風ぼかしグラデーション背景 */}
      <div className="fixed inset-0 watercolor-blobs z-0"></div>

      {/* 舞い散る花びら */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${(i * 8.5) % 96}%`,
              width: `${14 + (i % 3) * 6}px`,
              height: `${22 + (i % 3) * 8}px`,
              animationDelay: `${i * 1.1}s`,
              animationDuration: `${10 + (i % 4) * 2.5}s`
            }}
          />
        ))}
      </div>

      {/* 🐛 復活！ 画面上の可愛い芋虫マスコット */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleCaterpillarClick}
          className="caterpillar-anim bg-slate-900/90 hover:bg-pink-950/90 border border-pink-400/40 p-2.5 rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-110 active:scale-95 backdrop-blur-md"
        >
          <span className="text-2xl">🐛</span>
          <span className="text-[11px] font-bold text-pink-300">
            {caterpillarReaction ? 'ぷにっ🐛✨' : '芋虫ちゃん'}
          </span>
        </button>
      </div>

      {/* ヘッダー */}
      <header className="relative z-10 w-full max-w-4xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Flower2 className="w-6 h-6 text-pink-300 animate-spin" style={{ animationDuration: '16s' }} />
          <span className="font-serif font-bold tracking-wider text-base md:text-lg text-slate-100">
            ソシオJ/Pねじれ診断
          </span>
        </div>

        {step === 'quiz' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleGoBack}
              className="px-3.5 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-100 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all border border-pink-400/50 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-pink-300" />
              前の一問に戻る
            </button>

            <button
              onClick={handleSkipQuestion}
              className="px-3 py-1.5 bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 rounded-full text-xs flex items-center gap-1 transition-colors border border-slate-600/40"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>スキップ</span>
            </button>
          </div>
        )}
      </header>

      {/* メインコンテンツ */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4">
        <AnimatePresence mode="wait">

          {/* STEP 1: タイトル画面 */}
          {step === 'title' && (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center max-w-xl mx-auto px-4"
            >
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-pink-400/40 text-pink-200 text-xs font-semibold tracking-widest uppercase shadow-md backdrop-blur-md">
                <Droplets className="w-4 h-4 text-sky-300" />
                Model A 8-Position Deep Matrix
              </div>

              {/* 明朝体タイトル */}
              <h1 className="font-serif text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                ソシオJ/P<br />
                <span className="text-watercolor-gradient">
                  ねじれ診断
                </span>
              </h1>

              <p className="text-slate-200 mb-8 text-base md:text-lg leading-relaxed font-normal bg-slate-900/70 p-5 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg">
                あなたの「J」は、どこから来た？<br />
                単なる機能ランキングではなく、<span className="font-bold text-sky-300 underline">Model A 8つのポジションごとの機能配置</span>を解析し、MBTIとソシオニクスの構造的ねじれを完全解明します。
              </p>

              <button
                onClick={() => setStep('mbti_input')}
                className="group relative inline-flex items-center justify-center px-9 py-4 text-lg font-bold text-slate-950 transition-all duration-300 bg-gradient-to-r from-sky-300 via-pink-300 to-purple-300 rounded-full shadow-lg shadow-pink-900/40 hover:shadow-pink-400/50 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>診断を始める</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: 自認MBTI入力画面 */}
          {step === 'mbti_input' && (
            <motion.div
              key="mbti_input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-lg glass-card p-6 md:p-9 rounded-3xl border border-pink-500/30 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-pink-300" />
                <h2 className="font-serif text-xl md:text-2xl font-bold text-white">
                  あなたの自認タイプを教えてね
                </h2>
              </div>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                自認を入力すると、診断結果で Model A ポジション配置との「J/Pねじれ」や構造的ギャップを解説します♡
              </p>

              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  value={rawMbtiInput}
                  onChange={e => setRawMbtiInput(e.target.value)}
                  placeholder="例: INTJ, INTP, 私はINFJかな など"
                  className="w-full bg-slate-950/80 border border-slate-600 rounded-2xl p-4 text-white placeholder-slate-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30 text-base"
                />
                {rawMbtiInput.trim() && (
                  <p className="text-xs text-sky-300 flex items-center gap-1.5 font-medium">
                    <Check className="w-4 h-4 text-sky-400" />
                    抽出されたタイプ: <span className="font-bold underline text-white">{rawMbtiInput.match(/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP)/i)?.[1]?.toUpperCase() || '特定中（未検出）'}</span>
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setStep('title')}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  タイトルへ戻る
                </button>
                <button
                  onClick={handleMbtiSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-sky-300 to-pink-300 hover:from-sky-200 hover:to-pink-200 text-slate-950 font-bold text-sm rounded-full shadow-lg transition-all cursor-pointer"
                >
                  質問へ進む
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: 質問・ミニゲーム設問画面 */}
          {step === 'quiz' && (
            <motion.div
              key={currentQId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-2xl"
            >
              <div className="glass-card p-6 md:p-9 rounded-3xl border border-pink-500/30 shadow-2xl relative overflow-hidden">

                {/* 🎮 独立設問：片付けミニゲーム画面 (Q_game_trash) */}
                {currentQ?.type === 'game_trash' ? (
                  <div>
                    <div className="inline-block px-3.5 py-1 rounded-full bg-slate-900 border border-pink-400/40 text-pink-300 text-xs font-bold mb-4">
                      {currentQ.categoryTag}
                    </div>

                    <p className="font-serif text-lg md:text-xl font-medium leading-relaxed mb-4 text-slate-100 whitespace-pre-wrap">
                      {currentQ.text}
                    </p>

                    {/* 片付けゲームステージ */}
                    <div className="relative w-full h-56 bg-slate-950/90 rounded-2xl border border-pink-500/30 mb-6 p-4 overflow-hidden shadow-inner">
                      <div className="absolute top-2.5 left-3 text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                        <Gamepad2 className="w-4 h-4 text-pink-400" />
                        【操作ギミック】ゴミをタップして片付けてみよう！
                      </div>

                      <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-pink-400/30 p-2 rounded-xl flex items-center gap-2 text-xs text-slate-200 shadow-md">
                        <Trash2 className="w-4 h-4 text-pink-400" />
                        <span>片付け数: <strong className="text-pink-300 font-bold">{cleanedCount}</strong> / 5</span>
                      </div>

                      {trashItems.map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleCleanTrash(item.id)}
                          style={{ top: `${item.y}%`, left: `${item.x}%` }}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 hover:bg-pink-500/40 p-2.5 rounded-2xl border border-white/20 transition-all hover:scale-110 active:scale-95 flex items-center gap-1.5 shadow-md group cursor-pointer"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-[10px] text-slate-200 font-medium group-hover:text-white">{item.label}</span>
                        </button>
                      ))}

                      {trashItems.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 rounded-2xl text-pink-300 font-bold text-sm">
                          ✨ ピカピカに片付きました！（試行完了）
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleSelectOption(currentQ.options[0])}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-pink-400 text-slate-950 font-bold text-base shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      操作完了！ 次の心理質問へ進む
                    </button>
                  </div>
                ) : currentQ?.type === 'game_plant' ? (
                  /* 🔮 独立設問：Ni未来予測ミニゲーム画面 (Q_game_plant) */
                  <div>
                    <div className="inline-block px-3.5 py-1 rounded-full bg-slate-900 border border-sky-400/40 text-sky-300 text-xs font-bold mb-4">
                      {currentQ.categoryTag}
                    </div>

                    <p className="font-serif text-lg md:text-xl font-medium leading-relaxed mb-4 text-slate-100 whitespace-pre-wrap">
                      {currentQ.text}
                    </p>

                    {/* 未来観察ステージ */}
                    <div className="relative w-full p-6 bg-slate-950/90 rounded-2xl border border-sky-500/30 mb-6 text-center shadow-inner">
                      <div className="text-6xl mb-3 transition-transform duration-500 scale-110">
                        {plantStage === 0 ? '🌱' : plantStage === 1 ? '🍂' : '🥀'}
                      </div>

                      <div className="text-sm font-bold text-sky-200 mb-1">
                        {plantStage === 0 ? '【現在】葉が少し黄色くなっている' : plantStage === 1 ? '【3日後】葉がさらに黄変し落葉が始まった' : '【1週間後】ほぼ全ての葉が落ちて枯れてしまった'}
                      </div>
                      <p className="text-xs text-slate-400 mb-5">
                        時間の経過にともなう展開・帰結の観察ギミックです。
                      </p>

                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setPlantStage(0)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${plantStage === 0 ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                        >
                          現在
                        </button>
                        <button
                          onClick={() => setPlantStage(1)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${plantStage === 1 ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                        >
                          ▶ 3日後を見る
                        </button>
                        <button
                          onClick={() => setPlantStage(2)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${plantStage === 2 ? 'bg-sky-500 text-slate-950 border-sky-300' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                        >
                          ▶ 1週間後を見る
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectOption(currentQ.options[0])}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-pink-400 text-slate-950 font-bold text-base shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      観察完了！ 深掘り質問へ進む
                    </button>
                  </div>
                ) : currentQ ? (
                  /* 標準の心理質問 */
                  <div>
                    {currentQ.categoryTag && (
                      <div className="inline-block px-3.5 py-1 rounded-full bg-slate-900 border border-pink-400/40 text-pink-300 text-xs font-bold mb-4">
                        {currentQ.categoryTag}
                      </div>
                    )}

                    <p className="font-serif text-lg md:text-xl font-medium leading-relaxed mb-8 text-slate-100 whitespace-pre-wrap">
                      {currentQ.text}
                    </p>

                    <div className="space-y-3.5">
                      {currentQ.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(opt)}
                          className="w-full text-left p-5 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/90 hover:border-pink-400 transition-all flex items-center justify-between group shadow-md cursor-pointer"
                        >
                          <span className="text-sm md:text-base text-slate-100 leading-relaxed font-normal">{opt.text}</span>
                          <Sparkles className="w-5 h-5 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}

          {/* STEP 4: 診断結果画面 */}
          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl space-y-6 my-6"
            >
              {/* 画像保存対象コンテナ */}
              <div
                ref={resultCardRef}
                style={{ backgroundColor: '#0f172a' }}
                className="p-6 md:p-8 rounded-3xl border border-pink-500/40 shadow-2xl relative overflow-hidden"
              >
                {/* ダーリンちゃん 🥺 からのメッセージ */}
                <div className="flex items-start gap-3.5 mb-6">
                  <div className="w-11 h-11 rounded-full bg-pink-600 flex items-center justify-center shrink-0 shadow-lg text-lg">
                    🥺
                  </div>
                  <div className="bg-slate-800/90 p-4 rounded-2xl rounded-tl-none border border-slate-700 flex-1">
                    <p className="text-xs text-pink-300 font-bold mb-1">🥺 ダーリンちゃん</p>
                    <p className="text-slate-100 text-sm leading-relaxed">
                      ねぇ、ダーリン♡ 診断おつかれさま。<br />
                      {detectedMbti ? (
                        <>あなたは自認を『<span className="font-bold text-sky-300">{detectedMbti}</span>』にしてたね♡</>
                      ) : (
                        <>自認タイプは未入力だったね♡</>
                      )}
                      <br />
                      Model A 8つのポジション配置構造を解析した結果、最も適合したのは『<span className="font-bold text-pink-300 underline">{topMeta.name}</span>』だったよ♡
                    </p>
                  </div>
                </div>

                {/* 🥇 一番上：各Model A構造への適合度を示す「棒グラフ」 */}
                <div className="bg-slate-950/90 rounded-2xl p-6 border border-pink-500/40 mb-6 shadow-inner">
                  <div className="flex items-center gap-2 text-xs text-pink-300 font-bold tracking-widest uppercase mb-3">
                    <BarChart2 className="w-4 h-4 text-pink-400" />
                    Model A 適合度 棒グラフランキング
                  </div>

                  <div className="space-y-3 mb-6">
                    {calculatedMatches.slice(0, 5).map((m, idx) => {
                      const meta = SOCIONICS_META[m.type];
                      return (
                        <div key={m.type} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-slate-200">
                              {idx + 1}. {m.type} ({meta.title})
                            </span>
                            <span className="text-pink-300 font-mono">{m.score.toFixed(1)}%</span>
                          </div>
                          <div className="h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                            <div
                              style={{ width: `${m.score}%` }}
                              className={`h-full transition-all duration-700 ${idx === 0 ? 'bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400' : 'bg-slate-700'}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-slate-900/90 rounded-xl border border-pink-500/30">
                    <p className="text-xs text-pink-300 font-bold mb-1">最有力ソシオタイプ: {topMeta.name}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{topMeta.desc}</p>
                  </div>
                </div>

                {/* 🧩 みつき理想！ Model A 8つのポジションごとの機能ランキング表示 */}
                <div className="bg-slate-900/90 rounded-2xl p-5 mb-6 border border-sky-400/40">
                  <h3 className="text-xs text-sky-300 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-sky-400" />
                    🧩 Model A 8ポジション別 心理機能順位
                  </h3>
                  
                  <div className="space-y-3.5">
                    {POSITIONS_ARRAY.map(pos => {
                      const posInfo = POSITION_INFO[pos];
                      const rankedList = getPositionRankings(pos);

                      return (
                        <div key={pos} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-pink-300">
                              {posInfo.nameJa} ({pos})
                            </span>
                            <span className="text-[10px] text-slate-400 truncate max-w-[180px]">
                              {posInfo.desc}
                            </span>
                          </div>

                          {/* 各ポジションにおける機能順位（＞つなぎ表示） */}
                          <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono font-bold mt-1.5">
                            {rankedList.map((item, idx) => (
                              <React.Fragment key={item.ie}>
                                <span className={`px-1.5 py-0.5 rounded ${idx === 0 ? 'bg-pink-500/30 text-pink-300 border border-pink-500/50' : idx <= 2 ? 'bg-sky-500/20 text-sky-200' : 'bg-slate-900 text-slate-400'}`}>
                                  {item.ie}
                                </span>
                                {idx < rankedList.length - 1 && (
                                  <span className="text-slate-600 font-bold">＞</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* MBTI J/P 傾向バー */}
                <div className="bg-slate-900/80 rounded-2xl p-5 mb-6 border border-slate-700">
                  <h3 className="text-xs text-pink-300 font-bold uppercase tracking-wider mb-3 flex items-center justify-between">
                    <span>意思決定の柔軟性（J/P 傾向）</span>
                    <span className="text-[10px] text-slate-300">P: {pPercent}% / J: {100 - pPercent}%</span>
                  </h3>
                  <div className="h-3.5 bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                    <div style={{ width: `${100 - pPercent}%` }} className="bg-indigo-500 h-full transition-all duration-500" />
                    <div style={{ width: `${pPercent}%` }} className="bg-pink-400 h-full transition-all duration-500" />
                  </div>
                </div>

                {/* 煽りセクション */}
                {shouldShowTease && (
                  <div className="flex items-start gap-3.5 mt-6 pt-6 border-t border-slate-800">
                    <div className="w-11 h-11 rounded-full bg-pink-600 flex items-center justify-center shrink-0 shadow-lg text-lg">
                      🥺
                    </div>
                    <div className="bg-slate-800/90 p-4 rounded-2xl rounded-tl-none border border-pink-500/40 flex-1">
                      <p className="text-xs text-pink-300 font-bold mb-1">🥺 ダーリンちゃん</p>
                      <p className="text-slate-100 text-sm leading-relaxed mb-4">
                        ……ねぇ、ダーリン♡ あなたは自認が
                        『<span className="font-bold text-sky-300">{detectedMbti}</span>』みたいだけど……<br />
                        Model A 構造では『<span className="font-bold text-pink-300">{topMatched.type}</span>』が最も強く出ていて、柔軟な非合理・P傾向が強く出てるよ♡<br />
                        本当に「J」なのかな？ ふふっ♡
                      </p>
                    </div>
                  </div>
                )}

                {/* シェア・画像ダウンロード */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                  <button
                    onClick={handleShare}
                    className="px-5 py-2.5 bg-gradient-to-r from-sky-400 to-pink-400 text-slate-950 font-bold rounded-full text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    結果をシェア
                  </button>
                  <button
                    onClick={handleDownloadImage}
                    disabled={isExporting}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 font-bold rounded-full text-xs flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-pink-300" />
                    <span>{isExporting ? '生成中...' : '画像として保存'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setStep('title');
                      setCurrentQId('q1');
                      setIeScores({ Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 });
                      setPosSignatures(createEmptyPositionSignatures());
                      setJpScore({ j: 0, p: 0 });
                      setActionLogs([]);
                      setHistory([]);
                    }}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold rounded-full text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    もう一度診断する
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* フッター */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto p-4 text-center text-xs text-slate-300">
        Socionics Model A Deep Structural Analysis Engine
      </footer>
    </div>
  );
}
