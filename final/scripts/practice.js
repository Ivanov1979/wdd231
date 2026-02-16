import { templates } from "../data/templates.mjs";

const promptEl = document.getElementById("prompt");
const answerEl = document.getElementById("answer");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const modeEl = document.getElementById("mode");
const difficultyEl = document.getElementById("difficulty");

const scoreField = document.getElementById("scoreField");
const modeField = document.getElementById("modeField");

const checkBtn = document.getElementById("checkBtn");
const newBtn = document.getElementById("newBtn");

const helpDialog = document.getElementById("helpDialog");
const openHelp = document.getElementById("openHelp");
const closeHelp = document.getElementById("closeHelp");

let score = Number(localStorage.getItem("fp_score")) || 0;
let mode = localStorage.getItem("fp_mode") || "apply";
let difficulty = localStorage.getItem("fp_difficulty") || "easy";

if (scoreEl) scoreEl.textContent = score;
if (modeEl) modeEl.value = mode;
if (difficultyEl) difficultyEl.value = difficulty;

let current = null;

function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return Math.abs(a);
}

function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

function simplify(n, d) {
    const g = gcd(n, d);
    return { n: n / g, d: d / g };
}

function parseFraction(input) {
    const match = input.trim().match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
    if (!match) return null;

    const n = Number(match[1]);
    const d = Number(match[2]);
    if (d === 0) return null;

    return simplify(n, d);
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeFraction(maxD, denomType) {
    if (denomType === "like") {
        const d = randInt(2, maxD);
        return {
            a: randInt(1, d - 1),
            b: d,
            c: randInt(1, d - 1),
            d
        };
    }

    let b = randInt(2, maxD);
    let d = randInt(2, maxD);
    while (d === b) d = randInt(2, maxD);

    return {
        a: randInt(1, b - 1),
        b,
        c: randInt(1, d - 1),
        d
    };
}

function compute(a, b, c, d, op) {
    const common = lcm(b, d);
    const A = a * (common / b);
    const C = c * (common / d);
    const n = op === "sub" ? A - C : A + C;
    return simplify(n, common);
}

function renderPrompt(obj) {
    if (!promptEl) return;

    if (obj.mode === "pbl") {
        promptEl.textContent = obj.story;
        return;
    }

    const sign = obj.op === "sub" ? "−" : "+";
    promptEl.textContent = `${obj.a}/${obj.b} ${sign} ${obj.c}/${obj.d}`;
}

function renderTemplateList() {
    const list = document.getElementById("templateList");
    if (!list) return;

    const items = templates.apply
        .map(t => `<li>${t.id} • ${t.type} • ${t.difficulty} • maxD ${t.maxD}</li>`)
        .join("");

    list.innerHTML = `<ul>${items}</ul>`;
}

function pickTemplate() {
    if (mode === "pbl") {
        const t = templates.pbl[Math.floor(Math.random() * templates.pbl.length)];
        return { ...t, mode: "pbl" };
    }

    const pool = templates.apply.filter(t => t.difficulty === difficulty);
    const t = pool[Math.floor(Math.random() * pool.length)];
    return { ...t, mode: "apply" };
}

function generate() {
    feedbackEl.textContent = "";
    answerEl.value = "";

    const t = pickTemplate();

    if (t.mode === "pbl") {
        const fr = makeFraction(12, "unlike");
        const story = t.story
            .replace("{a}", `${fr.a}/${fr.b}`)
            .replace("{b}", `${fr.c}/${fr.d}`);

        current = {
            mode: "pbl",
            op: t.type,
            ...fr,
            story
        };

        current.correct = compute(current.a, current.b, current.c, current.d, current.op);
        renderPrompt(current);
        return;
    }

    const fr = makeFraction(t.maxD, t.denom);

    current = {
        mode: "apply",
        op: t.type,
        ...fr
    };

    current.correct = compute(current.a, current.b, current.c, current.d, current.op);
    renderPrompt(current);
}

function checkAnswer() {
    if (!current) return;

    const parsed = parseFraction(answerEl.value);
    if (!parsed) {
        feedbackEl.textContent = "Enter your answer as a fraction like 5/6.";
        return;
    }

    const ok = parsed.n === current.correct.n && parsed.d === current.correct.d;

    if (ok) {
        score++;
        localStorage.setItem("fp_score", score);
        scoreEl.textContent = score;
        feedbackEl.textContent = "Correct!";
    } else {
        feedbackEl.textContent = "Try again.";
    }
}

if (modeEl) {
    modeEl.addEventListener("change", e => {
        mode = e.target.value;
        localStorage.setItem("fp_mode", mode);
        generate();
    });
}

if (difficultyEl) {
    difficultyEl.addEventListener("change", e => {
        difficulty = e.target.value;
        localStorage.setItem("fp_difficulty", difficulty);
        generate();
    });
}

if (checkBtn) checkBtn.addEventListener("click", checkAnswer);
if (newBtn) newBtn.addEventListener("click", generate);

if (openHelp) openHelp.addEventListener("click", () => helpDialog.showModal());
if (closeHelp) closeHelp.addEventListener("click", () => helpDialog.close());

renderTemplateList();
generate();

