import { places } from "../data/places.mjs";

const grid = document.querySelector(".discover-grid");
const header = document.querySelector(".page-header");

const message = document.createElement("p");
message.className = "visit-message";

const lastVisit = Number(localStorage.getItem("lastVisit"));
const now = Date.now();

if (!lastVisit) {
    message.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    message.textContent = days < 1
        ? "Welcome back! You last visited today."
        : `Welcome back! It has been ${days} day(s) since your last visit.`;
}

localStorage.setItem("lastVisit", String(now));

if (header) header.appendChild(message);

function buildCard(place, i) {
    const card = document.createElement("article");
    card.className = "discover-card";
    card.style.gridArea = `card${i + 1}`;

    const h2 = document.createElement("h2");
    h2.textContent = place.title;

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.alt;
    img.loading = "lazy";
    img.width = 300;
    img.height = 200;

    figure.appendChild(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const p = document.createElement("p");
    p.textContent = place.description;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Learn more";

    btn.addEventListener("click", () => {
        alert(`${place.title}\n\n${place.address}\n\n${place.description}`);
    });

    card.append(h2, figure, address, p, btn);
    return card;
}

places.slice(0, 8).forEach((place, i) => {
    grid.appendChild(buildCard(place, i));
});
