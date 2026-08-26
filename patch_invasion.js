const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `      cat.style.transition = 'all ' + (2 + Math.random()*3) + 's ease-in';
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
    }, 4500);`;

const replacement = `      cat.style.transition = 'all ' + (4 + Math.random()*4) + 's ease-in';
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
    }, 8500);`;

content = content.replace(target, replacement);
fs.writeFileSync('app/page.tsx', content);
