const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const targetLogic = `    } else {
      if (currentQId !== "q_darling_intercom") { setCurrentQId("q_darling_intercom"); } else { triggerConfetti(); setStep("result"); }                      
    }`;

const replacementLogic = `    } else {
      if (currentQId !== "q_darling_intercom") { setCurrentQId("q_darling_liar"); } else { triggerConfetti(); setStep("result"); }                      
    }`;

content = content.replace(targetLogic, replacementLogic);
fs.writeFileSync('app/page.tsx', content);
