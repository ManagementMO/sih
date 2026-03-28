const presets = [
  "buy milk",
  "do laundry",
  "answer emails",
  "take a nap",
  "water a plant",
  "book dentist appointment",
];

const buzzwords = [
  "growth hacking",
  "thought leadership",
  "stealth mode",
  "deep work",
  "micro-saas",
  "founder energy",
  "platform shift",
  "market pull",
  "narrative premium",
  "consumer delight",
  "blitzscale responsibly",
  "pre-seed momentum",
];

const categoryWords = ["pipeline", "stack", "ecosystem", "playbook", "engine", "experience layer", "cloud", "flywheel"];
const marketWords = ["adjacency", "surface area", "vertical", "consumer lane", "ops layer", "premium channel", "demand cluster"];
const coachTemplates = [
  "It looks like you're trying to {task}. Have you considered reframing it as a category-defining wedge and scheduling a coffee with investors you met once?",
  "Normal people would simply {task}. You, however, should ship a beta, call it invite-only, and act surprised by the waitlist.",
  "Before you {task}, ask yourself a harder question: can this be expanded into a lifestyle platform with annual recurring confidence?",
  "You are one deck rewrite away from making {task} sound venture-backable. Keep pushing until your relatives stop speaking to you.",
  "I ran the numbers. {task} is too small. You need a broader thesis, louder gradients, and at least one slide labeled Market Map.",
];

const lessonOpeners = [
  "I almost kept this private.",
  "I wasn't going to post this.",
  "This nearly stayed in my notes app.",
  "I debated whether to share this.",
];

const lessonClosers = [
  "The market notices when you choose courage over comfort.",
  "Leadership is mostly timing and dramatic line breaks.",
  "Sometimes scale starts with one mildly embarrassing decision.",
  "If this resonates, you're probably building in the arena too.",
];

const refs = {
  bootScreen: document.getElementById("bootScreen"),
  launchButton: document.getElementById("launchButton"),
  bootDemoButton: document.getElementById("bootDemoButton"),
  autoDemoButton: document.getElementById("autoDemoButton"),
  soundToggle: document.getElementById("soundToggle"),
  confidenceScore: document.getElementById("confidenceScore"),
  taskInput: document.getElementById("taskInput"),
  modeChip: document.getElementById("modeChip"),
  deckTitle: document.getElementById("deckTitle"),
  deckSubtitle: document.getElementById("deckSubtitle"),
  deckBullets: document.getElementById("deckBullets"),
  taglineOne: document.getElementById("taglineOne"),
  taglineTwo: document.getElementById("taglineTwo"),
  taglineThree: document.getElementById("taglineThree"),
  coachQuote: document.getElementById("coachQuote"),
  metricSynergy: document.getElementById("metricSynergy"),
  metricVirality: document.getElementById("metricVirality"),
  metricBurn: document.getElementById("metricBurn"),
  metricLeadership: document.getElementById("metricLeadership"),
  barSynergy: document.getElementById("barSynergy"),
  barVirality: document.getElementById("barVirality"),
  barBurn: document.getElementById("barBurn"),
  barLeadership: document.getElementById("barLeadership"),
  tamValue: document.getElementById("tamValue"),
  runwayValue: document.getElementById("runwayValue"),
  grindValue: document.getElementById("grindValue"),
  pivotValue: document.getElementById("pivotValue"),
  buzzTrack: document.getElementById("buzzTrack"),
  linkedinPost: document.getElementById("linkedinPost"),
  copyPostButton: document.getElementById("copyPostButton"),
  investorMemo: document.getElementById("investorMemo"),
  timeline: document.getElementById("timeline"),
  logList: document.getElementById("logList"),
  presetPills: Array.from(document.querySelectorAll(".preset-pill")),
  modeButtons: Array.from(document.querySelectorAll(".mode-button")),
  soundButtons: Array.from(document.querySelectorAll(".sound-button")),
};

