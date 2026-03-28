const elements = {
  launchButton: document.getElementById("launchButton"),
  launchOverlay: document.getElementById("launchOverlay"),
  appShell: document.getElementById("appShell"),
  taskForm: document.getElementById("taskForm"),
  taskInput: document.getElementById("taskInput"),
  disruptButton: document.getElementById("disruptButton"),
  presetButtons: Array.from(document.querySelectorAll("[data-task]")),
  startupTag: document.getElementById("startupTag"),
  startupTitle: document.getElementById("startupTitle"),
  startupSubtitle: document.getElementById("startupSubtitle"),
  elevatorPitch: document.getElementById("elevatorPitch"),
  talkingPoints: document.getElementById("talkingPoints"),
  marketConfidence: document.getElementById("marketConfidence"),
  modeBadge: document.getElementById("modeBadge"),
  soundState: document.getElementById("soundState"),
  synergyMetric: document.getElementById("synergyMetric"),
  grindMetric: document.getElementById("grindMetric"),
  tamMetric: document.getElementById("tamMetric"),
  burnMetric: document.getElementById("burnMetric"),
  thoughtMetric: document.getElementById("thoughtMetric"),
  viralMetric: document.getElementById("viralMetric"),
  chartBars: document.getElementById("chartBars"),
  investorQuote: document.getElementById("investorQuote"),
  feedList: document.getElementById("feedList"),
  clippyMood: document.getElementById("clippyMood"),
  clippyAdvice: document.getElementById("clippyAdvice"),
  humblebragOutput: document.getElementById("humblebragOutput"),
  tickerTrack: document.getElementById("tickerTrack"),
  toastStack: document.getElementById("toastStack"),
  pivotButton: document.getElementById("pivotButton"),
  aiButton: document.getElementById("aiButton"),
  b2bButton: document.getElementById("b2bButton"),
  raiseSeedButton: document.getElementById("raiseSeedButton"),
  linkedinButton: document.getElementById("linkedinButton"),
  grindButton: document.getElementById("grindButton"),
  airhornButton: document.getElementById("airhornButton"),
  dubstepButton: document.getElementById("dubstepButton"),
  copyDeckButton: document.getElementById("copyDeckButton"),
  copyBragButton: document.getElementById("copyBragButton"),
};

const keywordMap = {
  buy: ["Acquisition", "Procurement", "Commerce"],
  milk: ["Dairy", "Calcium", "Shelf Life"],
  do: ["Execution", "Operational"],
  laundry: ["Textile Refresh", "Garment Turnaround", "Fabric Ops"],
  call: ["Stakeholder Sync", "Voice Touchpoint", "Retention"],
  mom: ["Family Stakeholder", "Core Household", "Legacy Network"],
  empty: ["Zero-Inbox", "Streamlined", "Lean"],
  inbox: ["Message Surface", "Async Outreach", "Communication Layer"],
  groceries: ["Nutrient Logistics", "Pantry Infrastructure", "Shelf Ops"],
  clean: ["Sanitation", "Surface Recovery", "Dust Removal"],
  dishes: ["Ceramic Reset", "Kitchenware Recovery", "Plate Infrastructure"],
  laundry: ["Textile Refresh", "Garment Turnaround", "Fabric Ops"],
  taxes: ["Revenue Compliance", "Regulatory Surrender", "Cashflow Resolution"],
  gym: ["Human Performance", "Strength Ops", "Body Optimization"],
  study: ["Knowledge Acceleration", "Exam Readiness", "Learning Velocity"],
  meeting: ["Alignment Ceremony", "Stakeholder Convergence", "Calendar Theater"],
  cook: ["Heat-to-Table", "Nutrient Fabrication", "Founder Cuisine"],
  book: ["Knowledge Asset", "Paperback IP", "Narrative Surface"],
  sleep: ["Founder Recharge", "Circadian Capital", "Rest Ops"],
  code: ["Engineering Velocity", "Ship Cadence", "Bug Reduction"],
  bug: ["Defect", "Quality Surface", "Stability Event"],
  room: ["Spatial Surface", "Residential Footprint", "Domestic Environment"],
  apartment: ["Residential Platform", "Urban Footprint", "Rental Layer"],
  paper: ["Knowledge Deliverable", "Research Artifact", "Slide Fuel"],
  presentation: ["Narrative Surface", "Keynote Motion", "Deck Layer"],
};

