const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

// 1. Add states for text_input and image modal
content = content.replace(
  /const \[darlingEndingState, setDarlingEndingState\] = useState<"initial" | "invading" | "police" | "fire">("initial");/,
  `const [darlingEndingState, setDarlingEndingState] = useState<"initial" | "invading" | "police" | "fire">("initial");
  const [textInputValue, setTextInputValue] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);`
);

// 2. Modify handleSelectOption to take optional custom text
content = content.replace(
  /const handleSelectOption = \(option: Option\) => {/,
  `const handleSelectOption = (option: Option, customText?: string) => {`
);

content = content.replace(
  /const newLogs = \[\n\s*\.\.\.actionLogs,\n\s*\{\n*\s*q: qText,\n*\s*a: option\.text,\n*\s*reason: option\.reasonTag \|\| \"\",\n*\s*\},\n\s*\];/,
  `const newLogs = [
      ...actionLogs,
      { q: qText, a: customText || option.text, reason: option.reasonTag || "" },
    ];`
);

// 3. Update the text_input render block
const textInputRegex = /<textarea[\s\S]*?<\/textarea>/;
content = content.replace(textInputRegex, 
  `<textarea
      className="w-full p-4 rounded-xl border border-red-500/50 bg-red-950/50 text-red-100 placeholder-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500"
      rows={4}
      placeholder="（正直に書きなさい……）"
      value={textInputValue}
      onChange={(e) => setTextInputValue(e.target.value)}
   ></textarea>`);

content = content.replace(
  /onClick=\{\(\) => handleSelectOption\(currentQ\.options\[0\]\)\}/,
  `onClick={() => {
     handleSelectOption(currentQ.options[0], textInputValue || "（無言）");
     setTextInputValue("");
   }}`
);

// 4. Randomize approximate options using useMemo
// We need to import useMemo if not already imported, but let's check first.
