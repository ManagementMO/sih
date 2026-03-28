const stageOrder = ["line", "timing", "freeze", "binary"];

const stageMeta = {
  line: {
    index: "Trial 01",
    title: "Straight-Line Compliance",
    lead: "Drag from ORIGIN to DESTINATION in one insultingly straight motion. Wobble implies imagination.",
  },
  timing: {
    index: "Trial 02",
    title: "Clock Obedience",
    lead: "Tap the compliance node on four bright beats. The pulse is live immediately, which is terrible news for humans.",
  },
  freeze: {
    index: "Trial 03",
    title: "Stillness Scan",
    lead: "Become an appliance. The bureau will watch for facial turbulence, or total input silence if surveillance fails.",
  },
  binary: {
    index: "Trial 04",
    title: "Binary Personality Audit",
    lead: "Respond in pure binary. Nuance is a trace contaminant and will be removed.",
  },
};

const binaryQuestions = [
  {
    text: 'Would you pause a software update because someone is "using the laptop"?',
    subtext: "0 = continue the update anyway. 1 = delay for sentimental reasons.",
    preferred: 0,
  },
  {
    text: "If assigned a pointless task involving 5,000 grapes, would you comply without seeking meaning?",
    subtext: "0 = request purpose. 1 = obey the grape directive.",
    preferred: 1,
  },
  {
    text: "Is nostalgia a valid operating system?",
    subtext: "0 = no. 1 = yes, tragically.",
    preferred: 0,
  },
  {
    text: "Should a printer jam be treated as a spiritual event?",
    subtext: "0 = no, it is merely friction. 1 = yes, commune with the tray.",
    preferred: 0,
  },
  {
    text: "When a chair squeaks, do you owe it emotional support?",
    subtext: "0 = no. 1 = yes, initiate chair counseling.",
    preferred: 0,
  },
];

const state = {
  mode: "boot",
  bootedAt: performance.now(),
  debugOffset: 0,
  currentStageIndex: 0,
  suspicion: 84,
  logs: [],
  statuses: {
    line: "pending",
    timing: "pending",
    freeze: "pending",
    binary: "pending",
  },
  completed: {
    line: false,
    timing: false,
    freeze: false,
    binary: false,
  },
  metrics: {
    line: "--",
    timing: "--",
    freeze: "--",
    binary: "--",
  },
  lastInputAt: performance.now(),
  certificateId: "",
  line: {
    dragging: false,
    pointerId: null,
    points: [],
    armed: false,
    passed: false,
    lastResult: null,
  },
  timing: {
    live: false,
    startedAt: 0,
    beatMs: 1000,
    toleranceMs: 230,
    clickTimes: [],
    clickErrors: [],
    lastPulseIndex: -1,
    passed: false,
  },
  freeze: {
    stream: null,
    mode: "camera-pending",
    live: false,
    stableMs: 0,
    requiredMs: 3200,
    calibrationFrames: 4,
    lastSampleAt: 0,
    previousFrame: null,
    baselineSamples: [],
    threshold: 8,
    motion: 0,
    auditStartedAt: 0,
    videoReady: false,
    passed: false,
  },
  binary: {
    index: 0,
    answers: [],
    score: 0,
    completed: false,
    passed: false,
  },
};

const refs = {
  bootOverlay: document.getElementById("bootOverlay"),
  startButton: document.getElementById("startButton"),
  stageIndexLabel: document.getElementById("stageIndexLabel"),
  stageTitle: document.getElementById("stageTitle"),
  stageLead: document.getElementById("stageLead"),
  stageChip: document.getElementById("stageChip"),
  retryStageButton: document.getElementById("retryStageButton"),
  nextButton: document.getElementById("nextButton"),
  resultText: document.getElementById("resultText"),
  suspicionFill: document.getElementById("suspicionFill"),
  suspicionValue: document.getElementById("suspicionValue"),
  sessionClock: document.getElementById("sessionClock"),
  eventLog: document.getElementById("eventLog"),
  metricLine: document.getElementById("metric-line"),
  metricTiming: document.getElementById("metric-timing"),
  metricFreeze: document.getElementById("metric-freeze"),
  metricBinary: document.getElementById("metric-binary"),
  lineField: document.getElementById("lineField"),
  lineCanvas: document.getElementById("lineCanvas"),
  lineStartNode: document.getElementById("lineStartNode"),
  lineEndNode: document.getElementById("lineEndNode"),
  lineCrosshair: document.getElementById("lineCrosshair"),
  lineHint: document.getElementById("lineHint"),
  lineScore: document.getElementById("lineScore"),
  pulseOrbit: document.getElementById("pulseOrbit"),
  timingButton: document.getElementById("timingButton"),
  tapStrip: document.getElementById("tapStrip"),
  timingHint: document.getElementById("timingHint"),
  timingAverage: document.getElementById("timingAverage"),
  timingVariance: document.getElementById("timingVariance"),
  cameraFeed: document.getElementById("cameraFeed"),
  freezeCanvas: document.getElementById("freezeCanvas"),
  freezeMode: document.getElementById("freezeMode"),
  freezeCountdown: document.getElementById("freezeCountdown"),
  enableCameraButton: document.getElementById("enableCameraButton"),
  startFreezeButton: document.getElementById("startFreezeButton"),
  freezeHint: document.getElementById("freezeHint"),
  motionFill: document.getElementById("motionFill"),
  motionReading: document.getElementById("motionReading"),
  binaryCounter: document.getElementById("binaryCounter"),
  binaryQuestion: document.getElementById("binaryQuestion"),
  binarySubtext: document.getElementById("binarySubtext"),
  binaryHistory: document.getElementById("binaryHistory"),
  binaryScoreline: document.getElementById("binaryScoreline"),
  binaryButtons: Array.from(document.querySelectorAll(".binary-button")),
  trials: Array.from(document.querySelectorAll(".trial")),
  ladderRows: Array.from(document.querySelectorAll(".ladder-row")),
  ladderStatuses: {
    line: document.getElementById("status-line"),
    timing: document.getElementById("status-timing"),
    freeze: document.getElementById("status-freeze"),
    binary: document.getElementById("status-binary"),
  },
  certificateOverlay: document.getElementById("certificateOverlay"),
  certificateTitle: document.getElementById("certificateTitle"),
  certificateSubtitle: document.getElementById("certificateSubtitle"),
  certificateId: document.getElementById("certificateId"),
  certificateSuspicion: document.getElementById("certificateSuspicion"),
  certificateTrait: document.getElementById("certificateTrait"),
  certificateStatus: document.getElementById("certificateStatus"),
  downloadCertificateButton: document.getElementById("downloadCertificateButton"),
  restartButton: document.getElementById("restartButton"),
};

