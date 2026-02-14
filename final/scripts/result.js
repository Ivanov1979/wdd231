const params = new URLSearchParams(window.location.search);

const out = document.getElementById("results");
const student = params.get("student") || "";
const reflection = params.get("reflection") || "";
const score = params.get("score") || "0";
const mode = params.get("mode") || "apply";

if (out) {
    out.innerHTML = `
    <div class="template-card">
      <strong>Student</strong>
      <span>${student}</span>
    </div>
    <div class="template-card">
      <strong>Mode</strong>
      <span>${mode}</span>
    </div>
    <div class="template-card">
      <strong>Score</strong>
      <span>${score}</span>
    </div>
    <div class="template-card">
      <strong>Reflection</strong>
      <span>${reflection}</span>
    </div>
  `;
}
