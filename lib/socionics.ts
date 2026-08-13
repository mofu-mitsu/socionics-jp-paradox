export type IE = 'Ti' | 'Te' | 'Ni' | 'Ne' | 'Si' | 'Se' | 'Fi' | 'Fe';

export type ModelPosition =
  | 'leading'        // ① 主導機能
  | 'creative'       // ② 補助機能
  | 'role'           // ③ 規範機能
  | 'vulnerable'     // ④ 脆弱機能 (PoLR)
  | 'suggestive'     // ⑤ 暗示機能
  | 'activating'     // ⑥ 動員機能
  | 'ignoring'       // ⑦ 無視機能
  | 'demonstrative';  // ⑧ 証明機能

export type SocionicsType =
  | 'LII' | 'ILI' | 'IEI' | 'SEI' | 'ESI' | 'SLE' | 'LSE' | 'LIE'
  | 'ILE' | 'EIE' | 'ESE' | 'SEE' | 'SLI' | 'LSI' | 'EII' | 'IEE';

export const POSITION_INFO: Record<ModelPosition, { nameJa: string; desc: string }> = {
  leading: { nameJa: '① 主導機能 (Leading)', desc: '世界を捉える根幹プログラム・本質的価値観' },
  creative: { nameJa: '② 補助機能 (Creative)', desc: '主導を実現するための現実的ツール・創造手段' },
  role: { nameJa: '③ 規範機能 (Role)', desc: '社会的期待に応じて意識的にこなそうとする領域' },
  vulnerable: { nameJa: '④ 脆弱機能 (Vulnerable)', desc: '最も苦手で、ストレスや強い疲弊を生む領域' },
  suggestive: { nameJa: '⑤ 暗示機能 (Suggestive)', desc: '自分では弱いが他者から与えられると満たされる領域' },
  activating: { nameJa: '⑥ 動員機能 (Activating)', desc: '刺激を受けるとエネルギーが活性化するエンジン' },
  ignoring: { nameJa: '⑦ 無視機能 (Ignoring)', desc: '能力としては高いがあえて抑圧・スルーする領域' },
  demonstrative: { nameJa: '⑧ 証明機能 (Demonstrative)', desc: '無意識かつ自然に発揮される強力なバックアップ' }
};

export const MODEL_A_DEFINITIONS: Record<SocionicsType, Record<ModelPosition, IE>> = {
  LII: { leading: 'Ti', creative: 'Ne', role: 'Fi', vulnerable: 'Se', suggestive: 'Fe', activating: 'Si', ignoring: 'Te', demonstrative: 'Ni' },
  ILE: { leading: 'Ne', creative: 'Ti', role: 'Se', vulnerable: 'Fi', suggestive: 'Si', activating: 'Fe', ignoring: 'Ni', demonstrative: 'Te' },
  ILI: { leading: 'Ni', creative: 'Te', role: 'Si', vulnerable: 'Fe', suggestive: 'Se', activating: 'Fi', ignoring: 'Ne', demonstrative: 'Ti' },
  LIE: { leading: 'Te', creative: 'Ni', role: 'Fe', vulnerable: 'Si', suggestive: 'Fi', activating: 'Se', ignoring: 'Ti', demonstrative: 'Ne' },
  IEI: { leading: 'Ni', creative: 'Fe', role: 'Si', vulnerable: 'Te', suggestive: 'Se', activating: 'Ti', ignoring: 'Ne', demonstrative: 'Fi' },
  EIE: { leading: 'Fe', creative: 'Ni', role: 'Te', vulnerable: 'Si', suggestive: 'Ti', activating: 'Se', ignoring: 'Fi', demonstrative: 'Ne' },
  SEI: { leading: 'Si', creative: 'Fe', role: 'Ni', vulnerable: 'Te', suggestive: 'Ne', activating: 'Ti', ignoring: 'Se', demonstrative: 'Fi' },
  ESE: { leading: 'Fe', creative: 'Si', role: 'Te', vulnerable: 'Ni', suggestive: 'Ti', activating: 'Ne', ignoring: 'Fi', demonstrative: 'Se' },
  ESI: { leading: 'Fi', creative: 'Se', role: 'Ti', vulnerable: 'Ne', suggestive: 'Te', activating: 'Ni', ignoring: 'Fe', demonstrative: 'Si' },
  SEE: { leading: 'Se', creative: 'Fi', role: 'Ne', vulnerable: 'Ti', suggestive: 'Ni', activating: 'Te', ignoring: 'Si', demonstrative: 'Fe' },
  SLI: { leading: 'Si', creative: 'Te', role: 'Ni', vulnerable: 'Fe', suggestive: 'Ne', activating: 'Fi', ignoring: 'Se', demonstrative: 'Ti' },
  LSE: { leading: 'Te', creative: 'Si', role: 'Fe', vulnerable: 'Ni', suggestive: 'Fi', activating: 'Ne', ignoring: 'Ti', demonstrative: 'Se' },
  LSI: { leading: 'Ti', creative: 'Se', role: 'Fi', vulnerable: 'Ne', suggestive: 'Fe', activating: 'Ni', ignoring: 'Te', demonstrative: 'Si' },
  SLE: { leading: 'Se', creative: 'Ti', role: 'Ne', vulnerable: 'Fi', suggestive: 'Ni', activating: 'Fe', ignoring: 'Si', demonstrative: 'Te' },
  EII: { leading: 'Fi', creative: 'Ne', role: 'Ti', vulnerable: 'Se', suggestive: 'Te', activating: 'Si', ignoring: 'Fe', demonstrative: 'Ni' },
  IEE: { leading: 'Ne', creative: 'Fi', role: 'Se', vulnerable: 'Ti', suggestive: 'Si', activating: 'Te', ignoring: 'Ni', demonstrative: 'Fe' },
};