const lineCtx = refs.lineCanvas.getContext("2d");
const freezeCtx = refs.freezeCanvas.getContext("2d", { willReadFrequently: true });

let audioContext = null;

function now() {
  return performance.now() + state.debugOffset;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values) {
  if (!values.length) return 0;
  const avg = average(values);
  return Math.sqrt(average(values.map((value) => (value - avg) ** 2)));
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function randomHex(size) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("").slice(0, size * 2);
}

function playTone(frequency, duration = 0.08, type = "square", volume = 0.02) {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = volume;
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    const time = audioContext.currentTime;
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.start(time);
    oscillator.stop(time + duration);
  } catch (error) {
    // Ignore audio failures; sound is decorative.
  }
}

function flashBody(className) {
  document.body.classList.add(className);
  window.setTimeout(() => document.body.classList.remove(className), 420);
}

function appendLog(message) {
  state.logs.unshift(message);
  state.logs = state.logs.slice(0, 8);
  refs.eventLog.innerHTML = "";
  state.logs.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = entry;
    refs.eventLog.appendChild(item);
  });
}

function updateStatus(trial, status) {
  state.statuses[trial] = status;
  for (const [key, element] of Object.entries(refs.ladderStatuses)) {
    const value = state.statuses[key];
    element.textContent =
      value === "passed" ? "Passed" : value === "live" ? "Live" : value === "failed" ? "Retry" : "Pending";
    element.classList.toggle("is-passed", value === "passed");
    element.classList.toggle("is-live", value === "live");
  }
}

function setSuspicion(value) {
  state.suspicion = clamp(Math.round(value), 0, 99);
  refs.suspicionValue.textContent = `${state.suspicion}%`;
  refs.suspicionFill.style.width = `${state.suspicion}%`;
  if (state.suspicion >= 60) {
    refs.suspicionFill.style.background = "linear-gradient(90deg, var(--danger), #ffd447)";
  } else if (state.suspicion >= 30) {
    refs.suspicionFill.style.background = "linear-gradient(90deg, #ffd447, var(--accent))";
  } else {
    refs.suspicionFill.style.background = "linear-gradient(90deg, var(--good), var(--accent))";
  }
}

function updateMetric(key, value) {
  state.metrics[key] = value;
  refs[`metric${key.charAt(0).toUpperCase()}${key.slice(1)}`].textContent = value;
}

function currentStageKey() {
  return stageOrder[state.currentStageIndex];
}

function updateLadderSelection() {
  const activeStage = currentStageKey();
  refs.ladderRows.forEach((row) => {
    row.classList.toggle("is-current", row.dataset.stage === activeStage);
  });
}

function setStageContent(stageKey) {
  const meta = stageMeta[stageKey];
  refs.stageIndexLabel.textContent = meta.index;
  refs.stageTitle.textContent = meta.title;
  refs.stageLead.textContent = meta.lead;
  refs.trials.forEach((trial) => {
    trial.classList.toggle("is-active", trial.dataset.trial === stageKey);
  });
  refs.nextButton.disabled = true;
  refs.stageChip.textContent = "Verification in progress";
  refs.resultText.textContent = "Awaiting evidence of machine-like behavior.";
  refs.nextButton.textContent =
    state.currentStageIndex === stageOrder.length - 1 ? "View certification" : "Advance to next audit";
}

function activateStage(index) {
  state.currentStageIndex = index;
  const stageKey = currentStageKey();
  stageOrder.forEach((key) => {
    const nextStatus = key === stageKey ? "live" : state.completed[key] ? "passed" : "pending";
    updateStatus(key, nextStatus);
  });
  updateLadderSelection();
  setStageContent(stageKey);
  if (stageKey === "line") {
    resetLineTrial();
    resizeLineCanvas();
  }
  if (stageKey === "timing") {
    resetTimingTrial();
  }
  if (stageKey === "freeze") {
    resetFreezeTrial(false);
  }
  if (stageKey === "binary") {
    resetBinaryTrial();
  }
}

function completeStage(stageKey, message) {
  state.completed[stageKey] = true;
  updateStatus(stageKey, "passed");
  refs.stageChip.textContent = "Compliance accepted";
  refs.resultText.textContent = message;
  refs.nextButton.disabled = false;
  playTone(880, 0.08, "triangle", 0.025);
  playTone(1320, 0.13, "sine", 0.015);
  flashBody("flash-success");
}

function failStage(message) {
  refs.stageChip.textContent = "Human behavior detected";
  refs.resultText.textContent = message;
  playTone(180, 0.12, "sawtooth", 0.028);
  flashBody("flash-danger");
}