const pitchOpeners = [
  "A vertically integrated",
  "A founder-led",
  "A category-defining",
  "A full-stack",
  "A relentless",
];

const pitchDomains = [
  "household logistics platform",
  "domestic execution cloud",
  "consumer behavior operating system",
  "high-velocity lifestyle stack",
  "offline-to-online habit engine",
];

const pitchClosers = [
  "designed to unlock premium human throughput.",
  "for teams, families, and overstimulated founders.",
  "with enterprise-grade urgency and no patience for nuance.",
  "that scales one ordinary errand into recurring meaning.",
  "built for a world that refuses to stay pre-product-market-fit.",
];

const taglines = [
  "Founder-led upside with a suspiciously confident roadmap.",
  "Moving fast and renaming basic life admin.",
  "Backed by vibes, hustle, and a deeply fake TAM.",
  "Turning chores into category creation one slide at a time.",
  "Powered by jargon, pressure, and premium delusion.",
];

const monetizationModels = [
  "subscription-led domestic transformation",
  "a premium enterprise household tier",
  "brand-safe calcium adjacency revenue",
  "freemium urgency with upsellable accountability",
  "thought-leadership-enabled transaction fees",
];

const talkingPointStarters = [
  "Expand the moat around",
  "Accelerate distribution for",
  "Operationalize the future of",
  "Reframe the narrative around",
  "Unlock omnichannel momentum for",
];

const talkingPointFinishers = [
  "without diluting founder DNA.",
  "before incumbents notice the whitespace.",
  "while preserving high-intent velocity.",
  "through narrative-first execution.",
  "in a market that is emotionally ready.",
];

const clippyLines = {
  disrupt: [
    "It looks like you're doing a basic human errand. Have you tried calling it a platform?",
    "Users do not want groceries. They want a frictionless nutrient acquisition layer.",
    "I converted your chore into a category-defining movement. You're welcome.",
  ],
  pivot: [
    "A second pivot shows maturity. A third pivot shows vision.",
    "If the task still makes sense, you have not pivoted hard enough.",
    "Say the word 'platform' three more times and investors will feel safer.",
  ],
  ai: [
    "This task had no moat. Adding AI was an act of mercy.",
    "An AI layer is cheaper than having a real strategy. For now.",
    "If this doesn't include machine learning, your slide deck is just a diary.",
  ],
  b2b: [
    "Consumer is messy. Enterprise buyers love pretending chores are workflows.",
    "Wonderful. Normal people were too price sensitive anyway.",
    "Nothing heals a weak idea like invoicing another company for it.",
  ],
  seed: [
    "A twelve-million-dollar seed round should cover at least six weeks of delusion.",
    "Excellent. Burn the money on branded hoodies and one impossible hire.",
    "Pre-revenue is just stealth confidence with better snacks.",
  ],
  linkedin: [
    "The post is perfect. It says nothing, but with leadership spacing.",
    "You don't need outcomes when you have numbered lessons.",
    "I added fake humility so the brag can travel farther.",
  ],
  grind: [
    "Your circadian rhythm is now a blocker. Grind through it.",
    "Wellness is what happens after Series B. Stay focused.",
    "If this doesn't become a keynote slide, why are you even doing it?",
  ],
  utility: [
    "Airhorn deployed. The product now sounds more funded.",
    "Dubstep added. The roadmap has become physically louder.",
    "Every great company begins with one regrettable audio choice.",
  ],
};

const investorQuotes = [
  "This is exactly the kind of deranged conviction we look for at pre-seed.",
  "I have no idea what this does, but the energy suggests a large round.",
  "Finally, a company brave enough to industrialize a tiny inconvenience.",
  "The TAM appears fictional, which means the upside is probably enormous.",
  "I hate this, which tells me the market may love it.",
];

