const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const replacement = `
  const playClickSound = () => {
    if (isSoundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.stop(audioCtx.currentTime + 0.1);
      } catch (e) {}
    }
  };

  const triggerCaterpillarInvasion = (emoji: string) => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);
    
    const msgs = ["境界線確保。侵入継続。", "領土侵犯ヲ確認。占領プロセスヲ実行中..."];
    
    for(let i=0; i<30; i++) {
      const cat = document.createElement('div');
      cat.innerHTML = emoji + '<br/><div style="font-size: 10px; color: red; background: black; padding: 2px; white-space: nowrap;">' + msgs[i%2] + '</div>';
      cat.style.position = 'absolute';
      cat.style.left = Math.random() * 100 + 'vw';
      cat.style.top = -20 + 'vh';
      cat.style.transition = 'all ' + (2 + Math.random()*3) + 's ease-in';
      cat.style.fontSize = (20 + Math.random()*40) + 'px';
      container.appendChild(cat);
      
      setTimeout(() => {
        cat.style.top = 120 + 'vh';
        cat.style.transform = 'rotate(' + (Math.random()*360) + 'deg)';
      }, 50);
    }
    
    setTimeout(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      setShowNextAfterInvasion(true);
    }, 4500);
  };
`;

content = content.replace('const handleMbtiSubmit = () => {', replacement + '\n  const handleMbtiSubmit = () => {');
fs.writeFileSync('app/page.tsx', content);
