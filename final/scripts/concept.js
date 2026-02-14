function renderBar(el, n, d) {
    el.innerHTML = "";
    el.style.setProperty("--cols", d);
    for (let i = 1; i <= d; i++) {
        const cell = document.createElement("div");
        cell.className = i <= n ? "cell filled" : "cell";
        el.appendChild(cell);
    }
}

renderBar(document.getElementById("bar34"), 3, 4);
renderBar(document.getElementById("bar38"), 3, 8);
renderBar(document.getElementById("bar28"), 2, 8);

renderBar(document.getElementById("bar12"), 1, 2);
renderBar(document.getElementById("bar13"), 1, 3);
renderBar(document.getElementById("bar36"), 3, 6);
renderBar(document.getElementById("bar26"), 2, 6);
renderBar(document.getElementById("bar56"), 5, 6);
