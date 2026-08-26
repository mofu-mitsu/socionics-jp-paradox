const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `                                  if (smartphoneInput === "110") {
                                    if (currentQ.options && currentQ.options.length > 1) {
                                      alert("【SYSTEM ERROR 404】\\n通報は遮断されました。\\n\\n侵入者はあなたの【防衛本能】そのものです。\\n即座に境界線を確保してください。");
                                      handleSelectOption(currentQ.options[1]);
                                    }
                                  } else if (smartphoneInput === "119") {
                                    if (currentQ.options && currentQ.options.length > 1) {
                                      alert("【SYSTEM ERROR 404】\\n消防車ではなく……芋虫消防車が到着しました。🚒🐛");
                                      triggerCaterpillarInvasion("🚒🐛");
                                      setShowDarlingEnding(true);
                                    }
                                  } else {
                                    if (currentQ.options && currentQ.options.length > 1) {
                                      alert("【SYSTEM ERROR 404】\\n通報は遮断されました。\\nLSI芋虫につながりました……🐛");
                                      triggerCaterpillarInvasion("🐛");
                                      setShowDarlingEnding(true);
                                    }
                                  }`;

const replacement = `                                  if (smartphoneInput === "110") {
                                    if (currentQ.options && currentQ.options.length > 1) {
                                      setDarlingEndingState("police");
                                      setShowDarlingEnding(true);
                                      setTimeout(() => { triggerCaterpillarInvasion("🐛"); }, 1500);
                                    }
                                  } else if (smartphoneInput === "119") {
                                    if (currentQ.options && currentQ.options.length > 1) {
                                      setDarlingEndingState("fire");
                                      setShowDarlingEnding(true);
                                      triggerCaterpillarInvasion("🚒🐛");
                                    }
                                  } else {
                                    if (currentQ.options && currentQ.options.length > 1) {
                                      setDarlingEndingState("police");
                                      setShowDarlingEnding(true);
                                      triggerCaterpillarInvasion("🐛");
                                    }
                                  }`;

content = content.replace(target, replacement);

const target2 = `                       alert("【SYSTEM ERROR 404】\\n通報は遮断されました。\\n\\n侵入者はあなたの【防衛本能】そのものです。\\n即座に境界線を確保してください。");
                       triggerCaterpillarInvasion("🐛");`;

const replacement2 = `                       setDarlingEndingState("police");
                       setTimeout(() => { triggerCaterpillarInvasion("🐛"); }, 1500);`;

content = content.replace(target2, replacement2);

fs.writeFileSync('app/page.tsx', content);
