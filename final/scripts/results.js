const params = new URLSearchParams(window.location.search);

const student = params.get("student");
const reflection = params.get("reflection");
const score = params.get("score");

const container = document.getElementById("resultsContainer");

if (container) {
    container.innerHTML = `
        <p><strong>Student:</strong> ${student || ""}</p>
        <p><strong>Reflection:</strong> ${reflection || ""}</p>
        <p><strong>Score:</strong> ${score || 0}</p>
    `;
}