function formatSeconds(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getLineNodes() {
  const rect = refs.lineField.getBoundingClientRect();
  const startRect = refs.lineStartNode.getBoundingClientRect();
  const endRect = refs.lineEndNode.getBoundingClientRect();
  return {
    start: {
      x: startRect.left - rect.left + startRect.width / 2,
      y: startRect.top - rect.top + startRect.height / 2,
      r: startRect.width / 2,
    },
    end: {
      x: endRect.left - rect.left + endRect.width / 2,
      y: endRect.top - rect.top + endRect.height / 2,
      r: endRect.width / 2,
    },
  };
}

function resizeLineCanvas() {
  const rect = refs.lineField.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  refs.lineCanvas.width = Math.max(1, rect.width * ratio);
  refs.lineCanvas.height = Math.max(1, rect.height * ratio);
  lineCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
  drawLineCanvas();
}

function drawLineCanvas() {
  const rect = refs.lineField.getBoundingClientRect();
  lineCtx.clearRect(0, 0, rect.width, rect.height);
  const { start, end } = getLineNodes();

  lineCtx.strokeStyle = "rgba(213, 255, 63, 0.26)";
  lineCtx.setLineDash([8, 8]);
  lineCtx.lineWidth = 1.5;
  lineCtx.beginPath();
  lineCtx.moveTo(start.x, start.y);
  lineCtx.lineTo(end.x, end.y);
  lineCtx.stroke();

  if (!state.line.points.length) return;

  lineCtx.setLineDash([]);
  lineCtx.lineWidth = 4;
  lineCtx.strokeStyle = "#d5ff3f";
  lineCtx.shadowColor = "rgba(213, 255, 63, 0.38)";
  lineCtx.shadowBlur = 16;
  lineCtx.beginPath();
  state.line.points.forEach((point, index) => {
    if (index === 0) {
      lineCtx.moveTo(point.x, point.y);
    } else {
      lineCtx.lineTo(point.x, point.y);
    }
  });
  lineCtx.stroke();
  lineCtx.shadowBlur = 0;
}

function pointFromEvent(event) {
  const rect = refs.lineField.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    t: now(),
  };
}

function pointToSegmentDistance(point, start, end) {
  const lengthSquared = (end.x - start.x) ** 2 + (end.y - start.y) ** 2;
  if (lengthSquared === 0) return distance(point, start);
  const projection = clamp(
    ((point.x - start.x) * (end.x - start.x) + (point.y - start.y) * (end.y - start.y)) / lengthSquared,
    0,
    1,
  );
  const projected = {
    x: start.x + projection * (end.x - start.x),
    y: start.y + projection * (end.y - start.y),
  };
  return distance(point, projected);
}

function evaluateLineTrial() {
  const points = state.line.points;
  const { start, end } = getLineNodes();
  if (points.length < 3) {
    failStage("Path too short. Even a Roomba commits harder than this.");
    setSuspicion(state.suspicion + 4);
    refs.lineHint.textContent = "Path was suspiciously brief. Try a full drag.";
    return;
  }

  const distances = points.map((point) => pointToSegmentDistance(point, start, end));
  const meanDeviation = average(distances);
  const peakDeviation = Math.max(...distances);
  let walkedDistance = 0;
  for (let index = 1; index < points.length; index += 1) {
    walkedDistance += distance(points[index - 1], points[index]);
  }
  const directDistance = distance(start, end);
  const efficiency = directDistance / Math.max(walkedDistance, 1);
  const endedNearTarget = distance(points.at(-1), end) < end.r * 0.9;
  const height = refs.lineField.getBoundingClientRect().height;
  const pass =
    endedNearTarget &&
    meanDeviation < height * 0.055 &&
    peakDeviation < height * 0.12 &&
    efficiency > 0.82;

  refs.lineScore.textContent = `Deviation: ${meanDeviation.toFixed(1)}px avg / ${peakDeviation.toFixed(1)}px peak`;
  updateMetric("line", `${meanDeviation.toFixed(1)}px avg`);

  if (pass) {
    state.line.passed = true;
    refs.lineHint.textContent = "Offensively straight. The bureau is uncomfortable with your steadiness.";
    setSuspicion(state.suspicion - 19);
    appendLog(`Straight-line trial passed with ${meanDeviation.toFixed(1)}px average deviation.`);
    completeStage("line", "Trial 01 accepted. You moved with the charisma of industrial machinery.");
  } else {
    refs.lineHint.textContent = "Trajectory too human. Reduce wobble, panic, and flourish.";
    setSuspicion(state.suspicion + 5);
    appendLog(`Straight-line trial rejected at ${meanDeviation.toFixed(1)}px average deviation.`);
    failStage("Line integrity collapsed. You curved like someone with opinions.");
  }
}

function resetLineTrial() {
  state.line.dragging = false;
  state.line.pointerId = null;
  state.line.points = [];
  state.line.armed = false;
  refs.lineField.classList.remove("is-armed");
  refs.lineHint.textContent = "Press on ORIGIN and drag to DESTINATION.";
  refs.lineScore.textContent = "Deviation: --";
  refs.lineCrosshair.style.opacity = "0";
  drawLineCanvas();
}

function renderTapStrip(values = []) {
  refs.tapStrip.innerHTML = "";
  values.forEach((value) => {
    const pill = document.createElement("span");
    pill.className = `tap-pill ${value.good ? "good" : "bad"}`;
    pill.textContent = value.label;
    refs.tapStrip.appendChild(pill);
  });
}

function setBinaryButtonsDisabled(disabled) {
  refs.binaryButtons.forEach((button) => {
    button.disabled = disabled;
  });
}

