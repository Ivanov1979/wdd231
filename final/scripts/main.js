const year = document.getElementById("year");
if (year) {
    year.textContent = new Date().getFullYear();
}

const modified = document.getElementById("lastModified");
if (modified) {
    modified.textContent = document.lastModified;
}

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("primaryNav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        const isOpen = nav.dataset.open === "true";
        nav.dataset.open = String(!isOpen);
        menuBtn.setAttribute("aria-expanded", String(!isOpen));
    });
}

const lastVisit = document.getElementById("lastVisit");

if (lastVisit) {
    const now = Date.now();
    const stored = localStorage.getItem("lastVisit");

    if (!stored) {
        lastVisit.textContent = "Welcome! This is your first visit.";
    } else {
        const days = Math.floor((now - Number(stored)) / (1000 * 60 * 60 * 24));
        lastVisit.textContent = `You last visited ${days} day(s) ago.`;
    }

    localStorage.setItem("lastVisit", String(now));
}
