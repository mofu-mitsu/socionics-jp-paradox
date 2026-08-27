const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `<input
                                  type="tel"
                                  value={smartphoneInput}
                                  onChange={(e) => setSmartphoneInput(e.target.value)}
                                  placeholder="番号を入力..."
                                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white font-mono text-xl focus:outline-none focus:border-red-500"
                                />
                                <button
                                  onClick={() => {`;

const replacement = `<input
                                  type="tel"
                                  value={smartphoneInput}
                                  onChange={(e) => setSmartphoneInput(e.target.value)}
                                  placeholder="番号を入力..."
                                  className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white font-mono text-xl focus:outline-none focus:border-red-500 min-w-0"
                                />
                                <button
                                  onClick={() => {`;

content = content.replace(target, replacement);

const targetBtnClass = `className="px-6 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold cursor-pointer transition-colors"`;
const replacementBtnClass = `className="px-6 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold cursor-pointer transition-colors shrink-0"`;
content = content.replace(targetBtnClass, replacementBtnClass);

fs.writeFileSync('app/page.tsx', content);
