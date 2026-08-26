const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

content = content.replace('  RotateCcw,\n} from "lucide-react";', '  RotateCcw,\n  Volume2,\n  VolumeX,\n  Smartphone,\n} from "lucide-react";');

fs.writeFileSync('app/page.tsx', content);