const state = {
  currentPresetIndex: 0,
  currentMode: "disrupt",
  soundEnabled: true,
  audioUnlocked: false,
  logs: [],
};

let audioContext = null;

function hashString(value) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function upperTask(task) {
  return task.replace(/[^a-z0-9 ]/gi, "").trim().toUpperCase() || "TASK";
}

function pick(list, seed, offset = 0) {
  return list[(seed + offset) % list.length];
}

function appendLog(message) {
  state.logs.unshift(message);
  state.logs = state.logs.slice(0, 7);
  refs.logList.innerHTML = "";
  state.logs.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry;
    refs.logList.appendChild(item);
  });
}

function formatMoney(value) {
  return `$${value.toFixed(1)}B`;
}

function buildOutputs(task, mode) {
  const cleanTask = task.trim() || presets[state.currentPresetIndex];
  const seed = hashString(`${cleanTask}:${mode}`);
  const taskLabel = titleCase(cleanTask);
  const quarter = (seed % 4) + 1;
  const title = `Q${quarter} ${upperTask(cleanTask)} ${pick(
    ["ACQUISITION", "ENABLEMENT", "RETENTION", "MONETIZATION", "ALIGNMENT"],
    seed,
    2,
  )} ${pick(["PIPELINE", "STACK", "PLAYBOOK", "MOTION", "CLOUD"], seed, 5)}`;
  const subtitle = `Reimagining ${pick(categoryWords, seed, 8)} strategy for the ${pick(
    marketWords,
    seed,
    12,
  )} around ${cleanTask}.`;
  const synergy = 68 + (seed % 31);
  const virality = 52 + ((seed >> 2) % 43);
  const burn = 140 + ((seed >> 4) % 590);
  const leadershipPosts = 4 + ((seed >> 6) % 15);
  const tam = 4.2 + ((seed % 290) / 10);
  const runway = 6 + ((seed >> 3) % 15);
  const grind = 11 + ((seed >> 5) % 13);
  const pivotValue = pick(
    ["Aggressive", "Investor-calming", "Preloaded", "Stealth-ready", "Narratively bullish"],
    seed,
    21,
  );
  const bullets = [
    `Translate ${cleanTask} into a ${pick(categoryWords, seed, 3)} no family member asked for.`,
    `Unlock ${synergy}% more perceived momentum through narrative compression and gradient density.`,
    `Deploy ${taskLabel} as a premium ${pick(marketWords, seed, 7)} before competitors discover normal behavior.`,
  ];
  const tags = [
    `${pick(["Founder mode", "Stealth mode", "Grind mode", "Deck mode"], seed, 13)}: activated`,
    `${pick(["Thought leadership", "Narrative alpha", "Category gravity", "Conviction capital"], seed, 17)} detected`,
    `${pick(["Runway", "Burn rate", "Virality", "Market timing"], seed, 22)} strategically misunderstood`,
  ];
  const coach = pick(coachTemplates, seed, 1).replace("{task}", cleanTask);
  const linkedin = [
    pick(lessonOpeners, seed, 2),
    "",
    `Today I was supposed to simply ${cleanTask}.`,
    `Instead, I stepped back and asked what the market was really saying.`,
    "",
    "3 lessons:",
    `1. The best founders know that even ${cleanTask} is really about ${pick(buzzwords, seed, 3)}.`,
    `2. If your roadmap does not terrify at least one sensible person, you are probably thinking too small.`,
    `3. Sometimes the biggest unlock is realizing the task was never the task. It was a signal.`,
    "",
    pick(lessonClosers, seed, 5),
  ].join("\n");
  const memo = `This week we transformed ${cleanTask} from a simple action into a durable platform thesis. Early signals suggest strong pull from stakeholders who enjoy saying words like conviction, wedge, and surface area without asking follow-up questions. We remain focused on disciplined chaos, strategic overconfidence, and making ${taskLabel} look inevitable in hindsight.`;
  const timeline = [
    `Week 1: rename ${cleanTask} as a flagship initiative and add a gradient.`,
    `Week 2: schedule an offsite to discuss ${pick(buzzwords, seed, 9)} with unnecessary urgency.`,
    `Week 3: announce a closed beta, then quietly invite the same six friends.`,
    `Week 4: publish a thread about how ${taskLabel} taught us resilience at scale.`,
  ];
  const confidence = 78 + ((seed >> 7) % 21);
  const modeLabel =
    mode === "pivot"
      ? "Pivot in progress"
      : mode === "thoughtleadership"
        ? "Wisdom monetized"
        : mode === "public"
          ? "IPO feelings engaged"
          : "Founder mode activated";

  return {
    cleanTask,
    taskLabel,
    title,
    subtitle,
    bullets,
    tags,
    coach,
    linkedin,
    memo,
    timeline,
    metrics: { synergy, virality, burn, leadershipPosts, tam, runway, grind, pivotValue, confidence },
    modeLabel,
  };
}

