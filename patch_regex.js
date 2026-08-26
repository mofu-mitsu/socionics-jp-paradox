const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');
content = content.replace(
  `/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP)/i,`,
  `/(INTJ|INTP|INFJ|INFP|ISTJ|ISTP|ISFJ|ISFP|ENTJ|ENTP|ENFJ|ENFP|ESTJ|ESTP|ESFJ|ESFP|ILE|SEI|ESE|LII|EIE|LSI|SLE|IEI|SEE|ILI|LIE|ESI|LSE|EII|IEE|SLI)/i,`
);
fs.writeFileSync('app/page.tsx', content);