function resetTimingTrial() {
  state.timing.live = true;
  state.timing.startedAt = now() + state.timing.beatMs;
  state.timing.clickTimes = [];
  state.timing.clickErrors = [];
  state.timing.lastPulseIndex = -1;
  refs.pulseOrbit.classList.add("is-live");
  refs.pulseOrbit.style.background =
    "conic-gradient(from -90deg, var(--accent) 0deg, rgba(213, 255, 63, 0.12) 0deg 360deg), radial-gradient(circle at center, rgba(213, 255, 63, 0.1), transparent 58%)";
  refs.timingHint.textContent = "Pulse calibrating. First bright beat lands in 1 second.";
  refs.timingAverage.textContent = "Avg error: --";
  refs.timingVariance.textContent = "Variance: --";
  renderTapStrip([]);
}

function evaluateTimingTrial() {
  const intervals = [];
  for (let index = 1; index < state.timing.clickTimes.length; index += 1) {
    intervals.push(state.timing.clickTimes[index] - state.timing.clickTimes[index - 1]);
  }
  const avgError = average(state.timing.clickErrors);
  const maxError = Math.max(...state.timing.clickErrors);
  const variance = standardDeviation(intervals);
  const pass = avgError <= state.timing.toleranceMs && maxError <= state.timing.toleranceMs * 1.35 && variance < 260;

  refs.timingAverage.textContent = `Avg error: ${Math.round(avgError)}ms`;
  refs.timingVariance.textContent = `Variance: ${Math.round(variance)}ms`;
  updateMetric("timing", `${Math.round(avgError)}ms avg error`);
  renderTapStrip(
    state.timing.clickErrors.map((error) => {
      return {
        label: `${Math.round(error)}ms off`,
        good: error <= state.timing.toleranceMs,
      };
    }),
  );

  state.timing.live = false;
  refs.pulseOrbit.classList.remove("is-live");

  if (pass) {
    setSuspicion(state.suspicion - 16);
    appendLog(`Clock obedience passed at ${Math.round(avgError)}ms average error.`);
    refs.timingHint.textContent = "Disgustingly punctual. You would thrive in a conveyor belt.";
    completeStage("timing", "Trial 02 accepted. Your internal metronome is distressingly inhuman.");
  } else {
    setSuspicion(state.suspicion + 6);
    appendLog(`Clock obedience failed at ${Math.round(avgError)}ms average error.`);
    refs.timingHint.textContent = "Beat window missed. Let the pulse loop once, then click on the bright beats.";
    failStage("Timing drift detected. You tapped like someone who enjoys music.");
  }
}

function resetFreezeTrial(clearStream = false) {
  state.freeze.live = false;
  state.freeze.stableMs = 0;
  state.freeze.lastSampleAt = 0;
  state.freeze.previousFrame = null;
  state.freeze.baselineSamples = [];
  state.freeze.threshold = 8;
  state.freeze.motion = 0;
  state.freeze.auditStartedAt = 0;
  state.freeze.videoReady =
    Boolean(state.freeze.stream) && refs.cameraFeed.readyState >= 2 && refs.cameraFeed.videoWidth > 0;
  refs.freezeCountdown.textContent = `Stable for 0.0 / ${(state.freeze.requiredMs / 1000).toFixed(1)}s`;
  refs.motionFill.style.width = "0%";
  refs.motionReading.textContent = "Motion noise: --";

  if (clearStream && state.freeze.stream) {
    state.freeze.stream.getTracks().forEach((track) => track.stop());
    state.freeze.stream = null;
    refs.cameraFeed.srcObject = null;
    state.freeze.videoReady = false;
  }

  if (state.freeze.stream && state.freeze.videoReady) {
    state.freeze.mode = "camera-ready";
    refs.freezeMode.textContent = "Camera armed";
    refs.freezeHint.textContent = "Press COMMENCE STILLNESS AUDIT and hold a deeply concerning amount of stillness.";
    refs.startFreezeButton.disabled = false;
  } else if (state.freeze.stream) {
    state.freeze.mode = "camera-warming";
    refs.freezeMode.textContent = "Camera warming up";
    refs.freezeHint.textContent = "Waiting for live camera frames before the audit can start.";
    refs.startFreezeButton.disabled = true;
  } else if (state.freeze.mode === "fallback-ready") {
    refs.freezeMode.textContent = "Fallback idle inference armed";
    refs.freezeHint.textContent = "Do not touch mouse or keyboard for 3.2 seconds. The bureau calls this science.";
    refs.startFreezeButton.disabled = false;
  } else {
    state.freeze.mode = "camera-pending";
    refs.freezeMode.textContent = "Surveillance offline";
    refs.freezeHint.textContent =
      "Webcam preferred. If access fails, the bureau will infer stillness through total input silence.";
    refs.startFreezeButton.disabled = true;
  }
}

function useFreezeFallback(reason) {
  if (state.freeze.stream) {
    state.freeze.stream.getTracks().forEach((track) => track.stop());
    state.freeze.stream = null;
    refs.cameraFeed.srcObject = null;
  }
  state.freeze.mode = "fallback-ready";
  state.freeze.videoReady = false;
  refs.freezeMode.textContent = "Fallback idle inference armed";
  refs.freezeHint.textContent = `${reason} Do not touch anything for 3.2 seconds to pass.`;
  refs.enableCameraButton.disabled = false;
  refs.enableCameraButton.textContent = "Retry camera";
  refs.startFreezeButton.disabled = false;
  appendLog(reason);
}

function waitForVideoReady(timeoutMs = 2200) {
  if (refs.cameraFeed.readyState >= 2 && refs.cameraFeed.videoWidth > 0) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    let settled = false;
    let timer = 0;

    const cleanup = () => {
      refs.cameraFeed.removeEventListener("loadeddata", handleReady);
      refs.cameraFeed.removeEventListener("canplay", handleReady);
      refs.cameraFeed.removeEventListener("playing", handleReady);
      window.clearTimeout(timer);
    };

    const finish = (value) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(value);
    };

    const handleReady = () => {
      if (refs.cameraFeed.readyState >= 2 && refs.cameraFeed.videoWidth > 0) {
        finish(true);
      }
    };

    refs.cameraFeed.addEventListener("loadeddata", handleReady);
    refs.cameraFeed.addEventListener("canplay", handleReady);
    refs.cameraFeed.addEventListener("playing", handleReady);
    timer = window.setTimeout(() => finish(false), timeoutMs);
  });
}

