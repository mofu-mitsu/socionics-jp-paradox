const fs = require('fs');
let content = fs.readFileSync('lib/questions.ts', 'utf8');

const targetStr = "気になって落ち着かないので片付ける',\n        reasonTag: '【状況3】気になって落ち着かない";

const idx1 = content.indexOf(targetStr);
const idx2 = content.indexOf('// --- 心理設問9：締め切りと着手 ---', idx1);

if (idx1 > -1 && idx2 > -1) {
  const before = content.slice(0, idx1 + targetStr.length);
  const after = content.slice(idx2);
  const insert = `',
        ieDeltas: { Te: 1.0, Si: 1.0 },
        positionDeltas: {},
        jpDelta: { j: 1.0, p: 0 },
        nextId: 'q6'
      }
    ]
  },

  `;
  fs.writeFileSync('lib/questions.ts', before + insert + after, 'utf8');
  console.log('Successfully replaced corrupted region');
} else {
  console.log('Could not find indices', idx1, idx2);
}