const tickerFragments = [
  "SERIES A ENERGY DETECTED",
  "THOUGHT LEADERSHIP OPPORTUNITY UNLOCKED",
  "STEALTH MODE COMPROMISED",
  "VC SENTENCES INCREASING",
  "BURN RATE TRENDING ARTISTIC",
  "HUMAN LANGUAGE BELOW SAFE THRESHOLD",
  "CATEGORY CREATION CONTINUES WITHOUT CONSENT",
  "ENTERPRISE INTEREST RUMORED BY ONE GUY ON LINKEDIN",
];

const feedFragments = [
  "Founder posted a selfie with the roadmap and called it transparency.",
  "Three advisors joined after hearing the phrase 'household infrastructure layer.'",
  "Internal memo confirms the vibe is now 'default alive.'",
  "A design sprint produced seven gradients and no answers.",
  "Customer discovery replaced with louder fonts and a stronger jawline.",
  "One investor asked for traction. Team provided conviction instead.",
];

const lessonVerbs = [
  "Scale begins at",
  "Leadership means choosing",
  "Operators win when they see",
  "Momentum compounds around",
  "Execution gets clearer near",
];

const lessonObjects = [
  "the shelf",
  "the rinse cycle",
  "the family calendar",
  "the inbox edge",
  "the checkout line",
  "the kitchen counter",
];

const moodModes = [
  "Founder mode: activated",
  "Founder mode: keynote ready",
  "Founder mode: caffeinated",
  "Founder mode: irrationally confident",
  "Founder mode: shipping narrative",
];

const marketStates = [
  "Market confidence: irrational",
  "Market confidence: euphoric",
  "Market confidence: suspiciously bullish",
  "Market confidence: unreasonably founder-led",
  "Market confidence: impossible to justify",
];

const suffixes = ["Pipeline", "Platform", "Stack", "Cloud", "OS", "Engine", "Protocol"];

const barLabels = ["Narrative", "Moat", "Velocity", "Burn", "Aura"];

const state = {
  launched: false,
  task: "buy milk",
  modifiers: {
    pivot: 0,
    ai: 0,
    b2b: 0,
    seed: 0,
    linkedin: 0,
    grind: 0,
  },
  audioContext: null,
  audioArmed: false,
  deck: null,
};

function hashString(input) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function pick(list, seed) {
  return list[seed % list.length];
}

function titleCase(value) {
  return value.replace(/\b\w/g, (match) => match.toUpperCase());
}