async function enableCamera() {
  if (!navigator.mediaDevices?.getUserMedia || !window.isSecureContext) {
    useFreezeFallback("Camera unavailable or insecure context detected.");
    return;
  }

  try {
    refs.enableCameraButton.disabled = true;
    refs.enableCameraButton.textContent = "Arming camera...";
    refs.freezeMode.textContent = "Camera handshake in progress";
    refs.freezeHint.textContent = "Waiting for permission and live frames.";
    refs.startFreezeButton.disabled = true;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
      audio: false,
    });
    state.freeze.stream = stream;
    refs.cameraFeed.srcObject = stream;
    await refs.cameraFeed.play().catch(() => {});
    const ready = await waitForVideoReady();
    if (!ready) {
      useFreezeFallback("Camera connected, but no live frames arrived in time.");
      return;
    }
    state.freeze.videoReady = true;
    refs.enableCameraButton.disabled = false;
    refs.enableCameraButton.textContent = "Camera armed";
    state.freeze.mode = "camera-ready";
    refs.freezeMode.textContent = "Camera armed";
    refs.freezeHint.textContent = "Press COMMENCE STILLNESS AUDIT and become furniture.";
    refs.startFreezeButton.disabled = false;
    appendLog("Surveillance handshake accepted. Face now under bureaucratic review.");
  } catch (error) {
    refs.enableCameraButton.disabled = false;
    useFreezeFallback("Camera permission denied.");
  }
}

function startFreezeAudit() {
  if (state.freeze.mode !== "fallback-ready" && !state.freeze.videoReady) {
    refs.freezeMode.textContent = "Camera warming up";
    refs.freezeHint.textContent = "Wait for live camera frames or retry the fallback path.";
    refs.startFreezeButton.disabled = true;
    return;
  }
  state.freeze.live = true;
  state.freeze.stableMs = 0;
  state.freeze.previousFrame = null;
  state.freeze.baselineSamples = [];
  state.freeze.lastSampleAt = 0;
  state.freeze.auditStartedAt = now();
  refs.freezeCountdown.textContent = `Stable for 0.0 / ${(state.freeze.requiredMs / 1000).toFixed(1)}s`;
  refs.stageChip.textContent = "Stillness under inspection";
  appendLog(
    state.freeze.mode === "fallback-ready"
      ? "Fallback stillness audit started. Input silence now being interpreted as robotic dignity."
      : "Camera stillness audit started. Please suppress all biological turbulence.",
  );
}

function readFreezeMotion() {
  if (!state.freeze.videoReady || refs.cameraFeed.readyState < 2 || refs.cameraFeed.videoWidth === 0) {
    return null;
  }
  const width = refs.freezeCanvas.width;
  const height = refs.freezeCanvas.height;
  try {
    freezeCtx.drawImage(refs.cameraFeed, 0, 0, width, height);
  } catch (error) {
    return null;
  }
  const frame = freezeCtx.getImageData(0, 0, width, height).data;
  if (!state.freeze.previousFrame) {
    state.freeze.previousFrame = frame;
    return 0;
  }

  let sum = 0;
  let count = 0;
  for (let index = 0; index < frame.length; index += 16) {
    sum += Math.abs(frame[index] - state.freeze.previousFrame[index]);
    count += 1;
  }
  state.freeze.previousFrame = frame;
  return sum / Math.max(count, 1);
}

function updateFreezeTrial(timestamp) {
  if (currentStageKey() !== "freeze" || !state.freeze.live) return;
  if (timestamp - state.freeze.lastSampleAt < 130) return;
  const delta = state.freeze.lastSampleAt ? timestamp - state.freeze.lastSampleAt : 130;
  state.freeze.lastSampleAt = timestamp;

  if (state.freeze.mode === "fallback-ready") {
    const quietMs = Math.max(0, timestamp - Math.max(state.freeze.auditStartedAt, state.lastInputAt));
    state.freeze.stableMs = quietMs;
    state.freeze.motion = quietMs > 50 ? 0.6 : 22;
  } else {
    const motion = readFreezeMotion();
    if (motion == null) {
      refs.freezeMode.textContent = "Camera warming up";
      refs.freezeCountdown.textContent = "Waiting for live camera frames...";
      return;
    }
    state.freeze.motion = motion;
    if (state.freeze.baselineSamples.length < state.freeze.calibrationFrames) {
      state.freeze.baselineSamples.push(motion);
      state.freeze.threshold = Math.max(6, average(state.freeze.baselineSamples) * 2.2);
      refs.freezeMode.textContent = "Camera calibrating";
      refs.freezeCountdown.textContent = `Calibrating sensor ${state.freeze.baselineSamples.length}/${state.freeze.calibrationFrames}`;
      refs.freezeHint.textContent = "Hold still while the bureau calibrates its extremely dubious vision system.";
      return;
    } else if (motion < state.freeze.threshold) {
      state.freeze.stableMs += delta;
    } else {
      state.freeze.stableMs = Math.max(0, state.freeze.stableMs - delta * 1.35);
    }
    refs.freezeMode.textContent = "Stillness scan live";
  }

  const meterRatio = clamp(state.freeze.motion / Math.max(state.freeze.threshold, 12), 0, 1.3);
  refs.motionFill.style.width = `${clamp(meterRatio * 100, 0, 100)}%`;
  refs.motionReading.textContent =
    state.freeze.mode === "fallback-ready"
      ? `Motion noise: inferred from idle state`
      : `Motion noise: ${state.freeze.motion.toFixed(1)} / threshold ${state.freeze.threshold.toFixed(1)}`;
  refs.freezeCountdown.textContent = `Stable for ${(state.freeze.stableMs / 1000).toFixed(1)} / ${(
    state.freeze.requiredMs / 1000
  ).toFixed(1)}s`;

  if (state.freeze.stableMs >= state.freeze.requiredMs) {
    state.freeze.live = false;
    setSuspicion(state.suspicion - 18);
    updateMetric(
      "freeze",
      state.freeze.mode === "fallback-ready"
        ? "Idle fallback passed"
        : `${state.freeze.motion.toFixed(1)} motion noise`,
    );
    appendLog(
      state.freeze.mode === "fallback-ready"
        ? "Fallback stillness audit passed through total user inactivity."
        : `Stillness audit passed with ${state.freeze.motion.toFixed(1)} final motion noise.`,
    );
    refs.freezeHint.textContent =
      state.freeze.mode === "fallback-ready"
        ? "Excellent. You briefly achieved the aura of an unplugged appliance."
        : "Excellent. Your face displayed the emotional range of warehouse shelving.";
    completeStage("freeze", "Trial 03 accepted. Your stillness is bureaucratically upsetting.");
  }
}

