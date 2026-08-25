const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = 'alert("ダーリンちゃんが満面の笑みで婚姻届を出してきた！")';
const replacement = `{
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
                        cat.innerHTML = '🐛<br/><div style="font-size: 10px; color: red; background: black; padding: 2px; white-space: nowrap;">' + msgs[i%2] + '</div>';
                        cat.style.position = 'absolute';
                        cat.style.left = Math.random() * 100 + 'vw';
                        cat.style.top = Math.random() * 100 + 'vh';
                        cat.style.transform = \`scale(\${Math.random() * 1.5 + 0.5})\`;
                        cat.style.animation = \`pulse \${Math.random() + 0.5}s infinite alternate\`;
                        container.appendChild(cat);
                      }
                      alert("ダーリンちゃん「ふふ♡ 選択を誤ったわね♡」");
                  }`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    content = content.replace('逃げる', '110番に通報する');
    fs.writeFileSync('app/page.tsx', content);
    console.log("REPLACED SUCCESS");
} else {
    console.log("NOT FOUND");
}