function normalizeTask(value) {
  return (value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function slugTask(task) {
  return normalizeTask(task).replace(/[^a-z0-9]+/g, " ").trim();
}

function transformWord(word, index, seed) {
  const options = keywordMap[word];
  if (options && options.length) {
    return options[(seed + index) % options.length];
  }
  return titleCase(word);
}

function buildCorePhrase(task, seed) {
  const cleaned = slugTask(task);
  if (!cleaned) {
    return "Domestic Disruption";
  }

  const words = cleaned.split(" ").filter(Boolean);
  const transformed = words.slice(0, 3).map((word, index) => transformWord(word, index, seed));
  return transformed.join(" ");
}

function formatMoney(value) {
  return `$${value.toLocaleString("en-US")}`;
}

function formatPercent(value) {
  return `${Math.round(value)}%`;
}

function buildLinkedInPost(task, deck, seed) {
  const normalized = normalizeTask(task) || "doing one ordinary thing";
  const lessons = Array.from({ length: 3 }, (_, index) => {
    const opener = pick(lessonVerbs, seed + index * 3);
    const object = pick(lessonObjects, seed + index * 5);
    return `${index + 1}. ${opener} ${object} when the market gets noisy.`;
  });

  return [
    `I almost gave up on ${normalized} today.`,
    "",
    "But hard moments reveal what leadership actually looks like when the market gets weird.",
    "",
    "3 lessons this taught me:",
    ...lessons,
    "",
    "Honored to keep learning, shipping, and staying close to the customer.",
    `#leadership #founderjourney #disruption #${deck.hashtags.join(" #")}`,
  ].join("\n");
}

function buildDeck(task, trigger = "disrupt") {
  const normalizedTask = normalizeTask(task) || "buy milk";
  const seedBase = hashString(
    `${normalizedTask}|${JSON.stringify(state.modifiers)}|${trigger}`
  );
  const corePhrase = buildCorePhrase(normalizedTask, seedBase);
  const modifierWeight =
    state.modifiers.pivot * 4 +
    state.modifiers.ai * 5 +
    state.modifiers.b2b * 6 +
    state.modifiers.seed * 7 +
    state.modifiers.linkedin * 3 +
    state.modifiers.grind * 5;

  const titlePrefixOptions = ["Q3", "Stealth", "Founder-Led", "Series-A-Ready", "Next-Gen"];
  const titlePrefix =
    state.modifiers.seed > 0
      ? "Series-A-Ready"
      : pick(titlePrefixOptions, seedBase + modifierWeight);

  let titleSuffix = pick(suffixes, seedBase + 11);
  if (state.modifiers.ai > 0) {
    titleSuffix = "Intelligence Layer";
  } else if (state.modifiers.b2b > 0) {
    titleSuffix = "Enterprise Suite";
  } else if (state.modifiers.pivot > 1) {
    titleSuffix = "Protocol";
  }

  const title = `${titlePrefix} ${corePhrase} ${titleSuffix}`;
  const tagline = pick(taglines, seedBase + 7);
  const monetization = pick(monetizationModels, seedBase + 9);
  const elevatorPitch = `${pick(pitchOpeners, seedBase)} ${pick(
    pitchDomains,
    seedBase + 3
  )} focused on ${normalizedTask}, monetized through ${monetization}, ${pick(
    pitchClosers,
    seedBase + 5
  )}`;

  const synergy = clamp(68 + (seedBase % 18) + modifierWeight, 72, 99);
  const grind = clamp(54 + ((seedBase >> 2) % 20) + state.modifiers.grind * 7 + state.modifiers.seed * 3, 57, 99);
  const tam = 24 + (seedBase % 34) + state.modifiers.seed * 16 + state.modifiers.b2b * 9;
  const burn = 9600 + (seedBase % 9000) + modifierWeight * 620;
  const thought = clamp(48 + ((seedBase >> 3) % 28) + state.modifiers.linkedin * 10 + state.modifiers.ai * 4, 50, 99);
  const viral = clamp(52 + ((seedBase >> 5) % 34) + state.modifiers.pivot * 6 + state.modifiers.linkedin * 5, 55, 99);
  const marketConfidence = pick(marketStates, seedBase + modifierWeight);
  const modeBadge = pick(moodModes, seedBase + state.modifiers.grind + state.modifiers.seed);
  const clippyAdvice = pick(
    clippyLines[trigger] || clippyLines.disrupt,
    seedBase + modifierWeight
  );
  const clippyMood = state.modifiers.seed > 0 ? "TERM SHEET ENABLER" : "TOXIC MENTOR ONLINE";
  const investorQuote = pick(investorQuotes, seedBase + state.modifiers.seed * 2);

  const talkingPoints = Array.from({ length: 4 }, (_, index) => {
    const starter = pick(talkingPointStarters, seedBase + index * 2);
    const finisher = pick(talkingPointFinishers, seedBase + index * 7);
    return `${starter} ${normalizedTask} ${finisher}`;
  });

  const bars = [synergy, grind, thought, clamp(100 - burn / 350, 24, 86), viral].map(
    (value, index) => ({
      label: barLabels[index],
      value,
      accent: index % 2 === 0 ? "cyan" : "alt",
    })
  );

  const hashtags = [
    corePhrase.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, ""),
    state.modifiers.ai > 0 ? "aifirst" : "operators",
    state.modifiers.b2b > 0 ? "enterprise" : "velocity",
    state.modifiers.seed > 0 ? "funding" : "execution",
  ].filter(Boolean);

  const feed = [
    `${title} entered the group chat with a ${formatPercent(viral)} viral loop potential.`,
    pick(feedFragments, seedBase + 2),
    `Investor update: ${marketConfidence.replace("Market confidence: ", "")}.`,
    `${normalizedTask} has been renamed for keynote safety.`,
  ];

  const ticker = [
    ...tickerFragments,
    `${corePhrase.toUpperCase()} NARRATIVE ACCELERATING`,
    `${formatMoney(burn)}/DAY BURN RATE ACCEPTED AS CULTURE`,
    `HUSTLE INDEX AT ${grind}`,
    `${title.toUpperCase()} ENTERS ADVISOR WHISPER NETWORK`,
  ];

  const deck = {
    task: normalizedTask,
    title,
    tag: `${titlePrefix.toUpperCase()} ${corePhrase.toUpperCase()}`,
    subtitle: tagline,
    elevatorPitch,
    talkingPoints,
    metrics: {
      synergy,
      grind,
      tam: `$${tam}B`,
      burn: `${formatMoney(burn)}/day`,
      thought,
      viral,
    },
    marketConfidence,
    modeBadge,
    clippyAdvice,
    clippyMood,
    investorQuote,
    bars,
    feed,
    ticker,
    hashtags,
  };

  deck.linkedin = buildLinkedInPost(normalizedTask, deck, seedBase);
  return deck;
}

function animateNumber(element, target) {
  const start = Number(element.dataset.value || 0);
  const duration = 420;
  const startTime = performance.now();

  function step(now) {
    const progress = clamp((now - startTime) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (target - start) * eased);
    element.textContent = String(value);
    element.dataset.value = String(value);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function renderList(element, items) {
  element.replaceChildren();
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    fragment.appendChild(listItem);
  });
  element.appendChild(fragment);
}

function renderChart(bars) {
  elements.chartBars.replaceChildren();
  const fragment = document.createDocumentFragment();

  bars.forEach((bar) => {
    const wrapper = document.createElement("div");
    wrapper.className = "chart-bar";

    const value = document.createElement("div");
    value.className = "chart-value";
    value.textContent = `${Math.round(bar.value)}`;

    const column = document.createElement("div");
    column.className = "chart-column";

    const fill = document.createElement("div");
    fill.className = `chart-fill ${bar.accent === "alt" ? "alt" : ""}`.trim();
    fill.style.setProperty("--fill", String(bar.value));
    column.appendChild(fill);

    const label = document.createElement("div");
    label.className = "chart-label";
    label.textContent = bar.label;

    wrapper.append(value, column, label);
    fragment.appendChild(wrapper);
  });

  elements.chartBars.appendChild(fragment);
}

function renderTicker(items) {
  const doubled = [...items, ...items];
  elements.tickerTrack.replaceChildren();
  const fragment = document.createDocumentFragment();
  doubled.forEach((item) => {
    const entry = document.createElement("span");
    entry.className = "ticker-item";
    entry.textContent = item;
    fragment.appendChild(entry);
  });
  elements.tickerTrack.appendChild(fragment);
}

function showToast(title, copy) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="toast-title">${title}</span><div class="toast-copy">${copy}</div>`;
  elements.toastStack.prepend(toast);

  while (elements.toastStack.children.length > 4) {
    elements.toastStack.lastElementChild.remove();
  }

  window.setTimeout(() => {
    toast.remove();
  }, 3600);
}

function renderDeck(deck) {
  state.deck = deck;

  elements.startupTag.textContent = deck.tag;
  elements.startupTitle.textContent = deck.title;
  elements.startupSubtitle.textContent = deck.subtitle;
  elements.elevatorPitch.textContent = deck.elevatorPitch;
  renderList(elements.talkingPoints, deck.talkingPoints);

  elements.marketConfidence.textContent = deck.marketConfidence;
  elements.modeBadge.textContent = deck.modeBadge;

  animateNumber(elements.synergyMetric, deck.metrics.synergy);
  animateNumber(elements.grindMetric, deck.metrics.grind);
  elements.tamMetric.textContent = deck.metrics.tam;
  elements.burnMetric.textContent = deck.metrics.burn;
  animateNumber(elements.thoughtMetric, deck.metrics.thought);
  animateNumber(elements.viralMetric, deck.metrics.viral);

  renderChart(deck.bars);

  elements.investorQuote.textContent = `“${deck.investorQuote}”`;
  renderList(elements.feedList, deck.feed);
  elements.clippyMood.textContent = deck.clippyMood;
  elements.clippyAdvice.textContent = deck.clippyAdvice;
  elements.humblebragOutput.value = deck.linkedin;
  renderTicker(deck.ticker);
}

function renderSoundState() {
  elements.soundState.textContent = state.audioArmed
    ? "Sound: armed and dangerous"
    : "Sound: arms on first click";
}

function ensureAudio() {
  if (!window.AudioContext && !window.webkitAudioContext) {
    elements.soundState.textContent = "Sound: browser said no";
    return null;
  }

  if (!state.audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioCtor();
  }

  if (state.audioContext.state === "suspended") {
    state.audioContext.resume().catch(() => null);
  }

  state.audioArmed = true;
  renderSoundState();
  return state.audioContext;
}

function playTone({
  frequency = 440,
  duration = 0.2,
  type = "sawtooth",
  gain = 0.06,
  startTime = 0,
  endFrequency = frequency,
}) {
  const context = ensureAudio();
  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const now = context.currentTime + startTime;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.linearRampToValueAtTime(endFrequency, now + duration);

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.exponentialRampToValueAtTime(gain, now + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}

function playSequence(notes) {
  notes.forEach((note) => playTone(note));
}

function playStartupDing() {
  playSequence([
    { frequency: 440, duration: 0.12, type: "triangle", gain: 0.04, startTime: 0 },
    { frequency: 660, duration: 0.2, type: "triangle", gain: 0.05, startTime: 0.12 },
  ]);
}

function playPivotSound() {
  playSequence([
    { frequency: 560, duration: 0.08, type: "square", gain: 0.035, startTime: 0 },
    { frequency: 320, duration: 0.12, type: "sawtooth", gain: 0.05, startTime: 0.08, endFrequency: 220 },
  ]);
}

function playAiSound() {
  playSequence([
    { frequency: 240, duration: 0.12, type: "triangle", gain: 0.04, startTime: 0 },
    { frequency: 720, duration: 0.18, type: "square", gain: 0.04, startTime: 0.1 },
    { frequency: 960, duration: 0.08, type: "square", gain: 0.03, startTime: 0.24 },
  ]);
}

function playSeedSound() {
  playSequence([
    { frequency: 660, duration: 0.08, type: "triangle", gain: 0.04, startTime: 0 },
    { frequency: 880, duration: 0.1, type: "triangle", gain: 0.04, startTime: 0.08 },
    { frequency: 1170, duration: 0.24, type: "sine", gain: 0.03, startTime: 0.18 },
  ]);
}

function playNotificationSound() {
  playSequence([
    { frequency: 520, duration: 0.08, type: "triangle", gain: 0.035, startTime: 0 },
    { frequency: 740, duration: 0.14, type: "triangle", gain: 0.035, startTime: 0.1 },
  ]);
}

function playAirhorn() {
  playSequence([
    { frequency: 180, duration: 0.35, type: "sawtooth", gain: 0.08, startTime: 0, endFrequency: 210 },
    { frequency: 240, duration: 0.3, type: "square", gain: 0.05, startTime: 0.03, endFrequency: 270 },
  ]);
}

function playDubstep() {
  playSequence([
    { frequency: 120, duration: 0.16, type: "sawtooth", gain: 0.08, startTime: 0, endFrequency: 70 },
    { frequency: 180, duration: 0.12, type: "square", gain: 0.06, startTime: 0.18, endFrequency: 120 },
    { frequency: 130, duration: 0.22, type: "sawtooth", gain: 0.08, startTime: 0.35, endFrequency: 90 },
  ]);
}

function updateTaskIfNeeded(nextTask) {
  const normalized = normalizeTask(nextTask || elements.taskInput.value || state.task);
  state.task = normalized || "buy milk";
  elements.taskInput.value = state.task;
  return state.task;
}

function applyTrigger(trigger, toastCopy, soundEffect) {
  const task = updateTaskIfNeeded();
  const deck = buildDeck(task, trigger);
  renderDeck(deck);

  if (typeof soundEffect === "function") {
    soundEffect();
  }

  showToast(trigger.toUpperCase(), toastCopy);
}

function launchExperience() {
  state.launched = true;
  document.body.classList.add("launched");
  elements.appShell.setAttribute("aria-hidden", "false");
  elements.launchOverlay.setAttribute("aria-hidden", "true");
  renderSoundState();
  elements.taskInput.focus();
  playStartupDing();
  showToast("Founder Mode", "Desktop experience initialized. Human language fading.");
}

async function copyText(text, successTitle) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "absolute";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }

  showToast(successTitle, "Copied to clipboard for immediate personal-brand misuse.");
  playNotificationSound();
}

function renderStateText() {
  if (!state.deck) {
    return "2016.exe is idle.";
  }

  return [
    `Task: ${state.deck.task}`,
    `Title: ${state.deck.title}`,
    `Pitch: ${state.deck.elevatorPitch}`,
    `Synergy: ${state.deck.metrics.synergy}`,
    `Burn: ${state.deck.metrics.burn}`,
    `Advice: ${state.deck.clippyAdvice}`,
  ].join("\n");
}

elements.launchButton.addEventListener("click", () => {
  ensureAudio();
  launchExperience();
});

elements.taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.modifiers = {
    pivot: 0,
    ai: 0,
    b2b: 0,
    seed: 0,
    linkedin: 0,
    grind: 0,
  };
  applyTrigger(
    "disrupt",
    "Task successfully reframed as a category-defining platform.",
    playStartupDing
  );
});

elements.presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    elements.taskInput.value = button.dataset.task || "";
    state.modifiers = {
      pivot: 0,
      ai: 0,
      b2b: 0,
      seed: 0,
      linkedin: 0,
      grind: 0,
    };
    applyTrigger(
      "disrupt",
      `${button.dataset.task} has been upgraded for keynote compatibility.`,
      playStartupDing
    );
  });
});

elements.pivotButton.addEventListener("click", () => {
  state.modifiers.pivot += 1;
  applyTrigger("pivot", "Narrative shifted. Accountability postponed.", playPivotSound);
});

elements.aiButton.addEventListener("click", () => {
  state.modifiers.ai += 1;
  applyTrigger("ai", "AI layer activated. Strategy remains optional.", playAiSound);
});

elements.b2bButton.addEventListener("click", () => {
  state.modifiers.b2b += 1;
  applyTrigger("b2b", "Enterprise positioning applied. Consumer clarity removed.", playPivotSound);
});

elements.raiseSeedButton.addEventListener("click", () => {
  state.modifiers.seed += 1;
  applyTrigger("seed", "A fictional twelve-million-dollar round just closed.", playSeedSound);
});

elements.linkedinButton.addEventListener("click", () => {
  state.modifiers.linkedin += 1;
  applyTrigger("linkedin", "The post is live. Mutuals are pretending to be inspired.", playNotificationSound);
});

elements.grindButton.addEventListener("click", () => {
  state.modifiers.grind += 1;
  applyTrigger("grind", "Wellness deferred. Founder energy maxed out.", playDubstep);
});

elements.airhornButton.addEventListener("click", () => {
  playAirhorn();
  showToast("AIRHORN", "Product-market fit has become acoustically mandatory.");
  const deck = buildDeck(updateTaskIfNeeded(), "utility");
  renderDeck(deck);
});

elements.dubstepButton.addEventListener("click", () => {
  playDubstep();
  showToast("DUBSTEP", "Deck soundtrack upgraded from bad to spiritually illegal.");
  const deck = buildDeck(updateTaskIfNeeded(), "utility");
  renderDeck(deck);
});

elements.copyDeckButton.addEventListener("click", () => {
  const text = renderStateText();
  copyText(text, "Pitch Deck");
});

elements.copyBragButton.addEventListener("click", () => {
  copyText(elements.humblebragOutput.value, "LinkedIn Post");
});

renderDeck(buildDeck(state.task, "disrupt"));
renderSoundState();
window.render_game_to_text = renderStateText;
window.generateDeckForTask = (task) => buildDeck(task, "disrupt");
