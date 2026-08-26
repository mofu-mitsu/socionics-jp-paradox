const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf-8');

const target = `  const [approximateQIndex, setApproximateQIndex] = useState(0);
  const [topCandidates, setTopCandidates] = useState<SocionicsType[]>([]);`;

const replacement = `  const [approximateQIndex, setApproximateQIndex] = useState(0);
  const [topCandidates, setTopCandidates] = useState<SocionicsType[]>([]);
  const [selectedApproxTypes, setSelectedApproxTypes] = useState<SocionicsType[]>([]);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [showSmartphoneInput, setShowSmartphoneInput] = useState(false);
  const [smartphoneInput, setSmartphoneInput] = useState("");`;

content = content.replace(target, replacement);
fs.writeFileSync('app/page.tsx', content);
