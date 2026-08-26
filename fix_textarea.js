const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const targetArea = `<textarea
                        className="w-full p-4 rounded-xl border border-red-500/50 bg-red-950/50 text-red-100 placeholder-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows={4}
                        placeholder="（正直に書きなさい……）"
                      ></textarea>`;
const replacementArea = `<textarea
                        className="w-full p-4 rounded-xl border border-red-500/50 bg-red-950/50 text-red-100 placeholder-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows={4}
                        placeholder="（正直に書きなさい……）"
                        value={textInputValue}
                        onChange={(e) => setTextInputValue(e.target.value)}
                      ></textarea>`;
content = content.replace(targetArea, replacementArea);

const targetClick = `onClick={() => handleSelectOption(currentQ.options[0])}`;
// Note: only replace the one for the text_input which comes right after the textarea.
const replacementClick = `onClick={() => {
                          handleSelectOption(currentQ.options[0], textInputValue || "（無言）");
                          setTextInputValue("");
                        }}`;

// Let's replace only the one right after text_input.
// I will use regex to find the button inside the text_input block.
const blockTarget = `</textarea>
                    </div>
                    <div className="flex justify-end">
                       <button
                          onClick={() => handleSelectOption(currentQ.options[0])}`;
const blockReplacement = `</textarea>
                    </div>
                    <div className="flex justify-end">
                       <button
                          onClick={() => {
                             handleSelectOption(currentQ.options[0], textInputValue || "（無言）");
                             setTextInputValue("");
                          }}`;
content = content.replace(blockTarget, blockReplacement);

fs.writeFileSync('app/page.tsx', content);