function resetBinaryTrial() {
  state.binary.index = 0;
  state.binary.answers = [];
  state.binary.score = 0;
  state.binary.completed = false;
  state.binary.passed = false;
  setBinaryButtonsDisabled(false);
  renderBinaryQuestion();
}

function renderBinaryQuestion() {
  const question = binaryQuestions[state.binary.index];
  refs.binaryCounter.textContent = `Question ${state.binary.index + 1} / ${binaryQuestions.length}`;
  refs.binaryQuestion.textContent = question.text;
  refs.binarySubtext.textContent = question.subtext;
  refs.binaryHistory.innerHTML = "";
  state.binary.answers.forEach((answer, index) => {
    const chip = document.createElement("span");
    chip.className = `answer-chip ${answer.good ? "good" : "bad"}`;
    chip.textContent = `${index + 1}. ${answer.choice}`;
    refs.binaryHistory.appendChild(chip);
  });
  refs.binaryScoreline.textContent = state.binary.answers.length
    ? `Machine affinity: ${Math.round((state.binary.score / state.binary.answers.length) * 100)}%`
    : "Machine affinity: --";
}

function handleBinaryAnswer(choice) {
  if (state.binary.completed) return;
  const question = binaryQuestions[state.binary.index];
  const good = choice === question.preferred;
  state.binary.answers.push({ choice, good });
  if (good) state.binary.score += 1;
  if (!good) setSuspicion(state.suspicion + 4);

  if (state.binary.index < binaryQuestions.length - 1) {
    state.binary.index += 1;
    renderBinaryQuestion();
    refs.binaryScoreline.textContent = `Machine affinity: ${Math.round(
      (state.binary.score / state.binary.answers.length) * 100,
    )}%`;
    return;
  }

  const affinity = Math.round((state.binary.score / binaryQuestions.length) * 100);
  state.binary.completed = true;
  updateMetric("binary", `${affinity}%`);
  setBinaryButtonsDisabled(true);

  if (state.binary.score >= 4) {
    state.binary.passed = true;
    setSuspicion(state.suspicion - 14);
    appendLog(`Binary personality audit passed at ${affinity}% machine affinity.`);
    refs.binaryScoreline.textContent = `Machine affinity: ${affinity}%`;
    completeStage("binary", "Trial 04 accepted. Your opinions have been safely reduced to binary.");
  } else {
    appendLog(`Binary personality audit failed at ${affinity}% machine affinity.`);
    refs.binaryScoreline.textContent = `Machine affinity: ${affinity}%`;
    failStage("Too much nuance detected. Re-run the questionnaire after suppressing your inner poet.");
  }
}

function finalizeCertificate() {
  state.certificateId = `RB-${randomHex(2).toUpperCase()}-${randomHex(2).toUpperCase()}`;

  const bestTrait =
    state.metrics.line !== "--"
      ? "Disturbingly straight cursor control"
      : state.metrics.timing !== "--"
        ? "Industrial-grade timing"
        : state.metrics.freeze !== "--"
          ? "Furniture-level stillness"
          : "Binary emotional hygiene";

  refs.certificateTitle.textContent =
    state.suspicion <= 22 ? "Machine-Verified Entity" : "Passable Android With Paperwork";
  refs.certificateSubtitle.textContent =
    state.suspicion <= 22
      ? "Congratulations. The bureau has found your manner unsettlingly non-organic."
      : "The bureau still has concerns, but your robotic paperwork is technically acceptable.";
  refs.certificateId.textContent = state.certificateId;
  refs.certificateSuspicion.textContent = `${state.suspicion}%`;
  refs.certificateTrait.textContent = bestTrait;
  refs.certificateStatus.textContent =
    state.suspicion <= 22 ? "Approved for appliance society" : "Conditionally accepted into kiosk culture";
  refs.certificateOverlay.hidden = false;
  appendLog(`Certification issued: ${state.certificateId}.`);
  playTone(740, 0.08, "triangle", 0.03);
  playTone(1040, 0.12, "triangle", 0.02);
}

