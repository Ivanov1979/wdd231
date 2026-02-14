const $ = (s) => document.querySelector(s);

function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b !== 0) [a, b] = [b, a % b];
    return a;
}

function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

function simplify(n, d) {
    const g = gcd(n, d);
    const nn = n / g;
    const dd = d / g;
    return { n: nn, d: dd };
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeFraction(maxD) {
    const d = randInt(2, maxD);
    const n = randInt(1, d - 1);
    return { n, d };
}

function makeLikePair(maxD) {
    const d = randInt(2, maxD);
    return {
        a: { n: randInt(1, d - 1), d },
        b: { n: randInt(1, d - 1), d }
    };
}

function makeUnlikePair(maxD) {
    let a = makeFraction(maxD);
    let b = makeFraction(maxD);
    while (a.d === b.d) b = makeFraction(maxD);
    return { a, b };
}

function compute(a, b, op) {
    const common = lcm(a.d, b.d);
    const fa = common / a.d;
    const fb = common / b.d;

    const aEq = { n: a.n * fa, d: common };
    const bEq = { n: b.n * fb, d: common };

    const rawN = op === "add" ? aEq.n + bEq.n : aEq.n - bEq.n;
    const rawD = common;
    const simp = simplify(rawN, rawD);

    return { common, aEq, bEq, raw: { n: rawN, d: rawD }, simp };
}

function fracToString(f) {
    return `${f.n}/${f.d}`;
}

function parseFraction(input) {
    const m = input.trim().match(/^(-?\d+)\s*\/\s*(\d+)$/);
    if (!m) return null;
    const n = Number(m[1]);
    const d = Number(m[2]);
    if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return null;
    return simplify(n, d);
}

function equalFrac(a, b) {
    return a.n === b.n && a.d === b.d;
}

async function getTemplates() {
    try {
        const mod = await import("../data/templates.mjs");
        return mod.templates;
    } catch (err) {
        console.error(err);
        return { apply: [], pbl: [] };
    }
}

let templates = null;
let current = null;

let score = Number(localStorage.getItem("finalScore") || "0");
function setScore() {
    $("#score").textContent = String(score);
    localStorage.setItem("finalScore", String(score));
}

function pick(list) {
    return list[randInt(0, list.length - 1)];
}

function fillStory(story, a, b) {
    return story.replace("{a}", fracToString(a)).replace("{b}", fracToString(b));
}

function buildApplyProblem(t) {
    const pair = t.denom === "like" ? makeLikePair(t.maxD) : makeUnlikePair(t.maxD);
    let a = pair.a;
    let b = pair.b;

    if (t.type === "sub") {
        const test = compute(a, b, "sub");
        if (test.raw.n < 0) [a, b] = [b, a];
    }

    const opSymbol = t.type === "add" ? "+" : "−";
    const prompt = `${fracToString(a)} ${opSymbol} ${fracToString(b)}`;
    const work = compute(a, b, t.type);

    return { mode: "apply", type: t.type, denom: t.denom, a, b, prompt, expected: work.simp, work };
}

function buildPblProblem(t) {
    const pair = makeUnlikePair(12);
    let a = pair.a;
    let b = pair.b;

    if (t.type === "sub") {
        const test = compute(a, b, "sub");
        if (test.raw.n < 0) [a, b] = [b, a];
    }

    const prompt = fillStory(t.story, a, b);
    const work = compute(a, b, t.type);

    return { mode: "pbl", type: t.type, denom: "unlike", a, b, prompt, expected: work.simp, work };
}

function renderSteps(p) {
    const opSymbol = p.type === "add" ? "+" : "−";
    const lines = [
        `LCM(${p.a.d}, ${p.b.d}) = ${p.work.common}`,
        `${fracToString(p.a)} = ${p.work.aEq.n}/${p.work.aEq.d}`,
        `${fracToString(p.b)} = ${p.work.bEq.n}/${p.work.bEq.d}`,
        `${p.work.aEq.n}/${p.work.aEq.d} ${opSymbol} ${p.work.bEq.n}/${p.work.bEq.d} = ${p.work.raw.n}/${p.work.raw.d}`,
        `Simplify: ${p.work.raw.n}/${p.work.raw.d} = ${p.work.simp.n}/${p.work.simp.d}`
    ];
    $("#steps").innerHTML = `<ol>${lines.map(x => `<li>${x}</li>`).join("")}</ol>`;
}

function newProblem() {
    $("#feedback").textContent = "";
    $("#answer").value = "";

    const mode = $("#mode").value;
    localStorage.setItem("finalMode", mode);

    if (mode === "apply") {
        const t = pick(templates.apply);
        current = buildApplyProblem(t);
    } else {
        const t = pick(templates.pbl);
        current = buildPblProblem(t);
    }

    $("#prompt").textContent = current.prompt;
    renderSteps(current);

    syncHidden();
}

function checkAnswer() {
    const parsed = parseFraction($("#answer").value);
    if (!parsed) {
        $("#feedback").textContent = "Enter your answer like 5/6.";
        return;
    }

    if (equalFrac(parsed, current.expected)) {
        $("#feedback").textContent = "Correct ✅";
        score += 1;
        setScore();
        syncHidden();
    } else {
        $("#feedback").textContent = `Not yet ❌ Correct answer: ${current.expected.n}/${current.expected.d}`;
    }
}

function renderLibrary() {
    const lib = $("#library");
    lib.innerHTML = templates.apply.slice(0, 15).map(t => `
    <div class="template-card">
      <strong>${t.id}</strong>
      <span>type: ${t.type} • denom: ${t.denom} • difficulty: ${t.difficulty} • maxD: ${t.maxD}</span>
    </div>
  `).join("");
}

function initFormDefaults() {
    const lastMode = localStorage.getItem("finalMode");
    if (lastMode) $("#mode").value = lastMode;
    setScore();
    syncHidden();
}

function initDialog() {
    const helpBtn = $("#openHelp");
    const dlg = $("#helpDialog");
    const closeBtn = $("#closeHelp");
    if (helpBtn && dlg && closeBtn) {
        helpBtn.addEventListener("click", () => dlg.showModal());
        closeBtn.addEventListener("click", () => dlg.close());
    }
}

const scoreField = document.getElementById("scoreField");
const modeField = document.getElementById("modeField");

function syncHidden() {
    const scoreEl = $("#score");
    const modeSel = $("#mode");
    if (scoreField && scoreEl) scoreField.value = scoreEl.textContent;
    if (modeField && modeSel) modeField.value = modeSel.value;
}

async function init() {
    templates = await getTemplates();
    renderLibrary();
    initFormDefaults();

    $("#newBtn").addEventListener("click", newProblem);
    $("#checkBtn").addEventListener("click", checkAnswer);

    const modeSel = $("#mode");
    if (modeSel) modeSel.addEventListener("change", () => {
        syncHidden();
        newProblem();
    });

    initDialog();
    newProblem();
}

init();

