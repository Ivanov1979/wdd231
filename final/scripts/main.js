const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("primaryNav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        const isOpen = nav.getAttribute("data-open") === "true";
        nav.setAttribute("data-open", String(!isOpen));
        menuBtn.setAttribute("aria-expanded", String(!isOpen));
    });
}

const lastVisit = localStorage.getItem("finalLastVisit");
const now = Date.now();
localStorage.setItem("finalLastVisit", String(now));

const lastVisitEl = document.getElementById("lastVisit");
if (lastVisitEl) {
    if (!lastVisit) {
        lastVisitEl.textContent = "Welcome! This is your first visit.";
    } else {
        const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
        lastVisitEl.textContent = days < 1 ? "Welcome back! You visited today." : `Welcome back! It has been ${days} day(s).`;
    }
}

const y = document.getElementById("year");
const lm = document.getElementById("lastModified");
if (y) y.textContent = new Date().getFullYear();
if (lm) lm.textContent = document.lastModified;
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const dlg = document.getElementById("whyDialog");

if (openBtn && closeBtn && dlg) {
    openBtn.addEventListener("click", () => dlg.showModal());
    closeBtn.addEventListener("click", () => dlg.close());
}

