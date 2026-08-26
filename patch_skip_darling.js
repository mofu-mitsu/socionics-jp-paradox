const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `    } else {
      if (hasSeenDarlingLiar) {
        triggerConfetti();
        setStep("result");
      } else {
        setHasSeenDarlingLiar(true);
        setCurrentQId("q_darling_liar");
      }
    }`;

const replacement = `    } else {
      triggerConfetti();
      setStep("result");
    }`;

content = content.replace(target, replacement);

fs.writeFileSync('app/page.tsx', content);
