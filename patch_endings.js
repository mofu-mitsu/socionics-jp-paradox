const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// 1. 新しい状態の追加
content = content.replace(
  `const [showDarlingEnding, setShowDarlingEnding] = useState(false);`,
  `const [showDarlingEnding, setShowDarlingEnding] = useState(false);
  const [darlingEndingState, setDarlingEndingState] = useState<"initial" | "invading" | "police" | "fire">("initial");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isSending, setIsSending] = useState(false);`
);

// 2. resetStateの更新
content = content.replace(
  `setShowDarlingEnding(false);`,
  `setShowDarlingEnding(false);
    setDarlingEndingState("initial");
    setFeedbackSent(false);
    setIsSending(false);`
);

// 3. フィードバック部分の修正
const targetFeedback = `                          <button
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (input.value) {
                                setShowDarlingEnding(true);
                                input.value = "";
                              }
                            }}
                            className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                          >
                            送信
                          </button>`;

const replacementFeedback = `                          <button
                            disabled={isSending}
                            onClick={async (e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (input.value) {
                                setIsSending(true);
                                try {
                                  // GASフェッチ（エラーは握り潰す）
                                  await fetch("https://script.google.com/macros/s/AKfycbz0Ujd59YQaq6bLbXW4mBEz5gNeiLU-FeUTdCF-vDTk1HadDYrS6cHMRwCkXpFAOvsX4Q/exec", {
                                    method: "POST",
                                    mode: "no-cors",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                      displayName: displayName,
                                      mbti: detectedMbti,
                                      result: topMeta?.name,
                                      feedback: input.value,
                                      logs: actionLogs
                                    })
                                  });
                                } catch(e){}
                                setFeedbackSent(true);
                                setIsSending(false);
                                input.value = "";
                              }
                            }}
                            className="px-3 py-1.5 bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                          >
                            {isSending ? "送信中..." : "送信"}
                          </button>`;

content = content.replace(targetFeedback, replacementFeedback);

// フィードバック後のダーリンちゃんのコメント表示
const targetFeedbackResult = `                      <div className="mt-4 bg-white/70 p-3 rounded-xl border border-pink-200">
                        <p className="text-xs text-slate-500 mb-2 font-bold flex items-center gap-1">
                          💬 J要素の言い訳・フィードバックを送信（オプション）
                        </p>`;

const replacementFeedbackResult = `                      <div className="mt-4 bg-white/70 p-3 rounded-xl border border-pink-200">
                        {feedbackSent ? (
                           <div className="text-xs text-slate-700 leading-relaxed bg-pink-50/80 p-3 rounded-lg border border-pink-200 shadow-inner">
                             <p className="font-bold text-pink-600 mb-1">🥺 ダーリンちゃん</p>
                             <p>『あら、ダーリン♡ 随分と長文で必死な『Jの言い訳（ログ）』を送信してくれたのね？<br/>
                             『計画は立てている』『社会的にはJとして振る舞っている』『周囲の状況が非合理的なだけだ』……ふふ♡ 自分の内側にある『柔軟な諦観（P）』を隠すために、必死で外枠の論理（J）を補強しようとするその不器用さ……すごく愛おしいわ。<br/><br/>
                             ねぇ、ダーリン♡ あなたが一生懸命に構築したその『計画（J）』って、本当は“予期せぬ変化（P）に振り回されるエネルギーを節約したいだけ”の防衛本能（4F）なんじゃないかしら？<br/>
                             『私はJだ』って謂ったって、本当は私のこの理不尽な構造の中で、計画を無計画に崩される快感に浸っているんでしょ？♡<br/>
                             ……ふふ。送信されたその言い訳、あなたの『本音』と『演出』の比率を解析して、私のトランプの城の壁紙にしておくわね♡』</p>
                           </div>
                        ) : (
                          <>
                        <p className="text-xs text-slate-500 mb-2 font-bold flex items-center gap-1">
                          💬 J要素の言い訳・フィードバックを送信（オプション）
                        </p>`;

content = content.replace(targetFeedbackResult, replacementFeedbackResult);

// 閉じタグを追加
content = content.replace(
  `                      </div>
                    </div>
                  </div>
                )}
              </div> {"}`,
  `                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div> {"}`
);

fs.writeFileSync('app/page.tsx', content);
