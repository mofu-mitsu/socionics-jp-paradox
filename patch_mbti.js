const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const targetLabel = `              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-pink-600" />
                <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900">
                  あなたの自認タイプを教えてね
                </h2>
              </div>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                自認を入力すると、診断結果で Model A
                ポジション配置との「J/Pねじれ」や構造的ギャップを解説します♡
              </p>`;

const replacementLabel = `              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-pink-600" />
                <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900">
                  あなたの自認タイプを教えてね
                </h2>
              </div>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                MBTI（16タイプ）またはソシオニクスタイプを入力してね。診断結果で Model A
                ポジション配置との「J/Pねじれ」や構造的ギャップを解説します♡
              </p>`;

const targetRegex = `/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP)/i`;
const replacementRegex = `/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP|ILE|SEI|ESE|LII|EIE|LSI|SLE|IEI|SEE|ILI|LIE|ESI|LSE|EII|IEE|SLI)/i`;

const targetPlaceholder = `placeholder="例: INFP, ESTJ"`;
const replacementPlaceholder = `placeholder="例: INFP, LII, ILI"`;

content = content.replace(targetLabel, replacementLabel);
content = content.replace(targetRegex, replacementRegex);
content = content.replace(targetPlaceholder, replacementPlaceholder);

fs.writeFileSync('app/page.tsx', content);
