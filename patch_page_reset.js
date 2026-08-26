const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const targetResultReset = `                    setJpScore({ j: 0, p: 0 });
                    setActionLogs([]);
                    setHistory([]);
                    setIsRecMode(false);
                    setHasSeenIliLiiLsiSplit(false);`;

const replacementResultReset = `                    setJpScore({ j: 0, p: 0 });
                    setActionLogs([]);
                    setHistory([]);
                    setIsRecMode(false);
                    setHasSeenIliLiiLsiSplit(false);
                    setTrashItems([
                      { id: 1, type: "paper", top: "20%", left: "15%", rot: -15 },
                      { id: 2, type: "can", top: "60%", left: "70%", rot: 45 },
                      { id: 3, type: "bottle", top: "80%", left: "30%", rot: 90 },
                      { id: 4, type: "paper", top: "40%", left: "50%", rot: -5 },
                      { id: 5, type: "can", top: "10%", left: "80%", rot: 180 },
                    ]);
                    setCleanedCount(0);
                    setPlantStage(0);
                    setChappyTension(3);
                    setChappyReaction(null);
                    setSelectedChappyOpt(null);`;

content = content.replace(targetResultReset, replacementResultReset);


const targetExitReset = `  const resetState = () => {
    
    setIsRecMode(false);
    setHasSeenIliLiiLsiSplit(false);
    
    setTopCandidates([]);
    setShowDarlingEnding(false);
  };`;

const replacementExitReset = `  const resetState = () => {
    setStep("title");
    setCurrentQId("q1");
    setIeScores({ Ti: 0, Te: 0, Ni: 0, Ne: 0, Si: 0, Se: 0, Fi: 0, Fe: 0 });
    setPosSignatures(createEmptyPositionSignatures());
    setJpScore({ j: 0, p: 0 });
    setActionLogs([]);
    setHistory([]);
    setIsRecMode(false);
    setHasSeenIliLiiLsiSplit(false);
    setTopCandidates([]);
    setShowDarlingEnding(false);
    setTrashItems([
      { id: 1, type: "paper", top: "20%", left: "15%", rot: -15 },
      { id: 2, type: "can", top: "60%", left: "70%", rot: 45 },
      { id: 3, type: "bottle", top: "80%", left: "30%", rot: 90 },
      { id: 4, type: "paper", top: "40%", left: "50%", rot: -5 },
      { id: 5, type: "can", top: "10%", left: "80%", rot: 180 },
    ]);
    setCleanedCount(0);
    setPlantStage(0);
    setChappyTension(3);
    setChappyReaction(null);
    setSelectedChappyOpt(null);
  };`;

content = content.replace(targetExitReset, replacementExitReset);

fs.writeFileSync('app/page.tsx', content);
