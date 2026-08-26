const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf-8');

const sleSeeTarget = `  q_next: {`;
const sleSeeContent = `  // ==========================================================================
  // 【設問】人を動かす戦略（SLE vs SEE）
  // ==========================================================================
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
        nextId: 'q_darling_intercom'
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
        nextId: 'q_darling_intercom'
      }
    ]
  },

  // ==========================================================================
  // 【設問】行動の原動力とアプローチ（SLE vs LIE vs LSE）
  // ==========================================================================
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
        nextId: 'q_darling_intercom'
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
        nextId: 'q_darling_intercom'
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
        nextId: 'q_darling_intercom'
      }
    ]
  },
  q_next: {`;

if (content.includes(sleSeeTarget)) {
    content = content.replace(sleSeeTarget, sleSeeContent);
    fs.writeFileSync('lib/questions.ts', content);
    console.log("Injected SLE questions");
} else {
    console.log("Could not find q_next target");
}
