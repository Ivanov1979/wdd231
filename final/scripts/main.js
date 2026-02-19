const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const modified = document.getElementById("lastModified");
if (modified) modified.textContent = document.lastModified;

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("primaryNav");

if (menuBtn && nav) {
    // Ensure default closed on load
    if (!nav.dataset.open) nav.dataset.open = "false";

    menuBtn.addEventListener("click", () => {
        const isOpen = nav.dataset.open === "true";
        nav.dataset.open = String(!isOpen);
        menuBtn.setAttribute("aria-expanded", String(!isOpen));
        menuBtn.textContent = !isOpen ? "✖" : "☰";
    });

    // ✅ Wayfinding (automatic)
    const currentPage = location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll("a").forEach(a => {
        if (a.getAttribute("href") === currentPage) {
            a.classList.add("active");
            a.setAttribute("aria-current", "page");
        }
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