function setMetricBar(element, value) {
  element.style.width = `${Math.max(8, Math.min(100, value))}%`;
}

function renderOutputs(task, mode) {
  const output = buildOutputs(task, mode);
  refs.modeChip.textContent = output.modeLabel;
  refs.deckTitle.textContent = output.title;
  refs.deckSubtitle.textContent = output.subtitle;
  refs.deckBullets.innerHTML = "";
  output.bullets.forEach((bullet) => {
    const item = document.createElement("li");
    item.textContent = bullet;
    refs.deckBullets.appendChild(item);
  });

  refs.taglineOne.textContent = output.tags[0];
  refs.taglineTwo.textContent = output.tags[1];
  refs.taglineThree.textContent = output.tags[2];
  refs.coachQuote.textContent = output.coach;
  refs.linkedinPost.value = output.linkedin;
  refs.investorMemo.textContent = output.memo;
  refs.timeline.innerHTML = "";
  output.timeline.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry;
    refs.timeline.appendChild(item);
  });

  refs.metricSynergy.textContent = String(output.metrics.synergy);
  refs.metricVirality.textContent = String(output.metrics.virality);
  refs.metricBurn.textContent = `$${output.metrics.burn}k`;
  refs.metricLeadership.textContent = `${output.metrics.leadershipPosts} posts`;
  refs.tamValue.textContent = formatMoney(output.metrics.tam);
  refs.runwayValue.textContent = `${output.metrics.runway} months`;
  refs.grindValue.textContent = `${output.metrics.grind} hrs/day`;
  refs.pivotValue.textContent = output.metrics.pivotValue;
  refs.confidenceScore.textContent = `${output.metrics.confidence}%`;

  setMetricBar(refs.barSynergy, output.metrics.synergy);
  setMetricBar(refs.barVirality, output.metrics.virality);
  setMetricBar(refs.barBurn, Math.min(100, output.metrics.burn / 7));
  setMetricBar(refs.barLeadership, Math.min(100, output.metrics.leadershipPosts * 6));

  appendLog(`${titleCase(output.cleanTask)} upgraded into ${output.title}.`);
  appendLog(`${output.metrics.confidence}% Series A confidence achieved through typography alone.`);
}

function updatePresetSelection(activeValue) {
  refs.presetPills.forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.preset === activeValue);
  });
}

function populateBuzzTrack() {
  const repeated = [...buzzwords, ...buzzwords].map((word) => `<span>${word}</span>`).join("");
  refs.buzzTrack.innerHTML = repeated;
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  state.audioUnlocked = true;
  return audioContext;
}

function playTone(frequency, duration = 0.12, type = "square", volume = 0.06, startDelay = 0) {
  if (!state.soundEnabled) return;
  const context = ensureAudio();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;
  oscillator.connect(gain);
  gain.connect(context.destination);
  const startAt = context.currentTime + startDelay;
  gain.gain.setValueAtTime(volume, startAt);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration);
}

