const types = [
    "ILI",
    "IEI",
    "SEI",
    "SLE",
    "SEE",
    "SLI",
    "ILE",
    "IEE",
  ];
  const isIntrovertedIrrational = (type) => [
    "ILI",
    "IEI",
    "SEI",
    "SLI",
  ].includes(type);

  console.log("Is ILI introverted irrational?", isIntrovertedIrrational("ILI"));
  console.log("Is SLE introverted irrational?", isIntrovertedIrrational("SLE"));