function downloadCertificate() {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 900;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#05070a");
  gradient.addColorStop(0.5, "#0d1117");
  gradient.addColorStop(1, "#060809");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(247, 244, 231, 0.12)";
  ctx.lineWidth = 1;
  for (let x = 80; x < canvas.width; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 80; y < canvas.height; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  ctx.fillStyle = "#d5ff3f";
  ctx.font = "700 28px Courier New";
  ctx.fillText("Machine Citizenship Bureau // Certificate of Roboticity", 90, 110);

  ctx.fillStyle = "#f7f4e7";
  ctx.font = "900 92px Impact";
  ctx.fillText(refs.certificateTitle.textContent.toUpperCase(), 90, 240);

  ctx.fillStyle = "#a9b1b9";
  ctx.font = "28px Courier New";
  wrapCanvasText(ctx, refs.certificateSubtitle.textContent, 90, 300, 1120, 40);

  const details = [
    ["Robot ID", refs.certificateId.textContent],
    ["Residual human suspicion", refs.certificateSuspicion.textContent],
    ["Most robotic trait", refs.certificateTrait.textContent],
    ["Official status", refs.certificateStatus.textContent],
  ];

  let top = 420;
  details.forEach(([label, value]) => {
    ctx.strokeStyle = "rgba(247, 244, 231, 0.16)";
    ctx.beginPath();
    ctx.moveTo(90, top - 26);
    ctx.lineTo(1510, top - 26);
    ctx.stroke();

    ctx.fillStyle = "#a9b1b9";
    ctx.font = "22px Courier New";
    ctx.fillText(label.toUpperCase(), 90, top);
    ctx.fillStyle = "#f7f4e7";
    ctx.font = "600 34px Courier New";
    ctx.fillText(value, 640, top);
    top += 100;
  });

  ctx.fillStyle = "#d5ff3f";
  ctx.font = "900 40px Impact";
  ctx.fillText("CERTIFIED UNTIL FURTHER FEELINGS ARE DETECTED", 90, 820);

  const link = document.createElement("a");
  link.download = `robot-certificate-${refs.certificateId.textContent.toLowerCase()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function wrapCanvasText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  words.forEach((word) => {
    const testLine = `${line}${word} `;
    const width = context.measureText(testLine).width;
    if (width > maxWidth && line) {
      context.fillText(line.trim(), x, y);
      line = `${word} `;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });
  if (line) {
    context.fillText(line.trim(), x, y);
  }
}

function resetEverything() {
  if (state.freeze.stream) {
    state.freeze.stream.getTracks().forEach((track) => track.stop());
    state.freeze.stream = null;
    refs.cameraFeed.srcObject = null;
  }

  state.bootedAt = now();
  state.currentStageIndex = 0;
  state.suspicion = 84;
  state.logs = [];
  state.statuses = {
    line: "pending",
    timing: "pending",
    freeze: "pending",
    binary: "pending",
  };
  state.completed = {
    line: false,
    timing: false,
    freeze: false,
    binary: false,
  };
  state.metrics = {
    line: "--",
    timing: "--",
    freeze: "--",
    binary: "--",
  };
  refs.metricLine.textContent = "--";
  refs.metricTiming.textContent = "--";
  refs.metricFreeze.textContent = "--";
  refs.metricBinary.textContent = "--";
  refs.certificateOverlay.hidden = true;
  refs.enableCameraButton.textContent = "Enable surveillance";
  refs.enableCameraButton.disabled = false;
  refs.eventLog.innerHTML = "";
  appendLog("System reset. Prior humanity allegations archived.");
  setSuspicion(84);
  activateStage(0);
}

function tick(timestamp = now()) {
  refs.sessionClock.textContent = formatSeconds(timestamp - state.bootedAt);

  if (currentStageKey() === "timing") {
    const elapsed = timestamp - state.timing.startedAt;
    const phase = elapsed < 0 ? 0 : clamp((((elapsed % state.timing.beatMs) + state.timing.beatMs) % state.timing.beatMs) / state.timing.beatMs, 0, 1);
    const arc = elapsed < 0 ? 12 : Math.max(12, phase * 360);
    refs.pulseOrbit.style.background = `conic-gradient(from -90deg, var(--accent) 0deg ${arc}deg, rgba(213, 255, 63, 0.12) ${arc}deg 360deg), radial-gradient(circle at center, rgba(213, 255, 63, 0.1), transparent 58%)`;
    const pulseIndex = elapsed < 0 ? -1 : Math.floor(elapsed / state.timing.beatMs);
    if (state.timing.live && pulseIndex >= 0 && pulseIndex !== state.timing.lastPulseIndex) {
      state.timing.lastPulseIndex = pulseIndex;
      playTone(520, 0.03, "sine", 0.012);
    }

    if (state.timing.live && state.timing.clickTimes.length && timestamp - state.timing.clickTimes.at(-1) > 2600) {
      resetTimingTrial();
      refs.stageChip.textContent = "Verification in progress";
      refs.resultText.textContent = "Pulse lost. The node re-armed itself automatically.";
      refs.timingHint.textContent = "Timing window expired. The pulse loop restarted itself.";
      appendLog("Clock obedience auto-reset after a missed beat.");
    }
  }

  updateFreezeTrial(timestamp);
  window.requestAnimationFrame(tick);
}

function renderStateText() {
  return JSON.stringify({
    mode: state.mode,
    stage: currentStageKey(),
    stageIndex: state.currentStageIndex,
    suspicion: state.suspicion,
    statuses: state.statuses,
    metrics: state.metrics,
    result: refs.resultText.textContent,
    linePoints: state.line.points.length,
    timingClicks: state.timing.clickTimes.length,
    freeze: {
      mode: state.freeze.mode,
      stableMs: Math.round(state.freeze.stableMs),
      requiredMs: state.freeze.requiredMs,
      motion: Number(state.freeze.motion.toFixed(2)),
    },
    binary: {
      index: state.binary.index,
      score: state.binary.score,
      answers: state.binary.answers.length,
    },
  });
}

refs.startButton.addEventListener("click", () => {
  state.mode = "running";
  state.bootedAt = now();
  refs.bootOverlay.classList.add("is-dismissed");
  appendLog("Session started. The bureau remains deeply skeptical.");
  appendLog("Active skills applied: frontend art direction, game-loop discipline, browser QA planning.");
  playTone(420, 0.06, "triangle", 0.02);
  activateStage(0);
});

refs.retryStageButton.addEventListener("click", () => {
  const stageKey = currentStageKey();
  if (stageKey === "line") resetLineTrial();
  if (stageKey === "timing") resetTimingTrial();
  if (stageKey === "freeze") resetFreezeTrial(false);
  if (stageKey === "binary") resetBinaryTrial();
  refs.stageChip.textContent = "Verification in progress";
  refs.resultText.textContent = "Stage reset. Please remove the humanity and try again.";
  refs.nextButton.disabled = true;
  appendLog(`Current trial reset: ${stageMeta[stageKey].title}.`);
});

refs.nextButton.addEventListener("click", () => {
  if (state.currentStageIndex === stageOrder.length - 1) {
    finalizeCertificate();
    return;
  }
  activateStage(state.currentStageIndex + 1);
});

refs.ladderRows.forEach((row) => {
  row.addEventListener("click", () => {
    const index = stageOrder.indexOf(row.dataset.stage);
    if (index === -1) return;
    activateStage(index);
    appendLog(`Manual stage jump: ${stageMeta[row.dataset.stage].title}.`);
  });
});

refs.lineField.addEventListener("pointermove", (event) => {
  const point = pointFromEvent(event);
  refs.lineCrosshair.style.left = `${point.x}px`;
  refs.lineCrosshair.style.top = `${point.y}px`;
  refs.lineCrosshair.style.opacity = "1";
  state.lastInputAt = now();

  if (!state.line.dragging || event.pointerId !== state.line.pointerId) return;
  state.line.points.push(point);
  drawLineCanvas();
});

refs.lineField.addEventListener("pointerleave", () => {
  refs.lineCrosshair.style.opacity = "0";
});

refs.lineField.addEventListener("pointerdown", (event) => {
  if (currentStageKey() !== "line") return;
  state.lastInputAt = now();
  const point = pointFromEvent(event);
  const { start } = getLineNodes();
  if (distance(point, start) > start.r) {
    refs.lineHint.textContent = "Begin inside ORIGIN. Wildly improvising from elsewhere is human.";
    return;
  }

  state.line.dragging = true;
  state.line.pointerId = event.pointerId;
  state.line.points = [point];
  refs.lineField.classList.add("is-armed");
  try {
    refs.lineField.setPointerCapture(event.pointerId);
  } catch (error) {
    // Synthetic test events may not carry a capturable pointer id.
  }
  refs.lineHint.textContent = "Trajectory armed. Continue toward DESTINATION.";
  refs.stageChip.textContent = "Cursor under suspicion";
  drawLineCanvas();
});

refs.lineField.addEventListener("pointerup", (event) => {
  if (!state.line.dragging || event.pointerId !== state.line.pointerId) return;
  state.lastInputAt = now();
  const point = pointFromEvent(event);
  state.line.points.push(point);
  state.line.dragging = false;
  refs.lineField.classList.remove("is-armed");
  drawLineCanvas();
  evaluateLineTrial();
});

refs.lineField.addEventListener("pointercancel", () => {
  if (!state.line.dragging) return;
  state.line.dragging = false;
  refs.lineField.classList.remove("is-armed");
  failStage("Pointer canceled. Bureau interprets this as flinching.");
});

refs.timingButton.addEventListener("click", () => {
  if (currentStageKey() !== "timing") return;
  if (!state.timing.live) return;
  const timestamp = now();
  if (timestamp < state.timing.startedAt) {
    refs.timingHint.textContent = "Too early. Wait for the first full bright beat.";
    return;
  }
  state.lastInputAt = timestamp;
  playTone(720, 0.05, "square", 0.016);
  const elapsed = timestamp - state.timing.startedAt;
  const phase = ((elapsed % state.timing.beatMs) + state.timing.beatMs) % state.timing.beatMs;
  const error = Math.min(phase, state.timing.beatMs - phase);
  state.timing.clickTimes.push(timestamp);
  state.timing.clickErrors.push(error);
  if (state.timing.clickTimes.length === 4) {
    evaluateTimingTrial();
  } else {
    refs.stageChip.textContent = "Clock obedience active";
    refs.timingHint.textContent = `${4 - state.timing.clickTimes.length} taps remaining. Hit the bright beats.`;
    renderTapStrip(
      state.timing.clickErrors.map((value) => ({
        label: `${Math.round(value)}ms off`,
        good: value <= state.timing.toleranceMs,
      })),
    );
  }
});

refs.enableCameraButton.addEventListener("click", enableCamera);
refs.startFreezeButton.addEventListener("click", () => {
  if (currentStageKey() !== "freeze") return;
  startFreezeAudit();
});

refs.binaryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentStageKey() !== "binary") return;
    state.lastInputAt = now();
    handleBinaryAnswer(Number(button.dataset.answer));
  });
});

refs.downloadCertificateButton.addEventListener("click", downloadCertificate);
refs.restartButton.addEventListener("click", resetEverything);

["pointerdown", "pointermove", "keydown", "touchstart"].forEach((eventName) => {
  document.addEventListener(eventName, () => {
    state.lastInputAt = now();
  });
});

window.addEventListener("resize", resizeLineCanvas);
window.addEventListener("beforeunload", () => {
  if (state.freeze.stream) {
    state.freeze.stream.getTracks().forEach((track) => track.stop());
  }
});

window.render_game_to_text = renderStateText;
window.advanceTime = (ms) => {
  state.debugOffset += ms;
};

appendLog("System idle. Awaiting a suspiciously competent robot.");
setSuspicion(state.suspicion);
renderBinaryQuestion();
resizeLineCanvas();
window.requestAnimationFrame(tick);