function playSound(name) {
  if (!state.soundEnabled) return;
  if (name === "airhorn") {
    playTone(440, 0.2, "sawtooth", 0.06);
    playTone(660, 0.24, "square", 0.05, 0.02);
  } else if (name === "drop") {
    playTone(120, 0.28, "sawtooth", 0.08);
    playTone(84, 0.34, "triangle", 0.08, 0.08);
    playTone(540, 0.12, "square", 0.04, 0.14);
  } else if (name === "cash") {
    playTone(790, 0.08, "triangle", 0.05);
    playTone(1080, 0.08, "triangle", 0.05, 0.07);
    playTone(1320, 0.1, "triangle", 0.05, 0.14);
  } else {
    playTone(520, 0.08, "square", 0.04);
  }
}

function generate(mode = state.currentMode, withSound = true) {
  state.currentMode = mode;
  const task = refs.taskInput.value.trim() || presets[state.currentPresetIndex];
  refs.taskInput.value = task;
  renderOutputs(task, mode);
  updatePresetSelection(task);
  if (withSound) {
    playSound(mode === "public" ? "airhorn" : mode === "thoughtleadership" ? "cash" : "drop");
  }
}

function cyclePreset() {
  state.currentPresetIndex = (state.currentPresetIndex + 1) % presets.length;
  const next = presets[state.currentPresetIndex];
  refs.taskInput.value = next;
  updatePresetSelection(next);
  generate("public");
}

async function copyPost() {
  const value = refs.linkedinPost.value;
  try {
    await navigator.clipboard.writeText(value);
    appendLog("LinkedIn post copied. HR morale downgraded.");
  } catch (error) {
    refs.linkedinPost.focus();
    refs.linkedinPost.select();
    appendLog("Clipboard denied. Post selected manually like it is still 2016.");
  }
  playSound("cash");
}

refs.launchButton.addEventListener("click", () => {
  refs.bootScreen.classList.add("is-hidden");
  generate("disrupt");
  appendLog("2016.exe booted. Ethical restraint offline.");
});

refs.bootDemoButton.addEventListener("click", () => {
  refs.taskInput.value = presets[0];
  updatePresetSelection(presets[0]);
  refs.bootScreen.classList.add("is-hidden");
  generate("public");
  appendLog("Sample hype loaded for immediate investor theater.");
});

refs.autoDemoButton.addEventListener("click", cyclePreset);

refs.soundToggle.addEventListener("click", () => {
  state.soundEnabled = !state.soundEnabled;
  refs.soundToggle.textContent = `Sound: ${state.soundEnabled ? "On" : "Off"}`;
  if (state.soundEnabled) {
    playSound("cash");
    appendLog("Sound restored. Taste level unchanged.");
  } else {
    appendLog("Sound muted. Dubstep remains spiritually active.");
  }
});

refs.modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    generate(button.dataset.mode);
  });
});

refs.presetPills.forEach((pill, index) => {
  pill.addEventListener("click", () => {
    state.currentPresetIndex = index;
    refs.taskInput.value = pill.dataset.preset;
    updatePresetSelection(pill.dataset.preset);
    appendLog(`${titleCase(pill.dataset.preset)} selected as the next victim.`);
  });
});

refs.soundButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playSound(button.dataset.sound);
    appendLog(`${titleCase(button.dataset.sound)} deployed to intensify founder confidence.`);
  });
});

refs.copyPostButton.addEventListener("click", copyPost);

["pointerdown", "keydown", "touchstart"].forEach((eventName) => {
  document.addEventListener(
    eventName,
    () => {
      if (!state.audioUnlocked && state.soundEnabled) {
        try {
          ensureAudio();
        } catch (error) {
          // Audio is decorative; ignore failures.
        }
      }
    },
    { passive: true },
  );
});

populateBuzzTrack();
updatePresetSelection("buy milk");
generate("disrupt", false);
appendLog("System ready. Awaiting one ordinary task to overbrand.");
