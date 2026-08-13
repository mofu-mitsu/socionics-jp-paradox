'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  HelpCircle,
  Download,
  Share2,
  Trash2,
  Send,
  Copy,
  Check,
  Flower2,
  Droplets,
  Award,
  Layers,
  Sparkle,
  ArrowLeft,
  Gamepad2
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
  text: string;
  options: Option[];
};

const QUESTIONS: Record<string, Question> = {
  q1a: {
    id: 'q1a',
    categoryTag: '🗑️ 状況1：片付ける動機（なぜ？）',
    text: '「面倒でも片付ける」を選びましたね。その【根本的な動機】はどれに最も近いですか？',
    options: [
      {
        text: '散らかっている不快な状態が生理的・感覚的に耐えられないから',
        reasonTag: '理由: 生理的・感覚的快適性の維持を優先',
        ieDeltas: { Si: 2.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Si: 2.0 },
          demonstrative: { Si: 1.5 },
          role: { Fi: 1.0 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q2'
      },
      {
        text: 'やるべきタスクを放置しておくと、後でもっと面倒・非効率になるから',
        reasonTag: '理由: 将来の非効率とリスク回避の予測',
        ieDeltas: { Te: 2.5, Ni: 1.5 },
        positionDeltas: {
          leading: { Te: 2.0 },
          creative: { Ni: 1.5 },
          demonstrative: { Te: 1.5 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q2'
      },
      {
        text: '自分の生活空間を自分の意志で即座にコントロール・支配しておきたいから',
        reasonTag: '理由: 意志力による空間の掌握',
        ieDeltas: { Se: 2.5, Ti: 1.0 },
        positionDeltas: {
          leading: { Se: 2.5 },
          creative: { Ti: 1.5 },
          activating: { Se: 1.0 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q2'
      },
      {
        text: '自分の決めたルールや秩序・日課を破るのが気持ち悪いから',
        reasonTag: '理由: 規律と構造ルールの維持',
        ieDeltas: { Ti: 2.5, Fi: 1.0 },
        positionDeltas: {
          leading: { Ti: 2.0 },
          role: { Ti: 1.5 },
          demonstrative: { Ti: 1.0 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q2'
      }
    ]
  },
  q1b: {
    id: 'q1b',
    categoryTag: '🗑️ 状況1：休む動機（なぜ？）',
    text: '「今日は休む」を選びましたね。その【根本的な動機】はどれに最も近いですか？',
    options: [
      {
        text: '自分の身体感覚・体力の回復を優先するのが最も自然だから',
        reasonTag: '理由: 体調・身体感覚の保全',
        ieDeltas: { Si: 2.5, Fe: 0.5 },
        positionDeltas: {
          leading: { Si: 2.0 },
          activating: { Si: 1.5 },
          vulnerable: { Se: 1.5 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q2'
      },
      {
        text: 'どうせまた散らかる。今わざわざ疲労を押してやる合理的な価値がないから',
        reasonTag: '理由: 長期的帰結の見据えと無駄のカット',
        ieDeltas: { Ni: 2.5, Te: 1.5 },
        positionDeltas: {
          leading: { Ni: 2.0 },
          creative: { Te: 1.5 },
          ignoring: { Ne: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q2'
      },
      {
        text: '明日困るわけではない。気分や状況の自然な流れに合わせて動けばいいから',
        reasonTag: '理由: 柔軟な状況追従と自由さ',
        ieDeltas: { Ne: 2.0, Fi: 1.0 },
        positionDeltas: {
          creative: { Ne: 2.0 },
          suggestive: { Ne: 1.5 },
          vulnerable: { Te: 1.0 }
        },
        jpDelta: { j: 0, p: 1.0 },
        nextId: 'q2'
      },
      {
        text: '今やっても特別な見返りや得るもの（メリット）がないから',
        reasonTag: '理由: コストパフォーマンスと利得判断',
        ieDeltas: { Te: 2.0, Ni: 1.0 },
        positionDeltas: {
          creative: { Te: 1.5 },
          ignoring: { Ti: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q2'
      }
    ]
  },
  q2: {
    id: 'q2',
    categoryTag: '🍽️ 状況2：溜まった食器',
    text: '食事が終わりました。食器を洗うのはちょっと面倒。\nただ、シンクにはすでに食器が溜まっています。どうしますか？',
    options: [
      {
        text: '今のうちにすぐ洗う',
        reasonTag: '【状況2】今のうちにすぐ洗う',
        ieDeltas: { Te: 1.5, Se: 1.0, Si: 1.0 },
        positionDeltas: {
          leading: { Te: 1.0 },
          role: { Se: 1.0 },
          demonstrative: { Si: 1.0 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q2a'
      },
      {
        text: 'あとでいい。今はゆっくりする',
        reasonTag: '【状況2】あとでいい。今はゆっくりする',
        ieDeltas: { Si: 2.0, Ni: 1.5 },
        positionDeltas: {
          leading: { Si: 1.5 },
          vulnerable: { Te: 1.0 },
          suggestive: { Se: 0.5 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q3'
      }
    ]
  },
  q2a: {
    id: 'q2a',
    categoryTag: '🍽️ 状況2：洗う動機（なぜ？）',
    text: '「今のうちにすぐ洗う」を選んだ理由は何ですか？',
    options: [
      {
        text: '溜まった汚れの匂いや見た目の不快感が我慢できないから',
        reasonTag: '理由: 感覚的不快の解消',
        ieDeltas: { Si: 2.0, Fi: 1.0 },
        positionDeltas: { leading: { Si: 1.5 }, demonstrative: { Si: 1.5 } },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q3'
      },
      {
        text: '次に料理・作業する時の効率を落としたくないから',
        reasonTag: '理由: 次の作業効率維持',
        ieDeltas: { Te: 2.5, Ni: 1.0 },
        positionDeltas: { leading: { Te: 2.0 }, creative: { Ni: 1.0 } },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q3'
      }
    ]
  },
  q3: {
    id: 'q3',
    categoryTag: '🛏️ 状況3：部屋の散らかり',
    text: '明日誰かが来るわけではありません。\nでも部屋の床に服や荷物が散らばっています。どうしますか？',
    options: [
      {
        text: '気になって落ち着かないので片付ける',
        reasonTag: '【状況3】気になって落ち着かないので片付ける',
        ieDeltas: { Fi: 1.5, Se: 1.0, Si: 1.5 },
        positionDeltas: {
          leading: { Fi: 1.5, Si: 1.0 },
          role: { Ti: 1.0 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'q4'
      },
      {
        text: '生活できるなら気にならない。放置する',
        reasonTag: '【状況3】生活できるなら気にならない。放置する',
        ieDeltas: { Ni: 2.0, Ne: 1.5, Ti: 1.0 },
        positionDeltas: {
          leading: { Ni: 1.5 },
          vulnerable: { Se: 1.5 },
          ignoring: { Si: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q4'
      }
    ]
  },
  q4: {
    id: 'q4',
    categoryTag: '👔 服装選択',
    text: '明日、私服自由の場所に行く予定があります。\nどちらの服を選んで着ていきますか？',
    options: [
      {
        text: '少し動きにくくても、外見の印象・魅力・存在感を高める服',
        reasonTag: '【服装】外見の魅力と印象優先',
        ieDeltas: { Se: 2.5, Fe: 2.0, Fi: 1.0 },
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
        ieDeltas: { Si: 2.5, Ti: 1.0, Ne: 0.5 },
        positionDeltas: {
          leading: { Si: 2.5 },
          demonstrative: { Si: 1.5 },
          creative: { Te: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q5'
      }
    ]
  },
  q5: {
    id: 'q5',
    categoryTag: '💡 理論の誤解への反応',
    text: '「SEIとISFJはどちらもSiだからほぼ同じだ」という浅い理論的誤解を見かけました。あなたならどう反応しますか？',
    options: [
      {
        text: '構造的な矛盾が許せない。正しい定義と論理体系の違いを明確に説明したくなる',
        reasonTag: '【理論誤解】論理的構造と分類の正確性を説明',
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
        reasonTag: '【理論誤解】将来帰結を見越して放置',
        ieDeltas: { Ni: 2.5, Te: 1.5 },
        positionDeltas: {
          leading: { Ni: 2.5 },
          creative: { Te: 1.0 },
          ignoring: { Ne: 1.0 }
        },
        jpDelta: { j: 0, p: 1.5 },
        nextId: 'q6'
      },
      {
        text: '誤解が広まることで当事者の人々が正しく理解されず可哀想だと感じる',
        reasonTag: '【理論誤解】人間の感情と人間関係への影響を心配',
        ieDeltas: { Fi: 2.5, Fe: 2.0 },
        positionDeltas: {
          leading: { Fi: 2.0, Fe: 1.5 },
          creative: { Ne: 1.0 }
        },
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q6'
      }
    ]
  },
  q6: {
    id: 'q6',
    categoryTag: '⏳ 締め切りと着手',
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
        nextId: 'q6a'
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
        nextId: 'q6b'
      }
    ]
  },
  q6a: {
    id: 'q6a',
    categoryTag: '⏳ 早期完了の理由（なぜ？）',
    text: '「今のうちに終わらせる」を選んだ決定的な理由は何ですか？',
    options: [
      {
        text: '未完了のものが残っている状態そのものが精神的にソワソワして落ち着かないから',
        reasonTag: '理由: 未完了の不快感解消',
        ieDeltas: { Fi: 1.5, Ti: 1.5 },
        positionDeltas: {
          leading: { Fi: 1.5 },
          role: { Ti: 1.0 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'result'
      },
      {
        text: '後から不確定な割り込み事態が発生するリスクを事前に排除したいから',
        reasonTag: '理由: 不確実性リスクの事前排除',
        ieDeltas: { Te: 2.5, Ni: 1.5 },
        positionDeltas: {
          leading: { Te: 2.5 },
          creative: { Ni: 1.5 }
        },
        jpDelta: { j: 1.5, p: 0 },
        nextId: 'result'
      }
    ]
  },
  q6b: {
    id: 'q6b',
    categoryTag: '⏳ 直前着手の理由（なぜ？）',
    text: '「直前まで待つ」を選んだ決定的な理由は何ですか？',
    options: [
      {
        text: '締め切り間際になれば集中力が最大化し、最も高効率で終わるから',
        reasonTag: '理由: ギリギリでのエネルギー集中と高効率',
        ieDeltas: { Ni: 2.5, Te: 1.5 },
        positionDeltas: {
          leading: { Ni: 2.0 },
          creative: { Te: 1.5 }
        },
        jpDelta: { j: 0, p: 2.0 },
        nextId: 'result'
      },
      {
        text: '今この瞬間にわざわざ疲労を押して取り組む必然性がないから',
        reasonTag: '理由: 現在の省エネと快適優先',
        ieDeltas: { Si: 2.0, Ne: 1.0 },
        positionDeltas: {
          leading: { Si: 1.5 },
          vulnerable: { Se: 1.5 }
        },
        jpDelta: { j: 0, p: 1.5 },
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

  // 片付けギミック状態 (Q1内専用)
  const [q1TrashItems, setQ1TrashItems] = useState([
    { id: 1, icon: '📄', label: '古い資料', x: 22, y: 35 },
    { id: 2, icon: '🥫', label: '空き缶', x: 75, y: 25 },
    { id: 3, icon: '🍟', label: '食べカス', x: 48, y: 65 },
    { id: 4, icon: '📝', label: 'メモ用紙', x: 82, y: 70 },
    { id: 5, icon: '🧃', label: '紙パック', x: 18, y: 72 }
  ]);
  const [q1GameCleanedCount, setQ1GameCleanedCount] = useState(0);

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

  // ポジション使用態様スコア
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

  // ダーリンちゃんへの言い訳
  const [excuseText, setExcuseText] = useState('');
  const [excuseSubmitted, setExcuseSubmitted] = useState(false);

  // コピー状態表示
  const [copiedLog, setCopiedLog] = useState(false);

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

  // Q1ミニゲームでゴミをタップしたときの処理（補助データとして記録）
  const handleQ1CleanTrash = (id: number) => {
    setQ1TrashItems(prev => prev.filter(item => item.id !== id));
    const nextCount = q1GameCleanedCount + 1;
    setQ1GameCleanedCount(nextCount);
    
    // ログに行動ギミック結果を記録
    if (!actionLogs.some(l => l.includes('【ミニゲーム】'))) {
      setActionLogs(prev => [...prev, `【ミニゲーム】画面上のゴミを片付け操作した (${nextCount}/5)`]);
    } else {
      setActionLogs(prev => prev.map(l => l.includes('【ミニゲーム】') ? `【ミニゲーム】画面上のゴミを片付け操作した (${nextCount}/5)` : l));
    }
  };

  // Q1での通常A/B選択肢のハンドリング
  const handleQ1SelectOption = (isOptionA: boolean) => {
    const logTag = isOptionA 
      ? '【状況1】A「面倒でも片付ける」を選択' 
      : '【状況1】B「今日は休む。明日でもいい」を選択';

    setActionLogs(prev => [...prev, logTag]);

    // 履歴保存
    setHistory(prev => [
      ...prev,
      {
        qId: 'q1',
        ieScores: { ...ieScores },
        posSignatures: JSON.parse(JSON.stringify(posSignatures)),
        jp: { ...jpScore },
        logs: [...actionLogs]
      }
    ]);

    if (isOptionA) {
      setIeScores(prev => ({ ...prev, Se: prev.Se + 1.5, Te: prev.Te + 1.0 }));
      setJpScore(prev => ({ ...prev, j: prev.j + 1.5 }));
      setCurrentQId('q1a'); // A用深掘りへ
    } else {
      setIeScores(prev => ({ ...prev, Si: prev.Si + 2.0, Ni: prev.Ni + 1.0 }));
      setJpScore(prev => ({ ...prev, p: prev.p + 1.5 }));
      setCurrentQId('q1b'); // B用深掘りへ
    }
  };

  // 通常設問（Q1a以降）の選択肢ハンドリング
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

    if (currentQId === 'q1') {
      setCurrentQId('q2');
      return;
    }

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

  // 行動ログのコピー
  const handleCopyLogs = () => {
    const text = actionLogs.join('\n');
    navigator.clipboard.writeText(text);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
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
    const text = `【ソシオJ/Pねじれ診断結果】\n最も近いソシオニクスModel A構造: ${topMatch?.type || 'LII'} (${topMatch?.score.toFixed(1)}%適合)\n心理機能順位: ${rankedIes.map(item => item.ie).join(' ＞ ')}\nJ/P傾向: P ${pPercent}% / J ${100 - pPercent}%\n#ソシオJPねじれ診断`;
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
  const topTypeDef = MODEL_A_DEFINITIONS[topMatched.type];

  // 8つの心理機能の総合得点ランキング（`＞` 順序表示用）
  const rankedIes = (['Ti', 'Te', 'Ni', 'Ne', 'Si', 'Se', 'Fi', 'Fe'] as IE[])
    .map(ie => ({ ie, score: ieScores[ie] || 0 }))
    .sort((a, b) => b.score - a.score);

  // J/Pパーセンテージ計算
  const totalJp = jpScore.j + jpScore.p;
  const pPercent = totalJp > 0 ? Math.round((jpScore.p / totalJp) * 100) : 50;

  // 煽り判定
  const isJInferred = detectedMbti ? detectedMbti.endsWith('J') : false;
  const isIrrationalType = ['ILI', 'IEI', 'SEI', 'SLE', 'SEE', 'SLI', 'ILE', 'IEE'].includes(topMatched.type);
  const shouldShowTease = isJInferred && (isIrrationalType || pPercent >= 45);

  const currentQ = QUESTIONS[currentQId];

  return (
    <div className="min-h-screen bg-watercolor-dream text-slate-100 font-sans relative overflow-x-hidden flex flex-col justify-between selection:bg-pink-500 selection:text-white">
      
      {/* 水彩風ぼかしグラデーション背景 */}
      <div className="fixed inset-0 watercolor-blobs z-0"></div>

      {/* 舞い散る花びら */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${(i * 7.5) % 96}%`,
              width: `${14 + (i % 3) * 6}px`,
              height: `${22 + (i % 3) * 8}px`,
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${9 + (i % 4) * 2}s`
            }}
          />
        ))}
      </div>

      {/* ヘッダー */}
      <header className="relative z-10 w-full max-w-4xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Flower2 className="w-6 h-6 text-pink-300 animate-spin" style={{ animationDuration: '14s' }} />
          <span className="font-serif font-bold tracking-wider text-base md:text-lg text-slate-100">
            ソシオJ/Pねじれ診断
          </span>
        </div>

        {step === 'quiz' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleGoBack}
              className="px-3.5 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-100 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all border border-pink-400/40 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-pink-300" />
              戻る
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

              <p className="text-slate-200 mb-8 text-base md:text-lg leading-relaxed font-normal bg-slate-900/60 p-5 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg">
                あなたの「J」は、どこから来た？<br />
                単なる8機能得点ではなく、<span className="font-bold text-sky-300 underline">Model A 8つのポジション</span>における機能の役割構造を解析し、MBTIとソシオニクスのねじれを完全解明します。
              </p>

              <button
                onClick={() => setStep('mbti_input')}
                className="group relative inline-flex items-center justify-center px-9 py-4 text-lg font-bold text-slate-950 transition-all duration-300 bg-gradient-to-r from-sky-300 via-pink-300 to-purple-300 rounded-full shadow-lg shadow-pink-900/40 hover:shadow-pink-400/50 hover:scale-105 active:scale-95"
              >
                <span>診断を始める</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: 自認MBTI自由入力画面 */}
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
                  className="px-6 py-3 bg-gradient-to-r from-sky-300 to-pink-300 hover:from-sky-200 hover:to-pink-200 text-slate-950 font-bold text-sm rounded-full shadow-lg transition-all"
                >
                  質問へ進む
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: 質問回答画面 */}
          {step === 'quiz' && (
            <motion.div
              key={currentQId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full max-w-2xl"
            >
              <div className="glass-card p-6 md:p-9 rounded-3xl border border-pink-500/30 shadow-2xl relative overflow-hidden">

                {/* Q1：統合型 片付け設問コンポーネント（状況提示 + ミニゲーム操作ギミック + A/B本心質問） */}
                {currentQId === 'q1' ? (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="inline-block px-3.5 py-1 rounded-full bg-slate-900 border border-pink-400/40 text-pink-300 text-xs font-bold">
                        🗑️ 状況1：机の片付け
                      </div>
                      <button
                        onClick={handleGoBack}
                        className="text-xs text-sky-300 hover:text-white flex items-center gap-1 transition-colors font-semibold"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        戻る
                      </button>
                    </div>

                    {/* STEP 1: 状況提示 */}
                    <p className="font-serif text-lg md:text-xl font-medium leading-relaxed mb-4 text-slate-100 whitespace-pre-wrap">
                      明日の予定はありません。でも机の上はゴミだらけ。疲れていて片付ける気力はあまりありません。
                    </p>

                    {/* STEP 2: 行動ギミック（実際に机の上を片付けてみよう） */}
                    <div className="relative w-full h-52 bg-slate-950/80 rounded-2xl border border-pink-500/30 mb-6 p-4 overflow-hidden shadow-inner">
                      <div className="absolute top-2.5 left-3 text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                        <Gamepad2 className="w-4 h-4 text-pink-400" />
                        【実際の操作ギミック】ゴミをタップして片付けてみよう！
                      </div>

                      <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-pink-400/30 p-2.5 rounded-xl flex items-center gap-2 text-xs text-slate-200 shadow-md">
                        <Trash2 className="w-4 h-4 text-pink-400" />
                        <span>片付け数: <strong className="text-pink-300 font-bold">{q1GameCleanedCount}</strong> / 5</span>
                      </div>

                      {q1TrashItems.map(item => (
                        <button
                          key={item.id}
                          onClick={() => handleQ1CleanTrash(item.id)}
                          style={{ top: `${item.y}%`, left: `${item.x}%` }}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 hover:bg-pink-500/40 p-2.5 rounded-2xl border border-white/20 transition-all hover:scale-110 active:scale-95 flex items-center gap-1.5 shadow-md group cursor-pointer"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-[10px] text-slate-200 font-medium group-hover:text-white">{item.label}</span>
                        </button>
                      ))}

                      {q1TrashItems.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 rounded-2xl text-pink-300 font-bold text-sm">
                          ✨ ピカピカに片付きました！（画面操作完了）
                        </div>
                      )}
                    </div>

                    {/* STEP 3: 本心の通常2択質問 */}
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-sky-200 mb-2">
                        質問：現実のあなたなら、どう行動しますか？
                      </p>
                      
                      <button
                        onClick={() => handleQ1SelectOption(true)}
                        className="w-full text-left p-4 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/90 hover:border-pink-400 transition-all flex items-center justify-between group shadow-md"
                      >
                        <span className="text-sm md:text-base text-slate-100 font-medium">A：面倒でも片付ける</span>
                        <Sparkles className="w-5 h-5 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>

                      <button
                        onClick={() => handleQ1SelectOption(false)}
                        className="w-full text-left p-4 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/90 hover:border-pink-400 transition-all flex items-center justify-between group shadow-md"
                      >
                        <span className="text-sm md:text-base text-slate-100 font-medium">B：今日は休む。明日でもいい</span>
                        <Sparkles className="w-5 h-5 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </div>
                ) : currentQ ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      {currentQ.categoryTag && (
                        <div className="inline-block px-3.5 py-1 rounded-full bg-slate-900 border border-pink-400/40 text-pink-300 text-xs font-bold">
                          {currentQ.categoryTag}
                        </div>
                      )}
                      <button
                        onClick={handleGoBack}
                        className="text-xs text-sky-300 hover:text-white flex items-center gap-1 transition-colors font-semibold"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        前の一問に戻る
                      </button>
                    </div>

                    <p className="font-serif text-lg md:text-xl font-medium leading-relaxed mb-8 text-slate-100 whitespace-pre-wrap">
                      {currentQ.text}
                    </p>

                    <div className="space-y-3.5">
                      {currentQ.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(opt)}
                          className="w-full text-left p-5 rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/90 hover:border-pink-400 transition-all flex items-center justify-between group shadow-md"
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
                      Model A 8ポジションの配置構造を解析した結果、最も適合したのは『<span className="font-bold text-pink-300 underline">{topMeta.name}</span>』だったよ♡
                    </p>
                  </div>
                </div>

                {/* 🥇 1位判定ソシオタイプ */}
                <div className="bg-slate-950/90 rounded-2xl p-6 border border-pink-500/40 mb-6 shadow-inner">
                  <div className="flex items-center gap-2 text-xs text-pink-300 font-bold tracking-widest uppercase mb-1">
                    <Award className="w-4 h-4 text-pink-400" />
                    Top Matched Socionics Model A Structure
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-white mb-1">
                      {topMeta.name}
                    </h2>
                    <span className="text-sm font-bold text-pink-300">{topMatched.score.toFixed(1)}% 適合</span>
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-sky-200 mb-3">{topMeta.title}</p>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
                    {topMeta.desc}
                  </p>
                </div>

                {/* 📊 復活！ 8心理機能の総合得点ランキング（`＞` 順序表示） */}
                <div className="bg-slate-900/90 rounded-2xl p-5 mb-6 border border-sky-400/30">
                  <h3 className="text-xs text-sky-300 font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sparkle className="w-4 h-4 text-sky-400" />
                    📊 あなたの8心理機能 強さのランキング順位
                  </h3>
                  
                  {/* `＞` で繋いだ順序表示 */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 mb-4 flex flex-wrap items-center gap-1.5 text-xs font-mono font-bold">
                    {rankedIes.map((item, idx) => (
                      <React.Fragment key={item.ie}>
                        <span className={`px-2 py-0.5 rounded ${idx === 0 ? 'bg-pink-500/30 text-pink-300 border border-pink-500/50' : idx <= 2 ? 'bg-sky-500/20 text-sky-200' : 'bg-slate-800 text-slate-300'}`}>
                          {item.ie} ({item.score.toFixed(1)})
                        </span>
                        {idx < rankedIes.length - 1 && (
                          <span className="text-slate-500 font-bold">＞</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* 🏆 Model A 適合タイプランキング TOP 4 */}
                <div className="bg-slate-900/80 rounded-2xl p-5 mb-6 border border-slate-700">
                  <h3 className="text-xs text-pink-300 font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-pink-400" />
                    🏆 Model A 適合タイプランキング
                  </h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {calculatedMatches.slice(0, 4).map((m, idx) => {
                      const meta = SOCIONICS_META[m.type];
                      const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '④';
                      return (
                        <div key={m.type} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-slate-100 mr-1.5">{medal} {m.type}</span>
                            <p className="text-[10px] text-slate-400 truncate max-w-[100px]">{meta.title}</p>
                          </div>
                          <span className="text-xs font-mono font-bold text-pink-300">{m.score.toFixed(1)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 🧬 8つの Model A ポジション配置カード */}
                <div className="bg-slate-900/80 rounded-2xl p-5 mb-6 border border-slate-700">
                  <h3 className="text-xs text-sky-300 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-sky-400" />
                    🧬 あなたの判定タイプ ({topMatched.type}) の Model A 8ポジション配置
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {POSITIONS_ARRAY.map(pos => {
                      const info = POSITION_INFO[pos];
                      const assignedIE = topTypeDef[pos];
                      const rawScore = ieScores[assignedIE] || 0;

                      return (
                        <div key={pos} className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-xs font-bold text-sky-300">{info.nameJa}</p>
                            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 border border-sky-500/40 text-xs font-mono font-bold">
                              {assignedIE}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mb-1 truncate">{info.desc}</p>
                          <div className="text-[10px] text-slate-300 font-mono">
                            機能発揮傾向: <span className="text-sky-300 font-bold">+{rawScore.toFixed(1)} pt</span>
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
                        ……ねぇ、ダーリン♡ あなたは自認が『<span className="font-bold text-sky-300">{detectedMbti}</span>』でJ型のはずだよね？<br />
                        でも実際の行動選択では、柔軟なP的傾向（{pPercent}%）が出てるよ♡<br />
                        ……ねぇダーリン♡ あなたの「J」要素って、一体どこに行っちゃったの？♡<br />
                        自分がJ型だと思う理由を私に教えてくれる？♡
                      </p>

                      {!excuseSubmitted ? (
                        <div className="space-y-2">
                          <textarea
                            value={excuseText}
                            onChange={e => setExcuseText(e.target.value)}
                            placeholder="私がJ型だと思う理由は..."
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-pink-400 min-h-[70px]"
                          />
                          <button
                            onClick={() => setExcuseSubmitted(true)}
                            disabled={!excuseText.trim()}
                            className="w-full py-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl disabled:opacity-40 transition-all flex items-center justify-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            ダーリンちゃんに送信する♡
                          </button>
                        </div>
                      ) : (
                        <div className="p-3 bg-pink-950/40 rounded-xl border border-pink-500/30 text-xs text-pink-200 font-medium leading-relaxed">
                          ふふ、なるほどね♡<br />
                          でもそれって計画性というより、単に「不安」や「こだわり」から来てたりしない？♡<br />
                          まあ、そう思いたいならそういうことにしておいてあげます♡
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 行動ログ表示エリア（コピペ機能付き・画像保存対象外） */}
              <div className="bg-slate-900/90 backdrop-blur-md p-5 rounded-3xl border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs text-sky-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkle className="w-4 h-4 text-sky-400" />
                    📋 回答の行動ログ（テキスト出力用）
                  </h3>
                  <button
                    onClick={handleCopyLogs}
                    className="px-3 py-1.5 bg-sky-300 hover:bg-sky-200 text-slate-950 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
                  >
                    {copiedLog ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLog ? 'コピー完了！' : '行動ログをコピー'}</span>
                  </button>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl text-xs font-mono text-slate-200 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap select-all border border-slate-800">
                  {actionLogs.length > 0 ? actionLogs.join('\n') : '行動ログはありません'}
                </div>
              </div>

              {/* シェア＆画像保存アクションボタン */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleDownloadImage}
                  disabled={isExporting}
                  className="w-full sm:w-1/2 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-pink-400" />
                  <span>{isExporting ? '画像を生成中...' : '結果を画像保存'}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="w-full sm:w-1/2 py-3.5 bg-gradient-to-r from-sky-300 to-pink-300 hover:from-sky-200 hover:to-pink-200 text-slate-950 font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  <span>結果をシェアする</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setStep('title');
                    setHistory([]);
                    setCurrentQId('q1');
                    setIeScores({ Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 });
                    setPosSignatures(createEmptyPositionSignatures());
                    setJpScore({ j: 0, p: 0 });
                    setActionLogs([]);
                    setExcuseSubmitted(false);
                    setExcuseText('');
                    setQ1GameCleanedCount(0);
                    setQ1TrashItems([
                      { id: 1, icon: '📄', label: '古い資料', x: 22, y: 35 },
                      { id: 2, icon: '🥫', label: '空き缶', x: 75, y: 25 },
                      { id: 3, icon: '🍟', label: '食べカス', x: 48, y: 65 },
                      { id: 4, icon: '📝', label: 'メモ用紙', x: 82, y: 70 },
                      { id: 5, icon: '🧃', label: '紙パック', x: 18, y: 72 }
                    ]);
                  }}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-4"
                >
                  もう一度最初から診断する
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