export const SOCIONICS_META: Record<SocionicsType, { name: string; title: string; desc: string }> = {
  LII: { name: 'LII (INTj)', title: '理論と構造の探求者', desc: '概念の統一性と構造の矛盾を見抜き、本質的論理構造を追求する。' },
  ILI: { name: 'ILI (INTp)', title: '時間と帰結のメタ観察者', desc: '長期的な時間の流れと帰結を冷静に見通し、無駄な行動を控える。' },
  IEI: { name: 'IEI (INFp)', title: '未来の予兆と叙情の夢想家', desc: '感情の機微と未来の展開を感じ取り、精神的自由を重んじる。' },
  SEI: { name: 'SEI (ISFp)', title: '感覚的快適さと調和の守護者', desc: '身体的・心理的な心地よさと柔らかな人間関係を大切にする。' },
  ESI: { name: 'ESI (ISFj)', title: '道徳規範と境界の防衛者', desc: '人間としての責任感や境界線を重んじ、不当な不快に自ら介入する。' },
  SLE: { name: 'SLE (ESTp)', title: '意志と空間の統率者', desc: '強い意志と直接的介入で障害を突破し、場を掌握・展開する。' },
  LSE: { name: 'LSE (ESTj)', title: '実務能率と環境改善の実践者', desc: '合理的で実質的な仕事と、快適な住環境を効率的に整備する。' },
  LIE: { name: 'LIE (ENTj)', title: '長期的事業と最適化の構築者', desc: '将来の大きな成果に向けて今必要な最適解を迅速に連続実行する。' },
  ILE: { name: 'ILE (ENTp)', title: '可能性と創造のイノベーター', desc: '無数の新しいアイデアと理論モデルを柔軟に探索・結合する。' },
  EIE: { name: 'EIE (ENFj)', title: '感情と運命のドラマティスト', desc: '人の心を動かすパッションと時代の大きな潮流を引き寄せる。' },
  ESE: { name: 'ESE (ESFj)', title: '情熱と歓喜のムードメーカー', desc: '生き生きとしたエネルギーで周囲を盛り上げ、快適空間を作る。' },
  SEE: { name: 'SEE (ESFp)', title: '影響力と魅力のリーダー', desc: '対人関係のカリスマ性と速やかな行動で自分の領域を広げる。' },
  SLI: { name: 'SLI (ISTp)', title: '匠の技能と静けさの職人', desc: '無駄を省いた精巧な作業と自立した静かな生活を好む。' },
  LSI: { name: 'LSI (ISTj)', title: '秩序と規律のシステム守護者', desc: '強固なロジックと規律に基づき、体系の安定と遂行を守る。' },
  EII: { name: 'EII (INFj)', title: '深い共感と人道のカウンセラー', desc: '他者の心の痛みや誠実さに寄り添い、真調和を志向する。' },
  IEE: { name: 'IEE (ENFp)', title: '人間の可能性を見抜く探求者', desc: '人々の潜在能力や豊かな個性を見出し、自由に結びつける。' },
};
