const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target1 = `  const handleMbtiSubmit = () => {
    const match = rawMbtiInput.match(/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP|ILE|SEI|ESE|LII|EIE|LSI|SLE|IEI|SEE|ILI|LIE|ESI|LSE|EII|IEE|SLI)/i,
    );
    if (match) {
      setDetectedMbti(match[1].toUpperCase());
    } else {
      setDetectedMbti(null);
    }
    setStep("quiz");
  };`;

const replacement1 = `  const handleMbtiSubmit = () => {
    const mbtiMatch = rawMbtiInput.match(/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP)/i);
    const socioMatch = rawMbtiInput.match(/(ILE|SEI|ESE|LII|EIE|LSI|SLE|IEI|SEE|ILI|LIE|ESI|LSE|EII|IEE|SLI)/i);
    
    if (mbtiMatch) {
      setDetectedMbti(mbtiMatch[1].toUpperCase());
    } else if (socioMatch) {
      setDetectedMbti(socioMatch[1].toUpperCase());
    } else {
      setDetectedMbti(null);
    }
    setStep("quiz");
  };`;

content = content.replace(target1, replacement1);

// UI側の表示も直す
const target2 = `{rawMbtiInput
                          .match(
                            /(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP|ILE|SEI|ESE|LII|EIE|LSI|SLE|IEI|SEE|ILI|LIE|ESI|LSE|EII|IEE|SLI)/i,
                          )?.[1]
                          ?.toUpperCase() || "特定中（未検出）"}`;

const replacement2 = `{(rawMbtiInput.match(/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP)/i)?.[1] || rawMbtiInput.match(/(ILE|SEI|ESE|LII|EIE|LSI|SLE|IEI|SEE|ILI|LIE|ESI|LSE|EII|IEE|SLI)/i)?.[1])?.toUpperCase() || "特定中（未検出）"}`;

content = content.replace(target2, replacement2);

fs.writeFileSync('app/page.tsx', content);
